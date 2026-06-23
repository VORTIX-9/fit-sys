import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fit.sys | Fitness Operations Platform",
  description: "Membership, payment, attendance, and class operations for fitness teams.",
  icons: {
    icon: "/fit-sys-mark.png",
    apple: "/fit-sys-mark.png",
  },
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
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
