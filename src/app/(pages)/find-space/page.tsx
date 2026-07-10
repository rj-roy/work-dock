import AsideNav from "@/components/pages/findSpace/AsideNav";
import { getDataByCollection } from "@/lib/api/getData";

type Props = {
    searchParams: Promise<{
        page?: string;
        category: string;
    }>;
};

const FindSpaces = async ({ searchParams }: Props) => {
    const query = await searchParams;
    const params = new URLSearchParams(query);

    const approvedWorkspace = await getDataByCollection(`/api/v1/get/workspace/query?${params.toString() ? `${params}` : ""}`)
    console.log(approvedWorkspace);

    const activeCategory = query.category ?? "";
    return (
        <div>
            <AsideNav activeCategory={activeCategory} />
        </div>
    );
};

export default FindSpaces;