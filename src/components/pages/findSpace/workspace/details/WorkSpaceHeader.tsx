import { BriefcaseBusiness, LocationEditIcon, Star } from "lucide-react";

interface WorkspaceHeaderProps {
  title: string;
  category: string;
  avgRating: number;
  reviewCount: number;
  city: string;
  address: string;
}

export default function WorkspaceHeader({ 
  title, 
  category, 
  avgRating, 
  reviewCount, 
  city, 
  address 
}: WorkspaceHeaderProps) {
  return (
    <div className="space-y-3">
      {/* Category Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800">
        <BriefcaseBusiness className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          {category}
        </span>
        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-indigo-200 dark:border-indigo-700">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {avgRating}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <LocationEditIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <span className="text-lg">{address}</span>
      </div>
    </div>
  );
}