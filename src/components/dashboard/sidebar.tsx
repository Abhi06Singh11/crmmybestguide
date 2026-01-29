
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
  User,
  FileClock,
  Bell,
  CheckCheck,
  Cog,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = {
  Marketer: [
    { href: "/dashboard/marketer", label: "Dashboard", icon: LayoutGrid },
    { href: "/dashboard/marketer/profile", label: "Profile", icon: User },
    { href: "/dashboard/marketer/clients", label: "Clients", icon: Users },
    { href: "/dashboard/marketer/projects", label: "Projects", icon: Briefcase },
    { href: "/dashboard/marketer/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/dashboard/marketer/team", label: "Team / Developers", icon: UsersRound },
    { href: "/dashboard/marketer/earnings", label: "Earnings", icon: DollarSign },
    { href: "/dashboard/marketer/invoices", label: "Invoices", icon: FileText },
    { href: "/dashboard/marketer/analytics", label: "Analytics", icon: BarChartBig },
  ],
  Developer: [
    { href: "/dashboard/developer", label: "Dashboard", icon: LayoutGrid },
    { href: "/dashboard/developer/profile", label: "Profile", icon: User },
    { href: "/dashboard/developer/projects", label: "Projects", icon: Briefcase },
    { href: "/dashboard/developer/earnings", label: "Earnings", icon: DollarSign },
  ],
  Support: [
    { href: "/dashboard/support", label: "Dashboard", icon: LayoutGrid },
    { href: "/dashboard/support/profile", label: "Profile", icon: User },
    { href: "/dashboard/support/tasks", label: "Support Tasks", icon: CheckSquare },
    { href: "/dashboard/support/projects", label: "Active Projects", icon: Briefcase },
    { href: "/dashboard/support/earnings", label: "Earnings", icon: DollarSign },
    { href: "/dashboard/support/logs", label: "Logs & Reports", icon: FileClock },
    { href: "/dashboard/support/notifications", label: "Notifications", icon: Bell },
  ],
  'Super Admin': [
    { href: "/dashboard/admin", label: "Global Dashboard", icon: LayoutGrid },
    { href: "/dashboard/admin/users", label: "User Management", icon: Users },
    { href: "/dashboard/admin/projects", label: "Project Oversight", icon: Briefcase },
    { href: "/dashboard/admin/approvals", label: "Approvals Queue", icon: CheckCheck },
    { href: "/dashboard/admin/payments", label: "Payments", icon: DollarSign },
    { href: "/dashboard/admin/analytics", label: "Platform Analytics", icon: BarChartBig },
    { href: "/dashboard/admin/rules", label: "System Rules", icon: Cog },
    { href: "/dashboard/admin/logs", label: "Audit Logs", icon: FileClock },
  ],
};


export default function DashboardSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const roleKey = role as keyof typeof navLinks;

  const links = navLinks[roleKey] || [];
  
  // A bit of a hack to ensure the settings link is correct for 'Super Admin'
  const settingsLinkPath = roleKey === 'Super Admin' 
    ? `/dashboard/admin/settings`
    : roleKey === 'Support'
    ? `/dashboard/support/settings`
    : roleKey === 'Developer'
    ? `/dashboard/developer/settings`
    : `/dashboard/marketer/settings`;
  
  const settingsLink = { href: settingsLinkPath, label: "Settings", icon: Settings };

  return (
    <aside className="w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="font-headline text-xl font-bold text-foreground">
          MyBestGuide
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-secondary text-primary"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
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
