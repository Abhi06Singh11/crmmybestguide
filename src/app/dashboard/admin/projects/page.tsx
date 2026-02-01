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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { adminProjectsData } from '@/lib/admin-dashboard-data';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminProjectsPage() {

    const getRiskBadgeClass = (risk: string) => {
        switch (risk) {
            case 'High': return 'bg-red-500/80 text-white';
            case 'Medium': return 'bg-yellow-500/80 text-white';
            case 'Low': return 'bg-green-500/80 text-white';
            default: return 'bg-muted';
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Project Oversight</CardTitle>
                    <CardDescription>Centralized control to view, manage, and assign all projects on the platform.</CardDescription>
                </div>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Project
                </Button>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="Active">Active</TabsTrigger>
                        <TabsTrigger value="On Hold">On Hold</TabsTrigger>
                        <TabsTrigger value="Completed">Completed</TabsTrigger>
                        <TabsTrigger value="Risk">At Risk</TabsTrigger>
                    </TabsList>
                    <div className="overflow-x-auto mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Manager</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Risk</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {adminProjectsData.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell>
                                            <div className="font-medium">{project.name}</div>
                                            <div className="text-sm text-muted-foreground">{project.client}</div>
                                        </TableCell>
                                        <TableCell>{project.manager}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{project.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Progress value={project.progress} className="h-2 w-24" />
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn(getRiskBadgeClass(project.risk))}>{project.risk}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Reassign Manager</DropdownMenuItem>
                                                <DropdownMenuItem>Flag for Review</DropdownMenuItem>
                                            </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}
