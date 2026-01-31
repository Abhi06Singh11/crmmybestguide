
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import {
  Menu,
  Briefcase,
  MessageSquareQuote,
  Users,
  Mail,
  LayoutGrid,
  LogIn
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Separator } from '../ui/separator';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/services', label: 'Services', icon: LayoutGrid },
    { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
    { href: '/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { href: '/about', label: 'About', icon: Users },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-headline text-xl font-bold text-foreground">
            MyBestGuide
          </span>
        </Link>
        <div
          className="hidden md:flex flex-1 justify-center items-center"
        >
          <nav className="flex items-center space-x-2 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-4 py-2 transition-colors duration-200 border-2 border-transparent',
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'text-foreground/70 hover:bg-primary/90 hover:text-primary-foreground hover:border-primary'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
           <Link href="/login" className="hidden sm:inline-flex">
            <Button variant="outline" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </Link>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="font-headline text-xl font-bold text-foreground">
                      MyBestGuide
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1">
                <nav className="flex flex-col items-start gap-4 pt-4">
                  {navLinks.map((link) => (
                     <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-lg font-medium transition-colors hover:text-primary w-full',
                         pathname.startsWith(link.href) ? 'bg-muted text-primary' : 'text-foreground/80'
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <SheetFooter>
                <div className="w-full">
                  <Separator className="my-4" />
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                     <Button variant="outline" className="w-full">
                       <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Button>
                  </Link>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
