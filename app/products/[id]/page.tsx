"use client";

import React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/floating-cta";
import { FadeInUp, ScaleIn } from "@/components/enhanced-animations";
import { getProductById, getProductsByCategory } from "@/lib/products";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Star,
  Check,
  Phone,
  MessageCircle,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quoteData, setQuoteData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Get product images - use images array first, then fallback to single image
  const allImages =
    product?.images && product.images.length > 0
      ? product.images
      : product?.image
        ? [product.image]
        : ["/placeholder.svg"];

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  const starRating = Math.round(product.rating);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi, I'm interested in getting a quote for the ${product.name}. My details: Name: ${quoteData.name}, Email: ${quoteData.email}, Phone: ${quoteData.phone}`;
    window.open(
      `https://wa.me/254702060171?text=${encodeURIComponent(message)}`,
    );
    setShowQuoteForm(false);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1,
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FloatingCTA />

      {/* Breadcrumb */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/products"
              className="text-primary hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Products
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">
              {product.category}
            </span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Main Product Grid - 2 columns on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
            {/* Multi-Image Carousel - Left side desktop / Top mobile */}
            <FadeInUp className="lg:col-span-2">
              <div className="bg-card rounded-lg overflow-hidden border border-border">
                {/* Main Image */}
                <div className="relative h-96 md:h-[500px] lg:h-[550px] w-full bg-muted flex items-center justify-center overflow-hidden group">
                  <Image
                    key={activeImageIndex}
                    src={allImages[activeImageIndex]}
                    alt={`${product.name} - Image ${activeImageIndex + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />

                  {/* Navigation Arrows */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {activeImageIndex + 1} / {allImages.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Image Thumbnails */}
                {allImages.length > 1 && (
                  <div className="p-4 border-t border-border flex gap-2 overflow-x-auto bg-muted/30">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                          idx === activeImageIndex
                            ? "border-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FadeInUp>

            {/* Product Info Section - Right side desktop / Below mobile */}
            <FadeInUp delay={100} className="lg:col-span-1">
              <div className="sticky top-20">
                {/* Brand Badge */}
                <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-4">
                  {product.brand}
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < starRating ? "fill-accent text-accent" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} rating
                  </span>
                </div>

                {/* Price Section */}
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                    Price
                  </p>
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-3xl font-bold text-primary">
                      {product.price}
                    </h2>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-2">
                    {product.inStock ? (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-green-600">
                          In Stock ({product.stockQuantity} available)
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-red-600">
                          Out of Stock
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">
                    Quantity
                  </p>
                  <div className="flex items-center border border-border rounded-lg w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-semibold border-l border-r border-border">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Warranty Info */}
                <div className="bg-muted/40 p-3 rounded-lg mb-6 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                    Warranty
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {product.warranty}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="font-semibold">Availability:</span>{" "}
                    {product.availability}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setShowQuoteForm(!showQuoteForm)}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Quote className="w-5 h-5" />
                    Get Quote
                  </button>
                  <a
                    href={`https://wa.me/254702060171?text=Hi, I'm interested in the ${product.name} priced at ${product.price}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                  <a
                    href="tel:+254702060171"
                    className="w-full px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us
                  </a>
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Specs and Description Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
            {/* Description & Features - Left */}
            <FadeInUp className="lg:col-span-2">
              {product.description && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Overview
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {product.longDescription && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Details
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>
              )}

              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </FadeInUp>

            {/* Specifications - Right */}
            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <FadeInUp delay={100} className="lg:col-span-1">
                  <div className="bg-muted/30 p-6 rounded-lg border border-border sticky top-20">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      Specifications
                    </h3>
                    <dl className="space-y-3">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="border-b border-border/50 pb-3 last:border-0 last:pb-0"
                          >
                            <dt className="text-sm font-semibold text-foreground mb-1">
                              {key}
                            </dt>
                            <dd className="text-sm text-muted-foreground">
                              {typeof value === "string"
                                ? value
                                : JSON.stringify(value)}
                            </dd>
                          </div>
                        ),
                      )}
                    </dl>
                  </div>
                </FadeInUp>
              )}
          </div>

          {/* Quote Form Modal */}
          {showQuoteForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <ScaleIn>
                <div className="bg-card rounded-lg p-6 md:p-8 w-full max-w-md">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Get Quote for {product.name}
                  </h3>
                  <form onSubmit={handleQuoteSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={quoteData.name}
                        onChange={(e) =>
                          setQuoteData({ ...quoteData, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={quoteData.email}
                        onChange={(e) =>
                          setQuoteData({ ...quoteData, email: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={quoteData.phone}
                        onChange={(e) =>
                          setQuoteData({ ...quoteData, phone: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                      >
                        Send via WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowQuoteForm(false)}
                        className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </ScaleIn>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-16">
              <FadeInUp>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((relProduct) => (
                    <Link
                      key={relProduct.id}
                      href={`/products/${relProduct.id}`}
                    >
                      <div className="bg-card rounded-lg border border-border hover:border-primary/50 overflow-hidden transition-all hover:shadow-lg h-full">
                        <div className="relative h-48 w-full bg-muted">
                          <Image
                            src={
                              (relProduct.images && relProduct.images[0]) ||
                              relProduct.image ||
                              "/placeholder.svg"
                            }
                            alt={relProduct.name}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-accent font-semibold mb-2">
                            {relProduct.brand}
                          </p>
                          <h3 className="font-bold text-foreground mb-2 line-clamp-2">
                            {relProduct.name}
                          </h3>
                          <p className="text-primary font-bold">
                            {relProduct.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </FadeInUp>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
