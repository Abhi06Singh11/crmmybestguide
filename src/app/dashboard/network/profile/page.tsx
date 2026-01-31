
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
  CheckCircle,
  Briefcase,
  Cpu,
  ShieldCheck,
  Zap,
  Edit,
} from 'lucide-react';
import { networkProfileData } from '@/lib/network-dashboard-data';
import Image from 'next/image';
import Link from 'next/link';

export default function NetworkProfilePage() {
  const { 
    name, 
    initials, 
    role, 
    status, 
    availability, 
    skills, 
    tools, 
    experience, 
    bio,
    certifications,
    performance,
  } = networkProfileData;

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
             <div className="flex items-center gap-4 pt-2">
                <Badge variant={availability === 'Available' ? 'secondary' : 'default'} className={availability === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}>
                    {availability}
                </Badge>
                <Badge variant={status === 'Approved' ? 'secondary' : 'destructive'} className={status === 'Approved' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : ''}>
                    <CheckCircle className="mr-1 h-3 w-3" />
                    {status}
                </Badge>
            </div>
          </CardHeader>
          <CardContent>
             <div className="text-sm text-muted-foreground text-center mb-6">{bio}</div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Skills & Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
              </div>
            </div>
             <div className="mb-4">
              <h4 className="font-semibold mb-2">Tools & Platforms</h4>
              <div className="flex flex-wrap gap-2">
                {tools.map(tool => <Badge key={tool} variant="outline">{tool}</Badge>)}
              </div>
            </div>
             <div className="mb-6">
              <h4 className="font-semibold mb-2">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {certifications.map(cert => <Badge key={cert} variant="outline" className='border-green-500/50'>{cert}</Badge>)}
              </div>
            </div>
            <div className="flex gap-2">
                <Link href="/d/network/profile/view" passHref className="w-full">
                  <Button className="w-full"><Eye className="mr-2 h-4 w-4" />View Profile</Button>
                </Link>
                <Link href="/d/network/profile/edit" passHref className="w-full">
                  <Button variant="outline" className="w-full"><Edit className="mr-2 h-4 w-4" />Edit Profile</Button>
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance & Reliability</CardTitle>
            <CardDescription>Key metrics based on your support history.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {performance.map(item => (
                    <Card key={item.metric} className="text-center">
                        <CardHeader className="pb-2">
                            <CardDescription>{item.metric}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{item.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recent High-Impact Resolutions</h4>
               <div className="space-y-4">
                <div className="flex items-start p-4 rounded-lg border gap-4">
                  <div className="bg-red-500/10 text-red-500 p-2 rounded-full"><Zap className="h-5 w-5" /></div>
                  <div>
                    <p className="font-semibold">Critical Server Outage</p>
                    <p className="text-sm text-muted-foreground">Restored service for 'Innovate Inc.' in under 30 minutes, preventing data loss.</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border gap-4">
                  <div className="bg-green-500/10 text-green-500 p-2 rounded-full"><ShieldCheck className="h-5 w-5" /></div>
                  <div>
                    <p className="font-semibold">Security Patch Implementation</p>
                    <p className="text-sm text-muted-foreground">Proactively patched a zero-day vulnerability across 5 client projects.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
