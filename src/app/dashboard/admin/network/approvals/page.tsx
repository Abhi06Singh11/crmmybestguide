
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
import { Button } from '@/components/ui/button';
import { networkApprovalsData as initialApprovalsData } from '@/lib/admin-dashboard-data';
import { Check, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';

interface Approval {
    id: string;
    item: string;
    type: string;
    requester: string;
    date: string;
    status: ApprovalStatus;
}


export default function AdminNetworkApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovalsData);
  const [activeTab, setActiveTab] = useState('Pending');
  const { toast } = useToast();

  const handleApprovalAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    const item = approvals.find(a => a.id === id);
    setApprovals(approvals.map(a => a.id === id ? { ...a, status: newStatus } : a));
    toast({
        title: `Request ${newStatus}`,
        description: `"${item?.item}" has been ${newStatus.toLowerCase()}.`
    });
  };

  const filteredApprovals = approvals.filter(approval => {
      switch(activeTab) {
          case 'All': return true;
          case 'Pending': return approval.status === 'Pending';
          case 'Approved': return approval.status === 'Approved';
          case 'Rejected': return approval.status === 'Rejected';
          case 'History': return approval.status === 'Approved' || approval.status === 'Rejected';
          default: return true;
      }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Approvals</CardTitle>
        <CardDescription>A queue for network-specific approvals, like new infrastructure provisioning or security rule changes.</CardDescription>
      </CardHeader>
      <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="All">All</TabsTrigger>
                    <TabsTrigger value="Pending">Pending</TabsTrigger>
                    <TabsTrigger value="Approved">Approved</TabsTrigger>
                    <TabsTrigger value="Rejected">Rejected</TabsTrigger>
                    <TabsTrigger value="History">History</TabsTrigger>
                </TabsList>
          </Tabs>
          <div className="mt-4 border rounded-md">
            {filteredApprovals.length === 0 ? (
                <p className="text-muted-foreground text-center p-8">No requests found for this category.</p>
            ) : (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Requester</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredApprovals.map((approval) => (
                                <TableRow key={approval.id}>
                                    <TableCell className="font-medium">{approval.item}</TableCell>
                                    <TableCell>{approval.type}</TableCell>
                                    <TableCell>{approval.requester}</TableCell>
                                    <TableCell>{approval.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            approval.status === 'Approved' ? 'secondary' :
                                            approval.status === 'Rejected' ? 'destructive' :
                                            'default'
                                        } className={cn(
                                            'text-center w-24 justify-center',
                                            approval.status === 'Approved' && 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
                                            approval.status === 'Pending' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
                                            approval.status === 'Rejected' && 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                                        )}>
                                            {approval.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        {approval.status === 'Pending' ? (
                                            <>
                                                <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleApprovalAction(approval.id, 'Approved')}>
                                                    <Check className="mr-2 h-4 w-4" /> Approve
                                                </Button>
                                                <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleApprovalAction(approval.id, 'Rejected')}>
                                                    <X className="mr-2 h-4 w-4" /> Reject
                                                </Button>
                                            </>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">Actioned</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
          </div>
      </CardContent>
    </Card>
  );
}
