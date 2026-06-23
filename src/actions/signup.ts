"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";

type SignupData = {
    gymName: string;
    subdomain: string;
    adminName: string;
    phone: string;
    email: string;
    password: string;
};

export async function createOrganization(data: SignupData) {
    try {
        const { gymName, subdomain, adminName, phone, email, password } = data;
        const slug = subdomain.trim().toLowerCase();

        // 1. Validation (Basic)
        if (!gymName || !subdomain || !adminName || !phone || !email || !password) {
            return { success: false, error: "Бүх талбарыг бөглөнө үү" };
        }

        if (!/^[a-z0-9-]+$/.test(slug)) {
            return { success: false, error: "Дэд домайн зөвхөн жижиг үсэг, тоо, зураас агуулна" };
        }

        // 2. Check if subdomain exists
        const existingOrg = await prisma.organization.findUnique({
            where: { slug }
        });

        if (existingOrg) {
            return { success: false, error: "Энэ дэд домайн аль хэдийн бүртгэлтэй байна" };
        }

        // 3. Create Organization & Owner User in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const org = await tx.organization.create({
                data: {
                    name: gymName,
                    slug,
                    status: 'ACTIVE'
                }
            });

            const user = await tx.user.create({
                data: {
                    organizationId: org.id,
                    fullName: adminName,
                    email: email,
                    phone: phone,
                    role: 'OWNER'
                }
            });

            return { org, user };
        });

        // 4. Set session cookie (Mock)
        // In a real app, use next-auth or a secure JWT
        const cookieStore = await cookies();
        cookieStore.set('fit_session', JSON.stringify({
            id: result.user.id,
            role: result.user.role,
            orgSlug: result.org.slug
        }), {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return { success: true, orgSlug: result.org.slug };
    } catch (error) {
        console.error("Signup error:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return { success: false, error: "Ижил мэдээлэлтэй бүртгэл аль хэдийн байна" };
        }

        return {
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        };
    }
}
