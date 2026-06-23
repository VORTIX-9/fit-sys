import AdminDashboardPlaceholder from "@/components/dashboard/AdminDashboardPlaceholder";

export default async function AdminDashboardPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return <AdminDashboardPlaceholder slug={slug} />;
}
