
'use client';

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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function DeveloperSettingsPage() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile & Skills</TabsTrigger>
        <TabsTrigger value="availability">Availability</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile & Skills</CardTitle>
            <CardDescription>
              Manage your public profile information and technical skills.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Bob Williams" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role / Title</Label>
              <Input id="role" defaultValue="Senior Backend Developer" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="bio">Short Bio</Label>
              <Textarea id="bio" defaultValue="Senior backend developer with 7 years of experience in building scalable and reliable systems. Proficient in Node.js, Python, and cloud-native architectures." />
            </div>
             <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input id="skills" defaultValue="Node.js, Python, Databases, AWS, Docker, Kubernetes" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Profile</Button>
          </CardFooter>
        </Card>
      </TabsContent>
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
