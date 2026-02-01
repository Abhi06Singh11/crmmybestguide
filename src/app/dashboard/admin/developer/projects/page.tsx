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

const developerProjects = [
    { id: 'dev_proj_001', name: 'API Upgrade', status: 'Running', budget: 3500, spend: 2100, successRate: 98 },
    { id: 'dev_proj_002', name: 'Mobile App Fixes', status: 'Paused', budget: 4000, spend: 1600, successRate: 95 },
    { id: 'dev_proj_003', name: 'Database Migration', status: 'Running', budget: 8000, spend: 5500, successRate: 99 },
    { id: 'dev_proj_004', name: 'New Feature Release', status: 'Draft', budget: 12000, spend: 0, successRate: 0 },
];

const performanceData = [
  {name: 'W1', deployments: 5},
  {name: 'W2', deployments: 8},
  {name: 'W3', deployments: 6},
  {name: 'W4', deployments: 10},
];


export default function AdminDeveloperProjectsPage() {
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
                    <div className="text-2xl font-bold">$27,500</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Spend (Month)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$9,200</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Deployments</CardTitle>
                </CardHeader>
                <CardContent className="h-16 p-0">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                        <XAxis hide dataKey="name" />
                        <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
                        <Line type="monotone" dataKey="deployments" strokeWidth={2} stroke="hsl(var(--primary))" dot={false} />
                    </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Dev Projects</CardTitle>
                <CardDescription>A view of all projects developers are working on, including sprint progress and repo status.</CardDescription>
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
                            <TableHead>Success Rate</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {developerProjects.map((project) => (
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
                                <TableCell>{project.successRate > 0 ? `${project.successRate}%` : 'N/A'}</TableCell>
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
