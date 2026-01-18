import { Users } from "lucide-react";

export default function WhoWeAre() {
    return (
        <section id="who-we-are" className="py-16 md:py-24">
            <div className="container">
                <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 text-center md:grid-cols-3 md:text-left">
                    <div className="flex justify-center md:justify-start">
                        <div className="rounded-full bg-primary/10 p-6 text-primary">
                            <Users className="h-12 w-12" />
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="font-headline text-3xl font-bold md:text-4xl">Who We Are</h2>
                        <p className="text-lg text-muted-foreground">
                            MyBestGuide is a dedicated team of expert developers specializing in transforming innovative ideas into robust, scalable, and user-centric digital solutions.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            Combining strategic digital strategy with cutting-edge technology, we empower businesses to establish a powerful online presence and achieve their digital goals.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
