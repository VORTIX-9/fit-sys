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
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar slug={slug} />
            <div className="ml-60 flex flex-1 flex-col transition-all duration-300">
                <Topbar slug={slug} />
                <main className="min-h-[calc(100vh-4rem)] p-5">
                    {children}
                </main>
            </div>
        </div>
    );
}
