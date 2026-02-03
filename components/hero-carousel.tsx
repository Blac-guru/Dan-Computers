"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const HERO_IMAGES = [
  {
    url: "/image2.jpeg",
    alt: "Modern Laptop Setup",
  },
  {
    url: "/image3.jpeg",
    alt: "Computer Desk",
  },
  {
    url: "/image4.jpeg",
    alt: "Technology Setup",
  },
  {
    url: "/image5.jpeg",
    alt: "Professional Workspace",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-96 md:h-[500px] lg:h-screen overflow-hidden">
      {/* Image slides */}
      {HERO_IMAGES.map((image, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            priority={idx === 0}
          />
        </div>
      ))}

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 z-10"></div>

      {/* Decorative blurred elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 z-5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 z-5 blur-3xl"></div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentSlide(idx);
            }}
            className={`h-2 transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? "bg-primary w-8"
                : "bg-white/40 hover:bg-white/60 w-2"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
