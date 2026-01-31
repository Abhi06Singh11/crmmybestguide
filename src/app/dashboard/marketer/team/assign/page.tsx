
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { developerProfileData } from '@/lib/developer-dashboard-data';
import { marketerProjectsData } from '@/lib/dashboard-data';

export default function AssignProjectToTeamPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    const developer = developerProfileData;
    const projects = marketerProjectsData.tableData.filter(p => p.status !== 'Completed');

    const handleAssignProject = () => {
        if (!selectedProject) {
            toast({
                variant: 'destructive',
                title: "No Project Selected",
                description: "Please select a project to assign.",
            });
            return;
        }

        const project = projects.find(p => p.id.toString() === selectedProject);
        
        toast({
            title: "Project Assigned!",
            description: `"${project?.projectName}" has been assigned to ${developer.name}.`,
        });

        router.push('/d/marketer/team');
    };

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
            <Card>
                <CardHeader>
                    <CardTitle>Assign Project</CardTitle>
                    <CardDescription>Assign a project to the selected developer.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Card className="mb-6 bg-secondary">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarFallback className="text-xl">{developer.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-xl">{developer.name}</CardTitle>
                                <CardDescription>{developer.role}</CardDescription>
                                <div className="flex items-center gap-1 text-sm text-yellow-500 pt-1">
                                    <Star className="h-4 w-4 fill-current" /> 4.8
                                    <span className="text-muted-foreground ml-2">(7 Yrs Exp)</span>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    <h3 className="text-lg font-semibold mb-4">Select an available project to assign:</h3>
                    
                    <RadioGroup onValueChange={setSelectedProject}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]"></TableHead>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell>
                                            <RadioGroupItem value={project.id.toString()} id={`project-${project.id}`} />
                                        </TableCell>
                                        <TableCell>
                                            <label htmlFor={`project-${project.id}`} className="font-medium cursor-pointer">{project.projectName}</label>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{project.client}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                project.status === 'Active' ? 'secondary' : 'destructive'
                                            }>
                                                {project.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </RadioGroup>

                </CardContent>
                <CardFooter>
                    <Button onClick={handleAssignProject}>
                        Assign Project
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
