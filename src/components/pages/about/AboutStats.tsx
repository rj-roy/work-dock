// components/about/AboutStats.tsx
export default function AboutStats() {
    const stats = [
        { value: '1,200+', label: 'Premium Spaces' },
        { value: '45', label: 'Global Cities' },
        { value: '15,000+', label: 'Happy Members' },
        { value: '4.9/5', label: 'Average Rating' },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-700">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Our Impact So Far</h2>
                    <p className="text-indigo-100 max-w-2xl mx-auto">
                        Since our launch, we&apos;ve helped thousands of professionals find their next great workspace.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center text-white">
                            <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.value}</div>
                            <div className="text-indigo-100 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}