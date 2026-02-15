'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ArrowLeft, CheckCircle, Rocket, Globe, ShoppingCart, Lightbulb, XCircle, Info, Puzzle, Headset, Megaphone, Store, Gift, FileText, PaintBrush, Gauge, Bot, CalendarCheck, Search, Hash, Filter, Box, Settings, Check, Hand, LineChart, AlertTriangle, Mail, HandCoins, ArrowRight, Code, CodeXml, Workflow, Share2, Component, Milestone, GitBranch } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const randomDuration = Math.floor(Math.random() * (12 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000 + 1) + 3 * 60 * 60 * 1000);
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

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        businessName: '',
        websiteType: '',
        industry: '',
        customIndustry: '',
        addons: [] as string[],
        terms: false,
    });

    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => setCurrentStep(currentStep - 1);

    const validateStep = (step: number) => {
        let isValid = true;
        const requiredFields: (keyof typeof formData)[] = [];
        if (step === 1) requiredFields.push('fullName', 'email', 'phone', 'businessName');
        if (step === 2) requiredFields.push('websiteType');
        if (step === 4) requiredFields.push('industry');
        if (step === 5) requiredFields.push('terms');

        for (const field of requiredFields) {
            if (!formData[field]) {
                isValid = false;
                toast({
                    variant: 'destructive',
                    title: 'Missing Information',
                    description: `Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`,
                });
                break;
            }
        }
        return isValid;
    };
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validateStep(5) || !formData.terms) {
            toast({
                variant: 'destructive',
                title: 'Terms Not Accepted',
                description: 'You must agree to the terms to proceed.',
            });
            return;
        }

        const message = `
=========================
Free website Contact Form Submission
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Business Name: ${formData.businessName}
Selected Plan: ${formData.websiteType}
Add-Ons Selected:
${formData.addons.length > 0 ? formData.addons.map(a => '- ' + a).join('\n') : 'None'}
Website Industry: ${formData.industry === 'Custom' ? formData.customIndustry : formData.industry}
=========================
        `;
        const encodedMessage = encodeURIComponent(message.trim());
        const whatsappUrl = `https://wa.me/917379848171?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');

        setSuccessModalOpen(true);
        setCurrentStep(1);
    };


    const addOns = {
        "Performance & Design": [
            { id: "custom-ui", label: "Custom UI/UX Design", price: "₹999+", description: "Tailored branding & unique layout" },
            { id: "speed-opt", label: "Speed Optimization", price: "₹899", description: "Faster load times & higher scores" },
        ],
        "Support Plans": [
            { id: "basic-support", label: "Basic Support (₹499/mo)", price: "₹499/mo", description: "5 tickets, 48hr response" },
            { id: "growth-support", label: "Growth Support (₹1,499/mo)", price: "₹1,499/mo", description: "30 tickets, Priority, WhatsApp" },
        ],
    };

    return (
        <div className="w-full">
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
                        <Badge variant="secondary" className="bg-white/10 text-white px-5 py-2 rounded-full text-sm font-medium mb-8 border border-white/20 animate-fade-in-up">
                            <span className="relative flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            Limited-Time Offer
                        </Badge>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight drop-shadow-sm">
                            Get a 100% FREE<br />Professional Website
                        </h1>
                        <div className="mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-2xl mx-auto border border-white/10 shadow-2xl">
                             <CountdownTimer />
                         </div>
                    </div>
                </div>
            </section>
            
            <section id="apply" className="py-24 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                     <Card className="rounded-3xl p-8 md:p-12 border shadow-lg shadow-primary/5">
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Step {currentStep} of {totalSteps}</span>
                                <span className="text-xs font-bold text-primary">{['User Details', 'Project Details', 'Add-Ons', 'Select Industry', 'Review & Submit'][currentStep - 1]}</span>
                            </div>
                            <Progress value={(currentStep / totalSteps) * 100} />
                        </div>

                        <form onSubmit={handleSubmit}>
                            {currentStep === 1 && (
                                <div className="animate-in fade-in-0 duration-500">
                                    <h3 className="text-xl font-bold text-foreground mb-6">Tell us about yourself</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <Input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="Full Name" required />
                                        <Input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="Email Address" required />
                                        <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" placeholder="Phone Number" required />
                                        <Input value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} placeholder="Business Name" required />
                                    </div>
                                </div>
                            )}
                            {currentStep === 2 && (
                                <div className="animate-in fade-in-0 duration-500">
                                    <h3 className="text-xl font-bold text-foreground mb-6">What type of website do you need?</h3>
                                    <Select onValueChange={value => setFormData({...formData, websiteType: value})} value={formData.websiteType}>
                                        <SelectTrigger><SelectValue placeholder="Select a category..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Basic Website">Basic Website</SelectItem>
                                            <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                             {currentStep === 3 && (
                                <div className="animate-in fade-in-0 duration-500">
                                    <h3 className="text-xl font-bold text-foreground mb-6">Select Add-Ons & Enhancements</h3>
                                     <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                        {Object.entries(addOns).map(([category, items]) => (
                                            <div key={category}>
                                                <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-3 sticky top-0 bg-background py-2 z-10">{category}</h4>
                                                <div className="grid md:grid-cols-2 gap-3">
                                                    {items.map(item => (
                                                        <label key={item.id} className="flex items-start p-3 rounded-xl border bg-secondary hover:bg-muted transition cursor-pointer group relative">
                                                            <Checkbox
                                                                id={item.id}
                                                                checked={formData.addons.includes(item.label)}
                                                                onCheckedChange={checked => {
                                                                    const newAddons = checked ? [...formData.addons, item.label] : formData.addons.filter(a => a !== item.label);
                                                                    setFormData({...formData, addons: newAddons});
                                                                }}
                                                            />
                                                            <div className="ml-3">
                                                                <span className="block text-sm font-bold text-card-foreground group-hover:text-primary transition">{item.label}</span>
                                                                <span className="block text-xs text-muted-foreground mt-0.5">{item.description}</span>
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {currentStep === 4 && (
                                <div className="animate-in fade-in-0 duration-500">
                                    <h3 className="text-xl font-bold text-foreground mb-6">Select Industry</h3>
                                    <Select onValueChange={value => setFormData({...formData, industry: value, customIndustry: value === 'Custom' ? formData.customIndustry : ''})} value={formData.industry}>
                                        <SelectTrigger><SelectValue placeholder="Select your industry..." /></SelectTrigger>
                                        <SelectContent>
                                            {["Professional Services", "Healthcare & Wellness", "Retail & E-Commerce", "Food & Restaurant", "Real Estate", "Education & Coaching", "Technology & SaaS", "Creative & Design", "Construction & Home Services", "Custom"].map(industry => (
                                                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {formData.industry === 'Custom' && (
                                        <Input className="mt-4" placeholder="Please specify your industry" value={formData.customIndustry} onChange={e => setFormData({...formData, customIndustry: e.target.value})} />
                                    )}
                                </div>
                            )}
                            {currentStep === 5 && (
                                <div className="animate-in fade-in-0 duration-500">
                                    <h3 className="text-xl font-bold text-foreground mb-6">Review & Submit</h3>
                                    <div className="bg-muted rounded-xl p-6 mb-6 border space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                                            <div><p className="text-xs uppercase text-muted-foreground">Name</p><p className="font-semibold">{formData.fullName}</p></div>
                                            <div><p className="text-xs uppercase text-muted-foreground">Email</p><p className="font-semibold">{formData.email}</p></div>
                                            <div><p className="text-xs uppercase text-muted-foreground">Phone</p><p className="font-semibold">{formData.phone}</p></div>
                                            <div><p className="text-xs uppercase text-muted-foreground">Business</p><p className="font-semibold">{formData.businessName}</p></div>
                                        </div>
                                         <div className="text-sm">
                                            <p className="text-xs uppercase text-muted-foreground mb-1">Add-Ons</p>
                                            <ul className="list-disc list-inside font-medium">
                                                {formData.addons.length > 0 ? formData.addons.map(a => <li key={a}>{a}</li>) : <li>None selected</li>}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-6">
                                        <Checkbox id="terms" checked={formData.terms} onCheckedChange={checked => setFormData({...formData, terms: checked as boolean})} />
                                        <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer select-none">
                                            I agree to the Terms of Service and understand I will be redirected to WhatsApp to complete my application.
                                        </label>
                                    </div>
                                </div>
                            )}
                             <div className="flex items-center justify-between mt-8 pt-6 border-t">
                                <Button type="button" variant="ghost" onClick={handlePrevStep} className={cn(currentStep === 1 && 'invisible')}>Back</Button>
                                {currentStep < totalSteps ? (
                                    <Button type="button" onClick={handleNextStep}>Next Step <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                ) : (
                                    <Button type="submit"><WhatsAppIcon className="mr-2"/> Submit via WhatsApp</Button>
                                )}
                            </div>
                        </form>
                    </Card>
                </div>
            </section>
            
            <Dialog open={isSuccessModalOpen} onOpenChange={setSuccessModalOpen}>
                <DialogContent>
                    <DialogHeader className="items-center text-center">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="text-green-500 w-12 h-12" />
                        </div>
                        <DialogTitle className="text-2xl">Application Submitted!</DialogTitle>
                        <DialogDescription>Thank you for applying! We'll review your application and get back to you within 24 hours.</DialogDescription>
                    </DialogHeader>
                     <DialogFooter>
                        <Button onClick={() => setSuccessModalOpen(false)} className="w-full">Got It!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
