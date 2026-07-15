// app/dashboard/admin/page.tsx
'use client';

import {
    LayoutDashboard,
    Building2,
    Users,
    Clock,
    DollarSign,
    TrendingUp,
    TrendingDown,
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    Eye,
    AlertCircle,
    ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

// --- Mock Data ---
const stats = [
    {
        label: 'Total Spaces',
        value: '1,248',
        change: '+12.5%',
        trend: 'up',
        icon: Building2,
        color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
    },
    {
        label: 'Pending Approvals',
        value: '14',
        change: '+3',
        trend: 'up',
        icon: Clock,
        color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
    },
    {
        label: 'Active Users',
        value: '15,420',
        change: '+8.2%',
        trend: 'up',
        icon: Users,
        color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
    },
    {
        label: 'Monthly Revenue',
        value: '$48,290',
        change: '-2.4%',
        trend: 'down',
        icon: DollarSign,
        color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
    },
];

const pendingSpaces = [
    { id: '1', name: 'Skyline Loft Co-op', host: 'Sarah Jenkins', category: 'Private Office', date: '2 hours ago' },
    { id: '2', name: 'Downtown Creative Hub', host: 'Mark Thompson', category: 'Hot Desk', date: '5 hours ago' },
    { id: '3', name: 'Executive Boardroom', host: 'Elena Rodriguez', category: 'Meeting Room', date: '1 day ago' },
    { id: '4', name: 'Quiet Corner Lab', host: 'David Chen', category: 'Hot Desk', date: '1 day ago' },
];

const weeklyBookings = [65, 45, 78, 52, 90, 85, 110]; // Mock data for chart

export default function AdminOverviewPage() {
    const maxBookings = Math.max(...weeklyBookings);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <LayoutDashboard className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                        Admin Overview
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Welcome back, Admin. Here&apos;s what&apos;s happening on WorkDock today.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Export Report
                    </button>
                    <Link
                        href="/dashboard/admin/spaces"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-2"
                    >
                        Review Pending <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={idx}
                            className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${stat.trend === 'up'
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                                    }`}>
                                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Pending Approvals (2/3 width) */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-amber-500" />
                                Pending Approvals
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {pendingSpaces.length} spaces waiting for your review
                            </p>
                        </div>
                        <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-500 dark:text-gray-400 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Space Name</th>
                                    <th className="px-6 py-4">Host</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Submitted</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {pendingSpaces.map((space) => (
                                    <tr key={space.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900 dark:text-white">{space.name}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{space.host}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                                {space.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{space.date}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="View">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" title="Approve">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Reject">
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Platform Health & Activity (1/3 width) */}
                <div className="space-y-6">
                    {/* Weekly Bookings Chart */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Weekly Bookings</h2>
                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Pure CSS Bar Chart */}
                        <div className="flex items-end justify-between h-40 gap-2">
                            {weeklyBookings.map((val, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full relative flex items-end justify-center h-full">
                                        <div
                                            className="w-full max-w-6 bg-linear-to-t from-indigo-600 to-purple-500 dark:from-indigo-500 dark:to-purple-400 rounded-t-md transition-all duration-300 group-hover:opacity-80"
                                            style={{ height: `${(val / maxBookings) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-medium">
                                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Total this week</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {weeklyBookings.reduce((a, b) => a + b, 0)} bookings
                            </span>
                        </div>
                    </div>

                    {/* Quick Actions / System Status */}
                    <div className="bg-linear-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800 p-6 rounded-2xl text-white shadow-lg">
                        <h3 className="font-bold text-lg mb-2">System Status</h3>
                        <p className="text-indigo-100 text-sm mb-4">All platform services are operating normally.</p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-indigo-100">API Uptime</span>
                                <span className="font-semibold">99.9%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-1.5">
                                <div className="bg-white h-1.5 rounded-full" style={{ width: '99.9%' }}></div>
                            </div>
                            <div className="flex items-center justify-between text-sm mt-2">
                                <span className="text-indigo-100">Storage Used</span>
                                <span className="font-semibold">64%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-1.5">
                                <div className="bg-white h-1.5 rounded-full" style={{ width: '64%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}