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
  Globe,
  User,
  FileClock,
  Bell,
  CheckCheck,
  Cog,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";

const navLinks = {
  Marketer: [
    { href: "/d/marketer", label: "Dashboard", icon: LayoutGrid },
    { href: "/d/marketer/profile", label: "Profile", icon: User },
    { href: "/d/marketer/clients", label: "Clients", icon: Users },
    { href: "/d/marketer/projects", label: "Projects", icon: Briefcase },
    { href: "/d/marketer/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/d/marketer/team", label: "Team / Developers", icon: UsersRound },
    { href: "/d/marketer/earnings", label: "Earnings", icon: DollarSign },
    { href: "/d/marketer/analytics", label: "Analytics", icon: BarChartBig },
  ],
  Developer: [
    { href: "/d/developer", label: "Dashboard", icon: LayoutGrid },
    { href: "/d/developer/profile", label: "Profile", icon: User },
    { href: "/d/developer/projects", label: "My Projects", icon: Briefcase },
    { href: "/d/developer/available-projects", label: "Active Projects", icon: Globe },
    { href: "/d/developer/earnings", label: "Earnings", icon: DollarSign },
  ],
  Network: [
    { href: "/d/network", label: "Dashboard", icon: LayoutGrid },
    { href: "/d/network/profile", label: "Profile", icon: User },
    { href: "/d/network/tasks", label: "Network Tasks", icon: CheckSquare },
    { href: "/d/network/projects", label: "Active Projects", icon: Briefcase },
    { href: "/d/network/earnings", label: "Earnings", icon: DollarSign },
    { href: "/d/network/logs", label: "Logs & Reports", icon: FileClock },
    { href: "/d/network/notifications", label: "Notifications", icon: Bell },
  ],
  'Super Admin': [
    { href: "/d/admin", label: "Global Dashboard", icon: LayoutGrid },
    { href: "/d/admin/users", label: "User Management", icon: Users },
    { href: "/d/admin/projects", label: "Project Oversight", icon: Briefcase },
    { href: "/d/admin/approvals", label: "Approvals Queue", icon: CheckCheck },
    { href: "/d/admin/payments", label: "Payments", icon: DollarSign },
    { href: "/d/admin/analytics", label: "Platform Analytics", icon: BarChartBig },
    { href: "/d/admin/rules", label: "System Rules", icon: Cog },
    { href: "/d/admin/audit-logs", label: "Audit Logs", icon: FileClock },
  ],
};

const rootDashboardLinks = ["/d/marketer", "/d/developer", "/d/network", "/d/admin"];


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
    <aside className="flex flex-col h-full">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="font-headline text-xl font-bold text-foreground">
          MyBestGuide
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        <SidebarMenu>
            {links.map((link) => {
            const isRootDashboardLink = rootDashboardLinks.includes(link.href);
            const isActive = isRootDashboardLink ? pathname === link.href : pathname.startsWith(link.href);
            return (
                <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={link.label}>
                        <Link href={link.href}>
                            <link.icon />
                            <span>{link.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            );
            })}
        </SidebarMenu>
      </nav>
      <div className="mt-auto p-4 border-t">
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith(settingsLink.href)} tooltip={settingsLink.label}>
                    <Link href={settingsLink.href}>
                        <settingsLink.icon />
                        <span>{settingsLink.label}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </aside>
  );
}
