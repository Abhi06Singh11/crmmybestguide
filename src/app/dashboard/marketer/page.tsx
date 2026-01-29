
'use client';

import { useState, useMemo } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ArrowUp,
  MoreHorizontal,
  Star,
  Users,
  Briefcase,
  CheckSquare,
  DollarSign,
  Calendar,
  Hourglass,
  CheckCircle,
  Eye,
  Mail,
  Filter,
  Award,
  Shield,
} from 'lucide-react';
import {
  marketerKpiData,
  earningsData,
  marketerProfileData,
  clientsData,
  marketerProjectsData,
  developersData,
} from '@/lib/dashboard-data';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DashboardTab = () => (
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
        <ProjectsTable />
      </CardContent>
    </Card>
  </div>
);

const ProfileTab = () => {
  const { name, initials, role, skills, availability, rating, portfolio } = marketerProfileData;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
            </Avatar>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center gap-2 text-yellow-500 mb-4">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-bold text-lg text-foreground">{rating}</span>
              <span className="text-sm text-muted-foreground">(Internal Rating)</span>
            </div>
            <div className="text-center mb-4">
              <Badge variant={availability === 'Available for new projects' ? 'secondary' : 'default'} className={availability === 'Available for new projects' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : ''}>
                {availability}
              </Badge>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-center">Skills</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
              </div>
            </div>
            <div className="flex gap-2 mt-6">
                <Button className="w-full"><Eye className="mr-2 h-4 w-4" />View Public Profile</Button>
                <Button variant="outline" className="w-full">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Highlights</CardTitle>
            <CardDescription>A snapshot of past project successes and performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolio.map(item => (
                <div key={item.project} className="flex items-center p-4 rounded-lg border">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarFallback>{item.clientLogo}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{item.project}</p>
                    <p className="text-sm text-muted-foreground">{item.client}</p>
                  </div>
                  <div className="text-right">
                     <p className="font-semibold text-green-600">{item.highlight}</p>
                     <p className="text-sm text-muted-foreground">Performance Highlight</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ClientsTable = () => (
  <Card>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client Name</TableHead>
          <TableHead>Active Projects</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clientsData.map(client => (
          <TableRow key={client.name}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{client.logo}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{client.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-center">{client.activeProjects}</TableCell>
            <TableCell>
              <Badge variant={
                client.paymentStatus === 'On Time' ? 'secondary' :
                client.paymentStatus === 'Paid' ? 'default' :
                'destructive'
              } className={cn(
                client.paymentStatus === 'Paid' && 'bg-green-500/80 text-white',
                client.paymentStatus === 'Overdue' && 'bg-yellow-500/80 text-white'
              )}>
                {client.paymentStatus}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={
                client.priority === 'High' ? 'destructive' :
                client.priority === 'Medium' ? 'secondary' :
                'outline'
              }>
                {client.priority}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Client</DropdownMenuItem>
                  <DropdownMenuItem>Send Message</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);

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

const ProjectsTab = () => (
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

const TeamTab = () => {
  const [filters, setFilters] = useState({ skill: 'All', availability: 'All' });

  const filteredDevelopers = useMemo(() => {
    return developersData.filter(dev => {
      const skillMatch = filters.skill === 'All' || dev.skills.includes(filters.skill);
      const availabilityMatch = filters.availability === 'All' || dev.availability === filters.availability;
      return skillMatch && availabilityMatch;
    });
  }, [filters]);

  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    developersData.forEach(dev => dev.skills.forEach(skill => skills.add(skill)));
    return ['All', ...Array.from(skills)];
  }, []);

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle>Developer Allocation</CardTitle>
                    <CardDescription>Find and assign the right talent to your projects.</CardDescription>
                </div>
                <Filter className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4">
                <Select value={filters.skill} onValueChange={(value) => setFilters(f => ({...f, skill: value}))}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by skill" />
                    </SelectTrigger>
                    <SelectContent>
                        {allSkills.map(skill => <SelectItem key={skill} value={skill}>{skill}</SelectItem>)}
                    </SelectContent>
                </Select>
                 <Select value={filters.availability} onValueChange={(value) => setFilters(f => ({...f, availability: value}))}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by availability" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Availabilities</SelectItem>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Busy">Busy</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map(dev => (
                <Card key={dev.id} className="flex flex-col">
                    <CardHeader className="items-center text-center">
                        {dev.recommended && <Badge className="absolute top-4 right-4 bg-yellow-400 text-black hover:bg-yellow-400">Recommended</Badge>}
                        <Avatar className="h-20 w-20 mb-3"><AvatarFallback className="text-2xl">{dev.avatar}</AvatarFallback></Avatar>
                        <CardTitle className="text-lg">{dev.name}</CardTitle>
                        <CardDescription>{dev.role}</CardDescription>
                        <div className="flex items-center gap-1 text-sm text-yellow-500 pt-1">
                            <Star className="h-4 w-4 fill-current" /> {dev.rating}
                            <span className="text-muted-foreground ml-2">({dev.experience})</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                            {dev.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                        <div className="text-center text-sm text-muted-foreground mb-4">
                            <p>Workload: {dev.workload}%</p>
                            <Progress value={dev.workload} className="h-2 mt-1" />
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs justify-center mb-4">
                            <Badge variant={dev.availability === 'Available' ? 'secondary' : 'default'} className={cn(dev.availability === 'Available' && 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300')}>
                                {dev.availability}
                            </Badge>
                             <Badge variant={dev.status === 'Verified' ? 'secondary' : 'destructive'} className={cn(dev.status === 'Verified' && 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300')}>
                                {dev.status}
                            </Badge>
                        </div>
                        <div className="mt-auto flex gap-2">
                           <Button variant="outline" className="w-full">View Profile</Button>
                           <Button className="w-full">Assign</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
};


const EarningsTab = () => (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {marketerKpiData.map((kpi) => (
                <Card key={kpi.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <kpi.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                        <p className="text-xs text-muted-foreground">{kpi.change}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle>Earnings History</CardTitle>
                    <CardDescription>A detailed log of all payments and their statuses.</CardDescription>
                </div>
                 <Button>Generate Invoice</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Invoice</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {earningsData.tableData.map(earning => (
                            <TableRow key={earning.id}>
                                <TableCell>
                                    <div className="font-medium">{earning.project}</div>
                                    <div className="text-sm text-muted-foreground">{earning.client}</div>
                                </TableCell>
                                <TableCell>${earning.amount.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        earning.status === 'Paid' ? 'default' :
                                        earning.status === 'Approved' ? 'secondary' :
                                        'destructive'
                                    } className={cn(
                                        earning.status === 'Paid' && 'bg-green-500/80 text-white',
                                        earning.status === 'Approved' && 'bg-blue-500/80 text-white',
                                        earning.status === 'Pending' && 'bg-yellow-500/80 text-white'
                                    )}>
                                        {earning.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{format(parseISO(earning.date), 'MMM d, yyyy')}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="link" size="sm">{earning.invoiceId}</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
);


export default function MarketerDashboardPage() {
  return (
    <Tabs defaultValue="dashboard" className="w-full space-y-6">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="clients">Clients</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="earnings">Earnings</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard"><DashboardTab /></TabsContent>
      <TabsContent value="profile"><ProfileTab /></TabsContent>
      <TabsContent value="clients"><ClientsTable /></TabsContent>
      <TabsContent value="projects"><ProjectsTab /></TabsContent>
      <TabsContent value="team"><TeamTab /></TabsContent>
      <TabsContent value="earnings"><EarningsTab /></TabsContent>
    </Tabs>
  );
}
