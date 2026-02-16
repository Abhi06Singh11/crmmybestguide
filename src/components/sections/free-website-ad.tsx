
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FreeWebsiteAd() {
  return (
    <section className="bg-background">
      <div className="container py-12">
        <div className="rounded-2xl bg-gradient-to-tr from-blue-900 via-blue-800 to-purple-800 p-8 text-white md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                Limited-Time Offer
              </div>
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                Get a 100% FREE Professional Website
              </h2>
              <p className="text-lg text-blue-200">
                No hidden costs. No credit card required. Just a real,
                professional website to help your business grow.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:flex-col md:items-end lg:flex-row">
              <Link href="/services/free-website" className="w-full md:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-white text-primary hover:bg-slate-200"
                >
                  Claim Your Free Website
                </Button>
              </Link>
              <Link href="/services/free-website#features" className="w-full md:w-auto">
                <Button size="lg" variant="outline" className="w-full border-white/50 bg-transparent text-white hover:bg-white/10">
                  See What&apos;s Included <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
