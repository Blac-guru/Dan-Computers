'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Facebook, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Image 
              src="/logo.png" 
              alt="Dan Computers" 
              width={50} 
              height={50}
              className="w-auto h-12 mb-4 brightness-0 invert"
            />
            <p className="text-sm opacity-90">Your trusted partner for all computer and CCTV solutions in Mombasa.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="opacity-90 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="opacity-90 hover:opacity-100 transition-opacity">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="opacity-90 hover:opacity-100 transition-opacity">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="opacity-90 hover:opacity-100 transition-opacity">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="opacity-90">Computer Sales</li>
              <li className="opacity-90">CCTV Installation</li>
              <li className="opacity-90">Repair & Maintenance</li>
              <li className="opacity-90">Network Setup</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone size={18} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="opacity-90">+254 702 060 171</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="opacity-90">Likoni Ferry</p>
                  <p className="opacity-90">Mombasa, Kenya</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-90">© 2024 Dan Computers. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="opacity-90 hover:opacity-100 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="opacity-90 hover:opacity-100 transition-opacity"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="opacity-90 hover:opacity-100 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
