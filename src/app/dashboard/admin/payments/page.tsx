
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function AdminPaymentsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <DollarSign className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Earnings & Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Oversee platform revenue, commissions, and all user payouts.</p>
      </CardContent>
    </Card>
  );
}
