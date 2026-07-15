export default function AboutHero() {
    return (
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-linear-to-r from-indigo-200/40 via-purple-200/40 to-pink-200/40 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    Our Story
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                    Redefining how the world{' '}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        works.
                    </span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    WorkDock was built on a simple belief: great work shouldn&apos;t be confined to a single desk.
                    We&apos;re on a mission to help remote professionals and teams find their perfect workspace, anywhere in the world.
                </p>
            </div>
        </section>
    );
}