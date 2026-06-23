import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                surface: "var(--surface)",
                "surface-muted": "var(--surface-muted)",
                muted: "var(--muted)",
                line: "var(--line)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                card: {
                    DEFAULT: "var(--surface)",
                    foreground: "var(--foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: "var(--secondary)",
                success: "var(--success)",
                warning: "var(--warning)",
                danger: "var(--danger)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
        },
    },
    plugins: [],
} satisfies Config;
