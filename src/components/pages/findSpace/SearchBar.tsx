import { Search } from 'lucide-react';

type Props = {
    query: {
        search?: string;
        category?: string;
        page?: string;
        city?: string;
        capacity?: string;
        pricePerDay?: string;
        sort?: string;
    };
};

export default async function SearchBar({ query }: Props) {
    return (
        <form method="GET" className="relative w-full max-w-60">
            <input type="hidden" name="category" value={query.category ?? ""} />
            <input type="hidden" name="city" value={query.city ?? ""} />
            <input type="hidden" name="capacity" value={query.capacity ?? ""} />
            <input type="hidden" name="pricePerDay" value={query.pricePerDay ?? ""} />
            <input type="hidden" name="sort" value={query.sort ?? ""} />

            <input
                type="text"
                name="search"
                defaultValue={query.search ?? ""}
                placeholder="Search for spaces..."
                className="max-w-full px-6 py-3 pr-10 rounded-full bg-white dark:bg-neutral/20 border border-neutral/20 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all placeholder-neutral text-xs"
            />

            <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral hover:text-secondary"
                aria-label="Search"
            >
                <Search className="w-5 h-5 text-secondary/80 hover:text-secondary cursor-pointer" />
            </button>
        </form>
    );
}