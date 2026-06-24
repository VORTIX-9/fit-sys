"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";

export default function LandingPage() {
  const { language, t } = useLanguage();

  const metrics = [
    { label: t("active_members"), value: "1,284", detail: "+48" },
    { label: t("today_revenue"), value: "3.8M", detail: "MNT" },
    { label: t("checkins_today"), value: "216", detail: language === "ENG" ? "members" : "гишүүн" },
    { label: t("class_fill"), value: "82%", detail: t("live_label") },
  ];

  const operations = [
    { label: t("next_class"), value: t("next_class_value") },
    { label: t("payment_queue"), value: t("payment_queue_value") },
    { label: t("renewal_alerts"), value: t("renewal_alerts_value") },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground lg:h-[100dvh] lg:overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-line bg-background/90 shadow-[0_1px_0_color-mix(in_srgb,var(--surface)_70%,transparent)] backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-[1720px] items-center justify-between px-6 sm:px-8 xl:px-10">
          <Link
            href="/"
            className="flex h-12 items-center gap-3 rounded-lg px-1.5 transition hover:bg-surface-muted"
            aria-label="fit.sys home"
          >
            <BrandLogo className="h-12 w-[170px]" priority />
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <LanguageSwitch />
              <ThemeToggle />
            </div>
            <Link
              href="/login"
              className="button-primary inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
            >
              {t("login")}
            </Link>
          </div>
        </nav>
      </header>

      <main className="soft-grid min-h-[calc(100dvh-80px)] lg:h-[calc(100dvh-80px)] lg:overflow-hidden">
        <section className="mx-auto grid min-h-[calc(100dvh-80px)] max-w-[1540px] gap-10 px-6 py-8 sm:px-8 lg:h-full lg:grid-cols-[1fr_1.14fr] lg:items-center xl:gap-20 xl:px-10">
          <div className="max-w-[680px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-medium text-muted shadow-sm">
              <ShieldCheck className="h-4 w-4 text-primary" />
              {t("hero_kicker")}
            </div>

            <h1 className="max-w-[660px] text-[42px] font-bold leading-[1.08] xl:leading-[0.98] tracking-[-0.035em] text-foreground sm:text-5xl xl:text-[60px]">
              {t("hero_title")}
            </h1>

            <p className="mt-6 max-w-[610px] text-[17px] leading-8 text-muted">
              {t("hero_subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="button-primary inline-flex h-[52px] items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition active:scale-[0.98]"
              >
                {t("try_free")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#dashboard-preview"
                className="button-secondary inline-flex h-[52px] items-center justify-center rounded-xl px-6 text-sm font-semibold transition"
              >
                {t("view_demo")}
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {[
                t("unlimited_members"),
                t("qpay_integrated"),
                t("local_support"),
              ].map((item) => (
                <div key={item} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-medium text-muted">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

          </div>

          <div
            id="dashboard-preview"
            className="product-preview scroll-mt-24 w-full justify-self-end rounded-[28px] p-5 sm:p-6 xl:p-7"
          >
            <div className="mb-5 flex items-center justify-between border-b border-line pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-muted text-primary ring-1 ring-line">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">{t("dashboard_label")}</p>
                  <p className="text-xs text-muted">{t("main_branch_today")}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="kpi-card rounded-2xl border border-line p-4">
                  <p className="min-h-8 text-xs leading-5 text-muted">{metric.label}</p>
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <span className="text-[26px] font-semibold leading-none text-foreground">{metric.value}</span>
                    <span className="text-xs font-medium text-muted">{metric.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.16fr_0.84fr]">
              <div className="rounded-2xl border border-line bg-surface p-5">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold">{t("attendance")}</p>
                  <ScanLine className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-5 space-y-3.5">
                  {["06:00", "09:00", "12:00", "15:00", "18:00"].map((time, index) => (
                    <div key={time} className="grid grid-cols-[52px_1fr_42px] items-center gap-3">
                      <span className="text-xs text-muted">{time}</span>
                      <div className="progress-track h-2 rounded-full">
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

              <div className="rounded-2xl border border-line bg-surface p-5">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-foreground">{t("schedule_overview")}</p>
                </div>
                <div className="mt-5 space-y-4">
                  {operations.map((item) => (
                    <div key={item.label} className="flex min-w-0 items-center justify-between gap-4 border-b border-line pb-4 last:border-b-0 last:pb-0">
                      <span className="min-w-0 text-sm font-normal text-muted">{item.label}</span>
                      <span className="min-w-0 text-right text-sm font-semibold text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-line bg-surface p-5">
              <div>
                <p className="text-base font-semibold">{t("realtime_control")}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{t("operations_sync")}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
