
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Settings className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Admin Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Manage global system settings and configurations.</p>
      </CardContent>
    </Card>
  );
}
