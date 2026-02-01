
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminNetworkProjectsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Project Oversight</CardTitle>
        <CardDescription>A view of all infrastructure projects, including maintenance schedules and uptime reports.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Network-specific project data and management tools will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
