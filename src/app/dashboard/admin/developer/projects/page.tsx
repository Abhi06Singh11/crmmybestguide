import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminDeveloperProjectsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer Project Oversight</CardTitle>
        <CardDescription>A view of all projects developers are working on, including sprint progress and repo status.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Developer-specific project data and management tools will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
