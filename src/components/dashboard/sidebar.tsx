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
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "../ui/sidebar";

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
    { href: "/d/developer/tasks", label: "My Tasks", icon: CheckSquare },
    { href: "/d/developer/projects", label: "My Projects", icon: Briefcase },
    { href: "/d/developer/available-projects", label: "Active Projects", icon: Globe },
    { href: "/d/developer/earnings", label: "Earnings", icon: DollarSign },
  ],
  Network: [
    { href: "/d/network", label: "Dashboard", icon: LayoutGrid },
    { href: "/d/network/profile", label: "Profile", icon: User },
    { href: "/d/network/tasks", label: "Network Tasks", icon: CheckSquare },
    { href: "/d/network/projects", label: "Managed Projects", icon: Briefcase },
    { href: "/d/network/upcoming-projects", label: "Upcoming Projects", icon: Globe },
    { href: "/d/network/earnings", label: "Earnings", icon: DollarSign },
    { href: "/d/network/logs", label: "Logs & Reports", icon: FileClock },
    { href: "/d/network/notifications", label: "Notifications", icon: Bell },
  ],
  'Super Admin': [], // This is now handled by adminNavLinks
};

const adminNavLinks = {
  Global: [
    { href: "/d/admin", label: "Global Dashboard", icon: LayoutGrid },
    { href: "/d/admin/users", label: "User Management", icon: Users },
    { href: "/d/admin/projects", label: "Project Oversight", icon: Briefcase },
    { href: "/d/admin/approvals", label: "Approvals Queue", icon: CheckCheck },
    { href: "/d/admin/payments", label: "Payments", icon: DollarSign },
    { href: "/d/admin/analytics", label: "Platform Analytics", icon: BarChartBig },
    { href: "/d/admin/rules", label: "System Rules", icon: Cog },
    { href: "/d/admin/audit-logs", label: "Audit Logs", icon: FileClock },
    { href: "/d/admin/settings", label: "Global Settings", icon: Settings },
  ],
  Marketer: [
    { href: "/d/admin/marketer", label: "Dashboard", icon: BarChartBig },
    { href: "/d/admin/marketer/users", label: "Marketer Users", icon: Users },
    { href: "/d/admin/marketer/projects", label: "Campaigns", icon: Briefcase },
    { href: "/d/admin/marketer/approvals", label: "Approvals", icon: CheckCheck },
    { href: "/d/admin/marketer/payments", label: "Payments", icon: DollarSign },
    { href: "/d/admin/marketer/analytics", label: "Analytics", icon: BarChartBig },
    { href: "/d/admin/marketer/rules", label: "Rules", icon: Cog },
    { href: "/d/admin/marketer/audit-logs", label: "Logs", icon: FileClock },
    { href: "/d/admin/marketer/settings", label: "Settings", icon: Settings },
  ],
  Developer: [
    { href: "/d/admin/developer", label: "Dashboard", icon: Code },
    { href: "/d/admin/developer/users", label: "Developer Users", icon: Users },
    { href: "/d/admin/developer/projects", label: "Dev Projects", icon: Briefcase },
    { href: "/d/admin/developer/approvals", label: "Approvals", icon: CheckCheck },
    { href: "/d/admin/developer/payments", label: "Payments", icon: DollarSign },
    { href: "/d/admin/developer/analytics", label: "Analytics", icon: BarChartBig },
    { href: "/d/admin/developer/rules", label: "Rules", icon: Cog },
    { href: "/d/admin/developer/audit-logs", label: "Logs", icon: FileClock },
    { href: "/d/admin/developer/settings", label: "Settings", icon: Settings },
  ],
  Network: [
    { href: "/d/admin/network", label: "Dashboard", icon: Globe },
    { href: "/d/admin/network/users", label: "Network Users", icon: Users },
    { href: "/d/admin/network/projects", label: "Network Projects", icon: Briefcase },
    { href: "/d/admin/network/approvals", label: "Approvals", icon: CheckCheck },
    { href: "/d/admin/network/payments", label: "Payments", icon: DollarSign },
    { href: "/d/admin/network/analytics", label: "Analytics", icon: BarChartBig },
    { href: "/d/admin/network/rules", label: "Rules", icon: Cog },
    { href: "/d/admin/network/audit-logs", label: "Logs", icon: FileClock },
    { href: "/d/admin/network/settings", label: "Settings", icon: Settings },
  ],
};


const rootDashboardLinks = [
    "/d/marketer", "/d/developer", "/d/network", "/d/admin",
    "/d/admin/marketer", "/d/admin/developer", "/d/admin/network"
];


export default function DashboardSidebar({ role, adminProfile }: { role: string, adminProfile?: string }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const roleKey = role as keyof typeof navLinks;
  
  let links = [];
  let settingsLink;

  if (role === 'Super Admin' && adminProfile) {
    const profileKey = adminProfile as keyof typeof adminNavLinks;
    links = adminNavLinks[profileKey] || adminNavLinks.Global;
  } else {
    links = navLinks[roleKey] || [];
  }
  
  if (role !== 'Super Admin') {
    let rolePath = role.toLowerCase().replace(' ', '');
    settingsLink = { href: `/d/${rolePath}/settings`, label: "Settings", icon: Settings };
  }

  const handleLinkClick = () => {
    setOpenMobile(false);
  };

  return (
    <aside className="flex flex-col h-full">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="font-headline text-xl font-bold text-foreground" onClick={handleLinkClick}>
          MyBestGuide
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        <SidebarMenu>
            {links.map((link) => {
              const otherLinks = links.filter(l => l.href !== link.href);
              const isRootDashboardLink = rootDashboardLinks.includes(link.href);

              let isActive = false;
              if (isRootDashboardLink) {
                  const onNonDashboardSubroute = pathname.startsWith(link.href) && !otherLinks.some(other => pathname.startsWith(other.href));
                  isActive = pathname === link.href || onNonDashboardSubroute;
              } else {
                  isActive = pathname.startsWith(link.href);
              }
              
              return (
                  <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={link.label}>
                          <Link href={link.href} onClick={handleLinkClick}>
                              <link.icon />
                              <span>{link.label}</span>
                          </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              );
            })}
        </SidebarMenu>
      </nav>
      {settingsLink && (
        <div className="mt-auto p-4 border-t">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith(settingsLink.href)} tooltip={settingsLink.label}>
                        <Link href={settingsLink.href} onClick={handleLinkClick}>
                            <settingsLink.icon />
                            <span>{settingsLink.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </div>
      )}
    </aside>
  );
}
