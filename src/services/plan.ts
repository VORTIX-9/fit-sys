import prisma from "@/lib/prisma";
import { SubscriptionStatus } from "@prisma/client";

export class PlanService {
    /**
     * Calculate the remaining value of a subscription for an upgrade
     */
    static async calculateUpgradeCredit(subscriptionId: string) {
        const sub = await prisma.subscription.findUnique({
            where: { id: subscriptionId },
            include: { plan: true }
        });

        if (!sub || sub.status !== SubscriptionStatus.ACTIVE) return 0;

        const totalDays = (new Date(sub.endDate).getTime() - new Date(sub.startDate).getTime()) / (1000 * 3600 * 24);
        const remainingDays = (new Date(sub.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24);

        if (remainingDays <= 0) return 0;

        const dailyRate = Number(sub.plan.priceMnt) / totalDays;
        return Math.floor(dailyRate * remainingDays);
    }

    /**
     * Freeze a membership
     */
    static async freezeMembership(id: string, days: number) {
        void days;

        return await prisma.subscription.update({
            where: { id },
            data: {
                status: SubscriptionStatus.FROZEN
            }
        });
    }

    /**
     * Unfreeze and extend membership
     */
    static async unfreezeMembership(id: string) {
        return await prisma.subscription.update({
            where: { id },
            data: {
                status: SubscriptionStatus.ACTIVE
            }
        });
    }
}
