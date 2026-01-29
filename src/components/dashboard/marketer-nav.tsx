
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/dashboard/marketer', label: 'Dashboard' },
  { href: '/dashboard/marketer/profile', label: 'Profile' },
  { href: '/dashboard/marketer/clients', label: 'Clients' },
  { href: '/dashboard/marketer/projects', label: 'Projects' },
  { href: '/dashboard/marketer/team', label: 'Team' },
  { href: '/dashboard/marketer/earnings', label: 'Earnings' },
];

export default function MarketerNav() {
  const pathname = usePathname();

  return (
    <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full overflow-x-auto">
      <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 min-w-max">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link href={link.href} key={link.href} className='flex-1'>
              <span
                className={cn(
                  "inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                  isActive ? "bg-background text-foreground shadow-sm" : ""
                )}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
