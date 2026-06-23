import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fit.sys | Gym Management",
  description: "Next-gen fitness management for Mongolia",
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className="antialiased font-medium bg-background text-foreground tracking-tight selection:bg-primary/20">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
