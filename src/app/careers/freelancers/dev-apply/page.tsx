
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

export default function DevApplyPage() {
  const [formVisible, setFormVisible] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const router = useRouter();

  const handleJoinClick = () => {
    setFormVisible(true);
  };

  const introBenefits = [
      "Showcase your work on LinkedIn, GitHub, Behance, and more.",
      "Get paid per project or milestone (based on agreement).",
      "Volunteer projects also offer portfolio rights.",
      "Join without restriction—remote, flexible hours guaranteed.",
      "You are responsible for delivering what you commit to."
  ];

  const whyJoinBenefits = [
    "Access real client projects and build a strong portfolio.",
    "Enjoy flexible work arrangements that fit your lifestyle.",
    "Get paid on time with transparent, milestone-based payments.",
    "Showcase your work on professional platforms with full credit.",
    "Collaborate with a team that values your expertise and contributions."
  ];

  const profileOptions = {
    'Frontend Development': [
        'Frontend Developer',
        'Junior Frontend Developer',
        'Senior Frontend Developer',
        'UI Developer',
        'Web Frontend Engineer',
        'JavaScript Developer',
        'React Developer',
        'Angular Developer',
        'Vue.js Developer',
        'Frontend Software Engineer',
        'UI Engineer',
        'Frontend Architect',
        'Web Developer (Frontend-focused)',
    ],
    'Backend Development': [
        'Backend Developer',
        'Junior Backend Developer',
        'Senior Backend Developer',
        'Backend Software Engineer',
        'Server-Side Developer',
        'API Developer',
        'Java Developer',
        'Python Backend Developer',
        'Node.js Developer',
        'PHP Developer',
        '.NET Backend Developer',
        'Backend Engineer',
        'Backend Architect',
        'Software Engineer (Backend-focused)',
    ],
    'Combined / Related': [
        'Full Stack Developer',
        'Software Developer',
        'Software Engineer',
        'Web Application Developer',
    ],
    'Digital Marketing': [
        'Digital Marketer',
        'Digital Marketing Executive',
        'Digital Marketing Manager',
    ],
    'Content & Social Media': [
        'Content Marketer',
        'Copywriter',
        'Content writer',
        'Social Media Manager',
    ],
    'SEO & Ads': [
        'SEO Specialist',
        'PPC Specialist',
    ],
    'Branding & Growth': [
        'Brand Manager',
        'Growth Marketer',
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
                    Welcome to the MyBestGuide Freelancer Community
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    By joining, you'll access real client projects, flexible working models, and global visibility. Whether you're a seasoned expert or an emerging freelancer, your contributions are valued here.
                </p>
                <ul className="mt-6 text-left max-w-xl mx-auto space-y-2 text-muted-foreground">
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
                    Let's Build Together!
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    You're about to join a community of talented creators. Fill out the form below to get started on your journey with us.
                </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center text-foreground mb-6">
                Why Join as a Freelance Professional?
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
                            <Label htmlFor="location">Location / Timezone</Label>
                            <Input id="location" type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profile">Select Your Profile*</Label>
                            <Select onValueChange={setSelectedProfile}>
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
                            <div className="space-y-2">
                                <Label htmlFor="otherProfile">Preferred Profile Name*</Label>
                                <Input id="otherProfile" type="text" placeholder="Please specify your profile" required />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="skills">Skills*</Label>
                            <Input id="skills" type="text" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="github">GitHub Profile* (Required)</Label>
                            <Input id="github" type="url" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="portfolio">Other Portfolio Links (LinkedIn, Behance, etc.)</Label>
                            <Input id="portfolio" type="url" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="resume">Resume / CV Upload*</Label>
                            <Input id="resume" type="file" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="experience">Years of Experience</Label>
                            <Input id="experience" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rate">Hourly Rate or Project Rate</Label>
                            <Input id="rate" type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="availability">Availability (hours/week or preferred timing)</Label>
                            <Input id="availability" type="text" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="coverLetter">Cover Letter / Proposal Message</Label>
                            <Textarea id="coverLetter" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="communication">Preferred Communication Method</Label>
                            <Input id="communication" type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="certifications">Certifications / Degrees</Label>
                            <Input id="certifications" type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="languages">Languages Spoken</Label>
                            <Input id="languages" type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nda">Willing to Sign NDA?</Label>
                            <Select>
                                <SelectTrigger id="nda">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="eligibility">Work Eligibility (if job is location-restricted)</Label>
                            <Input id="eligibility" type="text" />
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
            <DialogTitle className="text-center text-2xl mb-4">MyBestGuide – Terms and Conditions for Freelancers, Volunteers, and Short-Term Collaborators</DialogTitle>
             <DialogClose className="absolute right-4 top-4" />
          </DialogHeader>
          <div className="prose dark:prose-invert max-w-none">
                <p><strong>Effective Date:</strong> Upon submission of the registration form</p>

                <h3>1. Introduction</h3>
                <p>Welcome to MyBestGuide. These Terms and Conditions outline the agreement between MyBestGuide ("the Company") and individuals collaborating with us as Freelancers, Volunteers, or Short-Term Associates ("the Professional"). By engaging in any form of work or collaboration with MyBestGuide, you agree to comply with these terms.</p>

                <h3>2. Definitions</h3>
                <ul>
                    <li><strong>Freelancer:</strong> A professional who works on specific projects or modules for agreed compensation.</li>
                    <li><strong>Volunteer:</strong> A contributor who offers services without financial compensation for the purpose of experience and exposure.</li>
                    <li><strong>Short-Term Associate:</strong> A temporary team member hired for internal project requirements.</li>
                </ul>

                <h3>3. Scope of Services</h3>
                <p>MyBestGuide may engage professionals for various software development-related tasks, including but not limited to:</p>
                <ul>
                    <li>E-commerce Website Development</li>
                    <li>Mobile Application Development</li>
                    <li>ERP SaaS Development</li>
                    <li>Odoo Development & Customization</li>
                    <li>Technical Support & Maintenance</li>
                    <li>Customized Development Solutions</li>
                    <li>AI Bot Development</li>
                    <li>SEO Optimization</li>
                </ul>

                <h3>4. Engagement Terms</h3>
                <ul>
                    <li>All work is voluntary and mutually agreed upon on a project-by-project basis.</li>
                    <li>Upon accepting a task or project, the Professional is fully responsible for timely and quality delivery.</li>
                    <li>Engagement does not constitute a permanent employment relationship unless specifically stated.</li>
                </ul>

                <h3>5. Payment & Compensation</h3>
                <ul>
                    <li><strong>Freelancers and Short-Term Associates:</strong> Payment terms will be discussed individually and may follow one of the following structures:
                    <ul>
                        <li>One-time payment upon project completion</li>
                        <li>Milestone-based payments tied to client deliverables</li>
                    </ul>
                    </li>
                    <li><strong>Volunteers:</strong> No financial compensation is provided. However, volunteers retain rights to showcase their work for personal and professional use.</li>
                </ul>

                <h3>6. Portfolio Rights</h3>
                <ul>
                    <li>Professionals are allowed to display completed work in their personal portfolios, provided they clearly state their role.</li>
                    <li>Volunteers may use project contributions for resumes, LinkedIn, GitHub, Behance, and similar platforms.</li>
                </ul>

                <h3>7. Professional Conduct & Brand Integrity</h3>
                <p>All Professionals agree to:</p>
                <ul>
                    <li>Avoid sharing or posting anything that could damage MyBestGuide’s reputation across any public or private channels.</li>
                    <li>Refrain from harmful or misleading statements regarding MyBestGuide.</li>
                </ul>
                <p><strong>Violations may result in:</strong></p>
                <ul>
                    <li>Reports on freelancing platforms (e.g., Upwork, Fiverr)</li>
                    <li>Legal actions under Indian law</li>
                    <li>Other suitable remedies</li>
                </ul>
                <p><strong>Legal jurisdiction:</strong> Lucknow, Uttar Pradesh, India.</p>

                <h3>8. Confidentiality</h3>
                <p>Professionals must maintain strict confidentiality regarding client data, code, strategies, and communication. Sharing or reuse without written permission from MyBestGuide is strictly prohibited.</p>

                <h3>9. Required Information Before Engagement</h3>
                <ul>
                    <li>Full Name</li>
                    <li>Email and Contact Number</li>
                    <li>Portfolio or Freelance Profile Links (e.g., GitHub, LinkedIn)</li>
                    <li>Core Skillset and Availability Status</li>
                </ul>

                <h3>10. Termination</h3>
                <ul>
                    <li>Either party may terminate the engagement with 15 days' written notice.</li>
                    <li>Payment for completed deliverables will be honored according to the agreed terms.</li>
                </ul>

                <h3>11. Independent Relationship</h3>
                <p>This agreement establishes an independent contractor relationship. It does not create an employer-employee relationship. Professionals are responsible for their own taxes and work independently to deliver projects as they arrive.</p>

                <h3>12. Governing Law</h3>
                <p>This agreement is governed by the laws of India, with jurisdiction in Lucknow, Uttar Pradesh.</p>

                <h3>13. Acceptance</h3>
                <p>By collaborating with MyBestGuide in any capacity, you confirm that you have read, understood, and accepted these Terms and Conditions.</p>

                <hr />
                <p><strong>Need Help or Have Questions?</strong><br />
                Please contact us at <a href="mailto:support@mybestguide.com">support@mybestguide.com</a>.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
