"use client";

import React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteData, setQuoteData] = useState({
    name: "",
    email: "",
    phone: "",
  });

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* Product Image */}
            <FadeInUp>
              <div className="bg-card rounded-lg overflow-hidden border border-border">
                <div className="relative h-96 md:h-[500px] w-full">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </FadeInUp>

            {/* Product Info */}
            <FadeInUp delay={100}>
              <div>
                {/* Brand Badge */}
                <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-4">
                  {product.brand}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < starRating ? "fill-accent text-accent" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.rating} rating)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-2">
                    Starting Price
                  </p>
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-3xl font-bold text-primary">
                      {product.price}
                    </h2>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stock Status */}
                <div className="mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-2">
                    {product.inStock ? (
                      <>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-green-600">
                          In Stock ({product.stockQuantity} available)
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-red-600">
                          Out of Stock
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8 pb-8 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-3">Quantity</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-foreground hover:bg-muted transition-colors"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-foreground hover:bg-muted transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mb-8">
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

                {/* Warranty Info */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Warranty:
                    </span>{" "}
                    {product.warranty}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <span className="font-semibold text-foreground">
                      Availability:
                    </span>{" "}
                    {product.availability}
                  </p>
                </div>
              </div>
            </FadeInUp>
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

          {/* Long Description */}
          <div className="mb-16 pb-16 border-b border-border">
            <FadeInUp>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                About This Product
              </h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                {product.longDescription}
              </p>
            </FadeInUp>
          </div>

          {/* Features */}
          <div className="mb-16 pb-16 border-b border-border">
            <FadeInUp>
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </FadeInUp>
          </div>

          {/* Detailed Specifications */}
          <div className="mb-16 pb-16 border-b border-border">
            <FadeInUp>
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Detailed Specifications
              </h2>
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="divide-y divide-border">
                  {Object.entries(product.specifications).map(
                    ([key, value], idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6"
                      >
                        <span className="font-semibold text-foreground">
                          {key}
                        </span>
                        <span className="md:col-span-2 text-foreground/80">
                          {value}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </FadeInUp>
          </div>

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
                            src={relProduct.image || "/placeholder.svg"}
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
