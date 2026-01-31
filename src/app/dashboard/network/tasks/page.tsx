
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
  AlertCircle,
  Clock,
  CheckCircle2,
  Hourglass,
  MoreHorizontal,
  PlusCircle,
} from 'lucide-react';
import { networkTasksData } from '@/lib/network-dashboard-data';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function NetworkTasksPage() {
    const { total, open, inProgress, resolved, tasks } = networkTasksData;

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Tickets</CardTitle><AlertCircle className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{total}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Open</CardTitle><Hourglass className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{open}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">In Progress</CardTitle><Clock className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{inProgress}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Resolved</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{resolved}</div></CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>All Network Tasks</CardTitle>
                        <CardDescription>A complete log of all support tickets assigned to you.</CardDescription>
                    </div>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Ticket
                    </Button>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden sm:table-cell">Ticket ID</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead className="hidden lg:table-cell">Project</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">Last Update</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell className="font-mono text-xs hidden sm:table-cell">{task.id}</TableCell>
                                <TableCell className="font-medium">{task.title}</TableCell>
                                <TableCell className="text-muted-foreground hidden lg:table-cell">{task.project}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        task.priority === 'Critical' ? 'destructive' :
                                        task.priority === 'High' ? 'default' :
                                        task.priority === 'Medium' ? 'secondary' :
                                        'outline'
                                    } className={cn(
                                        'w-20 justify-center',
                                        task.priority === 'High' && 'bg-orange-500 text-white'
                                    )}>
                                    {task.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={
                                        task.status === 'Resolved' ? 'default' :
                                        task.status === 'In Progress' ? 'secondary' :
                                        'outline'
                                    } className={cn(
                                        'w-24 justify-center',
                                        task.status === 'Resolved' && 'bg-green-500/80 text-white',
                                        task.status === 'In Progress' && 'bg-blue-500/80 text-white',
                                    )}>
                                    {task.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{task.updated}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Ticket</DropdownMenuItem>
                                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                                            <DropdownMenuItem>Escalate</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
