"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, Edit, Save, X, MoreVertical } from "lucide-react";
import { developerTasksData as initialTasks } from "@/lib/developer-dashboard-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Task {
  id: number;
  group: string;
  description: string;
  notes?: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}

/* ------------------------------------------------ */
/* 🔥 Normalize incoming priority safely */
/* ------------------------------------------------ */

const normalizePriority = (priority: string): Task["priority"] => {
  if (priority === "High" || priority === "Medium" || priority === "Low") {
    return priority;
  }
  return "Medium";
};

export default function DeveloperTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(
    initialTasks.map((t, i) => ({
      ...t,
      id: i + 1,
      priority: normalizePriority(t.priority),
    })),
  );

  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskGroup, setNewTaskGroup] = useState("");
  const [newTaskPriority, setNewTaskPriority] =
    useState<Task["priority"]>("Medium");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  /* ------------------------------------------------ */
  /* Add Task */
  /* ------------------------------------------------ */

  const handleAddTask = () => {
    if (!newTaskDescription.trim()) return;

    const newTask: Task = {
      id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      group: newTaskGroup.trim() || "Uncategorized",
      description: newTaskDescription,
      completed: false,
      priority: newTaskPriority,
      notes: "",
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskDescription("");
    setNewTaskGroup("");
    setNewTaskPriority("Medium");
  };

  /* ------------------------------------------------ */

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleStartEditing = (task: Task) => {
    setEditingTask({ ...task });
  };

  const handleCancelEditing = () => {
    setEditingTask(null);
  };

  const handleSaveEditing = () => {
    if (!editingTask) return;

    setTasks((prev) =>
      prev.map((task) => (task.id === editingTask.id ? editingTask : task)),
    );

    setEditingTask(null);
  };

  /* ------------------------------------------------ */
  /* Fully Type-Safe Editing Update */
  /* ------------------------------------------------ */

  const handleUpdateEditingTask = <K extends keyof Task>(
    field: K,
    value: Task[K],
  ) => {
    if (!editingTask) return;

    setEditingTask({
      ...editingTask,
      [field]: value,
    });
  };

  /* ------------------------------------------------ */

  const getPriorityBadgeClass = (priority: Task["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300";
      case "Low":
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300";
    }
  };

  const groupedTasks = tasks.reduce(
    (acc, task) => {
      const groupName = task.group || "Uncategorized";
      if (!acc[groupName]) acc[groupName] = [];
      acc[groupName].push(task);
      return acc;
    },
    {} as Record<string, Task[]>,
  );

  /* ------------------------------------------------ */
  /* UI */
  /* ------------------------------------------------ */

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Personal Tasks</CardTitle>
          <CardDescription>
            A simple to-do list to manage your personal tasks and notes.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Add Task Section */}
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
              placeholder="Group name"
            />

            <div className="flex gap-2">
              <Select
                value={newTaskPriority}
                onValueChange={(value: Task["priority"]) =>
                  setNewTaskPriority(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleAddTask}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tasks */}
          <Accordion
            type="multiple"
            defaultValue={Object.keys(groupedTasks)}
            className="w-full space-y-4"
          >
            {Object.entries(groupedTasks).map(([groupName, groupTasks]) => (
              <Card key={groupName}>
                <AccordionItem value={groupName} className="border-b-0">
                  <AccordionTrigger className="p-4 hover:no-underline">
                    <h3 className="text-lg font-semibold">
                      {groupName}
                      <Badge variant="secondary" className="ml-2">
                        {groupTasks.length}
                      </Badge>
                    </h3>
                  </AccordionTrigger>

                  <AccordionContent className="p-4 pt-0 space-y-4">
                    {groupTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-4 border rounded-lg bg-muted/50"
                      >
                        {editingTask?.id === task.id ? (
                          <div className="space-y-4">
                            <Input
                              value={editingTask.description}
                              onChange={(e) =>
                                handleUpdateEditingTask(
                                  "description",
                                  e.target.value,
                                )
                              }
                            />

                            <Textarea
                              value={editingTask.notes || ""}
                              onChange={(e) =>
                                handleUpdateEditingTask("notes", e.target.value)
                              }
                            />

                            <Select
                              value={editingTask.priority}
                              onValueChange={(value: Task["priority"]) =>
                                handleUpdateEditingTask("priority", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                              </SelectContent>
                            </Select>

                            <div className="flex gap-2">
                              <Button size="sm" onClick={handleSaveEditing}>
                                <Save className="mr-2 h-4 w-4" /> Save
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCancelEditing}
                              >
                                <X className="mr-2 h-4 w-4" /> Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-4">
                            <Checkbox
                              checked={task.completed}
                              onCheckedChange={() =>
                                handleToggleComplete(task.id)
                              }
                            />

                            <div className="flex-1">
                              <p
                                className={cn(
                                  "font-medium",
                                  task.completed &&
                                    "line-through text-muted-foreground",
                                )}
                              >
                                {task.description}
                              </p>

                              {task.notes && (
                                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                                  {task.notes}
                                </p>
                              )}
                            </div>

                            <Badge
                              variant="secondary"
                              className={cn(
                                getPriorityBadgeClass(task.priority),
                              )}
                            >
                              {task.priority}
                            </Badge>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleStartEditing(task)}
                                >
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="text-red-500"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Card>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
