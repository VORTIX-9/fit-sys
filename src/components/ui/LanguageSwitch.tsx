"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Languages } from "lucide-react";

export function LanguageSwitch() {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            type="button"
            onClick={() => setLanguage(language === "MGL" ? "ENG" : "MGL")}
            className="flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm font-medium text-muted transition hover:text-foreground"
            aria-label="Switch language"
            title="Switch language"
        >
            <Languages className="h-4 w-4" />
            <span>{language}</span>
        </button>
    );
}
