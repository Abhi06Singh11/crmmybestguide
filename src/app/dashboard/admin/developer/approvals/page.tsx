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

const developerApprovals = [
    { id: 'appr_dev_001', item: 'Dev Project "New Feature Release"', type: 'New Project', requester: 'Alex Ray', date: '2024-08-06' },
    { id: 'appr_dev_002', item: 'Payment "Invoice #2048"', type: 'Payment', requester: 'Bob Williams', date: '2024-08-05' },
    { id: 'appr_dev_003', item: 'System Rule "Auto-Scale"', type: 'Rule Change', requester: 'Casey Becker', date: '2024-08-04' },
];

export default function AdminDeveloperApprovalsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer Approvals</CardTitle>
        <CardDescription>A queue for developer-specific approvals, like new repo access or tool requests.</CardDescription>
      </CardHeader>
      <CardContent>
          <Tabs defaultValue="pending">
                <TabsList>
                    <TabsTrigger value="pending">Pending ({developerApprovals.length})</TabsTrigger>
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
                                {developerApprovals.map((approval) => (
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
