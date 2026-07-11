import ImageGallery from "@/components/pages/findSpace/workspace/details/ImagesGallery";
import PricingCard from "@/components/pages/findSpace/workspace/details/PricingCard";
import RelatedSpaces from "@/components/pages/findSpace/workspace/details/RelatedSpaces";
import WorkspaceAbout from "@/components/pages/findSpace/workspace/details/WorkspaceAbout";
import WorkspaceAmenities from "@/components/pages/findSpace/workspace/details/WorkspaceAmenities";
import WorkspaceHeader from "@/components/pages/findSpace/workspace/details/WorkSpaceHeader";
import WorkspaceReviews from "@/components/pages/findSpace/workspace/details/WorkspaceReviews";
import WorkspaceStats from "@/components/pages/findSpace/workspace/details/WorkSpaceStats";
import { getDataByCollection } from "@/lib/api/getData";
import { RelatedWorkspace, Review, Workspace } from "@/types/workspaceType";

async function getReviews(): Promise<Review[]> {
    return [
        {
            id: '1',
            userName: 'Jason Davis',
            userInitials: 'JD',
            date: 'October 2023',
            comment: 'Absolutely stunning view and the furniture is top notch. The internet speed was perfect for our team meetings.',
        },
        {
            id: '2',
            userName: 'Anna Müller',
            userInitials: 'AM',
            date: 'September 2023',
            comment: 'The gourmet coffee is a life saver! Really quiet space despite being in such a central location.',
        },
    ];
}

async function getRelatedSpaces(): Promise<RelatedWorkspace[]> {
    return [
        {
            _id: 'space-001',
            title: 'Skyline Loft',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHDQTENIqZniuIKAB6BZV4O6B-McfbaQjwmScnjmYxLHTKmI8wjl9XXZrkyydw-nd9myk9ZHqGUYbqJyBR5FUAmCNAkKFFrF_dmupbSR-RlCRjpoOar-_iR_CRJp5gykpxgHHqoNFF_p_3E5Ez2ayMvGRC6okgWUqWMneAovyzu_MaK-1tmFhxGXXD_8nEg_Vfk9iOyuBJTXp4CL32EK8exnXLAxqhGw3dU1vmwvl0mlv8o0VcUI6sHjMISSGueSndmKYiYORYNvzQ',
            rating: 4.8,
            location: 'Downtown',
            category: 'Shared Lounge',
            pricePerDay: 45,
        },
        {
            _id: 'space-002',
            title: 'NeoModern Studios',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhV8q0fSiHVWkTvmg1ZG0KsieJvL_nHVPmP-BbVKA3LMpQm-D88MWFofdu8r88CLyHzFwk3Oy6t_wGUN2iBFS6d7-35rsSP5FEZrwIKnhMJwwPFE-zv5uB3o8zLy4DO-BuDtwT02PF7ef-Fy4Lste1MB4cjC8Y0dT_rYgrvv0Uq9SmncWg5cdraoo7DDM62RCMo8fHRO-12Lgp6dotHADVB4xfncy6NL3HulpVPXE1DUfgcXhIbJ0VM5eYgVZ06L9yomtzqukf-KXT',
            rating: 4.9,
            location: 'Tech District',
            category: 'Creative Studio',
            pricePerDay: 90,
        },
        {
            _id: 'space-003',
            title: 'Quiet Corner Lab',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt2jVINwP-rdHMhC7WFvpQO6BfySqmNff12-8XHTUriV7bt3sVTGwqE-P2rbXjufvQ7kg5k8s5chWLJzglC6EyaaRp1M-FuSBZa4aWHrtdpSmJ91Ag0KfhaPp90PTcdf6dLrqbWeZTCiWof6wpVbpQqIAp1-K83sUlYj1UKk3H7dhcAKqvCOmGe_jV7V673RappAng-dsTq4sFup-TlW3mn1Kp4qZZ2g4IwQdpn0LH3lXw_r_PFd8wkcgTnid5R8R_3a4IP4_7YDs8',
            rating: 4.7,
            location: 'East Side',
            category: 'Solo Desk',
            pricePerDay: 35,
        },
    ];
}

interface PageProps {
    params: { id: string };
};

export default async function WorkspaceDetailPage({ params }: PageProps) {
    const { id } = await params;

    const selectedWorkspace = await getDataByCollection<Workspace>(`/api/v1/get/workspace/id/${id}`);
    const workspace = selectedWorkspace?.data;

    const reviews = await getReviews();
    const relatedSpaces = await getRelatedSpaces();

    return (
        <div className="min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <ImageGallery images={workspace?.images ?? []} title={workspace?.title ?? ""} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <WorkspaceHeader
                            title={workspace?.title ?? ""}
                            category="Private Office"
                            avgRating={workspace?.avgRating ?? 0}
                            reviewCount={workspace?.reviewCount ?? 0}
                            city={workspace?.city ?? ""}
                            address={workspace?.address ?? ""}
                        />

                        <WorkspaceAbout fullDescription={workspace?.fullDescription ?? ""} />

                        <WorkspaceStats
                            capacity={workspace?.capacity ?? 0}
                            category="Private Office"
                            pricePerDay={workspace?.pricePerDay ?? 0}
                            pricePerMonth={workspace?.pricePerMonth ?? 0}
                        />

                        <WorkspaceAmenities amenities={workspace?.amenities ?? []} />

                        <WorkspaceReviews reviews={reviews} totalReviews={workspace?.reviewCount ?? 0} />
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <PricingCard
                            title = {workspace?.title ?? ""}
                            workSpaceId = {workspace?._id ?? ''}
                            pricePerDay={workspace?.pricePerDay ?? 0}
                            pricePerMonth={workspace?.pricePerMonth ?? 0}
                            name={workspace?.publisherName || 'Host'}
                            badge={workspace?.publisherBadge || 'Host'}
                            rating={workspace?.publisherRating || 5.0}
                            message="I'm here to ensure your team has everything they need for a successful stay."
                        />
                    </div>
                </div>

                <div className="mt-12">
                    <RelatedSpaces spaces={relatedSpaces} />
                </div>
            </div>
        </div>
    );
}