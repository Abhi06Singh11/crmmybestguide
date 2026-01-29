
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog } from "lucide-react";

export default function AdminRulesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Cog className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">System Rules & Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Configure platform-wide rules, limits, and permissions.</p>
      </CardContent>
    </Card>
  );
}
