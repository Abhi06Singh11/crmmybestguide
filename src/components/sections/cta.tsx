import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Cta() {
  return (
    <section id="cta" className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center space-y-6 text-center">
            <div className="rounded-full bg-primary-foreground/10 p-3 text-primary-foreground">
                <Sparkles className="h-8 w-8" />
            </div>
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Ready to Start Your Digital Transformation?</h2>
          <p className="text-lg text-primary-foreground/80">
            Whether you need a new website, a custom software solution, or a comprehensive digital strategy, our team is ready to help you succeed. Let's talk.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Get Your Project Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
