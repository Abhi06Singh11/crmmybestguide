
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminNetworkSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Settings</CardTitle>
        <CardDescription>Settings specific to the network and support dashboard view.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Settings for the network admin view will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
