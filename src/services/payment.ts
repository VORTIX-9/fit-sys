import { prisma } from "@/lib/prisma";
import { PaymentStatus, SubscriptionStatus } from "@prisma/client";

export class PaymentService {
    /**
     * Member submits a bank transfer or promised cash payment
     */
    static async submitPayment(data: {
        userId: string;
        organizationId: string;
        subscriptionId: string;
        amount: number;
        method: any;
        externalRef?: string;
    }) {
        return await prisma.payment.create({
            data: {
                ...data,
                status: PaymentStatus.PENDING,
            }
        });
    }

    /**
     * Admin approves the payment after verification
     */
    static async approvePayment(id: string) {
        return await prisma.$transaction(async (tx) => {
            // 1. Mark Payment as Completed
            const payment = await tx.payment.update({
                where: { id },
                data: {
                    status: PaymentStatus.COMPLETED,
                    processedAt: new Date()
                }
            });

            // 2. Automatically Activate the linked Subscription
            await tx.subscription.update({
                where: { id: payment.subscriptionId },
                data: {
                    status: SubscriptionStatus.ACTIVE
                }
            });

            return payment;
        });
    }

    /**
     * Fetch financial history for an organization
     */
    static async getOrganizationLedger(organizationId: string) {
        return await prisma.payment.findMany({
            where: { organizationId },
            include: {
                subscription: { include: { user: true, plan: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    /**
     * Generate receipt data
     */
    static async getReceiptData(id: string) {
        const payment = await prisma.payment.findUnique({
            where: { id },
            include: {
                organization: true,
                subscription: { include: { user: true, plan: true } }
            }
        });

        if (!payment || payment.status !== PaymentStatus.COMPLETED) return null;

        return {
            receiptNumber: `FIT-${payment.id.split('-')[0].toUpperCase()}`,
            amountMnt: payment.amount,
            date: payment.processedAt,
            orgName: payment.organization.name,
            memberName: payment.subscription.user.fullName,
            planName: payment.subscription.plan.name
        };
    }
}
