"use client";

import { createOrganization } from "@/actions/signup";
import { useState } from "react";
import Link from "next/link";
import {
    AlertCircle,
    ArrowRight,
    Building2,
    CheckCircle2,
    Lock,
    Mail,
    Phone,
    ShieldCheck,
    User,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";

export default function SignupPage() {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        gymName: "",
        subdomain: "",
        adminName: "",
        phone: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.name === "subdomain"
            ? e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
            : e.target.value;

        setFormData((prev) => ({ ...prev, [e.target.name]: value }));
        setError("");
    };

    const getTenantUrl = (slug: string) => {
        const { hostname, port, protocol, origin } = window.location;

        if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".localhost")) {
            const localHost = hostname.endsWith(".localhost") ? "localhost" : hostname;
            return `${protocol}//${localHost}${port ? `:${port}` : ""}/${slug}/app/admin`;
        }

        if (hostname.endsWith(".fitsys.mn")) {
            return `${protocol}//${slug}.fitsys.mn/app/admin`;
        }

        return `${origin}/${slug}/app/admin`;
    };

    const handleSignup = async () => {
        setIsLoading(true);
        setError("");

        try {
            const result = await createOrganization(formData);

            if (result.success) {
                if (!result.orgSlug) {
                    setError("Байгууллагын мэдээлэл олдсонгүй");
                    return;
                }

                window.location.href = getTenantUrl(result.orgSlug);
            } else {
                setError(result.error || "Бүртгэл амжилтгүй боллоо");
            }
        } catch (error) {
            console.error(error);
            setError("Бүртгүүлэх үед алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="border-b border-line bg-background/95">
                <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
                    <Link href="/" className="flex items-center gap-3">
                        <BrandLogo className="h-12 w-[150px]" priority />
                        <div>
                            <p className="mt-1 text-xs text-muted">{t("gym_registration")}</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2">
                        <LanguageSwitch />
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="soft-grid mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <section className="hidden lg:block">
                    <div className="max-w-md">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-muted">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            {t("gym_registration")}
                        </div>
                        <h1 className="text-4xl font-semibold leading-tight">{t("start_legacy")}</h1>
                        <p className="mt-5 text-base leading-8 text-muted">{t("register_org")}</p>

                        <div className="mt-8 grid gap-3">
                            {[t("setup_plans"), t("setup_payments"), t("setup_schedule")].map((item) => (
                                <div key={item} className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3 text-sm text-muted">
                                    <CheckCircle2 className="h-4 w-4 text-success" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-xl">
                    <div className="surface-panel rounded-lg p-6">
                        <div className="mb-6">
                            <p className="text-sm font-semibold text-primary">{t("gym_registration")}</p>
                            <h2 className="mt-2 text-2xl font-semibold">
                                {step === 1 ? t("org_profile") : t("admin_setup")}
                            </h2>
                            <p className="mt-2 text-sm text-muted">{t("register_org")}</p>
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-2">
                            {[1, 2].map((item) => (
                                <div
                                    key={item}
                                    className={`h-2 rounded-full ${item <= step ? "bg-primary" : "bg-surface-muted"}`}
                                />
                            ))}
                        </div>

                        {step === 1 ? (
                            <div className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">{t("gym_name")}</label>
                                    <div className="relative">
                                        <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                                        <input
                                            name="gymName"
                                            value={formData.gymName}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Apex Fitness"
                                            className="input-field h-12 w-full rounded-lg pl-10 pr-3 text-sm transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">{t("subdomain")}</label>
                                    <div className="grid grid-cols-[1fr_auto]">
                                        <input
                                            name="subdomain"
                                            value={formData.subdomain}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="apex"
                                            className="input-field h-12 min-w-0 rounded-l-lg border-r-0 px-3 text-sm transition"
                                        />
                                        <div className="flex h-12 items-center rounded-r-lg border border-line bg-surface-muted px-3 text-sm text-muted">
                                            .fitsys.mn
                                        </div>
                                    </div>
                                    <p className="mt-2 text-xs text-muted">{t("subdomain_hint")}</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!formData.gymName || !formData.subdomain}
                                    className="button-primary flex h-12 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {t("continue")}
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">{t("full_name")}</label>
                                        <div className="relative">
                                            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                                            <input
                                                name="adminName"
                                                value={formData.adminName}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="Б. Дорж"
                                                className="input-field h-12 w-full rounded-lg pl-10 pr-3 text-sm transition"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">{t("phone")}</label>
                                        <div className="relative">
                                            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder="9911-XXXX"
                                                className="input-field h-12 w-full rounded-lg pl-10 pr-3 text-sm transition"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">{t("email")}</label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="admin@apex.mn"
                                            className="input-field h-12 w-full rounded-lg pl-10 pr-3 text-sm transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">{t("password")}</label>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                                        <input
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            type="password"
                                            placeholder="••••••••"
                                            className="input-field h-12 w-full rounded-lg pl-10 pr-3 text-sm transition"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="button-secondary h-12 rounded-lg px-5 text-sm font-semibold transition"
                                    >
                                        {t("back")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSignup}
                                        disabled={isLoading || !formData.adminName || !formData.phone || !formData.email || !formData.password}
                                        className="button-primary flex h-12 flex-1 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isLoading ? "..." : t("complete")}
                                        <CheckCircle2 className="h-4 w-4" />
                                    </button>
                                </div>

                                {error && (
                                    <div className="flex items-start gap-3 rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
                                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                        <p>{error}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <p className="mt-5 text-center text-sm text-muted">
                        {t("already_account")}{" "}
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            {t("login")}
                        </Link>
                    </p>
                </section>
            </main>
        </div>
    );
}
