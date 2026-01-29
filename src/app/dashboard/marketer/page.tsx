
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
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  DollarSign,
  FileText,
  Clock,
} from 'lucide-react';
import {
  kpiData,
  earningsChartData,
  projectsStatusChartData,
  projectsStatusChartConfig,
  projectsOverviewData,
  teamData,
} from '@/lib/dashboard-data';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

export default function MarketerDashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
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
                  {kpi.changeType === 'increase' ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {kpi.change}
                </span>
                <span className="ml-1">vs. last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Monthly Earnings</CardTitle>
            <CardDescription>
              Line chart showing total earnings per month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart data={earningsChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Projects by Status</CardTitle>
            <CardDescription>
              Distribution of projects based on their current status.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
             <ChartContainer config={projectsStatusChartConfig} className="h-64 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={projectsStatusChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={60}
                    paddingAngle={5}
                    labelLine={false}
                  >
                    {projectsStatusChartData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Projects and Team Section */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Projects Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectsOverviewData.map((project, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{project.clientName}</div>
                      <div className="text-sm text-muted-foreground">{project.projectTitle}</div>
                    </TableCell>
                    <TableCell>
                       <Badge variant={
                          project.status === 'Completed' ? 'default' : 
                          project.status === 'Active' ? 'secondary' :
                          'destructive'
                       } className={
                        project.status === 'Completed' ? 'bg-green-500/80 text-white' : ''
                       }>
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
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
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
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamData.map((member) => (
                  <div key={member.name} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                       <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{member.task}</p>
                    </div>
                    <div className={cn('h-2 w-2 rounded-full', 
                        member.status === 'online' ? 'bg-green-500' :
                        member.status === 'busy' ? 'bg-orange-500' :
                        'bg-gray-400'
                    )}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Earnings & Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div className="ml-4 flex-1">
                        <p className="text-sm text-muted-foreground">This Month's Earnings</p>
                        <p className="font-bold text-lg">$15,231.89</p>
                    </div>
                </div>
                 <div className="flex items-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="ml-4 flex-1">
                        <p className="text-sm text-muted-foreground">Pending Invoices</p>
                        <p className="font-bold text-lg">3</p>
                    </div>
                </div>
                 <div className="flex items-center">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div className="ml-4 flex-1">
                        <p className="text-sm text-muted-foreground">Last Payment Received</p>
                        <p className="font-bold text-lg">$2,500 on July 28</p>
                    </div>
                </div>
                 <Button className="w-full mt-2">Create Invoice</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
