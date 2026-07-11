import Image from 'next/image';
import { MapPin, Users, Star, Wifi, Coffee, Car, Wind, Printer, Monitor, Building2, Briefcase } from 'lucide-react';
import { Workspace } from '@/types/workspaceType';
import Link from 'next/link';

const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="w-4 h-4" />,
    coffee: <Coffee className="w-4 h-4" />,
    parking: <Car className="w-4 h-4" />,
    ac: <Wind className="w-4 h-4" />,
    printer: <Printer className="w-4 h-4" />,
    'meeting-rooms': <Monitor className="w-4 h-4" />,
};

const categoryIcons: Record<string, React.ReactNode> = {
    'private-office': <Building2 className="w-4 h-4" />,
    'hot-desk': <Briefcase className="w-4 h-4" />,
    'meeting-room': <Monitor className="w-4 h-4" />,
};

const categoryLabels: Record<string, string> = {
    'private-office': 'Private Office',
    'hot-desk': 'Hot Desk',
    'meeting-room': 'Meeting Room',
};

interface WorkspaceCardProps {
    workspace: Workspace;
};

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
    const formatPrice = (price: number) => {
        return `৳${price.toLocaleString()}`;
    };

    return (
        <div className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Image Container with Auto-scroll */}
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 flex animate-scroll-images">
                    {workspace.images.map((image, idx) => (
                        <div key={idx} className="min-w-full h-full relative">
                            <Image
                                src={image || '/placeholder.jpg'}
                                alt={`${workspace.title} - Image ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                priority={idx === 0}
                                loading='eager'
                            />
                        </div>
                    ))}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-xs font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm">
                        {categoryIcons[workspace.category]}
                        {categoryLabels[workspace.category]}
                    </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-gray-900 dark:text-white">
                            {workspace.avgRating}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({workspace.reviewCount})
                        </span>
                    </div>
                </div>

                {/* Image Counter */}
                {workspace.images.length > 1 && (
                    <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-white font-medium">
                            {workspace.images.length} photos
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title & Location */}
                <div className="mb-3">
                    <Link href={`/find-space/${workspace._id}`}
                     className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {workspace.title}
                    </Link>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{workspace.address}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {workspace.shortDescription}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {workspace.amenities.slice(0, 4).map((amenity) => (
                        <div
                            key={amenity}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs"
                            title={amenity.replace('-', ' ')}
                        >
                            {amenityIcons[amenity] || <Wifi className="w-3.5 h-3.5" />}
                        </div>
                    ))}
                    {workspace.amenities.length > 4 && (
                        <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                            +{workspace.amenities.length - 4}
                        </span>
                    )}
                </div>

                {/* Capacity & Price Row */}
                <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{workspace.capacity} {workspace.capacity === 1 ? 'person' : 'people'}</span>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                            {formatPrice(workspace.pricePerDay)}
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/day</span>
                        </div>
                        {workspace.pricePerMonth && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {formatPrice(workspace.pricePerMonth)}/month
                            </div>
                        )}
                    </div>
                </div>

                {/* Book Now Button */}
                <button
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/30 dark:hover:shadow-indigo-600/40 active:scale-[0.98]"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}