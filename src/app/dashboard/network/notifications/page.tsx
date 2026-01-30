
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function NetworkNotificationsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Bell className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Manage your notification preferences and view your alert history here.</p>
      </CardContent>
    </Card>
  );
}
