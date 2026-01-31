
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    networkKpiData,
    highPriorityTasksData,
    upcomingMaintenanceData
} from "@/lib/network-dashboard-data";
import {
  FileText,
  PlayCircle,
  Siren,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export default function NetworkDashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {networkKpiData.map((kpi) => (
                <Card key={kpi.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <kpi.icon className={cn("h-4 w-4 text-muted-foreground", kpi.color)} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                        <p className="text-xs text-muted-foreground">{kpi.label}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="flex items-center gap-2"><Siren className="text-red-500" /> High-Priority Active Tickets</CardTitle>
                            <CardDescription>Critical issues that require immediate attention.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ticket</TableHead>
                                    <TableHead>Project</TableHead>
                                    <TableHead>SLA</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {highPriorityTasksData.map(task => (
                                    <TableRow key={task.id}>
                                        <TableCell>
                                            <div className="font-medium">{task.title}</div>
                                            <div className="text-sm text-muted-foreground">ID: {task.id}</div>
                                        </TableCell>
                                        <TableCell>{task.project}</TableCell>
                                        <TableCell>
                                            <Badge variant={task.sla.includes('Breached') ? 'destructive' : 'outline'}>
                                                <Clock className="mr-1 h-3 w-3" />
                                                {task.sla}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm">
                                                <PlayCircle className="mr-2 h-4 w-4" />
                                                Take Action
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>My Workload</CardTitle>
                    <CardDescription>Current capacity and task distribution.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Current Capacity</span>
                            <span className="text-sm font-bold">85%</span>
                        </div>
                        <Progress value={85} />
                        <p className="text-xs text-muted-foreground mt-1">3 active tasks, 1 pending review.</p>
                    </div>
                     <div className="border p-3 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">Task Distribution</h4>
                        <div className="flex justify-between items-center text-xs">
                            <p>Critical: <span className="font-bold">1</span></p>
                            <p>High: <span className="font-bold">2</span></p>
                            <p>Medium: <span className="font-bold">4</span></p>
                            <p>Low: <span className="font-bold">1</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Upcoming Maintenance</CardTitle>
                <CardDescription>Scheduled maintenance tasks for managed projects.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Project</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Task</TableHead>
                            <TableHead>Scheduled For</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {upcomingMaintenanceData.map(task => (
                                <TableRow key={task.id}>
                                    <TableCell className="font-medium">{task.project}</TableCell>
                                    <TableCell>{task.client}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                                            <ShieldCheck className="h-3 w-3" />
                                            {task.task}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{task.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">
                                            <FileText className="mr-2 h-4 w-4" />
                                            View SOP
                                        </Button>
                                    </TableCell>
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
