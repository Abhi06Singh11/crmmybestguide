
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

const networkProjects = [
    { id: 'net_proj_001', name: 'Server Migration', status: 'Running', budget: 7000, spend: 4200, uptime: 99.98 },
    { id: 'net_proj_002', name: 'Network Optimization', status: 'Paused', budget: 6500, spend: 2900, uptime: 99.95 },
    { id: 'net_proj_003', name: 'Firewall Upgrade', status: 'Running', budget: 9000, spend: 6500, uptime: 99.99 },
    { id: 'net_proj_004', name: 'Bandwidth Upgrade', status: 'Draft', budget: 18000, spend: 0, uptime: 0 },
];

const performanceData = [
  {name: 'W1', uptime: 99.9},
  {name: 'W2', uptime: 99.8},
  {name: 'W3', uptime: 99.95},
  {name: 'W4', uptime: 99.98},
];


export default function AdminNetworkProjectsPage() {
  return (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Running Projects</CardTitle>
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
                    <div className="text-2xl font-bold">$40,500</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Spend (Month)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$13,600</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Uptime</CardTitle>
                </CardHeader>
                <CardContent className="h-16 p-0">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                        <XAxis hide dataKey="name" />
                        <YAxis hide domain={['dataMin - 0.1', 'dataMax + 0.1']} />
                        <Line type="monotone" dataKey="uptime" strokeWidth={2} stroke="hsl(var(--primary))" dot={false} />
                    </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Network Projects</CardTitle>
                <CardDescription>A view of all infrastructure projects, including maintenance schedules and uptime reports.</CardDescription>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Project
            </Button>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Spend</TableHead>
                            <TableHead>Uptime</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {networkProjects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.name}</TableCell>
                                <TableCell>
                                    <Badge className={cn(
                                        project.status === 'Running' && 'bg-green-500/80 text-white',
                                        project.status === 'Paused' && 'bg-yellow-500/80 text-white',
                                    )}>{project.status}</Badge>
                                </TableCell>
                                <TableCell>${project.budget.toLocaleString()}</TableCell>
                                <TableCell>${project.spend.toLocaleString()}</TableCell>
                                <TableCell>{project.uptime > 0 ? `${project.uptime}%` : 'N/A'}</TableCell>
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
