'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import logo from '@/assets/img/logo.png'
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

interface FormData {
    email: string;
    password: string;
};

interface Props {
    redirect: string;
}

export default function SigninCompo({redirect}: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDemoLoading, setIsDemoLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || redirect;

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            });
            if (error) {
                return toast.error(error.message);
            } else if (data) {
                toast.success("Succeed! Redirecting...")
                await new Promise(resolve => setTimeout(resolve, 1500));
                router.push(redirectTo);
            };
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoLogin = async () => {
        setIsDemoLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Demo login');
        } catch (error) {
            console.error('Demo login error:', error);
        } finally {
            setIsDemoLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-4 transition-colors duration-300">
            <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-300">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-4">
                        <Image
                            src={logo}
                            alt='logo'
                            height={200}
                            width={200}
                            loading='eager'
                            className='rounded-2xl'
                        />                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, Login Please!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Log in to manage your workspace and team.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                            Email address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors ${errors.email
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-200 dark:border-gray-600'
                                    } text-gray-900 dark:text-white placeholder-gray-400`}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors ${errors.password
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-200 dark:border-gray-600'
                                    } text-gray-900 dark:text-white placeholder-gray-400`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    {/* Log In Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 dark:shadow-indigo-600/30"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Signing in...
                            </span>
                        ) : (
                            'Log In'
                        )}
                    </button>

                    {/* Demo Login Button */}
                    <button
                        type="button"
                        onClick={handleDemoLogin}
                        disabled={isDemoLoading}
                        className="w-full py-3 px-4 bg-transparent border-2 border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDemoLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Loading demo...
                            </span>
                        ) : (
                            'Try Demo Login'
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            or continue with
                        </span>
                    </div>
                </div>

                {/* Google Login */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Google</span>
                </button>

                {/* Footer */}
                <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don&apos;t have an account?{' '}
                    <Link href={`/auth/signup?redirect=${redirectTo || '/'}`} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}