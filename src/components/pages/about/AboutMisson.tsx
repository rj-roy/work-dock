// components/about/AboutMission.tsx
import { Globe, ShieldCheck, Users, Zap } from 'lucide-react';
import Image from 'next/image';

const values = [
    {
        icon: Globe,
        title: 'Borderless Work',
        description: 'We believe talent is everywhere. Our platform breaks down geographical barriers, letting you work from the best spaces globally.',
    },
    {
        icon: ShieldCheck,
        title: 'Trust & Quality',
        description: 'Every space on WorkDock is verified. We ensure high-speed internet, ergonomic setups, and a professional environment.',
    },
    {
        icon: Users,
        title: 'Community First',
        description: "We aren't just a booking platform; we are building a global community of remote workers, freelancers, and innovators.",
    },
    {
        icon: Zap,
        title: 'Instant Flexibility',
        description: 'No long-term leases. Book a desk for an hour, a day, or a month. Work on your terms, whenever you need it.',
    },
];

export default function AboutMission() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">
                            Finding your perfect workspace, anywhere in the world.
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            Before WorkDock, finding a reliable place to work while traveling or working remotely meant settling for noisy coffee shops or expensive hotel business centers.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            We partnered with premium co-working spaces, private offices, and creative studios to bring you a curated network of workspaces. Whether you need a quiet corner for deep focus or a boardroom for a client pitch, WorkDock has you covered.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                height={400}
                                width={400}
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
                                alt="Modern collaborative workspace"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl -z-10" />
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-100 dark:bg-purple-900/50 rounded-full -z-10" />
                    </div>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        The principles that guide every decision we make and every space we list.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}