
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  CheckCircle, Code, Gift, Headset, Info, Lightbulb, Mail, Megaphone, Paintbrush, Puzzle, Rocket,
  Search, ShoppingCart, Star, Store, Users, XCircle, Check, FileText, Gauge, MessageCircle as MessageCircleIcon,
  Bot, CalendarCheck, Smartphone, CreditCard, Filter, Hash, Box, Cog, Smartphone as SmartphoneIcon,
  ChevronDown, ArrowRight, Hand, Eye, Wrench, ShieldCheck, MailIcon, MapPin, Phone, Send, Linkedin, Twitter, Instagram, ArrowUp, Globe, Edit, Code2
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
        </div>
    );
}
