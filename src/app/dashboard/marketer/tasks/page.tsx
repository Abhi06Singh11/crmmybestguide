
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";

export default function TasksPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <CheckSquare className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Manage all your project tasks from here.</p>
      </CardContent>
    </Card>
  );
}
