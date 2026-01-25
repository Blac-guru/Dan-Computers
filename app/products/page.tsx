"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/floating-cta";
import { FadeInUp, FadeInLeft } from "@/components/enhanced-animations";
import { productsData } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, MessageCircle, Filter, X } from "lucide-react";

const categories = [
  { id: "all", name: "All Products", count: 0 },
  { id: "laptops", name: "Laptops", count: 0 },
  { id: "desktops", name: "Desktops & Towers", count: 0 },
  { id: "monitors", name: "Monitors", count: 0 },
  { id: "printers", name: "Printers", count: 0 },
  { id: "cctv", name: "CCTV Cameras", count: 0 },
  { id: "accessories", name: "Accessories", count: 0 },
];

// Update counts
categories.forEach((cat) => {
  if (cat.id === "all") {
    cat.count = productsData.length;
  } else {
    cat.count = productsData.filter((p) => p.category === cat.id).length;
  }
});

// Get all unique brands
const allBrands = Array.from(new Set(productsData.map((p) => p.brand))).sort();

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false); // Declare setIsLoadingCategory

  const displayProducts = useMemo(() => {
    return productsData.filter((product) => {
      const categoryMatch =
        selectedCategory === "all" || product.category === selectedCategory;
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const searchMatch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && brandMatch && searchMatch;
    });
  }, [selectedCategory, selectedBrands, searchQuery]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setIsLoadingCategory(true);
    setTimeout(() => {
      setIsLoadingCategory(false);
    }, 1000); // Simulate loading
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FloatingCTA />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Our Products
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Explore our wide range of quality computers, CCTV systems, and
                accessories. All products available in Likoni-Ferry, Mombasa
              </p>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products by name, brand, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 md:py-4 rounded-lg border-2 border-primary bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <div
              className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-80`}
            >
              <FadeInLeft>
                <div className="bg-card rounded-lg border border-border p-6 sticky top-20 max-h-[calc(100vh-120px)] overflow-y-auto">
                  {/* Filter Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-foreground">
                      Filters
                    </h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="md:hidden text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-foreground mb-4">
                      Category
                    </h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                            selectedCategory === category.id
                              ? "bg-primary text-primary-foreground font-semibold"
                              : "bg-muted/50 text-foreground hover:bg-muted"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{category.name}</span>
                            <span className="text-sm opacity-75">
                              ({category.count})
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div className="mb-8 pb-8 border-b border-border">
                    <h4 className="font-semibold text-foreground mb-4">
                      Brands
                    </h4>
                    <div className="space-y-2">
                      {allBrands.map((brand) => {
                        const brandCount = productsData.filter(
                          (p) =>
                            p.brand === brand &&
                            (selectedCategory === "all" ||
                              p.category === selectedCategory),
                        ).length;
                        return (
                          <label
                            key={brand}
                            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand)}
                              onChange={() => toggleBrand(brand)}
                              className="w-4 h-4 rounded border-border cursor-pointer"
                            />
                            <span className="text-sm text-foreground">
                              {brand}{" "}
                              <span className="text-muted-foreground">
                                ({brandCount})
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {(searchQuery || selectedBrands.length > 0) && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedBrands([]);
                      }}
                      className="w-full px-4 py-2 bg-accent/20 text-accent rounded-lg font-semibold hover:bg-accent/30 transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </FadeInLeft>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-foreground font-semibold mb-6 hover:bg-muted transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>

              {/* Results Info */}
              <FadeInUp>
                <div className="mb-8">
                  <p className="text-muted-foreground">
                    Showing{" "}
                    <span className="font-bold text-foreground">
                      {displayProducts.length}
                    </span>{" "}
                    products
                    {selectedCategory !== "all" && (
                      <span>
                        {" "}
                        in{" "}
                        <span className="font-bold text-foreground">
                          {
                            categories.find((c) => c.id === selectedCategory)
                              ?.name
                          }
                        </span>
                      </span>
                    )}
                    {selectedBrands.length > 0 && (
                      <span>
                        {" "}
                        from{" "}
                        <span className="font-bold text-foreground">
                          {selectedBrands.join(", ")}
                        </span>
                      </span>
                    )}
                  </p>
                </div>
              </FadeInUp>

              {displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayProducts.map((product, index) => (
                    <FadeInUp key={product.id} delay={index * 30}>
                      <div
                        className="bg-card rounded-lg border border-border hover:border-primary/50 overflow-hidden transition-all hover:shadow-2xl h-full flex flex-col group cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/products/${product.id}`)
                        }
                      >
                        {/* Image Container */}
                        <div className="relative h-56 w-full bg-muted overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Stock Badge */}
                          <div className="absolute top-4 right-4">
                            {product.inStock ? (
                              <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                In Stock
                              </div>
                            ) : (
                              <div className="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                                Out of Stock
                              </div>
                            )}
                          </div>

                          {/* Brand Badge */}
                          <div className="absolute top-4 left-4">
                            <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                              {product.brand}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col">
                          {/* Category Tag */}
                          <p className="text-xs text-accent font-semibold mb-2 uppercase tracking-wider">
                            {product.category}
                          </p>

                          {/* Name */}
                          <h3 className="font-bold text-foreground mb-2 line-clamp-2 flex-grow">
                            {product.name}
                          </h3>

                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.round(product.rating)
                                    ? "fill-accent text-accent"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({product.rating})
                            </span>
                          </div>

                          {/* Short Description */}
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {product.description}
                          </p>

                          {/* Specs */}
                          <p className="text-xs text-foreground/60 mb-4 bg-muted/50 p-2 rounded line-clamp-2">
                            {product.specs}
                          </p>

                          {/* Price */}
                          <div className="mb-4">
                            <p className="text-2xl font-bold text-primary mb-1">
                              {product.price}
                            </p>
                            {product.originalPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                {product.originalPrice}
                              </p>
                            )}
                          </div>

                          {/* CTA Buttons */}
                          <div className="flex gap-2 mt-auto">
                            <button className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2 group-hover:scale-105">
                              <ShoppingCart className="w-4 h-4" />
                              <span className="hidden sm:inline">Details</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  `https://wa.me/254702060171?text=Hi, I'm interested in the ${product.name} priced at ${product.price}`,
                                  "_blank",
                                );
                              }}
                              className="flex-1 px-3 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2 group-hover:scale-105"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span className="hidden sm:inline">Chat</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </FadeInUp>
                  ))}
                </div>
              ) : (
                <FadeInUp>
                  <div className="text-center py-16">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      No Products Found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery
                        ? `No products match "${searchQuery}"`
                        : "No products available in this category"}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedBrands([]);
                        setSelectedCategory("all");
                      }}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      View All Products
                    </button>
                  </div>
                </FadeInUp>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-primary-foreground/90 mb-8 text-lg">
                Contact us directly and our team will help you find the perfect
                solution for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/254702060171"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  WhatsApp Us
                </a>
                <a
                  href="tel:+254702060171"
                  className="px-8 py-3 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
                >
                  Call Us Now
                </a>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <Footer />
    </main>
  );
}
