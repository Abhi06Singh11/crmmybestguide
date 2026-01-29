
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

export default function MarketerDashboardPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <BarChart className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Marketer Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Welcome to the marketing dashboard. Monitor campaigns, analytics, and lead generation.</p>
      </CardContent>
    </Card>
  );
}
