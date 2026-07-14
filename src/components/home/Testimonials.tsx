// components/home/TestimonialsSection.tsx
import { Star } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Sarah Jenkins',
        role: 'Freelance Designer',
        content: 'WorkDock has completely changed how I travel. I can find a high-speed workspace in any city in minutes. No more coffee shop hunting!',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
        id: '2',
        name: 'Mark Thompson',
        role: 'Software Engineer',
        content: 'The variety of spaces is incredible. I booked a private office for a week of deep work and the process was seamless.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    {
        id: '3',
        name: 'Elena Rodriguez',
        role: 'Event Lead',
        content: 'We used WorkDock to host our last team offsite in Chicago. The meeting room was exactly as pictured and the host was very professional.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                    Loved by remote teams
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                    <Image
                                        height={500}
                                        width={500}
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-3">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                &quot;{testimonial.content}&quot;
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}