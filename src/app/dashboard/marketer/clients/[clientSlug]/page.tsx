
'use client';

import { useParams, useRouter } from 'next/navigation';
import { clientsData } from '@/lib/dashboard-data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, Phone, Calendar, Briefcase, FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export default function ClientDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { clientSlug } = params;

  const client = clientsData.find(c => c.slug === clientSlug);

  if (!client) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-2xl font-bold">Client Not Found</h1>
            <p className="text-muted-foreground">The client you are looking for does not exist.</p>
            <Button onClick={() => router.push('/d/marketer/clients')} className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Clients
            </Button>
        </div>
    );
  }

  return (
    <div className="space-y-6">
        <div>
             <Button
                variant="outline"
                className="mb-4"
                onClick={() => router.push('/d/marketer/clients')}
                >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Clients
            </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader className="items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarFallback className="text-3xl">{client.logo}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{client.name}</CardTitle>
                        <CardDescription>
                            <Badge variant={
                                client.priority === 'High' ? 'destructive' :
                                client.priority === 'Medium' ? 'secondary' :
                                'outline'
                            }>
                                {client.priority} Priority
                            </Badge>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                        <div className="space-y-4">
                            <div className='flex items-center gap-3'>
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className='text-muted-foreground'>{client.phone}</span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className='text-muted-foreground'>{client.email}</span>
                            </div>
                             <div className='flex items-center gap-3'>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className='text-muted-foreground'>Client since {format(parseISO(client.memberSince), 'MMM d, yyyy')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Internal Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{client.notes}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5" /> Associated Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project Name</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {client.associatedProjects.length > 0 ? client.associatedProjects.map(project => (
                                    <TableRow key={project.name}>
                                        <TableCell className="font-medium">{project.name}</TableCell>
                                        <TableCell>{project.value}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                            project.status === 'Completed' ? 'default' :
                                            project.status === 'Active' ? 'secondary' :
                                            'destructive'
                                            } className={cn(
                                            project.status === 'Completed' && 'bg-green-500/80 text-white',
                                            project.status === 'Risk' && 'bg-yellow-500/80 text-white',
                                            )}>
                                                {project.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground">No projects found for this client.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
