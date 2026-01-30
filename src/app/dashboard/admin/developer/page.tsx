
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
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
    developerKpiData,
    activeProjectData,
    developerTasksData
} from "@/lib/developer-dashboard-data";
import {
  FileText,
  GitBranch,
  MessageSquare,
  PlayCircle,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DeveloperDashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {developerKpiData.map((kpi) => (
                <Card key={kpi.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <kpi.icon className="h-4 w-4 text-muted-foreground" />
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
                            <CardTitle>My Active Project</CardTitle>
                            <CardDescription>Your current focus. Keep the progress updated.</CardDescription>
                        </div>
                         <Button variant="secondary" size="sm">
                            <PlayCircle className="mr-2 h-4 w-4" /> Start Work
                         </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                           <div className="flex justify-between items-center mb-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">{activeProjectData.client}</p>
                                    <h3 className="text-lg font-semibold">{activeProjectData.projectName}</h3>
                                </div>
                                <Badge variant="outline">{activeProjectData.priority} Priority</Badge>
                           </div>
                            <p className="text-sm text-muted-foreground mb-4">{activeProjectData.description}</p>
                            
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm font-medium">Progress: {activeProjectData.progress}%</span>
                                <Progress value={activeProjectData.progress} className="w-full" />
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span><span className="font-semibold text-foreground">{activeProjectData.tasksCompleted}/{activeProjectData.totalTasks}</span> tasks completed</span>
                                <span>Deadline: <span className="font-semibold text-foreground">{activeProjectData.deadline}</span></span>
                            </div>
                        </div>

                         <div className="flex gap-2">
                            <Button className="w-full">
                                <GitBranch className="mr-2 h-4 w-4" />
                                View Repository
                            </Button>
                             <Button variant="outline" className="w-full">
                                <FileText className="mr-2 h-4 w-4" />
                                View Project Brief
                            </Button>
                            <Button variant="outline" className="w-full">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Chat with Marketer
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>My Tasks</CardTitle>
                    <CardDescription>Tasks for your active project.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                    {developerTasksData.map(task => (
                        <div key={task.id} className="flex items-center p-2 rounded-md hover:bg-muted">
                            <Checkbox id={`task-${task.id}`} checked={task.completed} className="mr-3" />
                            <label htmlFor={`task-${task.id}`} className={cn("flex-1 text-sm", task.completed && "line-through text-muted-foreground")}>
                                {task.description}
                            </label>
                            <Badge variant={
                                task.priority === 'High' ? 'destructive' :
                                task.priority === 'Medium' ? 'secondary' : 'outline'
                            } className="ml-2">{task.priority}</Badge>
                        </div>
                    ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Pending Projects</CardTitle>
                <CardDescription>Projects assigned to you, waiting to be started.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Assigned By</TableHead>
                        <TableHead>Est. Start Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Social Media Analytics Tool</TableCell>
                            <TableCell>Starlight Co.</TableCell>
                            <TableCell>Alex Ray</TableCell>
                            <TableCell>2024-09-01</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                </Button>
                            </TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell className="font-medium">E-commerce Backend Refactor</TableCell>
                            <TableCell>Quantum Solutions</TableCell>
                            <TableCell>Alex Ray</TableCell>
                            <TableCell>2024-09-15</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
