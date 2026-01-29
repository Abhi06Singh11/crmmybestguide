
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Progress } from '@/components/ui/progress';
import {
  Briefcase,
  Hourglass,
  CheckCircle,
  Eye,
  FileText
} from 'lucide-react';
import { developerProjectsData } from '@/lib/developer-dashboard-data';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

export default function DeveloperProjectsPage() {
    const { total, active, completed, pending, projects } = developerProjectsData;

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Projects</CardTitle><Briefcase className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{total}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Project</CardTitle><Hourglass className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{active}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Completed</CardTitle><CheckCircle className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{completed}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pending</CardTitle><Eye className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{pending}</div></CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All My Projects</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                            <TableCell>
                                <div className="font-medium">{project.projectName}</div>
                                <div className="text-sm text-muted-foreground">{project.client}</div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={
                                project.status === 'Completed' ? 'default' :
                                project.status === 'Active' ? 'secondary' :
                                'destructive'
                                } className={cn(
                                project.status === 'Completed' && 'bg-green-500/80 text-white',
                                project.status === 'Pending' && 'bg-blue-500/80 text-white',
                                project.status === 'Blocked' && 'bg-yellow-500/80 text-white',
                                )}>
                                {project.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <Progress value={project.progress} className="h-2 w-24" />
                                <span className="text-xs text-muted-foreground">{project.progress}%</span>
                                </div>
                            </TableCell>
                            <TableCell>{format(parseISO(project.deadline), 'MMM d, yyyy')}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                    <FileText className="mr-2 h-4 w-4" />
                                    View Details
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
