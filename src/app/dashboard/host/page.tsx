import {
    LayoutDashboard,
    Building2,
    CalendarCheck,
    DollarSign,
    Star,
    TrendingUp,
    Plus,
    List,
    Eye,
    MessageSquare,
    MoreHorizontal,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    XCircle
} from 'lucide-react';
import Link from 'next/link';

// --- Mock Data ---
const stats = [
    {
        label: 'Total Spaces',
        value: '4',
        change: '+1 this month',
        icon: Building2,
        color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
    },
    {
        label: 'Total Bookings',
        value: '42',
        change: '+12% vs last month',
        trend: 'up',
        icon: CalendarCheck,
        color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
    },
    {
        label: 'Total Revenue',
        value: '$3,450',
        change: '+8.4% vs last month',
        trend: 'up',
        icon: DollarSign,
        color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
    },
    {
        label: 'Avg Rating',
        value: '4.8',
        change: 'Based on 28 reviews',
        icon: Star,
        color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
    },
];

const recentBookings = [
    { id: '1', space: 'The Executive Suite', guest: 'Jason Davis', date: 'Oct 15 - Oct 17', status: 'confirmed', amount: '$240' },
    { id: '2', space: 'Downtown Creative Hub', guest: 'Anna Müller', date: 'Oct 18', status: 'pending', amount: '$85' },
    { id: '3', space: 'The Executive Suite', guest: 'Mark Thompson', date: 'Oct 20 - Oct 22', status: 'confirmed', amount: '$360' },
    { id: '4', space: 'Quiet Corner Lab', guest: 'Elena Rodriguez', date: 'Oct 25', status: 'cancelled', amount: '$0' },
];

const recentReviews = [
    { id: '1', guest: 'Jason Davis', space: 'The Executive Suite', rating: 5, comment: 'Absolutely stunning view and the furniture is top notch.', date: '2 days ago' },
    { id: '2', guest: 'Anna Müller', space: 'Downtown Creative Hub', rating: 4, comment: 'The gourmet coffee is a life saver! Really quiet space.', date: '5 days ago' },
];

const weeklyRevenue = [320, 450, 280, 600, 520, 780, 500]; // Mock data for chart
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HostOverviewPage() {
    const maxRevenue = Math.max(...weeklyRevenue);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <LayoutDashboard className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                        Host Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Welcome back, Sarah. Here&apos;s how your spaces are performing today.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/spaces/manage"
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                        <List className="w-4 h-4" />
                        Manage Spaces
                    </Link>
                    <Link
                        href="/spaces/add"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Space
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
                                {stat.trend && (
                                    <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                                        <TrendingUp className="w-3 h-3" />
                                        {stat.change}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                            {!stat.trend && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.change}</p>}
                        </div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Revenue Trend Chart */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Trend</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Earnings over the last 7 days</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Pure CSS Bar Chart */}
                        <div className="flex items-end justify-between h-48 gap-3">
                            {weeklyRevenue.map((val, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full relative flex items-end justify-center h-full">
                                        <div
                                            className="w-full max-w-8 bg-linear-to-t from-indigo-600 to-purple-500 dark:from-indigo-500 dark:to-purple-400 rounded-t-lg transition-all duration-300 group-hover:opacity-80 relative"
                                            style={{ height: `${(val / maxRevenue) * 100}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                ${val}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        {days[idx]}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Total this week</span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                ${weeklyRevenue.reduce((a, b) => a + b, 0)}
                            </span>
                        </div>
                    </div>

                    {/* Recent Bookings Table */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <CalendarCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    Recent Bookings
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your latest reservation activity</p>
                            </div>
                            <Link href="/spaces/manage" className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1">
                                View All <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-500 dark:text-gray-400 font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Space</th>
                                        <th className="px-6 py-4">Guest</th>
                                        <th className="px-6 py-4">Dates</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {recentBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white text-sm">{booking.space}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{booking.guest}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{booking.date}</td>
                                            <td className="px-6 py-4">
                                                {booking.status === 'confirmed' && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                                        <CheckCircle2 className="w-3 h-3" /> Confirmed
                                                    </span>
                                                )}
                                                {booking.status === 'pending' && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                                                        <Clock className="w-3 h-3" /> Pending
                                                    </span>
                                                )}
                                                {booking.status === 'cancelled' && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                                                        <XCircle className="w-3 h-3" /> Cancelled
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white text-right">{booking.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column (1/3) */}
                <div className="space-y-6">

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href="/spaces/add" className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                                <Plus className="w-5 h-5" />
                                <span className="text-sm font-semibold">List a New Space</span>
                            </Link>
                            <Link href="/spaces/manage" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <List className="w-5 h-5" />
                                <span className="text-sm font-semibold">Manage Listings</span>
                            </Link>
                            <Link href="/dashboard/profile" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <Eye className="w-5 h-5" />
                                <span className="text-sm font-semibold">View Public Profile</span>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                Recent Reviews
                            </h2>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">28 total</span>
                        </div>

                        <div className="space-y-4">
                            {recentReviews.map((review) => (
                                <div key={review.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />
                                            ))}
                                        </div>
                                        <span className="text-[10px] text-gray-400">{review.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-2">{review.comment}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        - <span className="font-medium text-gray-700 dark:text-gray-300">{review.guest}</span> from {review.space}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Space Status Distribution */}
                    <div className="bg-linear-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800 p-6 rounded-2xl text-white shadow-lg">
                        <h3 className="font-bold text-lg mb-4">Space Status</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-indigo-100">Approved & Live</span>
                                <span className="font-bold">3 Spaces</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-1.5">
                                <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                            </div>

                            <div className="flex items-center justify-between text-sm mt-3">
                                <span className="text-indigo-100">Pending Approval</span>
                                <span className="font-bold">1 Space</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-1.5">
                                <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/20 flex items-center gap-2 text-sm text-indigo-100">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                            Your spaces are performing well!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}