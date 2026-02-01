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

const developerAuditLogs = [
    { id: 'log_dev_001', user: 'Daniel White', action: 'Deployed Project', details: 'Deployed "API Upgrade" to production', timestamp: '2026-01-31 09:15:00' },
    { id: 'log_dev_002', user: 'Eva Green', action: 'Created Project', details: 'Created project "Mobile App Fixes"', timestamp: '2026-01-31 10:45:00' },
    { id: 'log_dev_003', user: 'Frank Black', action: 'Updated Rule', details: 'Updated "Auto-Scale" rule', timestamp: '2026-01-31 11:20:00' },
    { id: 'log_dev_004', user: 'Super Admin', action: 'Approved Payout', details: 'Approved payout for Invoice #2048', timestamp: '2026-01-30 14:00:00' },
];

export default function AdminDeveloperAuditLogsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer Audit Logs</CardTitle>
        <CardDescription>An audit trail of all actions performed within the developer context.</CardDescription>
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
                    {developerAuditLogs.map((log) => (
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
