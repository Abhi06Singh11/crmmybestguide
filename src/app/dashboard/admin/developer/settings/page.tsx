
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

export default function AdminDeveloperSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer Settings</CardTitle>
        <CardDescription>
          Manage default settings for the developer dashboard.
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
                  <Label htmlFor="currency">Default Currency for Budgets</Label>
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
              <div>
                <Button>Save General Settings</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                  <div className="space-y-0.5">
                      <Label className="text-base" htmlFor="deployment-alerts">Deployment Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                          Receive email alerts for successful or failed deployments.
                      </p>
                  </div>
                  <Switch id="deployment-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                  <div className="space-y-0.5">
                      <Label className="text-base" htmlFor="payout-alerts">SMS Alerts for Critical Issues</Label>
                      <p className="text-sm text-muted-foreground">
                          Receive SMS alerts for urgent production issues.
                      </p>
                  </div>
                  <Switch id="payout-alerts" />
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
                          Require all developer users to set up 2FA.
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
