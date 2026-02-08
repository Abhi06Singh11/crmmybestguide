'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/data';
import {
  ArrowRight,
  BookOpen,
  Car,
  Dumbbell,
  HeartPulse,
  Home,
  Landmark,
  LineChart,
  MapPin,
  MessageSquare,
  Plane,
  Scale,
  Smile,
  Store,
  Truck,
  Wrench,
  BookUser,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const ProjectIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  '1': MapPin,
  '2': Car,
  '3': Store,
  '4': Store,
  '5': Smile,
  '6': Dumbbell,
  '7': Wrench,
  '13': Home,
  '14': BookOpen,
  '15': (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="m9.5 9.5 5 5"></path>
      <path d="m14.5 9.5-5 5"></path>
    </svg>
  ),
  '16': Store,
  '17': Scale,
  '18': HeartPulse,
  '19': Truck,
  '20': BookUser,
  '21': Plane,
  '22': Landmark,
  '23': MessageSquare,
  '24': LineChart,
};


const FallbackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
  </svg>
);

const categories = ['All', 'Web', 'App', 'E-Commerce', 'Other'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

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
            const Icon = ProjectIcons[project.image] || FallbackIcon;
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

                  <div className={`flex items-center justify-center ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                     <div className="flex items-center justify-center group w-full max-w-sm aspect-square rounded-lg bg-muted shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-primary">
                        <div className="text-primary transition-colors duration-300 group-hover:text-primary-foreground">
                            <Icon className="h-24 w-24 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                    </div>
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
