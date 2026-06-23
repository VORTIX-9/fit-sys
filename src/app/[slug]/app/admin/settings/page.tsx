import AdminSectionPage from "@/components/dashboard/AdminSectionPage";

export default async function SettingsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return <AdminSectionPage slug={slug} section="settings" />;
}
