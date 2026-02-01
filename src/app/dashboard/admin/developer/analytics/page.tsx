'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

const deploymentData = [
  { week: 'W1', deployments: 5 }, { week: 'W2', deployments: 8 }, { week: 'W3', deployments: 6 }, { week: 'W4', deployments: 10 },
];
const bugFixData = [
  { day: 'Mon', rate: 3 }, { day: 'Tue', rate: 5 }, { day: 'Wed', rate: 4 }, { day: 'Thu', rate: 6 }, { day: 'Fri', rate: 3 },
];

export default function AdminDeveloperAnalyticsPage() {
  return (
    <div className="space-y-6">
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
              <CardHeader>
                  <CardTitle>Avg. Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-2xl font-bold">180ms</p>
                  <p className="text-xs text-muted-foreground">-5% from last week</p>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle>Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-2xl font-bold">99.8%</p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle>Bug Fix Rate</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-2xl font-bold">4.1/day</p>
                  <p className="text-xs text-muted-foreground">+0.5 from last week</p>
              </CardContent>
          </Card>
       </div>
        <Card>
            <CardHeader>
                <CardTitle>Weekly Deployment Trend</CardTitle>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{}} className="h-64 w-full">
                    <ResponsiveContainer>
                        <LineChart data={deploymentData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Line type="monotone" dataKey="deployments" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Bug Fix Rate (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{}} className="h-64 w-full">
                   <ResponsiveContainer>
                        <BarChart data={bugFixData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                        <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  );
}
