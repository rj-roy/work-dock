import { BriefcaseBusiness, Calendar, Group, PartyPopper } from "lucide-react";

interface WorkspaceStatsProps {
  capacity: number;
  category: string;
  pricePerDay: number;
  pricePerMonth?: number;
}

export default function WorkspaceStats({ 
  capacity, 
  category, 
  pricePerDay, 
  pricePerMonth 
}: WorkspaceStatsProps) {
  const stats = [
    {
      icon: <Group className="w-5 h-5" />,
      label: 'Capacity',
      value: `1-${capacity} people`,
    },
    {
      icon: <BriefcaseBusiness className="w-5 h-5" />,
      label: 'Category',
      value: category,
    },
    {
      icon: <PartyPopper className="w-5 h-5" />,
      label: 'Daily Rate',
      value: `$${pricePerDay}/day`,
    },
  ];

  if (pricePerMonth) {
    stats.push({
      icon: <Calendar className="w-5 h-5" />,
      label: 'Monthly',
      value: `$${pricePerMonth.toLocaleString()}/mo`,
    });
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
            {stat.icon}
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {stat.label}
            </span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}