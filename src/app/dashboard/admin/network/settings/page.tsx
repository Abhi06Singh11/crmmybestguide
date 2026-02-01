
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

export default function AdminNetworkSettingsPage() {
  return (
    <Tabs defaultValue="notifications" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
       <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Network Settings</CardTitle>
            <CardDescription>
              Manage default settings for the network dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="default-sla">Default SLA Policy</Label>
                <Select defaultValue="standard">
                  <SelectTrigger id="default-sla">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (4h response)</SelectItem>
                    <SelectItem value="premium">Premium (1h response)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (15m response)</SelectItem>
                  </SelectContent>
                </Select>
             </div>
             <div className="space-y-2">
                <Label htmlFor="timezone">Timezone for Logs</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">EST</SelectItem>
                    <SelectItem value="pst">PST</SelectItem>
                    <SelectItem value="ist">IST</SelectItem>
                  </SelectContent>
                </Select>
             </div>
          </CardContent>
           <CardFooter>
            <Button>Save General Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Choose how network professionals are notified.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="critical-alerts">Critical Incident Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                        Receive email alerts for critical incidents.
                    </p>
                </div>
                <Switch id="critical-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="sla-breach-alerts">SMS Alerts for SLA Breaches</Label>
                    <p className="text-sm text-muted-foreground">
                        Receive SMS alerts when an SLA is about to be breached.
                    </p>
                </div>
                <Switch id="sla-breach-alerts" />
            </div>
          </CardContent>
           <CardFooter>
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
       <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage security settings for network accounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg mt-6">
                <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="2fa">Enforce Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                        Require all network users to set up 2FA.
                    </p>
                </div>
                <Switch id="2fa" defaultChecked/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Security Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
