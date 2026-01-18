'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Phone, BotMessageSquare, Linkedin, Twitter, Instagram } from 'lucide-react';
import { generateInquiryResponse } from '@/ai/flows/generate-inquiry-response';
import { Loader2 } from 'lucide-react';


const contactSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  primaryContact: z.string().min(10, { message: 'Please enter a valid contact number.' }),
  isWhatsAppAvailable: z.boolean().default(false),
  whatsappContact: z.string().optional(),
  service: z.string().min(1, { message: 'Please select a service.' }),
  budget: z.string().min(1, { message: 'Please select a budget.' }),
  industry: z.string().min(1, { message: 'Please select an industry.' }),
  message: z.string().optional(),
}).refine(data => data.isWhatsAppAvailable || (!data.isWhatsAppAvailable && data.whatsappContact), {
  message: "WhatsApp number is required if not available on primary number.",
  path: ["whatsappContact"],
});

const quickInquirySchema = z.object({
  inquiry: z.string().min(10, { message: 'Please describe your needs in a bit more detail.' }),
});


const services = [
    "E-commerce Website Development",
    "Mobile App Development",
    "ERP SaaS Development",
    "Odoo Development & Customization",
    "Technical Support & Maintenance",
    "Customized Development Solutions"
];

const budgets = [
    "Below 30k",
    "30k – 50k",
    "50k – 1 Lakh",
    "1 Lakh – 2 Lakh",
    "2+ Lakh"
];

const industries = [
    "IT & Software", "E-commerce", "Healthcare", "Education", "Finance & Banking", "Real Estate",
    "Travel & Hospitality", "Manufacturing", "Logistics", "Media & Entertainment", "Startups", "Retail"
];

const socialLinks = [
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Instagram, label: 'Instagram' },
  ];

export default function Contact() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [inquiryResponse, setInquiryResponse] = useState('');

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      primaryContact: '',
      isWhatsAppAvailable: false,
      whatsappContact: '',
      service: '',
      budget: 'Below 30k',
      industry: '',
      message: '',
    },
  });

  const quickForm = useForm<z.infer<typeof quickInquirySchema>>({
    resolver: zodResolver(quickInquirySchema),
    defaultValues: {
      inquiry: '',
    },
  });

  const isWhatsAppAvailable = form.watch('isWhatsAppAvailable');

  function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log('Contact form submitted:', values);
    toast({
      title: 'Message Sent!',
      description: "We've received your inquiry and will get back to you shortly.",
    });
    form.reset();
  }

  async function onQuickInquirySubmit(values: z.infer<typeof quickInquirySchema>) {
    setIsGenerating(true);
    setInquiryResponse('');
    try {
      const result = await generateInquiryResponse({ inquiry: values.inquiry });
      setInquiryResponse(result.response);
    } catch (error) {
      console.error('Error generating inquiry response:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an issue generating a response. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <section id="contact" className="bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl text-foreground">Get in Touch</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Whether you have a project in mind, need a quote, or just want to talk about your ideas, we're here to help. Reach out to us, and let's start a conversation about how we can bring your vision to life.
            </p>
        </div>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-3">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="font-headline">Send Us a Message</CardTitle>
                        <CardDescription>Fill out the form below, and we'll get back to you as soon as possible.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="firstName" render={({ field }) => (
                                        <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="lastName" render={({ field }) => (
                                        <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                 <FormField control={form.control} name="primaryContact" render={({ field }) => (
                                    <FormItem><FormLabel>Primary Contact Number</FormLabel><FormControl><Input placeholder="+91 12345 67890" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField
                                    control={form.control}
                                    name="isWhatsAppAvailable"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>This number is available on WhatsApp</FormLabel>
                                        </div>
                                        </FormItem>
                                    )}
                                />
                                {!isWhatsAppAvailable && (
                                     <FormField control={form.control} name="whatsappContact" render={({ field }) => (
                                        <FormItem><FormLabel>WhatsApp Contact Number</FormLabel><FormControl><Input placeholder="+91 09876 54321" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                )}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="service" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Service of Interest</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    {services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField control={form.control} name="budget" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Estimated Budget</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger><SelectValue placeholder="Select your budget" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    {budgets.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                </div>
                                <FormField control={form.control} name="industry" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Industry</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select your industry" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                {industries.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="message" render={({ field }) => (
                                    <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Briefly describe your project or inquiry..." rows={5} {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <div className="text-center">
                                    <Button type="submit" size="lg">Send Message</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-8 lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><BotMessageSquare className="h-6 w-6 text-primary" />Quick Inquiry</CardTitle>
                        <CardDescription>Don't have time for the form? Just tell us what you need.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...quickForm}>
                            <form onSubmit={quickForm.handleSubmit(onQuickInquirySubmit)} className="space-y-4">
                                <FormField
                                    control={quickForm.control}
                                    name="inquiry"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea placeholder="e.g., 'I need a website for my new coffee shop in Bangalore.'" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="text-center">
                                    <Button type="submit" disabled={isGenerating}>
                                        {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : 'Get an Instant Response'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        {inquiryResponse && (
                            <div className="mt-4 rounded-md border bg-background p-4 text-sm">
                                <p className="font-semibold">Suggested Next Steps:</p>
                                <p className="text-muted-foreground">{inquiryResponse}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Mail className="h-6 w-6 text-primary" />
                            <div>
                                <h4 className="font-semibold">Business Email</h4>
                                <a href="mailto:contact@mybestguide.com" className="text-muted-foreground hover:text-primary transition-colors">contact@mybestguide.com</a>
                            </div>
                        </div>
                         <div className="flex items-center gap-4">
                            <Phone className="h-6 w-6 text-primary" />
                            <div>
                                <h4 className="font-semibold">Phone Number</h4>
                                <p className="text-muted-foreground">+91 123 456 7890</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">Our Locations</h4>
                                <p className="text-muted-foreground">Bangalore, India</p>
                                <p className="text-muted-foreground">Lucknow, India</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Follow Us</CardTitle>
                    </CardHeader>
                    <CardContent className="flex space-x-4">
                        {socialLinks.map((social) => (
                            <Link key={social.label} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                                <social.icon className="h-7 w-7" />
                                <span className="sr-only">{social.label}</span>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
