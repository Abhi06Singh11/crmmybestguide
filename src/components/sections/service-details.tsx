'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface Service {
    icon: React.ElementType;
    title: string;
    description: string;
    image?: string;
}

interface ServiceDetailsProps {
  heroTitle: string;
  heroDescription: string;
  ctaText?: string;
  services: Service[];
}

export default function ServiceDetails({
  heroTitle,
  heroDescription,
  ctaText = "Request a Quote",
  services,
}: ServiceDetailsProps) {
  const router = useRouter();

  return (
    <>
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container">
            <div className='text-left'>
                <Button
                    variant="secondary"
                    className="mb-8"
                    onClick={() => router.push('/services')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Services
                </Button>
            </div>
            <div className="text-center">
                <h1 className="font-headline text-4xl font-bold md:text-5xl">{heroTitle}</h1>
                <p className="mt-4 mx-auto max-w-3xl text-lg text-primary-foreground/80">{heroDescription}</p>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
          <div className="container space-y-16">
              {services.map((service, index) => {
                return (
                <div key={service.title}>
                  <div className={`grid gap-12 items-center md:grid-cols-2 ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                      <div className={index % 2 !== 0 ? 'md:col-start-2' : ''}>
                          <div className="flex items-center gap-4 mb-4">
                              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                  <service.icon className="h-8 w-8" />
                              </div>
                              <h3 className="font-headline text-2xl font-bold text-foreground">{service.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{service.description}</p>
                      </div>
                      <div className={`group aspect-video rounded-lg flex items-center justify-center bg-muted shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-primary ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                          <div className="text-primary transition-colors duration-300 group-hover:text-primary-foreground">
                              <service.icon className="h-24 w-24 transition-transform duration-300 group-hover:scale-110" />
                          </div>
                      </div>
                  </div>
                  {index < services.length - 1 && <Separator className="my-16 bg-border/40" />}
                </div>
              )})}
          </div>
      </section>
      
      <section className="bg-secondary py-16 md:py-24">
        <div className="container text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Ready to Discuss Your Project?</h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Our experts are here to help you find the perfect solution. Whether you have a clear vision or need guidance, let's connect and explore the possibilities together.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">{ctaText}</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">Talk to Our Experts</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
