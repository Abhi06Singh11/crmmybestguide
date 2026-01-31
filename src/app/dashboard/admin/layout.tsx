
'use client';

import AdminDashboardHeader from '@/components/dashboard/admin-header';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/sidebar';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = 'Super Admin';
  const pathname = usePathname();

  const tabs = [
    { href: '/d/admin', label: 'Global Dashboard' },
    { href: '/d/admin/marketer', label: 'Marketer' },
    { href: '/d/admin/developer', label: 'Developer' },
    { href: '/d/admin/network', label: 'Network' },
  ];

  const NavTabs = () => {
    return (
      <nav className="border-t -mx-6 px-6">
        <div className="flex items-center space-x-2 pt-2 overflow-x-auto">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap',
                pathname === tab.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted/50'
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>
    );
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardSidebar role={role} />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-auto flex-col border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex h-16 w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
            </div>
            <div className="relative flex-1 max-w-md hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users, projects, payments..."
                className="w-full rounded-lg bg-secondary pl-8"
              />
            </div>

            <AdminDashboardHeader />
          </div>
          <NavTabs />
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
