import { Shield, Star, User } from "lucide-react";

interface PricingCardProps {
  pricePerDay: number;
  pricePerMonth?: number;
  name: string;
  badge: string;
  rating: number;
  message: string;
}

export default function PricingCard({ pricePerDay, pricePerMonth, name, badge, rating, message }: PricingCardProps) {
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
      </div>

      <div className="p-6 rounded-2xl shadow-lg mt-14 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-white">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {name}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-xs font-semibold text-amber-700 dark:text-amber-400">
                {badge}
              </span>
            </div>
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {rating} Rating
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              &quot;{message}&quot;
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>WorkDock Identity Verified</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Secure Payment Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}