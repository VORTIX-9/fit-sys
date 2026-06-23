import prisma from "@/lib/prisma";
import { ClassStatus } from "@prisma/client";

export class ClassService {
    /**
     * Create a single class instance
     */
    static async createClass(data: {
        organizationId: string;
        locationId: string;
        trainerId: string;
        name: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
    }) {
        return await prisma.class.create({
            data: {
                ...data,
                status: ClassStatus.SCHEDULED,
            },
        });
    }

    /**
     * Handle Class Cancellation and Notify athletes
     */
    static async cancelClass(id: string, notify: boolean = true) {
        return await prisma.$transaction(async (tx) => {
            const cls = await tx.class.update({
                where: { id },
                data: { status: ClassStatus.CANCELLED },
                include: { bookings: { include: { user: true } } }
            });

            if (notify) {
                // Mock notification logic
                cls.bookings.forEach(b => {
                    // console.log(`Notifying ${b.user.fullName} of cancellation: ${cls.name}`);
                });
            }

            return cls;
        });
    }

    /**
     * Reassign trainer to a class
     */
    static async reassignTrainer(classId: string, trainerId: string) {
        return await prisma.class.update({
            where: { id: classId },
            data: { trainerId }
        });
    }

    /**
     * Get Daily Schedule for a location
     */
    static async getDailySchedule(locationId: string, date: Date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return await prisma.class.findMany({
            where: {
                locationId,
                startTime: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            include: {
                trainer: { include: { user: true } },
                _count: { select: { bookings: true } }
            },
            orderBy: { startTime: 'asc' }
        });
    }
}
