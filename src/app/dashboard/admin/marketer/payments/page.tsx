
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

const marketerPayments = [
    { id: 'inv_mkt_001', invoice: '#1001', client: 'Innovate Inc.', amount: 2500, status: 'Paid', date: '2026-01-25' },
    { id: 'inv_mkt_002', invoice: '#1002', client: 'Quantum Solutions', amount: 4000, status: 'Pending', date: '2026-02-15' },
    { id: 'inv_mkt_003', invoice: '#1003', client: 'Starlight Co.', amount: 1200, status: 'Failed', date: '2026-01-28' },
    { id: 'inv_mkt_004', invoice: '#1004', client: 'Future Forward', amount: 3000, status: 'Paid', date: '2026-01-10' },
];

export default function AdminMarketerPaymentsPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPayments = marketerPayments.filter(payment => {
    if (filterStatus === 'all') return true;
    return payment.status.toLowerCase() === filterStatus;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketer Payments</CardTitle>
        <CardDescription>A breakdown of payments, commissions, and bonuses for marketers.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4 gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
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
