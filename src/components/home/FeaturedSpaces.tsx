import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';

interface Space {
    id: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    image: string;
}

const featuredSpaces: Space[] = [
    {
        id: '1',
        title: 'Skyline Loft Co-op',
        location: 'New York, NY',
        price: 65,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    },
    {
        id: '2',
        title: 'Oak & Brass Executive',
        location: 'San Francisco, CA',
        price: 80,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
    },
    {
        id: '3',
        title: 'Metropolitan Suite',
        location: 'Chicago, IL',
        price: 120,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    },
    {
        id: '4',
        title: 'Artisanal Workshop',
        location: 'Austin, TX',
        price: 35,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
    },
];

export default function FeaturedSpacesSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Featured Spaces
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Handpicked premium locations for your productivity.
                        </p>
                    </div>
                    <Link
                        href="/spaces"
                        className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                    >
                        View All
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredSpaces.map((space) => (
                        <Link
                            key={space.id}
                            href={`/spaces/${space.id}`}
                            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={space.image}
                                    alt={space.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                    <span className="text-xs font-bold text-gray-900 dark:text-white">{space.rating}</span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {space.title}
                                </h3>
                                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {space.location}
                                </div>
                                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                    ${space.price} <span className="text-sm font-normal text-gray-500">/ day</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}