
import type { ChartConfig } from '@/components/ui/chart';
import type { LucideIcon } from 'lucide-react';
import { Users, Briefcase, CheckSquare, DollarSign } from 'lucide-react';

export const kpiData: { title: string; value: string | number; change: string; changeType: 'increase' | 'decrease'; icon: LucideIcon }[] = [
  { title: 'Active Clients', value: 12, change: '+5.2%', changeType: 'increase', icon: Users },
  { title: 'Ongoing Projects', value: 8, change: '+10%', changeType: 'increase', icon: Briefcase },
  { title: 'Tasks Pending', value: 24, change: '-3.1%', changeType: 'decrease', icon: CheckSquare },
  { title: 'Total Earnings (This Month)', value: '$15,231.89', change: '+20.1%', changeType: 'increase', icon: DollarSign },
];

export const earningsChartData = [
  { date: 'Jan 24', earnings: 4000 },
  { date: 'Feb 24', earnings: 3000 },
  { date: 'Mar 24', earnings: 5000 },
  { date: 'Apr 24', earnings: 4500 },
  { date: 'May 24', earnings: 6000 },
  { date: 'Jun 24', earnings: 7500 },
  { date: 'Jul 24', earnings: 8200 },
];

export const projectsStatusChartData = [
  { name: 'active', value: 8, fill: 'var(--color-active)' },
  { name: 'completed', value: 15, fill: 'var(--color-completed)' },
  { name: 'delayed', value: 2, fill: 'var(--color-delayed)' },
];

export const projectsStatusChartConfig = {
  value: {
    label: 'Projects',
  },
  active: {
    label: 'Active',
    color: 'hsl(var(--chart-1))',
  },
  completed: {
    label: 'Completed',
    color: 'hsl(var(--chart-2))',
  },
  delayed: {
    label: 'Delayed',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

export const projectsOverviewData = [
  { clientName: 'Innovate Inc.', projectTitle: 'New Website Launch', team: ['AJ', 'BW'], status: 'Active' as const, progress: 75, deadline: '2024-08-15' },
  { clientName: 'Quantum Solutions', projectTitle: 'Q3 Marketing Campaign', team: ['CB'], status: 'Completed' as const, progress: 100, deadline: '2024-07-30' },
  { clientName: 'Starlight Co.', projectTitle: 'SEO Optimization', team: ['DE', 'FG'], status: 'Delayed' as const, progress: 40, deadline: '2024-08-20' },
  { clientName: 'Future Forward', projectTitle: 'Social Media Strategy', team: ['AJ'], status: 'Active' as const, progress: 90, deadline: '2024-08-05' },
  { clientName: 'Nexus Group', projectTitle: 'Brand Refresh', team: ['BW', 'DE'], status: 'On Hold' as const, progress: 20, deadline: '2024-09-01' },
];

export const teamData = [
  { name: 'Alice Johnson', initials: 'AJ', task: 'Designing landing page mockups', status: 'online' as const },
  { name: 'Bob Williams', initials: 'BW', task: 'Developing API integration', status: 'busy' as const },
  { name: 'Charlie Brown', initials: 'CB', task: 'Writing ad copy for Q3 campaign', status: 'offline' as const },
  { name: 'Diana Evans', initials: 'DE', task: 'Client meeting', status: 'online' as const },
];
