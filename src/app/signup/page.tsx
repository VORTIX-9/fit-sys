"use client";

import { createOrganization } from "@/actions/signup";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Building2,
    User,
    Mail,
    Phone,
    Lock,
    Globe,
    ArrowRight,
    ShieldCheck,
    CheckCircle2
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function SignupPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        gymName: "",
        subdomain: "",
        adminName: "",
        phone: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSignup = async () => {
        setIsLoading(true);
        try {
            const result = await createOrganization(formData);
            if (result.success) {
                // Determine the correct redirect URL based on hostname
                const hostname = window.location.hostname;
                const port = window.location.port;
                const protocol = window.location.protocol;

                let redirectUrl = "";
                if (hostname.includes('localhost')) {
                    redirectUrl = `${protocol}//${formData.subdomain}.localhost${port ? `:${port}` : ''}/app/admin`;
                } else {
                    // Assuming production domain is fitsys.mn
                    redirectUrl = `${protocol}//${formData.subdomain}.fitsys.mn/app/admin`;
                }

                window.location.href = redirectUrl;
            } else {
                alert(result.error || "Signup failed");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
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
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-xl space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <header className="text-center space-y-4">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-full mb-4">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black text-foreground uppercase tracking-widest italic">{t('gym_registration')}</span>
                    </div>
                    <h1 className="text-5xl font-black text-foreground italic tracking-tighter uppercase">
                        {t('start_legacy')}
                    </h1>
                    <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">{t('register_org')}</p>
                </header>

                {/* Step Indicator */}
                <div className="flex gap-2">
                    {[1, 2].map((s) => (
                        <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-primary' : 'bg-foreground/5'}`} />
                    ))}
                </div>

                <div className="glass p-10 rounded-[40px] border border-foreground/5 shadow-2xl space-y-8">
                    {step === 1 ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-2">
                                <h2 className="text-xl font-black text-foreground italic uppercase tracking-tight">{t('org_profile')}</h2>
                                <p className="text-[11px] text-foreground/40 font-medium">{t('org_profile')}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest pl-2">{t('gym_name')}</label>
                                    <div className="relative group">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                        <input
                                            name="gymName"
                                            value={formData.gymName}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Apex Fitness"
                                            className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-hidden focus:border-primary/40 transition-all font-medium text-foreground"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest pl-2">{t('subdomain')}</label>
                                    <div className="flex items-stretch group">
                                        <input
                                            name="subdomain"
                                            value={formData.subdomain}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="apex"
                                            className="flex-1 bg-foreground/[0.03] border border-foreground/10 border-r-0 rounded-l-2xl py-4 px-4 text-sm focus:outline-hidden focus:border-primary/40 transition-all font-medium text-foreground text-right"
                                        />
                                        <div className="bg-foreground/5 border border-foreground/10 border-l-0 rounded-r-2xl px-6 flex items-center text-[11px] font-black text-foreground/40 uppercase tracking-widest">
                                            .fitsys.mn
                                        </div>
                                    </div>
                                    <p className="text-[9px] text-foreground/20 font-bold px-2 italic">{t('subdomain_hint')}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                disabled={!formData.gymName || !formData.subdomain}
                                className="w-full py-5 bg-primary text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                                {t('continue')}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-2">
                                <h2 className="text-xl font-black text-foreground italic uppercase tracking-tight">{t('admin_setup')}</h2>
                                <p className="text-[11px] text-foreground/40 font-medium">{t('admin_setup')}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest pl-2">{t('full_name')}</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                            <input
                                                name="adminName"
                                                value={formData.adminName}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Б. Дорж"
                                                className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-hidden focus:border-primary/40 transition-all font-medium text-foreground"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest pl-2">{t('phone')}</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="9911-XXXX"
                                                className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-hidden focus:border-primary/40 transition-all font-medium text-foreground"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest pl-2">{t('email')}</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="admin@apex.mn"
                                            className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-hidden focus:border-primary/40 transition-all font-medium text-foreground"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest pl-2">{t('password')}</label>
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
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-5 glass rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-foreground/5 transition-all text-foreground">
                                    {t('back')}
                                </button>
                                <button
                                    onClick={handleSignup}
                                    disabled={isLoading || !formData.adminName || !formData.email || !formData.password}
                                    className="flex-1 py-5 bg-primary text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                                    {isLoading ? "..." : t('complete')}
                                    <CheckCircle2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <p className="text-center text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em] italic">
                    {t('already_account')} <Link href="/login" className="text-foreground hover:text-primary underline underline-offset-4 transition-colors">{t('login')}</Link>
                </p>

                {/* Support Section */}
                <div className="flex justify-center gap-12 pt-8 border-t border-foreground/5 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                        <span className="text-[8px] font-black text-foreground uppercase tracking-widest">{t('unlimited_members')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                        <span className="text-[8px] font-black text-foreground uppercase tracking-widest">{t('qpay_integrated')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                        <span className="text-[8px] font-black text-foreground uppercase tracking-widest">{t('local_support')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
