
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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function NetworkSettingsPage() {
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
              Manage your public profile and technical expertise.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Casey Becker" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role / Title</Label>
              <Input id="role" defaultValue="Network Engineer" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="bio">Short Bio</Label>
              <Textarea id="bio" defaultValue="Dedicated Network Engineer with 5 years of experience in troubleshooting, maintenance, and incident resolution for web applications." />
            </div>
             <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input id="skills" defaultValue="Linux, AWS, Docker, SQL, Nginx, Firewalls, Jenkins" />
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
              Set your availability for new tasks and on-call duties.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="availability-status">Current Status</Label>
               <Select defaultValue="available">
                  <SelectTrigger id="availability-status">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available for new tasks</SelectItem>
                    <SelectItem value="busy">Busy (at capacity)</SelectItem>
                    <SelectItem value="unavailable">Unavailable (on leave)</SelectItem>
                  </SelectContent>
                </Select>
            </div>
             <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="on-call">On-Call Ready</Label>
                    <p className="text-sm text-muted-foreground">
                        Allow assignment of critical, off-hours tickets when you are available.
                    </p>
                </div>
                <Switch id="on-call" defaultChecked />
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
              Choose how you want to be notified about support tickets.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="new-ticket">New Ticket Assignment</Label>
                    <p className="text-sm text-muted-foreground">
                        Notify me when a new ticket is assigned to me.
                    </p>
                </div>
                <Switch id="new-ticket" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="critical-alert">Critical Alerts (SMS)</Label>
                    <p className="text-sm text-muted-foreground">
                        Send an SMS for new 'Critical' priority tickets.
                    </p>
                </div>
                <Switch id="critical-alert" />
            </div>
            <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="sla-breach">SLA Breach Warning</Label>
                    <p className="text-sm text-muted-foreground">
                        Notify me when a ticket is close to breaching its SLA.
                    </p>
                </div>
                <Switch id="sla-breach" defaultChecked />
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
