import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminDeveloperRulesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer System Rules</CardTitle>
        <CardDescription>System rules specifically governing developer workflows and permissions.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Rules and governance settings for developers will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
