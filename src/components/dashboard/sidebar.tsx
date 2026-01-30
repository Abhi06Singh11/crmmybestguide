
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
    { href: "/d/marketer", label: "Dashboard", icon: LayoutGrid },
    { href: "/d/marketer/profile", label: "Profile", icon: User },
    { href: "/d/marketer/clients", label: "Clients", icon: Users },
    { href: "/d/marketer/projects", label: "Projects", icon: Briefcase },
    { href: "/d/marketer/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/d/marketer/team", label: "Team / Developers", icon: UsersRound },
    { href: "/d/marketer/earnings", label: "Earnings", icon: DollarSign },
    { href: "/d/marketer/invoices", label: "Invoices", icon: FileText },
    { href: "/d/marketer/analytics", label: "Analytics", icon: BarChartBig },
  ],
  Developer: [
    { href: "/d/developer", label: "Dashboard", icon: LayoutGrid },
    { href: "/d/developer/profile", label: "Profile", icon: User },
    { href: "/d/developer/projects", label: "Projects", icon: Briefcase },
    { href: "/d/developer/earnings", label: "Earnings", icon: DollarSign },
  ],
  Support: [
    { href: "/d/support", label: "Dashboard", icon: LayoutGrid },
    { href: "/d/support/profile", label: "Profile", icon: User },
    { href: "/d/support/tasks", label: "Support Tasks", icon: CheckSquare },
    { href: "/d/support/projects", label: "Active Projects", icon: Briefcase },
    { href: "/d/support/earnings", label: "Earnings", icon: DollarSign },
    { href: "/d/support/logs", label: "Logs & Reports", icon: FileClock },
    { href: "/d/support/notifications", label: "Notifications", icon: Bell },
  ],
  'Super Admin': [
    { href: "/d/admin", label: "Global Dashboard", icon: LayoutGrid },
    { href: "/d/admin/users", label: "User Management", icon: Users },
    { href: "/d/admin/projects", label: "Project Oversight", icon: Briefcase },
    { href: "/d/admin/approvals", label: "Approvals Queue", icon: CheckCheck },
    { href: "/d/admin/payments", label: "Payments", icon: DollarSign },
    { href: "/d/admin/analytics", label: "Platform Analytics", icon: BarChartBig },
    { href: "/d/admin/rules", label: "System Rules", icon: Cog },
    { href: "/d/admin/logs", label: "Audit Logs", icon: FileClock },
  ],
};


export default function DashboardSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const roleKey = role as keyof typeof navLinks;

  const links = navLinks[roleKey] || [];
  
  let rolePath = role.toLowerCase().replace(' ', '');
  if (role === 'Super Admin') {
    rolePath = 'admin';
  }
  
  const settingsLink = { href: `/d/${rolePath}/settings`, label: "Settings", icon: Settings };

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
