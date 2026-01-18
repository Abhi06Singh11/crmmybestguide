'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Testimonials() {
  const testimonialImages = PlaceHolderImages.filter(img => testimonials.some(t => t.image === img.id));

  return (
    <section id="testimonials" className="container py-16 md:py-24">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                Real stories from businesses we've helped to thrive.
            </p>
        </div>
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => {
                const image = testimonialImages.find(img => img.id === testimonial.image);
                return (
                    <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                            <Card className="h-full flex flex-col">
                                <CardContent className="flex h-full flex-col justify-between p-6">
                                    <div>
                                        <div className="flex space-x-1 text-yellow-400 mb-4">
                                            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="h-5 w-5" />)}
                                        </div>
                                        <blockquote className="italic text-card-foreground">
                                            “{testimonial.quote}”
                                        </blockquote>
                                    </div>
                                    <div className="mt-6 flex items-center">
                                        <Avatar className="h-12 w-12">
                                            {image && <AvatarImage src={image.imageUrl} alt={testimonial.name} data-ai-hint={image.imageHint} />}
                                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4">
                                            <p className="font-semibold font-headline">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                );
            })}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
        </Carousel>
    </section>
  );
}
