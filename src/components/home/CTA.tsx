import Image from 'next/image';
import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative bg-linear-to-r from-gray-900 to-indigo-900 dark:from-gray-800 dark:to-indigo-950 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c"
                            alt="Workspace"
                            fill
                            className="object-cover opacity-20"
                            priority
                        />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 sm:p-12 lg:p-16">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                List your space and reach thousands of remote workers
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                Turn your empty desks, meeting rooms, or studios into a steady revenue stream.
                            </p>
                            <Link
                                href="/host-a-space"
                                className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/25"
                            >
                                List Your Space
                            </Link>
                        </div>

                        <div className="hidden lg:block">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-white font-semibold">Dashboard Preview</div>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-20 bg-white/10 rounded-lg" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="h-16 bg-white/10 rounded-lg" />
                                        <div className="h-16 bg-white/10 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}