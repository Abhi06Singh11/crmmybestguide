
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { networkProfileData } from '@/lib/network-dashboard-data';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email(),
  role: z.string().min(2, "Role must be at least 2 characters."),
  bio: z.string().max(300, "Bio cannot exceed 300 characters.").optional(),
  skills: z.string().optional(),
  tools: z.string().optional(),
  certifications: z.string().optional(),
});


export default function EditNetworkProfilePage() {
    const { toast } = useToast();
    const router = useRouter();
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: networkProfileData.name,
            email: networkProfileData.email,
            role: networkProfileData.role,
            bio: networkProfileData.bio,
            skills: networkProfileData.skills.join(', '),
            tools: networkProfileData.tools.join(', '),
            certifications: networkProfileData.certifications.join(', '),
        },
    });

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    function onSubmit(values: z.infer<typeof profileSchema>) {
        console.log("Profile updated:", values);
        toast({
            title: "Profile Updated",
            description: "Your profile information has been saved successfully.",
        });
        router.push('/d/network/profile/view');
    }

  return (
    <div className="w-full max-w-4xl mx-auto">
        <Button
            variant="outline"
            className="mb-6"
            onClick={() => router.back()}
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Manage your public profile information and technical expertise.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className='flex items-center gap-6'>
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                           {avatarPreview ? 
                                <Image src={avatarPreview} alt="Avatar preview" fill className="object-cover" />
                                : <AvatarFallback className="text-3xl">{networkProfileData.initials}</AvatarFallback>
                            }
                        </Avatar>
                    </div>
                     <div className="space-y-2 flex-1">
                        <Label htmlFor="picture">Profile Picture</Label>
                        <Input id="picture" type="file" accept="image/*" onChange={handleAvatarChange} />
                        <p className='text-sm text-muted-foreground'>Upload a new photo. We recommend a 200x200px image.</p>
                    </div>
                </div>
                 <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem><FormLabel>Role / Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="bio" render={({ field }) => (
                    <FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="skills" render={({ field }) => (
                    <FormItem><FormLabel>Skills</FormLabel><FormControl><Input placeholder='e.g. Linux, AWS, Docker' {...field} /></FormControl><FormDescription>Comma-separated list of your technical skills.</FormDescription><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="tools" render={({ field }) => (
                    <FormItem><FormLabel>Tools & Platforms</FormLabel><FormControl><Input placeholder='e.g. Jira, DataDog, Postman' {...field} /></FormControl><FormDescription>Comma-separated list of tools you use.</FormDescription><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="certifications" render={({ field }) => (
                    <FormItem><FormLabel>Certifications</FormLabel><FormControl><Input placeholder='e.g. AWS Certified, ITIL' {...field} /></FormControl><FormDescription>Comma-separated list of your certifications.</FormDescription><FormMessage /></FormItem>
                )}/>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
    </div>
  )
}
