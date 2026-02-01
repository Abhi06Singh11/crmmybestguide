
'use client';

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
import { UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const networkUsers = [
  { id: 'net_usr_001', name: 'Nina Patel', email: 'nina.patel@example.com', role: 'Network Admin', status: 'Active' },
  { id: 'net_usr_002', name: 'Omar Khan', email: 'omar.khan@example.com', role: 'Network Engineer', status: 'Pending' },
  { id: 'net_usr_003', name: 'Priya Singh', email: 'priya.singh@example.com', role: 'Admin', status: 'Active' },
  { id: 'net_usr_004', name: 'Casey Becker', email: 'casey.becker@example.com', role: 'Network Engineer', status: 'Active' },
];

export default function AdminNetworkUsersPage() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network User Management</CardTitle>
        <CardDescription>A view of all network professionals, their certifications, and SLA performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4 gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search by name or email..."
                className="w-full rounded-lg bg-secondary pl-8"
                />
            </div>
             <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
            </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {networkUsers.map((user) => (
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
                    <Badge
                       className={cn(
                        'justify-center',
                        user.status === 'Active' &&
                          'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
                        user.status === 'Pending' &&
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                      )}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Disable</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
