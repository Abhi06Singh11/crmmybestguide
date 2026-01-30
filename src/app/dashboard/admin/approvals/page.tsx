
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCheck } from "lucide-react";

export default function AdminApprovalsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <CheckCheck className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Approvals Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">A central hub to approve or reject new projects, user onboarding, payments, and profile updates.</p>
      </CardContent>
    </Card>
  );
}
