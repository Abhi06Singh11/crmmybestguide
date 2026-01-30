
'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from '@/app/actions/auth';
import { Search, Bell, MessageSquare, UserCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminDashboardHeader() {
  const pathname = usePathname();
  const role = "Super Admin";

  const tabs = [
    { href: '/d/admin', label: 'Global Dashboard' },
    { href: '/d/admin/marketer', label: 'Marketer' },
    { href: '/d/admin/developer', label: 'Developer' },
    { href: '/d/admin/support', label: 'Support' },
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center w-full">
        <div className="relative flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Toggle messages</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p>My Account</p>
                <p className="font-normal text-sm text-muted-foreground">{role}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/d/admin/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
               <form action={logout} className="w-full">
                  <button type="submit" className="w-full text-left">
                      <DropdownMenuItem>
                           <LogOut className="mr-2 h-4 w-4" />
                          <span>Logout</span>
                      </DropdownMenuItem>
                  </button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <nav className="border-t mt-4 -mx-6 px-6">
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
    </div>
  );
}
