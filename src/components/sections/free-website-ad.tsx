import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import Link from 'next/link';

export default function FreeWebsiteAd() {
  return (
    <section id="free-website-ad" className="bg-gradient-to-r from-primary to-accent py-16 md:py-24">
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center text-primary-foreground">
            <div className="rounded-full bg-primary-foreground/10 p-4 text-primary-foreground">
                <Gift className="h-10 w-10" />
            </div>
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Claim Your 100% FREE Professional Website</h2>
          <p className="text-lg text-primary-foreground/80">
            For a limited time, get a professionally designed, multi-page website at absolutely no cost. No hidden fees, no credit card required. Launch your business online and start growing today.
          </p>
          <div className="pt-4">
            <Link href="/services/free-website">
              <Button size="lg" variant="secondary">
                Learn More & Claim Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
