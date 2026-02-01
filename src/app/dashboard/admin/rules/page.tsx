
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
import { adminSystemRules as initialRules } from '@/lib/admin-dashboard-data';
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

interface Rule {
    id: string;
    name: string;
    condition: string;
    action: string;
    status: boolean;
}

export default function AdminRulesPage() {
    const [rules, setRules] = useState<Rule[]>(initialRules);
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
            id: editingRule ? editingRule.id : `rule_${Date.now()}`,
            name: formData.get('name') as string,
            condition: formData.get('condition') as string,
            action: formData.get('action') as string,
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
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <CardTitle>System Rules</CardTitle>
                <CardDescription>Configuration and governance of platform behavior, including commissions, permissions, and feature toggles.</CardDescription>
            </div>
            <Button onClick={handleNewRuleClick} className="w-full md:w-auto">
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
                        {rules.map((rule) => (
                            <TableRow key={rule.id}>
                                <TableCell className="font-medium">{rule.name}</TableCell>
                                <TableCell className="font-mono text-xs">{rule.condition}</TableCell>
                                <TableCell className="font-mono text-xs">{rule.action}</TableCell>
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
                        <Label htmlFor="condition">Condition</Label>
                        <Input id="condition" name="condition" defaultValue={editingRule?.condition} placeholder="e.g., payment.amount < 500" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="action">Action</Label>
                        <Input id="action" name="action" defaultValue={editingRule?.action} placeholder="e.g., auto_approve()" required />
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
