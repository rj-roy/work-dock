export default function CardLoadingSkeleton() {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10">
            {/* Header Skeleton */}
            <div className="mb-8 space-y-3">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-linear-to-r from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-xl animate-pulse" />
                    <div className="h-6 bg-linear-to-r from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-lg w-32 animate-pulse" />
                </div>
                <div className="h-4 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded w-48 animate-pulse" />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div 
                        key={i} 
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse"
                    >
                        {/* Image Area with Gradient */}
                        <div className="relative h-56 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
                            {/* Placeholder gradient overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-white/20 to-transparent" />
                        </div>

                        {/* Content Area */}
                        <div className="p-4 space-y-3">
                            {/* Title */}
                            <div className="h-5 bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded w-3/4" />
                            
                            {/* Subtitle/Location */}
                            <div className="h-4 bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded w-1/2" />
                            
                            {/* Description lines */}
                            <div className="space-y-2 pt-1">
                                <div className="h-3 bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded w-full" />
                                <div className="h-3 bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded w-5/6" />
                            </div>

                            {/* Icons/Dots Row */}
                            <div className="flex items-center gap-2 pt-2">
                                <div className="h-8 w-8 rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600" />
                                <div className="h-8 w-8 rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600" />
                                <div className="h-8 w-8 rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600" />
                            </div>

                            {/* Bottom Section with Dots */}
                            <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-linear-to-r from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600" />
                                    <div className="h-3 w-16 bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded" />
                                </div>
                                <div className="h-3 w-3 rounded-full bg-linear-to-r from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}