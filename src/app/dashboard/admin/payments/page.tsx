
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function AdminPaymentsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <DollarSign className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Financial oversight to track client payments, freelancer payouts, and platform commissions.</p>
      </CardContent>
    </Card>
  );
}
