
'use client';

import Services from "@/components/sections/services";
import FreeWebsiteAd from "@/components/sections/free-website-ad";

export default function ServicesPage() {
  return (
    <>
      <section id="our-expertise" className="bg-secondary py-16 md:py-24">
        <div className="container">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="font-headline text-4xl font-bold md:text-5xl text-foreground">Our Expertise in Modern Digital Solutions</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                At MyBestGuide, we specialize in designing, developing, and maintaining digital solutions that empower businesses to operate smarter and grow faster. Our expertise spans web and mobile development, ERP systems, SaaS platforms, and long-term technical support. We focus on clean architecture, user-friendly design, and scalable technology to ensure your digital products perform at their best today and in the future.
                </p>
            </div>
        </div>
      </section>
      <FreeWebsiteAd />
      <Services />
    </>
  );
}
