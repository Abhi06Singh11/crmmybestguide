

import {
    AlertCircle, ShieldCheck, Clock, CheckCircle2, FileClock, DollarSign, Banknote, Calendar, Star, Briefcase
} from 'lucide-react';

export const networkKpiData = [
  { title: 'Active Tickets', value: '8', label: 'Assigned to you', icon: AlertCircle, color: 'text-yellow-500' },
  { title: 'Resolved Today', value: '4', label: 'SLA met: 100%', icon: ShieldCheck, color: 'text-green-500' },
  { title: 'Pending Review', value: '2', label: 'Waiting for client approval', icon: Clock, color: 'text-blue-500' },
  { title: 'Avg. Resolution Time', value: '3.2h', label: 'Last 7 days', icon: Clock, color: 'text-muted-foreground' },
];

export const highPriorityTasksData = [
    { id: 'TKT-001', title: 'Server Unresponsive', project: 'Innovate Inc. Website', sla: '2h remaining' },
    { id: 'TKT-003', title: 'Payment Gateway Error', project: 'Quantum E-commerce', sla: 'SLA Breached' },
    { id: 'TKT-005', title: 'API Latency Spikes', project: 'Starlight Co. App', sla: '45m remaining' },
];

export const upcomingMaintenanceData = [
    { id: 1, project: 'Innovate Inc. Website', client: 'Innovate Inc.', task: 'Database Backup & Optimization', date: '2024-08-10' },
    { id: 2, project: 'Quantum E-commerce', client: 'Quantum Solutions', task: 'Security Patch Update', date: '2024-08-12' },
];

export const networkProfileData = {
  name: 'Casey Becker',
  initials: 'CB',
  role: 'Network Engineer',
  email: 'casey.becker@example.com',
  status: 'Approved',
  availability: 'Available',
  bio: 'Dedicated Network Engineer with 5 years of experience in troubleshooting, maintenance, and incident resolution for web applications. Certified in AWS and ITIL.',
  skills: ['Linux', 'AWS', 'Docker', 'SQL', 'Nginx', 'Firewalls', 'Jenkins'],
  tools: ['Zendesk', 'Jira', 'DataDog', 'Postman', 'VS Code'],
  experience: '5 Years',
  certifications: ['AWS Certified Solutions Architect', 'ITIL Foundation'],
  performance: [
    { metric: 'Avg. First Response', value: '15 mins' },
    { metric: 'Avg. Resolution Time', value: '2.8 hours' },
    { metric: 'Client Satisfaction', value: '98%' },
  ],
  ticketResolutionData: [
      { day: 'Mon', tickets: 4 },
      { day: 'Tue', tickets: 6 },
      { day: 'Wed', tickets: 5 },
      { day: 'Thu', tickets: 7 },
      { day: 'Fri', tickets: 3 },
      { day: 'Sat', tickets: 1 },
      { day: 'Sun', tickets: 0 },
  ]
};


export const networkProjectsData = {
    total: 8,
    stable: 6,
    monitoring: 2,
    projects: [
        { id: 1, projectName: 'Innovate Inc. Website', client: 'Innovate Inc.', status: 'Stable', lastMaintenance: '2024-07-20', nextCheck: '2024-08-20' },
        { id: 2, projectName: 'Quantum E-commerce', client: 'Quantum Solutions', status: 'Stable', lastMaintenance: '2024-07-18', nextCheck: '2024-08-18' },
        { id: 3, projectName: 'Starlight Co. App', client: 'Starlight Co.', status: 'Monitoring', lastMaintenance: '2024-08-01', nextCheck: '2024-08-15' },
        { id: 4, projectName: 'Future Forward Platform', client: 'Future Forward', status: 'Stable', lastMaintenance: '2024-07-25', nextCheck: '2024-08-25' },
    ]
};

export const networkTasksData = {
    total: 25,
    open: 8,
    inProgress: 3,
    resolved: 14,
    tasks: [
        { id: 'TKT-001', project: 'Innovate Inc. Website', title: 'Server Unresponsive', priority: 'Critical', status: 'In Progress', updated: '5m ago' },
        { id: 'TKT-002', project: 'Quantum E-commerce', title: 'User cannot reset password', priority: 'High', status: 'Open', updated: '1h ago' },
        { id: 'TKT-003', project: 'Quantum E-commerce', title: 'Payment Gateway Error', priority: 'Critical', status: 'In Progress', updated: '10m ago' },
        { id: 'TKT-004', project: 'Starlight Co. App', title: 'Slow loading times on dashboard', priority: 'Medium', status: 'Open', updated: '3h ago' },
        { id: 'TKT-005', project: 'Starlight Co. App', title: 'API Latency Spikes', priority: 'High', status: 'In Progress', updated: '15m ago' },
        { id: 'TKT-006', project: 'Innovate Inc. Website', title: 'Fix broken image link on homepage', priority: 'Low', status: 'Resolved', updated: '1d ago' },
    ]
};

export const networkEarningsData = {
    kpis: [
        { title: 'Lifetime Earnings', value: '₹3,400,000', icon: DollarSign },
        { title: 'Last Payout', value: '₹280,000', icon: Banknote },
        { title: 'Pending Clearance', value: '₹144,000', icon: Calendar },
        { title: 'Avg. Task Pay', value: '₹12,000', icon: Star },
    ],
    tableData: [
        { id: 1, type: 'Contract', project: 'Innovate Inc. Maintenance', amount: 120000, status: 'Paid', date: '2024-07-05', receiptId: 'RCPT-S-0705' },
        { id: 2, type: 'Task', project: 'Quantum E-commerce (TKT-003)', amount: 24000, status: 'Approved', date: '2024-08-02', receiptId: 'RCPT-S-0802' },
        { id: 3, type: 'Contract', project: 'Starlight Co. Support', amount: 96000, status: 'Pending', date: '2024-08-01', receiptId: 'RCPT-S-0801' },
        { id: 4, type: 'Task', project: 'Generic Task Resolution', amount: 12000, status: 'Paid', date: '2024-07-22', receiptId: 'RCPT-S-0722' },
    ],
    chartData: [
        { date: 'Jan 24', earnings: 160000 }, { date: 'Feb 24', earnings: 200000 }, { date: 'Mar 24', earnings: 176000 },
        { date: 'Apr 24', earnings: 240000 }, { date: 'May 24', earnings: 224000 }, { date: 'Jun 24', earnings: 280000 }, { date: 'Jul 24', earnings: 320000 },
    ],
};

export const networkLogsData = [
    { timestamp: '2024-08-05 10:30:15', type: 'Security', event: 'Firewall rule updated for IP 192.168.1.1' },
    { timestamp: '2024-08-05 09:15:00', type: 'Maintenance', event: 'Database backup completed for Project Quantum' },
    { timestamp: '2024-08-04 18:05:22', type: 'Incident', event: 'TKT-003 Resolved: Payment gateway API key renewed.' },
    { timestamp: '2024-08-04 15:00:00', type: 'System', event: 'Server CPU usage exceeded 90% threshold on `web-prod-01`.' },
];
