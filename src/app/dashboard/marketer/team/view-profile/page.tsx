
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
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { developerProfileData } from '@/lib/developer-dashboard-data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ViewDeveloperProfilePage() {
    const router = useRouter();
    const { 
        name, 
        initials, 
        role, 
        status, 
        availability, 
        skills, 
        tools, 
        bio, 
        portfolio 
    } = developerProfileData;

    return (
        <div className="space-y-6">
            <div>
                <Button
                    variant="outline"
                    className="mb-4"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Team
                </Button>
            </div>
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
                            <Badge variant={availability === 'Busy' ? 'default' : 'secondary'} className={availability === 'Busy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'}>
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
                        <h4 className="font-semibold mb-2">Skills & Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                        </div>
                        <div className="mb-6">
                        <h4 className="font-semibold mb-2">Tools & Frameworks</h4>
                        <div className="flex flex-wrap gap-2">
                            {tools.map(tool => <Badge key={tool} variant="outline">{tool}</Badge>)}
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                    <CardHeader>
                        <CardTitle>Portfolio & Performance</CardTitle>
                        <CardDescription>A showcase of completed projects and marketer ratings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                        {portfolio.map(item => (
                            <div key={item.project} className="flex flex-col sm:flex-row items-start p-4 rounded-lg border gap-4">
                            <div className="w-full sm:w-1/3 aspect-video relative rounded-md overflow-hidden">
                                <Image src={item.imageUrl} alt={item.project} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-muted-foreground">{item.client}</p>
                                <p className="font-semibold text-lg">{item.project}</p>
                                <p className="text-sm text-muted-foreground my-2">{item.description}</p>
                                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                    <Star className="h-4 w-4 fill-current" /> <span className="font-bold text-foreground">{item.rating}</span>
                                    <span className="text-muted-foreground ml-1">(Marketer Rating)</span>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
