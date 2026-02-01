
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

const trafficData = [
  { time: '12:00', traffic: 450 }, { time: '13:00', traffic: 520 }, { time: '14:00', traffic: 610 },
  { time: '15:00', traffic: 580 }, { time: '16:00', traffic: 720 }, { time: '17:00', traffic: 680 },
];
const uptimeData = [
  { project: 'Project A', uptime: 99.9 }, { project: 'Project B', uptime: 99.7 }, { project: 'Project C', uptime: 99.98 },
  { project: 'Project D', uptime: 99.85 }, { project: 'Project E', uptime: 99.92 },
];


export default function AdminNetworkAnalyticsPage() {
  return (
     <div className="space-y-6">
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
              <CardHeader>
                  <CardTitle>Avg. Latency</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-2xl font-bold">45ms</p>
                  <p className="text-xs text-muted-foreground">-2ms from last hour</p>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle>Uptime (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-2xl font-bold">99.9%</p>
                  <p className="text-xs text-muted-foreground">Across all services</p>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle>Packet Loss</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-2xl font-bold">0.2%</p>
                  <p className="text-xs text-muted-foreground">Within acceptable limits</p>
              </CardContent>
          </Card>
       </div>
        <Card>
            <CardHeader>
                <CardTitle>Network Traffic Trend (Mbps)</CardTitle>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{}} className="h-64 w-full">
                    <ResponsiveContainer>
                        <LineChart data={trafficData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Line type="monotone" dataKey="traffic" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Uptime by Project (%)</CardTitle>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{}} className="h-64 w-full">
                   <ResponsiveContainer>
                        <BarChart data={uptimeData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="project" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis domain={[99, 100]} tickLine={false} axisLine={false} tickMargin={8} />
                        <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                        <Bar dataKey="uptime" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  );
}
