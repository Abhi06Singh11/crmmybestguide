
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { PlusCircle, Edit } from 'lucide-react';

const networkSystemRules = [
    { id: 'rule_net_001', name: 'Auto-Scale Network on High Traffic', description: 'Automatically add resources when network traffic exceeds 80% capacity.', status: true, value: 'Traffic > 80%' },
    { id: 'rule_net_002', name: 'Bandwidth Threshold Alert', description: 'Send an alert if bandwidth usage exceeds 900Mbps for 5 minutes.', status: true, value: 'Bandwidth > 900Mbps' },
    { id: 'rule_net_003', name: 'Alert on High Latency', description: 'Sends an alert if average latency exceeds 100ms.', status: true, value: 'Latency > 100ms' },
    { id: 'rule_net_004', name: 'Auto-Block Suspicious IPs', description: 'Blocks IPs with more than 10 failed login attempts in 1 minute.', status: false, value: 'N/A' },
];

export default function AdminNetworkRulesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Network System Rules</CardTitle>
            <CardDescription>System rules governing SLA policies, automated alerts, and on-call schedules.</CardDescription>
          </div>
           <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Rule
          </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rule Name</TableHead>
                        <TableHead>Condition / Value</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {networkSystemRules.map((rule) => (
                        <TableRow key={rule.id}>
                            <TableCell>
                                <div className="font-medium">{rule.name}</div>
                                <div className="text-sm text-muted-foreground">{rule.description}</div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{rule.value}</TableCell>
                            <TableCell>
                                <Switch checked={rule.status} />
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
