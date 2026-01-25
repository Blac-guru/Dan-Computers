import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/floating-cta";
import ScrollAnimate from "@/components/scroll-animate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Monitor,
  Laptop,
  Wrench,
  Shield,
  Users,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FloatingCTA />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 h-256 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/dan-comps.jpeg')" }}
          />
          {/* Dark overlay for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>
        </div>

        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 z-[1]"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 z-[1]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-accent/30 rounded-full border border-accent/50 backdrop-blur-sm">
              <span className="text-white font-semibold text-sm">
                Welcome to Dan Computers
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Your Trusted Computer & CCTV Solutions
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Quality computers, accessories, and professional CCTV
              installations. Expert repair services and dedicated customer
              support since day one.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+254702060171"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                Call Now
                <ArrowRight size={18} />
              </a>
              <a
                href="https://wa.me/254702060171"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center gap-2"
              >
                WhatsApp Us
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Complete solutions for all your computer and CCTV needs
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Laptop,
                title: "Computer Sales",
                description:
                  "New and refurbished laptops, desktops, monitors, and accessories",
              },
              {
                icon: Wrench,
                title: "Repair & Maintenance",
                description:
                  "Professional computer and printer repair with quick turnaround",
              },
              {
                icon: Shield,
                title: "CCTV Solutions",
                description:
                  "Sales, installation, and maintenance of security camera systems",
              },
              {
                icon: Zap,
                title: "Network Setup",
                description:
                  "Professional networking solutions and IT infrastructure setup",
              },
              {
                icon: Monitor,
                title: "Printer Services",
                description: "Printer sales, setup, repair, and consumables",
              },
              {
                icon: Users,
                title: "Expert Support",
                description:
                  "Dedicated customer support and technical assistance",
              },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <ScrollAnimate key={idx} delay={idx * 100}>
                  <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group h-full">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse our selection of quality computers and accessories
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All Products
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Gaming Laptop",
                category: "Laptops",
                price: "From 45,000 KES",
              },
              {
                name: "Desktop CPU Bundle",
                category: "Computers",
                price: "From 28,000 KES",
              },
              {
                name: "HD Security Camera Set",
                category: "CCTV Cameras",
                price: "From 8,000 KES",
              },
              {
                name: "Professional Monitor",
                category: "Monitors",
                price: "From 12,000 KES",
              },
            ].map((product, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Monitor className="text-primary/40" size={48} />
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary font-semibold uppercase mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-bold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {product.price}
                  </p>
                  <Link
                    href="/contact"
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center text-sm"
                  >
                    Inquire Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Choose Dan Computers
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: "Quality Products",
                  description:
                    "We source only genuine, high-quality computers and accessories from trusted manufacturers.",
                },
                {
                  title: "Expert Technicians",
                  description:
                    "Our team has years of experience in computer repair, CCTV installation, and IT support.",
                },
                {
                  title: "Local Expertise",
                  description:
                    "Based in Likoni, Mombasa - we understand local needs and provide personalized solutions.",
                },
                {
                  title: "Competitive Pricing",
                  description:
                    "Best prices in the market without compromising on quality or service.",
                },
                {
                  title: "Quick Turnaround",
                  description:
                    "Fast repair services and quick installation of systems and security equipment.",
                },
                {
                  title: "Customer Support",
                  description:
                    "Dedicated support available via phone, WhatsApp, and in-store for your convenience.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/20">
                      <Star className="text-primary" size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Customer Testimonials
            </h2>
            <p className="text-muted-foreground">
              What our customers say about us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Lando Titus",
                role: "Director, Artful Structures Ltd",
                text: "Dan Computers installed our CCTV system professionally and quickly. Great service!",
                rating: 5,
              },
              {
                name: "Fatima Khalid",
                role: "Office Manager",
                text: "We have been buying all our office supplies from Dan Computers for 2 years. Highly recommended!",
                rating: 5,
              },
              {
                name: "Mohamed Ibrahim",
                role: "Restaurant Owner",
                text: "They fixed our printer in 24 hours. The technicians are very knowledgeable and professional.",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="p-6 bg-card rounded-xl border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Contact us today for a consultation or to place an order
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+254702060171"
              className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Call: +254 702 060 171
            </a>
            <a
              href="https://wa.me/254702060171"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors inline-flex items-center gap-2"
            >
              WhatsApp Message
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
