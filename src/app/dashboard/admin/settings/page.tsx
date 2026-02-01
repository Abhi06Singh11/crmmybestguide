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
import { Textarea } from "@/components/ui/textarea";

export default function AdminSettingsPage() {
  return (
     <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="branding">Branding</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage basic platform settings and configurations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input id="platform-name" defaultValue="MyBestGuide" />
             </div>
             <div className="space-y-2">
                <Label htmlFor="platform-url">Platform URL</Label>
                <Input id="platform-url" defaultValue="https://www.mybestguide.com" />
             </div>
          </CardContent>
           <CardFooter>
            <Button>Save General Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="branding">
        <Card>
          <CardHeader>
            <CardTitle>Branding & Appearance</CardTitle>
            <CardDescription>
              Customize the look and feel of the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <Input id="logo" type="file" />
             </div>
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Input id="primary-color" type="color" defaultValue="#0052cc" />
             </div>
          </CardContent>
           <CardFooter>
            <Button>Save Branding</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification & Email Templates</CardTitle>
            <CardDescription>
              Manage automated notifications sent to users.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="welcome-email">Welcome Email Template</Label>
                <Textarea id="welcome-email" rows={5} defaultValue="Welcome to MyBestGuide, {{user.name}}! We're glad to have you." />
             </div>
              <div className="space-y-2">
                <Label htmlFor="payout-email">Payout Notification Template</Label>
                <Textarea id="payout-email" rows={5} defaultValue="Your payout of ${{amount}} for project '{{project.name}}' has been processed." />
             </div>
          </CardContent>
           <CardFooter>
            <Button>Save Templates</Button>
          </CardFooter>
        </Card>
      </TabsContent>
       <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security & Access Control</CardTitle>
            <CardDescription>
              Manage platform-wide security settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="2fa-global">Enforce Two-Factor Authentication (2FA)</Label>
                    <p className="text-sm text-muted-foreground">
                        Require all users to set up 2FA for enhanced security.
                    </p>
                </div>
                <Switch id="2fa-global" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
             </div>
          </CardContent>
           <CardFooter>
            <Button>Save Security Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
