'use client'
import { useState } from 'react';
import { X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import SigninCompo from '@/components/auth/SigninCompo';
import MemberOnlyModal from './MemberOnlyModal';
import { patchAction } from '@/lib/actions/patchActions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface BookingModalProps {
    workspaceId: string;
    workspaceTitle: string;
    pricePerDay: number;
    pricePerMonth: number;
}

export default function BookingWidget({ workspaceId, workspaceTitle, pricePerDay, pricePerMonth, }: BookingModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const onSubmitAction = async (formData: FormData) => {

        formData.set('workspaceTitle', workspaceTitle);
        formData.set('workspaceId', workspaceId);
        formData.set("userName", session?.user?.name ?? "");
        formData.set("userId", session?.user?.id ?? "");

        const bookingData = Object.fromEntries(formData.entries());

        try {
            if (!session) return router.push('/auth/signin');
            const booking = await patchAction(bookingData, '/api/v1/booking/create', 'member')

            if (booking.success === false) {
                toast.error(booking.message)
                return;
            } else if (booking.success === true) {
                toast.success("Booking created successfully!");
                await new Promise((resolve) => setTimeout(resolve, 2000));
                router.push('/dashboard/member/bookings');
            };

        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
        };
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/30 dark:hover:shadow-indigo-600/40 active:scale-[0.98]"
            >
                Book Now
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />
                    {
                        !session ?
                            <div className='relative w-full max-w-2xl rounded-2xl p-6 shadow-2xl'>
                                <SigninCompo redirect={'/find-space'} />
                            </div>
                            : (session?.user as { role?: string })?.role !== "member" ?
                                <MemberOnlyModal setIsOpen={setIsOpen} returnTo={`/find-space/${workspaceId}`} />

                                : <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl">

                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(false)}
                                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>

                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                            Book {workspaceTitle}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                            ৳{pricePerDay.toLocaleString()}/day
                                            or ৳{pricePerMonth.toLocaleString()}/month
                                        </p>

                                        <form
                                            action={async (formData: FormData) => {

                                                await onSubmitAction?.(formData);
                                                setIsOpen(false);
                                            }}
                                            className="space-y-4" >
                                            <input type="hidden" name="workspaceId" value={workspaceId} />

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Check-in date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="checkInDate"
                                                    required
                                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Number of days
                                                </label>
                                                <input
                                                    type="number"
                                                    name="numberOfDays"
                                                    min={1}
                                                    defaultValue={1}
                                                    required
                                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Notes (optional)
                                                </label>
                                                <textarea
                                                    name="notes"
                                                    rows={3}
                                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-white resize-none"
                                                />
                                            </div>

                                            <div className="flex gap-3 pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                    }
                </div>
            )}
        </>
    );
}