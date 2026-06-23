import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export class UserService {
    /**
     * Invite a new staff or manager member
     */
    static async inviteUser({
        organizationId,
        phone,
        fullName,
        role,
    }: {
        organizationId: string;
        phone: string;
        fullName: string;
        role: UserRole;
    }) {
        return await prisma.user.create({
            data: {
                organizationId,
                phone,
                fullName,
                role,
            },
        });
    }

    /**
     * Deactivate a user (soft delete/disable)
     * In a real app, you might add an 'isActive' flag to the User model
     * For now, we can use metadata or a specific role
     */
    static async deactivateUser(id: string) {
        return await prisma.user.update({
            where: { id },
            data: {
                metadata: { deactivated: true },
            },
        });
    }

    /**
     * Update a user's role within an organization
     */
    static async updateRole(id: string, newRole: UserRole, requesterRole: UserRole) {
        // Basic protection: Only Owners can make Managers
        if (newRole === UserRole.MANAGER && requesterRole !== UserRole.OWNER) {
            throw new Error("Only Owners can promote Managers");
        }

        return await prisma.user.update({
            where: { id },
            data: {
                role: newRole,
            },
        });
    }

    /**
     * Fetch users for an organization, filtered by role
     */
    static async getOrgUsers(organizationId: string, role?: UserRole) {
        return await prisma.user.findMany({
            where: {
                organizationId,
                ...(role && { role }),
            },
            orderBy: { createdAt: "desc" },
        });
    }
}
