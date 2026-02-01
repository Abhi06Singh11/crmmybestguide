
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

const marketerAuditLogs = [
    { id: 'log_mkt_001', user: 'Alex Ray', action: 'Created Campaign', details: 'Campaign "Spring Sale" for client Innovate Inc.', timestamp: '2026-01-31 10:02:00' },
    { id: 'log_mkt_002', user: 'Super Admin', action: 'Approved Payment', details: 'Approved payment for Invoice #1002', timestamp: '2026-01-31 10:40:00' },
    { id: 'log_mkt_003', user: 'Dana Scully', action: 'Updated Rule', details: 'Updated "Daily Spend Limit" to $750/day', timestamp: '2026-01-31 11:05:00' },
    { id: 'log_mkt_004', user: 'Alex Ray', action: 'Paused Campaign', details: 'Paused "Summer Launch" campaign due to low ROI.', timestamp: '2026-01-30 14:00:00' },
];

export default function AdminMarketerAuditLogsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketer Audit Logs</CardTitle>
        <CardDescription>An audit trail of all actions performed within the marketer context.</CardDescription>
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
                    {marketerAuditLogs.map((log) => (
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
