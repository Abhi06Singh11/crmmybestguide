'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { adminSystemRules } from '@/lib/admin-dashboard-data';
import { PlusCircle, Edit } from 'lucide-react';

export default function AdminRulesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>System Rules</CardTitle>
            <CardDescription>Configuration and governance of platform behavior, including commissions, permissions, and feature toggles.</CardDescription>
          </div>
           <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Rule
          </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rule Name</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {adminSystemRules.map((rule) => (
                        <TableRow key={rule.id}>
                            <TableCell className="font-medium">{rule.name}</TableCell>
                            <TableCell className="font-mono text-xs">{rule.condition}</TableCell>
                            <TableCell className="font-mono text-xs">{rule.action}</TableCell>
                            <TableCell>
                                <Switch checked={rule.status} />
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
