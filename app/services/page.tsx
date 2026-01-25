"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/floating-cta";
import Image from "next/image";
import Link from "next/link";
import {
  FadeInUp,
  ScaleIn,
  StaggerContainer,
} from "@/components/enhanced-animations";
import {
  Wrench,
  Laptop,
  Printer,
  Shield,
  Zap,
  CheckCircle,
  Clock,
  Award,
  MessageCircle,
} from "lucide-react";

const services = [
  {
    icon: Laptop,
    title: "Computer Sales",
    description:
      "We offer a wide selection of new and refurbished computers including desktops, laptops, and workstations.",
    details: [
      "New and refurbished units",
      "Flexible payment options",
      "Warranty on all products",
      "Expert advice on specifications",
      "Custom configuration available",
    ],
    image: "/images/desktops.jpg",
  },
  {
    icon: Wrench,
    title: "Computer Repair & Maintenance",
    description:
      "Professional repair services for all computer brands with quick turnaround times.",
    details: [
      "Hardware repairs",
      "Software troubleshooting",
      "Virus and malware removal",
      "Data recovery",
      "On-site service available",
    ],
    image:
      "https://it.cornell.edu/sites/default/files/styles/article_banner/public/itc-drupal10-images/Hardware%20landing%20page.png?h=76c528b5&itok=TE4W1J3m",
  },
  {
    icon: Laptop,
    title: "Laptop Repair",
    description:
      "Specialized laptop repair services including screen replacement, battery replacement, and hardware fixes.",
    details: [
      "Screen replacement",
      "Battery and charger repair",
      "Keyboard replacement",
      "Hard drive issues",
      "Performance optimization",
    ],
    image: "/images/laptops.jpg",
  },
  {
    icon: Printer,
    title: "Printer Setup & Repair",
    description:
      "Complete printer services from installation to maintenance and supplies.",
    details: [
      "Printer sales and setup",
      "Network printer configuration",
      "Maintenance and repair",
      "Toner and ink supplies",
      "Troubleshooting support",
    ],
    image: "/images/printers.jpg",
  },
  {
    icon: Shield,
    title: "CCTV Sales & Installation",
    description:
      "Professional CCTV camera systems for homes and businesses with expert installation.",
    details: [
      "System design and planning",
      "Professional installation",
      "DVR/NVR setup",
      "Remote viewing configuration",
      "Warranty support",
    ],
    image: "/images/cctv.jpg",
  },
  {
    icon: Zap,
    title: "Network Setup & IT Solutions",
    description:
      "Complete networking solutions and IT infrastructure for businesses.",
    details: [
      "LAN setup and configuration",
      "WiFi installation",
      "Network security",
      "Computer networking",
      "IT consulting",
    ],
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/4/298287605/OF/ZS/KE/3923492/ns8-500x500.jpg",
  },
];

const stats = [
  { icon: Clock, label: "2+ Years", description: "In Business" },
  { icon: Award, label: "500+", description: "Satisfied Customers" },
  { icon: CheckCircle, label: "100%", description: "Quality Guarantee" },
  { icon: Zap, label: "24/7", description: "Customer Support" },
];

const process = [
  {
    step: "1",
    title: "Contact Us",
    description:
      "Reach out via phone, WhatsApp, or visit our store to discuss your needs and get a quote.",
  },
  {
    step: "2",
    title: "Assessment",
    description:
      "Our technicians assess your requirements and provide detailed recommendations.",
  },
  {
    step: "3",
    title: "Installation/Service",
    description:
      "Professional installation or repair service performed by our experienced team.",
  },
  {
    step: "4",
    title: "Support & Follow-up",
    description:
      "We provide ongoing support, maintenance, and assistance after service completion.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FloatingCTA />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-primary via-primary/5 to-background">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeInUp>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                Our Services
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Comprehensive computer, CCTV, and IT solutions for individuals
                and businesses
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
                >
                  Book Service
                </Link>
                <a
                  href="https://wa.me/254702060171"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-all"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <ScaleIn key={idx} delay={idx * 0.1}>
                  <div className="text-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg">
                    <Icon className="mx-auto mb-3 text-accent" size={32} />
                    <p className="text-2xl font-bold text-primary mb-1">
                      {stat.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </ScaleIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Service Offerings
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From sales to installation to ongoing support, we provide
                complete solutions for all your tech needs
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer staggerDelay={0.12}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, idx) => {
                const Icon = service.icon;
                const isEven = idx % 2 === 0;

                return (
                  <FadeInUp key={idx} delay={idx * 0.1} data-stagger>
                    <div
                      className={`group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-2xl grid ${isEven ? "md:grid-cols-1" : "md:grid-cols-1"} gap-0 items-stretch`}
                    >
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Icon
                              className="text-primary-foreground"
                              size={28}
                            />
                          </div>
                          <h3 className="text-2xl font-bold text-white">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col">
                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-1">
                          {service.description}
                        </p>

                        {/* Details */}
                        <div className="space-y-3 mb-6">
                          {service.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle
                                size={18}
                                className="text-accent flex-shrink-0 mt-0.5"
                              />
                              <span className="text-sm text-foreground">
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <Link
                          href="/contact"
                          className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-lg text-center text-sm group-hover:translate-y-0 translate-y-1"
                        >
                          Get Service Now
                        </Link>
                      </div>
                    </div>
                  </FadeInUp>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              How We Work
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              Simple, straightforward process to get you the services you need
              quickly
            </p>
          </FadeInUp>

          <div className="max-w-4xl mx-auto">
            <StaggerContainer staggerDelay={0.15}>
              <div className="space-y-8" data-stagger>
                {process.map((item, idx) => (
                  <FadeInUp key={idx} delay={idx * 0.1}>
                    <div className="flex gap-6 items-start group">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-xl group-hover:scale-110 transition-transform">
                          {item.step}
                        </div>
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Why Choose Our Services
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              Years of experience delivering quality service with exceptional
              customer satisfaction
            </p>
          </FadeInUp>

          <StaggerContainer staggerDelay={0.12}>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              data-stagger
            >
              {[
                {
                  title: "Expert Technicians",
                  description:
                    "Years of experience in computer repair and installation.",
                },
                {
                  title: "Quick Turnaround",
                  description: "Fast service without compromising quality.",
                },
                {
                  title: "Affordable Pricing",
                  description: "Competitive rates for all service types.",
                },
                {
                  title: "Warranty Coverage",
                  description: "Warranty on repairs and equipment.",
                },
                {
                  title: "Local Expertise",
                  description: "Deep knowledge of local needs and conditions.",
                },
                {
                  title: "24/7 Support",
                  description:
                    "Available via phone and WhatsApp for emergencies.",
                },
              ].map((item, idx) => (
                <ScaleIn key={idx} delay={idx * 0.1}>
                  <div className="flex gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg group">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors">
                        <CheckCircle size={24} className="text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/80 to-primary">
        <FadeInUp>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Need Our Services?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-lg">
              Contact us today to schedule a service or get a quote
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+254702060171"
                className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-all hover:shadow-lg hover:scale-105"
              >
                Call: +254 702 060 171
              </a>
              <a
                href="https://wa.me/254702060171"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all hover:shadow-lg hover:scale-105"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </FadeInUp>
      </section>

      <Footer />
    </main>
  );
}
