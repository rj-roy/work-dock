import { Search } from 'lucide-react';

type Props = {
    query: {
        search?: string;
        category?: string;
        page?: string;
        city?: string;
        capacity?: string;
        priceRange?: string;
    };
};

export default async function SearchBar({ query }: Props) {
    return (
        <form method="GET" className="relative w-full lg:w-80">
            <input type="hidden" name="category" value={query.category ?? ""} />
            <input type="hidden" name="city" value={query.city ?? ""} />
            <input type="hidden" name="capacity" value={query.capacity ?? ""} />
            <input type="hidden" name="priceRange" value={query.priceRange ?? ""} />

            <input
                type="text"
                name="search"
                defaultValue={query.search ?? ""}
                placeholder="Search for dishes name..."
                className="w-full px-6 py-3 pr-10 rounded-full bg-white dark:bg-neutral/20 border border-neutral/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder-neutral"
            />

            <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral hover:text-primary"
                aria-label="Search"
            >
                <Search className="w-5 h-5 text-primary/80 hover:text-primary cursor-pointer" />
            </button>
        </form>
    );
}