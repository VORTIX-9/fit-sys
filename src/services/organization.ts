import prisma from "@/lib/prisma";
import { OrgStatus, Prisma } from "@prisma/client";

export class OrganizationService {
    /**
     * Fetch organization branding and settings by subdomain slug
     */
    static async getBySlug(slug: string) {
        return await prisma.organization.findUnique({
            where: { slug },
            include: {
                locations: true,
            },
        });
    }

    /**
     * Onboard a new organization
     */
    static async create({
        name,
        slug,
        ownerPhone,
        ownerName,
    }: {
        name: string;
        slug: string;
        ownerPhone: string;
        ownerName: string;
    }) {
        return await prisma.$transaction(async (tx) => {
            // 1. Create the Organization
            const org = await tx.organization.create({
                data: {
                    name,
                    slug: slug.toLowerCase(),
                    status: OrgStatus.ACTIVE,
                },
            });

            // 2. Create the Primary Location
            const location = await tx.location.create({
                data: {
                    organizationId: org.id,
                    name: `${name} - Main`,
                    address: "Default Address",
                },
            });

            // 3. Create the Owner User
            await tx.user.create({
                data: {
                    organizationId: org.id,
                    phone: ownerPhone,
                    fullName: ownerName,
                    role: "OWNER",
                },
            });

            return { org, location };
        });
    }

    /**
     * Update branding and settings
     */
    static async updateSettings(id: string, brandingConfig: Prisma.InputJsonValue) {
        return await prisma.organization.update({
            where: { id },
            data: {
                brandingConfig,
            },
        });
    }

    /**
     * List all locations for a tenant
     */
    static async getLocations(organizationId: string) {
        return await prisma.location.findMany({
            where: { organizationId },
        });
    }
}
