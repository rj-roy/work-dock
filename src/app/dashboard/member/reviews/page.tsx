// app/dashboard/reviews/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    Star,
    MessageSquare,
    Search,
    Edit3,
    Trash2,
    MapPin,
    Calendar,
    AlertCircle
} from 'lucide-react';
import Image from 'next/image';

interface Review {
    id: string;
    spaceName: string;
    spaceImage: string;
    spaceLocation: string;
    rating: number;
    comment: string;
    date: string;
}

const mockReviews: Review[] = [
    {
        id: '1',
        spaceName: 'The Executive Suite',
        spaceImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=150&q=80',
        spaceLocation: 'San Francisco, CA',
        rating: 5,
        comment: 'Absolutely stunning view and the furniture is top notch. The internet speed was perfect for our team meetings. Highly recommend for corporate offsites.',
        date: 'Oct 12, 2023',
    },
    {
        id: '2',
        spaceName: 'Downtown Creative Hub',
        spaceImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=150&q=80',
        spaceLocation: 'New York, NY',
        rating: 4,
        comment: 'The gourmet coffee is a life saver! Really quiet space despite being in such a central location. Only downside was the AC was a bit too cold.',
        date: 'Sep 28, 2023',
    },
    {
        id: '3',
        spaceName: 'Quiet Corner Lab',
        spaceImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=150&q=80',
        spaceLocation: 'Austin, TX',
        rating: 5,
        comment: 'Perfect for deep work. The noise-canceling pods are a game changer. Will definitely be booking this again next month.',
        date: 'Aug 15, 2023',
    },
    {
        id: '4',
        spaceName: 'Skyline Loft Co-op',
        spaceImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=150&q=80',
        spaceLocation: 'Chicago, IL',
        rating: 3,
        comment: 'Great views, but the WiFi was spotty during my stay. The host was very responsive though and tried to fix it quickly.',
        date: 'Jul 02, 2023',
    },
];

export default function MyReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>(mockReviews);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredReviews = useMemo(() => {
        return reviews.filter(review =>
            review.spaceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.comment.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [reviews, searchQuery]);

    const stats = useMemo(() => {
        const total = reviews.length;
        const avgRating = total > 0 ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / total).toFixed(1) : '0.0';
        return { total, avgRating };
    }, [reviews]);

    const deleteReview = (id: string) => {
        if (confirm('Are you sure you want to delete this review?')) {
            setReviews(prev => prev.filter(r => r.id !== id));
        }
    };

    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                />
            ))}
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <MessageSquare className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                    My Reviews
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Manage and view the reviews you&apos;ve left for workspaces.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Reviews</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                            <Star className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Rating Given</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.avgRating} / 5.0</p>
                </div>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search your reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-all shadow-sm"
                />
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {filteredReviews.length > 0 ? filteredReviews.map((review) => (
                    <div key={review.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row gap-6">
                            {/* Space Info */}
                            <div className="flex items-start gap-4 sm:w-1/3">
                                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0">
                                    <Image width={500} height={500} src={review.spaceImage} alt={review.spaceName} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <Link href={`/spaces/${review.id}`} className="font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        {review.spaceName}
                                    </Link>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <MapPin className="w-3 h-3" />
                                        {review.spaceLocation}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <Calendar className="w-3 h-3" />
                                        {review.date}
                                    </div>
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <StarRating rating={review.rating} />
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="Edit Review">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteReview(review.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete Review"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {review.comment}
                                </p>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-16 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No reviews found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                            {searchQuery ? 'Try adjusting your search terms.' : 'You haven\'t written any reviews yet. Book a space and share your experience!'}
                        </p>
                        {!searchQuery && (
                            <Link href="/spaces" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
                                Explore Spaces
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}