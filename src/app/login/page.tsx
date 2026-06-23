"use client";

import { loginUser } from "@/actions/login";
import { useState } from "react";
import Link from "next/link";
import {
    Building2,
    Mail,
    Lock,
    ArrowRight,
    ShieldCheck,
    Smartphone,
    User,
    Phone,
    AlertCircle
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function LoginPage() {
    const { t } = useLanguage();
    const [role, setRole] = useState<'ADMIN' | 'MEMBER' | 'STAFF' | null>(null);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError(""); // Clear error on input change
    };

    const handleLogin = async () => {
        setIsLoading(true);
        setError("");

        try {
            const result = await loginUser(formData);

            if (result.success) {
                // Redirect based on role
                const hostname = window.location.hostname;
                const port = window.location.port;
                const protocol = window.location.protocol;

                let redirectUrl = "";
                const roleRoute = result.role === 'OWNER' || result.role === 'MANAGER' ? 'admin' : result.role?.toLowerCase();

                if (hostname.includes('localhost')) {
                    redirectUrl = `${protocol}//${result.orgSlug}.localhost${port ? `:${port}` : ''}/app/${roleRoute}`;
                } else {
                    redirectUrl = `${protocol}//${result.orgSlug}.fitsys.mn/app/${roleRoute}`;
                }

                window.location.href = redirectUrl;
            } else {
                setError(result.error || "Нэвтрэх амжилтгүй боллоо");
            }
        } catch (error) {
            console.error(error);
            setError("Алдаа гарлаа");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-8 right-8 z-50 flex items-center gap-4">
                <LanguageSwitch />
                <ThemeToggle />
            </div>

            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[30%] h-[30%] bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[20%] w-[30%] h-[30%] bg-secondary/10 blur-[120px] rounded-full" />
            </div>


            <div className="w-full max-w-lg space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <header className="text-center space-y-4">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-full mb-4">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black text-foreground uppercase tracking-widest italic">{t('access_portal')}</span>
                    </div>
                    <h1 className="text-5xl font-black text-foreground italic tracking-tighter uppercase">
                        fit<span className="text-primary">.sys</span>
                    </h1>

                    <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">{t('enter_credentials')}</p>
                </header>

                <div className="glass p-10 rounded-[40px] border border-foreground/5 shadow-2xl space-y-10">
                    {/* Role Quick Selector (Mock for visual guide) */}
                    <div className="grid grid-cols-3 gap-3 p-1 bg-foreground/5 rounded-2xl">

                        {(['ADMIN', 'STAFF', 'MEMBER'] as const).map(r => (
                            <button
                                key={r}
                                onClick={() => setRole(r)}
                                className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${role === r ? 'bg-primary text-black' : 'text-foreground/30 hover:text-foreground'}`}>
                                {t(r.toLowerCase())}
                            </button>

                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest pl-2">{t('email')}</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="admin@gym.mn"
                                    className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-hidden focus:border-primary/40 transition-all font-medium text-foreground"
                                />
                            </div>
                        </div>


                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-2">
                                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">{t('password')}</label>
                                <button className="text-[9px] font-black text-primary/40 uppercase tracking-widest hover:text-primary transition-colors">{t('forgot_password')}</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                <input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-hidden focus:border-primary/40 transition-all font-medium text-foreground"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <p className="text-sm font-bold text-red-500">{error}</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={isLoading || !formData.email || !formData.password}
                        className="w-full py-5 bg-primary text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                        {isLoading ? "..." : t('login')}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                    <p className="text-center text-[9px] font-black text-foreground/20 uppercase tracking-widest">{t('or_continue_with')}</p>
                    <button className="w-full py-4 glass rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Smartphone className="w-4 h-4 text-primary" />
                        {t('otp_sms')}
                    </button>
                </div>
            </div>

            <p className="text-center text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em] italic">
                {t('no_account')} <Link href="/signup" className="text-foreground hover:text-primary underline underline-offset-4 transition-colors">{t('signup')}</Link>
            </p>


            {/* Footer Meta */}
            <div className="flex justify-center items-center gap-6 pt-8 opacity-20">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">{t('security_standard')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">{t('local_hosting')}</span>
                </div>
            </div>
        </div>
    );
}
