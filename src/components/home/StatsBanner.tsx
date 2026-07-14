export default function StatsBanner() {
    const stats = [
        { value: '1.2k+', label: 'Spaces Listed' },
        { value: '45', label: 'Cities Live' },
        { value: '15k+', label: 'Happy Members' },
        { value: '4.9/5', label: 'Avg Rating' },
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-700">
            <div className="max-w-6xl mx-auto">
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