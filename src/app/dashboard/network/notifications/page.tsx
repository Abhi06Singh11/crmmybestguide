
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertTriangle,
  PlusCircle,
  Trash2,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const notificationHistoryData = [
  { id: 1, type: 'Critical', message: "Ticket TKT-001 ('Server Unresponsive') has breached its SLA.", timestamp: '5m ago', read: false },
  { id: 2, type: 'Warning', message: "CPU usage on 'db-main-01' has exceeded 90% for 10 minutes.", timestamp: '45m ago', read: false },
  { id: 3, type: 'Info', message: "Maintenance task 'Database Backup' completed for Project Quantum.", timestamp: '2h ago', read: true },
  { id: 4, type: 'Info', message: "You have been assigned to a new ticket: TKT-008.", timestamp: '6h ago', read: true },
];

const initialNotificationRules = [
    { id: 1, event: "New 'Critical' Priority Ticket", channels: ['Email', 'SMS'], enabled: true },
    { id: 2, event: "SLA Breach Warning (30m remaining)", channels: ['Email', 'Slack'], enabled: true },
    { id: 3, event: "System Health status changes to 'Unstable'", channels: ['Email'], enabled: true },
    { id: 4, event: "A new maintenance task is scheduled", channels: ['Email'], enabled: false },
];

export default function NetworkNotificationsPage() {
  const [rules, setRules] = useState(initialNotificationRules);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'Warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const handleRuleToggle = (ruleId: number) => {
      setRules(rules.map(rule => rule.id === ruleId ? {...rule, enabled: !rule.enabled} : rule));
  };
  
  const handleChannelChange = (ruleId: number, channel: string, checked: boolean) => {
      setRules(rules.map(rule => {
          if (rule.id === ruleId) {
              const newChannels = checked 
                  ? [...rule.channels, channel]
                  : rule.channels.filter(c => c !== channel);
              return {...rule, channels: newChannels};
          }
          return rule;
      }));
  };

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>A log of your recent alerts and system messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationHistoryData.map(notification => (
              <div key={notification.id} className={cn(
                "flex items-start gap-4 p-4 rounded-lg border",
                !notification.read && "bg-muted/50"
              )}>
                <div className="mt-1">{getIconForType(notification.type)}</div>
                <div className="flex-1">
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-sm text-muted-foreground">{notification.timestamp}</p>
                </div>
                {!notification.read && (
                    <Button variant="ghost" size="sm">Mark as read</Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex-row items-center justify-between">
            <div>
                <CardTitle>Manage Notification Rules</CardTitle>
                <CardDescription>Customize when and how you receive alerts.</CardDescription>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Rule
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a New Notification Rule</DialogTitle>
                        <DialogDescription>
                            Define a new condition to trigger an alert.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="event-type" className="text-right">Event Type</Label>
                            <Select>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select an event" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ticket">Ticket Priority</SelectItem>
                                    <SelectItem value="system">System Health</SelectItem>
                                    <SelectItem value="maintenance">Maintenance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="condition" className="text-right">Condition</Label>
                            <Select>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="critical">is 'Critical'</SelectItem>
                                    <SelectItem value="unstable">is 'Unstable'</SelectItem>
                                    <SelectItem value="new">is 'New'</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Notify Via</Label>
                            <div className="col-span-3 flex gap-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="email-new" /> <Label htmlFor="email-new">Email</Label>
                                </div>
                                 <div className="flex items-center gap-2">
                                    <Checkbox id="sms-new" /> <Label htmlFor="sms-new">SMS</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="slack-new" /> <Label htmlFor="slack-new">Slack</Label>
                                </div>
                            </div>
                         </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Rule</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Event / Rule</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">SMS</TableHead>
                        <TableHead className="text-center">Slack</TableHead>
                        <TableHead className="text-center">Enabled</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rules.map((rule) => (
                        <TableRow key={rule.id}>
                            <TableCell className="font-medium">{rule.event}</TableCell>
                            <TableCell className="text-center">
                                <Checkbox 
                                    checked={rule.channels.includes('Email')}
                                    onCheckedChange={(checked) => handleChannelChange(rule.id, 'Email', checked as boolean)}
                                />
                            </TableCell>
                             <TableCell className="text-center">
                                <Checkbox 
                                    checked={rule.channels.includes('SMS')}
                                    onCheckedChange={(checked) => handleChannelChange(rule.id, 'SMS', checked as boolean)}
                                />
                            </TableCell>
                             <TableCell className="text-center">
                                <Checkbox
                                    checked={rule.channels.includes('Slack')}
                                    onCheckedChange={(checked) => handleChannelChange(rule.id, 'Slack', checked as boolean)}
                                />
                            </TableCell>
                             <TableCell className="text-center">
                                <Switch 
                                    checked={rule.enabled}
                                    onCheckedChange={() => handleRuleToggle(rule.id)}
                                />
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
