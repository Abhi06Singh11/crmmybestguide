
import DashboardHeader from '@/components/dashboard/header';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeft, Search } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/sidebar';
import { Input } from '@/components/ui/input';

export default function SupportDashboardLayout({ children }: { children: React.ReactNode }) {
  const role = "Support";
  return (
    <div className="flex flex-1 flex-col">
       <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
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
                   placeholder="Search tickets, projects..."
                   className="w-full rounded-lg bg-secondary pl-8"
               />
            </div>

            <DashboardHeader role={role} />
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
        </main>
    </div>
  );
}
