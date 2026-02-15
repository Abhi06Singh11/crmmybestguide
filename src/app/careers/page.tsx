

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Clock, ShieldCheck, Briefcase, LifeBuoy } from 'lucide-react';
import Link from 'next/link';

const whyJoinUs = [
  {
    icon: Globe,
    title: 'Remote First',
    description: 'Work from anywhere, no location limits.',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Choose your own working hours. We care about results.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Payments',
    description: 'Clear milestones and timely payouts you can trust.',
  },
  {
    icon: Briefcase,
    title: 'No Side-Gig Restrictions',
    description: 'Work with us without giving up other opportunities.',
  },
];

const opportunities = [
  {
    title: 'Business Development Executive (BDE) & Associate Partner',
    description: 'We\'re partnering with digital marketers, freelancers, and agencies who can bring us clients or projects. We offer a flat 20–25% commission based on the project ticket size — paid directly after client onboarding.',
    points: [
      'Flexible, commission-based earnings',
      'Long-term partnership potential',
      'Transparent, milestone-based payouts',
    ],
    cta: 'Proceed >',
    href: '/careers/bde-partner-program',
  },
  {
    title: 'Freelance Developers & Marketers',
    description: 'Are you a skilled web developer or digital marketer looking for extra income? We assign real client projects based on your skills. Before assigning a project, we both agree on clear terms via a virtual agreement.',
    points: [
      'Flexible part-time or full-time work',
      'Project-based pay structure',
      'Opportunity to build your income and portfolio',
    ],
    cta: 'Proceed >',
    href: '/careers/freelancers',
  },
  {
    title: 'Network Partner',
    description: 'Join us as a Network Partner to help maintain and support our client\'s applications. Provide excellent service and ensure system stability and performance.',
    points: [
        'Flexible, project-based work',
        'Gain experience with diverse applications',
        'Directly impact client satisfaction',
    ],
    cta: 'Proceed >',
    href: '/careers/network-partner',
  },
];

export default function CareersPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="py-24 md:py-32 text-center bg-background">
        <div className="container px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Join MyBestGuide – <span className="text-primary">Flexible Opportunities</span> for Modern Professionals
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            100% Remote • Flexible Schedule • Transparent Payments • Freedom to Work Your Way
          </p>
        </div>
      </section>

      {/* Work That Fits Your Life Section */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Work That Fits Your Life
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              MyBestGuide offers 100% remote opportunities, empowering you to work from anywhere, anytime. Our flexible model is built to support your unique schedule. We believe in outcomes, not micromanagement.
            </p>
            <p>
              We ensure transparent, milestone-based payouts that are agreed upon before any work begins, so you always know what to expect. You’re free to freelance, consult, or pursue other jobs without any exclusivity restrictions.
            </p>
            <p>
              By taking on real client projects, you can build both your income and your professional reputation. We're here to help you grow while you help our clients succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join MyBestGuide? Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyJoinUs.map((item) => (
              <Card key={item.title} className="group h-full bg-card border-border text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                <CardContent className="p-8 flex flex-col items-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-primary/10 p-4 text-primary transition-colors duration-300 group-hover:bg-primary-foreground group-hover:text-primary">
                      <item.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary-foreground">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground group-hover:text-primary-foreground/80 flex-grow">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Opportunities Section */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Current Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.title} className="group bg-card border-border flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary group-hover:text-primary-foreground">{opportunity.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-muted-foreground mb-6 flex-grow group-hover:text-primary-foreground/80">{opportunity.description}</p>
                  <ul className="space-y-3 mb-8 text-card-foreground group-hover:text-primary-foreground">
                    {opportunity.points.map((point) => (
                      <li key={point} className="flex items-start">
                        <ShieldCheck className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0 group-hover:text-primary-foreground" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Link href={opportunity.href}>
                      <Button variant="secondary" className="w-full">
                        {opportunity.cta}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
