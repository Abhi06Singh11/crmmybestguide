import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye, Mail, Wrench } from 'lucide-react';

export default function Explore() {
  return (
    <section id="explore" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center space-y-6 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Explore Our Work & Services</h2>
          <p className="text-lg text-muted-foreground">
            Discover how our expert web and app development services can bring your digital vision to life. From stunning websites to powerful custom software, we deliver excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/services">
              <Button>
                <Wrench className="mr-2" /> Our Services
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline">
                <Eye className="mr-2" /> View Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">
                <Mail className="mr-2" /> Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
