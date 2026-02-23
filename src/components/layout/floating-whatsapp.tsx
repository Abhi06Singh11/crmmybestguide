
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);


export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
        <div className="relative group">
            <Link
                href="https://wa.me/918005414588"
                target="_blank"
                rel="noopener noreferrer"
                passHref
            >
                <Button
                    size="icon"
                    className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                >
                    <WhatsAppIcon />
                </Button>
            </Link>
             <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleClose}
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Dismiss</span>
            </Button>
        </div>
    </div>
  );
}
