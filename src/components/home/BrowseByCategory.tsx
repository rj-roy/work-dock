import Image from 'next/image';
import Link from 'next/link';

interface Category {
    id: string;
    name: string;
    image: string;
    count: number;
}

const categories: Category[] = [
    {
        id: 'hot-desk',
        name: 'Hot Desk',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
        count: 150,
    },
    {
        id: 'private-office',
        name: 'Private Office',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
        count: 200,
    },
    {
        id: 'meeting-room',
        name: 'Meeting Room',
        image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4',
        count: 100,
    },
    {
        id: 'creative-studio',
        name: 'Creative Studio',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
        count: 50,
    },
];

export default function BrowseByCategorySection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/30">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
                    Browse by Category
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/spaces?category=${category.id}`}
                            className="group relative h-40 rounded-2xl overflow-hidden"
                        >
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                                <p className="text-sm text-white/80">{category.count} spaces</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}