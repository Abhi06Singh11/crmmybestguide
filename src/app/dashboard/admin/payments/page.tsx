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
import { Badge } from '@/components/ui/badge';
import { adminPaymentsData } from '@/lib/admin-dashboard-data';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';


export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {adminPaymentsData.kpis.map((kpi) => (
                <Card key={kpi.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <kpi.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Financial oversight to track client payments, freelancer payouts, and platform commissions.</CardDescription>
                </div>
                 <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                </Button>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {adminPaymentsData.transactions.map((txn) => (
                                <TableRow key={txn.id}>
                                    <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                                    <TableCell>{txn.client}</TableCell>
                                    <TableCell>${txn.amount.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge className={cn(
                                            txn.status === 'Paid' && 'bg-green-500/80 text-white',
                                            txn.status === 'Pending' && 'bg-yellow-500/80 text-white',
                                            txn.status === 'Overdue' && 'bg-red-500/80 text-white',
                                        )}>{txn.status}</Badge>
                                    </TableCell>
                                    <TableCell>{txn.date}</TableCell>
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
