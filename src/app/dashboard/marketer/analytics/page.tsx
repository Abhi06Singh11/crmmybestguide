
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartBig } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <BarChartBig className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">View detailed analytics and reports on your performance.</p>
      </CardContent>
    </Card>
  );
}
