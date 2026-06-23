"use client";

import * as React from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Globe } from "lucide-react";

export function LanguageSwitch() {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === "MGL" ? "ENG" : "MGL")}
            className="h-11 px-5 glass rounded-xl border border-foreground/10 hover:border-primary/50 transition-all duration-500 flex items-center gap-2 group shadow-lg hover:shadow-primary/5 active:scale-95"
        >
            <Globe className="w-3.5 h-3.5 text-foreground/40 group-hover:text-primary transition-colors duration-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/60 group-hover:text-foreground transition-colors duration-500">
                {language}
            </span>
        </button>
    );
}

