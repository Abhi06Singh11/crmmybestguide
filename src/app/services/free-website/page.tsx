'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft, CheckCircle, Rocket, Globe, ShoppingCart, Lightbulb, XCircle, Info, Puzzle, Headset, Megaphone, Store, Gift,
  FileText, Paintbrush, Gauge, Bot, CalendarCheck, Search, Hash, Filter, Box, Settings,
  Check, Hand, LineChart, AlertTriangle, Mail, ArrowRight, Code
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

const applicationFormSchema = z.object({
    fullName: z.string().min(2, "Full name is required."),
    email: z.string().email("Please enter a valid email."),
    phone: z.string().min(10, "Please enter a valid phone number."),
    businessName: z.string().min(2, "Business name is required."),
    websiteType: z.string().min(1, "Please select a website type."),
    goals: z.string().optional(),
    industry: z.string().min(1, "Please select an industry."),
    customIndustry: z.string().optional(),
    addons: z.array(z.string()).optional(),
    terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
});

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

    useEffect(() => {
        const randomDuration = 8 * 60 * 60 * 1000 + Math.random() * 4 * 60 * 60 * 1000;
        const endDate = new Date(Date.now() + randomDuration);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate.getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!timeLeft) {
        return (
            <div className="flex justify-center gap-3 md:gap-6">
                {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit) => (
                    <div key={unit} className="text-center">
                        <div className="bg-white/20 rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] backdrop-blur-sm">
                            <span className="text-2xl md:text-4xl font-bold text-white font-mono">--</span>
                        </div>
                        <span className="text-white/70 text-xs mt-2 block font-medium capitalize">{unit.toLowerCase()}</span>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex justify-center gap-3 md:gap-6">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                    <div className="bg-white/20 rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] backdrop-blur-sm">
                        <span className="text-2xl md:text-4xl font-bold text-white font-mono">{String(value).padStart(2, '0')}</span>
                    </div>
                    <span className="text-white/70 text-xs mt-2 block font-medium capitalize">{unit}</span>
                </div>
            ))}
        </div>
    );
};

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);


export default function FreeWebsitePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const totalSteps = 5;

    const form = useForm<z.infer<typeof applicationFormSchema>>({
        resolver: zodResolver(applicationFormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            businessName: '',
            websiteType: '',
            goals: '',
            industry: '',
            customIndustry: '',
            addons: [],
            terms: false,
        },
    });

    const formData = form.watch();
    
    const [slots, setSlots] = useState<{ total: number; remaining: number }>({total: 10, remaining: 7});

    const handleNextStep = async () => {
        const stepFields: (keyof z.infer<typeof applicationFormSchema>)[] = [];
        if (currentStep === 1) stepFields.push('fullName', 'email', 'phone', 'businessName');
        if (currentStep === 2) stepFields.push('websiteType');
        if (currentStep === 4) stepFields.push('industry');

        const isValid = await form.trigger(stepFields);
        
        if (isValid) {
            setCurrentStep(currentStep + 1);
        } else {
             toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: `Please fill out all required fields.`,
            });
        }
    };

    const handlePrevStep = () => setCurrentStep(currentStep - 1);
    
    const onFormSubmit = (data: z.infer<typeof applicationFormSchema>) => {
        const message = `
=========================
Free website Contact Form Submission
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Business Name: ${data.businessName}
Selected Plan: ${data.websiteType}
Add-Ons Selected:
${data.addons && data.addons.length > 0 ? data.addons.map(a => '- ' + a).join('\n') : 'None'}
Website Industry: ${data.industry === 'Custom' ? data.customIndustry : data.industry}
Additional Messages:
${data.goals || 'Not provided'}
=========================
        `;
        const encodedMessage = encodeURIComponent(message.trim());
        const whatsappUrl = `https://wa.me/917379848171?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');

        setSuccessModalOpen(true);
        form.reset();
        setCurrentStep(1);
    };

    const scrollToApply = () => {
        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
    };

    const whatIsNotIncluded = [
        "No custom design (template-based)",
        "No advanced animations or effects",
        "No payment gateway (e-commerce)",
        "Limited revisions (2 rounds)",
        "Limited support tickets (3/month)",
        "Agency branding in footer",
        "No performance optimization",
        "No conversion rate optimization",
    ];

    const upgradeTabs = [
        { id: 'addons', title: 'Performance', icon: Puzzle },
        { id: 'support', title: 'Support Plans', icon: Headset },
        { id: 'marketing', title: 'Marketing', icon: Megaphone },
        { id: 'ecommerce', title: 'E-Commerce', icon: Store },
        { id: 'bundles', title: 'Bundle Offers', icon: Gift },
    ];
    
    const journeySteps = [
        { step: 1, title: "Apply for Free Website", description: "Fill out a simple form with your business details and goals. Takes less than 2 minutes.", icon: Edit, label: "2 Min Application" },
        { step: 2, title: "Approval Confirmation", description: "Our team reviews your application within 24 hours. Approved? You'll get a welcome email!", icon: Mail, label: "Email Confirmation" },
        { step: 3, title: "Website Build", description: "Our designers and developers create your professional website in 7–10 business days.", icon: Code, label: "7–10 Business Days" },
        { step: 4, title: "Launch Your Website", description: "Review, approve, and launch your new website. You're officially online!", icon: Rocket, label: "Go Live!" },
        { step: 5, title: "Grow & Upgrade", description: "When you're ready to scale, unlock powerful features with optional upgrades.", icon: LineChart, label: "Scale Your Success" }
    ];

    const faqs = [
        {
            q: "Is the website really 100% free?",
            a: "Yes! The basic website is completely free with no hidden charges. You own the content and get a fully functional, professional website. We only charge for optional upgrades, additional features, and premium support if you choose them."
        },
        {
            q: "What's the catch?",
            a: "There's no catch! The free version has some limitations (template-based design, limited revisions, agency footer branding) as disclosed. We offer this as a way to help businesses get started online while building long-term relationships."
        },
        {
            q: "Do I need to buy hosting?",
            a: "You'll receive hosting-ready code that you can deploy anywhere. We can help you set up affordable hosting (usually ₹300-1,000/month) or you can handle it yourself. Domain registration is also separate but we can guide you."
        },
        {
            q: "Can I remove the agency branding?",
            a: "Yes! Footer branding removal is available as a one-time paid upgrade (₹999). This gives you a completely white-labeled website."
        }
    ];

    const addonGroups = {
        'Performance & Design': [
            { icon: FileText, title: "Extra Pages", desc: "Add pages based on tech stack & requirements.", price: "₹499+" },
            { icon: Paintbrush, title: "Custom UI/UX Design", desc: "Tailored design per device & brand identity.", price: "₹999+" },
            { icon: Gauge, title: "Speed Optimization", desc: "Performance tuning for lightning-fast load speeds.", price: "₹899" },
            { icon: WhatsAppIcon, title: "WhatsApp Integration", desc: "Quick user engagement with direct WhatsApp chat.", price: "₹299" },
            { icon: Bot, title: "Chatbot Integration", desc: "24/7 automated support based on AI model & tech stack.", price: "₹999+" },
            { icon: CalendarCheck, title: "Booking System", desc: "Online appointment scheduling.", price: "₹1,499+" },
        ],
        'Support Plans': [
            { icon: Headset, title: 'Basic Support', desc: '5 tickets/mo, 48hr response.', price: '₹499/mo' },
            { icon: Headset, title: 'Growth Support', desc: '30 tickets/mo, priority response.', price: '₹1,499/mo' },
            { icon: Headset, title: 'Premium Support', desc: 'Dedicated engineer, 4hr SLA.', price: '₹3,499/mo' },
        ],
        'Marketing & Growth': [
            { icon: Search, title: 'SEO Services', desc: 'Ranking, keyword & content optimization.', price: '₹1,999+/mo' },
            { icon: LineChart, title: 'Google Ads', desc: 'Campaign setup & ongoing optimization.', price: '₹1,499+/mo' },
            { icon: Hash, title: 'Social Media', desc: 'Content, posting & community growth.', price: '₹1,999+/mo' },
            { icon: Filter, title: 'Funnels & Automation', desc: 'Lead flows & conversion tracking.', price: '₹1,999+ one-time' },
        ],
        'E-Commerce & Payments': [
            { icon: CreditCard, title: 'UPI Integration', desc: 'Accept payments via UPI for Indian customers.', price: '₹499' },
            { icon: CreditCard, title: 'International Payments', desc: 'Stripe, PayPal & international gateway setup.', price: '₹999' },
            { icon: Box, title: 'Product Listing', desc: 'Add products with images, descriptions & pricing.', price: '₹99+' },
            { icon: Settings, title: 'Store Automation', desc: 'Inventory management and order automation.', price: 'Custom' },
        ],
        'Value Bundles': [
            { icon: Gift, title: 'Startup Pack', desc: '5-page site, design & speed.', price: '₹4,999' },
            { icon: Gift, title: 'Growth Pack', desc: '10-page, booking, SEO.', price: '₹9,999' },
            { icon: Gift, title: 'Accelerator Bundle', desc: 'Full custom site & growth.', price: '₹19,999' },
        ],
    };
    

    return (
        <div className="w-full bg-background">
            {/* Hero Section */}
            <section
                className="relative flex items-center justify-center overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32"
                style={{ background: 'linear-gradient(135deg, #002D6B 0%, #001F4D 100%)' }}
            >
                <div className="bubbles">
                    {[...Array(10)].map((_, i) => <div key={i} className="bubble" />)}
                </div>
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#002D6B] rounded-full blur-[120px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <Badge variant="secondary" className="bg-white/10 text-white px-5 py-2 rounded-full text-sm font-medium mb-8 border border-white/20 animate-in fade-in-0">
                            <span className="relative flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            Limited-Time Offer – <span id="slotsRemaining" className="font-bold ml-1">{slots.remaining}</span> Slots Remaining This Month
                        </Badge>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight drop-shadow-sm">
                            Get a 100% FREE<br />Professional Website
                        </h1>
                        <p className="text-lg md:text-2xl text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Launch your business online with a real, functional website. Generate leads, build trust, and grow – <strong>without spending a dime.</strong>
                        </p>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
                            <div className="flex items-center gap-2.5 text-white/90 font-medium bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                <CheckCircle className="text-green-400 h-4 w-4" />
                                <span>Real Website</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-white/90 font-medium bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                <CheckCircle className="text-green-400 h-4 w-4" />
                                <span>Hosting-Ready Code</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-white/90 font-medium bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                <CheckCircle className="text-green-400 h-4 w-4" />
                                <span>No Credit Card</span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <Button onClick={scrollToApply} size="lg" className="bg-white text-primary animate-pulse-strong hover:bg-gray-50 shadow-xl w-full sm:w-auto">
                                <Rocket className="mr-2" />Claim Free Website
                            </Button>
                            <a href="#features">
                                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white backdrop-blur-sm w-full sm:w-auto">
                                    See What's Included
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* What You Get Section */}
            <section id="features" className="py-24 bg-background relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Badge variant="secondary" className="px-3 py-1 mb-4">No Strings Attached</Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-6 mb-6">What You Get For FREE</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Everything you need to establish your online presence – completely free of charge.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                        <Card className="p-8 md:p-10 relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary text-card-foreground hover:text-primary-foreground">
                           <CardHeader>
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 shadow-lg relative z-10 transition-colors group-hover:bg-primary-foreground">
                                    <Globe className="text-primary text-3xl transition-colors group-hover:text-primary"/>
                                </div>
                                <CardTitle className="text-2xl font-bold text-foreground mb-3 relative z-10 group-hover:text-primary-foreground">FREE Basic Website</CardTitle>
                                <CardDescription className="text-muted-foreground mb-8 leading-relaxed relative z-10 group-hover:text-primary-foreground/80">Perfect for service businesses, professionals, and local brands getting started online.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4 relative z-10 mb-8">
                                    {["3–5 Page Professional Website", "Mobile Responsive Design", "Pre-Designed Modern Template", "Basic On-Page SEO Setup", "Contact Form with Email", "Client-Owned Content & Assets"].map(item => (
                                        <li key={item} className="flex items-start gap-3">
                                            <CheckCircle className="text-green-500 mt-1 flex-shrink-0 h-5 w-5 transition-colors group-hover:text-green-300"/>
                                            <span className="text-muted-foreground group-hover:text-primary-foreground/80"><strong className="text-foreground font-semibold group-hover:text-primary-foreground">{item.split(' ')[0]}</strong> {item.substring(item.indexOf(' ')+1)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-6 border-t relative z-10 group-hover:border-primary-foreground/30">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col"><span className="text-sm text-muted-foreground mb-1 group-hover:text-primary-foreground/80">Estimated Value</span><div className="flex items-baseline gap-2"><span className="text-3xl font-bold text-foreground group-hover:text-primary-foreground">₹0</span><span className="text-muted-foreground line-through text-lg group-hover:text-primary-foreground/60">₹14,999</span></div></div>
                                        <Badge className="bg-green-100 text-green-700 transition-colors group-hover:bg-white group-hover:text-primary">100% FREE</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                         <Card className="p-8 md:p-10 relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary text-card-foreground hover:text-primary-foreground">
                           <CardHeader>
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 shadow-lg relative z-10 transition-colors group-hover:bg-primary-foreground">
                                    <ShoppingCart className="text-primary text-3xl transition-colors group-hover:text-primary"/>
                                </div>
                                <CardTitle className="text-2xl font-bold text-foreground mb-3 relative z-10 group-hover:text-primary-foreground">FREE E-Commerce Starter</CardTitle>
                                <CardDescription className="text-muted-foreground mb-8 leading-relaxed relative z-10 group-hover:text-primary-foreground/80">Ideal for early-stage e-commerce brands and product sellers ready to sell.</CardDescription>
                            </CardHeader>
                             <CardContent>
                                <ul className="space-y-4 relative z-10 mb-8">
                                    {["Professional Storefront Design", "Up to 10 Products Listed", "Product & Cart Pages", "Manual Order (WhatsApp/Email)", "Mobile Responsive Shopping", "Product Gallery & Desc."].map(item => (
                                        <li key={item} className="flex items-start gap-3">
                                            <CheckCircle className="text-green-500 mt-1 flex-shrink-0 h-5 w-5 transition-colors group-hover:text-green-300"/>
                                            <span className="text-muted-foreground group-hover:text-primary-foreground/80"><strong className="text-foreground font-semibold group-hover:text-primary-foreground">{item.split(' ')[0]}</strong> {item.substring(item.indexOf(' ')+1)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-6 border-t relative z-10 group-hover:border-primary-foreground/30">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col"><span className="text-sm text-muted-foreground mb-1 group-hover:text-primary-foreground/80">Estimated Value</span><div className="flex items-baseline gap-2"><span className="text-3xl font-bold text-foreground group-hover:text-primary-foreground">₹0</span><span className="text-muted-foreground line-through text-lg group-hover:text-primary-foreground/60">₹24,999</span></div></div>
                                        <Badge className="bg-purple-100 text-purple-700 transition-colors group-hover:bg-white group-hover:text-primary">100% FREE</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

             <section className="py-12 bg-background">
                <div className="container max-w-5xl">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
                        <p className="text-base text-blue-900 dark:text-blue-200 leading-relaxed">
                            Domain and Hosting prices are not included in this package. If you want to buy hosting and domain from us, we provide an additional 10–15% discount compared to the market price. <strong className="font-bold"> We are powered by GoDaddy</strong>.
                        </p>
                    </div>
                </div>
            </section>
            
            {/* Transparency Section */}
            <section className="py-24 bg-secondary border-y">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="p-8 md:p-12 relative overflow-hidden">
                        <CardHeader className="flex-row items-start gap-5 mb-10">
                            <div className="w-14 h-14 bg-amber-100 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-200 dark:border-amber-500/20">
                                <Lightbulb className="text-amber-600 dark:text-amber-400 text-2xl"/>
                            </div>
                            <div>
                                <CardTitle className="text-2xl md:text-3xl font-bold text-foreground mb-3">Let's Be Transparent</CardTitle>
                                <CardDescription className="text-lg text-muted-foreground">We believe in honesty. Here's what the free version <span className="font-semibold text-amber-600 dark:text-amber-400">doesn't</span> include:</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
                                {whatIsNotIncluded.map((item, index) => (
                                     <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors group">
                                        <XCircle className="text-slate-400 group-hover:text-red-500 transition-colors h-5 w-5"/>
                                        <span className="text-foreground font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-500/20 backdrop-blur-sm shadow-sm">
                                <div className="flex items-start md:items-center gap-4">
                                    <Info className="text-blue-600 dark:text-blue-400 text-2xl flex-shrink-0 mt-1 md:mt-0 h-6 w-6"/>
                                    <p className="text-blue-900/80 dark:text-blue-200/80 leading-relaxed font-medium">
                                        <strong className="text-blue-950 dark:text-blue-100 font-bold">The free version works perfectly</strong> for getting started. When you're ready to scale, growth features are unlocked through affordable upgrades.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
            
            {/* Upgrades Section */}
            <section id="upgrades" className="py-24 bg-background">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16">
                         <Badge variant="secondary" className="px-3 py-1 mb-4">Scale When Ready</Badge>
                         <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-6 mb-6">Value Enhancements</h2>
                         <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Unlock powerful growth tools as your business scales. No pressure – upgrade only when you need it.</p>
                     </div>
                     <Tabs defaultValue="addons" className="w-full">
                         <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 h-auto mb-12">
                             {upgradeTabs.map(tab => <TabsTrigger key={tab.id} value={tab.id} className="py-3 text-sm"><tab.icon className="mr-2 h-4 w-4"/>{tab.title}</TabsTrigger>)}
                         </TabsList>
                         <TabsContent value="addons">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {addonGroups['Performance & Design'].map((item, i) => {
                                    const GroupIcon = item.icon;
                                    return (
                                        <Card key={i} className="p-7 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary text-card-foreground hover:text-primary-foreground">
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-foreground transition-colors duration-300">
                                                <GroupIcon className="text-primary text-xl group-hover:text-primary transition-colors"/>
                                            </div>
                                            <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                                            <p className="text-muted-foreground text-sm mb-5 leading-relaxed group-hover:text-primary-foreground/80">{item.desc}</p>
                                            <div className="flex items-center justify-between border-t pt-4 group-hover:border-primary-foreground/30">
                                                <span className="text-2xl font-bold text-primary group-hover:text-white">{item.price}</span>
                                            </div>
                                        </Card>
                                    )
                                })}
                            </div>
                         </TabsContent>
                         <TabsContent value="support">
                            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
                                <Card className="p-8 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary text-card-foreground hover:text-primary-foreground">
                                    <h4 className="text-xl font-bold">Basic Support</h4>
                                    <p className="text-muted-foreground text-sm mb-6 min-h-[40px] group-hover:text-primary-foreground/80">For small businesses needing peace of mind.</p>
                                    <div className="mb-6 pb-6 border-b group-hover:border-primary-foreground/30"><span className="text-4xl font-bold text-primary group-hover:text-white">₹499</span><span className="text-muted-foreground group-hover:text-primary-foreground/80">/mo</span></div>
                                    <ul className="space-y-4 mb-8">
                                        <li className="flex items-center gap-3 text-secondary-foreground text-sm group-hover:text-primary-foreground"><Check className="text-green-500 group-hover:text-green-300"/>5 Support Tickets</li>
                                        <li className="flex items-center gap-3 text-secondary-foreground text-sm group-hover:text-primary-foreground"><Check className="text-green-500 group-hover:text-green-300"/>24-48h Response</li>
                                    </ul>
                                    <Button variant="outline" className="w-full group-hover:bg-primary-foreground group-hover:text-primary group-hover:border-primary-foreground">Choose Plan</Button>
                                </Card>
                                <Card className="p-8 border-2 border-primary shadow-2xl shadow-primary/20 scale-105 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                    <Badge>Most Popular</Badge>
                                    <h4 className="text-xl font-bold text-white">Growth Support</h4>
                                    <p className="text-muted-foreground text-sm mb-6 min-h-[40px]">For businesses scaling up.</p>
                                    <div className="mb-6 pb-6 border-b"><span className="text-4xl font-bold text-primary">₹1,499</span><span className="text-muted-foreground">/mo</span></div>
                                    <ul className="space-y-4 mb-8">
                                        <li className="flex items-center gap-3 text-secondary-foreground text-sm"><Check className="text-green-500"/>30 Tickets</li>
                                        <li className="flex items-center gap-3 text-secondary-foreground text-sm"><Check className="text-green-500"/>Priority Response</li>
                                    </ul>
                                     <Button className="w-full">Choose Growth</Button>
                                </Card>
                                <Card className="p-8 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary text-card-foreground hover:text-primary-foreground">
                                    <h4 className="text-xl font-bold">Premium Support</h4>
                                    <p className="text-muted-foreground text-sm mb-6 min-h-[40px] group-hover:text-primary-foreground/80">For mission-critical applications.</p>
                                    <div className="mb-6 pb-6 border-b group-hover:border-primary-foreground/30"><span className="text-4xl font-bold text-primary group-hover:text-white">₹3,499</span><span className="text-muted-foreground group-hover:text-primary-foreground/80">/mo</span></div>
                                    <ul className="space-y-4 mb-8">
                                        <li className="flex items-center gap-3 text-secondary-foreground text-sm group-hover:text-primary-foreground"><Check className="text-green-500 group-hover:text-green-300"/>Dedicated Engineer</li>
                                        <li className="flex items-center gap-3 text-secondary-foreground text-sm group-hover:text-primary-foreground"><Check className="text-green-500 group-hover:text-green-300"/>4-Hour SLA</li>
                                    </ul>
                                    <Button variant="outline" className="w-full group-hover:bg-primary-foreground group-hover:text-primary group-hover:border-primary-foreground">Choose Plan</Button>
                                </Card>
                            </div>
                         </TabsContent>
                         <TabsContent value="marketing">
                             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {addonGroups['Marketing & Growth'].map((item, i) => {
                                    const GroupIcon = item.icon;
                                    return (
                                        <Card key={i} className="p-6 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary text-card-foreground hover:text-primary-foreground">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-foreground">
                                                <GroupIcon className="text-blue-600 group-hover:text-primary"/>
                                            </div>
                                            <h4 className="text-lg font-bold">{item.title}</h4>
                                            <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80">{item.price}</p>
                                        </Card>
                                    );
                                })}
                             </div>
                         </TabsContent>
                         <TabsContent value="ecommerce">
                             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {addonGroups['E-Commerce & Payments'].map((item, i) => {
                                    const GroupIcon = item.icon;
                                    return (
                                        <Card key={i} className="p-6 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary text-card-foreground hover:text-primary-foreground">
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-foreground">
                                                <GroupIcon className="text-green-600 group-hover:text-primary"/>
                                            </div>
                                            <h4 className="text-lg font-bold">{item.title}</h4>
                                            <p className="text-sm group-hover:text-primary-foreground/80">{item.price}</p>
                                        </Card>
                                    );
                                })}
                             </div>
                         </TabsContent>
                          <TabsContent value="bundles">
                             <div className="grid md:grid-cols-3 gap-8">
                                <Card className="p-8 rounded-2xl relative group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary text-card-foreground hover:text-primary-foreground"><h4 className="text-xl font-bold">Startup Pack</h4><p className="text-4xl font-bold text-primary group-hover:text-white">₹4,999</p></Card>
                                <Card className="p-8 border-2 border-primary rounded-2xl shadow-2xl scale-105 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"><Badge>Best Value</Badge><h4 className="text-xl font-bold">Growth Pack</h4><p className="text-4xl font-bold">₹9,999</p></Card>
                                <Card className="p-8 rounded-2xl relative group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-primary text-card-foreground hover:text-primary-foreground"><h4 className="text-xl font-bold">Accelerator</h4><p className="text-4xl font-bold text-primary group-hover:text-white">₹19,999</p></Card>
                            </div>
                         </TabsContent>
                     </Tabs>
                </div>
            </section>
            
            {/* Journey Section */}
            <section id="journey" className="py-24 bg-secondary overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <Badge variant="secondary" className="px-3 py-1 mb-4">Simple Process</Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-6 mb-6">Your Journey</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">From application to launch in 5 simple steps.</p>
                    </div>
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute left-5 top-5 h-full w-px bg-border md:left-1/2 md:-translate-x-px"></div>
                        <div className="relative flex flex-col gap-y-12">
                            {journeySteps.map((s, i) => (
                                <div key={s.step} className={cn(
                                    "relative md:grid md:grid-cols-2 md:items-center md:gap-8",
                                )}>
                                    <div className="absolute left-5 top-5 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2 z-10">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-primary">
                                            {s.step}
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "pl-16 md:pl-0",
                                        i % 2 === 0 ? "md:col-start-1 md:pr-8 md:text-right" : "md:col-start-2 md:pl-8"
                                    )}>
                                        <Card className="p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                            <div className={cn(
                                                "flex items-start gap-4 mb-3",
                                                i % 2 === 0 && "md:flex-row-reverse"
                                            )}>
                                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <s.icon className="h-6 w-6" />
                                                </div>
                                                <div className={cn(
                                                    "flex-1",
                                                    i % 2 === 0 ? "md:text-right" : "md:text-left"
                                                )}>
                                                    <h3 className="text-xl font-bold text-foreground mb-1">{s.title}</h3>
                                                    <Badge variant="secondary">{s.label}</Badge>
                                                </div>
                                            </div>
                                            <p className={cn(
                                                "text-muted-foreground leading-relaxed",
                                                 i % 2 === 0 && "md:text-right"
                                            )}>{s.description}</p>
                                        </Card>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

             {/* Urgency Section */}
            <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="flex items-center justify-center gap-4 mb-6"><div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"><AlertTriangle className="text-yellow-300 text-2xl h-6 w-6"/></div><h2 className="text-2xl md:text-4xl font-bold text-white">Limited Availability</h2></div>
                    <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">We can only accept a limited number of free website projects each month to maintain quality.</p>
                    <Card className="bg-white/10 backdrop-blur-md p-8 max-w-md mx-auto mb-10 border-white/20 text-left">
                        <p className="text-white/90 text-sm font-semibold uppercase tracking-wider mb-4">Monthly Slots Available</p>
                        <div className="flex items-center gap-5">
                            <Progress value={((slots.total - slots.remaining) / slots.total) * 100} className="h-4"/>
                            <span className="text-white font-bold text-2xl font-mono">{slots.remaining}/{slots.total}</span>
                        </div>
                        <p className="text-white/70 text-sm mt-4 flex items-center gap-2"><Info className="h-4 w-4"/>Applications require manual review & approval</p>
                    </Card>
                    <Button onClick={scrollToApply} size="lg" className="bg-white text-red-600 hover:bg-gray-100 shadow-xl"><Hand className="mr-2 h-4 w-4"/>Apply Before Slots Fill Up</Button>
                </div>
            </section>
            
            {/* Application Form Section */}
            <section id="apply" className="py-24 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="p-8 md:p-12 border shadow-lg">
                        <div className="text-center mb-8">
                            <Badge variant="secondary" className="px-3 py-1 mb-4">Start Your Journey</Badge>
                            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-6 mb-6">Apply for Your Free Website</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">No credit card required. No obligations. Just fill out the form below.</p>
                        </div>
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Step {currentStep} of {totalSteps}</span>
                                <span className="text-xs font-bold text-primary">{['User Details', 'Project Details', 'Add-Ons', 'Select Industry', 'Review & Submit'][currentStep - 1]}</span>
                            </div>
                            <Progress value={(currentStep / totalSteps) * 100} />
                        </div>
                        
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onFormSubmit)} className="relative">
                                {/* Step 1 */}
                                <div className={cn("step-section", currentStep !== 1 && "hidden")}>
                                    <h3 className="text-xl font-bold text-theme-primary mb-6">Tell us about yourself</h3>
                                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                                        <FormField control={form.control} name="fullName" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-sm font-bold text-theme-primary uppercase tracking-wide">Your Full Name <span className="text-red-500">*</span></FormLabel>
                                                <FormControl><Input {...field} placeholder="John Smith" required className="form-input w-full px-5 py-3.5 rounded-xl text-base" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-sm font-bold text-theme-primary uppercase tracking-wide">Email Address <span className="text-red-500">*</span></FormLabel>
                                                <FormControl><Input {...field} type="email" placeholder="john@company.com" required className="form-input w-full px-5 py-3.5 rounded-xl text-base" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <FormField control={form.control} name="phone" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-sm font-bold text-theme-primary uppercase tracking-wide">Phone Number <span className="text-red-500">*</span></FormLabel>
                                                <FormControl><Input {...field} type="tel" placeholder="+91 98765 43210" required className="form-input w-full px-5 py-3.5 rounded-xl text-base" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="businessName" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-sm font-bold text-theme-primary uppercase tracking-wide">Business Name <span className="text-red-500">*</span></FormLabel>
                                                <FormControl><Input {...field} placeholder="Your Business Name" required className="form-input w-full px-5 py-3.5 rounded-xl text-base" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </div>
                                {/* Step 2 */}
                                <div className={cn("step-section", currentStep !== 2 && "hidden")}>
                                     <h3 className="text-xl font-bold text-theme-primary mb-6">What type of website do you need?</h3>
                                     <FormField control={form.control} name="websiteType" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-sm font-bold text-theme-primary uppercase tracking-wide">Website Category <span className="text-red-500">*</span></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="form-input w-full px-5 py-3.5 rounded-xl text-base">
                                                        <SelectValue placeholder="Select a category..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Basic Website">Basic Website</SelectItem>
                                                    <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="goals" render={({ field }) => (
                                        <FormItem className="mt-8">
                                            <FormLabel className="block text-sm font-bold text-theme-primary uppercase tracking-wide">What are your primary goals for this website?</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="e.g., Generate more leads, showcase my portfolio, sell products online..."
                                                    rows={4}
                                                    className="form-input w-full px-5 py-3.5 rounded-xl text-base"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                </div>
                                {/* Step 3 */}
                                <div className={cn("step-section", currentStep !== 3 && "hidden")}>
                                    <h3 className="text-xl font-bold text-theme-primary mb-2">Select Add-Ons & Enhancements</h3>
                                    <p className="text-muted-foreground mb-6 text-sm">Select any upgrades, support plans, or bundles you are interested in.</p>
                                    <div className="space-y-8 max-h-[400px] overflow-y-auto pr-2">
                                        <FormField
                                            control={form.control}
                                            name="addons"
                                            render={() => (
                                                <div className="space-y-8">
                                                    {Object.entries(addonGroups).map(([groupName, addons]) => {
                                                        const GroupIcon = addons[0]?.icon;
                                                        return (
                                                        <div key={groupName}>
                                                            <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2 sticky top-0 bg-secondary py-2 z-10">
                                                                {GroupIcon && <GroupIcon className="h-4 w-4" />} {groupName}
                                                            </h4>
                                                            <div className="grid md:grid-cols-2 gap-4">
                                                                {addons.map((item) => (
                                                                <FormField
                                                                    key={item.title}
                                                                    control={form.control}
                                                                    name="addons"
                                                                    render={({ field }) => {
                                                                    return (
                                                                        <FormItem
                                                                        key={item.title}
                                                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                                                        >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                            checked={field.value?.includes(item.title)}
                                                                            onCheckedChange={(checked) => {
                                                                                return checked
                                                                                ? field.onChange([...(field.value || []), item.title])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                    (value) => value !== item.title
                                                                                    )
                                                                                );
                                                                            }}
                                                                            />
                                                                        </FormControl>
                                                                        <div className="space-y-1 leading-none">
                                                                            <Label className="font-normal">
                                                                                {item.title}
                                                                            </Label>
                                                                            <p className="text-xs text-muted-foreground">
                                                                                {item.desc}
                                                                            </p>
                                                                            <p className="font-semibold text-primary text-sm pt-1">{item.price}</p>
                                                                        </div>
                                                                        </FormItem>
                                                                    );
                                                                    }}
                                                                />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                                {/* Step 4 */}
                                <div className={cn("step-section", currentStep !== 4 && "hidden")}>
                                     <h3 className="text-xl font-bold text-theme-primary mb-6">Select Industry</h3>
                                     <FormField control={form.control} name="industry" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-sm font-bold text-theme-primary uppercase tracking-wide">Industry/Niche <span className="text-red-500">*</span></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="form-input w-full px-5 py-3.5 rounded-xl text-base">
                                                        <SelectValue placeholder="Select your industry..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Professional Services">Professional Services</SelectItem>
                                                    <SelectItem value="Healthcare & Wellness">Healthcare & Wellness</SelectItem>
                                                    <SelectItem value="Retail & E-Commerce">Retail & E-Commerce</SelectItem>
                                                    <SelectItem value="Food & Restaurant">Food & Restaurant</SelectItem>
                                                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                                                    <SelectItem value="Education & Coaching">Education & Coaching</SelectItem>
                                                    <SelectItem value="Technology & SaaS">Technology & SaaS</SelectItem>
                                                    <SelectItem value="Creative & Design">Creative & Design</SelectItem>
                                                    <SelectItem value="Construction & Home Services">Construction & Home Services</SelectItem>
                                                    <SelectItem value="Custom">Other / Custom</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                     {formData.industry === 'Custom' && (
                                        <FormField control={form.control} name="customIndustry" render={({ field }) => (
                                            <FormItem className="mt-4 animate-in fade-in-0">
                                                <FormLabel className="block text-sm font-bold text-theme-primary uppercase tracking-wide mb-2">Please Specify <span className="text-red-500">*</span></FormLabel>
                                                <FormControl><Input {...field} required placeholder="Enter your industry" className="form-input w-full px-5 py-3.5 rounded-xl text-base" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    )}
                                </div>
                                 {/* Step 5 */}
                                <div className={cn("step-section", currentStep !== 5 && "hidden")}>
                                    <h3 className="text-xl font-bold text-theme-primary mb-6">Review & Submit</h3>
                                    <div className="bg-muted/50 rounded-xl p-6 mb-6 border space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                                            <div><p className="block text-muted-foreground text-xs uppercase">Name</p><p className="font-semibold text-foreground">{formData.fullName || '-'}</p></div>
                                            <div><p className="block text-muted-foreground text-xs uppercase">Email</p><p className="font-semibold text-foreground">{formData.email || '-'}</p></div>
                                            <div><p className="block text-muted-foreground text-xs uppercase">Phone</p><p className="font-semibold text-foreground">{formData.phone || '-'}</p></div>
                                            <div><p className="block text-muted-foreground text-xs uppercase">Business</p><p className="font-semibold text-foreground">{formData.businessName || '-'}</p></div>
                                        </div>
                                         <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                                            <div><p className="block text-muted-foreground text-xs uppercase">Plan</p><p className="font-semibold text-foreground">{formData.websiteType || '-'}</p></div>
                                            <div><p className="block text-muted-foreground text-xs uppercase">Industry</p><p className="font-semibold text-foreground">{formData.industry === 'Custom' ? formData.customIndustry : formData.industry || '-'}</p></div>
                                        </div>
                                        <div className="text-sm">
                                            <p className="block text-muted-foreground text-xs uppercase mb-2">Selected Add-Ons</p>
                                            {formData.addons && formData.addons.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.addons.map((addon) => (
                                                        <Badge key={addon} variant="secondary">{addon}</Badge>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted-foreground text-sm">No Add-ons Selected</p>
                                            )}
                                        </div>
                                    </div>
                                    <FormField control={form.control} name="terms" render={({ field }) => (
                                        <FormItem className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-6">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} id="terms" className="w-5 h-5 rounded mt-1" />
                                            </FormControl>
                                            <div className="grid gap-1.5 leading-none">
                                                <Label htmlFor="terms" className="text-theme-secondary text-sm leading-relaxed cursor-pointer select-none">
                                                    I agree to the Terms of Service and understand I will be redirected to WhatsApp to complete my application.
                                                </Label>
                                                {form.formState.errors.terms && <FormMessage>{form.formState.errors.terms.message}</FormMessage>}
                                            </div>
                                        </FormItem>
                                    )} />
                                </div>

                                {/* Nav buttons */}
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-theme">
                                    <Button type="button" onClick={handlePrevStep} variant="outline" className={cn(currentStep === 1 && 'invisible')}>Back</Button>
                                    <Button type="button" onClick={handleNextStep} className={cn('bg-primary', currentStep === totalSteps && 'hidden')}>Next Step <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                    <Button type="submit" className={cn('bg-primary', currentStep !== totalSteps && 'hidden')}>
                                        <WhatsAppIcon className="mr-2 h-5 w-5" /> Submit via WhatsApp
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </Card>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="py-24 bg-secondary">
                 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Frequently Asked Questions</h2></div>
                     <Accordion type="single" collapsible className="w-full space-y-4">
                         {faqs.map((faq, i) => (
                            <AccordionItem value={`item-${i}`} key={i} className="bg-background border rounded-2xl">
                                <AccordionTrigger className="p-6 text-lg font-bold text-left">{faq.q}</AccordionTrigger>
                                <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                            </AccordionItem>
                         ))}
                     </Accordion>
                 </div>
            </section>

             <Dialog open={isSuccessModalOpen} onOpenChange={setSuccessModalOpen}>
                <DialogContent>
                    <DialogHeader className="text-center items-center">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                           <Check className="text-green-500 h-10 w-10" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-theme-primary mb-3">Application Submitted!</DialogTitle>
                        <DialogDescription className="text-theme-secondary mb-8 leading-relaxed">Thank you for applying! We'll review your application and get back to you within 24 hours.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center">
                        <Button onClick={() => setSuccessModalOpen(false)}>Got It!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
