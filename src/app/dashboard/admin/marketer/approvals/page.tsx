
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminMarketerApprovalsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketer Approvals</CardTitle>
        <CardDescription>A queue for marketer-specific approvals, like new campaign budgets or ad creatives.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Marketer-specific approval workflows will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
