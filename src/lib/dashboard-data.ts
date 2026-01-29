
import {
    Users, Briefcase, CheckSquare, DollarSign, Calendar, Hourglass, CheckCircle,
} from 'lucide-react';
import type { ChartConfig } from '@/components/ui/chart';

export const marketerKpiData = [
  { title: 'Lifetime Earnings', value: '$125,430', change: '+15% this year', changeType: 'increase', icon: DollarSign },
  { title: 'Earnings This Month', value: '$15,231', change: '+20.1% vs last month', changeType: 'increase', icon: Calendar },
  { title: 'Pending Payments', value: '$8,250', change: '3 invoices', changeType: 'increase', icon: Hourglass },
  { title: 'Approved Projects', value: '5', change: '+2 this month', changeType: 'increase', icon: CheckCircle },
];

export const marketerProfileData = {
  name: 'Alex Ray',
  initials: 'AR',
  role: 'Growth & Marketing Manager',
  skills: ['SEO', 'Google Ads', 'Content Strategy', 'Conversion Funnels', 'Email Marketing', 'Social Media'],
  availability: 'Available for new projects',
  rating: 4.9,
  portfolio: [
    { client: 'Innovate Inc.', clientLogo: 'II', project: 'Q3 Lead Gen Campaign', highlight: '+45% Conversion Rate' },
    { client: 'Quantum Solutions', clientLogo: 'QS', project: 'SEO & Content Overhaul', highlight: 'Ranked #1 for 5 keywords' },
    { client: 'Starlight Co.', clientLogo: 'SC', project: 'Social Media Engagement', highlight: '+200% Follower Growth' },
  ],
};

export const clientsData = [
  { name: 'Quantum Solutions', logo: 'QS', activeProjects: 2, paymentStatus: 'On Time', priority: 'High' },
  { name: 'Innovate Inc.', logo: 'II', activeProjects: 1, paymentStatus: 'On Time', priority: 'High' },
  { name: 'Starlight Co.', logo: 'SC', activeProjects: 1, paymentStatus: 'Paid', priority: 'Medium' },
  { name: 'Future Forward', logo: 'FF', activeProjects: 1, paymentStatus: 'Pending', priority: 'Medium' },
  { name: 'Nexus Group', logo: 'NG', activeProjects: 0, paymentStatus: 'Paid', priority: 'Low' },
  { name: 'Sunrise Ltd.', logo: 'SL', activeProjects: 1, paymentStatus: 'Overdue', priority: 'High' },
];

export const marketerProjectsData = {
    totalProjects: 28,
    inProgress: 5,
    completed: 21,
    pendingApproval: 2,
    tableData: [
        { id: 1, projectName: 'New Website Launch', client: 'Innovate Inc.', developer: 'Bob Williams', status: 'Active', progress: 75, deadline: '2024-08-15' },
        { id: 2, projectName: 'Q3 Marketing Campaign', client: 'Quantum Solutions', developer: 'Alice Johnson', status: 'Active', progress: 90, deadline: '2024-08-05' },
        { id: 3, projectName: 'SEO Optimization', client: 'Starlight Co.', developer: 'Charlie Brown', status: 'Pending Approval', progress: 100, deadline: '2024-07-30' },
        { id: 4, projectName: 'Brand Refresh', client: 'Nexus Group', developer: 'Diana Evans', status: 'On Hold', progress: 20, deadline: '2024-09-01' },
        { id: 5, projectName: 'Social Media Strategy', client: 'Future Forward', developer: 'Alice Johnson', status: 'Risk', progress: 50, deadline: '2024-08-20' },
        { id: 6, projectName: 'App Backend API', client: 'Quantum Solutions', developer: 'Bob Williams', status: 'Completed', progress: 100, deadline: '2024-07-25' },
    ]
};

export const developersData = [
  { id: 1, name: 'Alice Johnson', role: 'Senior Frontend Developer', avatar: 'AJ', skills: ['React', 'Next.js', 'TypeScript'], experience: '5 Yrs', rating: 4.9, workload: 80, availability: 'Available', status: 'Verified', recommended: true },
  { id: 2, name: 'Bob Williams', role: 'Senior Backend Developer', avatar: 'BW', skills: ['Node.js', 'Python', 'Databases'], experience: '7 Yrs', rating: 4.8, workload: 100, availability: 'Busy', status: 'Verified' },
  { id: 3, name: 'Charlie Brown', role: 'Full Stack Developer', avatar: 'CB', skills: ['React', 'Node.js', 'DevOps'], experience: '4 Yrs', rating: 4.7, workload: 60, availability: 'Available', status: 'Verified' },
  { id: 4, name: 'Diana Evans', role: 'UI/UX Designer', avatar: 'DE', skills: ['Figma', 'Web Design', 'Mobile UI'], experience: '6 Yrs', rating: 4.9, workload: 25, availability: 'Available', status: 'Verified' },
  { id: 5, name: 'Ethan Hunt', role: 'Junior Frontend Developer', avatar: 'EH', skills: ['HTML', 'CSS', 'JavaScript'], experience: '1 Yr', rating: 4.5, workload: 0, availability: 'Available', status: 'Pending' },
];

export const earningsData = {
    tableData: [
        { id: 1, project: 'Q3 Marketing Campaign', client: 'Quantum Solutions', amount: 2500, status: 'Paid', date: '2024-07-28', invoiceId: 'INV-0728' },
        { id: 2, project: 'New Website Launch', client: 'Innovate Inc.', amount: 5000, status: 'Approved', date: '2024-08-15', invoiceId: 'INV-0815' },
        { id: 3, project: 'Social Media Strategy', client: 'Future Forward', amount: 1800, status: 'Pending', date: '2024-08-20', invoiceId: 'INV-0820' },
        { id: 4, project: 'SEO Optimization', client: 'Starlight Co.', amount: 3250, status: 'Pending', date: '2024-08-10', invoiceId: 'INV-0810' },
        { id: 5, project: 'App Backend API', client: 'Quantum Solutions', amount: 4500, status: 'Paid', date: '2024-07-15', invoiceId: 'INV-0715' },
    ],
    earningsChartData: [
        { date: 'Jan 24', earnings: 4000 }, { date: 'Feb 24', earnings: 3000 }, { date: 'Mar 24', earnings: 5000 },
        { date: 'Apr 24', earnings: 4500 }, { date: 'May 24', earnings: 6000 }, { date: 'Jun 24', earnings: 7500 }, { date: 'Jul 24', earnings: 8200 },
    ],
    projectsStatusChartData: [
        { name: 'active', value: 8, fill: 'var(--color-active)' },
        { name: 'completed', value: 15, fill: 'var(--color-completed)' },
        { name: 'delayed', value: 2, fill: 'var(--color-delayed)' },
    ],
    projectsStatusChartConfig: {
        value: { label: 'Projects' },
        active: { label: 'Active', color: 'hsl(var(--chart-1))' },
        completed: { label: 'Completed', color: 'hsl(var(--chart-2))' },
        delayed: { label: 'Delayed', color: 'hsl(var(--chart-3))' },
    } satisfies ChartConfig
};
