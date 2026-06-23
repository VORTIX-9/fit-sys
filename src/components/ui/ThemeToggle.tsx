"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Prevent hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-11 h-11 glass rounded-xl border border-foreground/5 opacity-20" />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="group relative h-11 w-11 glass rounded-xl border border-foreground/10 hover:border-primary/50 transition-all duration-500 overflow-hidden flex items-center justify-center shadow-lg hover:shadow-primary/10 active:scale-95"
            aria-label="Toggle theme"
        >
            <div className="relative h-5 w-5">
                <Sun className="h-5 w-5 transition-all duration-500 transform rotate-0 scale-100 dark:-rotate-90 dark:scale-0 text-primary group-hover:scale-110" />
                <Moon className="absolute inset-0 h-5 w-5 transition-all duration-500 transform rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-secondary group-hover:scale-110" />
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}

