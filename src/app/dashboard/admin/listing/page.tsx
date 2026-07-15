// app/dashboard/admin/spaces/page.tsx
'use client';

import { useState, useMemo } from 'react';
import {
    Search,
    Eye,
    CheckCircle2,
    XCircle,
    Trash2,
    Building2,
    MapPin,
    AlertCircle,
    CheckCircle,
    XOctagon,
    Clock,
    LayoutList
} from 'lucide-react';
import Image from 'next/image';

// --- Types ---
type ListingStatus = 'pending' | 'approved' | 'rejected';

interface Listing {
    id: string;
    title: string;
    hostName: string;
    hostAvatar: string;
    category: string;
    city: string;
    pricePerDay: number;
    status: ListingStatus;
    image: string;
    createdAt: string;
}

// --- Mock Data ---
const mockListings: Listing[] = [
    {
        id: '1',
        title: 'The Executive Suite',
        hostName: 'Sarah Jenkins',
        hostAvatar: 'https://i.pravatar.cc/150?u=1',
        category: 'Private Office',
        city: 'San Francisco, CA',
        pricePerDay: 120,
        status: 'pending',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=100&q=80',
        createdAt: '2 hours ago',
    },
    {
        id: '2',
        title: 'Downtown Creative Hub',
        hostName: 'Mark Thompson',
        hostAvatar: 'https://i.pravatar.cc/150?u=2',
        category: 'Hot Desk',
        city: 'New York, NY',
        pricePerDay: 45,
        status: 'approved',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=100&q=80',
        createdAt: '1 day ago',
    },
    {
        id: '3',
        title: 'Quiet Corner Lab',
        hostName: 'David Chen',
        hostAvatar: 'https://i.pravatar.cc/150?u=3',
        category: 'Meeting Room',
        city: 'Austin, TX',
        pricePerDay: 85,
        status: 'rejected',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=100&q=80',
        createdAt: '3 days ago',
    },
    {
        id: '4',
        title: 'Skyline Loft Co-op',
        hostName: 'Elena Rodriguez',
        hostAvatar: 'https://i.pravatar.cc/150?u=4',
        category: 'Private Office',
        city: 'Chicago, IL',
        pricePerDay: 150,
        status: 'pending',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=100&q=80',
        createdAt: '5 hours ago',
    },
    {
        id: '5',
        title: 'NeoModern Studios',
        hostName: 'James Wilson',
        hostAvatar: 'https://i.pravatar.cc/150?u=5',
        category: 'Creative Studio',
        city: 'Seattle, WA',
        pricePerDay: 90,
        status: 'approved',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=100&q=80',
        createdAt: '1 week ago',
    },
    {
        id: '6',
        title: 'Harbor View Workspace',
        hostName: 'Lisa Anderson',
        hostAvatar: 'https://i.pravatar.cc/150?u=6',
        category: 'Hot Desk',
        city: 'Miami, FL',
        pricePerDay: 55,
        status: 'pending',
        image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=100&q=80',
        createdAt: '12 hours ago',
    },
];

export default function AdminListingsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ListingStatus | 'all'>('all');
    const [listings, setListings] = useState<Listing[]>(mockListings);

    // Filter logic
    const filteredListings = useMemo(() => {
        return listings.filter((listing) => {
            const matchesSearch =
                listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                listing.hostName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                listing.city.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [listings, searchQuery, statusFilter]);

    // Stats calculation
    const stats = useMemo(() => ({
        total: listings.length,
        pending: listings.filter(l => l.status === 'pending').length,
        approved: listings.filter(l => l.status === 'approved').length,
        rejected: listings.filter(l => l.status === 'rejected').length,
    }), [listings]);

    // Action handlers
    const handleStatusChange = (id: string, newStatus: ListingStatus) => {
        setListings(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this listing?')) {
            setListings(prev => prev.filter(l => l.id !== id));
        }
    };

    const getStatusBadge = (status: ListingStatus) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                        <Clock className="w-3 h-3" /> Pending
                    </span>
                );
            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle className="w-3 h-3" /> Approved
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                        <XOctagon className="w-3 h-3" /> Rejected
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
                        <LayoutList className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                        Listing Overview
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Review, approve, and manage all workspace listings on the platform.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Listings</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                            <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.pending}</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.approved}</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                            <XCircle className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.rejected}</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    {/* Search */}
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by space, host, or city..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-all"
                        />
                    </div>

                    {/* Status Filters */}
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${statusFilter === status
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Space Details</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Host</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price/Day</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Added</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredListings.length > 0 ? (
                                filteredListings.map((listing) => (
                                    <tr key={listing.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                                        {/* Space Details */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
                                                    <Image
                                                        height={400}
                                                        width={400}
                                                        src={listing.image}
                                                        alt={listing.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{listing.title}</p>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {listing.city}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Host */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    height={400}
                                                    width={400}
                                                    src={listing.hostAvatar}
                                                    alt={listing.hostName}
                                                    className="w-8 h-8 rounded-full bg-gray-200"
                                                />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {listing.hostName}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                                {listing.category}
                                            </span>
                                        </td>

                                        {/* Price */}
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                ${listing.pricePerDay}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            {getStatusBadge(listing.status)}
                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {listing.createdAt}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>

                                                {listing.status !== 'approved' && (
                                                    <button
                                                        onClick={() => handleStatusChange(listing.id, 'approved')}
                                                        className="p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </button>
                                                )}

                                                {listing.status !== 'rejected' && (
                                                    <button
                                                        onClick={() => handleStatusChange(listing.id, 'rejected')}
                                                        className="p-2 text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                                                        title="Reject"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleDelete(listing.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                                                <AlertCircle className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No listings found</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                                                Try adjusting your search or filter to find what you&apos;re looking for.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing <span className="font-medium text-gray-900 dark:text-white">{filteredListings.length}</span> of <span className="font-medium text-gray-900 dark:text-white">{listings.length}</span> listings
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            Previous
                        </button>
                        <button className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-700">
                            1
                        </button>
                        <button className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                            2
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