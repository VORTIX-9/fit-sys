import { Bell, Search, User } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Topbar({ slug }: { slug: string }) {
    const { t } = useLanguage();

    return (
        <header className="sticky top-0 h-24 glass border-b border-white/5 z-40 px-10 flex items-center justify-between bg-black/20">
            {/* Search Bar Placeholder */}
            <div className="relative w-full max-w-lg hidden lg:block">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                <input
                    type="text"
                    placeholder={t('search')}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 pl-14 pr-6 text-xs font-medium focus:outline-hidden focus:border-primary/30 focus:bg-white/[0.05] transition-all placeholder:text-foreground/20 italic"
                />
            </div>

            <div className="flex items-center gap-6">
                {/* Theme & Language Controls */}
                <div className="flex items-center gap-3 pr-6 border-r border-white/5">
                    <LanguageSwitch />
                    <ThemeToggle />
                </div>

                {/* Notifications */}
                <button className="relative p-3 text-foreground/40 hover:text-primary hover:bg-white/5 rounded-xl transition-all group">
                    <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-background shadow-[0_0_10px_rgba(255,0,122,0.5)]" />
                </button>

                {/* User Menu */}
                <div className="flex items-center gap-4 pl-6 border-l border-white/5">
                    <div className="text-right hidden sm:block space-y-0.5">
                        <p className="text-[10px] font-black text-white uppercase tracking-widest italic">Д. БАТ-ЭРДЭНЭ</p>
                        <div className="flex justify-end items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <p className="text-[9px] text-primary/60 font-black uppercase tracking-tighter">{slug ? slug : 'SYSTEM'} ADMIN</p>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 p-[1px] hover:scale-105 transition-transform cursor-pointer shadow-lg">
                        <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center text-foreground/30 border border-white/5">
                            <User className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

