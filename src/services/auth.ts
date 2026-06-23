import prisma from "@/lib/prisma";
// Note: In a real app we'd use bcrypt and jose/jsonwebtoken
// This service mocks the logic for the design showcase

export class AuthService {
    /**
     * Mock login with phone and password
     */
    static async login(phone: string, password: string, slug: string) {
        const org = await prisma.organization.findUnique({ where: { slug } });
        if (!org) throw new Error("Organization not found");

        const user = await prisma.user.findFirst({
            where: {
                phone,
                organizationId: org.id,
            },
        });

        if (!user) throw new Error("Invalid credentials");

        // Mock password check (bcrypt.compare)
        if (password !== "password123") {
            throw new Error("Invalid password");
        }

        return user;
    }

    /**
     * Verify session token and return payload
     */
    static verifySession(token: string) {
        // In a real app: return jwt.verify(token, process.env.AUTH_SECRET)
        try {
            const payload = JSON.parse(Buffer.from(token, 'base64').toString());
            return payload;
        } catch (e) {
            return null;
        }
    }

    /**
     * Mock password reset request
     */
    static async requestPasswordReset(phone: string, slug: string) {
        // 1. Find user in the specific organization
        // 2. Generate 6-digit OTP
        // 3. Store in DB with expiry
        // 4. Return success (mock)
        return { success: true, message: "OTP sent to your phone" };
    }
}
