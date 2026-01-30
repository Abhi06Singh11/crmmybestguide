
import AdminDashboardHeader from '@/components/dashboard/admin-header';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/sidebar';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const role = "Super Admin";
  return (
    <div className="flex flex-1 flex-col">
       <header className="sticky top-0 z-30 flex h-auto flex-col items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className='flex items-center w-full h-16'>
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
              <AdminDashboardHeader />
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
        </main>
    </div>
  );
}
