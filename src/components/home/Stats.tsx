export default function StatsSection() {
    const stats = [
        { value: '500+', label: 'Spaces' },
        { value: '30', label: 'Cities' },
        { value: '10,000+', label: 'Members' },
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}