// components/listing/PricingCapacitySection.tsx
import { Building2, Briefcase, Upload } from 'lucide-react';

interface PricingCapacitySectionProps {
    formData: {
        category: string;
        capacity: number;
        pricePerDay: number;
        pricePerMonth: number;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CATEGORIES = [
    { value: 'private-office', label: 'Private Office', icon: Building2 },
    { value: 'hot-desk', label: 'Hot Desk', icon: Briefcase },
    { value: 'meeting-room', label: 'Meeting Room', icon: Upload },
];

export default function PricingCapacity({ formData, onChange }: PricingCapacitySectionProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Category
                </label>
                <div className="relative">
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={onChange}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors text-gray-900 dark:text-white appearance-none"
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="capacity" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Capacity (People)
                </label>
                <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    min="1"
                    value={formData.capacity}
                    onChange={onChange}
                    placeholder="Max guests"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors text-gray-900 dark:text-white placeholder-gray-400"
                />
            </div>

            <div>
                <label htmlFor="pricePerDay" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Price per Day ($)
                </label>
                <input
                    type="number"
                    id="pricePerDay"
                    name="pricePerDay"
                    min="0"
                    step="0.01"
                    value={formData.pricePerDay}
                    onChange={onChange}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors text-gray-900 dark:text-white"
                />
            </div>

            <div>
                <label htmlFor="pricePerMonth" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Price per Month ($) <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                    type="number"
                    id="pricePerMonth"
                    name="pricePerMonth"
                    min="0"
                    step="0.01"
                    value={formData.pricePerMonth}
                    onChange={onChange}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors text-gray-900 dark:text-white"
                />
            </div>
        </div>
    );
}