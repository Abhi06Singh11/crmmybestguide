
'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
    <Card>
      <CardHeader>
        <CardTitle>Global Settings</CardTitle>
        <CardDescription>
          Manage platform-wide settings and configurations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="MyBestGuide" />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="platform-url">Platform URL</Label>
                  <Input id="platform-url" defaultValue="https://www.mybestguide.com" />
              </div>
              <div>
                <Button>Save General Settings</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="branding" className="mt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <Input id="logo" type="file" />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <Input id="primary-color" type="color" defaultValue="#0052cc" />
              </div>
              <div>
                <Button>Save Branding</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                  <Label htmlFor="welcome-email">Welcome Email Template</Label>
                  <Textarea id="welcome-email" rows={5} defaultValue="Welcome to MyBestGuide, {{user.name}}! We're glad to have you." />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="payout-email">Payout Notification Template</Label>
                  <Textarea id="payout-email" rows={5} defaultValue="Your payout of ${{amount}} for project '{{project.name}}' has been processed." />
              </div>
              <div>
                <Button>Save Templates</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <div className="space-y-6">
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
              <div>
                <Button>Save Security Settings</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
