
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { availableProjectsData } from '@/lib/developer-available-projects-data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign, Calendar, Cpu, Briefcase, User, CalendarIcon, Upload } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const bidSchema = z.object({
  bidAmount: z.coerce.number().positive("Bid amount must be a positive number."),
  completionDate: z.date({
    required_error: "A completion date is required.",
  }),
  proposal: z.string().min(20, "Proposal must be at least 20 characters.").optional(),
  resume: z.any().optional(),
  portfolioLink: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  additionalSkills: z.string().optional(),
});


export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;

  const project = availableProjectsData.find(p => p.id === id);
  const [resumeFileName, setResumeFileName] = useState('');

  const form = useForm<z.infer<typeof bidSchema>>({
    resolver: zodResolver(bidSchema),
    defaultValues: {
      proposal: '',
      portfolioLink: '',
      additionalSkills: '',
    },
  });

  function onSubmit(values: z.infer<typeof bidSchema>) {
    console.log("Bid submitted:", values);
    toast({
        title: "Bid Submitted!",
        description: `Your bid for "${project?.name}" has been placed successfully.`,
    });
    form.reset();
    setResumeFileName('');
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl font-bold">Project Not Found</h1>
        <p className="text-muted-foreground">The project you are looking for does not exist.</p>
        <Button onClick={() => router.push('/d/developer/available-projects')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Available Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => router.push('/d/developer/available-projects')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Available Projects
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{project.name}</CardTitle>
          <CardDescription>Client: {project.client}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
             <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <User className="h-5 w-5 text-primary" />
                <div>
                    <p className="text-muted-foreground">Posted By</p>
                    <p className="font-semibold">{project.postedBy}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-semibold">{project.budget}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                    <p className="text-muted-foreground">Timeline</p>
                    <p className="font-semibold">{project.deadline}</p>
                </div>
            </div>
             <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:text-green-300">{project.status}</Badge>
                </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Project Description</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><Cpu /> Required Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-base px-3 py-1">{tech}</Badge>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Place Your Bid</CardTitle>
          <CardDescription>Submit your proposal for this project.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="bidAmount" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Your Bid Amount (₹)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 1400000" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="completionDate" render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Expected Completion Date</FormLabel>
                            <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                />
                            </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField control={form.control} name="proposal" render={({ field }) => (
                    <FormItem>
                    <FormLabel>Proposal / Notes</FormLabel>
                    <FormControl>
                        <Textarea rows={5} placeholder="Briefly outline your approach, why you're a good fit, or any clarifying questions." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="resume" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Resume / CV</FormLabel>
                        <FormControl>
                            <Input 
                                type="file" 
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                    field.onChange(e.target.files);
                                    if (e.target.files && e.target.files.length > 0) {
                                        setResumeFileName(e.target.files[0].name);
                                    } else {
                                        setResumeFileName('');
                                    }
                                }}
                                className="hidden"
                                id="resume-upload"
                            />
                        </FormControl>
                        <label htmlFor="resume-upload" className="flex items-center gap-2 cursor-pointer text-sm text-primary underline-offset-4 hover:underline">
                            <Upload className="h-4 w-4" />
                            {resumeFileName || 'Upload PDF/Word document'}
                        </label>
                        <FormDescription>Optional. Your latest resume or CV.</FormDescription>
                        <FormMessage />
                    </FormItem>
                 )} />
                 <FormField control={form.control} name="portfolioLink" render={({ field }) => (
                    <FormItem>
                    <FormLabel>Portfolio Link</FormLabel>
                    <FormControl>
                        <Input placeholder="https://github.com/your-profile" {...field} />
                    </FormControl>
                     <FormDescription>Optional. Link to your GitHub, Behance, or personal portfolio.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="additionalSkills" render={({ field }) => (
                    <FormItem>
                    <FormLabel>Additional Skills / Certifications</FormLabel>
                    <FormControl>
                        <Textarea placeholder="List any other relevant skills or certifications not on your profile." {...field} />
                    </FormControl>
                    <FormDescription>Optional. Mention any special expertise you bring.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )} />
                <div className="pt-4">
                    <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Submitting...' : 'Submit Bid'}
                    </Button>
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  );
}
