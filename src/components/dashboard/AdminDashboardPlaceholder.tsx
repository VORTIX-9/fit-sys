"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPlaceholder({ slug }: { slug: string }) {
    const { t } = useLanguage();

    const stats = [
        { label: t("active_members"), value: "1,284", detail: "+18" },
        { label: t("today_revenue"), value: "3.8M", detail: "MNT" },
        { label: t("checkins_today"), value: "216", detail: "QR" },
        { label: t("class_fill"), value: "82%", detail: "avg" },
    ];

    const checklistItems = [
        { id: "plans", label: t("setup_plans"), href: `/${slug}/app/admin/memberships` },
        { id: "members", label: t("setup_members"), href: `/${slug}/app/admin/members` },
        { id: "payments", label: t("setup_payments"), href: `/${slug}/app/admin/payments` },
        { id: "schedule", label: t("setup_schedule"), href: `/${slug}/app/admin/classes` },
    ];

    return (
        <div className="space-y-5 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold leading-tight">{t("dashboard")}</h1>
                    <p className="mt-1 text-sm text-muted">{t("dashboard_label")}</p>
                </div>
                <Link
                    href={`/${slug}/app/admin/members`}
                    className="button-primary inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold transition"
                >
                    {t("members")}
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                    <div key={item.label} className="rounded-md border border-line bg-surface p-4">
                        <div className="flex items-baseline justify-between gap-3">
                            <p className="text-sm text-muted">{item.label}</p>
                            <span className="text-xs text-muted">{item.detail}</span>
                        </div>
                        <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                <section className="rounded-md border border-line bg-surface">
                    <div className="border-b border-line p-4">
                        <p className="text-sm font-semibold">{t("setup_title")}</p>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">{t("setup_desc")}</p>
                    </div>

                    <div className="divide-y divide-line">
                        {checklistItems.map((item, index) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="grid grid-cols-[40px_1fr_auto] items-center gap-3 p-4 text-sm transition hover:bg-surface-muted"
                            >
                                <span className="text-xs font-medium text-muted">{String(index + 1).padStart(2, "0")}</span>
                                <span className="font-medium">{item.label}</span>
                                <ArrowRight className="h-4 w-4 text-muted" />
                            </Link>
                        ))}
                    </div>
                </section>

                <aside className="rounded-md border border-line bg-surface p-4">
                    <p className="text-sm font-semibold">{t("realtime_control")}</p>
                    <div className="mt-4 divide-y divide-line">
                        {[
                            { label: t("next_class"), value: "18:30 Strength" },
                            { label: t("payment_queue"), value: "14" },
                            { label: t("renewal_alerts"), value: "32" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                                <span className="text-sm text-muted">{item.label}</span>
                                <span className="text-sm font-semibold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}
