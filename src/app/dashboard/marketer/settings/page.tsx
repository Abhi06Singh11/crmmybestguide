
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Settings className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Manage your account and notification settings.</p>
      </CardContent>
    </Card>
  );
}
