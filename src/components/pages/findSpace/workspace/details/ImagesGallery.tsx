import ImageWithSkeleton from '@/components/ui/ImageSkeleton';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  return (
    <div className="relative w-full h-100 md:h-125 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="absolute inset-0 flex animate-scroll-gallery">
        {images.map((image, idx) => (
          <div key={idx} className="min-w-full h-full relative">
            <ImageWithSkeleton
              src={image}
              alt={`${title} - Image ${idx + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />

      {/* Image counter */}
      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-sm text-white font-medium">
        1 / {images.length}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className="w-2 h-2 rounded-full bg-white/60"
          />
        ))}
      </div>

      <style >{`
        @keyframes scroll-gallery {
          0%, 15% { transform: translateX(0); }
          20%, 35% { transform: translateX(-100%); }
          40%, 55% { transform: translateX(-200%); }
          60%, 75% { transform: translateX(-300%); }
          80%, 95% { transform: translateX(-400%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-gallery {
          animation: scroll-gallery ${images.length * 5}s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}