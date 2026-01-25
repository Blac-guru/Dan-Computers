"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProductsByCategory } from "@/lib/products";

export function FeaturedProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Get featured products from different categories
  const laptops = getProductsByCategory("laptops").slice(0, 4);
  const desktops = getProductsByCategory("desktops").slice(0, 4);
  const products = [...laptops, ...desktops].slice(0, 8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(products.length - itemsPerView, prev + 1),
    );
  };

  if (products.length === 0) return null;

  return (
    <div className="relative">
      {/* Carousel container */}
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <Link href={`/products/${product.id}`}>
                <div className="h-full p-3 md:p-4 group cursor-pointer">
                  <div className="bg-card rounded-lg border border-border overflow-hidden h-full flex flex-col hover-lift">
                    {/* Product Image */}
                    <div className="relative h-40 md:h-48 bg-muted overflow-hidden flex-shrink-0">
                      <img
                        src={
                          (product.images && product.images[0]) ||
                          product.image ||
                          "/placeholder.svg"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Product Info */}
                    <div className="p-3 md:p-4 flex flex-col flex-grow">
                      <p className="text-xs text-accent font-semibold uppercase mb-1 truncate">
                        {product.brand}
                      </p>
                      <h3 className="font-bold text-foreground mb-2 line-clamp-2 text-sm md:text-base group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-auto">
                        <p className="text-primary font-bold text-sm md:text-base">
                          {product.price}
                        </p>
                        {product.inStock && (
                          <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">
                            In Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {products.length > itemsPerView && (
        <>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 shadow-lg"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= products.length - itemsPerView}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 shadow-lg"
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Progress indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map(
          (_, idx) => (
            <button
              key={idx}
              onClick={() =>
                setCurrentIndex(
                  Math.min(idx * itemsPerView, products.length - itemsPerView),
                )
              }
              className={`h-2 rounded-full transition-all duration-300 ${
                idx * itemsPerView === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted hover:bg-muted/80 w-2"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ),
        )}
      </div>
    </div>
  );
}
