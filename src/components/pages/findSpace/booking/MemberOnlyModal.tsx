'use client'
import Link from 'next/link';
import { Lock, User, ArrowRight, Sparkles, X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

interface MemberOnlyModalProps {
    onClose?: () => void;
    returnTo?: string;
    setIsOpen: (value: boolean) => void;
}

export default function MemberOnlyModal({ returnTo = '/', setIsOpen }: MemberOnlyModalProps) {
    const handleClickSign = async (href: string) => {
        await authClient.signOut();
        window.location.href = href;
    };

    return (
        <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />

            {/* Icon */}
            <div className="relative flex justify-center mb-5">
                <div onClick={() => setIsOpen(false)} className='cursor-pointer absolute -top-2 -right-2'>
                    <X />
                </div>
                <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center shadow-lg shadow-indigo-500/30 dark:shadow-indigo-600/20">
                        <Lock className="w-9 h-9 text-white" />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-200 dark:border-indigo-800 animate-spin-slow" style={{ animationDuration: '20s' }} />
                    {/* Sparkle */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative text-center space-y-3 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Members Only
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Booking this space is exclusive to WorkDock members.
                    Sign in or create a free account to reserve your spot.
                </p>
            </div>

            {/* Benefits List */}
            <div className="relative mb-6 space-y-2.5">
                {[
                    'Book premium workspaces instantly',
                    'Save favorites and track reservations',
                    'Access member-only discounts',
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
                <button onClick={() => handleClickSign(`/auth/signin?redirect=${returnTo}`)}
                    // href={`/auth/signin?redirect=${returnTo}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-700 dark:hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-600/30 hover:shadow-xl group"
                >
                    <User className="w-5 h-5" />
                    <span>Sign In as Member to Continue</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                    onClick={() => handleClickSign(`/auth/signup?redirect=${returnTo}`)}
                    // href={`/auth/signup?redirect=${returnTo}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                >
                    <Sparkles className="w-5 h-5" />
                    <span>Create Free Member Account</span>
                </button>
            </div>

            {/* Footer Text */}
            <p className="relative text-center text-xs text-gray-500 dark:text-gray-500 mt-5">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    Terms of Service
                </Link>
            </p>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}</style>
        </div>
    );
}