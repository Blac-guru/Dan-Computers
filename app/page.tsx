import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/floating-cta";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { FeaturedProductsCarousel } from "@/components/featured-products-carousel";
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
  Zap,
  Star,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Headphones,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FloatingCTA />

      {/* Hero Section with Carousel */}
      <section className="relative overflow-hidden">
        <HeroCarousel />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-3xl mx-auto text-center">
            <FloatIn delay={200}>
              <div className="inline-block mb-6 px-4 py-2 bg-accent/30 rounded-full border border-accent/50 backdrop-blur-sm hover-glow">
                <span className="text-white font-semibold text-sm md:text-base">
                  Welcome to Dan Computers
                </span>
              </div>
            </FloatIn>

            <SlideInFromLeft delay={300}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Your Trusted Computer & CCTV Solutions
              </h1>
            </SlideInFromLeft>

            <SlideInFromRight delay={400}>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
                Quality computers, accessories, and professional CCTV
                installations. Expert repair services and dedicated customer
                support since day one.
              </p>
            </SlideInFromRight>

            <FloatIn delay={500}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+254702060171"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all inline-flex items-center gap-2 hover-lift shadow-lg"
                >
                  Call Now
                  <ArrowRight size={18} />
                </a>
                <a
                  href="https://wa.me/254702060171"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all inline-flex items-center gap-2 hover-lift shadow-lg"
                >
                  WhatsApp Us
                  <ArrowRight size={18} />
                </a>
              </div>
            </FloatIn>
          </div>
        </div>
      </section>

      {/* Services Section with Enhanced Layout */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <FloatIn>
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  OUR SERVICES
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Complete Solutions for Your Needs
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  From hardware sales to professional installations, we've got
                  you covered
                </p>
              </div>
            </FloatIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Laptop,
                title: "Computer Sales",
                description:
                  "New and refurbished laptops, desktops, monitors, and accessories",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Wrench,
                title: "Repair & Maintenance",
                description:
                  "Professional computer and printer repair with quick turnaround",
                color: "from-orange-500 to-orange-600",
              },
              {
                icon: Shield,
                title: "CCTV Solutions",
                description:
                  "Sales, installation, and maintenance of security camera systems",
                color: "from-red-500 to-red-600",
              },
              {
                icon: Zap,
                title: "Network Setup",
                description:
                  "Professional networking solutions and IT infrastructure setup",
                color: "from-yellow-500 to-yellow-600",
              },
              {
                icon: Monitor,
                title: "Printer Services",
                description: "Printer sales, setup, repair, and consumables",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Users,
                title: "Expert Support",
                description:
                  "Dedicated customer support and technical assistance",
                color: "from-purple-500 to-purple-600",
              },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <FloatIn key={idx} delay={idx * 100}>
                  <div className="relative group h-full">
                    {/* Card */}
                    <div className="relative p-8 bg-card rounded-xl border border-border hover-lift h-full overflow-hidden">
                      {/* Gradient background on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl`}
                      ></div>

                      {/* Icon */}
                      <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon
                          className="text-primary group-hover:text-accent transition-colors"
                          size={24}
                        />
                      </div>

                      {/* Content */}
                      <h3 className="relative z-10 font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="relative z-10 text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>

                      {/* Accent line */}
                      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </div>
                  </div>
                </FloatIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 md:py-32 bg-secondary relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute top-0 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <FloatIn>
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  FEATURED PRODUCTS
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Browse Our Latest Selection
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
                  Handpicked quality computers and accessories for every need
                </p>
              </div>
            </FloatIn>

            <ZoomIn delay={200}>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all hover-lift text-lg"
              >
                View All Products
                <ArrowRight size={20} />
              </Link>
            </ZoomIn>
          </div>

          <FloatIn delay={100}>
            <FeaturedProductsCarousel />
          </FloatIn>
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
                  WHY CHOOSE US
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
                  Your Trusted Partner in Tech
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      icon: CheckCircle2,
                      title: "Quality Products",
                      desc: "We source only genuine, high-quality computers from trusted manufacturers.",
                    },
                    {
                      icon: Gauge,
                      title: "Expert Technicians",
                      desc: "Years of experience in repair, CCTV installation, and IT support.",
                    },
                    {
                      icon: Headphones,
                      title: "Dedicated Support",
                      desc: "Available via phone, WhatsApp, and in-store for your convenience.",
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
                  src="https://rtdisplay.com/wp-content/uploads/2024/12/2-31.jpg"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Lando Titus",
                role: "Director, Artful Structures Ltd",
                text: "Dan Computers installed our CCTV system professionally and quickly. Great service!",
                rating: 5,
                color: "from-blue-500",
              },
              {
                name: "Fatima Khalid",
                role: "Office Manager",
                text: "We have been buying all our office supplies from Dan Computers for 2 years. Highly recommended!",
                rating: 5,
                color: "from-purple-500",
              },
              {
                name: "Mohamed Ibrahim",
                role: "Restaurant Owner",
                text: "They fixed our printer in 24 hours. The technicians are very knowledgeable and professional.",
                rating: 5,
                color: "from-orange-500",
              },
            ].map((testimonial, idx) => (
              <FloatIn key={idx} delay={idx * 100}>
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
