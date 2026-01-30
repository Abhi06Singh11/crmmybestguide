
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Star,
  Globe,
  Linkedin,
  Twitter,
  ArrowLeft
} from 'lucide-react';
import { marketerProfileData } from '@/lib/dashboard-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const profile = marketerProfileData;

export default function ViewPublicProfilePage() {
  const router = useRouter();

  return (
    <div className="w-full">
         <Button
            variant="outline"
            className="mb-6"
            onClick={() => router.back()}
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1 space-y-6">
            <Card className="text-center p-6">
              <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-primary">
                <AvatarFallback className="text-5xl">{profile.initials}</AvatarFallback>
              </Avatar>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-primary font-medium text-lg">{profile.role}</p>
              
              <div className="flex justify-center items-center gap-2 text-yellow-500 my-4">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-bold text-xl text-foreground">{profile.rating}</span>
                <span className="text-sm text-muted-foreground">(Internal Rating)</span>
              </div>
              
              <Badge variant={profile.availability === 'Available for new projects' ? 'secondary' : 'default'} className={profile.availability === 'Available for new projects' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : ''}>
                {profile.availability}
              </Badge>

               <div className="flex justify-center gap-4 mt-6">
                    <Link href="#" passHref>
                        <Button variant="outline" size="icon"><Linkedin className="h-5 w-5" /></Button>
                    </Link>
                     <Link href="#" passHref>
                        <Button variant="outline" size="icon"><Twitter className="h-5 w-5" /></Button>
                    </Link>
                     <Link href="#" passHref>
                        <Button variant="outline" size="icon"><Globe className="h-5 w-5" /></Button>
                    </Link>
               </div>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Experienced marketer specializing in SEO, content strategy, and lead generation for tech startups.</p>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {profile.skills.map(skill => <Badge key={skill} variant="secondary" className="text-base px-3 py-1">{skill}</Badge>)}
                </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Highlights</CardTitle>
                <CardDescription>A snapshot of past project successes and performance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.portfolio.map(item => (
                  <div key={item.project} className="flex items-center p-4 rounded-lg border">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarFallback>{item.clientLogo}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{item.project}</p>
                      <p className="text-sm text-muted-foreground">{item.client}</p>
                    </div>
                    <div className="text-right">
                       <p className="font-semibold text-green-600">{item.highlight}</p>
                       <p className="text-sm text-muted-foreground">Performance Highlight</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
};
