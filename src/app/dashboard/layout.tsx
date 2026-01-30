
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const role = cookieStore.get('dev-auth-role')?.value as string;

  if (!role) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen w-full bg-secondary/50">
      <div className="hidden md:flex">
        <DashboardSidebar role={role} />
      </div>
      {children}
    </div>
  );
}
