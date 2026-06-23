import AdminDashboardPlaceholder from "@/components/dashboard/AdminDashboardPlaceholder";

export default async function AdminDashboardPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    return (
        <div className="p-10">
            <AdminDashboardPlaceholder slug={slug} />
        </div>
    );
}
