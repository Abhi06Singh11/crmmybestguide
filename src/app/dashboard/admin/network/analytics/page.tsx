
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminNetworkAnalyticsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Analytics</CardTitle>
        <CardDescription>Analytics related to network uptime, ticket resolution times, and SLA performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Network-specific analytics and reporting tools will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
