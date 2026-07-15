    'use client';

import { useState, useMemo } from 'react';
import {
    Users,
    UserCheck,
    UserX,
    Shield,
    Search,
    Eye,
    Ban,
    CheckCircle2,
    Trash2,
    Download,
    Filter,
    Mail
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-toastify';

type UserRole = 'member' | 'host' | 'admin';
type UserStatus = 'active' | 'suspended' | 'pending';

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    joinDate: string;
    avatar: string;
    spacesListed?: number;
    bookingsMade?: number;
}

const mockUsers: User[] = [
    { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'host', status: 'active', joinDate: 'Oct 12, 2023', avatar: 'https://i.pravatar.cc/150?u=1', spacesListed: 4, bookingsMade: 0 },
    { id: '2', name: 'Mark Thompson', email: 'mark.t@example.com', role: 'member', status: 'active', joinDate: 'Nov 05, 2023', avatar: 'https://i.pravatar.cc/150?u=2', spacesListed: 0, bookingsMade: 12 },
    { id: '3', name: 'David Chen', email: 'david.c@example.com', role: 'host', status: 'suspended', joinDate: 'Jan 18, 2024', avatar: 'https://i.pravatar.cc/150?u=3', spacesListed: 2, bookingsMade: 0 },
    { id: '4', name: 'Elena Rodriguez', email: 'elena.r@example.com', role: 'member', status: 'active', joinDate: 'Feb 22, 2024', avatar: 'https://i.pravatar.cc/150?u=4', spacesListed: 0, bookingsMade: 5 },
    { id: '5', name: 'James Wilson', email: 'james.w@example.com', role: 'admin', status: 'active', joinDate: 'Mar 10, 2023', avatar: 'https://i.pravatar.cc/150?u=5', spacesListed: 0, bookingsMade: 0 },
    { id: '6', name: 'Lisa Anderson', email: 'lisa.a@example.com', role: 'host', status: 'pending', joinDate: 'Jul 14, 2026', avatar: 'https://i.pravatar.cc/150?u=6', spacesListed: 1, bookingsMade: 0 },
];

export default function ManageUsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
    const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
    const [users, setUsers] = useState<User[]>(mockUsers);

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchQuery, roleFilter, statusFilter]);

    const stats = useMemo(() => ({
        total: users.length,
        active: users.filter(u => u.status === 'active').length,
        hosts: users.filter(u => u.role === 'host').length,
        suspended: users.filter(u => u.status === 'suspended').length,
    }), [users]);

    const toggleStatus = (id: string) => {
        setUsers(prev => prev.map(u => {
            if (u.id === id) {
                return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
            }
            return u;
        }));
        toast.success('Updated!');
    };

    const deleteUser = (id: string) => {
        if (confirm('Are you sure you want to permanently delete this user?')) {
            setUsers(prev => prev.filter(u => u.id !== id));
        };
        toast.success("User removed successfully!");
    };

    const getRoleBadge = (role: UserRole) => {
        const styles = {
            admin: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
            host: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
            member: 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700',
        };
        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${styles[role]}`}>
                {role === 'admin' && <Shield className="w-3 h-3" />}
                {role}
            </span>
        );
    };

    const getStatusBadge = (status: UserStatus) => {
        const styles = {
            active: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
            suspended: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
            pending: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
        };
        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${styles[status]}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-emerald-500' : status === 'suspended' ? 'bg-red-500' : 'bg-amber-500'}`} />
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Users className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                        Manage Users
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        View, manage, and moderate all platform users.
                    </p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Users', value: stats.total, icon: Users, color: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' },
                    { label: 'Active Users', value: stats.active, icon: UserCheck, color: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' },
                    { label: 'Total Hosts', value: stats.hosts, icon: Shield, color: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' },
                    { label: 'Suspended', value: stats.suspended, icon: UserX, color: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm text-gray-900 dark:text-white placeholder-gray-400 transition-all"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Filter className="w-4 h-4" />
                            <span className="font-medium">Filters:</span>
                        </div>
                        {(['all', 'member', 'host', 'admin'] as const).map(role => (
                            <button
                                key={role}
                                onClick={() => setRoleFilter(role)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${roleFilter === role ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {role}
                            </button>
                        ))}
                        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block" />
                        {(['all', 'active', 'suspended', 'pending'] as const).map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${statusFilter === status ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredUsers.length > 0 ? filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Image width={400} height={400} src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name}</p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                                    <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                        {user.role === 'host' ? `${user.spacesListed} spaces` : `${user.bookingsMade} bookings`}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.joinDate}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="View Profile">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => toggleStatus(user.id)}
                                                className={`p-2 rounded-lg transition-colors ${user.status === 'suspended' ? 'text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20' : 'text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'}`}
                                                title={user.status === 'suspended' ? 'Activate User' : 'Suspend User'}
                                            >
                                                {user.status === 'suspended' ? <CheckCircle2 className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                title="Delete User"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                                                <Users className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No users found</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search or filters.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}