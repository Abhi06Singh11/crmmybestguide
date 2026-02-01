
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
import { ArrowLeft, User, Shield } from 'lucide-react';
import { usersData } from '@/lib/admin-dashboard-data';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export default function EditUserPermissionsPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;

  const user = usersData.find(u => u.id === id);

  const handleSaveChanges = () => {
    toast({
      title: "Permissions Updated",
      description: `Permissions for ${user?.name} have been saved.`,
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

  const permissions = {
      'Project Management': ['Create Projects', 'Delete Projects', 'Assign Users'],
      'Billing': ['View Invoices', 'Approve Payouts', 'Manage Subscriptions'],
      'Admin': ['Manage Users', 'Edit System Rules', 'Access Audit Logs']
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" onClick={() => router.push('/d/admin/users')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to User Management
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Permissions</CardTitle>
          <CardDescription>Manage fine-grained permissions for {user.name}. The user's role is {user.role}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                <User className="h-6 w-6 text-muted-foreground" />
                <div>
                    <p className="font-semibold text-lg">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
            </div>
            
            <Separator />
            
            <div>
                 <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><Shield /> Fine-Grained Permissions</h3>
                <div className="space-y-6">
                    {Object.entries(permissions).map(([category, items]) => (
                        <div key={category}>
                            <h4 className="font-medium mb-2">{category}</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {items.map(item => (
                                    <div key={item} className="flex items-center space-x-2">
                                        <Checkbox id={`${category}-${item}`} />
                                        <label htmlFor={`${category}-${item}`} className="text-sm font-medium leading-none">
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </CardContent>
        <CardFooter>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
