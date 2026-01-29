
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
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
import {
  Briefcase,
  ShieldCheck,
  Activity,
  FileText,
} from 'lucide-react';
import { supportProjectsData } from '@/lib/support-dashboard-data';
import { cn } from '@/lib/utils';

export default function SupportProjectsPage() {
    const { total, stable, monitoring, projects } = supportProjectsData;

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Projects Supported</CardTitle><Briefcase className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{total}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Stable</CardTitle><ShieldCheck className="h-4 w-4 text-green-500" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{stable}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Monitoring</CardTitle><Activity className="h-4 w-4 text-yellow-500" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{monitoring}</div></CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Managed Projects</CardTitle>
                    <CardDescription>A list of all projects under your maintenance and support contract.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Health Status</TableHead>
                                <TableHead>Last Maintenance</TableHead>
                                <TableHead>Next Check</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                            <TableCell>
                                <div className="font-medium">{project.projectName}</div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{project.client}</TableCell>
                            <TableCell>
                                <Badge variant={project.status === 'Stable' ? 'secondary' : 'default'} className={cn(
                                    project.status === 'Stable' && 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
                                    project.status === 'Monitoring' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                                )}>
                                    {project.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{project.lastMaintenance}</TableCell>
                            <TableCell>{project.nextCheck}</TableCell>
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
