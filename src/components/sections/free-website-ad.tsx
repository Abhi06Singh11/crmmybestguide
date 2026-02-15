'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Rocket, CheckCircle, X } from 'lucide-react';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        // Ensure this only runs on the client
        const randomDuration = Math.floor(Math.random() * (12 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000 + 1) + 3 * 60 * 60 * 1000);
        const endDate = new Date(Date.now() + randomDuration);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate.getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
                return;
            }

            const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
            const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex justify-center gap-3 md:gap-6">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                    <div className="bg-white/20 rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] backdrop-blur-sm">
                        <span className="text-2xl md:text-4xl font-bold text-white font-mono">{value}</span>
                    </div>
                    <span className="text-white/70 text-xs mt-2 block font-medium capitalize">{unit}</span>
                </div>
            ))}
        </div>
    );
};

export default function FreeWebsiteAd() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
        return null;
    }

    return (
        <section className="relative overflow-hidden h-[80vh] flex items-center" style={{ background: 'linear-gradient(135deg, #002D6B 0%, #001F4D 100%)' }}>
            <div className="bubbles">
                {[...Array(10)].map((_, i) => <div key={i} className="bubble"></div>)}
            </div>
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
                <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#002D6B] rounded-full blur-[120px]"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10" onClick={() => setIsVisible(false)}>
                    <X className="h-6 w-6" />
                </Button>
                <div className="text-center max-w-4xl mx-auto">
                    <Badge variant="secondary" className="bg-white/10 text-white px-5 py-2 rounded-full text-sm font-medium mb-8 border border-white/20 animate-fade-in-up">
                        <span className="relative flex h-3 w-3 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        Limited-Time Offer – <span className="font-bold ml-1">7</span> Slots Remaining This Month
                    </Badge>

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                        Get a 100% FREE<br />Professional Website
                    </h1>

                    <p className="text-lg md:text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
                        Launch your business online with a real, functional website. Generate leads, build trust, and grow – <strong>without spending a dime.</strong>
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
                        {['Real Website', 'Hosting-Ready Code', 'No Credit Card'].map(point => (
                            <div key={point} className="flex items-center gap-2.5 text-white/90 font-medium bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                <CheckCircle className="text-green-400" />
                                <span>{point}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link href="/services/free-website">
                            <Button size="lg" className="bg-white text-[#002D6B] animate-pulse-strong hover:bg-gray-50 shadow-xl w-full sm:w-auto">
                                <Rocket className="mr-2" />
                                Claim Free Website
                            </Button>
                        </Link>
                        <Link href="/#features">
                             <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white backdrop-blur-sm w-full sm:w-auto">
                                See What's Included
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-2xl mx-auto border border-white/10 shadow-2xl">
                        <div className="flex justify-between items-center mb-4"><p className="text-sm font-semibold uppercase tracking-wider text-white/90">Offer Expires In</p><Badge variant="destructive" className="animate-pulse">Few slots left</Badge></div>
                        <CountdownTimer />
                    </div>
                </div>
            </div>
        </section>
    );
}
