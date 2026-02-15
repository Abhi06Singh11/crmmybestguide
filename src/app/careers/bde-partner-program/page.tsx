
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, Clock, Briefcase, ArrowLeft, Code, Smartphone, ShoppingCart, Layers3, Database, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const benefits = [
  {
    icon: Coins,
    title: 'Competitive Payouts',
    description: 'Earn 20-30% commission on every successful referral. No upper limits.',
  },
  {
    icon: Clock,
    title: 'Flexible Collaboration',
    description: 'Work on your own terms. No fixed hours, no binding contracts.',
  },
  {
    icon: Briefcase,
    title: 'Build Your Network',
    description: 'Partner with a growing tech company and expand your professional reach.',
  },
];

const servicesToPromote = [
  {
    icon: Code,
    title: 'Custom Web & App Development',
    description: 'Bespoke solutions for web and mobile platforms.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform apps for iOS and Android.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description: 'Custom online stores with secure payment integrations.',
  },
  {
    icon: Layers3,
    title: 'ERP & SaaS Platforms',
    description: 'Scalable, multi-tenant SaaS and custom ERP systems.',
  },
  {
    icon: Database,
    title: 'Odoo Development',
    description: 'Customizing and implementing Odoo for enterprise clients.',
  },
  {
    icon: ShieldCheck,
    title: 'Technical Support',
    description: 'Ongoing maintenance, troubleshooting, and support.',
  }
];

const mouItems = [
    {
        title: "1. Introduction",
        content: "This document outlines the referral partnership between MyBestGuide and you (the 'Partner') for referring clients for our services."
    },
    {
        title: "2. Commission",
        content: "You will earn a standard commission of 20-25% on the project signing amount. For high-value projects, this can be negotiated up to 30%."
    },
    {
        title: "3. Payment Terms",
        content: "Commissions are paid out within 5-7 working days after the client makes their payment, either in full or based on milestones."
    },
    {
        title: "4. Confidentiality",
        content: "All business communications, strategies, and client data must be kept strictly confidential and not shared with third parties."
    },
    {
        title: "5. Conduct & Legal",
        content: "Any fraudulent or unethical behavior will result in immediate termination of the partnership and potential legal action under Indian law (Lucknow jurisdiction)."
    },
    {
        title: "6. Termination",
        content: "Either party can terminate this partnership with 30 days’ written notice. Commissions on deals closed before termination will be honored."
    },
];

const commissionTiers = [
    {
        projectValue: "Up to ₹50,000",
        commission: "20%",
        payoutTime: "5-7 working days"
    },
    {
        projectValue: "₹50,001 to ₹1,00,000",
        commission: "25%",
        payoutTime: "5-7 working days"
    },
    {
        projectValue: "₹1,00,000+",
        commission: "30% (or Negotiable)",
        payoutTime: "5-7 working days"
    }
];

export default function BdePartnerProgramPage() {
    const router = useRouter();
  return (
    <div className="bg-background text-foreground">
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 text-center">
        <div className="container">
            <div className='text-left'>
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
            BDE & Associate Partner Program
          </h1>
          <p className="text-xl mt-4 text-primary-foreground/80">
            Refer clients, earn commissions, and grow with us. It's that simple.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Partner With MyBestGuide?</h2>
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
      
      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Services to Promote
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesToPromote.map((service) => (
              <Card key={service.title} className="group h-full text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className="rounded-full bg-primary/10 p-4 text-primary mb-4 transition-colors duration-300 group-hover:bg-primary-foreground group-hover:text-primary">
                        <service.icon className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-lg font-semibold flex-grow group-hover:text-primary-foreground">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 group-hover:text-primary-foreground/80">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
                Our Commission Structure
            </h2>
            <Card className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold text-foreground">Project Value</TableHead>
                            <TableHead className="font-bold text-foreground">Commission Rate</TableHead>
                            <TableHead className="font-bold text-foreground text-right">Payout Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {commissionTiers.map((tier) => (
                            <TableRow key={tier.projectValue}>
                                <TableCell className="font-medium">{tier.projectValue}</TableCell>
                                <TableCell className="text-primary font-bold">{tier.commission}</TableCell>
                                <TableCell className="text-right">{tier.payoutTime}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Referral Agreement (MOU)
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

      <section className="py-20 text-center bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold">Ready to Start Earning?</h2>
          <p className="text-lg mt-4 text-muted-foreground">
            Join our referral program and turn your network into a new revenue stream.
          </p>
          <div className="mt-8">
            <Link href="/careers/bde-partner-program/bde-apply">
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
