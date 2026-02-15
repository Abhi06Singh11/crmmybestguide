
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
import {
  marketerKpiData,
  earningsData,
} from '@/lib/dashboard-data';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function EarningsPage() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {marketerKpiData.map((kpi) => (
                    <Card key={kpi.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                            <p className="text-xs text-muted-foreground">{kpi.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle>Invoice & Earnings History</CardTitle>
                        <CardDescription>A detailed log of all payments, invoices, and their statuses.</CardDescription>
                    </div>
                    <Link href="/d/marketer/earnings/generate-invoice">
                        <Button>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Generate Invoice
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice ID</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {earningsData.tableData.map(invoice => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
                                        <TableCell>
                                            <div className="font-medium">{invoice.client}</div>
                                            <div className="text-sm text-muted-foreground">{invoice.project}</div>
                                        </TableCell>
                                        <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
                                        <TableCell>{format(parseISO(invoice.date), 'MMM d, yyyy')}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                invoice.status === 'Paid' ? 'default' :
                                                invoice.status === 'Approved' ? 'secondary' :
                                                'destructive'
                                            } className={cn(
                                                'justify-center',
                                                invoice.status === 'Paid' && 'bg-green-500/80 text-white',
                                                invoice.status === 'Approved' && 'bg-blue-500/80 text-white',
                                                invoice.status === 'Pending' && 'bg-yellow-500/80 text-white'
                                            )}>
                                                {invoice.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href="/d/marketer/earnings/view-invoice" passHref>
                                                <Button variant="outline" size="sm">
                                                    View Invoice
                                                </Button>
                                            </Link>
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
};
