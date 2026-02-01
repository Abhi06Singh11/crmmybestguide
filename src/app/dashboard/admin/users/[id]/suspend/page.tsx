
'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { usersData } from '@/lib/admin-dashboard-data';
import { useToast } from '@/hooks/use-toast';

export default function SuspendUserPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;

  const user = usersData.find(u => u.id === id);

  const handleSuspend = () => {
    toast({
      variant: 'destructive',
      title: "User Suspended",
      description: `${user?.name} has been suspended and their access has been revoked.`,
    });
    router.push('/d/admin/users');
  };

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
      <div>
        <Button variant="outline" onClick={() => router.push('/d/admin/users')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to User Management
        </Button>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader className="text-center items-center">
          <div className="p-3 bg-destructive/10 rounded-full">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Suspend User Account</CardTitle>
          <CardDescription>
            Are you sure you want to suspend this user? This action will immediately revoke their access to the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center p-6 bg-muted/50 rounded-md border">
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">Role: {user.role}</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-6">
            <Button variant="outline" onClick={() => router.push('/d/admin/users')}>Cancel</Button>
            <Button variant="destructive" onClick={handleSuspend}>Suspend User</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
