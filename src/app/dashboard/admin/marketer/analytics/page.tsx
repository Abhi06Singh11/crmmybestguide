
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminMarketerAnalyticsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketer Analytics</CardTitle>
        <CardDescription>Analytics related to marketing campaigns, ad spend, and conversion rates.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Marketer-specific analytics and reporting tools will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
