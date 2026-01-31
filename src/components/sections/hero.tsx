
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx0ZWFtJTIwd29ya2luZ3xlbnwwfHx8fDE3Njc3MjAwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Team working together"
          fill
          className="object-cover -z-10 brightness-50"
          priority
          data-ai-hint="team working"
        />
        <div className="container px-4 text-center md:px-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    We Build. You Grow. Simple.
                </h1>
                <p className="mx-auto max-w-[700px] text-lg text-gray-200 md:text-xl">
                    Boost Your Brand with Websites, SEO and Growth-Driven Strategies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/services">
                        <Button size="lg">Explore Our Services</Button>
                    </Link>
                    <Link href="/contact">
                        <Button size="lg" variant="secondary">Get In Touch</Button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  );
}
