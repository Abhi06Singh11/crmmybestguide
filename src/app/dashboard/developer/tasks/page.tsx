
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus, Edit, Save, X, MoreVertical } from 'lucide-react';
import { developerTasksData as initialTasks } from '@/lib/developer-dashboard-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Task {
  id: number;
  group: string;
  description: string;
  notes?: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export default function DeveloperTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks.map((t, i) => ({...t, id: i+1})));
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskGroup, setNewTaskGroup] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    if (newTaskDescription.trim()) {
      const newTask: Task = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        group: newTaskGroup.trim() || 'Uncategorized',
        description: newTaskDescription,
        completed: false,
        priority: newTaskPriority,
        notes: '',
      };
      setTasks([...tasks, newTask]);
      setNewTaskDescription('');
      setNewTaskGroup('');
      setNewTaskPriority('Medium');
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const handleStartEditing = (task: Task) => {
    setEditingTask({ ...task });
  };

  const handleCancelEditing = () => {
    setEditingTask(null);
  };
  
  const handleSaveEditing = () => {
    if (editingTask) {
        setTasks(tasks.map(task => 
            task.id === editingTask.id ? editingTask : task
        ));
        setEditingTask(null);
    }
  };

  const handleUpdateEditingTask = (field: keyof Task, value: string) => {
    if (editingTask) {
      setEditingTask({ ...editingTask, [field]: value });
    }
  };


  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
    }
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    const groupName = task.group || 'Uncategorized';
    if (!acc[groupName]) {
        acc[groupName] = [];
    }
    acc[groupName].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Personal Tasks</CardTitle>
          <CardDescription>A simple to-do list to manage your personal tasks and notes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 border rounded-lg">
            <Input
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Add a new task..."
              className="md:col-span-2"
            />
            <Input
              value={newTaskGroup}
              onChange={(e) => setNewTaskGroup(e.target.value)}
              placeholder="Group name (e.g., Project X)"
            />
             <div className="flex gap-2">
                <Select value={newTaskPriority} onValueChange={(value) => setNewTaskPriority(value as any)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={handleAddTask}><Plus className="h-4 w-4" /></Button>
             </div>
          </div>
          
           <Accordion type="multiple" defaultValue={Object.keys(groupedTasks)} className="w-full space-y-4">
                {Object.entries(groupedTasks).map(([groupName, groupTasks]) => (
                    <Card key={groupName}>
                        <AccordionItem value={groupName} className="border-b-0">
                            <AccordionTrigger className="p-4 hover:no-underline">
                                <h3 className="text-lg font-semibold">{groupName} <Badge variant="secondary" className="ml-2">{groupTasks.length}</Badge></h3>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 pt-0">
                                <div className="space-y-4">
                                {groupTasks.map(task => (
                                    <div key={task.id} className="p-4 border rounded-lg flex flex-col gap-4 bg-muted/50">
                                    {editingTask?.id === task.id ? (
                                        // Editing view
                                        <div className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <Input 
                                                    value={editingTask.description} 
                                                    onChange={(e) => handleUpdateEditingTask('description', e.target.value)}
                                                    className="text-base font-medium"
                                                />
                                                <Input 
                                                    value={editingTask.group} 
                                                    onChange={(e) => handleUpdateEditingTask('group', e.target.value)}
                                                    placeholder="Group name"
                                                />
                                            </div>
                                            <Textarea 
                                                value={editingTask.notes || ''}
                                                onChange={(e) => handleUpdateEditingTask('notes', e.target.value)}
                                                placeholder="Add notes..."
                                                rows={3}
                                            />
                                            <div className="flex justify-between items-center">
                                                <div className="w-48">
                                                    <Select
                                                        value={editingTask.priority}
                                                        onValueChange={(value) => handleUpdateEditingTask('priority', value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Set priority" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="High">High</SelectItem>
                                                            <SelectItem value="Medium">Medium</SelectItem>
                                                            <SelectItem value="Low">Low</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="flex gap-2">
                                                <Button size="sm" onClick={handleSaveEditing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                                <Button size="sm" variant="ghost" onClick={handleCancelEditing}><X className="mr-2 h-4 w-4" /> Cancel</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // Default view
                                        <div>
                                            <div className="flex items-start gap-4">
                                                <Checkbox
                                                    id={`task-${task.id}`}
                                                    checked={task.completed}
                                                    onCheckedChange={() => handleToggleComplete(task.id)}
                                                    className="mt-1"
                                                />
                                                <div className="flex-1">
                                                    <label
                                                        htmlFor={`task-${task.id}`}
                                                        className={cn("font-medium cursor-pointer", task.completed && "line-through text-muted-foreground")}
                                                    >
                                                        {task.description}
                                                    </label>
                                                    {task.notes && (
                                                        <p className={cn("text-sm text-muted-foreground mt-1 whitespace-pre-wrap", task.completed && "line-through")}>
                                                        {task.notes}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="secondary" className={cn(getPriorityBadgeClass(task.priority))}>
                                                        {task.priority}
                                                    </Badge>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => handleStartEditing(task)}>
                                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="text-red-500">
                                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>
                ))}
            </Accordion>
          
            {tasks.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                <p>No tasks yet. Add one above to get started!</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
