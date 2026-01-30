
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
  Eye,
  Star,
} from 'lucide-react';
import { marketerProfileData } from '@/lib/dashboard-data';
import Link from 'next/link';


export default function ProfilePage() {
  const { name, initials, role, skills, availability, rating, portfolio } = marketerProfileData;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
            </Avatar>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center gap-2 text-yellow-500 mb-4">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-bold text-lg text-foreground">{rating}</span>
              <span className="text-sm text-muted-foreground">(Internal Rating)</span>
            </div>
            <div className="text-center mb-4">
              <Badge variant={availability === 'Available for new projects' ? 'secondary' : 'default'} className={availability === 'Available for new projects' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : ''}>
                {availability}
              </Badge>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-center">Skills</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
              </div>
            </div>
            <div className="flex gap-2 mt-6">
                <Link href="/p/alex-ray" passHref className='w-full'>
                    <Button className="w-full"><Eye className="mr-2 h-4 w-4" />View Public Profile</Button>
                </Link>
                <Link href="/d/marketer/settings" passHref className='w-full'>
                    <Button variant="outline" className="w-full">Edit Profile</Button>
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Highlights</CardTitle>
            <CardDescription>A snapshot of past project successes and performance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {portfolio.map(item => (
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
  );
};
