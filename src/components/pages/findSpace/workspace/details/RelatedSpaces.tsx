import { FileVideo, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedWorkspace {
  _id: string;
  title: string;
  image: string;
  rating: number;
  location: string;
  category: string;
  pricePerDay: number;
}

interface RelatedSpacesProps {
  spaces: RelatedWorkspace[];
}

export default function RelatedSpaces({ spaces }: RelatedSpacesProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Related Spaces
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <Link
            key={space._id}
            href={`/find-spaces/${space._id}`}
            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={space.image}
                alt={space.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-3 right-3">
                <button className="p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <FileVideo className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {space.rating}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {space.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {space.location} • {space.category}
              </p>
              <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                ${space.pricePerDay} <span className="text-sm font-normal text-gray-500">/ day</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}