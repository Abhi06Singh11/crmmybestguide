
'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { developerProfileData } from '@/lib/developer-dashboard-data';
import { useToast } from '@/hooks/use-toast';


const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  role: z.string().min(2, "Role must be at least 2 characters."),
  bio: z.string().max(300, "Bio cannot exceed 300 characters.").optional(),
  skills: z.string().optional(),
  tools: z.string().optional(),
});


export default function DeveloperSettingsPage() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: developerProfileData.name,
            role: developerProfileData.role,
            bio: developerProfileData.bio,
            skills: developerProfileData.skills.join(', '),
            tools: developerProfileData.tools.join(', '),
        },
    });

    function onProfileSubmit(values: z.infer<typeof profileSchema>) {
        console.log("Profile updated:", values);
        toast({
            title: "Profile Updated",
            description: "Your profile information has been saved successfully.",
        });
    }

  return (
    <Tabs defaultValue="availability" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="availability">Availability</TabsTrigger>
        <TabsTrigger value="profile">Profile & Skills</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="availability">
        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
            <CardDescription>
              Set your availability for new projects.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="availability-status">Current Status</Label>
               <Select defaultValue="busy">
                  <SelectTrigger id="availability-status">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available for new projects</SelectItem>
                    <SelectItem value="busy">Busy (finishing a project)</SelectItem>
                    <SelectItem value="unavailable">Unavailable (on a break)</SelectItem>
                  </SelectContent>
                </Select>
            </div>
             <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="auto-disable">Automatic Bidding</Label>
                    <p className="text-sm text-muted-foreground">
                        Automatically disable bidding on new projects when you are set to "Busy" or "Unavailable".
                    </p>
                </div>
                <Switch id="auto-disable" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Availability</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="profile">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onProfileSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Profile & Skills</CardTitle>
                <CardDescription>
                  Manage your public profile and technical expertise.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem><FormLabel>Role / Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="bio" render={({ field }) => (
                    <FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="skills" render={({ field }) => (
                    <FormItem><FormLabel>Skills</FormLabel><FormControl><Input placeholder='e.g. Node.js, Python, Databases' {...field} /></FormControl><FormDescription>Comma-separated list of your technical skills.</FormDescription><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="tools" render={({ field }) => (
                    <FormItem><FormLabel>Tools & Frameworks</FormLabel><FormControl><Input placeholder='e.g. VS Code, Docker, Jira' {...field} /></FormControl><FormDescription>Comma-separated list of tools you use.</FormDescription><FormMessage /></FormItem>
                )}/>
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
                    <Label className="text-base" htmlFor="project-updates">New Project Assignments</Label>
                    <p className="text-sm text-muted-foreground">
                        When a marketer assigns you to a new project.
                    </p>
                </div>
                <Switch id="project-updates" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="payment-notifs">Payment Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                        When a payment for a completed project is released.
                    </p>
                </div>
                <Switch id="payment-notifs" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="team-messages">Project Messages</Label>
                    <p className="text-sm text-muted-foreground">
                        When you receive a new message about an active project.
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
    </Tabs>
  )
}
