import { Search, Filter, CheckCircle } from 'lucide-react';

const steps = [
    {
        icon: Search,
        title: 'Search',
        description: 'Find the perfect location based on city, date, and space type.',
    },
    {
        icon: Filter,
        title: 'Compare',
        description: 'Filter by amenities, ratings, and high-resolution imagery.',
    },
    {
        icon: CheckCircle,
        title: 'Book',
        description: 'Book instantly and show up. We handle all the logistics.',
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                    Work from anywhere in 3 steps
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                    <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}