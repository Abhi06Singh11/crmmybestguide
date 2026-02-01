
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminMarketerProjectsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketer Project Oversight</CardTitle>
        <CardDescription>A view of all campaigns marketers are managing, including performance and budget tracking.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Marketer-specific project data and management tools will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
