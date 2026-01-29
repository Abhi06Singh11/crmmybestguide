
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
  { id: 'usr_003', name: 'Casey Becker', email: 'casey.becker@example.com', role: 'Support', status: 'Approved', joinDate: '2023-03-10' },
  { id: 'usr_004', name: 'Dana Scully', email: 'dana.scully@example.com', role: 'Developer', status: 'Pending', joinDate: '2024-08-01' },
  { id: 'usr_005', name: 'Fox Mulder', email: 'fox.mulder@example.com', role: 'Marketer', status: 'Suspended', joinDate: '2023-05-25' },
  { id: 'usr_006', name: 'Grace Slick', email: 'grace.slick@example.com', role: 'Developer', status: 'Approved', joinDate: '2023-06-18' },
];
