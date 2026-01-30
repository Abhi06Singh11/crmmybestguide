
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { marketerProfileData } from '@/lib/dashboard-data';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { useState } from 'react';

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  role: z.string().min(2, "Role must be at least 2 characters."),
  bio: z.string().max(300, "Bio cannot exceed 300 characters.").optional(),
  skills: z.string().optional(),
  availability: z.string(),
  linkedin: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
});


export default function SettingsPage() {
    const { toast } = useToast();
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: marketerProfileData.name,
            email: "alex.ray@example.com", // hardcoded as it is not in the data file
            role: marketerProfileData.role,
            bio: "Experienced marketer specializing in SEO, content strategy, and lead generation for tech startups.", // hardcoded
            skills: marketerProfileData.skills.join(', '),
            availability: marketerProfileData.availability,
            linkedin: "https://linkedin.com/in/alexray", // hardcoded
            twitter: "https://twitter.com/alexray", // hardcoded
        },
    });

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    function onSubmit(values: z.infer<typeof profileSchema>) {
        console.log("Profile updated:", values);
        toast({
            title: "Profile Updated",
            description: "Your profile information has been saved successfully.",
        });
    }

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your public and internal profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className='flex items-center gap-6'>
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                           {avatarPreview ? 
                                <Image src={avatarPreview} alt="Avatar preview" fill className="object-cover" />
                                : <AvatarFallback className="text-3xl">{marketerProfileData.initials}</AvatarFallback>
                            }
                        </Avatar>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="picture">Profile Picture</Label>
                        <Input id="picture" type="file" accept="image/*" onChange={handleAvatarChange} />
                        <p className='text-sm text-muted-foreground'>Upload a new photo. We recommend a 200x200px image.</p>
                    </div>
                </div>
                 <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem><FormLabel>Role / Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="bio" render={({ field }) => (
                    <FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="skills" render={({ field }) => (
                    <FormItem><FormLabel>Skills</FormLabel><FormControl><Input placeholder='e.g. SEO, Google Ads, Content Strategy' {...field} /></FormControl><FormDescription>Comma-separated list of your top skills.</FormDescription><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="availability" render={({ field }) => (
                    <FormItem><FormLabel>Availability</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Available for new projects">Available for new projects</SelectItem>
                                <SelectItem value="At capacity">At capacity</SelectItem>
                                <SelectItem value="Unavailable">Unavailable</SelectItem>
                            </SelectContent>
                        </Select>
                    <FormMessage /></FormItem>
                )}/>
                 <div className='grid md:grid-cols-2 gap-6'>
                    <FormField control={form.control} name="linkedin" render={({ field }) => (
                        <FormItem><FormLabel>LinkedIn URL</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="twitter" render={({ field }) => (
                        <FormItem><FormLabel>Twitter URL</FormLabel><FormControl><Input placeholder="https://twitter.com/..." {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                 </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Profile</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Choose how you want to be notified about platform activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="project-updates">Project Updates</Label>
                    <p className="text-sm text-muted-foreground">
                        When a project status changes or a new task is assigned to you.
                    </p>
                </div>
                <Switch id="project-updates" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="payment-notifs">Payments & Invoices</Label>
                    <p className="text-sm text-muted-foreground">
                        When a payment is approved or an invoice is paid.
                    </p>
                </div>
                <Switch id="payment-notifs" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="team-messages">Team Messages</Label>
                    <p className="text-sm text-muted-foreground">
                        When you receive a new direct message or a mention in a team chat.
                    </p>
                </div>
                <Switch id="team-messages" />
            </div>
          </CardContent>
           <CardFooter>
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle>Billing & Payouts</CardTitle>
            <CardDescription>
              Manage your payment methods and payout schedule.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="payout-method">Payout Method</Label>
               <Select defaultValue="bank-transfer">
                  <SelectTrigger id="payout-method">
                    <SelectValue placeholder="Select a method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank-transfer">Bank Transfer (**** 1234)</SelectItem>
                    <SelectItem value="paypal">PayPal (a***@example.com)</SelectItem>
                    <SelectItem value="wise">Wise</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payout-schedule">Payout Schedule</Label>
               <Select defaultValue="monthly">
                  <SelectTrigger id="payout-schedule">
                    <SelectValue placeholder="Select a schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Billing Info</Button>
          </CardFooter>
        </Card>
      </TabsContent>
       <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Update your password and manage account security.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
             <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg mt-6">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="2fa">Two-Factor Authentication (2FA)</Label>
                    <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                    </p>
                </div>
                <Switch id="2fa" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
