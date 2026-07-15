import ProfileForm from '@/components/dashboard/profile/ProfileForm';
import { getUserSession } from '@/lib/core/session';
import { User, Shield, Briefcase, Camera } from 'lucide-react';

export default async function ProfilePage() {
    const session = await getUserSession();
    const user = session?.user;

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Profile Header Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Avatar */}
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-10 h-10" />}
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group-hover:scale-105">
                            <Camera className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="text-center sm:text-left flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {user.name || 'User'}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {user.email}
                        </p>

                        {/* Badges */}
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium capitalize border border-indigo-100 dark:border-indigo-800">
                                <Shield className="w-3.5 h-3.5" />
                                {user.role || 'Member'}
                            </span>
                            {user.plan && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-medium capitalize border border-amber-100 dark:border-amber-800">
                                    <Briefcase className="w-3.5 h-3.5" />
                                    {user.plan.replace('_', ' ')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            <ProfileForm initialData={user} />
        </div>
    );
}