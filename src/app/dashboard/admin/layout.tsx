
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, LayoutGrid, Code, BarChart, Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = 'Super Admin';
  const pathname = usePathname();
  const router = useRouter();

  const profiles = [
    { href: '/d/admin', label: 'Global Dashboard', icon: LayoutGrid },
    { href: '/d/admin/marketer', label: 'Marketer', icon: BarChart },
    { href: '/d/admin/developer', label: 'Developer', icon: Code },
    { href: '/d/admin/network', label: 'Network', icon: Globe },
  ];

  const getCurrentProfile = () => {
    if (pathname.startsWith('/d/admin/marketer')) return profiles[1];
    if (pathname.startsWith('/d/admin/developer')) return profiles[2];
    if (pathname.startsWith('/d/admin/network')) return profiles[3];
    return profiles[0]; // Global
  };

  const currentProfile = getCurrentProfile();

  const handleProfileSwitch = (newProfileHref: string) => {
    const pathParts = pathname.split('/'); 

    let currentPageSlug = '';
    if (pathParts.length > 3 && pathParts[1] === 'd' && pathParts[2] === 'admin') {
      if (['developer', 'marketer', 'network'].includes(pathParts[3])) {
        if (pathParts.length > 4) {
          currentPageSlug = pathParts.slice(4).join('/');
        }
      } else {
        currentPageSlug = pathParts.slice(3).join('/');
      }
    }
    
    if (['developer', 'marketer', 'network'].includes(currentPageSlug)) {
        currentPageSlug = '';
    }

    const newPath = currentPageSlug ? `${newProfileHref}/${currentPageSlug}` : newProfileHref;
    
    if (newPath !== pathname) {
      router.push(newPath);
    }
  };


  const ProfileSwitcher = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-64 justify-between">
            <div className="flex items-center gap-2">
                <currentProfile.icon className="h-4 w-4 text-muted-foreground" />
                <span>{currentProfile.label}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          {profiles.map((profile) => (
            <DropdownMenuItem key={profile.href} onClick={() => handleProfileSwitch(profile.href)}>
                <profile.icon className="mr-2 h-4 w-4" />
                <span>{profile.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardSidebar role={role} />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <ProfileSwitcher />
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
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
