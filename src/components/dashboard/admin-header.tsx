
'use client';

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
import { Bell, MessageSquare, UserCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

export default function AdminDashboardHeader() {
  const role = "Super Admin";

  return (
    <div className="flex items-center gap-2">
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
  );
}
