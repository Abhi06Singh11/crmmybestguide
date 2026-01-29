
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
  Briefcase,
  Hourglass,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { marketerProjectsData } from '@/lib/dashboard-data';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

const ProjectsTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Project</TableHead>
        <TableHead>Developer</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Progress</TableHead>
        <TableHead>Deadline</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {marketerProjectsData.tableData.map((project) => (
        <TableRow key={project.id}>
          <TableCell>
            <div className="font-medium">{project.projectName}</div>
            <div className="text-sm text-muted-foreground">{project.client}</div>
          </TableCell>
          <TableCell>{project.developer}</TableCell>
          <TableCell>
            <Badge variant={
              project.status === 'Completed' ? 'default' :
              project.status === 'Active' ? 'secondary' :
              'destructive'
            } className={cn(
              project.status === 'Completed' && 'bg-green-500/80 text-white',
              project.status === 'Pending Approval' && 'bg-blue-500/80 text-white',
              project.status === 'Risk' && 'bg-yellow-500/80 text-white',
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Project</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Assign Team</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default function ProjectsPage() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Projects</CardTitle><Briefcase className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{marketerProjectsData.totalProjects}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">In Progress</CardTitle><Hourglass className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{marketerProjectsData.inProgress}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Completed</CardTitle><CheckCircle className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{marketerProjectsData.completed}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pending Approval</CardTitle><Eye className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{marketerProjectsData.pendingApproval}</div></CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader><CardTitle>All Projects</CardTitle></CardHeader>
                <CardContent><ProjectsTable /></CardContent>
            </Card>
        </div>
    );
};
