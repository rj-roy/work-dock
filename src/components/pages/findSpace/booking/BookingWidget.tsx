'use client'

import { useState } from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
    workspaceId: string;
    workspaceTitle: string;
    pricePerDay: number;
    pricePerMonth: number;
    // onSubmitAction?: (formData: FormData) => Promise<void>;
}

export default function BookingWidget({ workspaceId, workspaceTitle, pricePerDay, pricePerMonth, }: BookingModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const onSubmitAction = async (formData: FormData) => {
        console.log([...formData.entries()]);   
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

                    {/* Modal */}
                    <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl">
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
                                formData.set('workspaceId', workspaceId);
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
            )}
        </>
    );
}