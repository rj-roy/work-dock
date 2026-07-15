// components/about/AboutCTA.tsx
import Link from 'next/link';
import { ArrowRight, Building2 } from 'lucide-react';

export default function AboutCTA() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="relative bg-gray-900 dark:bg-gray-800 rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 text-center">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Ready to find your next workspace?
                        </h2>
                        <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
                            Join thousands of remote workers and teams who have already upgraded their work experience with WorkDock.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/find-spaces"
                                className="inline-flex items-center px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Explore Spaces
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                            <Link
                                href="/host-a-space"
                                className="inline-flex items-center px-8 py-3.5 bg-transparent border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                            >
                                <Building2 className="w-4 h-4 mr-2" />
                                List Your Space
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}