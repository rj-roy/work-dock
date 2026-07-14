import { Send } from 'lucide-react';

export default function NewsletterSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-indigo-50 to-white dark:from-gray-800/50 dark:to-gray-900">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Get notified when WorkDock launches in your city
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Join 5,000+ others waiting for the ultimate workspace freedom.
                </p>

                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                    >
                        Subscribe
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </section>
    );
}