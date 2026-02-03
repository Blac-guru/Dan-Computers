import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/floating-cta";
import { ImageReveal } from "@/components/image-reveal";
import { FadeInUp } from "@/components/enhanced-animations";
import { Target, Heart, Award, Users } from "lucide-react";

export default function AboutPage() {
  const galleryImages = [
    { src: "/about1.jpeg", alt: "Shop Display" },
    { src: "/image3.jpeg", alt: "products display" },
    { src: "/images/laptops.jpg", alt: "Laptop lineup on display" },
    { src: "/images/desktops.jpg", alt: "Desktop computers showcase" },
    { src: "/images/monitors.jpg", alt: "Monitor selection wall" },
    { src: "/images/printers.jpg", alt: "Printer section" },
    { src: "/images/products/gaming-laptop.jpg", alt: "Gaming laptop" },
    { src: "/images/products/ultrabook.jpg", alt: "Slim ultrabook" },
    { src: "/images/products/4k-monitor.jpg", alt: "4K monitor" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FloatingCTA />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              About Dan Computers
            </h1>
            <p className="text-lg text-muted-foreground">
              Your trusted partner for computer solutions and CCTV services in
              Mombasa
            </p>
          </div>
        </div>
      </section>

      {/* Owner Spotlight */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInUp>
              <ImageReveal
                src="/about3.jpeg"
                alt="Portrait of Dan, founder of Dan Computers"
                width={640}
                height={820}
                className="w-full h-[440px] md:h-[520px] object-cover"
                containerClassName="rounded-2xl shadow-lg border border-border"
              />
            </FadeInUp>

            <FadeInUp delay={120}>
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-widest text-primary font-semibold">
                    Meet the Owner
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                    Daniel Opija
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Dan built Dan Computers on a promise: dependable products,
                  honest advice, and long-term support. His hands-on approach
                  and deep technical experience keep every customer experience
                  personal and reliable.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Years Serving Mombasa", value: "10+" },
                    { label: "Trusted Customers", value: "500+" },
                    { label: "Service Categories", value: "8+" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-card rounded-xl border border-border p-4 text-center hover:border-primary/50 transition-colors"
                    >
                      <p className="text-2xl font-bold text-foreground">
                        {item.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Shop Tour Video */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <FadeInUp>
              <div className="text-center mb-10">
                <p className="text-sm uppercase tracking-widest text-primary font-semibold">
                  Shop Tour
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Take a Look Inside
                </h2>
                <p className="text-muted-foreground mt-3">
                  Explore our store layout, product displays, and service desk
                  in this short video tour.
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={120}>
              <div className="rounded-2xl overflow-hidden border border-border shadow-lg bg-background">
                <video
                  className="w-full h-auto"
                  controls
                  poster="/image3.jpeg"
                  playsInline
                >
                  <source src="/about2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                If the video doesn’t play, ensure the file is saved at
                public/about2.mp4.
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <FadeInUp>
              <div className="text-center mb-12">
                <p className="text-sm uppercase tracking-widest text-primary font-semibold">
                  Gallery
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Shop & Product Highlights
                </h2>
                <p className="text-muted-foreground mt-3">
                  A quick look at our showroom, services, and some featured
                  product categories.
                </p>
              </div>
            </FadeInUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, idx) => (
                <FadeInUp key={idx} delay={idx * 80}>
                  <ImageReveal
                    src={image.src}
                    alt={image.alt}
                    width={420}
                    height={420}
                    className="w-full h-[260px] object-cover"
                    containerClassName="rounded-2xl shadow-md border border-border"
                  />
                </FadeInUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Our Story
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Dan Computers was established with a simple mission: to provide
                high-quality computer products and professional services to the
                people of Mombasa. What started as a small shop in Likoni Ferry
                has grown into a trusted name in computer retail and technical
                services.
              </p>

              <p>
                Our founder, Dan, recognized the need for a reliable computer
                shop that not only sells quality products but also provides
                expert technical support and personalized service. Over the
                years, we've built our reputation on integrity, expertise, and
                customer satisfaction.
              </p>

              <p>
                Today, Dan Computers serves hundreds of satisfied customers
                including individuals, small businesses, corporate offices, and
                institutions. We pride ourselves on our ability to understand
                each customer's unique needs and provide tailored solutions.
              </p>

              <p>
                From computer sales and repair to professional CCTV installation
                and network setup, we've expanded our services to meet the
                growing demands of our community. But our core values remain
                unchanged: quality products, professional service, and genuine
                customer care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Mission */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Target className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Our Mission
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To provide affordable, high-quality computer products and
                professional technical services that empower individuals and
                businesses in Mombasa and beyond. We aim to be the most trusted
                computer shop for quality, service, and integrity.
              </p>
            </div>

            {/* Vision */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Heart className="text-accent" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Our Vision
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be Mombasa's leading computer and technology solutions
                provider, known for innovation, reliability, and exceptional
                customer service. We envision a community where everyone has
                access to quality technology and expert support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Award,
                title: "Quality",
                description:
                  "We only sell genuine products from reputable brands and stand behind every sale.",
              },
              {
                icon: Users,
                title: "Customer Focus",
                description:
                  "Your satisfaction is our priority. We listen, understand, and deliver solutions tailored to your needs.",
              },
              {
                icon: Target,
                title: "Integrity",
                description:
                  "We believe in honest dealings, fair pricing, and transparent communication in all our transactions.",
              },
              {
                icon: Heart,
                title: "Excellence",
                description:
                  "We continuously improve our services and stay updated with the latest technology trends.",
              },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-card rounded-xl border border-border p-6 text-center hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why Choose Dan Computers
          </h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Local Expertise",
                description:
                  "Based in Likoni, Mombasa since day one. We understand the local market, climate conditions, and specific needs of our community.",
              },
              {
                title: "Expert Team",
                description:
                  "Our technicians have years of experience in computer repair, CCTV installation, and IT solutions. We stay updated with latest technology.",
              },
              {
                title: "Wide Selection",
                description:
                  "From budget-friendly options to high-end gaming and professional equipment, we have products for every need and budget.",
              },
              {
                title: "After-Sales Support",
                description:
                  "We provide warranty coverage, maintenance services, and technical support long after your purchase.",
              },
              {
                title: "Competitive Pricing",
                description:
                  "Best prices in the market without compromising on quality. We believe in fair pricing and transparency.",
              },
              {
                title: "Easy Accessibility",
                description:
                  "Convenient location, flexible payment options, and multiple contact channels (phone, WhatsApp, in-person visits).",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors"
              >
                <h3 className="font-bold text-foreground mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Experience Great Service?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Visit us today or contact us to discuss how we can help with your
            computer and technology needs
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+254702060171"
              className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Call: +254 702 060 171
            </a>
            <a
              href="https://wa.me/254702060171"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
