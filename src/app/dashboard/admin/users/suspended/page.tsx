
'use client';

import { useState } from 'react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, ArrowLeft, RotateCw, Trash2 } from 'lucide-react';
import { usersData } from '@/lib/admin-dashboard-data';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function SuspendedUsersPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [suspendedUsers, setSuspendedUsers] = useState(usersData.filter(u => u.status === 'Suspended'));

    const handleReactivate = (userId: string) => {
        const user = suspendedUsers.find(u => u.id === userId);
        toast({
            title: "User Reactivated",
            description: `${user?.name} has been reactivated.`,
        });
        setSuspendedUsers(suspendedUsers.filter(u => u.id !== userId));
    };
    
    const handleDelete = (userId: string) => {
        const user = suspendedUsers.find(u => u.id === userId);
        toast({
            variant: "destructive",
            title: "User Deleted",
            description: `${user?.name} has been permanently deleted.`,
        });
        setSuspendedUsers(suspendedUsers.filter(u => u.id !== userId));
    };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <Button variant="outline" size="sm" className="mb-4" onClick={() => router.push('/d/admin/users')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to User Management
            </Button>
            <CardTitle>Suspended Users</CardTitle>
            <CardDescription>View and manage all suspended user accounts.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Suspended On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suspendedUsers.length > 0 ? suspendedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    {/* This would be a new field in a real app */}
                    {format(parseISO('2024-08-04'), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleReactivate(user.id)}>
                           <RotateCw className="mr-2 h-4 w-4" /> Reactivate User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-red-500">
                           <Trash2 className="mr-2 h-4 w-4" /> Delete Permanently
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                 <TableRow>
                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                        No suspended users found.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
