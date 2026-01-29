
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function InvoicesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <FileText className="h-8 w-8 text-primary" />
        <CardTitle className="text-3xl">Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Manage and track all your invoices from here.</p>
      </CardContent>
    </Card>
  );
}
