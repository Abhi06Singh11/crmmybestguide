
'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Mail, Calendar, Briefcase, Shield } from 'lucide-react';
import { usersData } from '@/lib/admin-dashboard-data';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

export default function UserProfilePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const user = usersData.find(u => u.id === id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl font-bold">User Not Found</h1>
        <p className="text-muted-foreground">The user you are looking for does not exist.</p>
        <Button onClick={() => router.push('/d/admin/users')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to User Management
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => router.push('/d/admin/users')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to User Management
        </Button>
        <Link href={`/d/admin/users/${id}/permissions`}>
            <Button>
                <Shield className="mr-2 h-4 w-4" />
                Edit Permissions
            </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center text-center">
                <div className="p-4 bg-muted rounded-full mb-4">
                    <User className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>
                     <Badge
                      variant={
                        user.status === 'Approved'
                          ? 'secondary'
                          : user.status === 'Suspended'
                          ? 'destructive'
                          : 'default'
                      }
                      className={cn(
                        'justify-center',
                        user.status === 'Approved' &&
                          'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
                        user.status === 'Pending' &&
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                      )}
                    >
                      {user.status}
                    </Badge>
                </CardDescription>
            </CardHeader>
             <CardContent className="text-sm space-y-4">
                <div className='flex items-center gap-3'>
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className='text-muted-foreground'>{user.email}</span>
                </div>
                <div className='flex items-center gap-3'>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className='text-muted-foreground'>{user.role}</span>
                </div>
                <div className='flex items-center gap-3'>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className='text-muted-foreground'>Joined on {format(parseISO(user.joinDate), 'MMM d, yyyy')}</span>
                </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Activity Overview</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Metric</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Active Projects</TableCell>
                                <TableCell className="text-right font-medium">4</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total Earnings</TableCell>
                                <TableCell className="text-right font-medium">$34,500</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Last Login</TableCell>
                                <TableCell className="text-right font-medium">2 hours ago</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
