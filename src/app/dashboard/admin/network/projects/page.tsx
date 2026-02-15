
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
import { PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { adminNetworkProjectsData } from '@/lib/admin-dashboard-data';

const performanceData = [
  {name: 'W1', uptime: 99.9},
  {name: 'W2', uptime: 99.8},
  {name: 'W3', uptime: 99.95},
  {name: 'W4', uptime: 99.98},
];


export default function AdminNetworkProjectsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = adminNetworkProjectsData.filter(project => {
    if (activeTab === 'All') return true;
    return project.status === activeTab;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-500/80 text-white';
      case 'Pending':
        return 'bg-yellow-500/80 text-white';
      case 'Rejected':
        return 'bg-red-500/80 text-white';
      case 'Draft':
        return 'bg-gray-500/80 text-white';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Running Projects</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{adminNetworkProjectsData.filter(p => p.status === 'Approved').length}</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Budget (Month)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹3,240,000</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Spend (Month)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹1,088,000</div>
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
            <Link href="/d/admin/network/projects/new">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Project
                </Button>
            </Link>
        </CardHeader>
        <CardContent>
             <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="All">All</TabsTrigger>
                    <TabsTrigger value="Pending">Pending</TabsTrigger>
                    <TabsTrigger value="Approved">Approved</TabsTrigger>
                    <TabsTrigger value="Rejected">Rejected</TabsTrigger>
                    <TabsTrigger value="Draft">Draft</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="overflow-x-auto mt-4">
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
                        {filteredProjects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.name}</TableCell>
                                <TableCell>
                                    <Badge className={cn(getStatusBadgeClass(project.status))}>{project.status}</Badge>
                                </TableCell>
                                <TableCell>₹{project.budget.toLocaleString()}</TableCell>
                                <TableCell>₹{project.spend.toLocaleString()}</TableCell>
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
