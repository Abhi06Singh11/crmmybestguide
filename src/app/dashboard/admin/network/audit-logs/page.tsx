
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
import { Input } from '@/components/ui/input';
import { Download, Search } from 'lucide-react';

const networkAuditLogs = [
    { id: 'log_net_001', user: 'Nina Patel', action: 'Configured Project', details: 'Configured "Server Migration"', timestamp: '2026-01-31 08:55:00' },
    { id: 'log_net_002', user: 'Omar Khan', action: 'Created Project', details: 'Created project "Network Optimization"', timestamp: '2026-01-31 09:40:00' },
    { id: 'log_net_003', user: 'Priya Singh', action: 'Updated Rule', details: 'Updated "Auto-Scale Network" rule', timestamp: '2026-01-31 10:20:00' },
    { id: 'log_net_004', user: 'Super Admin', action: 'Approved Payment', details: 'Approved payout for Invoice #3050', timestamp: '2026-01-30 14:00:00' },
];

export default function AdminNetworkAuditLogsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Audit Logs</CardTitle>
        <CardDescription>An audit trail of all actions performed within the network and support context.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4 gap-4">
             <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Filter logs by user, action, or details..."
                className="w-full rounded-lg bg-secondary pl-8"
                />
            </div>
            <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
            </Button>
        </div>
         <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {networkAuditLogs.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                            <TableCell>{log.user}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>{log.details}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
