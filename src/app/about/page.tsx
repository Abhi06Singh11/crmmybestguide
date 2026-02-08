'use client';

import { BookOpen, Lightbulb, Users, Award, ShieldCheck, UserCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const teamMembers = [
  {
    name: 'Abhishek Singh',
    title: 'Customer Success Manager & Technical Lead',
    bio: 'Abhishek ensures our clients receive top-notch support while leading technical innovation across our projects.',
  },
  {
    name: 'Mohini Mishra',
    title: 'Project Manager',
    bio: 'Mohini drives project execution with precision, coordinating teams and delivering results on time, every time.',
  },
  {
    name: 'Mayank Kumar',
    title: 'Lead Developer',
    bio: 'Mayank builds the backbone of our platform, crafting robust and scalable solutions for our growing community.',
  }
];

const coreValues = [
    {
        icon: Lightbulb,
        title: "Innovation",
        description: "We embrace creativity and forward-thinking to deliver groundbreaking solutions."
    },
    {
        icon: Users,
        title: "Customer-First",
        description: "Our clients’ success drives every decision we make."
    },
    {
        icon: Award,
        title: "Quality",
        description: "We are committed to excellence in every project and service."
    },
    {
        icon: ShieldCheck,
        title: "Integrity",
        description: "We build trust through honesty, transparency, and accountability."
    }
]

export default function AboutUs() {
  return (
    <>
        <section className="bg-secondary py-16 md:py-24">
            <div className="container text-center">
                <h1 className="font-headline text-4xl font-bold md:text-5xl text-foreground">About MyBestGuide</h1>
                <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">Guiding You to the Best Solutions with Expertise and Care.</p>
                <div className="mt-8 max-w-3xl mx-auto text-left bg-background p-8 rounded-lg shadow">
                     <p className="text-lg text-card-foreground">
                        At MyBestGuide, we empower individuals and businesses to make informed decisions with confidence. Our mission is to simplify guidance through expert knowledge, innovative solutions, and a customer-first mindset. We envision a world where the right guidance is always at your fingertips.
                    </p>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container">
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <h2 className="font-headline text-3xl font-bold">Our Story</h2>
                        <div className="text-muted-foreground space-y-4 text-lg">
                            <p>Founded in 2020, MyBestGuide started as a small initiative to make quality guidance accessible for everyone.</p>
                            <p>Over the years, we’ve expanded our expertise, helping thousands of users navigate complex decisions with ease.</p>
                            <p>Our core goal is to solve the challenge of information overload by providing curated, reliable guidance for every need.</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="flex items-center justify-center group w-full max-w-sm aspect-square rounded-lg bg-muted shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-primary">
                          <div className="text-primary transition-colors duration-300 group-hover:text-primary-foreground">
                              <BookOpen className="h-24 w-24 transition-transform duration-300 group-hover:scale-110" />
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-secondary py-16 md:py-24">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold md:text-4xl">Meet Our Team</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {teamMembers.map((member) => {
                        return(
                        <Card key={member.name} className="group text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <CardContent className="p-6">
                                <div className="flex justify-center mb-4">
                                    <div className="rounded-full bg-primary/10 p-4 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                        <UserCircle className="h-20 w-20 transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                </div>
                                <h3 className="font-headline text-xl font-bold">
                                  {member.name}
                                </h3>
                                <p className="text-primary font-medium">{member.title}</p>
                                <p className="text-muted-foreground mt-2 text-sm">{member.bio}</p>
                            </CardContent>
                        </Card>
                    )})}
                </div>
            </div>
        </section>
        
        <section className="py-16 md:py-24">
             <div className="container">
                <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
                    <h2 className="font-headline text-3xl font-bold md:text-4xl">Our Core Values</h2>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {coreValues.map((item) => (
                        <Card key={item.title} className="group h-full p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="flex justify-center mb-4">
                                <div className="rounded-full bg-primary/10 p-4 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                    <item.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                                </div>
                            </div>
                            <h3 className="font-headline text-xl font-semibold">{item.title}</h3>
                            <p className="mt-2 text-muted-foreground">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    </>
  );
}
