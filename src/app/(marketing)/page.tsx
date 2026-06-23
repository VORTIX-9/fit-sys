"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  Dumbbell,
  LayoutDashboard,
  ScanLine,
  ShieldCheck,
  Users,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";

export default function LandingPage() {
  const { t } = useLanguage();

  const metrics = [
    { label: t("active_members"), value: "1,284", detail: "+48" },
    { label: t("today_revenue"), value: "3.8M", detail: "MNT" },
    { label: t("checkins_today"), value: "216", detail: "QR" },
    { label: t("class_fill"), value: "82%", detail: "live" },
  ];

  const benefits = [
    { title: t("benefit_1_title"), desc: t("benefit_1_desc"), icon: Users },
    { title: t("benefit_2_title"), desc: t("benefit_2_desc"), icon: CreditCard },
    { title: t("benefit_3_title"), desc: t("benefit_3_desc"), icon: CalendarCheck },
  ];

  const operations = [
    { label: t("next_class"), value: t("next_class_value"), tone: "text-primary" },
    { label: t("payment_queue"), value: t("payment_queue_value"), tone: "text-primary" },
    { label: t("renewal_alerts"), value: t("renewal_alerts_value"), tone: "text-primary" },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur">
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-3" aria-label="fit.sys home">
            <BrandLogo className="h-12 w-[150px]" priority />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <Link href="#features" className="text-sm font-medium text-muted transition hover:text-foreground">
              {t("features")}
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted transition hover:text-foreground">
              {t("pricing")}
            </Link>
            <Link href="#contact" className="text-sm font-medium text-muted transition hover:text-foreground">
              {t("contact")}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <LanguageSwitch />
              <ThemeToggle />
            </div>
            <Link
              href="/login"
              className="button-secondary inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition"
            >
              {t("login")}
            </Link>
          </div>
        </nav>
      </header>

      <main className="soft-grid">
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium text-muted">
              <ShieldCheck className="h-4 w-4 text-primary" />
              {t("hero_kicker")}
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-foreground">
              {t("hero_title")}
            </h1>

            <p className="mt-5 text-base leading-8 text-muted">
              {t("hero_subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="button-primary inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition active:scale-[0.98]"
              >
                {t("try_free")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="button-secondary inline-flex h-12 items-center justify-center rounded-lg px-5 text-sm font-semibold transition"
              >
                {t("system_access")}
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                t("unlimited_members"),
                t("qpay_integrated"),
                t("local_support"),
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel rounded-lg p-4">
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t("dashboard_label")}</p>
                  <p className="text-xs text-slate-500">Үндсэн салбар / Өнөөдөр</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Live
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">{metric.label}</p>
                  <div className="mt-2 flex items-end justify-between gap-2">
                    <span className="text-2xl font-semibold text-slate-900">{metric.value}</span>
                    <span className="text-xs font-medium text-slate-500">{metric.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-lg border border-line bg-surface p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{t("attendance")}</p>
                  <ScanLine className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-5 space-y-3">
                  {["06:00", "09:00", "12:00", "15:00", "18:00"].map((time, index) => (
                    <div key={time} className="grid grid-cols-[52px_1fr_42px] items-center gap-3">
                      <span className="text-xs text-muted">{time}</span>
                      <div className="h-2 rounded-full bg-surface-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${42 + index * 11}%` }}
                        />
                      </div>
                      <span className="text-right text-xs font-medium text-muted">{42 + index * 11}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Хичээлийн төлөв</p>
                  <Dumbbell className="h-4 w-4 text-blue-600" />
                </div>
                <div className="mt-4 space-y-3">
                  {operations.map((item) => (
                    <div key={item.label} className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
                      <span className="min-w-0 text-sm text-slate-500 font-normal whitespace-nowrap">{item.label}</span>
                      <span className="min-w-0 text-sm font-semibold text-slate-900 whitespace-nowrap">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-lg border border-line bg-surface p-4">
              <div>
                <p className="text-sm font-semibold">{t("realtime_control")}</p>
                <p className="mt-1 text-xs text-muted">Ресепшн, админ болон гишүүний порталын мэдээлэл бодит цагт нэгэн зэрэг шинэчлэгдэнэ.</p>
              </div>
              <BarChart3 className="h-5 w-5 text-accent" />
            </div>
          </div>
        </section>

        <section id="features" className="border-y border-line bg-surface/80">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-semibold text-primary">{t("growth_engine")}</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight">{t("trust_title")}</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-muted">{t("trust_desc")}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="surface-panel rounded-lg p-5">
                  <benefit.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-5 text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{benefit.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-3">
          {[
            { label: t("realtime_control"), value: "Admin", icon: LayoutDashboard },
            { label: t("qr_attendance"), value: "Staff", icon: ScanLine },
            { label: t("system_access"), value: "Member", icon: Users },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-lg border border-line bg-surface p-5">
              <div>
                <p className="text-sm text-muted">{item.value}</p>
                <p className="mt-1 font-semibold">{item.label}</p>
              </div>
              <item.icon className="h-5 w-5 text-primary" />
            </div>
          ))}
        </section>
      </main>

      <footer id="contact" className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <BrandLogo className="h-12 w-[150px]" />
            <p className="mt-1 text-sm text-muted">Fitness operations platform for Mongolia.</p>
          </div>
          <Link
            href="/signup"
            className="button-primary inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition"
          >
            {t("try_free")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
