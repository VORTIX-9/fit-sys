import prisma from "@/lib/prisma";

export async function getOrganizationBySlug(slug: string) {
    // In a real app, this would query the DB
    // For MVP/Demo, we return a mock or handle the DB query safely
    try {
        const org = await prisma.organization.findUnique({
            where: { slug },
            include: {
                locations: true,
                membershipPlans: {
                    where: { isActive: true }
                }
            }
        });
        return org;
    } catch (error) {
        console.error("Error fetching organization:", error);
        return null;
    }
}

export async function getTenantStats(orgId: string) {
    // Mock stats for the dashboard
    return {
        totalMembers: 1204,
        activeToday: 86,
        pendingPaymentsCount: 8,
        pendingPaymentsAmount: "1.2M ₮"
    };
}
