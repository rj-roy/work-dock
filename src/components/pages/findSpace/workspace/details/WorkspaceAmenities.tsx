import { BriefcaseBusiness, Coffee, ParkingCircle, Printer, Thermometer, Wifi } from "lucide-react";

interface WorkspaceAmenitiesProps {
  amenities: string[];
}

const amenityConfig: Record<string, { icon: React.ReactNode; label: string }> = {
  wifi: { icon: <Wifi className="w-5 h-5" />, label: 'High-speed WiFi' },
  coffee: { icon: <Coffee className="w-5 h-5" />, label: 'Gourmet Coffee' },
  parking: { icon: <ParkingCircle className="w-5 h-5" />, label: 'Secure Parking' },
  ac: { icon: <Thermometer className="w-5 h-5" />, label: 'Climate Control' },
  printer: { icon: <Printer className="w-5 h-5" />, label: 'Printing Station' },
  'meeting-rooms': { icon: <BriefcaseBusiness className="w-5 h-5" />, label: 'Meeting Rooms' },
};

export default function WorkspaceAmenities({ amenities }: WorkspaceAmenitiesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Amenities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {amenities.map((amenity) => {
          const config = amenityConfig[amenity] || { 
            icon: <Wifi className="w-5 h-5" />, 
            label: amenity.replace('-', ' ') 
          };
          return (
            <div
              key={amenity}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
            >
              <div className="text-indigo-600 dark:text-indigo-400">
                {config.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}