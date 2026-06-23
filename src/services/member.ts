import { prisma } from "@/lib/prisma";
import { UserRole, SubscriptionStatus } from "@prisma/client";

export class MemberService {
    /**
     * Search members within organization by name or phone
     */
    static async searchMembers(organizationId: string, query: string) {
        return await prisma.user.findMany({
            where: {
                organizationId,
                role: UserRole.MEMBER,
                OR: [
                    { fullName: { contains: query, mode: 'insensitive' } },
                    { phone: { contains: query } },
                ],
            },
            include: {
                subscriptions: {
                    orderBy: { endDate: 'desc' },
                    take: 1
                }
            },
            take: 20
        });
    }

    /**
     * Get full 360-degree view of a member
     */
    static async getMemberProfile(id: string) {
        return await prisma.user.findUnique({
            where: { id },
            include: {
                subscriptions: {
                    include: { plan: true },
                    orderBy: { createdAt: 'desc' }
                },
                attendance: {
                    take: 10,
                    orderBy: { entryTime: 'desc' },
                    include: { class: true }
                },
                bookings: {
                    take: 5,
                    where: { status: 'RESERVED' },
                    include: { class: true }
                }
            }
        });
    }

    /**
     * Add a staff note to member metadata
     */
    static async addStaffNote(id: string, note: string, authorName: string) {
        const user = await prisma.user.findUnique({ where: { id } });
        const existingMetadata = (user?.metadata as any) || {};
        const notes = existingMetadata.staffNotes || [];

        notes.push({
            content: note,
            author: authorName,
            createdAt: new Date().toISOString()
        });

        return await prisma.user.update({
            where: { id },
            data: {
                metadata: {
                    ...existingMetadata,
                    staffNotes: notes
                }
            }
        });
    }
}
