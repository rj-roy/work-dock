// app/dashboard/admin/reviews/page.tsx
'use client';

import { useState, useMemo } from 'react';
import {
    MessageSquare,
    Star,
    Flag,
    Eye,
    EyeOff,
    Trash2,
    CheckCircle2,
    Search,
    Filter,
    AlertTriangle,
    ThumbsUp,
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-toastify';

// --- Types ---
type ReviewStatus = 'published' | 'flagged' | 'hidden';

interface Review {
    id: string;
    userName: string;
    userEmail: string;
    userAvatar: string;
    spaceTitle: string;
    spaceImage: string;
    rating: number;
    content: string;
    date: string;
    status: ReviewStatus;
    flagReason?: string;
}

// --- Mock Data ---
const mockReviews: Review[] = [
    {
        id: '1',
        userName: 'Jason Davis',
        userEmail: 'jason.d@example.com',
        userAvatar: 'https://i.pravatar.cc/150?u=1',
        spaceTitle: 'The Executive Suite',
        spaceImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        content: 'Absolutely stunning view and the furniture is top notch. The internet speed was perfect for our team meetings.',
        date: 'Oct 12, 2023',
        status: 'published',
    },
    {
        id: '2',
        userName: 'Anna Müller',
        userEmail: 'anna.m@example.com',
        userAvatar: 'https://i.pravatar.cc/150?u=2',
        spaceTitle: 'Downtown Creative Hub',
        spaceImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=100&q=80',
        rating: 4,
        content: 'The gourmet coffee is a life saver! Really quiet space despite being in such a central location.',
        date: 'Sep 28, 2023',
        status: 'published',
    },
    {
        id: '3',
        userName: 'Marcus Johnson',
        userEmail: 'marcus.j@example.com',
        userAvatar: 'https://i.pravatar.cc/150?u=3',
        spaceTitle: 'Quiet Corner Lab',
        spaceImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=100&q=80',
        rating: 1,
        content: 'This place is a scam. The host was rude and the AC was broken. Do not book here!!!',
        date: 'Nov 05, 2023',
        status: 'flagged',
        flagReason: 'Reported by host for inappropriate language',
    },
    {
        id: '4',
        userName: 'Elena Rodriguez',
        userEmail: 'elena.r@example.com',
        userAvatar: 'https://i.pravatar.cc/150?u=4',
        spaceTitle: 'Skyline Loft Co-op',
        spaceImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        content: 'Best workspace I have ever used. The community events are fantastic and the staff is incredibly helpful.',
        date: 'Nov 10, 2023',
        status: 'published',
    },
    {
        id: '5',
        userName: 'David Chen',
        userEmail: 'david.c@example.com',
        userAvatar: 'https://i.pravatar.cc/150?u=5',
        spaceTitle: 'NeoModern Studios',
        spaceImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=100&q=80',
        rating: 2,
        content: 'Not worth the price. The chairs are uncomfortable and it gets too noisy in the afternoons.',
        date: 'Nov 12, 2023',
        status: 'hidden',
    },
    {
        id: '6',
        userName: 'Sarah Jenkins',
        userEmail: 'sarah.j@example.com',
        userAvatar: 'https://i.pravatar.cc/150?u=6',
        spaceTitle: 'Harbor View Workspace',
        spaceImage: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        content: 'Amazing harbor views! Perfect for client meetings. Will definitely book again.',
        date: 'Nov 15, 2023',
        status: 'published',
    },
];

export default function ManageReviewsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ReviewStatus | 'all'>('all');
    const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
    const [reviews, setReviews] = useState<Review[]>(mockReviews);

    // Filter logic
    const filteredReviews = useMemo(() => {
        return reviews.filter(review => {
            const matchesSearch =
                review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.spaceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.content.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
            const matchesRating = ratingFilter === 'all' || review.rating === ratingFilter;

            return matchesSearch && matchesStatus && matchesRating;
        });
    }, [reviews, searchQuery, statusFilter, ratingFilter]);

    // Stats calculation
    const stats = useMemo(() => ({
        total: reviews.length,
        avgRating: (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1),
        flagged: reviews.filter(r => r.status === 'flagged').length,
        published: reviews.filter(r => r.status === 'published').length,
    }), [reviews]);

    // Action handlers
    const updateStatus = (id: string, newStatus: ReviewStatus) => {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
        toast.success("Updated!");
    };

    const deleteReview = (id: string) => {
        if (confirm('Are you sure you want to permanently delete this review?')) {
            setReviews(prev => prev.filter(r => r.id !== id));
        };
        toast.success("Removed !");
    };

    // Helper components
    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                />
            ))}
        </div>
    );

    const getStatusBadge = (status: ReviewStatus) => {
        switch (status) {
            case 'published':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" /> Published
                    </span>
                );
            case 'flagged':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                        <Flag className="w-3 h-3" /> Flagged
                    </span>
                );
            case 'hidden':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        <EyeOff className="w-3 h-3" /> Hidden
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
                        <MessageSquare className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                        Manage Reviews
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Moderate, hide, or remove user reviews to maintain platform quality.
                    </p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                    <Filter className="w-4 h-4" />
                    Export Reviews
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
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
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Rating</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.avgRating} / 5.0</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                            <Flag className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Flagged</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.flagged}</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                            <ThumbsUp className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Published</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.published}</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                    {/* Search */}
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by user, space, or content..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-all"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                        {/* Status Tabs */}
                        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                            {(['all', 'published', 'flagged', 'hidden'] as const).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${statusFilter === status
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        {/* Rating Filter */}
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                            <button
                                onClick={() => setRatingFilter('all')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${ratingFilter === 'all'
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400'
                                    }`}
                            >
                                All Stars
                            </button>
                            {[5, 4, 3, 2, 1].map(rating => (
                                <button
                                    key={rating}
                                    onClick={() => setRatingFilter(rating)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${ratingFilter === rating
                                        ? 'bg-white dark:bg-gray-700 text-amber-500 shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400'
                                        }`}
                                >
                                    <Star className={`w-3 h-3 ${ratingFilter === rating ? 'fill-amber-500' : ''}`} />
                                    {rating}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                {filteredReviews.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {filteredReviews.map((review) => (
                            <div key={review.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* User & Space Info */}
                                    <div className="flex items-start gap-4 lg:w-1/3">
                                        <Image
                                            width={400}
                                            height={400}
                                            src={review.userAvatar}
                                            alt={review.userName}
                                            className="w-12 h-12 rounded-full bg-gray-200 object-cover shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-900 dark:text-white truncate">{review.userName}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-2">{review.userEmail}</p>

                                            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                                <Image
                                                    width={400}
                                                    height={400}
                                                    src={review.spaceImage}
                                                    alt={review.spaceTitle}
                                                    className="w-8 h-8 rounded-md object-cover"
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{review.spaceTitle}</p>
                                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{review.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <StarRating rating={review.rating} />
                                            {getStatusBadge(review.status)}
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2">
                                            {review.content}
                                        </p>
                                        {review.flagReason && (
                                            <div className="mt-2 flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 px-3 py-1.5 rounded-lg border border-red-100 dark:border-red-900/30">
                                                <AlertTriangle className="w-3.5 h-3.5" />
                                                <span className="font-medium">Flag Reason:</span> {review.flagReason}
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex lg:flex-col items-center lg:items-end gap-2 lg:w-40 shrink-0">
                                        <button
                                            onClick={() => updateStatus(review.id, review.status === 'hidden' ? 'published' : 'hidden')}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors w-full justify-center ${review.status === 'hidden'
                                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                }`}
                                            title={review.status === 'hidden' ? 'Publish Review' : 'Hide Review'}
                                        >
                                            {review.status === 'hidden' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                            {review.status === 'hidden' ? 'Publish' : 'Hide'}
                                        </button>

                                        {review.status === 'flagged' && (
                                            <button
                                                onClick={() => updateStatus(review.id, 'published')}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors w-full justify-center"
                                                title="Resolve Flag"
                                            >
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                Resolve
                                            </button>
                                        )}

                                        <button
                                            onClick={() => deleteReview(review.id)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors w-full justify-center"
                                            title="Delete Review"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-16 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No reviews found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                            Try adjusting your search or filters to find the reviews you&apos;re looking for.
                        </p>
                    </div>
                )}

                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing <span className="font-medium text-gray-900 dark:text-white">{filteredReviews.length}</span> of <span className="font-medium text-gray-900 dark:text-white">{reviews.length}</span> reviews
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            Previous
                        </button>
                        <button className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-700">
                            1
                        </button>
                        <button className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}