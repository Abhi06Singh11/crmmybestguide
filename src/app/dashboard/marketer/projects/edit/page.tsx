
'use client';

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EditProjectPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Project Updated",
      description: "Your project details have been saved successfully.",
    });
    router.push('/d/marketer/projects');
  };

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
                <CardTitle className="text-3xl">Edit Project</CardTitle>
                <CardDescription>Update the details for the "New Website Launch" project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input id="projectName" defaultValue="New Website Launch" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="client">Client</Label>
                        <Input id="client" defaultValue="Innovate Inc." readOnly />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="developer">Assigned Developer</Label>
                        <Select defaultValue="bob-williams">
                            <SelectTrigger id="developer">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bob-williams">Bob Williams</SelectItem>
                                <SelectItem value="alice-johnson">Alice Johnson</SelectItem>
                                <SelectItem value="charlie-brown">Charlie Brown</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select defaultValue="active">
                            <SelectTrigger id="status">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending-approval">Pending Approval</SelectItem>
                                <SelectItem value="on-hold">On Hold</SelectItem>
                                <SelectItem value="risk">Risk</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input id="deadline" type="date" defaultValue="2024-08-15" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" rows={5} defaultValue="Build a fully responsive marketing website with a CMS for the blog. Focus on performance and SEO." />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
        </Card>
    </div>
  );
}
