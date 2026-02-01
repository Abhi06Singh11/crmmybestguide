
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminNetworkRulesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network System Rules</CardTitle>
        <CardDescription>System rules governing SLA policies, automated alerts, and on-call schedules.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Rules and governance settings for network professionals will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
