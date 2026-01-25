'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col-reverse items-end gap-3">
      {/* Action Buttons */}
      {isOpen && (
        <>
          <a
            href="tel:+254702060171"
            className="flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
            aria-label="Call us"
          >
            <Phone size={24} />
          </a>
          <a
            href="https://wa.me/254702060171"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
            aria-label="WhatsApp us"
          >
            <MessageCircle size={24} />
          </a>
        </>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-lg hover:scale-110 transition-transform font-bold text-2xl"
        aria-label="Toggle contact options"
      >
        {isOpen ? '✕' : '?'}
      </button>
    </div>
  );
}
