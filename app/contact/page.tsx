"use client";

import React from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/floating-cta";
import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create WhatsApp message
    const whatsappMessage = `Hi Dan Computers! I'm contacting you regarding: ${formData.subject}\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/254702060171?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Reset form
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

    // Show success message briefly
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FloatingCTA />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Get in touch with Dan Computers for any inquiry or service request
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {/* Contact Info Cards */}
            {[
              {
                icon: Phone,
                title: "Phone",
                content: "+254 702 060 171",
                action: "tel:+254702060171",
                buttonText: "Call Now",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp",
                content: "+254 702 060 171",
                action: "https://wa.me/254702060171",
                buttonText: "WhatsApp Us",
              },
              {
                icon: MapPin,
                title: "Location",
                content: "Likoni Ferry, Mombasa, Kenya",
                action: "#map",
                buttonText: "View Map",
              },
            ].map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <div
                  key={idx}
                  className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {contact.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {contact.content}
                  </p>
                  <a
                    href={contact.action}
                    target={
                      contact.action.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      contact.action.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
                  >
                    {contact.buttonText}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Form */}
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Send us a Message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-semibold">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    placeholder="+254 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  >
                    <option value="">Select a subject</option>
                    <option value="Computer Sales">
                      Computer Sales Inquiry
                    </option>
                    <option value="Repair Service">
                      Repair Service Request
                    </option>
                    <option value="CCTV Installation">
                      CCTV Installation Quote
                    </option>
                    <option value="Network Setup">
                      Network Setup Consultation
                    </option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Send Message via WhatsApp
                </button>
              </form>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Your message will be sent directly to our WhatsApp for quick
                response
              </p>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-primary" size={24} />
                  <h3 className="text-xl font-bold text-foreground">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                  <p className="pt-2 text-sm">
                    Emergency support available via WhatsApp
                  </p>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
                <h3 className="font-bold text-foreground mb-4">
                  Quick Response
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  For fastest response, use WhatsApp. We typically reply within
                  minutes during business hours.
                </p>
                <a
                  href="https://wa.me/254702060171"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors w-full"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Open WhatsApp
                </a>
              </div>

              {/* FAQ */}
              <div className="bg-secondary rounded-xl border border-border p-6">
                <h3 className="font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      What's the quickest way to reach you?
                    </p>
                    <p className="text-muted-foreground">
                      WhatsApp for fastest response during business hours.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      Do you offer delivery?
                    </p>
                    <p className="text-muted-foreground">
                      Yes, we offer delivery for large items. Ask during
                      contact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-secondary" id="map">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Our Location
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-muted rounded-xl overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                title="Dan Computers Location - Likoni Ferry, Mombasa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.7663192563827!2d39.66888!3d-4.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a787e14e0e0e0e1%3A0x0!2sLikoni%20Ferry!5e0!3m2!1sen!2ske!4v1234567890"
              />
            </div>
            <p className="text-center text-muted-foreground mt-4">
              Likoni Ferry, Mombasa, Kenya • Coastal region with easy access
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
