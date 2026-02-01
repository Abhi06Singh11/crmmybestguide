
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
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const newClientSchema = z.object({
  name: z.string().min(2, { message: "Client name must be at least 2 characters." }),
  contactPerson: z.string().min(2, { message: "Contact person's name is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().optional(),
  priority: z.string().min(1, { message: "Please select a priority level." }),
  notes: z.string().optional(),
});

export default function NewClientPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof newClientSchema>>({
    resolver: zodResolver(newClientSchema),
    defaultValues: {
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      priority: 'Medium',
      notes: '',
    },
  });

  const onSubmit = (values: z.infer<typeof newClientSchema>) => {
    console.log("New client created:", values);
    toast({
      title: "Client Created",
      description: `Client "${values.name}" has been added successfully.`,
    });
    router.push('/d/marketer/clients');
  };

  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Add New Client</CardTitle>
              <CardDescription>Fill out the form to add a new client to your list.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Client Name</FormLabel><FormControl><Input placeholder="e.g., Quantum Solutions" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="contactPerson" render={({ field }) => (
                        <FormItem><FormLabel>Contact Person</FormLabel><FormControl><Input placeholder="e.g., John Smith" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" placeholder="e.g., john.smith@quantum.dev" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="priority" render={({ field }) => (
                    <FormItem><FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                        </Select><FormMessage />
                    </FormItem>
                    )} />
                </div>
                 <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem><FormLabel>Internal Notes (Optional)</FormLabel><FormControl><Textarea placeholder="Add any relevant notes about this client..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </CardContent>
            <CardFooter>
              <Button type="submit">Create Client</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
