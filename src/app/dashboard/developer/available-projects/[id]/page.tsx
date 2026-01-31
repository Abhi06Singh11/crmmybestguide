'use client';

import { useParams, useRouter } from 'next/navigation';
import { availableProjectsData } from '@/lib/developer-available-projects-data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign, Calendar, Cpu, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const project = availableProjectsData.find(p => p.id === id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl font-bold">Project Not Found</h1>
        <p className="text-muted-foreground">The project you are looking for does not exist.</p>
        <Button onClick={() => router.push('/d/developer/available-projects')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Available Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => router.push('/d/developer/available-projects')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Available Projects
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{project.name}</CardTitle>
          <CardDescription>Posted by: {project.client}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-semibold">{project.budget}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                    <p className="text-muted-foreground">Timeline</p>
                    <p className="font-semibold">{project.deadline}</p>
                </div>
            </div>
             <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:text-green-300">{project.status}</Badge>
                </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Project Description</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><Cpu /> Required Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-base px-3 py-1">{tech}</Badge>
                ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Link href={`/d/developer/projects/bid?projectId=${project.id}`} className="w-full">
                <Button size="lg" className="w-full">Place Bid</Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
