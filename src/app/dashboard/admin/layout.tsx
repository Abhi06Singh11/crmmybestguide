
import AdminDashboardHeader from '@/components/dashboard/admin-header';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeft, Search } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/sidebar';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const role = "Super Admin";
  // The usePathname hook can only be used in client components, but we can wrap the part that needs it.
  // For the purpose of this layout, we'll simulate its value or adjust logic.
  // A better approach would be to have a client component read the pathname.
  // For now, we'll manage active state differently or assume it's passed.
  // Let's create a simple client component for the nav.

  const NavTabs = () => {
    const pathname = usePathname();
     const tabs = [
      { href: '/d/admin', label: 'Global Dashboard' },
      { href: '/d/admin/marketer', label: 'Marketer' },
      { href: '/d/admin/developer', label: 'Developer' },
      { href: '/d/admin/support', label: 'Support' },
    ];
    return (
       <nav className="border-t -mx-6 px-6">
        <div className="flex items-center space-x-2 pt-2">
          {tabs.map(tab => (
            <Link key={tab.href} href={tab.href} className={cn(
              'px-3 py-2 text-sm font-medium rounded-md',
              pathname === tab.href ? 'bg-muted text-primary' : 'text-muted-foreground hover:bg-muted/50'
            )}>
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>
    )
  }


  return (
    <div className="flex flex-1 flex-col">
       <header className="sticky top-0 z-30 flex h-auto flex-col border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
            <div className='flex items-center justify-between w-full h-16'>
              <Sheet>
                  <SheetTrigger asChild>
                      <Button size="icon" variant="outline" className="sm:hidden">
                          <PanelLeft className="h-5 w-5" />
                          <span className="sr-only">Toggle Menu</span>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-64 sm:max-w-xs">
                      <DashboardSidebar role={role} />
                  </SheetContent>
              </Sheet>
              
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
    </div>
  );
}
