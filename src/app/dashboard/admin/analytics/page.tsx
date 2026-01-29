
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartBig } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <BarChartBig className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Platform Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">View detailed analytics, reports, and trends for the entire platform.</p>
      </CardContent>
    </Card>
  );
}
