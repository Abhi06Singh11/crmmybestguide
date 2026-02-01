
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
import { Check, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const marketerApprovals = [
    { id: 'appr_mkt_001', item: 'Campaign "Black Friday Promo"', type: 'New Campaign', requester: 'Alex Ray', date: '2024-08-05' },
    { id: 'appr_mkt_002', item: 'Ad Spend Increase ($2k)', type: 'Budget', requester: 'Dana Scully', date: '2024-08-04' },
    { id: 'appr_mkt_003', item: 'Invoice #1024 to Quantum Solutions', type: 'Payment', requester: 'System', date: '2024-08-03' },
];

export default function AdminMarketerApprovalsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketer Approvals</CardTitle>
        <CardDescription>A queue for marketer-specific approvals, like new campaign budgets or ad creatives.</CardDescription>
      </CardHeader>
      <CardContent>
          <Tabs defaultValue="pending">
                <TabsList>
                    <TabsTrigger value="pending">Pending ({marketerApprovals.length})</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="mt-4">
                     <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Requester</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {marketerApprovals.map((approval) => (
                                    <TableRow key={approval.id}>
                                        <TableCell className="font-medium">{approval.item}</TableCell>
                                        <TableCell>{approval.type}</TableCell>
                                        <TableCell>{approval.requester}</TableCell>
                                        <TableCell>{approval.date}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700">
                                                <Check className="mr-2 h-4 w-4" /> Approve
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700">
                                                <X className="mr-2 h-4 w-4" /> Reject
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
                 <TabsContent value="history" className="mt-4">
                    <p className="text-muted-foreground text-center p-8">Approval history will be shown here.</p>
                 </TabsContent>
          </Tabs>
      </CardContent>
    </Card>
  );
}
