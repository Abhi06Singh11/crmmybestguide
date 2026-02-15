
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, Clock, Briefcase, ArrowLeft, LifeBuoy, FileText, Shield, AlertCircle, Activity, TrendingUp, Wrench, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const benefits = [
  {
    icon: Coins,
    title: 'Project-Based Pay',
    description: 'Get compensated for your expertise on a per-project or retainer basis.',
  },
  {
    icon: Clock,
    title: 'Flexible Engagements',
    description: 'Work remotely and choose projects that fit your schedule and skillset.',
  },
  {
    icon: Briefcase,
    title: 'Enhance Your Skills',
    description: 'Gain experience across a variety of applications and technical stacks.',
  },
];

const skills = [
  {
    icon: FileText,
    title: 'Ticket & SLA Management',
    description: 'Efficiently track, prioritize, and resolve support tickets within agreed SLAs.',
  },
  {
    icon: Shield,
    title: 'Security & Patching',
    description: 'Perform regular security updates and patch management to protect client systems.',
  },
  {
    icon: AlertCircle,
    title: 'Proactive Monitoring',
    description: 'Utilize monitoring tools to detect and address issues before they escalate.',
  },
  {
    icon: Activity,
    title: 'SOP & Documentation',
    description: 'Create and maintain clear documentation and standard operating procedures.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Optimization',
    description: 'Monitor application performance and suggest improvements for stability and speed.',
  },
  {
    icon: Wrench,
    title: 'Incident Resolution',
    description: 'Diagnose and resolve technical incidents, providing clear reporting to clients.'
  }
];

const mouItems = [
    {
        title: "1. Purpose",
        content: "This agreement outlines the partnership for providing technical support and maintenance services to MyBestGuide's clients."
    },
    {
        title: "2. Engagement Types",
        content: "Partners can be engaged on a project-by-project basis, on-retainer for ongoing support, or as short-term associates for specific needs."
    },
    {
        title: "3. Responsibilities",
        content: "Partners are responsible for meeting SLAs, providing timely incident resolution, performing routine maintenance, and communicating clearly with clients and the MyBestGuide team."
    },
    {
        title: "4. Payment Terms",
        content: "Compensation will be based on the agreed scope of work, either as a fixed project fee, hourly rate, or monthly retainer. Payments are processed after client verification of completed work."
    },
    {
        title: "5. Client & Data Confidentiality",
        content: "All client information, system data, and proprietary information must be handled with the strictest confidentiality. Unauthorized access or sharing is prohibited."
    },
    {
        title: "6. Professional Conduct",
        content: "Partners must maintain a high level of professionalism, representing MyBestGuide positively. Unethical behavior may lead to termination."
    },
    {
        title: "7. Required Information",
        content: "To join, you'll need to provide details on your technical expertise, years of experience, relevant certifications, and availability."
    },
    {
        title: "8. Termination",
        content: "Either party may terminate the partnership with 30 days’ written notice. Payments for all completed and approved work will be made."
    }
]

export default function NetworkPartnerPage() {
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
            Network Partner
          </h1>
          <p className="text-xl mt-4 text-primary-foreground/80">
            Ensure client success by providing expert maintenance and support for web and mobile applications.
          </p>
        </div>
      </header>

      {/* Benefits */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join as a Network Partner?</h2>
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
            Areas of Responsibility
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
            Network Partner Agreement (MOU)
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
          <h2 className="text-3xl font-bold">Ready to Provide Expert Support?</h2>
          <p className="text-lg mt-4 text-muted-foreground">
            Join our network of technical experts and help our clients thrive.
          </p>
          <div className="mt-8">
            <Link href="/careers/network-partner/apply">
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
