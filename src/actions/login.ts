"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function loginUser(data: { email: string; password: string }) {
    try {
        const { email, password } = data;

        // 1. Validation
        if (!email || !password) {
            return { success: false, error: "Имэйл болон нууц үг оруулна уу" };
        }

        // 2. Find user by email
        const user = await prisma.user.findFirst({
            where: { email: email },
            include: { organization: true }
        });

        if (!user) {
            return {
                success: false,
                error: "Бүртгэлгүй хэрэглэгч байна. Эхлээд бүртгүүлнэ үү.",
                shouldSignup: true
            };
        }

        // 3. In a real app, verify password hash here
        // For now, we'll just create a session

        // 4. Set session cookie
        const cookieStore = await cookies();
        cookieStore.set('fit_session', JSON.stringify({
            id: user.id,
            role: user.role,
            orgSlug: user.organization.slug
        }), {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return {
            success: true,
            orgSlug: user.organization.slug,
            role: user.role
        };
    } catch (error: any) {
        console.error("Login error:", error);
        return { success: false, error: "Нэвтрэх явцад алдаа гарлаа" };
    }
}
