"use client";

import Link from "next/link";
import {
  Dumbbell,
  Users,
  CreditCard,
  Calendar,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Layout
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-100 glass border-b border-foreground/5 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-black">F</div>
          <span className="font-black text-xl italic tracking-tighter uppercase text-foreground">fit.sys</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {[t('features'), t('pricing'), t('contact')].map(item => (
            <Link key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors">{item}</Link>
          ))}
          <div className="flex items-center gap-3 border-l border-foreground/10 pl-6">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
          <Link href="/login" className="px-6 py-2.5 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-foreground/5 transition-all">{t('login')}</Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-3 px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-full animate-in fade-in slide-in-from-bottom-2 duration-700">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black text-foreground uppercase tracking-widest italic">All-in-One Gym OS</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-foreground italic tracking-tighter uppercase leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {t('hero_title')}
          </h1>

          <p className="max-w-xl mx-auto text-sm md:text-lg text-foreground/40 font-medium leading-relaxed">
            {t('hero_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/signup" className="w-full sm:w-auto px-10 py-5 bg-primary text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-3">
              {t('try_free')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="w-full sm:w-auto px-10 py-5 glass rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-foreground/5 transition-all">
              {t('login')}
            </Link>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: t('benefit_1_title'), desc: t('benefit_1_desc'), icon: Users, color: "text-blue-400" },
            { title: t('benefit_2_title'), desc: t('benefit_2_desc'), icon: CreditCard, color: "text-primary" },
            { title: t('benefit_3_title'), desc: t('benefit_3_desc'), icon: Calendar, color: "text-secondary" }
          ].map((benefit, i) => (
            <div key={i} className="glass p-10 rounded-[40px] border border-foreground/5 space-y-6 hover:border-primary/20 transition-all group">
              <div className={`p-4 rounded-2xl bg-foreground/5 w-fit ${benefit.color}`}>
                <benefit.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-black text-foreground italic uppercase tracking-tight">{benefit.title}</h3>
              <p className="text-sm text-foreground/40 font-medium leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </section>

        {/* Dynamic Trust Section */}
        <section className="glass rounded-[50px] p-12 flex flex-col md:flex-row items-center justify-between gap-12 border border-foreground/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full" />
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">{t('growth_engine')}</span>
            </div>
            <h2 className="text-4xl font-black text-foreground italic uppercase tracking-tighter">{t('trust_title')}</h2>
            <p className="text-xs text-foreground/40 font-medium leading-relaxed">{t('trust_desc')}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            {[
              { label: t('realtime_control'), icon: Layout },
              { label: t('qr_attendance'), icon: CheckCircle }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-foreground/5 border border-foreground/10 rounded-3xl flex flex-col items-center text-center gap-4 group-hover:bg-foreground/10 transition-all">
                <item.icon className="w-6 h-6 text-primary" />
                <span className="text-[9px] font-black text-foreground uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-foreground/5 text-center space-y-4 opacity-50">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 italic">© 2024 fit.sys — Powered by Antigravity</p>
      </footer>
    </div>
  );
}
