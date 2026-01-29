
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logout } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { LogOut, UserCircle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const role = cookieStore.get('dev-auth-role')?.value;

  if (!role) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto flex h-20 items-center justify-between">
          <Link href="/" className="font-headline text-xl font-bold text-foreground">
            MyBestGuide
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserCircle className="h-5 w-5" />
                <span>Role: <strong>{role}</strong></span>
            </div>
            <form action={logout}>
              <Button variant="outline" size="sm" type="submit">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
