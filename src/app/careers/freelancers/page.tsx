
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, Clock, Briefcase, Code, Smartphone, ShoppingCart, Layers3, Database, ArrowLeft, LifeBuoy } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const benefits = [
  {
    icon: Coins,
    title: 'Competitive Payouts',
    description: 'Get paid per project or milestone. Up to 25% commission or agreed fixed rates.',
  },
  {
    icon: Clock,
    title: 'Flexible Workstyle',
    description: 'Choose your own hours. Freelance, part-time, or even one-time gigs — all are welcome.',
  },
  {
    icon: Briefcase,
    title: 'Portfolio Freedom',
    description: 'Showcase your work on GitHub, LinkedIn, Behance, or other platforms with proper credits.',
  },
];

const skills = [
  {
    icon: Code,
    title: 'Frontend & Backend Development',
    description: 'Expertise in React, Next.js, Node.js, and other modern web technologies.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Building native and cross-platform apps for iOS and Android.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description: 'Experience with Shopify, WooCommerce, and custom e-commerce platforms.',
  },
  {
    icon: Layers3,
    title: 'ERP & SaaS Platforms',
    description: 'Developing scalable, multi-tenant SaaS applications and custom ERPs.',
  },
  {
    icon: Database,
    title: 'Odoo Development',
    description: 'Customizing and implementing Odoo for enterprise clients.',
  },
  {
    icon: LifeBuoy,
    title: 'Technical Support',
    description: 'Providing ongoing maintenance, troubleshooting, and support for live applications.'
  }
];

const mouItems = [
    {
        title: "1. Purpose",
        content: "This MOU defines the partnership between MyBestGuide and Freelancers/Volunteers/Short-term hires for services like Web Development, Digital Marketing, SEO, ERP, and AI."
    },
    {
        title: "2. Types of Engagement",
        content: "Engagement types include Freelancer (paid), Volunteer (unpaid), and Short-Term Employee (contractual role for fixed duration)."
    },
    {
        title: "3. Responsibility",
        content: "Once a task is accepted, the professional is responsible for timely and quality delivery. Work is voluntary and never assigned without consent."
    },
    {
        title: "4. Payment Terms",
        content: "Payouts may be milestone-based or post-project. Volunteers do not receive payment but retain full credit and exposure rights."
    },
    {
        title: "5. Portfolio Rights",
        content: "Freelancers and Volunteers can showcase completed work on personal profiles, with role clarity and proper project attribution."
    },
    {
        title: "6. Conduct & Legal",
        content: "Misrepresentation or brand harm is strictly prohibited. Legal action may be taken under Indian jurisdiction (Lucknow)."
    },
    {
        title: "7. Confidentiality",
        content: "All project data, strategies, and communication must be kept confidential unless authorized in writing."
    },
    {
        title: "8. Required Info",
        content: "To start, submit your full name, email, phone number, portfolios (GitHub, Behance, etc.), skillset, and availability."
    },
    {
        title: "9. Termination",
        content: "Either party may exit with 15 days’ notice. Final payments will be cleared for approved and delivered work."
    },
    {
        title: "10. Final Notes",
        content: "This is not an employment offer. Freelancers work independently. MyBestGuide reserves full control over project assignment."
    }
]

export default function FreelancersPage() {
    const router = useRouter();
  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 text-center">
        <div className="container">
          <div className="text-left">
            <Button
                variant="secondary"
                className="mb-8"
                onClick={() => router.back()}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Freelance Developers & Marketers
          </h1>
          <p className="text-xl mt-4 text-primary-foreground/80">
            Flexible work. High payouts. Keep portfolio rights. Build real products with MyBestGuide.
          </p>
        </div>
      </header>

      {/* Benefits */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group h-full text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                <CardContent className="p-8 flex flex-col items-center h-full">
                   <div className="rounded-full bg-primary/10 p-4 text-primary mb-4 transition-colors duration-300 group-hover:bg-primary-foreground group-hover:text-primary">
                    <benefit.icon className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-muted-foreground group-hover:text-primary-foreground/80 flex-grow">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Skills We're Hiring For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <Card key={skill.title} className="group h-full text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                 <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className="rounded-full bg-primary/10 p-4 text-primary mb-4 transition-colors duration-300 group-hover:bg-primary-foreground group-hover:text-primary">
                        <skill.icon className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-lg font-semibold flex-grow group-hover:text-primary-foreground">{skill.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 group-hover:text-primary-foreground/80">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MOU Section */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Freelancer Agreement (MOU)
          </h2>
          <Accordion type="single" collapsible defaultValue="item-0">
            {mouItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg hover:no-underline">{item.title}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                        {item.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-secondary">
        <div className="container">
          <h2 className="text-3xl font-bold">Start Your Freelance Journey with MyBestGuide</h2>
          <p className="text-lg mt-4 text-muted-foreground">
            Send your profile to{' '}
            <a href="mailto:partners@mybestguide.com" className="text-primary font-semibold hover:underline">
              partners@mybestguide.com
            </a>{' '}
            or apply below.
          </p>
          <div className="mt-8">
            <Link href="/careers/freelancers/dev-apply">
              <Button size="lg">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
