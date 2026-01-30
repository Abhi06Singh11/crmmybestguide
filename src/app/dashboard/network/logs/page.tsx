
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { networkLogsData } from '@/lib/network-dashboard-data';
import { cn } from '@/lib/utils';

export default function LogsPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>System & Activity Logs</CardTitle>
                    <CardDescription>A record of important system events and maintenance activities.</CardDescription>
                </div>
                <Button>
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Report
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Event Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {networkLogsData.map((log, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn(
                                        log.type === 'Security' && 'border-red-500/50',
                                        log.type === 'Maintenance' && 'border-blue-500/50',
                                        log.type === 'Incident' && 'border-yellow-500/50',
                                    )}>
                                        {log.type}
                                    </Badge>
                                </TableCell>
                                <TableCell>{log.event}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
