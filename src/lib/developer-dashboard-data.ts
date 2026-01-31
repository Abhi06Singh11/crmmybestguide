
import {
    Briefcase, Hourglass, CheckCircle, Eye, DollarSign, Banknote, Calendar, Star
} from 'lucide-react';

export const developerKpiData = [
  { title: 'Total Projects', value: '12', label: 'Completed all time', icon: Briefcase },
  { title: 'Active Project', value: '1', label: 'Currently working on', icon: Hourglass },
  { title: 'Pending Projects', value: '2', label: 'In your queue', icon: Eye },
  { title: 'Completed this Year', value: '8', label: '2024 goal: 15', icon: CheckCircle },
];

export const activeProjectData = {
    projectName: 'New Website Launch',
    client: 'Innovate Inc.',
    description: 'Build a fully responsive marketing website with a CMS for the blog. Focus on performance and SEO. The project is currently in the development phase.',
    priority: 'High',
    progress: 75,
    tasksCompleted: 18,
    totalTasks: 24,
    deadline: '2024-08-15',
};

export const developerTasksData = [
    { id: 1, description: 'Setup database schema for user profiles', completed: true, priority: 'High', notes: 'Using PostgreSQL with Prisma ORM.' },
    { id: 2, description: 'Implement JWT authentication endpoint', completed: true, priority: 'High', notes: 'Includes token refresh logic.' },
    { id: 3, description: 'Develop the main dashboard UI components', completed: false, priority: 'Medium', notes: 'Based on Figma design file v2.1' },
    { id: 4, description: 'Integrate Stripe API for payments', completed: false, priority: 'High', notes: 'Need to handle subscription and one-time payments.' },
    { id: 5, description: 'Write unit tests for the API services', completed: false, priority: 'Low', notes: 'Focus on auth and payment services first.' },
];

export const developerProfileData = {
  name: 'Bob Williams',
  initials: 'BW',
  role: 'Senior Backend Developer',
  status: 'Approved',
  availability: 'Busy',
  bio: 'Senior backend developer with 7 years of experience in building scalable and reliable systems. Proficient in Node.js, Python, and cloud-native architectures.',
  skills: ['Node.js', 'Python', 'Databases', 'AWS', 'Docker', 'Kubernetes', 'REST APIs', 'GraphQL'],
  tools: ['VS Code', 'Postman', 'Docker Desktop', 'Jira', 'Git'],
  experience: '7 Years',
  portfolio: [
    { 
        project: 'E-commerce Backend Refactor',
        client: 'Quantum Solutions', 
        description: 'Led the backend migration from a monolithic architecture to microservices, improving scalability and reducing latency by 30%.',
        imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=400&h=300&fit=crop',
        rating: '4.9'
    },
    { 
        project: 'Real-time Analytics Dashboard',
        client: 'Starlight Co.', 
        description: 'Developed a real-time data processing pipeline using Kafka and Node.js to power a live analytics dashboard for marketing insights.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        rating: '5.0'
    },
  ],
};


export const developerProjectsData = {
    total: 12,
    active: 1,
    completed: 9,
    pending: 2,
    projects: [
        { id: 1, projectName: 'New Website Launch', client: 'Innovate Inc.', status: 'Active', progress: 75, deadline: '2024-08-15' },
        { id: 2, projectName: 'E-commerce Backend', client: 'Quantum Solutions', status: 'Completed', progress: 100, deadline: '2024-07-01' },
        { id: 3, projectName: 'Analytics Dashboard', client: 'Starlight Co.', status: 'Completed', progress: 100, deadline: '2024-06-15' },
        { id: 4, projectName: 'Social Media Analytics Tool', client: 'Starlight Co.', status: 'Pending', progress: 0, deadline: '2024-09-01' },
        { id: 5, projectName: 'Backend Refactor', client: 'Quantum Solutions', status: 'Pending', progress: 0, deadline: '2024-09-15' },
        { id: 6, projectName: 'Mobile App API', client: 'Future Forward', status: 'Completed', progress: 100, deadline: '2024-05-20' },
        { id: 7, projectName: 'Internal HR Tool', client: 'Nexus Group', status: 'Blocked', progress: 40, deadline: '2024-08-30' },
    ]
};

export const developerEarningsData = {
    kpis: [
        { title: 'Lifetime Earnings', value: '$85,750', icon: DollarSign },
        { title: 'Last Payout', value: '$4,500', icon: Banknote },
        { title: 'Pending Clearance', value: '$5,000', icon: Calendar },
        { title: 'Avg. Project Pay', value: '$7,145', icon: Star },
    ],
    tableData: [
        { id: 1, project: 'E-commerce Backend', client: 'Quantum Solutions', amount: 9000, status: 'Paid', date: '2024-07-10', receiptId: 'RCPT-0710' },
        { id: 2, project: 'New Website Launch', client: 'Innovate Inc.', amount: 5000, status: 'Approved', date: '2024-08-20', receiptId: 'RCPT-0820' },
        { id: 3, project: 'Analytics Dashboard', client: 'Starlight Co.', amount: 7500, status: 'Paid', date: '2024-06-25', receiptId: 'RCPT-0625' },
        { id: 4, project: 'Mobile App API', client: 'Future Forward', amount: 6500, status: 'Paid', date: '2024-05-28', receiptId: 'RCPT-0528' },
    ],
    chartData: [
        { date: 'Jan 24', earnings: 4000 }, { date: 'Feb 24', earnings: 0 }, { date: 'Mar 24', earnings: 5500 },
        { date: 'Apr 24', earnings: 3000 }, { date: 'May 24', earnings: 6500 }, { date: 'Jun 24', earnings: 7500 }, { date: 'Jul 24', earnings: 9000 },
    ],
};
