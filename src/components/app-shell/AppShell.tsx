import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({
    children,
    slug
}: {
    children: React.ReactNode;
    slug: string;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar slug={slug} />

            {/* Main Content Area */}
            {/* Margin left matches sidebar width (default 64) */}
            <div className="flex-1 flex flex-col ml-64 transition-all duration-300">
                <Topbar slug={slug} />

                <main className="p-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    {children}
                </main>
            </div>
        </div>
    );
}
