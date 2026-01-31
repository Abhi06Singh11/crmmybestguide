'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { availableProjectsData } from '@/lib/developer-available-projects-data';
import { useToast } from '@/hooks/use-toast';

const bidSchema = z.object({
  bidAmount: z.coerce.number().positive("Bid amount must be positive."),
  completionDate: z.date({
    required_error: "A completion date is required.",
  }),
  notes: z.string().optional(),
});

export default function BidPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const projectId = searchParams.get('projectId');
  const project = availableProjectsData.find(p => p.id === projectId);

  const form = useForm<z.infer<typeof bidSchema>>({
    resolver: zodResolver(bidSchema),
    defaultValues: {
      notes: '',
    },
  });

  function onSubmit(values: z.infer<typeof bidSchema>) {
    console.log("Bid submitted:", values);
    toast({
        title: "Bid Submitted!",
        description: `Your bid for "${project?.name}" has been placed successfully.`,
    });
    router.push('/d/developer/available-projects');
  }

  if (!project) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-2xl font-bold">Project Not Found</h1>
            <p className="text-muted-foreground">The project ID is missing or invalid.</p>
            <Button onClick={() => router.push('/d/developer/available-projects')} className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Available Projects
            </Button>
        </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div>
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Project
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Place a Bid</CardTitle>
              <CardDescription>
                You are bidding on the project: <span className="font-semibold text-primary">{project.name}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField control={form.control} name="bidAmount" render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Bid Amount ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 18000" {...field} />
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
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
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
              <FormField control={form.control} name="notes" render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes / Proposal</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Briefly outline your approach, why you're a good fit, or any clarifying questions." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
            <CardFooter>
              <Button type="submit">Submit Bid</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
