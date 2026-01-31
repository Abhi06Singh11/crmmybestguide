
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const invoiceData = {
  invoiceNumber: 'INV-2024-0012',
  invoiceDate: new Date('2024-07-28'),
  dueDate: new Date('2024-08-27'),
  status: 'Paid',
  marketer: {
    name: 'Alex Ray',
    company: 'MyBestGuide',
    address: '123 Marketing Lane, Growth City, 11001',
    email: 'alex.ray@mybestguide.com'
  },
  client: {
    name: 'Quantum Solutions',
    address: '456 Innovation Drive, Tech Park, 22002',
    email: 'billing@quantum.dev'
  },
  items: [
    { id: 1, project: 'Q3 Marketing Campaign', description: 'Strategy and execution for Q3 lead generation.', amount: 2500 },
    { id: 2, project: 'App Backend API Support', description: 'Marketing support for the new API launch.', amount: 1200 },
  ],
  taxRate: 0.18, // 18%
};

export default function ViewInvoicePage() {
  const router = useRouter();

  const subtotal = invoiceData.items.reduce((acc, item) => acc + item.amount, 0);
  const taxAmount = subtotal * invoiceData.taxRate;
  const total = subtotal + taxAmount;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <Button
          variant="outline"
          onClick={() => router.push('/d/marketer/earnings')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Earnings
        </Button>
      </div>

      <Card className="p-4 sm:p-6">
        <CardHeader className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="font-bold text-2xl">MyBestGuide</h1>
            <p className="text-muted-foreground">{invoiceData.marketer.address}</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-primary">INVOICE</h2>
            <div className="flex items-center justify-end gap-2 mt-1">
              <p className="text-muted-foreground"># {invoiceData.invoiceNumber}</p>
               <Badge variant={invoiceData.status === 'Paid' ? 'default' : 'destructive'} className={cn(
                    invoiceData.status === 'Paid' && 'bg-green-500/80 text-white',
               )}>
                {invoiceData.status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Bill To</h3>
              <p className="font-bold">{invoiceData.client.name}</p>
              <p className="text-muted-foreground">{invoiceData.client.address}</p>
              <p className="text-muted-foreground">{invoiceData.client.email}</p>
            </div>
            <div className="text-right">
              <div className="mb-2">
                <span className="font-semibold">Invoice Date: </span>
                <span>{invoiceData.invoiceDate.toLocaleDateString()}</span>
              </div>
              <div>
                <span className="font-semibold">Due Date: </span>
                <span>{invoiceData.dueDate.toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project / Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceData.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <p className="font-medium">{item.project}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </TableCell>
                    <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Separator className="my-6" />

          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax ({invoiceData.taxRate * 100}%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </CardContent>
        <CardFooter className="justify-end gap-2 border-t pt-6 mt-6">
            <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Print
            </Button>
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
