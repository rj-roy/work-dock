interface LocationSectionProps {
  formData: {
    city: string;
    address: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Location({ formData, onChange }: LocationSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="city" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={onChange}
          placeholder="e.g. San Francisco"
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors text-gray-900 dark:text-white placeholder-gray-400"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Address <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="123 Workspace Ave"
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors text-gray-900 dark:text-white placeholder-gray-400"
        />
      </div>
    </div>
  );
}