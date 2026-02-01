
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

const marketerSystemRules = [
    { id: 'rule_mkt_001', name: 'Daily Budget Limit', description: 'Pauses campaigns if daily spend exceeds $500.', status: true, value: '$500/day' },
    { id: 'rule_mkt_002', name: 'Pause Low-Performing Campaign', description: 'Automatically pauses campaigns if ROI drops below 1.5x.', status: true, value: 'ROI < 1.5' },
    { id: 'rule_mkt_003', name: 'Notify on High Spend', description: 'Sends an alert if a single campaign spends over $1,000 in one day.', status: true, value: '$1000' },
    { id: 'rule_mkt_004', name: 'Auto-approve Ad Creatives', description: 'Skips manual approval for new ad creatives from senior marketers.', status: false, value: 'N/A' },
];

export default function AdminMarketerRulesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Marketer System Rules</CardTitle>
            <CardDescription>System rules specifically governing marketer workflows and commission structures.</CardDescription>
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
                    {marketerSystemRules.map((rule) => (
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
