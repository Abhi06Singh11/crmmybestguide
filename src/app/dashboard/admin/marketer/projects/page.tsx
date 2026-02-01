
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
import { PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

const marketerCampaigns = [
    { id: 'camp_001', name: 'Spring Sale', status: 'Running', budget: 5000, spend: 3200, roi: 3.2 },
    { id: 'camp_002', name: 'Summer Launch', status: 'Paused', budget: 7500, spend: 2100, roi: 2.6 },
    { id: 'camp_003', name: 'Q3 Lead Gen', status: 'Running', budget: 10000, spend: 8500, roi: 4.1 },
    { id: 'camp_004', name: 'Black Friday Promo', status: 'Draft', budget: 15000, spend: 0, roi: 0 },
];

const performanceData = [
  {name: 'W1', spend: 400},
  {name: 'W2', spend: 300},
  {name: 'W3', spend: 500},
  {name: 'W4', spend: 700},
];


export default function AdminMarketerProjectsPage() {
  return (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Running Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">2</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Budget (Month)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$37,500</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Spend (Month)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$13,800</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-16 p-0">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                        <XAxis hide dataKey="name" />
                        <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                        <Line type="monotone" dataKey="spend" strokeWidth={2} stroke="hsl(var(--primary))" dot={false} />
                    </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Campaigns</CardTitle>
                <CardDescription>A view of all campaigns marketers are managing, including performance and budget tracking.</CardDescription>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Campaign
            </Button>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Campaign</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Spend</TableHead>
                            <TableHead>ROI</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {marketerCampaigns.map((campaign) => (
                            <TableRow key={campaign.id}>
                                <TableCell className="font-medium">{campaign.name}</TableCell>
                                <TableCell>
                                    <Badge className={cn(
                                        campaign.status === 'Running' && 'bg-green-500/80 text-white',
                                        campaign.status === 'Paused' && 'bg-yellow-500/80 text-white',
                                    )}>{campaign.status}</Badge>
                                </TableCell>
                                <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                                <TableCell>${campaign.spend.toLocaleString()}</TableCell>
                                <TableCell>{campaign.roi > 0 ? `${campaign.roi}x` : 'N/A'}</TableCell>
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
