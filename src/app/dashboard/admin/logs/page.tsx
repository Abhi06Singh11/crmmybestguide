
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileClock } from "lucide-react";

export default function AdminLogsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <FileClock className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Audit Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">A secure log of all critical system actions for security, transparency, and compliance tracking.</p>
      </CardContent>
    </Card>
  );
}
