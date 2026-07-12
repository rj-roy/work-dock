import { buildPageHref, getVisiblePages } from '@/lib/utilities/pagination';
import Link from 'next/link';

type QueryValue = string | string[] | undefined;
interface Props {
    headers: Headers;
    query: Record<string, QueryValue>
}

const PagePagination = ({ headers, query }: Props) => {
    const totalPages = Math.max(Number(headers.get("x-total-pages") ?? 0), 1);
    const currentPage = Math.max(1, Number(headers.get("x-current-page") ?? query.page ?? 1));
    const visiblePages = getVisiblePages(currentPage, totalPages);

    return (
        totalPages > 1 && (
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
        )
    );
};

export default PagePagination;