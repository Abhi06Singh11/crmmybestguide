'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Rocket, CheckCircle, X } from 'lucide-react';

export default function FreeWebsiteAd() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="container">
            <section className="relative mx-auto flex items-center justify-center overflow-hidden rounded-2xl py-12"
                style={{ background: 'linear-gradient(135deg, #002D6B 0%, #001F4D 100%)' }}>
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#002D6B] rounded-full blur-[120px]"></div>
                </div>

                <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 z-20" onClick={() => setIsVisible(false)}>
                    <X className="h-6 w-6" />
                </Button>

                <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    <div className="mx-auto max-w-4xl text-center">
                        <Badge variant="secondary" className="bg-white/10 text-white px-5 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
                            <span className="relative flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            Limited-Time Offer – <span className="font-bold ml-1">7</span> Slots Remaining This Month
                        </Badge>

                        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                            Get a 100% FREE Professional Website
                        </h1>

                        <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
                            Launch your business online with a real, functional website. Generate leads, build trust, and grow – <strong>without spending a dime.</strong>
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-10">
                            <div className="flex items-center gap-2 text-white/90 font-medium">
                                <CheckCircle className="text-green-400 h-4 w-4" />
                                <span>Real Website</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90 font-medium">
                                <CheckCircle className="text-green-400 h-4 w-4" />
                                <span>Hosting-Ready Code</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90 font-medium">
                                <CheckCircle className="text-green-400 h-4 w-4" />
                                <span>No Credit Card</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/services/free-website">
                                <Button size="lg" className="bg-white text-primary hover:bg-gray-200 shadow-xl w-full sm:w-auto">
                                    <Rocket className="mr-2" />
                                    Claim Free Website
                                </Button>
                            </Link>
                            <Link href="/services/free-website#features">
                                <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 hover:text-white bg-transparent w-full sm:w-auto">
                                    See What's Included
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
