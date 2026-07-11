export interface Workspace {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: 'private-office' | 'hot-desk' | 'meeting-room' | 'studio';
    pricePerDay: number;
    pricePerMonth?: number;
    capacity: number;
    city: string;
    address: string;
    amenities: string[];
    images: string[];
    avgRating: number;
    reviewCount: number;
    status: 'approved' | 'pending' | 'rejected';
    publisherId: string;
    createdAt: string;
    updatedAt: string;
}

export interface WorkspaceGridProps {
    workspaces?: Workspace[];
    clearFiltersHref?: string;
    category?: string;
};

export type FindSpaceProps = {
    searchParams: Promise<{
        search?: string;
        category?: string;
        page?: string;
        city?: string;
        capacity?: string;
        pricePerDay?: string;
        sort?: string;
    }>;
};