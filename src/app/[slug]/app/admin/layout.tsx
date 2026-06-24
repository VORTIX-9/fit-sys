import AppShell from "@/components/app-shell/AppShell";

export default async function AdminLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return <AppShell slug={slug}>{children}</AppShell>;
}
