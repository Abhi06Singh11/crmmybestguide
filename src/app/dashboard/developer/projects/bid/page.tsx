'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function ObsoleteBidPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/d/developer/available-projects');
    }, [router]);

    return (
        <Card className="flex flex-col items-center justify-center p-8 text-center h-96">
            <CardHeader>
                <CardTitle className="text-2xl">Page Moved</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <p>This page has been updated. Redirecting you now...</p>
                </div>
            </CardContent>
        </Card>
    );
}
