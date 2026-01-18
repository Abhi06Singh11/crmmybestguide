
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function SupportApplyPage() {
  const [formVisible, setFormVisible] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const router = useRouter();

  const handleJoinClick = () => {
    setFormVisible(true);
  };

  const introBenefits = [
    "Provide expert maintenance and support for diverse applications.",
    "Work remotely on a flexible, project-based schedule.",
    "Get compensated fairly for your valuable expertise.",
    "Gain experience with a variety of technical stacks and tools.",
    "Directly impact client satisfaction and system reliability."
  ];

  const whyJoinBenefits = [
    "Access challenging projects that enhance your technical skills.",
    "Enjoy the freedom of flexible, remote work arrangements.",
    "Receive timely, transparent payments for your contributions.",
    "Collaborate with a professional team that values your expertise.",
    "Become a key part of our clients' success stories."
  ];

  const profileOptions = {
    'Technical Support': [
        'Technical Support Executive',
        'Technical Support Engineer',
        'IT Support Engineer',
        'Help Desk Engineer',
        'Desktop Support Engineer',
    ],
    'Networking': [
        'Network Engineer',
        'Network Administrator',
        'Network Technician',
    ],
    'System Administration': [
        'System Administrator',
    ],
    'Cloud Computing': [
        'Cloud Engineer',
        'Cloud Support Engineer',
        'Cloud Administrator',
        'Cloud Architect',
    ],
    'DevOps': [
        'DevOps Engineer',
    ],
    'Common Combined IT Roles': [
        'IT Engineer',
        'IT Infrastructure Engineer',
        'Site Reliability Engineer (SRE)',
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto pt-8 px-4 flex-grow">
        <div className="text-left">
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        {!formVisible && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 md:p-12 text-center rounded-lg mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    Welcome to the MyBestGuide Technical Support Community
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Join our network of technical experts dedicated to ensuring client success through reliable application maintenance and support. Your skills are crucial to keeping digital solutions running smoothly.
                </p>
                <ul className="mt-6 text-left max-w-2xl mx-auto space-y-2 text-muted-foreground">
                    {introBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-8 flex justify-center">
                    <Button id="joinBtn" onClick={handleJoinClick} size="lg">
                        Yes, I am ready to join the Community
                    </Button>
                </div>
            </div>
        )}

        {formVisible && (
            <>
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                    Become a Support Partner
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    You're one step away from joining a community of skilled support professionals. Tell us about your expertise.
                </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center text-foreground mb-6">
                Why Join as a Technical Support Partner?
              </h2>
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto text-muted-foreground">
                {whyJoinBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                    </li>
                ))}
              </ul>
            </div>

            <Card className="p-6 md:p-8 mb-8">
                <CardContent>
                    <form>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name*</Label>
                            <Input id="name" type="text" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address*</Label>
                            <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location / Timezone*</Label>
                            <Input id="location" type="text" required />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="profile">Select Your Profile*</Label>
                            <Select onValueChange={setSelectedProfile} required>
                                <SelectTrigger id="profile">
                                    <SelectValue placeholder="Select a profile" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(profileOptions).map(([group, profiles]) => (
                                        <SelectGroup key={group}>
                                            <SelectLabel>{group}</SelectLabel>
                                            {profiles.map(profile => (
                                                <SelectItem key={profile} value={profile}>{profile}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    ))}
                                    <SelectGroup>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {selectedProfile === 'Other' && (
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="otherProfile">Preferred Profile Name*</Label>
                                <Input id="otherProfile" type="text" placeholder="Please specify your profile" required />
                            </div>
                        )}
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="skills">Your Technical Support Skills & Expertise*</Label>
                            <Textarea id="skills" required placeholder="e.g., AWS, Docker, Jenkins, Zendesk, Jira, SQL, Proactive Monitoring, Incident Resolution" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn Profile</Label>
                            <Input id="linkedin" type="url" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="certifications">Certifications (e.g., AWS Certified, ITIL)</Label>
                            <Input id="certifications" type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="resume">Resume / CV Upload*</Label>
                            <Input id="resume" type="file" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="experience">Years of Experience*</Label>
                            <Input id="experience" type="number" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rate">Hourly Rate or Project Rate</Label>
                            <Input id="rate" type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="availability">Availability (e.g., hours/week, preferred timing)*</Label>
                            <Input id="availability" type="text" required />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="coverLetter">Why are you a good fit for this role?</Label>
                            <Textarea id="coverLetter" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="languages">Languages Spoken</Label>
                            <Input id="languages" type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nda">Willing to Sign NDA?*</Label>
                            <Select required>
                                <SelectTrigger id="nda">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                        <Checkbox id="acceptTerms" checked={areTermsAccepted} onCheckedChange={(checked) => setAreTermsAccepted(checked as boolean)} />
                        <label htmlFor="acceptTerms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I accept the{' '}
                        <span className="text-primary underline cursor-pointer" onClick={() => setIsModalOpen(true)}>
                            Terms & Conditions
                        </span>
                        </label>
                    </div>
                    <div className="text-center mt-8">
                        <Button type="submit" disabled={!areTermsAccepted}>
                        Submit Application
                        </Button>
                    </div>
                    </form>
                </CardContent>
            </Card>
            </>
        )}
      </div>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl mb-4">MyBestGuide – Terms and Conditions for Technical Support Partners</DialogTitle>
             <DialogClose className="absolute right-4 top-4" />
          </DialogHeader>
          <div className="prose dark:prose-invert max-w-none">
                <p><strong>Effective Date:</strong> Upon submission of the application form</p>

                <h3>1. Introduction</h3>
                <p>This document outlines the terms for partnership between MyBestGuide ("the Company") and you ("the Partner") for providing technical support and maintenance services to MyBestGuide's clients.</p>

                <h3>2. Engagement Types</h3>
                <p>Partners can be engaged on a project-by-project basis, on-retainer for ongoing support, or as short-term associates for specific needs.</p>

                <h3>3. Responsibilities</h3>
                <p>Partners are responsible for meeting Service Level Agreements (SLAs), providing timely incident resolution, performing routine maintenance, managing security updates, and communicating clearly with clients and the MyBestGuide team.</p>

                <h3>4. Payment Terms</h3>
                <p>Compensation will be based on the agreed scope of work, which may be a fixed project fee, an hourly rate, or a monthly retainer. Payments are processed after client verification of completed work.</p>

                <h3>5. Confidentiality</h3>
                <p>All client information, system data, application code, and proprietary information must be handled with the strictest confidentiality. Unauthorized access, use, or sharing is strictly prohibited.</p>
                
                <h3>6. Professional Conduct</h3>
                <p>Partners must maintain a high level of professionalism in all interactions, representing MyBestGuide in a positive and expert manner. Unethical behavior or failure to meet responsibilities may lead to termination of the partnership.</p>

                <h3>7. Required Information</h3>
                <p>To join, you must provide accurate details on your technical expertise, years of experience, relevant certifications, and availability. MyBestGuide reserves the right to verify this information.</p>

                <h3>8. Termination</h3>
                <p>Either party may terminate the partnership with 30 days’ written notice. Payments for all completed and approved work up to the termination date will be made in the final payment cycle.</p>
                
                <h3>9. Independent Contractor Relationship</h3>
                <p>This agreement establishes an independent contractor relationship. The Partner is not an employee of MyBestGuide and is responsible for their own taxes and business expenses.</p>

                <h3>10. Governing Law</h3>
                <p>This agreement is governed by the laws of India, with jurisdiction in Lucknow, Uttar Pradesh.</p>
                
                <hr />
                <p>By submitting your application, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
