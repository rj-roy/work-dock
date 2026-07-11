export default function WorkspaceDetailSkeleton() {
    return (
        <div className="min-h-screen bg-gray-950 dark:bg-gray-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Image Gallery Skeleton */}
                <div className="relative w-full h-100 md:h-125 rounded-2xl overflow-hidden bg-gray-800 animate-pulse">
                    <div className="absolute inset-0 bg-linear-to-br from-gray-800 via-gray-700 to-gray-800" />
                    {/* Navigation dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                    </div>
                    {/* Image counter */}
                    <div className="absolute bottom-4 right-4 w-12 h-6 rounded-full bg-gray-700" />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Badges */}
                        <div className="flex items-center gap-2">
                            <div className="h-7 w-28 rounded-full bg-gray-800 animate-pulse" />
                            <div className="h-7 w-32 rounded-full bg-gray-800 animate-pulse" />
                        </div>

                        {/* Title */}
                        <div className="space-y-3">
                            <div className="h-9 w-3/4 bg-gray-800 rounded-lg animate-pulse" />
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-gray-800 animate-pulse" />
                                <div className="h-4 w-48 bg-gray-800 rounded animate-pulse" />
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="space-y-4">
                            <div className="h-7 w-40 bg-gray-800 rounded-lg animate-pulse" />
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
                                <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
                                <div className="h-4 w-5/6 bg-gray-800 rounded animate-pulse" />
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 animate-pulse space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded bg-gray-700" />
                                        <div className="h-3 w-20 bg-gray-700 rounded" />
                                    </div>
                                    <div className="h-5 w-24 bg-gray-700 rounded" />
                                </div>
                            ))}
                        </div>

                        {/* Amenities Section */}
                        <div className="space-y-4">
                            <div className="h-7 w-28 bg-gray-800 rounded-lg animate-pulse" />
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700 animate-pulse">
                                        <div className="w-5 h-5 rounded bg-gray-700" />
                                        <div className="h-4 w-24 bg-gray-700 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="h-7 w-28 bg-gray-800 rounded-lg animate-pulse" />
                                <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="p-5 rounded-xl bg-gray-800/50 border border-gray-700 animate-pulse space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-700" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 w-24 bg-gray-700 rounded" />
                                                <div className="h-3 w-20 bg-gray-700 rounded" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 pt-2">
                                            <div className="h-3 w-full bg-gray-700 rounded" />
                                            <div className="h-3 w-5/6 bg-gray-700 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Pricing Card */}
                        <div className="sticky top-6 p-6 rounded-2xl bg-gray-800/50 border border-gray-700 animate-pulse space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <div className="h-9 w-24 bg-gray-700 rounded" />
                                    <div className="h-4 w-12 bg-gray-700 rounded" />
                                </div>
                                <div className="h-3 w-4 bg-gray-700 rounded" />
                            </div>

                            <div className="space-y-3 pt-4">
                                <div className="h-12 w-full bg-gray-700 rounded-xl" />
                                <div className="h-12 w-full bg-gray-700/50 rounded-xl border border-gray-600" />
                            </div>

                            {/* Host Card */}
                            <div className="pt-4 border-t border-gray-700 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gray-700" />
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-20 bg-gray-700 rounded" />
                                            <div className="h-4 w-12 bg-gray-700 rounded-full" />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-4 h-4 bg-gray-700 rounded" />
                                            <div className="h-3 w-16 bg-gray-700 rounded" />
                                        </div>
                                        <div className="space-y-1 pt-1">
                                            <div className="h-3 w-full bg-gray-700 rounded" />
                                            <div className="h-3 w-5/6 bg-gray-700 rounded" />
                                        </div>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="pt-3 border-t border-gray-700 grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-gray-700 rounded" />
                                        <div className="h-3 w-20 bg-gray-700 rounded" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-gray-700 rounded" />
                                        <div className="h-3 w-24 bg-gray-700 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Spaces Section */}
                <div className="mt-12 space-y-6">
                    <div className="h-7 w-40 bg-gray-800 rounded-lg animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="rounded-2xl overflow-hidden bg-gray-800/50 border border-gray-700 animate-pulse">
                                {/* Image */}
                                <div className="relative h-48 bg-linear-to-br from-gray-800 via-gray-700 to-gray-800">
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-700" />
                                </div>
                                {/* Content */}
                                <div className="p-4 space-y-3">
                                    <div className="flex items-center gap-1">
                                        <div className="w-4 h-4 bg-gray-700 rounded" />
                                        <div className="h-4 w-8 bg-gray-700 rounded" />
                                    </div>
                                    <div className="h-5 w-3/4 bg-gray-700 rounded" />
                                    <div className="h-3 w-1/2 bg-gray-700 rounded" />
                                    <div className="flex items-baseline gap-2 pt-1">
                                        <div className="h-5 w-12 bg-gray-700 rounded" />
                                        <div className="h-3 w-10 bg-gray-700 rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}