import HostCard from "@/components/pages/findSpace/workspace/details/HostCard";
import ImageGallery from "@/components/pages/findSpace/workspace/details/ImagesGallery";
import PricingCard from "@/components/pages/findSpace/workspace/details/PricingCard";
import RelatedSpaces from "@/components/pages/findSpace/workspace/details/RelatedSpaces";
import WorkspaceAbout from "@/components/pages/findSpace/workspace/details/WorkspaceAbout";
import WorkspaceAmenities from "@/components/pages/findSpace/workspace/details/WorkspaceAmenities";
import WorkspaceHeader from "@/components/pages/findSpace/workspace/details/WorkSpaceHeader";
import WorkspaceReviews from "@/components/pages/findSpace/workspace/details/WorkspaceReviews";
import WorkspaceStats from "@/components/pages/findSpace/workspace/details/WorkSpaceStats";
import { RelatedWorkspace, Review, Workspace } from "@/types/workspaceType";

async function getWorkspace(id: string): Promise<Workspace> {
    return {
        _id: id,
        title: 'The Executive Suite',
        shortDescription: 'Premium glass-walled office with sweeping views of the San Francisco skyline.',
        fullDescription: 'Experience the pinnacle of professional workspace design. The Executive Suite offers a premium glass-walled environment with sweeping views of the San Francisco skyline. Designed for high-impact teams and focused individuals, this office combines the privacy of a dedicated suite with the vibrant energy of a top-tier coworking hub. Every detail, from the acoustic treatment to the custom ergonomic seating, has been curated to foster peak productivity and executive presence.',
        category: 'private-office',
        pricePerDay: 120,
        pricePerMonth: 2200,
        capacity: 10,
        city: 'San Francisco',
        address: 'San Francisco, California',
        amenities: ['wifi', 'coffee', 'parking', 'ac', 'printer'],
        images: [
            'https://lh3.googleusercontent.com/aida/AP1WRLs78Uuq1joEM1WjjsY7Hk-L5hddrPJii55hSlDX6Dh2d24WjRkO7mSuS0YCDAh1XGzfcsVvWUyffdqOhPm1yNpIcPswXsCwr7VPWBMwpXaUcPHuqUhiUmdSbCf42U7IfNdpVx1Sv9m9qRYxEo3x5WKDyjQc_rTNS_S7ySpqoP3r9XK3eHBFNoYZFT2t_5gMxq366kPblc7XdCMi7ST_A5EzzZ6842xXh0gjlyN3zG8OdxIuK3gPCeZ2wOmm',
            'https://lh3.googleusercontent.com/aida/AP1WRLukUws0wWeW7sYUUwWKabCrvXLPyvfE_1Q-CB62QYlX4uYKpC9FOVznjjAP-XcODoK1IcYsDIknqaL4B5ede0Zf1VB5WG0m3RO5ALiSBs8LRvDpoLr5jtvbmc-I5kudkq1uALrrC-8nW5RH66ideRb4KCsMjqm3BH0VMr9qFN4Y59c_Dwa16DgAnE4DAPEigeLDSh8kRfsgnwWpp7pZWgiGGlc87x5Xdq6au_9sw2WQgxqnRC5Hshx4mmSe',
            'https://lh3.googleusercontent.com/aida/AP1WRLsj87fH6SZ9wljMarP-ba35_-tw8V9qZol2f0AmOY6jJ0MoMdm7NuHHQTL1veNEEZFVb62HUFk84VsfPzfwVD3LDSlbEJGpwhqAd1fwSBJrXcP9JYv1qSHH4YgPjRkjpbPDwpF511gHehtUx4-jGgTaawBTdv5-hDaGv12eRItYuQbKgWcFZ0PAQqaUew9WQkYFCrLBMwQP7anjfOYlP1C9nRsZfsqr2rkhX_uE0mtMYDUmYCd59QmQFj1p',
            'https://lh3.googleusercontent.com/aida/AP1WRLuCw6dbhMm7Um-bPppVcjkoQ6VFuQgsSypJpzdUmp2AUSja17F22_aKAWWbZBI9QzEUVVd9qASK7HrBJwEF9-ohuZzZb1dhOVh4RMq1sezD4MZQoEG7V-KQWarsEaQq3i-u_9CalwAfnvIxrFZuQOooYri6FaiuCL2TxBLJHsh1nD9ivYf-OnaTqtUxiK7vfwok-iw_LNCwZDwrbUnCOZ0oq0EfAxIwt6YGDvvesp8CIlUEcr1Il4bc5v9M',
            'https://lh3.googleusercontent.com/aida/AP1WRLtbpVgxx0Rfg0b05wlDCg3hl3FH7UCdxEJ3JdgbdEkNaR8WvUyhE_qG6wxziPYf9Qz0Tn_3I9-z3-Oh2tHjII2KHZoGhEbFg1wIq4I-atUawthYW_1RwSE51VjpUnzZRIIgjw36cYmGiyRCGk-rSoGbH3ILUnJPAJ3hONA6gPlcBMCuc79-sz1DscdT80ARf5NIqMyV4zI3W_w7rcW3jjxXKF4KSWEbwLyaLG8DxVQPaxqg2atv1XCBBFc',
        ],
        avgRating: 4.9,
        reviewCount: 124,
        status: 'approved',
        publisherId: 'publisher-123',
        publisherName: 'Sarah Jenkins',
        publisherRating: 4.98,
        publisherBadge: 'Superhost',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
    };
}

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
    const {id} = await params;
    const workspace = await getWorkspace(params.id);
    const reviews = await getReviews();
    const relatedSpaces = await getRelatedSpaces();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Image Gallery */}
                <div className="mb-8">
                    <ImageGallery images={workspace.images} title={workspace.title} />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header */}
                        <WorkspaceHeader
                            title={workspace.title}
                            category="Private Office"
                            avgRating={workspace.avgRating}
                            reviewCount={workspace.reviewCount}
                            city={workspace.city}
                            address={workspace.address}
                        />

                        {/* About */}
                        <WorkspaceAbout fullDescription={workspace.fullDescription} />

                        {/* Stats */}
                        <WorkspaceStats
                            capacity={workspace.capacity}
                            category="Private Office"
                            pricePerDay={workspace.pricePerDay}
                            pricePerMonth={workspace.pricePerMonth}
                        />

                        {/* Amenities */}
                        <WorkspaceAmenities amenities={workspace.amenities} />

                        {/* Reviews */}
                        <WorkspaceReviews reviews={reviews} totalReviews={workspace.reviewCount} />
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Pricing Card */}
                        <PricingCard
                            pricePerDay={workspace.pricePerDay}
                            pricePerMonth={workspace.pricePerMonth}
                        />

                        {/* Host Card */}
                        <HostCard
                            name={workspace.publisherName || 'Host'}
                            badge={workspace.publisherBadge || 'Host'}
                            rating={workspace.publisherRating || 5.0}
                            message="I'm here to ensure your team has everything they need for a successful stay."
                        />
                    </div>
                </div>

                {/* Related Spaces */}
                <div className="mt-12">
                    <RelatedSpaces spaces={relatedSpaces} />
                </div>
            </div>
        </div>
    );
}