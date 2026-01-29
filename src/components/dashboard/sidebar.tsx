
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Briefcase,
  CheckSquare,
  UsersRound,
  DollarSign,
  FileText,
  BarChartBig,
  Settings,
  Code,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = {
  Marketer: [
    { href: "/dashboard/marketer", label: "Dashboard", icon: LayoutGrid },
    { href: "/dashboard/clients", label: "Clients", icon: Users },
    { href: "/dashboard/projects", label: "Projects", icon: Briefcase },
    { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/dashboard/team", label: "Team", icon: UsersRound },
    { href: "/dashboard/earnings", label: "Earnings", icon: DollarSign },
    { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChartBig },
  ],
  Developer: [
    { href: "/dashboard/developer", label: "Dashboard", icon: Code },
    { href: "/dashboard/projects", label: "Projects", icon: Briefcase },
    { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
  ],
  Support: [
    { href: "/dashboard/support", label: "Dashboard", icon: LifeBuoy },
    { href: "/dashboard/tickets", label: "Tickets", icon: FileText },
    { href: "/dashboard/clients", label: "Clients", icon: Users },
  ],
  'Super Admin': [
    { href: "/dashboard/admin", label: "Admin Panel", icon: ShieldCheck },
    { href: "/dashboard/users", label: "Manage Users", icon: Users },
    { href: "/dashboard/settings", label: "System Settings", icon: Settings },
  ],
};


export default function DashboardSidebar() {
  const pathname = usePathname();

  const getRoleFromPath = () => {
    if (pathname.startsWith('/dashboard/marketer')) return 'Marketer';
    if (pathname.startsWith('/dashboard/developer')) return 'Developer';
    if (pathname.startsWith('/dashboard/support')) return 'Support';
    if (pathname.startsWith('/dashboard/admin')) return 'Super Admin';
    return 'Marketer'; // Default
  }

  const role = getRoleFromPath();
  const links = navLinks[role as keyof typeof navLinks] || [];
  const settingsLink = { href: `/dashboard/${role.toLowerCase().replace(' ', '')}/settings`, label: "Settings", icon: Settings };


  return (
    <aside className="w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="font-headline text-xl font-bold text-foreground">
          MyBestGuide
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname.startsWith(link.href) && "bg-secondary text-primary"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t">
        <Link
          href={settingsLink.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname === settingsLink.href && "bg-secondary text-primary"
          )}
        >
          <settingsLink.icon className="h-4 w-4" />
          {settingsLink.label}
        </Link>
      </div>
    </aside>
  );
}
