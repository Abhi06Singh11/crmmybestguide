
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function AdminProjectsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Briefcase className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Project Oversight</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Centralized control to view, manage, and assign all projects on the platform.</p>
      </CardContent>
    </Card>
  );
}
