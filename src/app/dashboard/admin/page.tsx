
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Super Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Welcome to the central control panel. Manage all system settings and user roles from here.</p>
      </CardContent>
    </Card>
  );
}
