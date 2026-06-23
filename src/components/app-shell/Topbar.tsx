"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bell, Calendar, CreditCard, LogOut, Search, Settings, User, UserCircle, Users } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Topbar({ slug }: { slug: string }) {
    const { language, t } = useLanguage();
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const profileRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (!searchRef.current?.contains(event.target as Node)) {
                setSearchOpen(false);
            }

            if (!notificationRef.current?.contains(event.target as Node)) {
                setNotificationsOpen(false);
            }

            if (!profileRef.current?.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSearchOpen(false);
                setNotificationsOpen(false);
                setProfileOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const profileLabel = language === "ENG" ? "Profile" : "Профайл";
    const quickLabel = language === "ENG" ? "Quick search" : "Шуурхай хайлт";
    const notificationsLabel = language === "ENG" ? "Notifications" : "Мэдэгдэл";
    const settingsLabel = language === "ENG" ? "Account settings" : "Бүртгэлийн тохиргоо";
    const roleLabel = `${slug || "system"} admin`;
    const quickLinks = [
        { label: t("members"), detail: language === "ENG" ? "Member list and renewals" : "Гишүүд, сунгалт", href: `/${slug}/app/admin/members`, icon: Users },
        { label: t("payments"), detail: language === "ENG" ? "Payments and reports" : "Төлбөр, тайлан", href: `/${slug}/app/admin/payments`, icon: CreditCard },
        { label: t("classes"), detail: language === "ENG" ? "Schedule and bookings" : "Хуваарь, захиалга", href: `/${slug}/app/admin/classes`, icon: Calendar },
    ];
    const visibleQuickLinks = quickLinks.filter((item) => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) return true;

        return `${item.label} ${item.detail}`.toLowerCase().includes(query);
    });
    const notifications = [
        { title: t("renewal_alerts"), detail: language === "ENG" ? "32 members need follow-up" : "32 гишүүнд сануулга илгээх" },
        { title: t("payment_queue"), detail: language === "ENG" ? "14 payments waiting for review" : "14 төлбөр шалгах дараалалд байна" },
        { title: t("next_class"), detail: "18:30 Strength" },
    ];

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-background/95 px-5 backdrop-blur">
            <div ref={searchRef} className="relative hidden w-full max-w-md lg:block">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        placeholder={t("search")}
                        value={searchQuery}
                        onFocus={() => setSearchOpen(true)}
                        onChange={(event) => {
                            setSearchQuery(event.target.value);
                            setSearchOpen(true);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && visibleQuickLinks[0]) {
                                window.location.href = visibleQuickLinks[0].href;
                            }
                        }}
                        className="input-field h-9 w-full rounded-md pl-10 pr-3 text-sm transition"
                    />
                </div>

                {searchOpen && (
                    <div className="absolute left-0 top-11 z-50 w-full overflow-hidden rounded-md border border-line bg-surface shadow-lg">
                        <div className="border-b border-line px-3 py-2 text-xs font-medium text-muted">
                            {quickLabel}
                        </div>
                        <div className="p-1">
                            {visibleQuickLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSearchOpen(false)}
                                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition hover:bg-surface-muted"
                                >
                                    <item.icon className="h-4 w-4 text-muted" />
                                    <span className="min-w-0">
                                        <span className="block font-medium text-foreground">{item.label}</span>
                                        <span className="block truncate text-xs text-muted">{item.detail}</span>
                                    </span>
                                </Link>
                            ))}
                            {visibleQuickLinks.length === 0 && (
                                <div className="px-3 py-6 text-center text-sm text-muted">
                                    {language === "ENG" ? "No matching pages" : "Тохирох хуудас олдсонгүй"}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="ml-auto flex items-center gap-2">
                <div className="hidden items-center gap-2 sm:flex">
                    <LanguageSwitch />
                    <ThemeToggle />
                </div>

                <div ref={notificationRef} className="relative">
                    <button
                        type="button"
                        onClick={() => setNotificationsOpen((open) => !open)}
                        className="relative flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-muted transition hover:text-foreground"
                        aria-label={t("notifications")}
                        aria-expanded={notificationsOpen}
                        aria-haspopup="menu"
                        title={t("notifications")}
                    >
                        <Bell className="h-4 w-4" />
                        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-danger ring-2 ring-surface" />
                    </button>

                    {notificationsOpen && (
                        <div role="menu" className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-md border border-line bg-surface shadow-lg">
                            <div className="border-b border-line px-4 py-3">
                                <p className="text-sm font-semibold">{notificationsLabel}</p>
                            </div>
                            <div className="divide-y divide-line">
                                {notifications.map((item) => (
                                    <button
                                        key={item.title}
                                        type="button"
                                        role="menuitem"
                                        onClick={() => setNotificationsOpen(false)}
                                        className="block w-full px-4 py-3 text-left transition hover:bg-surface-muted"
                                    >
                                        <span className="block text-sm font-medium">{item.title}</span>
                                        <span className="mt-1 block text-xs text-muted">{item.detail}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div ref={profileRef} className="relative flex items-center gap-3 border-l border-line pl-3">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold">Д. Бат-Эрдэнэ</p>
                        <p className="text-xs text-muted">{roleLabel}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setProfileOpen((open) => !open)}
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-muted transition hover:text-foreground"
                        aria-label="Open user menu"
                        aria-expanded={profileOpen}
                        aria-haspopup="menu"
                        title="Open user menu"
                    >
                        <User className="h-4 w-4" />
                    </button>

                    {profileOpen && (
                        <div
                            role="menu"
                            className="absolute right-0 top-12 w-64 overflow-hidden rounded-md border border-line bg-surface shadow-lg"
                        >
                            <div className="border-b border-line p-4">
                                <p className="text-sm font-semibold">Д. Бат-Эрдэнэ</p>
                                <p className="mt-1 text-xs text-muted">{roleLabel}</p>
                            </div>
                            <div className="p-1">
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => setProfileOpen(false)}
                                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-foreground transition hover:bg-surface-muted"
                                >
                                    <UserCircle className="h-4 w-4 text-muted" />
                                    {profileLabel}
                                </button>
                                <Link
                                    href={`/${slug}/app/admin/settings`}
                                    role="menuitem"
                                    onClick={() => setProfileOpen(false)}
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground transition hover:bg-surface-muted"
                                >
                                    <Settings className="h-4 w-4 text-muted" />
                                    {settingsLabel}
                                </Link>
                                <Link
                                    href="/login"
                                    role="menuitem"
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-danger transition hover:bg-surface-muted"
                                >
                                    <LogOut className="h-4 w-4" />
                                    {t("logout")}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
