
'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { marketerTasksData } from '@/lib/marketer-tasks-data';
import { useToast } from '@/hooks/use-toast';

export default function DeleteTaskPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;

  const task = marketerTasksData.find(t => t.id === id);

  const handleDelete = () => {
    toast({
      variant: 'destructive',
      title: "Task Deleted",
      description: `Task "${task?.title}" has been deleted.`,
    });
    router.push('/d/marketer/tasks');
  };

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl font-bold">Task Not Found</h1>
        <Button onClick={() => router.push('/d/marketer/tasks')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tasks
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader className="text-center items-center">
           <div className="p-3 bg-destructive/10 rounded-full">
            <Trash2 className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Delete Task</CardTitle>
          <CardDescription>
            Are you sure you want to permanently delete this task? This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center p-6 bg-muted/50 rounded-md border">
            <p className="font-semibold text-lg">{task.title}</p>
            <p className="text-sm text-muted-foreground">ID: {task.id}</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-6">
            <Button variant="outline" onClick={() => router.push('/d/marketer/tasks')}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete Task</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
