
'use client';

import { useState } from 'react';
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
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const developerPayments = [
    { id: 'inv_dev_001', invoice: '#2001', client: 'Innovate Inc.', amount: 1900, status: 'Paid', date: '2026-01-25' },
    { id: 'inv_dev_002', invoice: '#2002', client: 'Quantum Solutions', amount: 2700, status: 'Pending', date: '2026-02-15' },
    { id: 'inv_dev_003', invoice: '#2003', client: 'Starlight Co.', amount: 800, status: 'Failed', date: '2026-01-28' },
    { id: 'inv_dev_004', invoice: '#2004', client: 'Future Forward', amount: 3500, status: 'Paid', date: '2026-01-10' },
];

export default function AdminDeveloperPaymentsPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPayments = developerPayments.filter(payment => {
    if (filterStatus === 'all') return true;
    return payment.status.toLowerCase() === filterStatus;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer Payments</CardTitle>
        <CardDescription>A breakdown of payments and milestones for developers.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4 gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
            </Select>
            <Button>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </div>
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.invoice}</TableCell>
                            <TableCell>{payment.client}</TableCell>
                            <TableCell>${payment.amount.toLocaleString()}</TableCell>
                            <TableCell>
                                <Badge className={cn(
                                    payment.status === 'Paid' && 'bg-green-500/80 text-white',
                                    payment.status === 'Pending' && 'bg-yellow-500/80 text-white',
                                    payment.status === 'Failed' && 'bg-red-500/80 text-white',
                                )}>{payment.status}</Badge>
                            </TableCell>
                            <TableCell>{payment.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
