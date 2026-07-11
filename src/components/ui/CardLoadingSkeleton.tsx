export default function CardLoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-22 px-4 max-w-6xl mx-auto">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                    <div className="p-5 space-y-3">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                        <div className="flex gap-2 pt-2">
                            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                        </div>
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                    </div>
                </div>
            ))}
        </div>
    );
}