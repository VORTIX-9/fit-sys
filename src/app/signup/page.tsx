"use client";

import { createOrganization } from "@/actions/signup";
import { useState } from "react";
import Link from "next/link";
import {
    AlertCircle,
    ArrowRight,
    Building2,
    CheckCircle2,
    CircleCheck,
    Clock3,
    Info,
    Lock,
    Mail,
    Phone,
    ShieldCheck,
    User,
    type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";

type SignupFormData = {
    gymName: string;
    subdomain: string;
    adminName: string;
    phone: string;
    email: string;
    password: string;
};

type FormInputProps = {
    label: string;
    name: keyof SignupFormData;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: LucideIcon;
    type?: string;
    placeholder: string;
};

function FeatureItem({ children }: { children: React.ReactNode }) {
    return (
        <div className="signup-feature-card flex min-h-[58px] items-center gap-4 rounded-2xl border px-5 text-[15px] font-semibold">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                <CircleCheck className="h-4 w-4" />
            </span>
            <span className="leading-5">{children}</span>
        </div>
    );
}

function TrustChip({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
    return (
        <div className="inline-flex min-h-10 items-center gap-2.5 rounded-xl border border-line bg-surface/80 px-4 text-sm font-semibold text-muted shadow-sm">
            <Icon className="h-4 w-4 text-primary" />
            {children}
        </div>
    );
}

function StepProgress({ step, label }: { step: number; label: string }) {
    const progress = step === 1 ? "50%" : "100%";

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold text-primary">
                    {label} {String(step).padStart(2, "0")} / 02
                </p>
                <p className="text-xs font-medium text-muted">{progress}</p>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-surface-muted">
                <div className="h-full rounded-full bg-primary transition-all duration-200 ease-out" style={{ width: progress }} />
            </div>
        </div>
    );
}

function FormInput({
    label,
    name,
    value,
    onChange,
    icon: Icon,
    type = "text",
    placeholder,
}: FormInputProps) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">{label}</label>
            <div className="relative">
                <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={type}
                    placeholder={placeholder}
                    className="input-field h-[58px] w-full rounded-xl pl-11 pr-4 text-sm transition placeholder:text-muted"
                />
            </div>
        </div>
    );
}

export default function SignupPage() {
    const { language, t } = useLanguage();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<SignupFormData>({
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

    const valuePoints = [t("signup_value_1"), t("signup_value_2"), t("signup_value_3")];
    const workspaceAddress = formData.subdomain ? `${formData.subdomain}.fitsys.mn` : "titan.fitsys.mn";
    const isAdminStepValid = Boolean(formData.adminName && formData.phone && formData.email && formData.password);

    const handleSignup = async () => {
        setIsLoading(true);
        setError("");

        try {
            const result = await createOrganization(formData);

            if (result.success) {
                if (!result.orgSlug) {
                    setError(language === "ENG" ? "Organization information was not found." : "Байгууллагын мэдээлэл олдсонгүй.");
                    return;
                }

                window.location.href = getTenantUrl(result.orgSlug);
            } else {
                setError(result.error || (language === "ENG" ? "Registration failed." : "Бүртгэл амжилтгүй боллоо."));
            }
        } catch (error) {
            console.error(error);
            setError(language === "ENG" ? "Something went wrong while registering. Please try again." : "Бүртгүүлэх үед алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.");
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
                        <Link
                            href="/login"
                            className="button-primary hidden h-10 items-center justify-center rounded-lg px-5 text-sm font-semibold shadow-sm transition active:scale-[0.98] sm:inline-flex"
                        >
                            {t("login")}
                        </Link>
                    </div>
                </div>
            </header>

            <main className="signup-stage min-h-[calc(100svh-72px)] overflow-y-auto lg:h-[calc(100svh-72px)] lg:overflow-hidden">
                <section className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1540px] gap-10 px-6 py-8 sm:px-8 lg:h-full lg:grid-cols-[1fr_0.86fr] lg:items-center xl:gap-20 xl:px-10">
                    <section className="order-2 flex items-center lg:order-1">
                        <div className="max-w-[680px]">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-muted shadow-sm">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                {t("gym_registration")}
                            </div>
                            <h1 className="max-w-[680px] text-[42px] font-bold leading-[1.08] xl:leading-[0.98] tracking-[-0.035em] tracking-normal text-foreground sm:text-5xl xl:text-[60px]">
                                {t("signup_hero_title")}
                            </h1>
                            <p className="mt-6 max-w-[610px] text-[17px] leading-8 text-muted">
                                {t("signup_hero_desc")}
                            </p>

                            <div className="mt-8 grid max-w-[680px] gap-3">
                                {valuePoints.map((item) => (
                                    <FeatureItem key={item}>{item}</FeatureItem>
                                ))}
                            </div>

                            <div className="mt-6 flex max-w-[680px] flex-wrap gap-3">
                                <TrustChip icon={Clock3}>{t("signup_fast_setup")}</TrustChip>
                                <TrustChip icon={ShieldCheck}>{t("signup_role_access")}</TrustChip>
                            </div>
                        </div>
                    </section>

                    <section className="order-1 mx-auto flex w-full items-center justify-center lg:order-2 lg:mx-0">
                        <div className="signup-card w-full max-w-[560px] rounded-[28px] border bg-surface p-7 sm:p-8 xl:p-9">
                            <div className="space-y-7">
                                <StepProgress step={step} label={language === "ENG" ? "Step" : "Алхам"} />

                                <div>
                                    <h2 className="text-[28px] font-bold leading-tight text-foreground">
                                        {step === 1 ? t("org_profile") : t("admin_setup")}
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-muted">
                                        {step === 1 ? t("signup_org_help") : t("signup_admin_help")}
                                    </p>
                                </div>

                                {step === 1 ? (
                                    <div className="space-y-5">
                                        <FormInput
                                            label={t("gym_name")}
                                            name="gymName"
                                            value={formData.gymName}
                                            onChange={handleChange}
                                            icon={Building2}
                                            placeholder="Titan Fitness"
                                        />

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-foreground">{t("subdomain")}</label>
                                            <div className="grid grid-cols-[1fr_auto]">
                                                <input
                                                    name="subdomain"
                                                    value={formData.subdomain}
                                                    onChange={handleChange}
                                                    type="text"
                                                    placeholder="titan"
                                                    className="input-field h-[56px] min-w-0 rounded-l-xl border-r-0 px-4 text-sm transition placeholder:text-muted"
                                                />
                                                <div className="flex h-[56px] items-center rounded-r-xl border border-line bg-surface-muted px-4 text-sm font-medium text-muted">
                                                    .fitsys.mn
                                                </div>
                                            </div>
                                            <div className="mt-3 rounded-2xl border border-line bg-surface-muted px-4 py-3.5 text-sm">
                                                <p className="text-xs font-semibold text-muted">{t("signup_address_preview")}</p>
                                                <p className="mt-1 break-all font-semibold text-foreground">{workspaceAddress}</p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            disabled={!formData.gymName || !formData.subdomain}
                                            className="button-primary flex h-[56px] w-full items-center justify-center gap-2 rounded-xl text-sm font-bold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {t("continue")}
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-5">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <FormInput
                                                label={t("full_name")}
                                                name="adminName"
                                                value={formData.adminName}
                                                onChange={handleChange}
                                                icon={User}
                                                placeholder={language === "ENG" ? "Bat Erdene" : "Б. Бат-Эрдэнэ"}
                                            />
                                            <FormInput
                                                label={t("phone")}
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                icon={Phone}
                                                placeholder="9911-XXXX"
                                            />
                                        </div>

                                        <FormInput
                                            label={t("email")}
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            icon={Mail}
                                            type="email"
                                            placeholder="admin@titan.mn"
                                        />

                                        <FormInput
                                            label={t("password")}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            icon={Lock}
                                            type="password"
                                            placeholder="••••••••"
                                        />

                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="button-secondary h-[54px] rounded-xl px-6 text-sm font-bold transition"
                                            >
                                                {t("back")}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleSignup}
                                                disabled={isLoading || !isAdminStepValid}
                                                className="button-primary flex h-[54px] flex-1 items-center justify-center gap-2 rounded-xl text-sm font-bold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {isLoading ? (language === "ENG" ? "Creating..." : "Бүртгэж байна...") : t("complete")}
                                                <CheckCircle2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <div className="flex gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <Info className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">{t("signup_ready_title")}</p>
                                                <p className="mt-1 text-[13px] leading-5 text-muted">{t("signup_ready_desc")}</p>
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
                                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                                <p>{error}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <p className="pt-1 text-center text-sm text-muted">
                                    {t("already_account")}{" "}
                                    <Link href="/login" className="font-semibold text-primary hover:underline">
                                        {t("login")}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
        </div>
    );
}
