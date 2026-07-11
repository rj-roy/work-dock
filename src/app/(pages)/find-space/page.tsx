import AsideNav from "@/components/pages/findSpace/AsideNav";
import FHeader from "@/components/pages/findSpace/FHeader";
import FilterBar from "@/components/pages/findSpace/filterBar/FilterBar";
import SearchBar from "@/components/pages/findSpace/SearchBar";
import { getDataByCollection } from "@/lib/api/getData";

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

const FindSpaces = async ({ searchParams }: Props) => {
    const query = await searchParams;
    const params = new URLSearchParams(query);

    const approvedWorkspace = await getDataByCollection(`/api/v1/get/workspace/query?${params.toString() ? `${params}` : ""}`)
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