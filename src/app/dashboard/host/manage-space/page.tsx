// app/spaces/manage/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    Building2,
    Plus,
    Search,
    Edit3,
    Eye,
    Trash2,
    MapPin,
    Star,
    TrendingUp,
    CheckCircle2,
    Clock,
    XCircle,
    FileText,
    LayoutGrid,
    List
} from 'lucide-react';
import Image from 'next/image';

// --- Types ---
type SpaceStatus = 'active' | 'pending' | 'rejected' | 'draft';

interface Space {
    id: string;
    title: string;
    category: string;
    city: string;
    pricePerDay: number;
    status: SpaceStatus;
    image: string;
    views: number;
    bookings: number;
    rating: number;
}

// --- Mock Data ---
const mockSpaces: Space[] = [
    {
        id: '1',
        title: 'The Executive Suite',
        category: 'Private Office',
        city: 'San Francisco, CA',
        pricePerDay: 120,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80',
        views: 1240,
        bookings: 42,
        rating: 4.9,
    },
    {
        id: '2',
        title: 'Downtown Creative Hub',
        category: 'Hot Desk',
        city: 'New York, NY',
        pricePerDay: 45,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=200&q=80',
        views: 850,
        bookings: 28,
        rating: 4.7,
    },
    {
        id: '3',
        title: 'Quiet Corner Lab',
        category: 'Meeting Room',
        city: 'Austin, TX',
        pricePerDay: 85,
        status: 'pending',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=200&q=80',
        views: 120,
        bookings: 0,
        rating: 0,
    },
    {
        id: '4',
        title: 'Harbor View Workspace',
        category: 'Hot Desk',
        city: 'Miami, FL',
        pricePerDay: 55,
        status: 'rejected',
        image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=200&q=80',
        views: 45,
        bookings: 0,
        rating: 0,
    },
    {
        id: '5',
        title: 'NeoModern Studios',
        category: 'Creative Studio',
        city: 'Seattle, WA',
        pricePerDay: 90,
        status: 'draft',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=200&q=80',
        views: 0,
        bookings: 0,
        rating: 0,
    },
];

export default function ManageSpacesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<SpaceStatus | 'all'>('all');
    const [spaces, setSpaces] = useState<Space[]>(mockSpaces);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    // Filter logic
    const filteredSpaces = useMemo(() => {
        return spaces.filter(space => {
            const matchesSearch = space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                space.city.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || space.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [spaces, searchQuery, statusFilter]);

    // Stats
    const stats = useMemo(() => ({
        total: spaces.length,
        active: spaces.filter(s => s.status === 'active').length,
        pending: spaces.filter(s => s.status === 'pending').length,
        totalBookings: spaces.reduce((acc, curr) => acc + curr.bookings, 0),
    }), [spaces]);

    // Actions
    const deleteSpace = (id: string) => {
        if (confirm('Are you sure you want to delete this space? This action cannot be undone.')) {
            setSpaces(prev => prev.filter(s => s.id !== id));
        }
    };

    const getStatusBadge = (status: SpaceStatus) => {
        switch (status) {
            case 'active':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                        <Clock className="w-3 h-3" /> Pending Review
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                        <XCircle className="w-3 h-3" /> Rejected
                    </span>
                );
            case 'draft':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        <FileText className="w-3 h-3" /> Draft
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
                        <Building2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                        Manage Spaces
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Track performance, update details, and manage your listings.
                    </p>
                </div>
                <Link
                    href="/spaces/add"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add New Space
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spaces</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Active</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.active}</p>
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
                        <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Bookings</span>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalBookings}</p>
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
                            placeholder="Search spaces or cities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Status Tabs */}
                        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl overflow-x-auto">
                            {(['all', 'active', 'pending', 'rejected', 'draft'] as const).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all whitespace-nowrap ${statusFilter === status
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        {/* View Toggle */}
                        <div className="hidden sm:flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spaces List / Grid */}
            {filteredSpaces.length > 0 ? (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {filteredSpaces.map((space) => (
                        <div
                            key={space.id}
                            className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col'
                                }`}
                        >
                            {/* Image */}
                            <div className={`relative bg-gray-200 dark:bg-gray-800 ${viewMode === 'list' ? 'sm:w-48 h-48 sm:h-auto' : 'h-48'}`}>
                                <Image
                                    height={400}
                                    width={400}
                                    src={space.image}
                                    alt={space.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 left-3">
                                    {getStatusBadge(space.status)}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-5 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
                                                {space.title}
                                            </h3>
                                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {space.city}
                                            </div>
                                        </div>
                                        {space.rating > 0 && (
                                            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
                                                <Star className="w-3 h-3 fill-current" />
                                                {space.rating}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="inline-flex items-center gap-1.5">
                                            <Eye className="w-4 h-4 text-gray-400" />
                                            {space.views.toLocaleString()} views
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <TrendingUp className="w-4 h-4 text-gray-400" />
                                            {space.bookings} bookings
                                        </span>
                                    </div>
                                </div>

                                {/* Footer Actions & Price */}
                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <div>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">${space.pricePerDay}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400"> / day</span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Link
                                            href={`/spaces/${space.id}`}
                                            className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                            title="View Public Listing"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/spaces/edit/${space.id}`}
                                            className="p-2 text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                                            title="Edit Space"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => deleteSpace(space.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete Space"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No spaces found</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
                        Try adjusting your search or filters, or list a new space to get started.
                    </p>
                    <Link
                        href="/spaces/add"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Space
                    </Link>
                </div>
            )}
        </div>
    );
}