'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

import {
  ArrowLeft, CheckCircle, Rocket, Globe, ShoppingCart, Lightbulb, XCircle, Info, Puzzle, Headset, Megaphone, Store, Gift,
  FileText, PaintBrush, Gauge, Bot, CalendarCheck, Search, Hash, Filter, Box, Settings,
  Check, Hand, LineChart, AlertTriangle, Mail, HandCoins
} from 'lucide-react';

const applicationFormSchema = z.object({
    fullName: z.string().min(2, "Full name is required."),
    email: z.string().email("Invalid email address."),
    phone: z.string().min(10, "Invalid phone number."),
    businessName: z.string().min(2, "Business name is required."),
    websiteType: z.string({ required_error: "Please select a website type." }),
    industry: z.string({ required_error: "Please select an industry." }),
    customIndustry: z.string().optional(),
    addons: z.array(z.string()).optional(),
    terms: z.boolean().refine(val => val === true, { message: "You must accept the terms." }),
}).refine(data => {
    if (data.industry === 'Custom' && (!data.customIndustry || data.customIndustry.length < 2)) {
        return false;
    }
    return true;
}, {
    message: "Please specify your industry.",
    path: ["customIndustry"],
});

type ApplicationFormData = z.infer<typeof applicationFormSchema>;

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const randomDuration = Math.floor(Math.random() * (12 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000 + 1) + 3 * 60 * 60 * 1000);
        const endDate = new Date(Date.now() + randomDuration);

        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate.getTime() - now;

            if (distance < 0) {
                clearInterval(intervalId);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (time: number) => String(time).padStart(2, '0');

    return (
        <div className="flex justify-center gap-3 md:gap-6">
            <div>
                <div className="bg-white/20 rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] backdrop-blur-sm">
                    <span className="text-2xl md:text-4xl font-bold text-white font-mono">{formatTime(timeLeft.days)}</span>
                </div>
                <span className="text-white/70 text-xs mt-2 block font-medium">Days</span>
            </div>
             <div>
                <div className="bg-white/20 rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] backdrop-blur-sm">
                    <span className="text-2xl md:text-4xl font-bold text-white font-mono">{formatTime(timeLeft.hours)}</span>
                </div>
                <span className="text-white/70 text-xs mt-2 block font-medium">Hours</span>
            </div>
            <div>
                <div className="bg-white/20 rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] backdrop-blur-sm">
                    <span className="text-2xl md:text-4xl font-bold text-white font-mono">{formatTime(timeLeft.minutes)}</span>
                </div>
                <span className="text-white/70 text-xs mt-2 block font-medium">Minutes</span>
            </div>
             <div>
                <div className="bg-white/20 rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] backdrop-blur-sm">
                    <span className="text-2xl md:text-4xl font-bold text-white font-mono">{formatTime(timeLeft.seconds)}</span>
                </div>
                <span className="text-white/70 text-xs mt-2 block font-medium">Seconds</span>
            </div>
        </div>
    );
};

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);


export default function FreeWebsitePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [slots, setSlots] = useState({ remaining: 7, total: 10 });
    const totalSteps = 5;

    useEffect(() => {
        setSlots({
            remaining: Math.floor(Math.random() * (8 - 5 + 1)) + 5,
            total: 10
        });
    }, []);

    const form = useForm<ApplicationFormData>({
        resolver: zodResolver(applicationFormSchema),
        defaultValues: {
            addons: [],
            terms: false,
        }
    });

    async function handleNextStep() {
        const stepFields = [
            [], // step 0 (unused)
            ['fullName', 'email', 'phone', 'businessName'],
            ['websiteType'],
            ['addons'],
            ['industry', 'customIndustry'],
            ['terms']
        ] as const;

        const isValid = await form.trigger(stepFields[currentStep]);
        if (isValid) {
            if (currentStep === totalSteps) {
                form.handleSubmit(onSubmit)();
            } else {
                setCurrentStep(s => s + 1);
            }
        }
    }

    function handlePrevStep() {
        setCurrentStep(s => s - 1);
    }
    
    function onSubmit(data: ApplicationFormData) {
        const message = `
=========================
Free website Contact Form Submission
=========================
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Business Name: ${data.businessName}
Website Type: ${data.websiteType}
Industry: ${data.industry === 'Custom' ? data.customIndustry : data.industry}
Add-Ons:
${data.addons && data.addons.length > 0 ? data.addons.map(a => `- ${a}`).join('\n') : 'None'}
        `.trim();

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/917379848171?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');

        setIsSuccessModalOpen(true);
        form.reset();
        setCurrentStep(1);
    }
    
    function scrollToApply() {
        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
    }

    const StepIndicator = () => {
        const stepTitles = ["User Details", "Project Details", "Add-Ons", "Select Industry", "Review & Submit"];
        return (
             <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Step {currentStep} of {totalSteps}</span>
                    <span className="text-xs font-bold text-primary" id="stepTitle">{stepTitles[currentStep-1]}</span>
                </div>
                <Progress value={(currentStep / totalSteps) * 100} />
            </div>
        );
    }
    
    const updatePreview = () => {
        const data = form.getValues();
        return (
             <div className="bg-muted rounded-xl p-6 border space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                    <div><p className="text-muted-foreground text-xs uppercase">Name</p><p className="font-semibold">{data.fullName || '-'}</p></div>
                    <div><p className="text-muted-foreground text-xs uppercase">Email</p><p className="font-semibold">{data.email || '-'}</p></div>
                    <div><p className="text-muted-foreground text-xs uppercase">Phone</p><p className="font-semibold">{data.phone || '-'}</p></div>
                    <div><p className="text-muted-foreground text-xs uppercase">Business</p><p className="font-semibold">{data.businessName || '-'}</p></div>
                </div>
                 <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                    <div><p className="text-muted-foreground text-xs uppercase">Plan</p><p className="font-semibold">{data.websiteType || '-'}</p></div>
                    <div><p className="text-muted-foreground text-xs uppercase">Industry</p><p className="font-semibold">{data.industry === 'Custom' ? data.customIndustry : data.industry || '-'}</p></div>
                </div>
                <div className="text-sm">
                    <p className="text-muted-foreground text-xs uppercase mb-1">Add-Ons</p>
                    <ul className="list-disc list-inside font-medium">
                        {data.addons && data.addons.length > 0 ? data.addons.map(a => <li key={a}>{a}</li>) : <li>None selected</li>}
                    </ul>
                </div>
            </div>
        )
    };


    return (
        <div className="w-full bg-background">
             <Button
                variant="outline"
                className="absolute top-24 left-4 sm:left-8 z-10"
                onClick={() => router.back()}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
            
            {/* Hero */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden bg-gradient-to-br from-primary to-slate-900 text-primary-foreground">
                <div className="bubbles">
                    {Array.from({ length: 10 }).map((_, i) => <div key={i} className="bubble"></div>)}
                </div>
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-medium mb-8 border border-white/20">
                            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>
                            Limited-Time Offer – <span className="font-bold">{slots.remaining}</span> Slots Remaining This Month
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight drop-shadow-sm">Get a 100% FREE<br/>Professional Website</h1>
                        <p className="text-lg md:text-2xl text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">Launch your business online with a real, functional website. Generate leads, build trust, and grow – <strong>without spending a dime.</strong></p>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
                            <div className="flex items-center gap-2.5 font-medium bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10"><CheckCircle className="text-green-400" /><span>Real Website</span></div>
                            <div className="flex items-center gap-2.5 font-medium bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10"><CheckCircle className="text-green-400" /><span>Hosting-Ready Code</span></div>
                            <div className="flex items-center gap-2.5 font-medium bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10"><CheckCircle className="text-green-400" /><span>No Credit Card</span></div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto animate-pulse-ring" onClick={scrollToApply}><Rocket />Claim Free Website</Button>
                            <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>
                                <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">See What's Included</Button>
                            </a>
                        </div>
                        <div className="mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-2xl mx-auto border border-white/10 shadow-2xl">
                            <div className="flex justify-between items-center mb-4"><p className="text-sm font-semibold uppercase tracking-wider">Offer Expires In</p><Badge variant="destructive" className="animate-pulse">Few slots left</Badge></div>
                            <CountdownTimer />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Features Section */}
            <section id="features" className="py-24 bg-background">
                <div className="container">
                    <div className="text-center mb-16"><Badge>No Strings Attached</Badge><h2 className="text-3xl md:text-5xl font-bold mt-6 mb-6">What You Get For FREE</h2><p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to establish your online presence – completely free of charge.</p></div>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                        <Card className="group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"><CardHeader><div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:bg-primary transition-colors"><Globe className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors"/></div><CardTitle>FREE Basic Website</CardTitle><CardDescription>Perfect for service businesses, professionals, and local brands getting started online.</CardDescription></CardHeader>
                            <CardContent><ul className="space-y-4 mb-8">{['3–5 Page Professional Website', 'Mobile Responsive Design', 'Pre-Designed Modern Template', 'Basic On-Page SEO Setup', 'Contact Form with Email', 'Client-Owned Content & Assets'].map(item => <li key={item} className="flex items-start gap-3"><CheckCircle className="text-green-500 mt-1 shrink-0"/><span>{item}</span></li>)}</ul>
                                <div className="pt-6 border-t flex items-center justify-between"><div className="flex flex-col"><span className="text-sm text-muted-foreground mb-1">Estimated Value</span><div className="flex items-baseline gap-2"><span className="text-3xl font-bold text-foreground">₹0</span><span className="text-muted-foreground line-through text-lg">₹14,999</span></div></div><Badge variant="secondary" className="bg-green-100 text-green-800">100% FREE</Badge></div>
                            </CardContent>
                        </Card>
                        <Card className="group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"><CardHeader><div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:bg-primary transition-colors"><ShoppingCart className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors"/></div><CardTitle>FREE E-Commerce Starter</CardTitle><CardDescription>Ideal for early-stage e-commerce brands and product sellers ready to sell.</CardDescription></CardHeader>
                            <CardContent><ul className="space-y-4 mb-8">{['Professional Storefront Design', 'Up to 10 Products Listed', 'Product & Cart Pages', 'Manual Order (WhatsApp/Email)', 'Mobile Responsive Shopping', 'Product Gallery & Desc.'].map(item => <li key={item} className="flex items-start gap-3"><CheckCircle className="text-green-500 mt-1 shrink-0"/><span>{item}</span></li>)}</ul>
                                <div className="pt-6 border-t flex items-center justify-between"><div className="flex flex-col"><span className="text-sm text-muted-foreground mb-1">Estimated Value</span><div className="flex items-baseline gap-2"><span className="text-3xl font-bold text-foreground">₹0</span><span className="text-muted-foreground line-through text-lg">₹24,999</span></div></div><Badge variant="secondary" className="bg-green-100 text-green-800">100% FREE</Badge></div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            
            {/* Transparency Section */}
            <section className="py-24 bg-secondary">
                <div className="container max-w-5xl">
                    <Card className="p-8 md:p-12">
                        <div className="flex items-start gap-5 mb-10"><div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-500/10 rounded-2xl flex items-center justify-center shrink-0"><Lightbulb className="text-yellow-600 dark:text-yellow-400"/></div><div><h2 className="text-2xl md:text-3xl font-bold mb-3">Let's Be Transparent</h2><p className="text-lg text-muted-foreground">We believe in honesty. Here's what the free version <span className="font-semibold text-yellow-600 dark:text-yellow-400">doesn't</span> include:</p></div></div>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-10">{['No custom design (template-based)', 'No advanced animations or effects', 'No payment gateway (e-commerce)', 'Limited revisions (2 rounds)', 'Limited support tickets (3/month)', 'Agency branding in footer', 'No performance optimization', 'No conversion rate optimization'].map(item => <div key={item} className="flex items-center gap-3"><XCircle className="text-slate-400 group-hover:text-red-500 shrink-0"/><span className="font-medium">{item}</span></div>)}</div>
                        <div className="bg-background rounded-2xl p-6 border"><div className="flex items-start md:items-center gap-4"><Info className="text-primary text-2xl shrink-0 mt-1 md:mt-0"/><p className="text-muted-foreground leading-relaxed font-medium"><strong className="text-foreground font-bold">The free version works perfectly</strong> for getting started. When you're ready to scale, growth features are unlocked through affordable upgrades.</p></div></div>
                    </Card>
                </div>
            </section>

             {/* Application Form */}
            <section id="apply" className="py-24 bg-background">
                <div className="container max-w-4xl">
                     <div className="text-center mb-16"><Badge>Start Your Journey</Badge><h2 className="text-3xl md:text-5xl font-bold mt-6 mb-6">Apply for Your Free Website</h2><p className="text-xl text-muted-foreground max-w-2xl mx-auto">No credit card required. No obligations. Just fill out the form below.</p></div>
                    <Card><Form {...form}><form onSubmit={form.handleSubmit(onSubmit)}><CardContent className="p-8 md:p-12">
                        <StepIndicator />
                        {currentStep === 1 && <div className="space-y-6">
                            <h3 className="text-xl font-bold">Tell us about yourself</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Full Name*</FormLabel><FormControl><Input placeholder="John Smith" {...field}/></FormControl><FormMessage/></FormItem>)}/>
                                <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email Address*</FormLabel><FormControl><Input type="email" placeholder="john@company.com" {...field}/></FormControl><FormMessage/></FormItem>)}/>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number*</FormLabel><FormControl><Input placeholder="+91 98765 43210" {...field}/></FormControl><FormMessage/></FormItem>)}/>
                                <FormField control={form.control} name="businessName" render={({ field }) => (<FormItem><FormLabel>Business Name*</FormLabel><FormControl><Input placeholder="Your Business Name" {...field}/></FormControl><FormMessage/></FormItem>)}/>
                            </div>
                        </div>}
                        
                        {currentStep === 2 && <div className="space-y-6">
                             <h3 className="text-xl font-bold">What type of website do you need?</h3>
                             <FormField control={form.control} name="websiteType" render={({ field }) => (
                                <FormItem><FormLabel>Website Category*</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a category..."/></SelectTrigger></FormControl><SelectContent><SelectItem value="Basic Website">Basic Website</SelectItem><SelectItem value="E-Commerce">E-Commerce</SelectItem></SelectContent></Select><FormMessage/></FormItem>
                             )}/>
                        </div>}
                        
                        {currentStep === 3 && <div className="space-y-8">
                            <h3 className="text-xl font-bold">Select Add-Ons & Enhancements (Optional)</h3>
                            <p className="text-sm text-muted-foreground">Select any upgrades, support plans, or bundles you are interested in.</p>
                            <FormField control={form.control} name="addons" render={() => (
                                <FormItem>
                                <div className="grid md:grid-cols-2 gap-3">
                                {['Custom UI/UX Design', 'Speed Optimization', 'Extra Pages', 'WhatsApp Integration', 'Chatbot Integration', 'Booking System', 'Basic Support Plan', 'Growth Support Plan', 'Premium Support Plan', 'SEO Services', 'Google Ads', 'Social Media Marketing', 'Funnels & Automation', 'UPI Integration', 'International Payments', 'Product Listing', 'Store Automation', 'Marketing Tools', 'Product Subscriptions', 'Startup Pack Bundle', 'Growth Pack Bundle', 'Accelerator Bundle'].map(item => (
                                    <FormField key={item} control={form.control} name="addons" render={({field}) => (
                                        <FormItem className="flex items-center space-x-3 p-3 rounded-xl border bg-background hover:bg-secondary transition cursor-pointer">
                                            <FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={checked => {
                                                return checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter(v => v !== item))
                                            }}/></FormControl>
                                            <FormLabel className="font-bold text-sm cursor-pointer">{item}</FormLabel>
                                        </FormItem>
                                    )}/>
                                ))}
                                </div><FormMessage/>
                                </FormItem>
                            )}/>
                        </div>}
                        
                        {currentStep === 4 && <div className="space-y-6">
                             <h3 className="text-xl font-bold">Select Industry</h3>
                             <FormField control={form.control} name="industry" render={({ field }) => (
                                <FormItem><FormLabel>Industry/Niche*</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select your industry..."/></SelectTrigger></FormControl><SelectContent>{["Professional Services", "Healthcare & Wellness", "Retail & E-Commerce", "Food & Restaurant", "Real Estate", "Education & Coaching", "Technology & SaaS", "Creative & Design", "Construction & Home Services", "Custom"].map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>
                             )}/>
                             {form.watch('industry') === 'Custom' && <FormField control={form.control} name="customIndustry" render={({ field }) => (<FormItem><FormLabel>Please Specify*</FormLabel><FormControl><Input placeholder="Enter your industry" {...field}/></FormControl><FormMessage/></FormItem>)}/>}
                        </div>}

                        {currentStep === 5 && <div className="space-y-6">
                            <h3 className="text-xl font-bold">Review & Submit</h3>
                            {updatePreview()}
                            <FormField control={form.control} name="terms" render={({ field }) => (<FormItem className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange}/></FormControl><div><FormLabel>I agree to the Terms of Service and understand I will be redirected to WhatsApp to complete my application.</FormLabel><FormMessage/></div></FormItem>)}/>
                        </div>}
                        
                    </CardContent><CardFooter className="flex justify-between pt-6 border-t">
                        <Button type="button" variant="outline" onClick={handlePrevStep} className={currentStep === 1 ? 'invisible' : ''}>Back</Button>
                        {currentStep < totalSteps && <Button type="button" onClick={handleNextStep}>Next Step</Button>}
                        {currentStep === totalSteps && <Button type="submit" disabled={form.formState.isSubmitting}><WhatsappIcon className="h-6 w-6 mr-2"/>Submit via WhatsApp</Button>}
                    </CardFooter></form></Form></Card>
                </div>
            </section>
            
            {/* FAQ */}
            <section className="py-24 bg-secondary">
                 <div className="container max-w-3xl">
                     <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2></div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        <AccordionItem value="item-1"><AccordionTrigger className="text-lg">Is the website really 100% free?</AccordionTrigger><AccordionContent className="text-base">Yes! The basic website is completely free with no hidden charges. You own the content and get a fully functional, professional website. We only charge for optional upgrades, additional features, and premium support if you choose them.</AccordionContent></AccordionItem>
                        <AccordionItem value="item-2"><AccordionTrigger className="text-lg">What's the catch?</AccordionTrigger><AccordionContent className="text-base">There's no catch! The free version has some limitations (template-based design, limited revisions, agency footer branding) as disclosed. We offer this as a way to help businesses get started online while building long-term relationships.</AccordionContent></AccordionItem>
                        <AccordionItem value="item-3"><AccordionTrigger className="text-lg">Do I need to buy hosting?</AccordionTrigger><AccordionContent className="text-base">You'll receive hosting-ready code that you can deploy anywhere. We can help you set up affordable hosting (usually ₹300-1,000/month) or you can handle it yourself. Domain registration is also separate but we can guide you.</AccordionContent></AccordionItem>
                        <AccordionItem value="item-4"><AccordionTrigger className="text-lg">Can I remove the agency branding?</AccordionTrigger><AccordionContent className="text-base">Yes! Footer branding removal is available as a one-time paid upgrade (₹999). This gives you a completely white-labeled website.</AccordionContent></AccordionItem>
                    </Accordion>
                </div>
            </section>

             <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent>
                    <DialogHeader className="items-center text-center">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="text-green-500 h-12 w-12"/></div>
                        <DialogTitle className="text-2xl">Application Submitted!</DialogTitle>
                        <DialogDescription>Thank you for applying! We'll review your application and get back to you within 24 hours.</DialogDescription>
                    </DialogHeader>
                    <div className="bg-muted p-4 rounded-lg my-6"><p className="text-sm text-muted-foreground flex items-center justify-center gap-2"><Mail/> Check your email for a confirmation message.</p></div>
                    <Button onClick={() => setIsSuccessModalOpen(false)} className="w-full">Got It!</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
