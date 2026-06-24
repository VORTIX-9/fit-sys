"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import {
    Activity,
    ArrowRight,
    CalendarPlus,
    CalendarCheck,
    Clock,
    CreditCard,
    Bell,
    ScanLine,
    RotateCcw,
    UserPlus,
    Users,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPlaceholder({ slug }: { slug: string }) {
    const { language, t } = useLanguage();

    const stats = [
        { label: language === "ENG" ? "Active members" : "Идэвхтэй гишүүд", value: "1,284", detail: language === "ENG" ? "+18 this month" : "+18 энэ сард", icon: Users },
        { label: language === "ENG" ? "Today's revenue" : "Өнөөдрийн орлого", value: language === "ENG" ? "₮3.8M" : "₮3.8M", detail: language === "ENG" ? "42 payments" : "42 төлбөр", icon: CreditCard },
        { label: language === "ENG" ? "Check-ins today" : "Өнөөдрийн ирц", value: "216", detail: language === "ENG" ? "Last 13:42" : "Сүүлийн бүртгэл 13:42", icon: ScanLine },
        { label: language === "ENG" ? "Class fill" : "Хичээлийн дүүргэлт", value: "82%", detail: language === "ENG" ? "Next class 18:30" : "Дараагийн хичээл 18:30", icon: Activity },
    ];

    // Today tasks (operational)
    const todayTasks = [
        {
            id: "tasks_payments",
            title: language === "ENG" ? "14 payments to approve" : "14 төлбөр баталгаажуулах",
            subtitle: language === "ENG" ? "Bank card and QPay payments" : "Банкны карт болон QPay төлбөрүүд",
            href: `/${slug}/app/admin/payments`,
            icon: CreditCard,
            iconBg: "bg-primary/10",
            iconColor: "text-primary",
        },
        {
            id: "tasks_renewals",
            title: language === "ENG" ? "32 memberships expiring" : "32 гишүүний эрх 7 хоногт дуусна",
            subtitle: language === "ENG" ? "Send renewal reminders" : "Сунгалтын сануулга илгээх",
            href: `/${slug}/app/admin/members`,
            icon: Bell,
            iconBg: "bg-warning/10",
            iconColor: "text-warning",
        },
        {
            id: "tasks_classes",
            title: language === "ENG" ? "3 classes near full" : "3 хичээлийн бүртгэл дүүрэх дөхсөн",
            subtitle: language === "ENG" ? "Check schedule and capacity" : "Хуваарь болон дүүргэлт шалгах",
            href: `/${slug}/app/admin/classes`,
            icon: CalendarCheck,
            iconBg: "bg-accent/10",
            iconColor: "text-accent",
        },
        {
            id: "tasks_refunds",
            title: language === "ENG" ? "2 refund requests" : "2 буцаалтын хүсэлт шалгах",
            subtitle: language === "ENG" ? "Require admin approval" : "Админы баталгаажуулалт шаардлагатай",
            href: `/${slug}/app/admin/payments`,
            icon: RotateCcw,
            iconBg: "bg-danger/10",
            iconColor: "text-danger",
        },
    ];

    const quickActions = [
        { label: language === "ENG" ? "Register member" : "Гишүүн бүртгэх", href: `/${slug}/app/admin/members`, icon: UserPlus },
        { label: language === "ENG" ? "Record payment" : "Төлбөр бүртгэх", href: `/${slug}/app/admin/payments`, icon: CreditCard },
        { label: language === "ENG" ? "Add class" : "Хичээл нэмэх", href: `/${slug}/app/admin/classes`, icon: CalendarPlus },
        { label: language === "ENG" ? "Log attendance" : "Ирц бүртгэх", href: `/${slug}/app/admin/attendance`, icon: ScanLine },
    ];

    const attentionItems = [
        { label: language === "ENG" ? "Pending payments" : "Хүлээгдэж буй төлбөр", value: "14", detail: language === "ENG" ? "Require approval" : "Баталгаажуулалт шаардлагатай" },
        { label: language === "ENG" ? "Expiring memberships" : "Эрх дуусах гишүүд", value: "32", detail: language === "ENG" ? "Next 7 days" : "Дараагийн 7 хоногт" },
        { label: language === "ENG" ? "Next class" : "Дараагийн хичээл", value: language === "ENG" ? "18:30 - Strength" : "18:30 Сунгалт", detail: language === "ENG" ? "Main hall · 12/20" : "Үндсэн заал · 12/20" },
    ];

    return (
        <div className="dashboard-page space-y-6 p-5 xl:p-8">
            <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between xl:p-6">
                <div>
                    <h1 className="mt-1 text-2xl font-bold leading-tight">{language === "ENG" ? "Dashboard" : "Хяналтын самбар"}</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                        {language === "ENG" ? "Today's snapshot: 216 check-ins, ₮3.8M revenue, 14 pending payments." : "Өнөөдрийн төлөв: 216 ирц, ₮3.8M орлого, 14 хүлээгдэж буй төлбөр."}
                    </p>
                </div>
                <Link
                    href={`/${slug}/app/admin/members`}
                    className="button-primary inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition"
                >
                    <UserPlus className="h-4 w-4" />
                    {language === "ENG" ? "Register member" : "Гишүүн бүртгэх"}
                </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-line bg-surface p-4 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm text-muted">{item.label}</p>
                                <p className="mt-2 text-3xl font-bold leading-tight">{item.value}</p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <item.icon className="h-5 w-5" />
                            </div>
                        </div>
                        <span className="mt-3 inline-flex text-xs font-medium text-muted">{item.detail}</span>
                    </div>
                ))}
            </div>

            <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold">{language === "ENG" ? "Quick actions" : "Шуурхай үйлдлүүд"}</p>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {quickActions.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="button-secondary inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold transition"
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                <section className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
                    <div className="border-b border-line p-5">
                        <p className="text-sm font-semibold">{language === "ENG" ? "Today's work" : "Өнөөдрийн ажил"}</p>
                    </div>

                    <div className="divide-y divide-line">
                        {todayTasks.map((task) => {
                            const Icon = task.icon;
                            return (
                                <Link key={task.id} href={task.href} className="flex items-start gap-3 p-4 hover:bg-surface-muted transition">
                                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${task.iconBg} ${task.iconColor}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium truncate">{task.title}</p>
                                            <ArrowRight className="h-4 w-4 text-muted" />
                                        </div>
                                        <p className="mt-1 text-sm text-muted">{task.subtitle}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <aside className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold">{language === "ENG" ? "Attention" : "Анхаарах зүйлс"}</p>
                            <p className="mt-1 text-xs text-muted">{language === "ENG" ? "Items that need your attention" : "Танд анхаарах зүйлс"}</p>
                        </div>
                        <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="mt-4 divide-y divide-line">
                        {attentionItems.map((item) => (
                            <div key={item.label} className="py-3 first:pt-0 last:pb-0">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-sm truncate font-medium">{item.label}</p>
                                        <p className="mt-1 text-xs text-muted">{item.detail}</p>
                                    </div>
                                    <div className="shrink-0 text-sm font-semibold">{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}
