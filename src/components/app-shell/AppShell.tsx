"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({
    children,
    slug
}: {
    children: React.ReactNode;
    slug: string;
}) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Sidebar slug={slug} collapsed={collapsed} onCollapsedChange={setCollapsed} />
            <div className={`flex min-h-screen flex-col transition-all duration-300 ${collapsed ? "pl-16" : "pl-64"}`}>
                <Topbar slug={slug} />
                <main className="min-h-[calc(100vh-4rem)] bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
}
