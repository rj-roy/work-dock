import AsideNav from "@/components/pages/findSpace/AsideNav";
import FHeader from "@/components/pages/findSpace/FHeader";
import FilterBar from "@/components/pages/findSpace/filterBar/FilterBar";
import SearchBar from "@/components/pages/findSpace/SearchBar";
import { getDataByCollection } from "@/lib/api/getData";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Find Spaces | WorkDock",
    description: "Let's explore the desired spaces accroding to your choice",
};

type Props = {
    searchParams: Promise<{
        search?: string;
        category?: string;
        page?: string;
        city?: string;
        capacity?: string;
        priceRange?: string;
        sort?: string;
    }>;
};

export interface Workspace {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: "private-office" | "meeting-room" | "studio" | "hot-desk";
    pricePerDay: number;
    capacity: number;
    city: string;
    address: string;
    amenities: ("wifi" | "ac" | "printer" | "coffee")[];
    images: string[];
    avgRating: number;
    reviewCount: number;
    status: "approved" | "pending" | "rejected";
    publisherId: string;
    updatedAt: string;
}

const FindSpaces = async ({ searchParams }: Props) => {
    const query = await searchParams;
    const params = new URLSearchParams(query);

    let approvedWorkspace = await getDataByCollection<Workspace[]>(`/api/v1/get/workspace/query?${params.toString() ? `${params}` : ""}`) ?? [];

    const sortBy = query?.sort;
    console.log(sortBy);

    switch (sortBy) {
        case "price-asc":
            approvedWorkspace = [...approvedWorkspace].sort((a, b) => a.pricePerDay - b.pricePerDay);
            break;

        case "price-desc":
            approvedWorkspace = [...approvedWorkspace].sort((a, b) => b.pricePerDay - a.pricePerDay);
            break;

        case "rating":
            approvedWorkspace = [...approvedWorkspace].sort((a, b) => b.avgRating - a.avgRating);
            break;

        case "rating-desc":
            approvedWorkspace = [...approvedWorkspace].sort((a, b) => a.avgRating - b.avgRating);
            break;

        case "newest":
            approvedWorkspace = [...approvedWorkspace].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            break;

        case "oldest":
            approvedWorkspace = [...approvedWorkspace].sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
            break;

        default:
            break;
    };

    console.log(approvedWorkspace);

    const activeCategory = query.category ?? "";
    return (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3">
            <AsideNav activeCategory={activeCategory} />
            <div className="min-w-0 min-h-screen gap-3 px-4 sm:px-6 lg:px-2 py-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                    <FHeader category={activeCategory || "all"} />
                    <SearchBar query={query} />

                </div>
                <FilterBar query={query} />
                {/* <MenuGrid menuItems={filteredItems} /> */}
            </div>
        </div>
    );
};

export default FindSpaces;