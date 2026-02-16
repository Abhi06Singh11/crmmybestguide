
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  CheckCircle, Code, Edit, Gift, Headset, Info, Lightbulb, Mail, Megaphone, Paintbrush, Puzzle, Rocket,
  Search, ShoppingCart, Star, Store, Users, XCircle, Zap, Check, FileText, Gauge, MessageCircle as MessageCircleIcon,
  Bot, CalendarCheck, Smartphone, CreditCard, Filter, Hash, Box, Cog, Smartphone as SmartphoneIcon,
  ChevronDown, ArrowRight, HandIcon, Eye, Wrench, ShieldCheck, MailIcon, MapPin, Phone, Send, Linkedin, Twitter, Instagram, ArrowUp, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const applicationSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  businessName: z.string().min(2, { message: 'Business name is required.' }),
  websiteType: z.enum(['Basic Website', 'E-Commerce']),
  industry: z.string().min(1, 'Please select an industry.'),
  customIndustry: z.string().optional(),
  addons: z.array(z.string()).optional(),
  goals: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
}).refine(data => {
    if (data.industry === 'Custom' && !data.customIndustry) {
        return false;
    }
    return true;
}, {
    message: "Please specify your industry.",
    path: ["customIndustry"],
});

export default function FreeWebsitePage() {
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const form = useForm<z.infer<typeof applicationSchema>>({
        resolver: zodResolver(applicationSchema),
        mode: "onChange",
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            businessName: '',
            websiteType: 'Basic Website',
            industry: '',
            customIndustry: '',
            addons: [],
            goals: '',
            terms: false,
        },
    });

    const steps = [
        { id: 1, title: 'User Details' },
        { id: 2, title: 'Project Details' },
        { id: 3, title: 'Add-Ons' },
        { id: 4, title: 'Select Industry' },
        { id: 5, title: 'Review & Submit' }
    ];

    const handleNextStep = async () => {
        let fieldsToValidate: (keyof z.infer<typeof applicationSchema>)[] = [];
        switch(currentStep) {
            case 1: fieldsToValidate = ['fullName', 'email', 'phone', 'businessName']; break;
            case 2: fieldsToValidate = ['websiteType']; break;
            case 4: fieldsToValidate = ['industry', 'customIndustry']; break;
            case 5: fieldsToValidate = ['terms']; break;
        }

        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            if(currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const totalSteps = steps.length;
    
    function onSubmit(values: z.infer<typeof applicationSchema>) {
        console.log(values);
        const phoneNumber = '917379848171';
        let message = `Free Website Application:\n\n`;
        message += `Name: ${values.fullName}\n`;
        message += `Email: ${values.email}\n`;
        message += `Phone: ${values.phone}\n`;
        message += `Business: ${values.businessName}\n`;
        message += `Website Type: ${values.websiteType}\n`;
        message += `Industry: ${values.industry === 'Custom' ? values.customIndustry : values.industry}\n`;
        if (values.addons && values.addons.length > 0) {
            message += `Add-ons: ${values.addons.join(', ')}\n`;
        }
        if (values.goals) {
            message += `Goals: ${values.goals}\n`;
        }

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        setIsSuccessModalOpen(true);
        form.reset();
        setCurrentStep(1);
    }
    
    const industry = form.watch('industry');
    const INR = String.fromCharCode(8377);

    return (
        <div className="bg-background text-foreground">
            {/* Hero */}
             <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-slate-900 py-20 text-white md:py-32">
                <div className="container relative z-10 text-center">
                    <div className="mb-8 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-md">
                        <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                        </span>
                        Limited-Time Offer – <span className="font-bold">7</span> Slots Remaining
                    </div>
                    <h1 className="mb-8 text-4xl font-black tracking-tight drop-shadow-sm md:text-6xl lg:text-7xl">Get a 100% FREE<br/>Professional Website</h1>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-200 md:text-2xl">Launch your business online with a real, functional website. Generate leads, build trust, and grow – <strong>without spending a dime.</strong></p>
                    <div className="mb-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
                        <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-medium text-white/90 backdrop-blur-sm"><CheckCircle className="text-green-400" /><span>Real Website</span></div>
                        <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-medium text-white/90 backdrop-blur-sm"><CheckCircle className="text-green-400" /><span>Hosting-Ready Code</span></div>
                        <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-medium text-white/90 backdrop-blur-sm"><CheckCircle className="text-green-400" /><span>No Credit Card</span></div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
                        <Button size="lg" className="w-full sm:w-auto pulse-btn" onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}><Rocket className="mr-2"/>Claim Free Website</Button>
                        <Button size="lg" variant="outline" className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>See What's Included</Button>
                    </div>
                </div>
            </section>
            
            {/* What You Get */}
            <section id="features" className="py-24">
                <div className="container">
                    <div className="mb-16 text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">No Strings Attached</span>
                        <h2 className="mt-6 mb-6 text-3xl font-bold md:text-5xl">What You Get For FREE</h2>
                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">Everything you need to establish your online presence – completely free of charge.</p>
                    </div>
                    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:gap-12">
                        <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                             <CardHeader>
                                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg"><Globe className="h-8 w-8" /></div>
                                <CardTitle className="text-2xl">FREE Basic Website</CardTitle>
                                <CardDescription>Perfect for service businesses, professionals, and local brands getting started online.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="mb-8 space-y-4">
                                    <li className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /><span className="text-muted-foreground"><strong className="font-semibold text-foreground">3–5 Page</strong> Professional Website</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /><span className="text-muted-foreground"><strong className="font-semibold text-foreground">Mobile Responsive</strong> Design</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /><span className="text-muted-foreground"><strong className="font-semibold text-foreground">Pre-Designed</strong> Modern Template</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /><span className="text-muted-foreground"><strong className="font-semibold text-foreground">Basic On-Page SEO</strong> Setup</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /><span className="text-muted-foreground"><strong className="font-semibold text-foreground">Contact Form</strong> with Email</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /><span className="text-muted-foreground"><strong className="font-semibold text-foreground">Client-Owned</strong> Content & Assets</span></li>
                                </ul>
                                <div className="border-t pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="mb-1 block text-sm text-muted-foreground">Estimated Value</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-foreground">{INR}0</span>
                                                <span className="text-lg text-muted-foreground line-through">{INR}14,999</span>
                                            </div>
                                        </div>
                                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">100% FREE</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                             <CardHeader>
                                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg"><ShoppingCart className="h-8 w-8" /></div>
                                <CardTitle className="text-2xl">FREE E-Commerce Starter</CardTitle>
                                <CardDescription>Ideal for early-stage e-commerce brands and product sellers ready to sell.</CardDescription>
                            </CardHeader>
                             <CardContent>
                                <ul className="mb-8 space-y-4">
                                    <li className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /><span className="text-muted-foreground"><strong className="font-semibold text-foreground">Professional Storefront</strong> Design</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /><span className="text-muted-foreground">Up to <strong className="font-semibold text-foreground">10 Products</strong> Listed</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /><span className="text-muted-foreground"><strong className="font-semibold text-foreground">Product & Cart</strong> Pages</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /><span className="text-muted-foreground"><strong className="font-semibold text-foreground">Manual Order</strong> (WhatsApp/Email)</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /><span className="text-muted-foreground"><strong className="font-semibold text-foreground">Mobile Responsive</strong> Shopping</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" /><span className="text-muted-foreground"><strong className="font-semibold text-foreground">Product Gallery</strong> & Desc.</span></li>
                                </ul>
                                <div className="border-t pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="mb-1 block text-sm text-muted-foreground">Estimated Value</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-foreground">{INR}0</span>
                                                <span className="text-lg text-muted-foreground line-through">{INR}24,999</span>
                                            </div>
                                        </div>
                                         <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">100% FREE</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Transparency Section */}
            <section className="bg-secondary py-24">
                <div className="container">
                    <Card className="mx-auto max-w-5xl bg-gradient-to-br from-amber-50 to-orange-50 p-8 dark:from-slate-900 dark:to-slate-800 md:p-12">
                        <div className="mb-10 flex items-start gap-5">
                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-amber-100 shadow-sm dark:border-amber-500/20 dark:bg-amber-500/10"><Lightbulb className="text-amber-600 dark:text-amber-400" /></div>
                            <div>
                                <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">Let's Be Transparent</h2>
                                <p className="text-lg text-gray-700 dark:text-gray-200">We believe in honesty. Here's what the free version <span className="font-semibold text-amber-600 dark:text-amber-400">doesn't</span> include:</p>
                            </div>
                        </div>
                        <div className="mb-10 grid gap-x-12 gap-y-6 md:grid-cols-2">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" />No custom design (template-based)</li>
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" />No advanced animations or effects</li>
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" />No payment gateway (e-commerce)</li>
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" />Limited revisions (2 rounds)</li>
                            </ul>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" />Limited support tickets (3/month)</li>
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" />Agency branding in footer</li>
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" />No performance optimization</li>
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" />No conversion rate optimization</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-amber-200/50 bg-white/60 p-6 backdrop-blur-sm dark:border-amber-500/20 dark:bg-black/20">
                            <div className="flex items-start gap-4 md:items-center">
                                <Info className="h-6 w-6 flex-shrink-0 text-primary" />
                                <p className="font-medium leading-relaxed text-gray-700 dark:text-gray-100"><strong className="font-bold text-gray-900 dark:text-white">The free version works perfectly</strong> for getting started. When you're ready to scale, growth features are unlocked through affordable upgrades.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Upgrades Section */}
            <section id="upgrades" className="py-24">
                <div className="container">
                    <div className="mb-16 text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">Scale When Ready</span>
                        <h2 className="mt-6 mb-6 text-3xl font-bold md:text-5xl">Value Enhancements</h2>
                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">Unlock powerful growth tools as your business scales. No pressure – upgrade only when you need it.</p>
                    </div>
                    
                    <Tabs defaultValue="addons" className="mx-auto w-full max-w-5xl">
                        <TabsList className="mb-12 grid h-auto w-full grid-cols-2 md:grid-cols-5">
                            <TabsTrigger value="addons"><Puzzle className="mr-2 h-4 w-4"/>Performance</TabsTrigger>
                            <TabsTrigger value="support"><Headset className="mr-2 h-4 w-4"/>Support Plans</TabsTrigger>
                            <TabsTrigger value="marketing"><Megaphone className="mr-2 h-4 w-4"/>Marketing</TabsTrigger>
                            <TabsTrigger value="ecommerce"><Store className="mr-2 h-4 w-4"/>E-Commerce</TabsTrigger>
                            <TabsTrigger value="bundles"><Gift className="mr-2 h-4 w-4"/>Bundle Offers</TabsTrigger>
                        </TabsList>

                        {/* Addons */}
                        <TabsContent value="addons">
                            <p className="mb-8 text-center text-sm text-muted-foreground"><Info className="mr-2 inline h-4 w-4"/>Prices are starting prices — final cost depends on business needs.</p>
                             <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center dark:border-blue-800 dark:bg-blue-900/20 mb-8"><p className="font-bold leading-relaxed text-blue-950 dark:text-blue-500">Domain and Hosting prices are not included. We offer a 10–15% discount on GoDaddy hosting plans.</p></div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <Card><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30"><FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400"/></div><CardTitle>Extra Pages</CardTitle><CardDescription>Add more pages to your website.</CardDescription></CardHeader><CardContent><div className="border-t pt-4"><span className="text-2xl font-bold text-primary">{INR}499+</span><span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">per page</span></div></CardContent></Card>
                                <Card><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/30"><Paintbrush className="h-6 w-6 text-purple-600 dark:text-purple-400"/></div><CardTitle>Custom UI/UX Design</CardTitle><CardDescription>Tailored design per device & brand identity.</CardDescription></CardHeader><CardContent><div className="border-t pt-4"><span className="text-2xl font-bold text-primary">{INR}999+</span><span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">one-time</span></div></CardContent></Card>
                                <Card><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/30"><Gauge className="h-6 w-6 text-green-600 dark:text-green-400"/></div><CardTitle>Speed Optimization</CardTitle><CardDescription>Performance tuning for lightning-fast load speeds.</CardDescription></CardHeader><CardContent><div className="border-t pt-4"><span className="text-2xl font-bold text-primary">{INR}899</span><span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">one-time</span></div></CardContent></Card>
                                <Card><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30"><MessageCircleIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400"/></div><CardTitle>WhatsApp Integration</CardTitle><CardDescription>Quick user engagement with direct WhatsApp chat button.</CardDescription></CardHeader><CardContent><div className="border-t pt-4"><span className="text-2xl font-bold text-primary">{INR}299</span><span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">one-time</span></div></CardContent></Card>
                                <Card><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30"><Bot className="h-6 w-6 text-blue-600 dark:text-blue-400"/></div><CardTitle>Chatbot Integration</CardTitle><CardDescription>24/7 automated support based on AI model & tech stack.</CardDescription></CardHeader><CardContent><div className="border-t pt-4"><span className="text-2xl font-bold text-primary">{INR}999+</span><span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">one-time</span></div></CardContent></Card>
                                <Card><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-900/30"><CalendarCheck className="h-6 w-6 text-orange-600 dark:text-orange-400"/></div><CardTitle>Booking System</CardTitle><CardDescription>Online appointment scheduling based on complexity & workflows.</CardDescription></CardHeader><CardContent><div className="border-t pt-4"><span className="text-2xl font-bold text-primary">{INR}1,499+</span><span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">one-time</span></div></CardContent></Card>
                            </div>
                        </TabsContent>

                        {/* Support Plans */}
                        <TabsContent value="support">
                            <div className="grid items-start gap-8 md:grid-cols-3">
                                <Card><CardHeader><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">1</div><CardTitle>Basic Support</CardTitle></div></CardHeader><CardContent><p className="mb-6 min-h-[40px] text-sm text-muted-foreground">Peace-of-mind support for small businesses.</p><div className="mb-6 border-b pb-6"><span className="text-4xl font-bold text-primary">{INR}499</span><span className="text-muted-foreground">/month</span></div><ul className="mb-8 space-y-4 text-sm"><li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" />Up to 5 Support Tickets</li><li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" />24-48 Hour Response</li><li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" />Monthly Site Monitoring</li><li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" />Email Support</li></ul><Button variant="outline" className="w-full">Choose Plan</Button></CardContent></Card>
                                <Card className="relative z-10 scale-105 border-primary bg-primary text-primary-foreground"><div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">Most Popular</div><CardHeader><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">2</div><CardTitle>Growth Support</CardTitle></div></CardHeader><CardContent><p className="mb-6 min-h-[40px] text-sm text-indigo-100">For growing businesses ready to scale with priority support.</p><div className="mb-6 border-b border-white/20 pb-6"><span className="text-4xl font-bold">{INR}1,499</span><span className="text-indigo-200">/month</span></div><ul className="mb-8 space-y-4 text-sm"><li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400"/>30 Support Tickets/mo</li><li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400"/>12-24 Hour Response</li><li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400"/>WhatsApp & Email</li><li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400"/>Priority Bug Fixes</li><li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400"/>Monthly Backups</li></ul><Button variant="secondary" className="w-full bg-white text-primary hover:bg-slate-200">Choose Growth</Button></CardContent></Card>
                                <Card><CardHeader><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">3</div><CardTitle>Premium Support</CardTitle></div></CardHeader><CardContent><p className="mb-6 min-h-[40px] text-sm text-muted-foreground">Ideal for mission-critical websites & eCommerce.</p><div className="mb-6 border-b pb-6"><span className="text-4xl font-bold text-primary">{INR}3,499</span><span className="text-muted-foreground">/month</span></div><ul className="mb-8 space-y-4 text-sm"><li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500"/>Dedicated Engineer</li><li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500"/>4-Hour Response SLA</li><li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500"/>Phone Consultations</li><li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500"/>Weekly Backups</li></ul><Button variant="outline" className="w-full">Choose Plan</Button></CardContent></Card>
                            </div>
                        </TabsContent>
                        
                        {/* Marketing Tab */}
                        <TabsContent value="marketing">
                             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <Card><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30"><Search className="h-6 w-6 text-blue-600 dark:text-blue-400"/></div><CardTitle>SEO Services</CardTitle><CardDescription>Ranking, keyword & content optimization.</CardDescription></CardHeader><CardContent><div className="border-t pt-4"><span className="text-2xl font-bold text-primary">{INR}1,999+</span><span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">/month</span></div></CardContent></Card>
                                <Card><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/30"><Megaphone className="h-6 w-6 text-red-600 dark:text-red-400"/></div><CardTitle>Google Ads</CardTitle><CardDescription>Campaign setup & ongoing optimization.</CardDescription></CardHeader><CardContent><div className="border-t pt-4"><span className="text-2xl font-bold text-primary">{INR}1,499+</span><span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">/month</span></div></CardContent></Card>
                                <Card><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 dark:bg-pink-900/30"><Hash className="h-6 w-6 text-pink-600 dark:text-pink-400"/></div><CardTitle>Social Media</CardTitle><CardDescription>Content, posting & community growth.</CardDescription></CardHeader><CardContent><div className="border-t pt-4"><span className="text-2xl font-bold text-primary">{INR}1,999+</span><span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">/month</span></div></CardContent></Card>
                                <Card><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30"><Filter className="h-6 w-6 text-indigo-600 dark:text-indigo-400"/></div><CardTitle>Funnels & Automation</CardTitle><CardDescription>Lead flows, emails & conversion tracking.</CardDescription></CardHeader><CardContent><div className="border-t pt-4"><span className="text-2xl font-bold text-primary">{INR}1,999+</span><span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">one-time</span></div></CardContent></Card>
                            </div>
                        </TabsContent>

                        {/* E-commerce Tab */}
                        <TabsContent value="ecommerce">
                             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <Card><CardHeader><div className="mb-4 flex justify-between items-start"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/30"><SmartphoneIcon className="h-6 w-6 text-green-600 dark:text-green-400"/></div><span className="text-xl font-bold text-foreground">{INR}499</span></div><CardTitle>UPI Integration</CardTitle><CardDescription>Accept payments via UPI for Indian customers.</CardDescription></CardHeader></Card>
                                <Card><CardHeader><div className="mb-4 flex justify-between items-start"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30"><CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400"/></div><span className="text-xl font-bold text-foreground">{INR}999</span></div><CardTitle>International Payments</CardTitle><CardDescription>Stripe, PayPal & international gateway setup.</CardDescription></CardHeader></Card>
                                <Card><CardHeader><div className="mb-4 flex justify-between items-start"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/30"><Box className="h-6 w-6 text-purple-600 dark:text-purple-400"/></div><span className="text-xl font-bold text-foreground">{INR}99+</span></div><CardTitle>Product Listing</CardTitle><CardDescription>Add products with images, descriptions & pricing.</CardDescription></CardHeader></Card>
                                <Card><CardHeader><div className="mb-4 flex justify-between items-start"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-900/30"><Cog className="h-6 w-6 text-orange-600 dark:text-orange-400"/></div><Badge>Custom</Badge></div><CardTitle>Store Automation</CardTitle><CardDescription>Inventory management and order automation.</CardDescription></CardHeader></Card>
                            </div>
                        </TabsContent>
                        
                        {/* Bundles Tab */}
                        <TabsContent value="bundles">
                             <div className="grid items-start gap-8 md:grid-cols-3">
                                <Card><CardHeader><CardTitle>Startup Pack</CardTitle><CardDescription>For new businesses</CardDescription></CardHeader><CardContent><div className="mb-6"><span className="text-4xl font-bold text-primary">{INR}4,999</span><span className="ml-2 text-muted-foreground line-through">{INR}7,499</span></div><ul className="mb-8 space-y-3 text-sm"><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>5-page Website</li><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>Custom UI/UX Design</li><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>Speed Optimization</li><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>1 Month Basic Support</li></ul><Button variant="outline" className="w-full">Get Started</Button></CardContent></Card>
                                <Card className="relative z-10 scale-105 border-primary bg-primary text-primary-foreground"><div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">Best Value</div><CardHeader><CardTitle>Growth Pack</CardTitle><CardDescription className="text-indigo-200">Scale with confidence</CardDescription></CardHeader><CardContent><div className="mb-6"><span className="text-4xl font-bold">{INR}9,999</span><span className="ml-2 text-indigo-200 line-through">{INR}15,999</span></div><ul className="mb-8 space-y-3 text-sm"><li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400"/>10-page Website</li><li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400"/>Premium UI/UX Design</li><li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400"/>Booking System</li><li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400"/>SEO Starter Setup</li><li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400"/>1 Month Growth Support</li></ul><Button variant="secondary" className="w-full bg-white text-primary hover:bg-slate-200">Get Started</Button></CardContent></Card>
                                <Card><CardHeader><CardTitle>Accelerator</CardTitle><CardDescription>Complete growth solution</CardDescription></CardHeader><CardContent><div className="mb-6"><span className="text-4xl font-bold text-primary">{INR}19,999</span><span className="ml-2 text-muted-foreground line-through">{INR}32,999</span></div><ul className="mb-8 space-y-3 text-sm"><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>Full Custom Website</li><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>All Integrations</li><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>SEO + Social + Ads</li><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>3 Months Support</li></ul><Button variant="outline" className="w-full">Get Started</Button></CardContent></Card>
                             </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
            
            {/* Journey Section */}
            <section id="journey" className="bg-secondary py-24">
                <div className="container">
                    <div className="mb-16 text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">Simple Process</span>
                        <h2 className="mt-6 mb-6 text-3xl font-bold md:text-5xl">Your Journey</h2>
                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">From application to launch in 4 simple steps.</p>
                    </div>
                    <div className="relative mx-auto max-w-4xl">
                        <div className="absolute top-0 bottom-0 left-1/2 -ml-0.5 hidden w-1 bg-gradient-to-b from-primary to-purple-500 opacity-30 md:block"></div>
                        <div className="space-y-16">
                            {[
                                { step: 1, title: "Apply for Free Website", description: "Fill out a simple form with your business details and goals. Takes less than 2 minutes.", icon: Edit, label: "2 Min Application" },
                                { step: 2, title: "Approval Confirmation", description: "Our team reviews your application within 24 hours. Approved? You'll get a welcome email!", icon: Mail, label: "Email Confirmation" },
                                { step: 3, title: "Website Build", description: "Our designers and developers create your professional website in 7–10 business days.", icon: Code, label: "7–10 Business Days" },
                                { step: 4, title: "Launch Your Website", description: "Review, approve, and launch your new website. You're officially online!", icon: Rocket, label: "Go Live!" },
                            ].map((item, index) => (
                                <div key={item.step} className="group relative flex flex-col items-center gap-8 md:flex-row">
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-3 md:text-left md:pl-12'}`}>
                                        <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                                        <p className="leading-relaxed text-muted-foreground">{item.description}</p>
                                    </div>
                                    <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary font-bold text-white shadow-lg transition-transform group-hover:scale-110 md:order-2">
                                        {item.step}
                                    </div>
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:order-1 md:text-right md:pr-12'}`}>
                                        <div className="inline-flex items-center gap-4 rounded-2xl border bg-background p-4 shadow-sm">
                                            <item.icon className="h-6 w-6 text-primary" />
                                            <span className="font-medium text-muted-foreground">{item.label}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Application Form */}
            <section id="apply" className="py-24">
                <div className="container max-w-4xl">
                     <div className="mb-16 text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">Start Your Journey</span>
                        <h2 className="mt-6 mb-6 text-3xl font-bold md:text-5xl">Apply for Your Free Website</h2>
                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">No credit card required. No obligations. Just fill out the form below.</p>
                    </div>
                     <Card>
                        <CardHeader>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Step {currentStep} of {totalSteps}</span>
                                <span className="text-xs font-bold text-primary">{steps[currentStep - 1].title}</span>
                            </div>
                            <Progress value={(currentStep / totalSteps) * 100} />
                        </CardHeader>
                        <CardContent>
                           <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    {currentStep === 1 && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-bold">Tell us about yourself</h3>
                                            <div className="grid gap-8 md:grid-cols-2">
                                                <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Your Full Name</FormLabel><FormControl><Input placeholder="John Smith" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                                <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="john@company.com" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                            </div>
                                             <div className="grid gap-8 md:grid-cols-2">
                                                <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                                <FormField control={form.control} name="businessName" render={({ field }) => (<FormItem><FormLabel>Business Name</FormLabel><FormControl><Input placeholder="Your Business Name" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                                            </div>
                                        </div>
                                    )}
                                    {currentStep === 2 && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-bold">What type of website do you need?</h3>
                                            <FormField control={form.control} name="websiteType" render={({ field }) => (
                                                <FormItem className="space-y-3"><FormLabel>Website Category</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Basic Website">Basic Website</SelectItem>
                                                                <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                <FormMessage /></FormItem>
                                            )}/>
                                        </div>
                                    )}
                                    {currentStep === 3 && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-bold">Select Add-Ons & Enhancements (Optional)</h3>
                                            {/* Simplified Checkboxes for brevity */}
                                            <FormField control={form.control} name="addons" render={() => (
                                                <FormItem>
                                                    <div className="grid gap-3 md:grid-cols-2">
                                                    {[ "Custom UI/UX Design", "Speed Optimization", "Extra Pages", "WhatsApp Integration", "Chatbot Integration", "Booking System" ].map((item) => (
                                                        <FormField key={item} control={form.control} name="addons"
                                                            render={({ field }) => (
                                                            <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                                                <FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {return checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter((value) => value !== item))}}/></FormControl>
                                                                <FormLabel className="font-normal">{item}</FormLabel>
                                                            </FormItem>
                                                            )}
                                                        />
                                                    ))}
                                                    </div>
                                                </FormItem>
                                            )}/>
                                        </div>
                                    )}
                                    {currentStep === 4 && (
                                        <div className="space-y-6">
                                             <h3 className="text-xl font-bold">Select Industry</h3>
                                             <FormField control={form.control} name="industry" render={({ field }) => (
                                                 <FormItem><FormLabel>Industry/Niche</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl><SelectTrigger><SelectValue placeholder="Select your industry..." /></SelectTrigger></FormControl>
                                                        <SelectContent>
                                                            {[ "Professional Services", "Healthcare & Wellness", "Retail & E-Commerce", "Food & Restaurant", "Real Estate", "Education & Coaching", "Technology & SaaS", "Creative & Design", "Construction & Home Services", "Custom" ].map(item => (
                                                                <SelectItem key={item} value={item}>{item}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                 <FormMessage /></FormItem>
                                             )}/>
                                             {industry === 'Custom' && (
                                                 <FormField control={form.control} name="customIndustry" render={({ field }) => (
                                                     <FormItem><FormLabel>Please Specify</FormLabel><FormControl><Input placeholder="Enter your industry" {...field} /></FormControl><FormMessage /></FormItem>
                                                 )}/>
                                             )}
                                        </div>
                                    )}
                                     {currentStep === 5 && (
                                        <div className="space-y-6">
                                             <h3 className="text-xl font-bold">Review & Submit</h3>
                                             <div className="space-y-4 rounded-xl border bg-secondary p-6">
                                                 <div className="grid grid-cols-2 gap-4 text-sm"><p><span className="block text-xs uppercase text-muted-foreground">Name</span><span className="font-semibold">{form.watch('fullName') || '-'}</span></p><p><span className="block text-xs uppercase text-muted-foreground">Email</span><span className="font-semibold">{form.watch('email') || '-'}</span></p></div>
                                                 <div className="grid grid-cols-2 gap-4 text-sm"><p><span className="block text-xs uppercase text-muted-foreground">Phone</span><span className="font-semibold">{form.watch('phone') || '-'}</span></p><p><span className="block text-xs uppercase text-muted-foreground">Business</span><span className="font-semibold">{form.watch('businessName') || '-'}</span></p></div>
                                                 <div className="grid grid-cols-2 gap-4 text-sm"><p><span className="block text-xs uppercase text-muted-foreground">Plan</span><span className="font-semibold">{form.watch('websiteType') || '-'}</span></p><p><span className="block text-xs uppercase text-muted-foreground">Industry</span><span className="font-semibold">{form.watch('industry') === 'Custom' ? form.watch('customIndustry') : form.watch('industry') || '-'}</span></p></div>
                                                 {form.watch('addons')?.length > 0 && <div className="text-sm"><span className="block text-xs uppercase text-muted-foreground">Add-Ons</span><ul className="list-inside list-disc font-medium">{(form.watch('addons') || []).map(a => <li key={a}>{a}</li>)}</ul></div>}
                                             </div>
                                             <FormField control={form.control} name="terms" render={({ field }) => (
                                                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>I agree to the Terms of Service and understand I will be redirected to WhatsApp to complete my application.</FormLabel><FormMessage/></div></FormItem>
                                             )}/>
                                        </div>
                                    )}
                                    <div className="mt-8 flex items-center justify-between border-t pt-6">
                                        <Button type="button" variant="ghost" onClick={handlePrevStep} className={currentStep === 1 ? 'hidden' : ''}>Back</Button>
                                        <div className="flex-1"></div>
                                        {currentStep < totalSteps && <Button type="button" onClick={handleNextStep}>Next Step <ArrowRight className="ml-2 h-4 w-4"/></Button>}
                                        {currentStep === totalSteps && <Button type="submit"><MessageCircleIcon className="mr-2 h-4 w-4"/>Submit via WhatsApp</Button>}
                                    </div>
                                </form>
                           </Form>
                        </CardContent>
                     </Card>
                </div>
            </section>
            
            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent>
                    <DialogHeader className="text-center items-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-6"><Check className="h-10 w-10 text-green-500"/></div>
                        <DialogTitle className="text-2xl">Application Submitted!</DialogTitle>
                        <p className="text-muted-foreground">Thank you for applying! We'll review your application and get back to you within 24 hours.</p>
                        <div className="mt-8 rounded-xl bg-secondary p-4"><p className="flex items-center justify-center gap-2 text-sm text-muted-foreground"><MailIcon className="h-4 w-4"/>Check your email for a confirmation message.</p></div>
                    </DialogHeader>
                    <DialogClose asChild><Button className="w-full">Got It!</Button></DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    );
}

```