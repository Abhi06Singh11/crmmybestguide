'use client';

import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import GoToTop from '@/components/layout/go-to-top';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isCrmPage = pathname.startsWith('/d') || pathname === '/login';

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background text-foreground antialiased flex flex-col font-sans')}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  console.error('Could not set theme from localStorage', e);
                }
              })();
            `,
          }}
        />
        {!isCrmPage && <Header />}
        <main className={cn('flex-1 flex', !isCrmPage && 'flex-col')}>
          {children}
        </main>
        {!isCrmPage && <Footer />}
        <Toaster />
        {!isCrmPage && <GoToTop />}
      </body>
    </html>
  );
}
