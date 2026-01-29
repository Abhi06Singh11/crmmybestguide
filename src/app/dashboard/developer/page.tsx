
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "lucide-react";

export default function DeveloperDashboardPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Code className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Developer Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Welcome to the developer hub. Access development tools, repositories, and deployment pipelines.</p>
      </CardContent>
    </Card>
  );
}
