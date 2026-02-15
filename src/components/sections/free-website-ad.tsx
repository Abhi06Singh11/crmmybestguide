
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, Download, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function FreeWebsiteAd() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the ad on client-side mount.
    // No localStorage check, so it shows on every refresh.
    setIsVisible(true);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={cn(
        "w-full transition-all duration-500 ease-in-out overflow-hidden",
        isVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <section className="relative h-[80vh] w-[calc(100%-3rem)] mx-auto flex items-center justify-center text-primary-foreground p-6 lg:p-8 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent -z-10"></div>
        <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="absolute top-4 right-4 h-8 w-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/20 z-10"
            aria-label="Dismiss"
        >
            <X className="h-5 w-5" />
        </Button>
        
        <div className="text-center space-y-4 max-w-4xl w-full">
             <div className="inline-flex items-center gap-2 py-1 px-3 bg-primary-foreground/10 rounded-full text-sm font-medium">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Limited-Time Offer
            </div>

            <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight">Get a 100% FREE<br />Professional Website</h1>
            <p className="text-primary-foreground/80 max-w-3xl mx-auto text-lg">
                Launch your business with a real, functional website to generate leads and build trust—without spending a dime.
            </p>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2 text-md">
                <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Real Website</span>
                <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Hosting-Ready Code</span>
                <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> No Credit Card Required</span>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services/free-website">
                    <Button size="lg" className='font-bold bg-primary-foreground text-primary border-primary-foreground hover:bg-transparent hover:text-primary-foreground'>
                       <Rocket className="mr-2 h-5 w-5" />
                       Claim Your Free Website
                    </Button>
                </Link>
                <Link href="/services/free-website#features">
                    <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground hover:text-primary">
                        <Download className="mr-2 h-5 w-5" />
                        See What's Included
                    </Button>
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}

