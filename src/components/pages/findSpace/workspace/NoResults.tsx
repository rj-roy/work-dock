import { Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function NoResults() {
  const recommendedLocations = ['London', 'Berlin', 'San Francisco', 'Tokyo'];

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-64 h-48 bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-purple-500/5" />
          <div className="relative z-10 w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center">
            <Search className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-300 dark:bg-purple-700/30 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-200 dark:bg-amber-700/20 rounded-full blur-xl" />
          <div className="absolute top-1/2 -right-8 w-8 h-8 bg-indigo-300 dark:bg-indigo-700/30 rounded-lg blur-lg" />
        </div>
      </div>

      {/* Text Content */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
        No spaces match your filters
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 leading-relaxed">
        Try adjusting your search or filters to find more options. We couldn&apos;t find any workspace that fits your exact criteria right now.
      </p>

      {/* Clear Filters Button */}
      <Link
        href={"/find-space"}
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-600/30 hover:shadow-xl"
      >
        <Filter className="w-5 h-5" />
        Clear Filters
      </Link>

      {/* Recommended Locations */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 w-full max-w-2xl">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center mb-4">
          Recommended Locations
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {recommendedLocations.map((location) => (
            <button
              key={location}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}