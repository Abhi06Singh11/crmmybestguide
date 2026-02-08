'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const ProjectIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  '1': (props) => ( // NearMeR - Location
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  '2': (props) => ( // TipTop Ride - Car
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 16.5V14a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2.5"></path>
      <path d="M14 16.5H4.5l-2.5-7L4.5 3h15l2.5 6.5-2.5 7H14Z"></path>
      <path d="M12 3v2"></path>
      <circle cx="7.5" cy="16.5" r="0.5"></circle>
      <circle cx="16.5" cy="16.5" r="0.5"></circle>
    </svg>
  ),
    '3': (props) => ( // Pillow Factory - E-commerce/Store
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
        <path d="M12 22V12"></path>
    </svg>
  ),
  '4': (props) => ( // Khasta - Cookie
     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10c0-4-1.8-7.2-4.5-8.9"></path>
        <path d="M15.5 6.5a.5.5 0 0 0-1 0 .5.5 0 0 0 1 0Z"></path>
        <path d="M13 11a.5.5 0 0 1 0-1 .5.5 0 0 1 0 1Z"></path>
        <path d="M10 8a.5.5 0 0 0-1 0 .5.5 0 0 0 1 0Z"></path>
    </svg>
  ),
  '5': (props) => ( // Portchef - Chef hat
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13.1c0 .4 0 .8.1 1.2 1.3 5.4 6.3 9.4 12 9.4s10.7-4 12-9.4c.1-.4.1-.8.1-1.2"></path>
        <path d="M3.5 10.7c0-.5.1-.9.2-1.4 1-4.7 5.2-8.3 10.3-8.3s9.3 3.6 10.3 8.3c.1.5.2 1 .2 1.4"></path>
        <path d="M12 2v6"></path><path d="M12 16v6"></path>
    </svg>
  ),
  '6': (props) => ( // Carlos - Fitness
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 7h-2c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h2"></path>
        <path d="M8 7h2c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H8"></path>
        <rect width="6" height="18" x="1" y="3" rx="2"></rect><rect width="6" height="18" x="17" y="3" rx="2"></rect>
    </svg>
  ),
  '7': (props) => ( // Wayne - Backend/Gears
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20v-4" />
      <path d="m15 13-1-1" />
      <path d="M12 11V4" />
      <path d="M9 13 8 12" />
      <path d="M5.1 16.3A8.3 8.3 0 0 1 12 4a8.3 8.3 0 0 1 6.9 12.3" />
      <path d="m3 21 1.5-1.5" />
      <path d="m19.5 19.5 1.5 1.5" />
    </svg>
  ),
  '13': (props) => ( // OmaShram - Senior Care
     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <path d="M9 22V12h6v10"></path>
        <path d="M12 18.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"></path>
    </svg>
  ),
  '14': (props) => ( // PostmortemShala - LMS/Book
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        <path d="m4 13 3.5-3-3.5-3"></path>
    </svg>
  ),
  '15': (props) => ( // Technique Loss Adjusters - Shield/Broken
     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9.5 9.5 5 5"></path>
        <path d="m14.5 9.5-5 5"></path>
    </svg>
  ),
  '16': (props) => ( // Creative Phy - Lightbulb
     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.8 15.2c.4.4.9.6 1.4.6s1-.2 1.4-.6c.4-.4.6-.9.6-1.4s-.2-1-.6-1.4c-.4-.4-.9-.6-1.4-.6s-1 .2-1.4.6c-.4.4-.6.9-.6 1.4s.2 1 .6 1.4Z"></path>
        <path d="M12.4 12.5a3.5 3.5 0 0 0 0 5"></path>
        <path d="M16 8.9c-2.7 2.7-2.7 7.1 0 9.9"></path>
        <path d="M8 8.9c2.7 2.7 2.7 7.1 0 9.9"></path>
        <path d="M12 22v-2.5"></path><path d="M9.5 4a2.5 2.5 0 0 1 5 0"></path>
        <path d="M12 10V2"></path>
    </svg>
  ),
  '17': (props) => ( // Ground of Law - Gavel
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16.5-4-4-4 4"></path>
        <path d="M16 20a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2"></path>
        <path d="m12.5 4.5-5 5"></path><path d="m17.5 9.5-5 5"></path>
        <path d="m3.5 14.5 9-9"></path><path d="M2 2l5 5"></path>
        <path d="M17 17l5 5"></path>
    </svg>
  ),
  '18': (props) => ( // Ainab Home Health Care - House/Health
     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M12 11h4"></path>
        <path d="M12 11v4"></path>
        <path d="M12 11h-4"></path>
        <path d="M12 11V7"></path>
    </svg>
  ),
  '19': (props) => ( // Fahad M Al Mazrou Co. - Truck
     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 17h4V5H2v12h3"></path><path d="M22 17h-3V5h-4v12h-3"></path>
        <circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle>
    </svg>
  ),
  '20': (props) => ( // Sweorn Advisors - Passport/Visa
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="6" rx="2"></rect><circle cx="9" cy="12" r="1"></circle>
        <path d="M15 12h3"></path>
    </svg>
  ),
  '21': (props) => ( // Singapore Airport Transfers - Airplane
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-1-3 0-4.5 1.5L13 8 4.8 6.2"></path>
        <path d="m2.2 2.2 7.8 7.8"></path><path d="M19 15c-3.3 0-6 2.7-6 6"></path>
    </svg>
  ),
  '22': (props) => ( // ACGEM Africa - Graph Up
     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 18l7-7 4 4 6-6"></path><path d="M18 6h-6v6"></path>
    </svg>
  ),
  '23': (props) => ( // Smseducations - Graduation Cap
     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 13 4-4 4 4"></path>
        <path d="M4 21v-7a4 4 0 0 1 4-4h8"></path>
        <path d="m12 3-8 5 8 5 8-5z"></path>
    </svg>
  ),
  '24': (props) => ( // MMT - Employee Panel - Chart
     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"></path><path d="m18 9-5 5-4-4-3 3"></path>
    </svg>
  )
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

                  <div className={`group aspect-square rounded-lg flex items-center justify-center bg-secondary shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                    <Icon className="h-2/3 w-2/3 text-primary transition-transform duration-300 group-hover:scale-110" />
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
