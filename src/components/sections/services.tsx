'use client';

import { serviceSegments, serviceDetails } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Services() {

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="our-expertise" className="bg-secondary py-16 md:py-24">
        <div className="container">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="font-headline text-4xl font-bold md:text-5xl text-foreground">Our Expertise in Modern Digital Solutions</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                At MyBestGuide, we specialize in designing, developing, and maintaining digital solutions that empower businesses to operate smarter and grow faster. Our expertise spans web and mobile development, ERP systems, SaaS platforms, and long-term technical support. We focus on clean architecture, user-friendly design, and scalable technology to ensure your digital products perform at their best today and in the future.
                </p>
            </div>
        </div>
      </section>

      <section id="services-overview" className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Explore Our Services</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Click on a service to learn more about how we can help your business grow.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {serviceDetails.map((service) => (
              <a 
                key={service.title} 
                href={`#${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                onClick={(e) => handleScroll(e, service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                      <div className="rounded-full bg-primary/10 p-4 text-primary mb-4 transition-colors duration-300 group-hover:bg-primary-foreground group-hover:text-primary">
                          <service.icon className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <CardTitle className="font-headline text-lg group-hover:text-primary-foreground">{service.title}</CardTitle>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>


      <section id="service-details" className="py-16 md:py-24 bg-secondary">
          <div className="container">
              {serviceSegments.map((segment) => (
                  <div key={segment.title} className="space-y-16 pt-24 first:pt-0 last:pb-0">
                      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                          <h2 className="font-headline text-3xl font-bold md:text-4xl">{segment.title}</h2>
                      </div>
                      <div className="space-y-16">
                        {segment.services.map((service, index) => {
                            return (
                              <div id={service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} key={service.title} className={`grid gap-12 items-center md:grid-cols-2 scroll-mt-24 border-b border-border pb-16 last:border-b-0 last:pb-0 ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                                  <div className={index % 2 !== 0 ? 'md:col-start-2' : ''}>
                                      <h3 className="font-headline text-2xl font-bold text-foreground">{service.title}</h3>
                                      <p className="mt-4 text-muted-foreground">{service.description}</p>
                                      <ul className="mt-6 space-y-4">
                                          {service.features.map(feature => (
                                              <li key={feature} className="flex items-start">
                                                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                                  <span>{feature}</span>
                                              </li>
                                          ))}
                                      </ul>
                                  <div className="mt-8">
                                          <Link href={service.link}>
                                              <Button>
                                                  Learn More
                                                  <ArrowRight className="ml-2 h-4 w-4" />
                                              </Button>
                                          </Link>
                                      </div>
                                  </div>
                                  <div className={`group aspect-video rounded-lg bg-muted flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:bg-primary ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                                      <div className="text-primary transition-colors duration-300 group-hover:text-primary-foreground">
                                          <service.icon className="h-24 w-24 transition-transform duration-300 group-hover:scale-110" />
                                      </div>
                                  </div>
                              </div>
                            );
                          })}
                      </div>
                  </div>
              ))}
          </div>
      </section>
    </>
  );
}
