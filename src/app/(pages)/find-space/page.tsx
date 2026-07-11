import AsideNav from "@/components/pages/findSpace/AsideNav";
import FilterBar from "@/components/pages/findSpace/filterBar/FilterBar";
import WorkspaceGrid from "@/components/pages/findSpace/workspace/WorkspaceGrid";
import { getDataByCollection } from "@/lib/api/getData";
import { FindSpaceProps, Workspace } from "@/types/workspaceType";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Find Spaces | WorkDock",
    description: "Let's explore the desired spaces accroding to your choice",
};

const getQueryValue = (value: string | string[] | undefined) => {
    return Array.isArray(value) ? value[0] ?? "" : value ?? "";
};

const buildPageHref = (query: Record<string, string | string[] | undefined>, page: number) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        const normalized = getQueryValue(value);
        if (normalized) {
            params.set(key, normalized);
        }
    });

    params.set("page", String(Math.max(1, page)));
    return params.toString() ? `?${params.toString()}` : "";
};

const getVisiblePages = (currentPage: number, totalPages: number) => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const FindSpaces = async ({ searchParams }: FindSpaceProps) => {
    const query = await searchParams;
    const params = new URLSearchParams(query);

    const { data, headers } = await getDataByCollection<Workspace[]>(`/api/v1/get/workspace/query?${params.toString() ? `${params}` : ""}`);
    let approvedWorkspace = data ?? [];

    const activeCategory = query.category ?? "";
    const sortBy = query?.sort;
    const totalPages = Math.max(Number(headers.get("x-total-pages") ?? 0), 1);
    const currentPage = Math.max(1, Number(headers.get("x-current-page") ?? query.page ?? 1));

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

    const visiblePages = getVisiblePages(currentPage, totalPages);

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
                        {totalPages > 1 && (
                            <div className="mt-8 flex flex-col items-center justify-center gap-3">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Page {currentPage} of {totalPages}
                                </p>
                                <nav className="flex flex-wrap items-center justify-center gap-2">
                                    <Link
                                        href={buildPageHref(query, Math.max(1, currentPage - 1))}
                                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${currentPage === 1
                                            ? "pointer-events-none border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-600"
                                            : "border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-slate-900"
                                            }`}
                                    >
                                        Prev
                                    </Link>

                                    {visiblePages.map((page) => (
                                        <Link
                                            key={page}
                                            href={buildPageHref(query, page)}
                                            className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${page === currentPage
                                                ? "border-indigo-600 bg-indigo-600 text-white"
                                                : "border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:text-indigo-400"
                                                }`}
                                        >
                                            {page}
                                        </Link>
                                    ))}

                                    <Link
                                        href={buildPageHref(query, Math.min(totalPages, currentPage + 1))}
                                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${currentPage === totalPages
                                            ? "pointer-events-none border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-600"
                                            : "border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-slate-900"
                                            }`}
                                    >
                                        Next
                                    </Link>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindSpaces;