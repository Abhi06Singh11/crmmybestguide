
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy } from "lucide-react";

export default function SupportDashboardPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <LifeBuoy className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Support Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Welcome to the support center. Manage tickets, view customer history, and access knowledge base articles.</p>
      </CardContent>
    </Card>
  );
}
