interface PricingCardProps {
  pricePerDay: number;
  pricePerMonth?: number;
}

export default function PricingCard({ pricePerDay, pricePerMonth }: PricingCardProps) {
  return (
    <div className="sticky top-24 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="space-y-4">
        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${pricePerDay}
            </span>
            <span className="text-gray-500 dark:text-gray-400">/ day</span>
          </div>
          {pricePerMonth && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-gray-500">or</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                ${pricePerMonth.toLocaleString()} / month
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-xl">
            Book Now
          </button>
          <button className="w-full py-3 px-4 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200">
            Contact Host
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>WorkDock Identity Verified</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Secure Payment Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}