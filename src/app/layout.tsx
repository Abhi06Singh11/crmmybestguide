import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import GoToTop from '@/components/layout/go-to-top';

export const metadata: Metadata = {
  title: 'MyBestGuide',
  description: 'E-commerce, Application Development, and ERP SaaS solutions to boost your growth and efficiency.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
        <GoToTop />
      </body>
    </html>
  );
}
