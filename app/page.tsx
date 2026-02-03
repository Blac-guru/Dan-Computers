import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/floating-cta";
import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { FeaturedProductsCarousel } from "@/components/featured-products-carousel";
import { getProductsByCategory } from "@/lib/products";
import {
  FloatIn,
  SlideInFromLeft,
  SlideInFromRight,
  ZoomIn,
} from "@/components/smooth-animations";
import {
  Monitor,
  Laptop,
  Wrench,
  Shield,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Headphones,
  Truck,
  Clock4,
  Cpu,
  Camera,
} from "lucide-react";

export default function Home() {
  const categoryShowcases = [
    {
      key: "laptops",
      title: "Laptops ready now",
      blurb: "Top picks for offices, school, and creatives.",
      href: "/products?category=laptops",
    },
    {
      key: "desktops",
      title: "Desktops and towers",
      blurb: "Reliable power for teams and shops.",
      href: "/products?category=desktops",
    },
    {
      key: "accessories",
      title: "Accessories and add-ons",
      blurb: "Monitors, peripherals, and daily essentials.",
      href: "/products?category=accessories",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FloatingCTA />

      {/* Hero Section with Carousel */}
      <section className="relative overflow-hidden">
        <HeroCarousel />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <FloatIn delay={150}>
              <div className="inline-block mb-5 px-4 py-2 bg-accent/30 rounded-full border border-accent/50 backdrop-blur-sm hover-glow">
                <span className="text-white font-semibold text-sm md:text-base">
                  Computers, CCTV, Repairs - all in one stop
                </span>
              </div>
            </FloatIn>

            <SlideInFromLeft delay={260}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                Shop ready-to-use tech, book installs, or get a repair fast.
              </h1>
            </SlideInFromLeft>

            <SlideInFromRight delay={320}>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
                Curated laptops and desktops, professional CCTV setups, and
                responsive support. Built for offices, homes, and growing teams
                who want dependable gear without the wait.
              </p>
            </SlideInFromRight>

            <FloatIn delay={380}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/products"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all inline-flex items-center gap-2 hover-lift shadow-lg"
                >
                  Shop products
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="https://wa.me/254702060171"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all inline-flex items-center gap-2 hover-lift shadow-lg"
                >
                  Book install / repair
                  <ArrowRight size={18} />
                </a>
              </div>
            </FloatIn>

            <FloatIn delay={440}>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
                {[
                  {
                    icon: Truck,
                    title: "Same-day delivery*",
                    desc: "Within Mombasa CBD on select items",
                  },
                  {
                    icon: Shield,
                    title: "1-year warranties",
                    desc: "Covers most laptops and CCTV installs",
                  },
                  {
                    icon: Clock4,
                    title: "48-hour CCTV setup",
                    desc: "Site survey, install, and training",
                  },
                  {
                    icon: Headphones,
                    title: "Real people support",
                    desc: "Phone, WhatsApp, and in-store help",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white/10 text-white rounded-lg border border-white/15 backdrop-blur-sm p-4 flex gap-3 items-start hover:bg-white/15 transition-colors"
                    >
                      <div className="mt-0.5 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="font-semibold leading-tight">
                          {item.title}
                        </p>
                        <p className="text-sm text-white/80 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FloatIn>
          </div>
        </div>
      </section>

      {/* Quick Shop Shortcuts */}
      <section className="py-12 md:py-16 bg-background border-b border-border/60">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
                SHOP FASTER
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Pick a lane and checkout quickly
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Shortcuts inspired by top retail homepages so you reach the
                right gear or service without endless scrolling.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all hover-lift"
            >
              Browse all products
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                icon: Laptop,
                title: "Ready laptops",
                desc: "Business, student, and creative picks",
                href: "/products?category=laptops",
                color: "from-primary/15 to-primary/5",
              },
              {
                icon: Cpu,
                title: "Desktops & towers",
                desc: "Powerful builds and office workhorses",
                href: "/products?category=desktops",
                color: "from-blue-500/15 to-blue-500/5",
              },
              {
                icon: Camera,
                title: "CCTV kits",
                desc: "Survey, install, and configure",
                href: "/services",
                color: "from-amber-500/15 to-amber-500/5",
              },
              {
                icon: Headphones,
                title: "Accessories",
                desc: "Monitors, peripherals, and add-ons",
                href: "/products",
                color: "from-purple-500/15 to-purple-500/5",
              },
              {
                icon: Wrench,
                title: "Repairs & upgrades",
                desc: "Diagnostics, parts, and tune-ups",
                href: "/services",
                color: "from-emerald-500/15 to-emerald-500/5",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link key={idx} href={item.href} className="group h-full">
                  <div
                    className={`h-full p-5 rounded-xl border border-border bg-gradient-to-br ${item.color} hover:border-primary/60 transition-colors hover-lift`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-lg bg-white/60 text-foreground flex items-center justify-center shadow-sm">
                        <Icon size={20} />
                      </div>
                      <ArrowRight
                        size={18}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category spotlights */}
      <section className="py-16 md:py-20 bg-secondary/50 relative overflow-hidden">
        <div className="absolute top-0 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
                POPULAR BY CATEGORY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                See top picks without leaving the home page
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Two to three hero products from each key category. Tap any card
                to open its details or jump to view all.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all hover-lift"
            >
              View all products
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {categoryShowcases.map((category, idx) => {
              const products = getProductsByCategory(category.key).slice(0, 3);
              if (!products.length) return null;

              return (
                <FloatIn key={category.key} delay={idx * 80}>
                  <div className="h-full rounded-xl border border-border bg-card shadow-sm p-6 flex flex-col gap-4 hover-lift">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.blurb}
                        </p>
                      </div>
                      <Link
                        href={category.href}
                        className="text-primary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        View all
                        <ArrowRight size={14} />
                      </Link>
                    </div>

                    <div className="space-y-3">
                      {products.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="flex gap-3 p-3 rounded-lg border border-border/70 bg-muted/40 hover:border-primary/60 transition-colors"
                        >
                          <div className="w-20 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={product.images?.[0] || product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col gap-1 min-w-0">
                            <p className="text-xs uppercase text-accent font-semibold truncate">
                              {product.brand}
                            </p>
                            <p className="text-sm font-semibold text-foreground line-clamp-2">
                              {product.name}
                            </p>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-bold text-primary">
                                {product.price}
                              </span>
                              {product.inStock && (
                                <span className="text-[11px] bg-green-500/15 text-green-700 px-2 py-0.5 rounded">
                                  In stock
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </FloatIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-secondary relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute top-0 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <FloatIn>
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  FEATURED PICKS
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                  This week's top deals
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Best-sellers and fresh arrivals curated for quick checkout and
                  fast delivery.
                </p>
              </div>
            </FloatIn>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
              {[
                { icon: Truck, text: "Same-day delivery* in CBD" },
                { icon: Shield, text: "Warranty-backed stock" },
                { icon: Headphones, text: "Setup help available" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-center gap-3 bg-card border border-border rounded-lg px-4 py-3"
                  >
                    <Icon size={18} className="text-primary" />
                    <p className="text-sm text-foreground font-semibold leading-snug">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <ZoomIn delay={200}>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all hover-lift text-lg mt-6"
              >
                View all products
                <ArrowRight size={20} />
              </Link>
            </ZoomIn>
          </div>

          <FloatIn delay={100}>
            <FeaturedProductsCarousel />
          </FloatIn>
        </div>
      </section>

      {/* Services Section with Enhanced Layout */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FloatIn>
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
                  POPULAR SERVICES
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Keep your tech buying and running in one place
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                  Fast service cards inspired by modern retail sites: clear,
                  brief, and ready to tap.
                </p>
              </div>
            </FloatIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "CCTV install & training",
                description:
                  "Site survey, cabling, mobile viewing setup, and user onboarding.",
                color: "from-red-500 to-orange-500",
              },
              {
                icon: Wrench,
                title: "Laptop repairs & upgrades",
                description:
                  "SSD and RAM upgrades, deep cleaning, and fast diagnostics.",
                color: "from-primary to-blue-500",
              },
              {
                icon: Monitor,
                title: "Office setups",
                description:
                  "Desktops, monitors, printers, and networking configured on arrival.",
                color: "from-emerald-500 to-green-600",
              },
              {
                icon: Users,
                title: "On-call support",
                description:
                  "Phone and WhatsApp support with real technicians, not bots.",
                color: "from-purple-500 to-indigo-500",
              },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <FloatIn key={idx} delay={idx * 80}>
                  <div className="relative group h-full">
                    <div className="relative p-7 bg-card rounded-xl border border-border hover-lift h-full overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl`}
                      ></div>

                      <div className="relative z-10 flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg flex items-center justify-center">
                          <Icon
                            className="text-primary group-hover:text-accent transition-colors"
                            size={22}
                          />
                        </div>
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                      </div>

                      <p className="relative z-10 text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>

                      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </div>
                  </div>
                </FloatIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Content */}
            <SlideInFromLeft>
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  STORE SNAPSHOT
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Built like a shop, powered like a service desk
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      icon: CheckCircle2,
                      title: "Genuine stock only",
                      desc: "Curated brands with verifiable warranties and receipts.",
                    },
                    {
                      icon: Gauge,
                      title: "Fast turnaround",
                      desc: "Laptop upgrades same day, CCTV within 48 hours.",
                    },
                    {
                      icon: Headphones,
                      title: "Human support",
                      desc: "Talk to technicians via phone, WhatsApp, or in-store - no bots.",
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <FloatIn key={idx} delay={idx * 100}>
                        <div className="flex gap-4 group">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon
                              className="text-primary group-hover:text-accent transition-colors"
                              size={24}
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </FloatIn>
                    );
                  })}
                </div>
              </div>
            </SlideInFromLeft>

            {/* Right Image */}
            <SlideInFromRight delay={200}>
              <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden border border-border shadow-2xl group hover-lift">
                <img
                  src="/image1.jpeg"
                  alt="Our Team"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </SlideInFromRight>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-secondary relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <FloatIn>
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  TESTIMONIALS
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  What Our Customers Say
                </h2>
                <p className="text-muted-foreground text-lg">
                  Join hundreds of satisfied customers across Mombasa
                </p>
              </div>
            </FloatIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Lando Titus",
                role: "Director, Artful Structures Ltd",
                text: "CCTV install was fast, tidy, and the team trained our staff on the app before leaving.",
                rating: 5,
                color: "from-blue-500",
              },
              {
                name: "Fatima Khalid",
                role: "Office Manager",
                text: "We restock laptops and printers here because support is instant on WhatsApp when we need it.",
                rating: 5,
                color: "from-purple-500",
              },
            ].map((testimonial, idx) => (
              <FloatIn key={idx} delay={idx * 120}>
                <div className="relative h-full group">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500`}
                  ></div>

                  <div className="relative p-8 bg-card rounded-xl border border-border hover-lift h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className="fill-accent text-accent"
                          />
                        ),
                      )}
                    </div>

                    <p className="text-foreground mb-6 italic flex-grow">
                      "{testimonial.text}"
                    </p>

                    <div className="border-t border-border pt-4">
                      <p className="font-bold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </FloatIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <FloatIn>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-lg">
                Contact us today for a consultation or to place an order. Our
                experts are ready to help you find the perfect solution.
              </p>
            </div>
          </FloatIn>

          <FloatIn delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+254702060171"
                className="px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center gap-2 hover-lift shadow-xl text-lg"
              >
                📞 Call: +254 702 060 171
              </a>
              <a
                href="https://wa.me/254702060171"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-400 text-white rounded-lg font-semibold hover:bg-green-500 transition-all inline-flex items-center gap-2 hover-lift shadow-xl text-lg"
              >
                💬 WhatsApp Message
              </a>
            </div>
          </FloatIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
