import { ChevronDown } from "lucide-react";

export default function FilterPill({
  label,
  isActive,
  activeLabel,
  children,
}: {
  label: string;
  isActive: boolean;
  activeLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="relative">
      <summary
        className={`list-none flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
        }`}
      >
        {isActive && activeLabel ? activeLabel : label}
        <ChevronDown className="h-3.5 w-3.5" />
      </summary>

      <div className="absolute left-0 z-20 mt-2 w-52 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg">
        {children}
      </div>
    </details>
  );
}