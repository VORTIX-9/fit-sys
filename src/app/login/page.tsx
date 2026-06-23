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
    const { t } = useLanguage();
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
                    setError("Байгууллагын мэдээлэл олдсонгүй");
                    return;
                }

                const roleRoute = result.role === "OWNER" || result.role === "MANAGER"
                    ? "admin"
                    : result.role?.toLowerCase();

                window.location.href = getTenantUrl(result.orgSlug, roleRoute || "admin");
            } else {
                setError(result.error || "Нэвтрэх мэдээлэл буруу байна");
            }
        } catch (error) {
            console.error(error);
            setError("Нэвтрэх үед алдаа гарлаа");
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
                            <p className="mt-1 text-xs text-muted">{t("system_access")}</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2">
                        <LanguageSwitch />
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="soft-grid mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <section className="hidden lg:block">
                    <div className="max-w-md">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-muted">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            {t("access_portal")}
                        </div>
                        <h1 className="text-4xl font-semibold leading-tight">{t("enter_credentials")}</h1>
                        <p className="mt-5 text-base leading-8 text-muted">
                            Admin, staff, and member access stay separated by role, while the organization data stays in one place.
                        </p>

                        <div className="mt-8 space-y-3">
                            {[t("security_standard"), t("qpay_integrated"), t("local_support")].map((item) => (
                                <div key={item} className="flex items-center gap-3 text-sm text-muted">
                                    <CheckCircle2 className="h-4 w-4 text-success" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-md">
                    <div className="surface-panel rounded-lg p-6">
                        <div className="mb-6">
                            <p className="text-sm font-semibold text-primary">{t("access_portal")}</p>
                            <h2 className="mt-2 text-2xl font-semibold">{t("login")}</h2>
                            <p className="mt-2 text-sm text-muted">{t("enter_credentials")}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-1 rounded-lg border border-line bg-surface-muted p-1">
                            {(["ADMIN", "STAFF", "MEMBER"] as const).map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setRole(item)}
                                    className={`h-9 rounded-md text-sm font-medium transition ${role === item
                                        ? "bg-surface text-foreground shadow-sm"
                                        : "text-muted hover:text-foreground"
                                        }`}
                                >
                                    {t(item.toLowerCase())}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-foreground">{t("email")}</label>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="admin@gym.mn"
                                        className="input-field h-12 w-full rounded-lg pl-10 pr-3 text-sm transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <label className="text-sm font-medium text-foreground">{t("password")}</label>
                                    <button type="button" className="text-sm font-medium text-primary hover:underline">
                                        {t("forgot_password")}
                                    </button>
                                </div>
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

                            {error && (
                                <div className="flex items-start gap-3 rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
                                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleLogin}
                            disabled={isLoading || !formData.email || !formData.password}
                            className="button-primary mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading ? "..." : t("login")}
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <div className="my-6 h-px bg-line" />

                        <button
                            type="button"
                            className="button-secondary flex h-12 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold transition"
                        >
                            <Smartphone className="h-4 w-4 text-primary" />
                            {t("otp_sms")}
                        </button>
                    </div>

                    <p className="mt-5 text-center text-sm text-muted">
                        {t("no_account")}{" "}
                        <Link href="/signup" className="font-semibold text-primary hover:underline">
                            {t("signup")}
                        </Link>
                    </p>
                </section>
            </main>
        </div>
    );
}
