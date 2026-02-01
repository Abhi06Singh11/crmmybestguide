
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminNetworkUsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network User Management</CardTitle>
        <CardDescription>A view of all network professionals, their certifications, and SLA performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Network-specific user data and management tools will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
