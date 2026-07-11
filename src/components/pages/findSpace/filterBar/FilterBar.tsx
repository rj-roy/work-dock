import { ChevronDown, SlidersHorizontal } from "lucide-react";
import FilterPill from "./FilterPill";
import DropdownOption from "./DropDownOption";
import SearchBar from "../SearchBar";

type SortOption = | "recommended" | "price-asc" | "price-desc" | "rating" | "rating-desc" | "newest" | "oldest";

type QueryValue = string | string[] | undefined;
type QueryRecord = Record<string, QueryValue>;

interface FilterBarProps {
  query?: QueryRecord;
  cities?: string[];
  categories?: { value: string; label: string }[];
};

const DEFAULT_CITIES = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Dinajpur",];

const DEFAULT_CATEGORIES = [
  { value: "hot-desk", label: "Hot Desk" },
  { value: "private-office", label: "Private Office" },
  { value: "meeting-room", label: "Meeting Room" },
  { value: "studio", label: "Studio" },
];

const PRICE_RANGES: { label: string; value: string }[] = [
  { label: "Under ৳300/day", value: "0-300" },
  { label: "৳300 - ৳700/day", value: "300-700" },
  { label: "৳700 - ৳1500/day", value: "700-1500" },
  { label: "Above ৳1500/day", value: "1500-0" },
];

const CAPACITY_OPTIONS = [1, 2, 5, 10, 20];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "rating-desc", label: "Lowest Rated" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

function getValue(value: QueryValue) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
};

function buildHref(query: QueryRecord, key: string, value: string | null) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([queryKey, queryValue]) => {
    const normalized = getValue(queryValue);
    if (normalized) params.set(queryKey, normalized);
  });

  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  params.delete("page");
  return params.toString() ? `?${params.toString()}` : "";
}

export default function FilterBar({
  query = {},
  cities = DEFAULT_CITIES,
  categories = DEFAULT_CATEGORIES,
}: FilterBarProps) {
  const city = getValue(query.city);
  const category = getValue(query.category);
  const capacity = getValue(query.capacity);
  const pricePerDay = getValue(query.pricePerDay);
  const sortBy = (getValue(query.sort) as SortOption) || "recommended";

  const activeCount = [city, category, capacity, pricePerDay].filter(Boolean).length;

  return (
    <div className="flex flex-wrap items-center gap-3 py-3 max-w-6xl mx-auto">
      <FilterPill
        label="City"
        isActive={!!city}
        activeLabel={city || undefined}
      >
        <div className="flex flex-col items-center justify-center">
          {cities.map((c) => (
            <DropdownOption
              key={c}
              label={c}
              selected={city === c}
              href={buildHref(query, "city", city === c ? null : c)}
            />
          ))}
        </div>
      </FilterPill>

      <FilterPill
        label="Price Range"
        isActive={!!pricePerDay}
        activeLabel={PRICE_RANGES.find((r) => r.value === pricePerDay)?.label}
      >
        <div className="flex flex-col">
          {PRICE_RANGES.map((range) => (
            <DropdownOption
              key={range.value}
              label={range.label}
              selected={pricePerDay === range.value}
              href={buildHref(
                query,
                "pricePerDay",
                pricePerDay === range.value ? null : range.value
              )}
            />
          ))}
        </div>
      </FilterPill>

      <FilterPill
        label="Category"
        isActive={!!category}
        activeLabel={categories.find((c) => c.value === category)?.label}
      >
        <div className="flex flex-col">
          {categories.map((cat) => (
            <DropdownOption
              key={cat.value}
              label={cat.label}
              selected={category === cat.value}
              href={buildHref(
                query,
                "category",
                category === cat.value ? null : cat.value
              )}
            />
          ))}
        </div>
      </FilterPill>

      <FilterPill
        label="Capacity"
        isActive={!!capacity}
        activeLabel={capacity ? `${capacity}+ people` : undefined}
      >
        <div className="flex flex-col">
          {CAPACITY_OPTIONS.map((cap) => (
            <DropdownOption
              key={cap}
              label={`${cap}+ people`}
              selected={capacity === String(cap)}
              href={buildHref(
                query,
                "capacity",
                capacity === String(cap) ? null : String(cap)
              )}
            />
          ))}
        </div>
      </FilterPill>

      <a
        href=""
        className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
      >
        <SlidersHorizontal className="h-4 w-4" />
        More Filters
        {activeCount > 0 && (
          <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
            {activeCount}
          </span>
        )}
      </a>

      <SearchBar query={query} />
      <div className="ml-auto relative">
        <details className="relative">
          <summary className="list-none flex cursor-pointer items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Sort by:
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
              <ChevronDown className="h-3.5 w-3.5" />
            </span>
          </summary>

          <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg">
            {SORT_OPTIONS.map((option) => (
              <DropdownOption
                key={option.value}
                label={option.label}
                selected={sortBy === option.value}
                href={buildHref(
                  query,
                  "sort",
                  option.value === "recommended" ? null : option.value
                )}
              />
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
