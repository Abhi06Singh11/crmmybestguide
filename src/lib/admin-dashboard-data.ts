
import { Users, Briefcase, DollarSign, AlertTriangle } from 'lucide-react';

export const adminKpiData = [
  { title: 'Total Users', value: '48', change: '+5 this week', icon: Users },
  { title: 'Active Projects', value: '12', change: '80% capacity', icon: Briefcase },
  { title: 'Platform Revenue (Month)', value: '$28,450', change: '+12% vs last month', icon: DollarSign },
  { title: 'Pending Approvals', value: '3', change: '1 user, 2 projects', icon: AlertTriangle },
];

export const platformRevenueData = [
    { month: 'Jan', revenue: 15000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 22000 },
    { month: 'Apr', revenue: 25000 },
    { month: 'May', revenue: 23000 },
    { month: 'Jun', revenue: 28000 },
];

export const usersData = [
  { id: 'usr_001', name: 'Alex Ray', email: 'alex.ray@example.com', role: 'Marketer', status: 'Approved', joinDate: '2023-01-15' },
  { id: 'usr_002', name: 'Bob Williams', email: 'bob.williams@example.com', role: 'Developer', status: 'Approved', joinDate: '2023-02-20' },
  { id: 'usr_003', name: 'Casey Becker', email: 'casey.becker@example.com', role: 'Network', status: 'Approved', joinDate: '2023-03-10' },
  { id: 'usr_004', name: 'Dana Scully', email: 'dana.scully@example.com', role: 'Developer', status: 'Pending', joinDate: '2024-08-01' },
  { id: 'usr_005', name: 'Fox Mulder', email: 'fox.mulder@example.com', role: 'Marketer', status: 'Suspended', joinDate: '2023-05-25' },
  { id: 'usr_006', name: 'Grace Slick', email: 'grace.slick@example.com', role: 'Developer', status: 'Approved', joinDate: '2023-06-18' },
];


export const adminProjectsData = [
    { id: 'proj_001', name: 'New Website Launch', client: 'Innovate Inc.', manager: 'Alex Ray', status: 'Active', risk: 'Low', progress: 75, budget: 25000 },
    { id: 'proj_002', name: 'Q3 Marketing Campaign', client: 'Quantum Solutions', manager: 'Alex Ray', status: 'Active', risk: 'Low', progress: 90, budget: 15000 },
    { id: 'proj_003', name: 'SEO Optimization', client: 'Starlight Co.', manager: 'Alex Ray', status: 'Pending Approval', risk: 'N/A', progress: 100, budget: 12000 },
    { id: 'proj_004', name: 'Cloud Migration', client: 'Innovate Inc.', manager: 'Casey Becker', status: 'On Hold', risk: 'Medium', progress: 20, budget: 35000 },
    { id: 'proj_005', name: 'Mobile App Revamp', client: 'Sunrise Ltd.', manager: 'Alex Ray', status: 'Risk', risk: 'High', progress: 50, budget: 22000 },
    { id: 'proj_006', name: 'E-commerce Backend', client: 'Quantum Solutions', manager: 'Alex Ray', status: 'Completed', risk: 'N/A', progress: 100, budget: 30000 },
];

export const adminApprovalsData = [
    { id: 'appr_001', item: 'Dana Scully', type: 'New User', requester: 'System', date: '2024-08-01', status: 'Pending' },
    { id: 'appr_002', item: 'Project "AI Chatbot"', type: 'New Project', requester: 'Alex Ray', date: '2024-08-02', status: 'Pending' },
    { id: 'appr_003', item: 'Payout for Bob Williams ($2,500)', type: 'Payment', requester: 'Bob Williams', date: '2024-08-03', status: 'Pending' },
    { id: 'appr_004', item: 'Campaign "Summer Sale"', type: 'Budget', requester: 'Alex Ray', date: '2024-07-28', status: 'Approved' },
    { id: 'appr_005', item: 'User Deactivation: Fox Mulder', type: 'User Management', requester: 'Super Admin', date: '2024-07-25', status: 'Approved' },
    { id: 'appr_006', item: 'Expense Report Q2', type: 'Expense', requester: 'Casey Becker', date: '2024-07-22', status: 'Rejected' },
];

export const adminPaymentsData = {
    kpis: [
        { title: 'Total Revenue (All Time)', value: '$258,900', icon: DollarSign },
        { title: 'Payouts This Month', value: '$21,300', icon: DollarSign },
        { title: 'Pending Payouts', value: '$8,500', icon: DollarSign },
        { title: 'Disputes', value: '1', icon: AlertTriangle },
    ],
    transactions: [
        { id: 'txn_001', client: 'Innovate Inc.', amount: 5000, status: 'Paid', date: '2024-08-01' },
        { id: 'txn_002', client: 'Quantum Solutions', amount: 2500, status: 'Paid', date: '2024-07-28' },
        { id: 'txn_003', client: 'Starlight Co.', amount: 3250, status: 'Pending', date: '2024-08-05' },
        { id: 'txn_004', client: 'Sunrise Ltd.', amount: 11000, status: 'Overdue', date: '2024-07-15' },
    ]
};

export const adminAnalyticsData = {
    userGrowth: [
        { month: 'Jan', users: 12 }, { month: 'Feb', users: 18 }, { month: 'Mar', users: 25 },
        { month: 'Apr', users: 32 }, { month: 'May', users: 40 }, { month: 'Jun', users: 48 },
    ],
    userRoles: [
        { role: 'Developer', count: 25, fill: 'var(--color-developer)' },
        { role: 'Marketer', count: 15, fill: 'var(--color-marketer)' },
        { role: 'Network', count: 8, fill: 'var(--color-network)' },
    ],
    userRolesConfig: {
        count: { label: 'Users' },
        developer: { label: 'Developer', color: 'hsl(var(--chart-1))' },
        marketer: { label: 'Marketer', color: 'hsl(var(--chart-2))' },
        network: { label: 'Network', color: 'hsl(var(--chart-3))' },
    }
};

export const adminSystemRules = [
    { id: 'rule_001', name: 'Auto-approve Payouts < $500', condition: 'payment.amount < 500', action: 'auto_approve()', status: true },
    { id: 'rule_002', name: 'Assign High-Priority Projects to Seniors', condition: 'project.priority == "High"', action: 'assign_senior()', status: true },
    { id: 'rule_003', name: 'Flag Overdue Invoices', condition: 'invoice.dueDate < now()', action: 'flag_overdue()', status: true },
    { id: 'rule_004', name: 'Welcome Email for New Users', condition: 'user.new == true', action: 'send_welcome_email()', status: false },
];

export const adminAuditLogs = [
    { id: 'log_001', user: 'Super Admin', action: 'Updated System Rule', details: 'Disabled rule "Welcome Email for New Users"', timestamp: '2024-08-05 10:15:00' },
    { id: 'log_002', user: 'Alex Ray', action: 'Created Project', details: 'Project "AI Chatbot" for client Innovate Inc.', timestamp: '2024-08-05 09:30:00' },
    { id: 'log_003', user: 'System', action: 'Suspended User', details: 'Suspended Fox Mulder for policy violation.', timestamp: '2024-08-04 18:00:00' },
    { id: 'log_004', user: 'Bob Williams', action: 'Requested Payout', details: 'Amount: $2,500', timestamp: '2024-08-03 11:00:00' },
];
