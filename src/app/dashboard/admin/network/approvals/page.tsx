
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

const networkApprovals = [
    { id: 'appr_net_001', item: 'Network Project "Bandwidth Upgrade"', type: 'New Project', requester: 'Nina Patel', date: '2024-08-06' },
    { id: 'appr_net_002', item: 'Payment "Invoice #3050"', type: 'Payment', requester: 'Omar Khan', date: '2024-08-05' },
    { id: 'appr_net_003', item: 'Rule "Traffic Threshold Alert"', type: 'Rule Change', requester: 'Priya Singh', date: '2024-08-04' },
];

export default function AdminNetworkApprovalsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Approvals</CardTitle>
        <CardDescription>A queue for network-specific approvals, like new infrastructure provisioning or security rule changes.</CardDescription>
      </CardHeader>
      <CardContent>
          <Tabs defaultValue="pending">
                <TabsList>
                    <TabsTrigger value="pending">Pending ({networkApprovals.length})</TabsTrigger>
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
                                {networkApprovals.map((approval) => (
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
