
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Briefcase, Activity, CheckCheck, DollarSign } from "lucide-react";

const recentActivity = [
    { activity: 'Network Project “Server Migration” approved', time: '2h ago' },
    { activity: 'Payment of $3,000 completed', time: '1d ago' },
    { activity: 'Rule “Auto-Scale Network” updated', time: '2d ago' },
];

const topProjects = [
    { name: 'Project A', metric: 'Uptime', value: '99.9%' },
    { name: 'Project B', metric: 'Traffic Growth', value: '18%' },
];

export default function NetworkDashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
           <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Network Projects</CardTitle><Briefcase className="h-4 w-4 text-muted-foreground" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">22</div></CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pending Approvals</CardTitle><CheckCheck className="h-4 w-4 text-muted-foreground" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">5</div></CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Spent (Month)</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">$15,600</div></CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Revenue (Month)</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">$45,200</div></CardContent>
            </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Activity /> Recent Activity</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            {recentActivity.map(item => (
                                <TableRow key={item.activity}>
                                    <TableCell>{item.activity}</TableCell>
                                    <TableCell className="text-right text-muted-foreground">{item.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Top Network Projects</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead>Metric</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                            </TableRow>
                        </TableHeader>
                         <TableBody>
                            {topProjects.map(item => (
                                <TableRow key={item.name}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.metric}</TableCell>
                                    <TableCell className="text-right font-bold">{item.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
