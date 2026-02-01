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
import { PlusCircle, Edit } from 'lucide-react';

const developerSystemRules = [
    { id: 'rule_dev_001', name: 'Auto-Scale on Traffic Surge', description: 'Automatically scale up resources when CPU usage exceeds 70%.', status: true, value: 'CPU > 70%' },
    { id: 'rule_dev_002', name: 'Auto-Pause Low Traffic Staging', description: 'Automatically pause staging environments with less than 100 requests/day.', status: true, value: 'Traffic < 100/day' },
    { id: 'rule_dev_003', name: 'Alert on High Error Rate', description: 'Sends an alert if API error rate exceeds 5% in 5 minutes.', status: true, value: 'Errors > 5%' },
    { id: 'rule_dev_004', name: 'Require PR approval from Senior Dev', description: 'Blocks merging a PR without at least one senior developer approval.', status: false, value: 'N/A' },
];

export default function AdminDeveloperRulesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Developer System Rules</CardTitle>
            <CardDescription>System rules specifically governing developer workflows and permissions.</CardDescription>
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
                        <TableHead>Condition / Value</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {developerSystemRules.map((rule) => (
                        <TableRow key={rule.id}>
                            <TableCell>
                                <div className="font-medium">{rule.name}</div>
                                <div className="text-sm text-muted-foreground">{rule.description}</div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{rule.value}</TableCell>
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
