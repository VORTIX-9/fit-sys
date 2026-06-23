"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function createOrganization(data: any) {
    try {
        const { gymName, subdomain, adminName, phone, email, password } = data;

        // 1. Validation (Basic)
        if (!gymName || !subdomain || !adminName || !phone || !email || !password) {
            return { success: false, error: "Missing required fields" };
        }

        // 2. Check if subdomain exists
        const existingOrg = await prisma.organization.findUnique({
            where: { slug: subdomain }
        });

        if (existingOrg) {
            return { success: false, error: "Subdomain already taken" };
        }

        // 3. Create Organization & Owner User in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const org = await tx.organization.create({
                data: {
                    name: gymName,
                    slug: subdomain,
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
    } catch (error: any) {
        console.error("Signup error:", error);
        return { success: false, error: error.message || "Internal server error" };
    }
}
