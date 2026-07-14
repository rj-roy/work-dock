'use client';
import Link from 'next/link';
import { Building2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

interface Props {
    returnTo: string;
}

export default function HostOnlyModal({ returnTo }: Props) {
    const handleClickSign = async (href: string) => {
        await authClient.signOut();
        window.location.href = href;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Background Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />

                {/* Icon */}
                <div className="relative flex justify-center mb-5">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center shadow-lg shadow-indigo-500/30 dark:shadow-indigo-600/20">
                            <ShieldCheck className="w-9 h-9 text-white" />
                        </div>
                        {/* Decorative ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-200 dark:border-indigo-800" />
                        {/* Sparkle */}
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative text-center space-y-3 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Hosts Only
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        This feature is exclusively available for verified WorkDock hosts.
                        Sign in with your host account or register to start listing your spaces.
                    </p>
                </div>

                {/* Benefits List */}
                <div className="relative mb-6 space-y-2.5">
                    {[
                        'List and manage your workspaces',
                        'Track bookings and earnings securely',
                        'Access host-only analytics and tools',
                    ].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                            <div className="shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span>{benefit}</span>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="relative space-y-3">
                    <button
                        onClick={() => handleClickSign(`/auth/signin?redirect=${returnTo}`)}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-700 dark:hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-600/30 hover:shadow-xl group cursor-pointer"
                    >
                        <Building2 className="w-5 h-5" />
                        <span>Sign In as Host</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                        onClick={() => handleClickSign(`/auth/signup?redirect=${returnTo}`)}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 cursor-pointer"
                    >
                        <Sparkles className="w-5 h-5" />
                        <span>Become a Host</span>
                    </button>
                </div>

                {/* Footer Text */}
                <p className="relative text-center text-xs text-gray-500 dark:text-gray-500 mt-5">
                    By continuing, you agree to our{' '}
                    <Link href="/terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        Terms of Service
                    </Link>
                </p>
            </div>
        </div>
    );
}