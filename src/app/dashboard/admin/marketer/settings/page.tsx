
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminMarketerSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketer Settings</CardTitle>
        <CardDescription>
          Manage default settings for the marketer dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
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
              <div>
                <Button>Save General Settings</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                  <div className="space-y-0.5">
                      <Label className="text-base" htmlFor="project-updates">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                          Receive email alerts for important campaign events.
                      </p>
                  </div>
                  <Switch id="project-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                  <div className="space-y-0.5">
                      <Label className="text-base" htmlFor="payment-notifs">SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                          Receive SMS alerts for urgent approvals or issues.
                      </p>
                  </div>
                  <Switch id="payment-notifs" />
              </div>
              <div>
                <Button>Save Preferences</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                  <div className="space-y-0.5">
                      <Label className="text-base" htmlFor="2fa">Enforce Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                          Require all marketer users to set up 2FA.
                      </p>
                  </div>
                  <Switch id="2fa" defaultChecked/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
              <div>
                <Button>Save Security Settings</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
