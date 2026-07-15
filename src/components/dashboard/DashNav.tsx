'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Home, Star, Heart, User, LogOut, Plus, LayoutDashboard, Users, FileText, Settings, Building2, MessageSquare, FlagTriangleRight, FlagTriangleLeft, } from 'lucide-react';

interface NavLink {
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    label: string;
}

type UserRole = 'member' | 'host' | 'admin';

type DashboardSessionUser = {
    role?: UserRole;
    plan?: string;
    profileImage?: string;
};

const memberNavLinks: NavLink[] = [
    { icon: Home, href: '/spaces', label: 'Explore Spaces' },
    { icon: Star, href: '/dashboard/reviews', label: 'My Reviews' },
    { icon: Heart, href: '/dashboard/favorites', label: 'Favorites' },
    { icon: User, href: '/dashboard/profile', label: 'Profile' },
];

const hostNavLinks: NavLink[] = [
    { icon: Home, href: '/spaces', label: 'Explore Spaces' },
    { icon: Plus, href: '/spaces/add', label: 'Add Space' },
    { icon: Building2, href: '/spaces/manage', label: 'Manage Spaces' },
    { icon: LayoutDashboard, href: '/dashboard/host', label: 'Dashboard' },
    { icon: User, href: '/dashboard/profile', label: 'Profile' },
];

const adminNavLinks: NavLink[] = [
    { icon: LayoutDashboard, href: '/dashboard/admin', label: 'Overview' },
    { icon: FileText, href: '/dashboard/admin/listing', label: 'Listings' },
    { icon: Users, href: '/dashboard/admin/users', label: 'Manage Users' },
    { icon: MessageSquare, href: '/dashboard/admin/reviews', label: 'Manage Reviews' },
    { icon: Settings, href: '/dashboard/admin/settings', label: 'Settings' },
];

const navLinksMap: Record<UserRole, NavLink[]> = {
    member: memberNavLinks,
    host: hostNavLinks,
    admin: adminNavLinks,
};

const roleLabels: Record<UserRole, string> = {
    member: 'Member',
    host: 'Host',
    admin: 'Admin',
};

export default function DashNav() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: user } = authClient.useSession();
    const pathName = usePathname();
    const sessionUser = user?.user as DashboardSessionUser | undefined;

    const userRole: UserRole = sessionUser?.role || 'member';
    const menuItems = navLinksMap[userRole];

    const handleLogout = async () => {
        await authClient.signOut();
        setIsMobileMenuOpen(false);
        window.location.href = '/';
    };

    const isActive = (href: string): boolean => {
        if (href === menuItems[0]?.href) {
            return pathName === href;
        }
        return pathName === href || pathName.startsWith(href + '/');
    };

    const formatPlan = (plan?: string): string => {
        if (!plan) return 'Free Plan';
        return plan
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const getPlanTier = (plan?: string): string => {
        if (!plan) return 'Free';
        const parts = plan.split('_');
        return parts.length > 1 ? parts[1] : parts[0];
    };

    return (
        <>
            <div className="relative lg:h-screen lg:pb-15 lg:w-64">
                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    className="z-50 lg:hidden fixed top-24 left-4 p-2 rounded-lg bg-white-bg dark:bg-black-bg shadow-md"
                    aria-label="Toggle menu"
                >
                    {!isMobileMenuOpen && <FlagTriangleRight className="size-6" />}
                </button>

                {/* Sidebar */}
                <aside
                    className={`fixed top-16 z-40 h-screen pb-15 w-64 py-5 bg-white-bg dark:bg-black-bg flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:translate-x-0 border-r border-gray-300 dark:border-gray-800 shadow-sm`}
                >
                    {/* Header */}
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-bold">Dashboard</h1>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="lg:hidden p-1 border rounded-full"
                                aria-label="Close menu"
                            >
                                <FlagTriangleLeft className="size-5" />
                            </button>
                        </div>

                        {/* User Info Card */}
                        <div className="relative mt-4 flex items-center gap-3 rounded-lg bg-gray-500/50 p-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-gray-900">
                                <User className="size-4 text-white" />
                            </div>

                            <div className="pr-8">
                                <p className="text-sm font-medium">{roleLabels[userRole]}</p>
                                <p className="text-xs text-gray-800 dark:text-gray-400">
                                    {formatPlan(sessionUser?.plan)}
                                </p>
                                <span className="absolute -top-2 -right-4 inline-flex items-center rounded-full bg-green-200 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                    {getPlanTier(sessionUser?.plan)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                        {menuItems.map(({ href, label, icon: Icon }) => {
                            const active = isActive(href);
                            return (
                                <Link href={href} key={href}>
                                    <button
                                        className={`w-full text-nowrap flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${active
                                            ? 'bg-gray-800 text-white'
                                            : 'dark:text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                                            }`}
                                    >
                                        <Icon className="size-5" />
                                        <span className="font-medium">{label}</span>
                                    </button>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Actions */}
                    <div className="p-4 space-y-2 border-t border-gray-300 dark:border-gray-800">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 dark:text-gray-400 transition-colors hover:bg-gray-900 hover:text-white"
                        >
                            <LogOut className="size-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </aside>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-30 lg:hidden bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
}