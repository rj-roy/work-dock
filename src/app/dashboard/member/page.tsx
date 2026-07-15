// app/dashboard/member/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    LayoutDashboard,
    CalendarCheck,
    CalendarClock,
    Heart,
    Star,
    MapPin,
    Clock,
    CheckCircle2,
    XCircle,
    Eye,
    MessageSquare,
    ArrowRight,
    Plus,
    TrendingUp,
    Sparkles,
    Bell,
    Building2,
    Bookmark
} from 'lucide-react';

// --- Types ---
type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

interface Booking {
    id: string;
    spaceName: string;
    spaceImage: string;
    location: string;
    checkIn: string;
    checkOut: string;
    status: BookingStatus;
    totalCost: number;
    category: string;
}

interface FavoriteSpace {
    id: string;
    title: string;
    image: string;
    pricePerDay: number;
    rating: number;
    city: string;
}

interface ReviewPrompt {
    id: string;
    spaceName: string;
    spaceImage: string;
    visitDate: string;
    rating?: number;
}

// --- Mock Data ---
const upcomingBookings: Booking[] = [
    {
        id: '1',
        spaceName: 'The Executive Suite',
        spaceImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80',
        location: 'San Francisco, CA',
        checkIn: 'Oct 15, 2026',
        checkOut: 'Oct 17, 2026',
        status: 'upcoming',
        totalCost: 240,
        category: 'Private Office',
    },
    {
        id: '2',
        spaceName: 'Downtown Creative Hub',
        spaceImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=200&q=80',
        location: 'New York, NY',
        checkIn: 'Oct 22, 2026',
        checkOut: 'Oct 22, 2026',
        status: 'upcoming',
        totalCost: 85,
        category: 'Hot Desk',
    },
    {
        id: '3',
        spaceName: 'Skyline Loft Co-op',
        spaceImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=200&q=80',
        location: 'Chicago, IL',
        checkIn: 'Nov 05, 2026',
        checkOut: 'Nov 08, 2026',
        status: 'upcoming',
        totalCost: 195,
        category: 'Shared Lounge',
    },
];

const recentBookings: Booking[] = [
    {
        id: '4',
        spaceName: 'Quiet Corner Lab',
        spaceImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=200&q=80',
        location: 'Austin, TX',
        checkIn: 'Sep 10, 2026',
        checkOut: 'Sep 12, 2026',
        status: 'completed',
        totalCost: 170,
        category: 'Meeting Room',
    },
    {
        id: '5',
        spaceName: 'Harbor View Workspace',
        spaceImage: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=200&q=80',
        location: 'Miami, FL',
        checkIn: 'Aug 28, 2026',
        checkOut: 'Aug 28, 2026',
        status: 'completed',
        totalCost: 55,
        category: 'Hot Desk',
    },
    {
        id: '6',
        spaceName: 'NeoModern Studios',
        spaceImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=200&q=80',
        location: 'Seattle, WA',
        checkIn: 'Aug 15, 2026',
        checkOut: 'Aug 15, 2026',
        status: 'cancelled',
        totalCost: 0,
        category: 'Creative Studio',
    },
];

const favoriteSpaces: FavoriteSpace[] = [
    {
        id: '1',
        title: 'Skyline Loft',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80',
        pricePerDay: 45,
        rating: 4.8,
        city: 'Downtown',
    },
    {
        id: '2',
        title: 'NeoModern Studios',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=200&q=80',
        pricePerDay: 90,
        rating: 4.9,
        city: 'Tech District',
    },
    {
        id: '3',
        title: 'Quiet Corner Lab',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=200&q=80',
        pricePerDay: 35,
        rating: 4.7,
        city: 'East Side',
    },
];

const reviewPrompts: ReviewPrompt[] = [
    {
        id: '1',
        spaceName: 'Quiet Corner Lab',
        spaceImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=100&q=80',
        visitDate: 'Sep 10 - Sep 12, 2026',
    },
    {
        id: '2',
        spaceName: 'Harbor View Workspace',
        spaceImage: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=100&q=80',
        visitDate: 'Aug 28, 2026',
    },
];

export default function MemberOverviewPage() {
    const [upcoming, setUpcoming] = useState<Booking[]>(upcomingBookings);
    const [favorites, setFavorites] = useState<FavoriteSpace[]>(favoriteSpaces);

    const stats = {
        totalBookings: 12,
        upcomingCount: upcoming.length,
        completedCount: 8,
        favoritesCount: favorites.length,
        reviewsWritten: 6,
        totalSpent: 1240,
    };

    const cancelBooking = (id: string) => {
        if (confirm('Are you sure you want to cancel this booking?')) {
            setUpcoming(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b));
        }
    };

    const removeFavorite = (id: string) => {
        setFavorites(prev => prev.filter(f => f.id !== id));
    };

    const getStatusBadge = (status: BookingStatus) => {
        switch (status) {
            case 'upcoming':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                        <Clock className="w-3 h-3" /> Upcoming
                    </span>
                );
            case 'completed':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                );
            case 'cancelled':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                        <XCircle className="w-3 h-3" /> Cancelled
                    </span>
                );
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <LayoutDashboard className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                        Member Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Welcome back! Here&apos;s an overview of your WorkDock activity.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <Link
                        href="/spaces"
                        className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Book a Space
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                            <CalendarCheck className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.upcomingCount}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">bookings scheduled</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedCount}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">spaces visited</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400">
                            <Heart className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Favorites</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.favoritesCount}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">saved spaces</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                            <Star className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Reviews</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.reviewsWritten}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">reviews written</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Upcoming Bookings */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <CalendarClock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    Upcoming Bookings
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your next workspace reservations</p>
                            </div>
                            <Link href="/dashboard/bookings" className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1">
                                View All <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {upcoming.length > 0 ? upcoming.map((booking) => (
                                <div key={booking.id} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0">
                                            <Image
                                                src={booking.spaceImage}
                                                alt={booking.spaceName}
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white">{booking.spaceName}</h3>
                                                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        <MapPin className="w-3.5 h-3.5" />
                                                        {booking.location}
                                                    </div>
                                                </div>
                                                {getStatusBadge(booking.status)}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                                                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                                                    <CalendarCheck className="w-4 h-4 text-indigo-500" />
                                                    <span className="font-medium">{booking.checkIn}</span>
                                                </div>
                                                <span className="text-gray-400">→</span>
                                                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                                                    <CalendarCheck className="w-4 h-4 text-indigo-500" />
                                                    <span className="font-medium">{booking.checkOut}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                                                <div>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
                                                    <p className="text-lg font-bold text-gray-900 dark:text-white">${booking.totalCost}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/spaces/${booking.id}`}
                                                        className="px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg transition-colors flex items-center gap-1"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                        View
                                                    </Link>
                                                    {booking.status === 'upcoming' && (
                                                        <button
                                                            onClick={() => cancelBooking(booking.id)}
                                                            className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors flex items-center gap-1"
                                                        >
                                                            <XCircle className="w-3.5 h-3.5" />
                                                            Cancel
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                                        <CalendarClock className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No upcoming bookings</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Time to plan your next workspace adventure!</p>
                                    <Link href="/spaces" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors">
                                        Explore Spaces <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Bookings */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                Recent Activity
                            </h2>
                        </div>

                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {recentBookings.map((booking) => (
                                <div key={booking.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0">
                                        <Image
                                            src={booking.spaceImage}
                                            alt={booking.spaceName}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{booking.spaceName}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{booking.location} • {booking.checkIn}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        {getStatusBadge(booking.status)}
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">${booking.totalCost}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column (1/3) */}
                <div className="space-y-6">

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href="/spaces" className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                                <Building2 className="w-5 h-5" />
                                <span className="text-sm font-semibold">Explore Spaces</span>
                            </Link>
                            <Link href="/dashboard/favorites" className="flex items-center gap-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors">
                                <Heart className="w-5 h-5" />
                                <span className="text-sm font-semibold">My Favorites</span>
                            </Link>
                            <Link href="/dashboard/reviews" className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                                <MessageSquare className="w-5 h-5" />
                                <span className="text-sm font-semibold">My Reviews</span>
                            </Link>
                            <Link href="/dashboard/profile" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <Eye className="w-5 h-5" />
                                <span className="text-sm font-semibold">Edit Profile</span>
                            </Link>
                        </div>
                    </div>

                    {/* Review Reminders */}
                    {reviewPrompts.length > 0 && (
                        <div className="bg-linear-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-700 p-6 rounded-2xl text-white shadow-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-5 h-5" />
                                <h3 className="font-bold text-lg">Share Your Experience</h3>
                            </div>
                            <p className="text-amber-100 text-sm mb-4">
                                You have {reviewPrompts.length} recent stay{reviewPrompts.length > 1 ? 's' : ''} waiting for a review.
                            </p>
                            <div className="space-y-2 mb-4">
                                {reviewPrompts.map((prompt) => (
                                    <div key={prompt.id} className="flex items-center gap-3 p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                        <Image width={500} height={500} src={prompt.spaceImage} alt={prompt.spaceName} className="w-10 h-10 rounded-md object-cover" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate">{prompt.spaceName}</p>
                                            <p className="text-xs text-amber-100">{prompt.visitDate}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/dashboard/reviews"
                                className="block w-full text-center py-2.5 bg-white text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-colors text-sm"
                            >
                                Write Reviews
                            </Link>
                        </div>
                    )}

                    {/* Saved Favorites Preview */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Bookmark className="w-5 h-5 text-rose-500" />
                                Saved Spaces
                            </h2>
                            <Link href="/dashboard/favorites" className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                                View All
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {favorites.slice(0, 3).map((space) => (
                                <div key={space.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0 relative">
                                        <Image
                                            src={space.image}
                                            alt={space.title}
                                            width={56}
                                            height={56}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={() => removeFavorite(space.id)}
                                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-gray-700 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-sm"
                                            title="Remove from favorites"
                                        >
                                            <XCircle className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/spaces/${space.id}`} className="font-semibold text-gray-900 dark:text-white text-sm truncate hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            {space.title}
                                        </Link>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{space.city}</span>
                                            <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                                            <div className="flex items-center gap-0.5">
                                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{space.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">${space.pricePerDay}</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400">/ day</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {favorites.length === 0 && (
                            <div className="text-center py-6">
                                <Heart className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                                <p className="text-sm text-gray-500 dark:text-gray-400">No saved spaces yet</p>
                            </div>
                        )}
                    </div>

                    {/* Membership Card */}
                    <div className="bg-linear-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800 p-6 rounded-2xl text-white shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg">Member Status</h3>
                            <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                                Free Plan
                            </span>
                        </div>
                        <p className="text-indigo-100 text-sm mb-4">
                            Upgrade to unlock priority bookings, exclusive spaces, and member-only discounts.
                        </p>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span className="text-indigo-100">Access to 500+ spaces</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span className="text-indigo-100">Secure booking guarantee</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm opacity-50">
                                <XCircle className="w-4 h-4" />
                                <span>Priority customer support</span>
                            </div>
                        </div>
                        <button className="w-full py-2.5 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors text-sm">
                            Upgrade to Pro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}