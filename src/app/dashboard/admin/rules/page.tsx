
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog } from "lucide-react";

export default function AdminRulesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Cog className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">System Rules</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Configuration and governance of platform behavior, including commissions, permissions, and feature toggles.</p>
      </CardContent>
    </Card>
  );
}
