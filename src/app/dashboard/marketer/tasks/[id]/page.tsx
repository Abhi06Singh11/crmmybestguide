
'use client';

import { useParams, useRouter } from 'next/navigation';
import { marketerTasksData } from '@/lib/marketer-tasks-data';
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
import { ArrowLeft, Calendar, User, Edit, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function TaskDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const task = marketerTasksData.find(t => t.id === id);

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl font-bold">Task Not Found</h1>
        <p className="text-muted-foreground">The task you are looking for does not exist.</p>
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
        <Button
          variant="outline"
          onClick={() => router.push('/d/marketer/tasks')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Tasks
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{task.title}</CardTitle>
          <CardDescription>Task ID: {task.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <User className="h-5 w-5 text-primary" />
                    <div><p className="text-muted-foreground">Assigned To</p><p className="font-semibold">{task.assigned_to}</p></div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div><p className="text-muted-foreground">Due Date</p><p className="font-semibold">{format(parseISO(task.due_date), 'MMM d, yyyy')}</p></div>
                </div>
                 <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <div><p className="text-muted-foreground">Priority</p><Badge variant="secondary">{task.priority}</Badge></div>
                </div>
                 <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <div><p className="text-muted-foreground">Status</p><Badge>{task.status}</Badge></div>
                </div>
            </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{task.description}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Link href={`/d/marketer/tasks/${task.id}/edit`}>
                <Button><Edit className="mr-2 h-4 w-4" />Edit Task</Button>
            </Link>
             <Link href={`/d/marketer/tasks/${task.id}/delete`}>
                <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
