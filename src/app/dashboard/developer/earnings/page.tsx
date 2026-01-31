
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  developerEarningsData,
} from '@/lib/developer-dashboard-data';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

export default function DeveloperEarningsPage() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {developerEarningsData.kpis.map((kpi) => (
                    <Card key={kpi.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Monthly Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-64 w-full">
                    <ResponsiveContainer>
                        <LineChart data={developerEarningsData.chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Line type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle>Payment History</CardTitle>
                        <CardDescription>A detailed log of all your project payments.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment Date</TableHead>
                                    <TableHead className="text-right">Receipt</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {developerEarningsData.tableData.map(earning => (
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
                                                'w-24 justify-center',
                                                earning.status === 'Paid' && 'bg-green-500/80 text-white',
                                                earning.status === 'Approved' && 'bg-blue-500/80 text-white',
                                                earning.status === 'Pending' && 'bg-yellow-500/80 text-white'
                                            )}>
                                                {earning.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{format(parseISO(earning.date), 'MMM d, yyyy')}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="link" size="sm">
                                                <Download className="mr-2 h-4 w-4" />
                                                {earning.receiptId}
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
};
