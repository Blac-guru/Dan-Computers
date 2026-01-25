'use client';

import { useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageRevealProps extends Omit<ImageProps, 'ref'> {
  className?: string;
  containerClassName?: string;
  delay?: number;
}

export function ImageReveal({ className, containerClassName, delay = 0, ...props }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = `fadeInUp 0.8s ease-out ${delay}s both`;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`overflow-hidden rounded-2xl ${containerClassName}`}>
      <Image {...props} className={`hover:scale-105 transition-transform duration-500 ${className}`} />
    </div>
  );
}

export function ImageGallery({ images }: { images: Array<{ src: string; alt: string }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, idx) => (
        <ImageReveal key={idx} src={image.src || "/placeholder.svg"} alt={image.alt} width={300} height={300} delay={idx * 0.1} className="w-full h-auto" containerClassName="overflow-hidden rounded-xl shadow-lg" />
      ))}
    </div>
  );
}
