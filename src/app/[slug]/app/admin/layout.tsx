import Topbar from "@/components/app-shell/Topbar";
import Sidebar from "@/components/app-shell/Sidebar";

export default async function AdminLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { slug: string };
}) {
    const { slug } = await params;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Sidebar slug={slug} />
            <div className="transition-all duration-300 pl-64">
                <Topbar slug={slug} />
                <main className="min-h-[calc(100vh-6rem)]">
                    {children}
                </main>
            </div>
        </div>
    );
}
