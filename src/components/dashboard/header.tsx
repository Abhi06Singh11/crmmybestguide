
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

export default function DashboardHeader({ role }: { role: string }) {
  let rolePath = role.toLowerCase().replace(' ', '');
  if (role === 'Super Admin') {
    rolePath = 'admin';
  }
  
  const profileLink = rolePath === 'admin' ? null : `/d/${rolePath}/profile`;
  const settingsLink = `/d/${rolePath}/settings`;

  return (
    <>
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
            {profileLink && (
              <DropdownMenuItem asChild>
                <Link href={profileLink}>Profile</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href={settingsLink}>Settings</Link>
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
    </>
  );
}
