import prisma from "@/lib/prisma";
import { BookingStatus, SubscriptionStatus } from "@prisma/client";

export class BookingService {
    /**
     * Atomic booking creation with server-side validation
     */
    static async createBooking(userId: string, classId: string) {
        return await prisma.$transaction(async (tx) => {
            // 1. Fetch Class and User (with current sub)
            const [cls, user] = await Promise.all([
                tx.class.findUnique({
                    where: { id: classId },
                    include: { _count: { select: { bookings: { where: { status: BookingStatus.RESERVED } } } } }
                }),
                tx.user.findUnique({
                    where: { id: userId },
                    include: { subscriptions: { where: { status: SubscriptionStatus.ACTIVE }, take: 1 } }
                })
            ]);

            if (!cls) throw new Error("Class not found");
            if (!user) throw new Error("User not found");

            // 2. Validate Membership
            if (user.subscriptions.length === 0) {
                throw new Error("Active membership required to book classes");
            }

            // 3. Check for Overlapping Bookings
            const overlaps = await tx.booking.findFirst({
                where: {
                    userId,
                    status: BookingStatus.RESERVED,
                    class: {
                        OR: [
                            { startTime: { lt: cls.endTime }, endTime: { gt: cls.startTime } }
                        ]
                    }
                }
            });
            if (overlaps) throw new Error("You already have a class booked during this time");

            // 4. Capacity Check & Waitlist Logic
            const isFull = cls._count.bookings >= cls.capacity;
            const status = isFull ? BookingStatus.WAITLISTED : BookingStatus.RESERVED;

            const booking = await tx.booking.create({
                data: {
                    userId,
                    classId,
                    organizationId: cls.organizationId,
                    status
                }
            });

            return { booking, promoted: !isFull };
        });
    }

    /**
     * Cancellation with Late Cancel logic and Waitlist promotion
     */
    static async cancelBooking(id: string) {
        return await prisma.$transaction(async (tx) => {
            const booking = await tx.booking.findUnique({
                where: { id },
                include: { class: true }
            });

            if (!booking) throw new Error("Booking not found");

            // 1. Determine Late vs Early Cancel (e.g., 2 hour threshold)
            const now = new Date();
            const classStart = new Date(booking.class.startTime);
            const hoursUntilClass = (classStart.getTime() - now.getTime()) / (1000 * 3600);
            const isLateCancel = hoursUntilClass < 2;

            // 2. Update Booking Status
            await tx.booking.update({
                where: { id },
                data: { status: BookingStatus.CANCELLED, updatedAt: new Date() }
            });

            // 3. Promote from Waitlist if a spot opened up
            if (booking.status === BookingStatus.RESERVED) {
                const nextOnWaitlist = await tx.booking.findFirst({
                    where: { classId: booking.classId, status: BookingStatus.WAITLISTED },
                    orderBy: { createdAt: 'asc' }
                });

                if (nextOnWaitlist) {
                    await tx.booking.update({
                        where: { id: nextOnWaitlist.id },
                        data: { status: BookingStatus.RESERVED }
                    });
                    // Mock: notifyUser(nextOnWaitlist.userId, "Waitlist Promoted!");
                }
            }

            return { success: true, isLateCancel };
        });
    }

    /**
     * Audit no-shows after class completion
     */
    static async processNoShows(classId: string) {
        // 1. Find all RESERVED bookings where attendance record is missing
        // 2. Mark as NO_SHOW
        // 3. Increment penalty counts in user metadata
    }
}
