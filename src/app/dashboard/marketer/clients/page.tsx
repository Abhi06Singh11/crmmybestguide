
'use client';

import {
  Card
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
} from 'lucide-react';
import { clientsData } from '@/lib/dashboard-data';
import { cn } from '@/lib/utils';

export default function ClientsPage() {
    return (
        <Card>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Active Projects</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {clientsData.map(client => (
                <TableRow key={client.name}>
                    <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                        <AvatarFallback>{client.logo}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{client.name}</span>
                    </div>
                    </TableCell>
                    <TableCell className="text-center">{client.activeProjects}</TableCell>
                    <TableCell>
                    <Badge variant={
                        client.paymentStatus === 'On Time' ? 'secondary' :
                        client.paymentStatus === 'Paid' ? 'default' :
                        'destructive'
                    } className={cn(
                        client.paymentStatus === 'Paid' && 'bg-green-500/80 text-white',
                        client.paymentStatus === 'Overdue' && 'bg-yellow-500/80 text-white'
                    )}>
                        {client.paymentStatus}
                    </Badge>
                    </TableCell>
                    <TableCell>
                    <Badge variant={
                        client.priority === 'High' ? 'destructive' :
                        client.priority === 'Medium' ? 'secondary' :
                        'outline'
                    }>
                        {client.priority}
                    </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Client</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </Card>
    );
}
