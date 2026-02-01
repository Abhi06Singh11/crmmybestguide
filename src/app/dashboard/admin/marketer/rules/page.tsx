
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminMarketerRulesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketer System Rules</CardTitle>
        <CardDescription>System rules specifically governing marketer workflows and commission structures.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Rules and governance settings for marketers will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
