'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const categories = ['All', 'Web', 'App', 'E-Commerce', 'Other'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const projectImages = PlaceHolderImages.filter((img) =>
    projects.some((p) => p.image === img.id)
  );

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="portfolio" className="bg-background py-16 md:py-24">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Our Work Showcase</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore a selection of projects we've passionately built for our clients, each crafted with precision, purpose, and a deep commitment to quality.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-4 mb-12">
            {categories.map((category) => (
                <Button
                    key={category}
                    variant={activeCategory === category ? 'default' : 'outline'}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                        'transition-all duration-200',
                        activeCategory === category ? 'scale-105 shadow-md' : 'hover:bg-accent/50'
                    )}
                >
                    {category}
                </Button>
            ))}
        </div>

        <div className="space-y-16">
          {filteredProjects.map((project, index) => {
            const image = projectImages.find((img) => img.id === project.image);
            return (
              <div key={project.name}>
                <div
                  className={`grid gap-12 items-center md:grid-cols-2 ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}
                >
                  <div className={index % 2 !== 0 ? 'md:col-start-2' : ''}>
                    <p className="text-sm text-primary font-medium">{project.category}</p>
                    <h3 className="font-headline text-2xl font-bold mt-2">{project.name}</h3>
                    <p className="mt-4 text-muted-foreground">{project.description}</p>
                    <div className="mt-8">
                      {project.url !== "#" ? (
                        <Link href={project.url} target="_blank" rel="noopener noreferrer">
                          <Button>
                            View More <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="outline" disabled>
                          URL not available
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className={`aspect-video rounded-lg overflow-hidden flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={project.name}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </div>
                </div>
                {index < filteredProjects.length - 1 && <Separator className="my-16 bg-border/40" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
