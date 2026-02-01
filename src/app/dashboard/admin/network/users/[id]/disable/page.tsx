
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

export default function DisableNetworkUserPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;

  const user = usersData.find(u => u.id === id);

  const handleDisable = () => {
    toast({
      variant: 'destructive',
      title: "User Disabled",
      description: `${user?.name} has been disabled.`,
    });
    router.push('/d/admin/network/users');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl font-bold">User Not Found</h1>
        <Button onClick={() => router.push('/d/admin/network/users')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" onClick={() => router.push('/d/admin/network/users')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader className="text-center items-center">
          <div className="p-3 bg-destructive/10 rounded-full">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Disable User Account</CardTitle>
          <CardDescription>
            Are you sure you want to disable this user's account? They will lose access to the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center p-6 bg-muted/50 rounded-md border">
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">Role: {user.role}</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-6">
            <Button variant="outline" onClick={() => router.push('/d/admin/network/users')}>Cancel</Button>
            <Button variant="destructive" onClick={handleDisable}>Disable User</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
