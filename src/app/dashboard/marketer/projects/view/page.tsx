
'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Briefcase, CheckCircle, Edit } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

// Dummy data for a single project
const project = {
    projectName: 'New Website Launch',
    client: 'Innovate Inc.',
    developer: 'Bob Williams',
    status: 'Active',
    progress: 75,
    deadline: '2024-08-15',
    description: 'Build a fully responsive marketing website with a CMS for the blog. Focus on performance and SEO. The project is currently in the development phase, with frontend components being finalized.',
    startDate: '2024-06-01',
    budget: '$25,000'
};

export default function ViewProjectPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-4xl mx-auto">
        <Button
            variant="outline"
            className="mb-6"
            onClick={() => router.back()}
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
        </Button>
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl">{project.projectName}</CardTitle>
                <CardDescription>Client: {project.client}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-muted-foreground">Status</p>
                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 dark:text-blue-300">{project.status}</Badge>
                        </div>
                    </div>
                     <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-muted-foreground">Assigned To</p>
                            <p className="font-semibold">{project.developer}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-muted-foreground">Deadline</p>
                            <p className="font-semibold">{project.deadline}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-muted-foreground">Budget</p>
                            <p className="font-semibold">{project.budget}</p>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="font-semibold mb-2">Project Progress: {project.progress}%</h3>
                    <Progress value={project.progress} />
                </div>
                
                <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                </div>

            </CardContent>
            <CardFooter className="justify-end">
                <Link href="/d/marketer/projects/edit">
                    <Button>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Project
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    </div>
  );
}
