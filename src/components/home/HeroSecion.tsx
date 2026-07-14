import { Search, MapPin, Calendar } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-linear-to-r from-indigo-200/30 via-purple-200/30 to-pink-200/30 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    Find your next workspace,{' '}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        anywhere.
                    </span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
                    Discover flexible workspace without endless scrolling. From creative studios to high-rise boardrooms, find the perfect spot to thrive.
                </p>

                {/* Search Bar */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 max-w-3xl mx-auto border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-5 relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Where do you want to work?"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-400"
                            />
                        </div>

                        <div className="md:col-span-5 relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="When?"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-400"
                            />
                        </div>

                        <button className="md:col-span-2 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/25 flex items-center justify-center">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}