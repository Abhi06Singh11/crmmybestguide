
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, Calendar as CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const stepOneSchema = z.object({
  campaignName: z.string().min(3, 'Campaign name must be at least 3 characters.'),
  client: z.string().min(1, 'Please select a client.'),
  goal: z.string().min(1, 'Please select a campaign goal.'),
});

const stepTwoSchema = z.object({
  budget: z.coerce.number().positive('Budget must be a positive number.'),
  startDate: z.date({ required_error: 'A start date is required.' }),
  endDate: z.date({ required_error: 'An end date is required.' }),
});

const campaignSchema = stepOneSchema.merge(stepTwoSchema);

type CampaignFormData = z.infer<typeof campaignSchema>;

export default function NewCampaignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const steps = [
    { number: 1, title: 'Campaign Details' },
    { number: 2, title: 'Budget & Schedule' },
    { number: 3, title: 'Review & Launch' },
  ];

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(
      currentStep === 1 ? stepOneSchema : currentStep === 2 ? stepTwoSchema : campaignSchema
    ),
    mode: 'onChange',
    defaultValues: {
      campaignName: '',
      client: '',
      goal: '',
    },
  });

  const handleNextStep = async () => {
    const fieldsToValidate = currentStep === 1 
      ? ['campaignName', 'client', 'goal'] as const
      : ['budget', 'startDate', 'endDate'] as const;

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = (data: CampaignFormData) => {
    console.log('Campaign created:', data);
    setIsSuccessModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
            <CardDescription>
              Follow the steps to set up a new marketing campaign.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
                <Progress value={(currentStep / steps.length) * 100} className="w-full" />
                <div className="flex justify-between mt-2">
                    {steps.map(step => (
                        <div key={step.number} className="flex flex-col items-center text-center w-1/3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${currentStep >= step.number ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                {currentStep > step.number ? <CheckCircle className="h-4 w-4" /> : step.number}
                            </div>
                            <p className={`text-sm mt-1 ${currentStep >= step.number ? 'font-semibold' : 'text-muted-foreground'}`}>{step.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {currentStep === 1 && (
                  <div className="space-y-4 animate-in fade-in-0">
                    <FormField control={form.control} name="campaignName" render={({ field }) => (
                        <FormItem><FormLabel>Campaign Name</FormLabel><FormControl><Input placeholder="e.g., Q4 Holiday Promotion" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="client" render={({ field }) => (
                            <FormItem><FormLabel>Client</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a client" /></SelectTrigger></FormControl>
                                <SelectContent><SelectItem value="Innovate Inc.">Innovate Inc.</SelectItem><SelectItem value="Quantum Solutions">Quantum Solutions</SelectItem></SelectContent>
                            </Select><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="goal" render={({ field }) => (
                            <FormItem><FormLabel>Campaign Goal</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a goal" /></SelectTrigger></FormControl>
                                <SelectContent><SelectItem value="Brand Awareness">Brand Awareness</SelectItem><SelectItem value="Lead Generation">Lead Generation</SelectItem><SelectItem value="Sales">Sales</SelectItem></SelectContent>
                            </Select><FormMessage /></FormItem>
                        )}/>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4 animate-in fade-in-0">
                    <FormField control={form.control} name="budget" render={({ field }) => (
                        <FormItem><FormLabel>Total Budget ($)</FormLabel><FormControl><Input type="number" placeholder="e.g., 10000" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                     <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="startDate" render={({ field }) => (
                            <FormItem className="flex flex-col"><FormLabel>Start Date</FormLabel>
                                <Popover><PopoverTrigger asChild>
                                    <FormControl><Button variant="outline" className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button></FormControl>
                                </PopoverTrigger><PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus/>
                                </PopoverContent></Popover><FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="endDate" render={({ field }) => (
                           <FormItem className="flex flex-col"><FormLabel>End Date</FormLabel>
                                <Popover><PopoverTrigger asChild>
                                    <FormControl><Button variant="outline" className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button></FormControl>
                                </PopoverTrigger><PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < (form.getValues('startDate') || new Date())} initialFocus/>
                                </PopoverContent></Popover><FormMessage />
                            </FormItem>
                        )}/>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/50 animate-in fade-in-0">
                        <h3 className="text-lg font-semibold">Review Campaign Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div><p className="text-muted-foreground">Campaign Name</p><p className="font-medium">{form.getValues('campaignName') || 'Not set'}</p></div>
                            <div><p className="text-muted-foreground">Client</p><p className="font-medium">{form.getValues('client') || 'Not set'}</p></div>
                            <div><p className="text-muted-foreground">Goal</p><p className="font-medium">{form.getValues('goal') || 'Not set'}</p></div>
                            <div><p className="text-muted-foreground">Budget</p><p className="font-medium">${form.getValues('budget')?.toLocaleString() || 'Not set'}</p></div>
                            <div><p className="text-muted-foreground">Start Date</p><p className="font-medium">{form.getValues('startDate') ? format(form.getValues('startDate')!, "PPP") : 'Not set'}</p></div>
                            <div><p className="text-muted-foreground">End Date</p><p className="font-medium">{form.getValues('endDate') ? format(form.getValues('endDate')!, "PPP") : 'Not set'}</p></div>
                        </div>
                    </div>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep} className={currentStep === 1 ? 'invisible' : ''}>Previous</Button>
            {currentStep < steps.length && (
              <Button onClick={handleNextStep}>Next</Button>
            )}
            {currentStep === steps.length && (
                <Button onClick={form.handleSubmit(onSubmit)}>Launch Campaign</Button>
            )}
          </CardFooter>
        </Card>
      </div>

       <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader className="items-center text-center">
                <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full w-fit">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <DialogTitle className="text-2xl">Campaign Created!</DialogTitle>
                <DialogDescription>
                    The campaign "{form.getValues('campaignName')}" has been successfully created.
                </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center gap-2 pt-4">
                <Button variant="outline" onClick={() => {setIsSuccessModalOpen(false); form.reset(); setCurrentStep(1)}}>Create Another Campaign</Button>
                <Link href="/d/admin/marketer/projects">
                    <Button>View All Campaigns</Button>
                </Link>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
