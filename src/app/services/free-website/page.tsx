
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  CheckCircle, Code, Gift, Headset, Info, Lightbulb, Mail, Megaphone, Paintbrush, Puzzle, Rocket,
  Search, ShoppingCart, Star, Store, Users, XCircle, Check, FileText, Gauge, MessageCircle as MessageCircleIcon,
  Bot, CalendarCheck, Smartphone, CreditCard, Filter, Hash, Box, Cog, Smartphone as SmartphoneIcon,
  ChevronDown, ArrowRight, Hand, Eye, Wrench, ShieldCheck, MailIcon, MapPin, Phone, Send, Linkedin, Twitter, Instagram, ArrowUp, Globe, Edit, Code2,
  AlertTriangle
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
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

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
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [slotsRemaining, setSlotsRemaining] = useState(0);

     useEffect(() => {
        // Generate a random number of slots between 1 and 9, only on client-side
        setSlotsRemaining(Math.floor(Math.random() * 9) + 1);

        const timer = setInterval(() => {
            const now = new Date();
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const distance = endOfMonth.getTime() - now.getTime();

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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

        const isValid = fieldsToValidate.length > 0 ? await form.trigger(fieldsToValidate) : true;
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
    
    const scrollToApply = () => {
        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
    }

    const journeySteps = [
        { step: 1, title: "Apply for Free Website", description: "Fill out a simple form with your business details and goals. Takes less than 2 minutes.", icon: Edit, label: "2 Min Application" },
        { step: 2, title: "Approval Confirmation", description: "Our team reviews your application within 24 hours. Approved? You'll get a welcome email!", icon: Mail, label: "Email Confirmation" },
        { step: 3, title: "Website Build", description: "Our designers and developers create your professional website in 7–10 business days.", icon: Code, label: "7–10 Business Days" },
        { step: 4, title: "Launch Your Website", description: "Review, approve, and launch your new website. You're officially online!", icon: Rocket, label: "Go Live!" },
    ];
    
    const addonGroups = [
        {
            title: "Performance & Design",
            icon: Rocket,
            items: [
                { value: "Custom UI/UX Design", title: "Custom UI/UX Design", description: "Tailored branding & unique layout", price: "INR 999+", icon: Paintbrush },
                { value: "Speed Optimization", title: "Speed Optimization", description: "Faster load times & higher scores", price: "INR 899", icon: Gauge },
                { value: "Extra Pages", title: "Extra Pages", description: "Additional pages beyond basic 3-5", price: "INR 499+", icon: FileText },
                { value: "WhatsApp Integration", title: "WhatsApp Integration", description: "Direct chat button for visitors", price: "INR 299", icon: MessageCircleIcon },
                { value: "Chatbot Integration", title: "Chatbot Integration", description: "24/7 automated AI support", price: "INR 999+", icon: Bot },
                { value: "Booking System", title: "Booking System", description: "Appointment scheduling tool", price: "INR 1,499+", icon: CalendarCheck },
            ]
        },
        {
            title: "Support Plans",
            icon: Headset,
            items: [
                 { value: "Basic Support Plan", title: "Basic Support (INR 499/mo)", description: "5 tickets, 48hr response"},
                 { value: "Growth Support Plan", title: "Growth Support (INR 1,499/mo)", description: "30 tickets, Priority, WhatsApp"},
                 { value: "Premium Support Plan", title: "Premium Support (INR 3,499/mo)", description: "Dedicated engineer, 4hr SLA"},
            ]
        },
        {
            title: "Marketing & Growth",
            icon: Megaphone,
            items: [
                { value: "SEO Services", title: "SEO Services", description: "Rank higher on Google" },
                { value: "Google Ads", title: "Google Ads", description: "Setup & campaign management" },
                { value: "Social Media", title: "Social Media Marketing", description: "Content & growth strategy" },
                { value: "Funnels & Automation", title: "Funnels & Automation", description: "Lead flows & conversion tracking" },
            ]
        },
         {
            title: "E-Commerce & Payments",
            icon: ShoppingCart,
            items: [
                { value: "UPI Integration", title: "UPI Integration", description: "Accept UPI payments" },
                { value: "International Payments", title: "International Payments", description: "Stripe/PayPal setup" },
                { value: "Product Listing", title: "Product Listing", description: "Images, descriptions & pricing" },
                { value: "Store Automation", title: "Store Automation", description: "Inventory & order automation" },
                { value: "Marketing Tools", title: "Marketing Tools", description: "Coupons, upsells & recovery" },
                { value: "Product Subscriptions", title: "Product Subscriptions", description: "Recurring billing setup" },
            ]
        },
        {
            title: "Value Bundles",
            icon: Gift,
            items: [
                 { value: "Startup Pack Bundle", title: "Startup Pack (INR 4,999)", description: "5-page site, design & speed"},
                 { value: "Growth Pack Bundle", title: "Growth Pack (INR 9,999)", description: "10-page, booking, SEO"},
                 { value: "Accelerator Bundle", title: "Accelerator (INR 19,999)", description: "Full custom site & growth"},
            ]
        },
    ];

    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-slate-900 py-20 text-white md:py-32">
                 <div className="bubbles">
                    {[...Array(10)].map((_, i) => <div key={i} className="bubble" />)}
                </div>
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#002D6B] rounded-full blur-[120px]"></div>
                </div>

                <div className="container relative z-10 text-center">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-md">
                        <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                        </span>
                        Limited-Time Offer – <span className="font-bold">{slotsRemaining}</span> Slots Remaining This Month
                    </div>
                    <h1 className="mb-8 text-4xl font-black tracking-tight drop-shadow-sm md:text-6xl lg:text-7xl">Get a 100% FREE<br/>Professional Website</h1>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-200 md:text-2xl">Launch your business online with a real, functional website. Generate leads, build trust, and grow – <strong>without spending a dime.</strong></p>
                    <div className="mb-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
                        <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-medium text-white/90 backdrop-blur-sm"><CheckCircle className="text-green-400" /><span>Real Website</span></div>
                        <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-medium text-white/90 backdrop-blur-sm"><CheckCircle className="text-green-400" /><span>Hosting-Ready Code</span></div>
                        <div className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-medium text-white/90 backdrop-blur-sm"><CheckCircle className="text-green-400" /><span>No Credit Card</span></div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
                        <Button size="lg" className="w-full sm:w-auto animation-pulse-strong" onClick={scrollToApply}><Rocket className="mr-2"/>Claim Free Website</Button>
                        <Button size="lg" variant="outline" className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>See What's Included</Button>
                    </div>
                    
                    {/* Countdown Timer */}
                    <div className="mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-2xl mx-auto border border-white/10 shadow-2xl shadow-[#002D6B]/20">
                         <div className="flex justify-between items-center mb-4">
                            <p className="text-white/90 text-sm font-semibold uppercase tracking-wider">Offer Expires In</p>
                            <Badge variant="destructive" className="animate-pulse">Few slots left</Badge>
                        </div>
                        <div className="flex justify-center gap-3 md:gap-6">
                            <div className="text-center">
                                <div className="bg-white/20 rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] backdrop-blur-sm">
                                    <span className="text-2xl md:text-4xl font-bold text-white font-mono">{String(timeLeft.days).padStart(2, '0')}</span>
                                </div>
                                <span className="text-white/70 text-xs mt-2 block font-medium">Days</span>
                            </div>
                            <div className="text-center">
                                <div className="bg-white/20 rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] backdrop-blur-sm">
                                    <span className="text-2xl md:text-4xl font-bold text-white font-mono">{String(timeLeft.hours).padStart(2, '0')}</span>
                                </div>
                                <span className="text-white/70 text-xs mt-2 block font-medium">Hours</span>
                            </div>
                            <div className="text-center">
                                <div className="bg-white/20 rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] backdrop-blur-sm">
                                    <span className="text-2xl md:text-4xl font-bold text-white font-mono">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                </div>
                                <span className="text-white/70 text-xs mt-2 block font-medium">Minutes</span>
                            </div>
                            <div className="text-center">
                                <div className="bg-white/20 rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] backdrop-blur-sm">
                                    <span className="text-2xl md:text-4xl font-bold text-white font-mono">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                </div>
                                <span className="text-white/70 text-xs mt-2 block font-medium">Seconds</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You Get Section */}
            <section id="features" className="py-24 bg-background relative">
                <div className="container">
                    <div className="text-center mb-16">
                        <Badge variant="secondary" className="text-sm">No Strings Attached</Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-6 mb-6">What You Get For FREE</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Everything you need to establish your online presence – completely free of charge.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                        {/* Basic Website Card */}
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
                                <div className="relative z-10 border-t pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Estimated Value</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-foreground">INR 0</span>
                                                <span className="text-lg text-muted-foreground line-through">INR 14,999</span>
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">100% FREE</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                         {/* E-commerce Card */}
                        <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <CardHeader>
                                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-lg"><ShoppingCart className="h-8 w-8" /></div>
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
                                <div className="relative z-10 border-t pt-6">
                                     <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Estimated Value</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-foreground">INR 0</span>
                                                <span className="text-lg text-muted-foreground line-through">INR 24,999</span>
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">100% FREE</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            
            {/* Transparency Section */}
            <section className="py-24 bg-secondary border-y">
                <div className="container max-w-5xl">
                    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800/50 p-8 md:p-12 border-amber-200/50 dark:border-amber-500/30 shadow-lg">
                        <div className="flex items-start gap-5 mb-10">
                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200/80 dark:border-amber-500/20"><Lightbulb className="h-7 w-7"/></div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Let's Be Transparent</h2>
                                <p className="text-lg text-gray-700 dark:text-gray-200">We believe in honesty. Here's what the free version <span className="font-semibold text-amber-600 dark:text-amber-400">doesn't</span> include:</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" /><span>No custom design (template-based)</span></li>
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" /><span>No advanced animations or effects</span></li>
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" /><span>No payment gateway (e-commerce)</span></li>
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" /><span>Limited revisions (2 rounds)</span></li>
                            </ul>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" /><span>Limited support tickets (3/month)</span></li>
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" /><span>Agency branding in footer</span></li>
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" /><span>No performance optimization</span></li>
                                <li className="flex items-center gap-3"><XCircle className="h-5 w-5 text-slate-400" /><span>No conversion rate optimization</span></li>
                            </ul>
                        </div>
                        <div className="rounded-2xl bg-white/60 p-6 dark:bg-black/20 border border-amber-200/50 dark:border-amber-500/20 backdrop-blur-sm">
                            <div className="flex items-start gap-4 md:items-center">
                                <Info className="h-6 w-6 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                                <p className="leading-relaxed font-medium text-slate-800 dark:text-slate-200"><strong className="text-slate-900 dark:text-white">The free version works perfectly</strong> for getting started. When you're ready to scale, growth features are unlocked through affordable upgrades.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
            
            {/* Upgrades Section */}
            <section id="upgrades" className="py-24 bg-background">
                <div className="container">
                    <div className="text-center mb-16">
                        <Badge variant="secondary" className="text-sm">Scale When Ready</Badge>
                        <h2 className="mt-6 mb-6 text-3xl font-bold text-foreground md:text-5xl">Value Enhancements</h2>
                        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">Unlock powerful growth tools as your business scales. No pressure – upgrade only when you need it.</p>
                    </div>

                    <Tabs defaultValue="addons" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto">
                            <TabsTrigger value="addons"><Rocket className="mr-2 h-4 w-4"/>Performance</TabsTrigger>
                            <TabsTrigger value="support"><Headset className="mr-2 h-4 w-4"/>Support Plans</TabsTrigger>
                            <TabsTrigger value="marketing"><Megaphone className="mr-2 h-4 w-4"/>Marketing</TabsTrigger>
                            <TabsTrigger value="ecommerce"><Store className="mr-2 h-4 w-4"/>E-Commerce</TabsTrigger>
                            <TabsTrigger value="bundles"><Gift className="mr-2 h-4 w-4"/>Bundle Offers</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="addons" className="mt-8">
                            <div className="mx-auto mb-8 max-w-3xl text-center">
                                <p className="mb-4 inline-block rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground"><Info className="mr-2 inline h-4 w-4"/>Prices are starting prices — final cost depends on business needs.</p>
                                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20"><p className="font-bold leading-relaxed text-blue-950 dark:text-blue-500">Domain and Hosting prices are not included in this package. If you want to buy hosting and domain from us, we provide an additional 10–15% discount compared to the market price.<br/><br/><strong className="text-xs">We are powered by GoDaddy.</strong></p></div>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {addonGroups.find(g => g.title === "Performance & Design")?.items.map(item => (
                                    <Card key={item.title} className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"><item.icon className="h-6 w-6"/></div><CardTitle>{item.title}</CardTitle><CardDescription>{item.description}</CardDescription></CardHeader><CardContent><div className="flex items-center justify-between border-t pt-4"><span className="text-2xl font-bold text-primary">{item.price}</span><span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">one-time</span></div></CardContent></Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="support" className="mt-8">
                             <div className="grid items-start gap-8 mx-auto max-w-5xl md:grid-cols-3">
                                <Card className="border"><CardHeader><div className="mb-4 flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">1</div><CardTitle>Basic Support</CardTitle></div><CardDescription className="min-h-[40px] text-sm">Perfect for small business owners who need consistent peace-of-mind support.</CardDescription></CardHeader><CardContent><div className="mb-6 border-b pb-6"><span className="text-4xl font-bold text-primary">INR 499</span><span className="text-muted-foreground">/month</span></div><ul className="mb-8 space-y-4 text-sm"><li className="flex items-center gap-3 text-muted-foreground"><Check className="h-5 w-5 text-green-500"/>Up to 5 Support Tickets</li><li className="flex items-center gap-3 text-muted-foreground"><Check className="h-5 w-5 text-green-500"/>24-48 Hour Response</li><li className="flex items-center gap-3 text-muted-foreground"><Check className="h-5 w-5 text-green-500"/>Monthly Site Monitoring</li><li className="flex items-center gap-3 text-muted-foreground"><Check className="h-5 w-5 text-green-500"/>Email Support</li></ul><Button variant="outline" className="w-full">Choose Plan</Button></CardContent></Card>
                                <Card className="relative z-10 scale-105 transform border-2 border-primary bg-primary text-primary-foreground shadow-2xl"><div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">Most Popular</div><CardHeader><div className="mb-4 flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">2</div><CardTitle>Growth Support</CardTitle></div><CardDescription className="min-h-[40px] text-indigo-100 text-sm">For growing businesses ready to scale with priority support.</CardDescription></CardHeader><CardContent><div className="mb-6 border-b border-white/20 pb-6"><span className="text-4xl font-bold">INR 1,499</span><span className="text-indigo-200">/month</span></div><ul className="mb-8 space-y-4 text-sm"><li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400"/>30 Support Tickets/mo</li><li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400"/>12-24 Hour Response</li><li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400"/>WhatsApp & Email</li><li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400"/>Priority Bug Fixes</li><li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400"/>Monthly Backups</li></ul><Button variant="secondary" className="w-full bg-white text-primary hover:bg-slate-200">Choose Growth</Button></CardContent></Card>
                                <Card className="border"><CardHeader><div className="mb-4 flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">3</div><CardTitle>Premium Support</CardTitle></div><CardDescription className="min-h-[40px] text-sm">Ideal for mission-critical websites & eCommerce.</CardDescription></CardHeader><CardContent><div className="mb-6 border-b pb-6"><span className="text-4xl font-bold text-primary">INR 3,499</span><span className="text-muted-foreground">/month</span></div><ul className="mb-8 space-y-4 text-sm"><li className="flex items-center gap-3 text-muted-foreground"><Check className="h-5 w-5 text-green-500"/>Dedicated Engineer</li><li className="flex items-center gap-3 text-muted-foreground"><Check className="h-5 w-5 text-green-500"/>4-Hour Response SLA</li><li className="flex items-center gap-3 text-muted-foreground"><Check className="h-5 w-5 text-green-500"/>Phone Consultations</li><li className="flex items-center gap-3 text-muted-foreground"><Check className="h-5 w-5 text-green-500"/>Weekly Backups</li></ul><Button variant="outline" className="w-full">Choose Plan</Button></CardContent></Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="marketing" className="mt-8">
                             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {addonGroups.find(g => g.title === "Marketing & Growth")?.items.map(item => (
                                    <Card key={item.title} className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"><Search className="h-6 w-6"/></div><CardTitle>{item.title}</CardTitle><CardDescription>{item.description}</CardDescription></CardHeader><CardContent><div className="border-t pt-4"><span className="text-2xl font-bold text-primary">INR 1,999+</span><span className="text-xs text-muted-foreground">/month</span></div></CardContent></Card>
                                ))}
                            </div>
                        </TabsContent>
                         <TabsContent value="ecommerce" className="mt-8">
                             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {addonGroups.find(g => g.title === "E-Commerce & Payments")?.items.map(item => (
                                    <Card key={item.title} className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"><CardHeader><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"><CreditCard className="h-6 w-6"/></div><CardTitle>{item.title}</CardTitle><CardDescription>{item.description}</CardDescription></CardHeader><CardContent><div className="border-t pt-4"><span className="text-2xl font-bold text-primary">INR 499+</span><span className="text-xs text-muted-foreground"> one-time</span></div></CardContent></Card>
                                ))}
                            </div>
                        </TabsContent>
                         <TabsContent value="bundles" className="mt-8">
                             <div className="grid items-start gap-8 mx-auto max-w-6xl md:grid-cols-3">
                                 <Card><CardHeader><CardTitle>Startup Pack</CardTitle><CardDescription>For new businesses</CardDescription></CardHeader><CardContent><div className="mb-6"><span className="text-4xl font-bold text-primary">INR 4,999</span><span className="ml-2 text-muted-foreground line-through">INR 7,499</span></div><ul className="mb-8 space-y-3 text-sm"><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>5-page Website</li><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>Custom UI/UX Design</li><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>Speed Optimization</li><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>1 Month Basic Support</li></ul><Button variant="outline" className="w-full">Get Started</Button></CardContent></Card>
                                <Card className="relative z-10 scale-105 border-primary bg-primary text-primary-foreground"><div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">Best Value</div><CardHeader><CardTitle>Growth Pack</CardTitle><CardDescription className="text-indigo-200">Scale with confidence</CardDescription></CardHeader><CardContent><div className="mb-6"><span className="text-4xl font-bold">INR 9,999</span><span className="ml-2 text-indigo-200 line-through">INR 15,999</span></div><ul className="mb-8 space-y-3 text-sm"><li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400"/>10-page Website</li><li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400"/>Premium UI/UX Design</li><li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400"/>Booking System</li><li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400"/>SEO Starter Setup</li><li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400"/>1 Month Growth Support</li></ul><Button variant="secondary" className="w-full bg-white text-primary hover:bg-slate-200">Get Started</Button></CardContent></Card>
                                <Card><CardHeader><CardTitle>Accelerator</CardTitle><CardDescription>Complete growth solution</CardDescription></CardHeader><CardContent><div className="mb-6"><span className="text-4xl font-bold text-primary">INR 19,999</span><span className="ml-2 text-muted-foreground line-through">INR 32,999</span></div><ul className="mb-8 space-y-3 text-sm"><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>Full Custom Website</li><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>All Integrations</li><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>SEO + Social + Ads</li><li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/>3 Months Support</li></ul><Button variant="outline" className="w-full">Get Started</Button></CardContent></Card>
                             </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
            
             {/* Client Journey Section */}
            <section id="journey" className="py-24 bg-secondary relative overflow-hidden">
                <div className="container relative z-10">
                    <div className="text-center mb-16">
                        <Badge variant="secondary">Simple Process</Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-6 mb-6">Your Journey</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">From application to launch in 4 simple steps.</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 to-primary/0 hidden md:block rounded-full"></div>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                            {journeySteps.map((item, index) => (
                                <div key={item.step} className={`flex items-start gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                                    <div className={`relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground shadow-lg border-4 border-secondary`}>{item.step}</div>
                                    <div className={`${index % 2 === 1 ? 'md:items-end' : ''} flex flex-col`}>
                                        <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                        <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-sm font-medium"><item.icon className="h-4 w-4 text-primary" /><span>{item.label}</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
```