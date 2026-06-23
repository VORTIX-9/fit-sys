"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Activity,
    Calendar,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    LayoutGrid,
    LogOut,
    Settings,
    Users,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";

type Role = "ADMIN" | "STAFF" | "MEMBER" | "OWNER";

export default function Sidebar({ slug }: { slug: string }) {
    const { t } = useLanguage();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const currentRole = (pathname.split("/")[3]?.toUpperCase() as Role) || "ADMIN";
    const dashboardHref = `/${slug}/app/${currentRole.toLowerCase()}`;

    const menuItems = [
        { icon: LayoutGrid, label: t("dashboard"), href: dashboardHref, roles: ["ADMIN", "OWNER", "STAFF", "MEMBER"] },
        { icon: Users, label: t("members"), href: `/${slug}/app/admin/members`, roles: ["ADMIN", "OWNER"] },
        { icon: CreditCard, label: t("payments"), href: `/${slug}/app/admin/payments`, roles: ["ADMIN", "OWNER", "STAFF"] },
        { icon: Calendar, label: t("classes"), href: `/${slug}/app/admin/classes`, roles: ["ADMIN", "OWNER", "STAFF", "MEMBER"] },
        { icon: Activity, label: t("attendance"), href: `/${slug}/app/admin/attendance`, roles: ["ADMIN", "OWNER", "STAFF"] },
        { icon: Settings, label: t("settings"), href: `/${slug}/app/admin/settings`, roles: ["ADMIN", "OWNER", "STAFF", "MEMBER"] },
    ];

    const filteredItems = menuItems.filter((item) => item.roles.includes(currentRole));

    return (
        <aside
            className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-line bg-surface transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}
        >
            <div className="flex h-16 items-center gap-3 border-b border-line px-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface p-1">
                    <BrandLogo variant="mark" className="h-6 w-6" priority />
                </div>
                {!collapsed && (
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{slug || "fit.sys"}</p>
                    </div>
                )}
            </div>

            <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
                {filteredItems.map((item) => {
                    const isDashboard = item.href === dashboardHref;
                    const isActive = isDashboard
                        ? pathname === item.href
                        : pathname === item.href || pathname.startsWith(`${item.href}/`);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={collapsed ? item.label : undefined}
                            className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition ${isActive
                                ? "bg-surface-muted text-foreground shadow-[inset_3px_0_0_var(--primary)]"
                                : "text-muted hover:bg-surface-muted hover:text-foreground"
                                }`}
                        >
                            <Icon className="h-4 w-4 shrink-0" />
                            {!collapsed && <span className="truncate">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="space-y-0.5 border-t border-line p-2">
                <button
                    type="button"
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-foreground"
                    aria-label={t("collapse")}
                    title={collapsed ? t("collapse") : undefined}
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    {!collapsed && <span>{t("collapse")}</span>}
                </button>

                <Link
                    href="/login"
                    className="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-danger"
                    title={collapsed ? t("logout") : undefined}
                >
                    <LogOut className="h-4 w-4" />
                    {!collapsed && <span>{t("logout")}</span>}
                </Link>
            </div>
        </aside>
    );
}
