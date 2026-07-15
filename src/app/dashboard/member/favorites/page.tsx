'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Heart,
    MapPin,
    Star,
    Search,
    Trash2,
    Calendar,
    Building2,
    AlertCircle,
    ArrowRight
} from 'lucide-react';

interface FavoriteSpace {
    id: string;
    title: string;
    location: string;
    category: string;
    pricePerDay: number;
    rating: number;
    image: string;
    dateAdded: string;
}

const mockFavorites: FavoriteSpace[] = [
    {
        id: '1',
        title: 'Skyline Loft Co-op',
        location: 'New York, NY',
        category: 'Shared Lounge',
        pricePerDay: 65,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80',
        dateAdded: 'Oct 12, 2023',
    },
    {
        id: '2',
        title: 'NeoModern Studios',
        location: 'Tech District, SF',
        category: 'Creative Studio',
        pricePerDay: 90,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80',
        dateAdded: 'Sep 28, 2023',
    },
    {
        id: '3',
        title: 'Quiet Corner Lab',
        location: 'East Side, Austin',
        category: 'Solo Desk',
        pricePerDay: 35,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=400&q=80',
        dateAdded: 'Aug 15, 2023',
    },
    {
        id: '4',
        title: 'The Executive Suite',
        location: 'Downtown, Chicago',
        category: 'Private Office',
        pricePerDay: 120,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=400&q=80',
        dateAdded: 'Jul 02, 2023',
    },
];

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<FavoriteSpace[]>(mockFavorites);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFavorites = useMemo(() => {
        return favorites.filter(space =>
            space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            space.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [favorites, searchQuery]);

    const stats = useMemo(() => {
        const total = favorites.length;
        const totalValue = favorites.reduce((acc, curr) => acc + curr.pricePerDay, 0);
        return { total, totalValue };
    }, [favorites]);

    const removeFavorite = (id: string) => {
        setFavorites(prev => prev.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
                    My Favorites
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Your saved workspaces, ready for your next booking.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400">
                            <Heart className="w-5 h-5 fill-current" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Saved Spaces</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Est. Daily Cost</span>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${stats.totalValue}<span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">/ day</span></p>
                </div>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search your favorites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-all shadow-sm"
                />
            </div>

            {/* Favorites Grid */}
            {filteredFavorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredFavorites.map((space) => (
                        <div key={space.id} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={space.image}
                                    alt={space.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-sm">
                                        <Building2 className="w-3 h-3" />
                                        {space.category}
                                    </span>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeFavorite(space.id)}
                                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
                                    title="Remove from favorites"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <Link href={`/spaces/${space.id}`} className="font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1">
                                        {space.title}
                                    </Link>
                                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 shrink-0 ml-2">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        {space.rating}
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span className="line-clamp-1">{space.location}</span>
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                    <div>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">${space.pricePerDay}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400"> / day</span>
                                    </div>
                                    <Link
                                        href={`/spaces/${space.id}`}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
                                    >
                                        Book <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No favorites found</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                        {searchQuery ? 'Try adjusting your search terms.' : 'Your saved workspaces will appear here. Start exploring to build your list!'}
                    </p>
                    {!searchQuery && (
                        <Link href="/spaces" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
                            Explore Spaces <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}