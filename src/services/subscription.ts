import prisma from "@/lib/prisma";
import { SubscriptionStatus } from "@prisma/client";

export class SubscriptionService {
    /**
     * Main lifecycle state transitioner
     */
    static async transition(id: string, to: SubscriptionStatus, reason?: string) {
        // Audit log placeholder: console.log(`Transitioning sub ${id} to ${to}. Reason: ${reason}`);

        return await prisma.subscription.update({
            where: { id },
            data: {
                status: to,
                updatedAt: new Date()
            }
        });
    }

    /**
     * Cron-ready function to process daily expirations
     */
    static async processDailyExpirations() {
        const today = new Date();

        // Find all active subscriptions that passed their end date
        const expiredSubs = await prisma.subscription.findMany({
            where: {
                status: SubscriptionStatus.ACTIVE,
                endDate: { lt: today }
            }
        });

        // Update them to EXPIRED
        for (const sub of expiredSubs) {
            await this.transition(sub.id, SubscriptionStatus.EXPIRED, "Auto-expiry cron");
        }

        return expiredSubs.length;
    }

    /**
     * Check if access is permitted including grace periods
     */
    static async checkAccessPermission(subscriptionId: string) {
        const sub = await prisma.subscription.findUnique({
            where: { id: subscriptionId },
            include: { organization: true }
        });

        if (!sub) return { permitted: false, reason: "No subscription found" };
        if (sub.status === SubscriptionStatus.ACTIVE) return { permitted: true };

        // Grace period logic (48 hours)
        if (sub.status === SubscriptionStatus.EXPIRED) {
            const graceEnd = new Date(sub.endDate);
            graceEnd.setHours(graceEnd.getHours() + 48);

            if (new Date() < graceEnd) {
                return {
                    permitted: true,
                    reason: "Within 48h Grace Period",
                    alertStaff: true
                };
            }
        }

        return { permitted: false, reason: `Status: ${sub.status}` };
    }

    /**
     * Manual override: Extend membership
     */
    static async manualExtend(id: string, extraDays: number) {
        const sub = await prisma.subscription.findUnique({ where: { id } });
        if (!sub) return null;

        const newEndDate = new Date(sub.endDate);
        newEndDate.setDate(newEndDate.getDate() + extraDays);

        return await prisma.subscription.update({
            where: { id },
            data: {
                endDate: newEndDate,
                status: SubscriptionStatus.ACTIVE // Re-activate if it was expired
            }
        });
    }
}
