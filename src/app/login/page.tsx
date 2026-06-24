"use client";

import { loginUser } from "@/actions/login";
import { useState } from "react";
import Link from "next/link";
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Lock,
    Mail,
    ShieldCheck,
    Smartphone,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";

export default function LoginPage() {
    const { language, t } = useLanguage();
    const [role, setRole] = useState<"ADMIN" | "MEMBER" | "STAFF" | null>("ADMIN");
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const getTenantUrl = (slug: string, route: string) => {
        const { hostname, port, protocol, origin } = window.location;

        if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".localhost")) {
            const localHost = hostname.endsWith(".localhost") ? "localhost" : hostname;
            return `${protocol}//${localHost}${port ? `:${port}` : ""}/${slug}/app/${route}`;
        }

        if (hostname.endsWith(".fitsys.mn")) {
            return `${protocol}//${slug}.fitsys.mn/app/${route}`;
        }

        return `${origin}/${slug}/app/${route}`;
    };

    const handleLogin = async () => {
        setIsLoading(true);
        setError("");

        try {
            const result = await loginUser(formData);

            if (result.success) {
                if (!result.orgSlug) {
                    setError(language === "ENG" ? "Organization information was not found." : "Байгууллагын мэдээлэл олдсонгүй.");
                    return;
                }

                const roleRoute = result.role === "OWNER" || result.role === "MANAGER"
                    ? "admin"
                    : result.role?.toLowerCase();

                window.location.href = getTenantUrl(result.orgSlug, roleRoute || "admin");
            } else {
                setError(result.error || (language === "ENG" ? "The login information is incorrect." : "Нэвтрэх мэдээлэл буруу байна."));
            }
        } catch (error) {
            console.error(error);
            setError(language === "ENG" ? "Something went wrong while signing in." : "Нэвтрэх үед алдаа гарлаа.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-background text-foreground lg:h-[100svh] lg:overflow-hidden">
            <header className="sticky top-0 z-40 border-b border-line bg-background/90 shadow-[0_1px_0_color-mix(in_srgb,var(--surface)_70%,transparent)] backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-[1720px] items-center justify-between px-6 sm:px-8 xl:px-10">
                    <Link
                        href="/"
                        className="flex h-12 items-center gap-3 rounded-lg px-1.5 transition hover:bg-surface-muted"
                        aria-label="fit.sys home"
                    >
                        <BrandLogo className="h-12 w-[170px]" priority />
                    </Link>
                    <div className="flex items-center gap-2">
                        <LanguageSwitch />
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="signup-stage min-h-[calc(100svh-72px)] overflow-y-auto lg:h-[calc(100svh-72px)] lg:overflow-hidden">
                <section className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1540px] gap-10 px-6 py-8 sm:px-8 lg:h-full lg:grid-cols-[1fr_0.86fr] lg:items-center xl:gap-20 xl:px-10">
                    <section className="hidden items-center lg:flex">
                        <div className="max-w-[680px]">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-muted shadow-sm">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                {t("access_portal")}
                            </div>
                            <h1 className="max-w-[680px] text-[42px] font-bold leading-[1.08] xl:leading-[0.98] tracking-[-0.035em] text-foreground sm:text-5xl xl:text-[60px]">
                                {t("enter_credentials")}
                            </h1>
                            <p className="mt-6 max-w-[610px] text-[17px] leading-8 text-muted">
                                {t("login_context")}
                            </p>

                            <div className="mt-8 grid max-w-[680px] gap-3">
                                {[t("security_standard"), t("qpay_integrated"), t("local_support")].map((item) => (
                                    <div key={item} className="signup-feature-card flex min-h-[58px] items-center gap-4 rounded-2xl border px-5 text-[15px] font-semibold">
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto flex w-full items-center justify-center lg:mx-0">
                        <div className="signup-card w-full max-w-[520px] rounded-[28px] border bg-surface p-7 sm:p-8 xl:p-9">
                            <div className="mb-7">
                                <p className="text-sm font-semibold text-primary">{t("access_portal")}</p>
                                <h2 className="mt-2 text-[28px] font-bold leading-tight">{t("login")}</h2>
                                <p className="mt-2 text-sm leading-6 text-muted">{t("enter_credentials")}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-1 rounded-2xl border border-line bg-surface-muted p-1">
                                {(["ADMIN", "STAFF", "MEMBER"] as const).map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setRole(item)}
                                        className={`h-10 rounded-xl text-sm font-semibold transition ${role === item
                                            ? "bg-surface text-foreground shadow-sm"
                                            : "text-muted hover:text-foreground"
                                            }`}
                                    >
                                        {t(item.toLowerCase())}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-foreground">{t("email")}</label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="admin@gym.mn"
                                            className="input-field h-[56px] w-full rounded-xl pl-11 pr-4 text-sm transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <label className="text-sm font-semibold text-foreground">{t("password")}</label>
                                        <button type="button" className="text-sm font-semibold text-primary hover:underline">
                                            {t("forgot_password")}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                                        <input
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            type="password"
                                            placeholder="••••••••"
                                            className="input-field h-[56px] w-full rounded-xl pl-11 pr-4 text-sm transition"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
                                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                        <p>{error}</p>
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={handleLogin}
                                disabled={isLoading || !formData.email || !formData.password}
                                className="button-primary mt-6 flex h-[56px] w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isLoading ? (language === "ENG" ? "Signing in..." : "Нэвтэрч байна...") : t("login")}
                                <ArrowRight className="h-4 w-4" />
                            </button>

                            <div className="my-5 h-px bg-line" />

                            <button
                                type="button"
                                className="button-secondary flex h-[52px] w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition"
                            >
                                <Smartphone className="h-4 w-4 text-primary" />
                                {t("otp_sms")}
                            </button>

                            <p className="mt-5 text-center text-sm text-muted">
                                {t("no_account")}{" "}
                                <Link href="/signup" className="font-semibold text-primary hover:underline">
                                    {t("signup")}
                                </Link>
                            </p>
                        </div>
                    </section>
                </section>
            </main>
        </div>
    );
}
