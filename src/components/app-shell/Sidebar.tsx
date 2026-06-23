"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    CreditCard,
    Calendar,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ScanLine,
    Activity,
    Lock,
    LayoutGrid
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

type Role = 'ADMIN' | 'STAFF' | 'MEMBER' | 'OWNER';

export default function Sidebar({ slug }: { slug: string }) {
    const { t } = useLanguage();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    // Determine current role from pathname
    const currentRole = (pathname.split('/')[3]?.toUpperCase() as Role) || 'ADMIN';

    const menuItems = [
        { icon: LayoutGrid, label: t('dashboard'), href: `/${slug}/app/${currentRole.toLowerCase()}`, roles: ['ADMIN', 'OWNER', 'STAFF', 'MEMBER'] },
        { icon: Users, label: t('members'), href: `/${slug}/app/admin/members`, roles: ['ADMIN', 'OWNER'] },
        { icon: CreditCard, label: t('payments'), href: `/${slug}/app/admin/payments`, roles: ['ADMIN', 'OWNER', 'STAFF'] },
        { icon: Calendar, label: t('classes'), href: `/${slug}/app/admin/classes`, roles: ['ADMIN', 'OWNER', 'STAFF', 'MEMBER'] },
        { icon: Activity, label: t('attendance'), href: `/${slug}/app/staff/attendance`, roles: ['ADMIN', 'OWNER', 'STAFF'] },
        { icon: Settings, label: t('settings'), href: `/${slug}/app/admin/settings`, roles: ['ADMIN', 'OWNER', 'STAFF', 'MEMBER'] },
    ];

    const filteredItems = menuItems.filter(item => item.roles.includes(currentRole));

    return (
        <aside
            className={`fixed left-0 top-0 h-screen glass border-r border-foreground/5 transition-all duration-300 z-50 flex flex-col
        ${collapsed ? "w-20" : "w-64"}`}
        >
            {/* Logo Section */}
            <div className="p-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-black text-2xl shadow-[0_0_20px_rgba(0,224,255,0.2)]">
                    {slug ? slug.charAt(0).toUpperCase() : 'F'}
                </div>
                {!collapsed && (
                    <div className="flex flex-col animate-in fade-in duration-500">
                        <span className="font-black text-xl tracking-tighter text-foreground italic">
                            {slug}<span className="text-secondary opacity-50 font-normal">.fit</span>
                        </span>
                        <div className="flex items-center gap-1.5 opacity-40">
                            <Lock className="w-2.5 h-2.5 text-primary" />
                            <span className="text-[8px] font-black uppercase tracking-widest">{currentRole} {t('portal')}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
                {filteredItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-5 px-5 py-4 rounded-2xl transition-all group relative overflow-hidden
                ${isActive
                                    ? "bg-primary text-black font-black shadow-lg shadow-primary/30"
                                    : "text-foreground/40 hover:bg-foreground/5 hover:text-foreground"}`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? "text-black" : "group-hover:text-primary transition-colors"}`} />
                            {!collapsed && (
                                <span className="text-[11px] uppercase tracking-[0.2em] animate-in fade-in slide-in-from-left-2 whitespace-nowrap">
                                    {item.label}
                                </span>
                            )}
                            {isActive && (
                                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 h-8 w-2 bg-black rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-foreground/5 space-y-3 bg-foreground/[0.01]">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center gap-5 px-5 py-4 rounded-xl text-foreground/30 hover:text-foreground hover:bg-foreground/5 transition-all group"
                >
                    {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    {!collapsed && <span className="text-[10px] font-black uppercase tracking-widest group-hover:tracking-[0.3em] transition-all">{t('collapse')}</span>}
                </button>
                <Link
                    href="/login"
                    className="w-full flex items-center gap-5 px-5 py-4 rounded-xl text-secondary/40 hover:text-secondary hover:bg-secondary/5 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    {!collapsed && <span className="text-[10px] font-black uppercase tracking-widest">{t('logout')}</span>}
                </Link>
            </div>
        </aside>
    );
}
