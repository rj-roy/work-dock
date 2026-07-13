// components/listing/AmenitiesSection.tsx
import { Wifi, Coffee, Car, Wind, Printer, Upload, Check } from 'lucide-react';

interface AmenitiesSectionProps {
    amenities: string[];
    onToggle: (amenityId: string) => void;
}

const AMENITIES_OPTIONS = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'coffee', label: 'Coffee', icon: Coffee },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'ac', label: 'AC', icon: Wind },
    { id: 'printer', label: 'Printer', icon: Printer },
    { id: 'meeting-rooms', label: 'Meeting Rooms', icon: Upload },
];

export default function Amenities({ amenities, onToggle }: AmenitiesSectionProps) {
    return (
        <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Select all amenities available in your space
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AMENITIES_OPTIONS.map((amenity) => {
                    const Icon = amenity.icon;
                    const isSelected = amenities.includes(amenity.id);

                    return (
                        <button
                            key={amenity.id}
                            type="button"
                            onClick={() => onToggle(amenity.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 ${isSelected
                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`} />
                            <span className="text-sm font-medium">{amenity.label}</span>
                            {isSelected && <Check className="w-4 h-4 ml-auto text-indigo-600 dark:text-indigo-400" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}