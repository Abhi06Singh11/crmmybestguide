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
import { Download } from 'lucide-react';
import { earningsData } from '@/lib/dashboard-data';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

export default function InvoicesPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Invoice History</CardTitle>
                    <CardDescription>Manage and track all your invoices from here.</CardDescription>
                </div>
                <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                </Button>
            </CardHeader>
            <CardContent>
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
                                <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                                <TableCell>{format(parseISO(invoice.date), 'MMM d, yyyy')}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        invoice.status === 'Paid' ? 'default' :
                                        invoice.status === 'Approved' ? 'secondary' :
                                        'destructive'
                                    } className={cn(
                                        invoice.status === 'Paid' && 'bg-green-500/80 text-white',
                                        invoice.status === 'Approved' && 'bg-blue-500/80 text-white',
                                        invoice.status === 'Pending' && 'bg-yellow-500/80 text-white'
                                    )}>
                                        {invoice.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        View Invoice
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
