
'use client';

import { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface Rule {
    id: string;
    name: string;
    description: string;
    status: boolean;
    value: string;
}

const initialMarketerSystemRules: Rule[] = [
    { id: 'rule_mkt_001', name: 'Daily Budget Limit', description: 'Pauses campaigns if daily spend exceeds $500.', status: true, value: '$500/day' },
    { id: 'rule_mkt_002', name: 'Pause Low-Performing Campaign', description: 'Automatically pauses campaigns if ROI drops below 1.5x.', status: true, value: 'ROI < 1.5' },
    { id: 'rule_mkt_003', name: 'Notify on High Spend', description: 'Sends an alert if a single campaign spends over $1,000 in one day.', status: true, value: '$1000' },
    { id: 'rule_mkt_004', name: 'Auto-approve Ad Creatives', description: 'Skips manual approval for new ad creatives from senior marketers.', status: false, value: 'N/A' },
];

export default function AdminMarketerRulesPage() {
    const [rules, setRules] = useState<Rule[]>(initialMarketerSystemRules);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingRule, setEditingRule] = useState<Rule | null>(null);
    const { toast } = useToast();

    const handleToggleStatus = (ruleId: string) => {
        setRules(rules.map(rule =>
            rule.id === ruleId ? { ...rule, status: !rule.status } : rule
        ));
        toast({
            title: "Rule status updated.",
        });
    };

    const handleEditClick = (rule: Rule) => {
        setEditingRule(rule);
        setIsDialogOpen(true);
    };
    
    const handleNewRuleClick = () => {
        setEditingRule(null);
        setIsDialogOpen(true);
    };

    const handleSaveRule = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newRuleData = {
            id: editingRule ? editingRule.id : `rule_mkt_${Date.now()}`,
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            value: formData.get('value') as string,
            status: editingRule ? editingRule.status : true,
        };

        if (editingRule) {
            setRules(rules.map(rule => rule.id === newRuleData.id ? newRuleData : rule));
            toast({ title: 'Rule Updated', description: `"${newRuleData.name}" has been successfully updated.` });
        } else {
            setRules([...rules, newRuleData]);
            toast({ title: 'Rule Created', description: `New rule "${newRuleData.name}" has been added.` });
        }
        setIsDialogOpen(false);
        setEditingRule(null);
    };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Marketer System Rules</CardTitle>
                <CardDescription>System rules specifically governing marketer workflows and commission structures.</CardDescription>
            </div>
            <Button onClick={handleNewRuleClick}>
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
                        {rules.map((rule) => (
                            <TableRow key={rule.id}>
                                <TableCell>
                                    <div className="font-medium">{rule.name}</div>
                                    <div className="text-sm text-muted-foreground">{rule.description}</div>
                                </TableCell>
                                <TableCell className="font-mono text-xs">{rule.value}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={rule.status}
                                        onCheckedChange={() => handleToggleStatus(rule.id)}
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(rule)}>
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
        <DialogContent>
            <form onSubmit={handleSaveRule}>
                <DialogHeader>
                    <DialogTitle>{editingRule ? 'Edit Rule' : 'Create New Rule'}</DialogTitle>
                    <DialogDescription>
                        {editingRule ? 'Modify the details of this system rule.' : 'Define a new rule to automate platform behavior.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Rule Name</Label>
                        <Input id="name" name="name" defaultValue={editingRule?.name} required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" defaultValue={editingRule?.description} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="value">Condition / Value</Label>
                        <Input id="value" name="value" defaultValue={editingRule?.value} placeholder="e.g., ROI < 1.5" required />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save Rule</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  );
}
