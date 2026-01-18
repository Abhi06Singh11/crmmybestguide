'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ServicePageProps {
  heroTitle: string;
  heroDescription: string;
  overview: string;
  whatWeOffer: string[];
  keyFeatures: string[];
  whyChoose: string;
  cta: React.ReactNode;
}

export default function ServicePage({
  heroTitle,
  heroDescription,
  overview,
  whatWeOffer,
  keyFeatures,
  whyChoose,
  cta,
}: ServicePageProps) {
  const router = useRouter();

  return (
    <>
      <section className="bg-primary text-primary-foreground py-16 md:py-24 relative">
        <div className="container">
            <Button
                variant="secondary"
                className="absolute top-8 left-8"
                onClick={() => router.back()}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
            <div className="text-center pt-12">
                <h1 className="font-headline text-4xl font-bold md:text-5xl">{heroTitle}</h1>
                <p className="mt-4 mx-auto max-w-2xl text-lg text-primary-foreground/80">{heroDescription}</p>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container grid gap-12 md:grid-cols-2 md:gap-16 items-start">
            <div className="space-y-6">
                <h2 className="font-headline text-3xl font-bold">Overview</h2>
                <p className="text-muted-foreground">{overview}</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">What We Offer</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {whatWeOffer.map((item) => (
                            <li key={item} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container grid gap-12 md:grid-cols-2 md:gap-16 items-start">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {keyFeatures.map((item) => (
                            <li key={item} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
             <div className="space-y-6">
                <h2 className="font-headline text-3xl font-bold">Why Choose MyBestGuide?</h2>
                <p className="text-muted-foreground">{whyChoose}</p>
            </div>
        </div>
      </section>

        <section className="py-16 md:py-24">
            <div className="container">
                {cta}
            </div>
        </section>

    </>
  );
}
