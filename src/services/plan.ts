import { prisma } from "@/lib/prisma";
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
        return await prisma.subscription.update({
            where: { id },
            data: {
                status: SubscriptionStatus.FROZEN,
                metadata: {
                    freezeStartedAt: new Date().toISOString(),
                    requestedFreezeDays: days
                }
            }
        });
    }

    /**
     * Unfreeze and extend membership
     */
    static async unfreezeMembership(id: string) {
        const sub = await prisma.subscription.findUnique({ where: { id } });
        const metadata = (sub?.metadata as any) || {};

        if (!metadata.freezeStartedAt) return sub;

        const freezeDuration = Math.ceil(
            (new Date().getTime() - new Date(metadata.freezeStartedAt).getTime()) / (1000 * 3600 * 24)
        );

        const newEndDate = new Date(sub!.endDate);
        newEndDate.setDate(newEndDate.getDate() + freezeDuration);

        return await prisma.subscription.update({
            where: { id },
            data: {
                status: SubscriptionStatus.ACTIVE,
                endDate: newEndDate,
                metadata: {
                    ...metadata,
                    lastFreezeDuration: freezeDuration,
                    freezeStartedAt: null
                }
            }
        });
    }
}
