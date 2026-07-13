interface BasicInfoSectionProps {
    formData: {
        title: string;
        shortDescription: string;
        fullDescription: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function BasicInfo({ formData, onChange }: BasicInfoSectionProps) {
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    placeholder="e.g. Minimalist Downtown Studio"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors text-gray-900 dark:text-white placeholder-gray-400"
                />
            </div>

            <div>
                <label htmlFor="shortDescription" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Short Description
                </label>
                <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={onChange}
                    placeholder="A brief hook for your space..."
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors text-gray-900 dark:text-white placeholder-gray-400"
                />
                <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                    One-line summary shown on search results cards.
                </p>
            </div>

            <div>
                <label htmlFor="fullDescription" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Full Description
                </label>
                <textarea
                    id="fullDescription"
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={onChange}
                    placeholder="Describe the atmosphere, amenities, and vibe of your workspace..."
                    rows={5}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                />
            </div>
        </div>
    );
}