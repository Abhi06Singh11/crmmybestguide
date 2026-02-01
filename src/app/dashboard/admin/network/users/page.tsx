
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
import { usersData } from '@/lib/admin-dashboard-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AdminNetworkUsersPage() {
  const networkUsers = usersData.filter(u => u.role === 'Network');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Network User Management</CardTitle>
            <CardDescription>A view of all network professionals, their certifications, and SLA performance.</CardDescription>
        </div>
        <Link href="/d/admin/network/users/new">
            <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
            </Button>
        </Link>
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
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                    <Badge
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
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/d/admin/network/users/${user.id}/edit`}>
                        <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Link href={`/d/admin/network/users/${user.id}/disable`}>
                        <Button variant="destructive" size="sm">Disable</Button>
                    </Link>
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
