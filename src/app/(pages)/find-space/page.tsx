import AsideNav from "@/components/pages/findSpace/AsideNav";
import FilterBar from "@/components/pages/findSpace/filterBar/FilterBar";
import PagePagination from "@/components/pages/findSpace/workspace/PagePagination";
import WorkspaceGrid from "@/components/pages/findSpace/workspace/WorkspaceGrid";
import { getDataByCollection } from "@/lib/api/getData";
import { FindSpaceProps, Workspace } from "@/types/workspaceType";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Find Spaces | WorkDock",
    description: "Let's explore the desired spaces accroding to your choice",
};



const FindSpaces = async ({ searchParams }: FindSpaceProps) => {
    const query = await searchParams;
    const params = new URLSearchParams(query);

    const { data, headers } = await getDataByCollection<Workspace[]>(`/api/v1/workspace/get/query?${params.toString() ? `${params}` : ""}`);
    let approvedWorkspace = data ?? [];

    const activeCategory = query.category ?? "";
    const sortBy = query?.sort;

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

    return (
        <div className="mx-auto grid grid-cols-1 gap-3">
            <AsideNav activeCategory={activeCategory} />
            <div className="min-w-0 gap-3 px-4 sm:px-6 lg:px-2 py-2">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                    <div className="shadow-sm dark:shadow-secondary/30 w-full">
                        <FilterBar query={query} />
                    </div>
                </div>
                <div className="p-6 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        <WorkspaceGrid category={activeCategory || "all"} workspaces={approvedWorkspace} />
                        <PagePagination headers={headers} query={query} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindSpaces;