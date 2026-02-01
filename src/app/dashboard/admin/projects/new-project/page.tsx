
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Link from 'next/link';

// Define schemas for each step
const stepOneSchema = z.object({
  projectName: z.string().min(3, 'Project name must be at least 3 characters.'),
  clientName: z.string().min(3, 'Client name must be at least 3 characters.'),
  description: z.string().optional(),
});

const stepTwoSchema = z.object({
  projectManager: z.string().min(1, 'Please assign a project manager.'),
  budget: z.coerce.number().positive('Budget must be a positive number.'),
  deadline: z.string().refine((val) => val && !isNaN(Date.parse(val)), {
    message: 'Please enter a valid date.',
  }),
});

// Combine schemas
const projectSchema = stepOneSchema.merge(stepTwoSchema);

type ProjectFormData = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const steps = [
    { number: 1, title: 'Project Details' },
    { number: 2, title: 'Team & Timeline' },
    { number: 3, title: 'Review & Submit' },
  ];

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(
      currentStep === 1 ? stepOneSchema : currentStep === 2 ? stepTwoSchema : projectSchema
    ),
    mode: 'onChange',
    defaultValues: {
      projectName: '',
      clientName: '',
      description: '',
      projectManager: '',
      budget: undefined,
      deadline: '',
    },
  });

  const handleNextStep = async () => {
    const fieldsToValidate = currentStep === 1 
      ? ['projectName', 'clientName', 'description'] as const
      : ['projectManager', 'budget', 'deadline'] as const;

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = (data: ProjectFormData) => {
    console.log('Project created:', data);
    setIsSuccessModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Create a New Project</CardTitle>
            <CardDescription>
              Follow the steps to set up a new project.
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
                    <FormField control={form.control} name="projectName" render={({ field }) => (
                        <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input placeholder="e.g., Q4 Marketing Website" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="clientName" render={({ field }) => (
                        <FormItem><FormLabel>Client Name</FormLabel><FormControl><Input placeholder="e.g., Innovate Inc." {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem><FormLabel>Project Description (Optional)</FormLabel><FormControl><Textarea placeholder="Briefly describe the project goals and scope." rows={4} {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4 animate-in fade-in-0">
                    <FormField control={form.control} name="projectManager" render={({ field }) => (
                        <FormItem><FormLabel>Project Manager</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a manager" /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="Alex Ray">Alex Ray</SelectItem><SelectItem value="Dana Scully">Dana Scully</SelectItem></SelectContent>
                        </Select><FormMessage /></FormItem>
                    )}/>
                     <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="budget" render={({ field }) => (
                            <FormItem><FormLabel>Budget ($)</FormLabel><FormControl><Input type="number" placeholder="e.g., 25000" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="deadline" render={({ field }) => (
                            <FormItem><FormLabel>Deadline</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/50 animate-in fade-in-0">
                        <h3 className="text-lg font-semibold">Review Project Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div><p className="text-muted-foreground">Project Name</p><p className="font-medium">{form.getValues('projectName') || 'Not set'}</p></div>
                            <div><p className="text-muted-foreground">Client</p><p className="font-medium">{form.getValues('clientName') || 'Not set'}</p></div>
                             <div><p className="text-muted-foreground">Manager</p><p className="font-medium">{form.getValues('projectManager') || 'Not set'}</p></div>
                            <div><p className="text-muted-foreground">Budget</p><p className="font-medium">${form.getValues('budget')?.toLocaleString() || 'Not set'}</p></div>
                             <div><p className="text-muted-foreground">Deadline</p><p className="font-medium">{form.getValues('deadline') ? new Date(form.getValues('deadline')).toLocaleDateString() : 'Not set'}</p></div>
                        </div>
                        <div><p className="text-muted-foreground">Description</p><p className="font-medium text-wrap break-words">{form.getValues('description') || 'N/A'}</p></div>
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
                <Button onClick={form.handleSubmit(onSubmit)}>Create Project</Button>
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
                <DialogTitle className="text-2xl">Project Created!</DialogTitle>
                <DialogDescription>
                    The project "{form.getValues('projectName')}" has been successfully created.
                </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center gap-2 pt-4">
                <Button variant="outline" onClick={() => {setIsSuccessModalOpen(false); form.reset(); setCurrentStep(1)}}>Create Another Project</Button>
                <Link href="/d/admin/projects">
                    <Button>View All Projects</Button>
                </Link>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
