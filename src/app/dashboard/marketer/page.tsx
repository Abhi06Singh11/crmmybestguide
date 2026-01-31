
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ArrowUp } from 'lucide-react';
import { marketerKpiData, earningsData, marketerProjectsData } from '@/lib/dashboard-data';
import { cn } from '@/lib/utils';
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
import { MoreHorizontal } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const ProjectsTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Project</TableHead>
        <TableHead className="hidden lg:table-cell">Developer</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="hidden sm:table-cell">Progress</TableHead>
        <TableHead className="hidden lg:table-cell">Deadline</TableHead>
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
          <TableCell className="hidden lg:table-cell">{project.developer}</TableCell>
          <TableCell>
            <Badge variant={
              project.status === 'Completed' ? 'default' :
              project.status === 'Active' ? 'secondary' :
              'destructive'
            } className={cn(
              'w-28 justify-center',
              project.status === 'Completed' && 'bg-green-500/80 text-white',
              project.status === 'Pending Approval' && 'bg-blue-500/80 text-white',
              project.status === 'Risk' && 'bg-yellow-500/80 text-white',
            )}>
              {project.status}
            </Badge>
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <div className="flex items-center gap-2">
              <Progress value={project.progress} className="h-2 w-24" />
              <span className="text-xs text-muted-foreground">{project.progress}%</span>
            </div>
          </TableCell>
          <TableCell className="hidden lg:table-cell">{format(parseISO(project.deadline), 'MMM d, yyyy')}</TableCell>
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


export default function MarketerDashboardPage() {
  return (
      <div className="grid grid-cols-1 gap-6">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {marketerKpiData.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span
                className={cn('flex items-center', 
                  kpi.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600'
                )}
              >
                {kpi.changeType === 'increase' && <ArrowUp className="h-3 w-3 mr-1" />}
                {kpi.change}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Monthly Earnings</CardTitle>
          <CardDescription>Line chart showing total earnings per month.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-64 w-full">
            <ResponsiveContainer>
              <LineChart data={earningsData.earningsChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                <Line type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Projects by Status</CardTitle>
          <CardDescription>Distribution of projects based on their current status.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ChartContainer config={earningsData.projectsStatusChartConfig} className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={earningsData.projectsStatusChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={60} paddingAngle={5} labelLine={false}>
                  {earningsData.projectsStatusChartData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Projects Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <ProjectsTable />
        </div>
      </CardContent>
    </Card>
  </div>
  );
}
