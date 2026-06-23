import AdminSectionPage from "@/components/dashboard/AdminSectionPage";

export default async function MembersPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return <AdminSectionPage slug={slug} section="members" />;
}
