
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const newProjectSchema = z.object({
  projectName: z.string().min(3, "Project name is required."),
  projectType: z.string().min(1, "Project type is required."),
  priority: z.string().min(1, "Priority is required."),
  status: z.string().min(1, "Status is required."),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  totalBudget: z.coerce.number().positive().optional(),
  campaignObjective: z.string().optional(),
  landingPageUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal('')).optional(),
});

export default function NewMarketerProjectPage() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof newProjectSchema>>({
        resolver: zodResolver(newProjectSchema),
        defaultValues: {
            projectName: '',
            status: 'Draft',
            landingPageUrl: '',
        },
    });

    const onSubmit = (values: z.infer<typeof newProjectSchema>) => {
        console.log("New project created:", values);
        toast({
        title: "Project Created",
        description: `Project "${values.projectName}" has been created as a draft.`,
        });
        router.push('/d/admin/marketer/projects');
    };

    return (
        <div className="space-y-6">
            <div>
                <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
                </Button>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                    <CardTitle>Create New Marketing Project</CardTitle>
                    <CardDescription>Fill in the details to set up a new campaign, branding, or performance project.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                    
                    {/* Section 1: Project Overview */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Project Overview</h3>
                        <Separator />
                        <FormField control={form.control} name="projectName" render={({ field }) => (
                            <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input placeholder="e.g., Q4 Holiday Campaign" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                             <FormItem><FormLabel>Project Code/ID</FormLabel><FormControl><Input placeholder="Auto-generated" disabled /></FormControl></FormItem>
                             <FormField control={form.control} name="projectType" render={({ field }) => (
                                <FormItem><FormLabel>Project Type</FormLabel><Select onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="Campaign">Campaign</SelectItem><SelectItem value="Branding">Branding</SelectItem><SelectItem value="Performance">Performance</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="priority" render={({ field }) => (
                                <FormItem><FormLabel>Priority</FormLabel><Select onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue placeholder="Select priority..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="High">High</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="Low">Low</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="status" render={({ field }) => (
                                <FormItem><FormLabel>Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Draft">Draft</SelectItem><SelectItem value="Active">Active</SelectItem><SelectItem value="On Hold">On Hold</SelectItem><SelectItem value="Completed">Completed</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                            )}/>
                        </div>
                    </div>
                    
                    {/* Section 2: Project Timeline */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Project Timeline</h3>
                        <Separator />
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="startDate" render={({ field }) => (
                                <FormItem className="flex flex-col"><FormLabel>Start Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="endDate" render={({ field }) => (
                                <FormItem className="flex flex-col"><FormLabel>End Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < (form.getValues('startDate') || new Date())} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>
                            )}/>
                        </div>
                    </div>

                    {/* Section 3: Budget & Pricing */}
                     <div className="space-y-4">
                        <h3 className="text-lg font-medium">Budget & Pricing</h3>
                        <Separator />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                             <FormField control={form.control} name="totalBudget" render={({ field }) => (
                                <FormItem><FormLabel>Total Budget</FormLabel><FormControl><Input type="number" placeholder="e.g. 10000" {...field} /></FormControl><FormMessage /></FormItem>
                             )}/>
                            <FormItem><FormLabel>Budget Type</FormLabel><Select><FormControl><SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="Fixed">Fixed</SelectItem><SelectItem value="Hourly">Hourly</SelectItem><SelectItem value="Retainer">Retainer</SelectItem></SelectContent></Select></FormItem>
                             <FormItem><FormLabel>Currency</FormLabel><Select defaultValue="USD"><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="USD">USD</SelectItem><SelectItem value="INR">INR</SelectItem><SelectItem value="EUR">EUR</SelectItem></SelectContent></Select></FormItem>
                        </div>
                    </div>

                    {/* Section 4: Campaign Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Campaign Details</h3>
                        <Separator />
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="campaignObjective" render={({ field }) => (
                                <FormItem><FormLabel>Campaign Objective</FormLabel><Select onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue placeholder="Select objective..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="Brand Awareness">Brand Awareness</SelectItem><SelectItem value="Lead Generation">Lead Generation</SelectItem><SelectItem value="Sales">Sales</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="landingPageUrl" render={({ field }) => (
                                <FormItem><FormLabel>Landing Page URL</FormLabel><FormControl><Input placeholder="https://example.com/landing" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                        <FormItem>
                            <FormLabel>Channels</FormLabel>
                            <div className="flex flex-wrap gap-4 pt-2">
                                {['Social Media', 'Google Ads', 'Email', 'SEO', 'Content'].map(item => (
                                    <FormField key={item} name="channels" render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><Checkbox /></FormControl><FormLabel className="font-normal">{item}</FormLabel></FormItem>
                                    )} />
                                ))}
                            </div>
                        </FormItem>
                    </div>

                     {/* Section 5: Team */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Team & Roles</h3>
                        <Separator />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                             <FormItem><FormLabel>Assigned Marketer</FormLabel><Select><FormControl><SelectTrigger><SelectValue placeholder="Select marketer..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="Alex Ray">Alex Ray</SelectItem><SelectItem value="Dana Scully">Dana Scully</SelectItem></SelectContent></Select></FormItem>
                              <FormItem><FormLabel>Designer</FormLabel><Select><FormControl><SelectTrigger><SelectValue placeholder="Select designer..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="Diana Evans">Diana Evans</SelectItem></SelectContent></Select></FormItem>
                             <FormItem><FormLabel>Developer</FormLabel><Select><FormControl><SelectTrigger><SelectValue placeholder="Select developer..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="Bob Williams">Bob Williams</SelectItem><SelectItem value="Alice Johnson">Alice Johnson</SelectItem></SelectContent></Select></FormItem>
                        </div>
                    </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap items-center justify-end gap-2">
                        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button variant="secondary">Save Draft</Button>
                        <Button type="submit">Create Project</Button>
                    </CardFooter>
                </Card>
                </form>
            </Form>
        </div>
    );
}
