
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
import Link from 'next/link';

export default function ClientsPage() {
    return (
        <Card>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead className="hidden sm:table-cell">Active Projects</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead className="hidden md:table-cell">Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {clientsData.map(client => (
                <TableRow key={client.id}>
                    <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                        <AvatarFallback>{client.logo}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{client.name}</span>
                    </div>
                    </TableCell>
                    <TableCell className="text-center hidden sm:table-cell">{client.activeProjects}</TableCell>
                    <TableCell>
                    <Badge variant={
                        client.paymentStatus === 'On Time' ? 'secondary' :
                        client.paymentStatus === 'Paid' ? 'default' :
                        'destructive'
                    } className={cn(
                        'w-20 justify-center',
                        client.paymentStatus === 'Paid' && 'bg-green-500/80 text-white',
                        client.paymentStatus === 'Overdue' && 'bg-yellow-500/80 text-white'
                    )}>
                        {client.paymentStatus}
                    </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
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
                                <Link href={`/d/marketer/clients/${client.slug}`}>
                                    <DropdownMenuItem>
                                        View Client
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/d/marketer/clients/chat">
                                    <DropdownMenuItem>
                                        Send Message
                                    </DropdownMenuItem>
                                </Link>
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
