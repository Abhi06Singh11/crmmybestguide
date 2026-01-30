
import { login } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Code, LifeBuoy, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  
  const roles = [
    { name: 'Marketer', icon: BarChart },
    { name: 'Developer', icon: Code },
    { name: 'Support', icon: LifeBuoy },
    { name: 'Super Admin', icon: ShieldCheck },
  ] as const;

  return (
    <div className="flex-1 flex items-center justify-center bg-secondary">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Development Login</CardTitle>
          <CardDescription>Select a role to log in instantly.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map((role) => (
              <form action={async () => {
                'use server';
                await login(role.name);
              }} key={role.name}>
                <Button type="submit" className="w-full justify-start">
                  <role.icon className="mr-2 h-4 w-4" />
                  Login as {role.name}
                </Button>
              </form>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
