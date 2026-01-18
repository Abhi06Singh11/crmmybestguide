
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { services as servicesData } from '@/lib/data';

export default function BdeApplyPage() {
  const [formVisible, setFormVisible] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleJoinClick = () => {
    setFormVisible(true);
  };

  const benefits = [
      "Flexible project referrals, remote-first.",
      "Earn 20%–30% commission.",
      "Payouts processed within 5–7 days.",
      "Access to high-value clients in Web, App, AI, and ERP services.",
      "No upfront investment needed.",
      "Fully verified, transparent, and trustworthy partnership."
  ];

  const services = servicesData.map(s => s.title);

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
              Welcome to the MyBestGuide Partner Community
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Collaborate on exciting tech projects, earn fair payouts, and build your reputation — all on your own terms.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
              By joining our network, you agree to work professionally, follow transparent communication, and maintain confidentiality. Every project includes clear deliverables, payments, and mutual respect.
            </p>
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
                    Welcome Aboard!
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    You're one step away from joining a collaborative network of professionals. Let's get to know you better.
                </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center text-foreground mb-6">
                Why Join as a Business Development Executive or Associate Partner?
              </h2>
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto text-muted-foreground">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                    </li>
                ))}
              </ul>
            </div>

            <Card className="p-6 md:p-8">
              <CardContent>
                <form>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" type="text" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location (City, State)</Label>
                      <Input id="location" type="text" required />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="skills">Your Skills / Experience</Label>
                      <Textarea id="skills" required />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="serviceToPromote">Which service do you want to promote?</Label>
                      <Select>
                        <SelectTrigger id="serviceToPromote">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map(service => (
                            <SelectItem key={service} value={service}>{service}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="why">Why do you want to join us?</Label>
                      <Textarea id="why" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commission">Expected Commission (%)</Label>
                      <Input id="commission" type="number" min="10" max="30" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio">GitHub / Portfolio URL</Label>
                      <Input id="portfolio" type="url" required />
                    </div>
                  </div>
                  <div className="space-y-2 mt-6">
                    <Label htmlFor="resume">Upload Resume / Portfolio</Label>
                    <Input id="resume" type="file" />
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
            <DialogTitle className="text-center text-2xl mb-4">MyBestGuide Referral Partnership – Terms and Conditions</DialogTitle>
            <DialogClose className="absolute right-4 top-4" />
          </DialogHeader>
          <div className="prose dark:prose-invert max-w-none">
            <p><strong>Effective Date:</strong> From the date of form submission by the Partner</p>
            <h3>1. Introduction</h3>
            <p>Welcome to the MyBestGuide Referral Partnership Program. These Terms and Conditions govern the relationship between MyBestGuide (“the Company”) and you, the individual or entity acting as a Lead Generator or Referral Partner (“the Partner”).</p>
            <p>By participating in this program, you agree to the following terms which define our rights, responsibilities, and mutual expectations.</p>
            <h3>2. Services Covered</h3>
            <p>MyBestGuide provides the following professional services, now and in the future:</p>
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
            <p>As a Partner, you will refer potential clients interested in any of these services.</p>
            <h3>3. Commission Structure</h3>
            <ul>
              <li><strong>Standard Commission:</strong> 20% to 25% on the project signing amount for each successful referral.</li>
              <li><strong>High-Value Projects:</strong> For client projects over $1,000 USD, commissions may be negotiated up to 30%.</li>
              <li><strong>Repeat Orders:</strong> Additional 5% to 10% commission depending on the scope and profitability of follow-up projects.</li>
              <li><strong>Minimum Referral Value:</strong> Projects should ideally be $150 USD or more.</li>
            </ul>
            <h3>4. Payment Terms</h3>
            <ul>
              <li><strong>One-Time Payout:</strong> Full commission paid after the client completes total payment.</li>
              <li><strong>Milestone-Based Payout:</strong> Commission paid in parts as the client makes milestone payments.</li>
            </ul>
            <p><strong>Payment Schedule:</strong> All commissions are processed within 5–7 working days of receiving client payment.</p>
            <h3>5. Partner Verification</h3>
            <p>To ensure trust and prevent fraud, the Company may request the following from Partners:</p>
            <ul>
              <li>Government-issued ID (upon request)</li>
              <li>Links to professional platforms like Fiverr, Upwork, Freelancer, LinkedIn</li>
              <li>Social media profiles</li>
              <li>Active email address and phone number</li>
            </ul>
            <h3>6. Confidentiality</h3>
            <p>The Partner agrees to keep all business communications, strategies, pricing models, and client data confidential.</p>
            <p>Information may not be shared with third parties without written consent from MyBestGuide.</p>
            <h3>7. Conduct and Legal Compliance</h3>
            <ul>
              <li>Fraudulent or unethical behavior may result in termination and legal action under Indian law.</li>
              <li>MyBestGuide reserves the right to report such behavior to platforms like Fiverr, Upwork, or LinkedIn.</li>
              <li>Legal jurisdiction: Courts of Lucknow, India.</li>
            </ul>
            <h3>8. Termination</h3>
            <ul>
              <li>Either party may terminate the partnership with 30 days’ written notice.</li>
              <li>Commissions for closed deals prior to termination will be paid as per original terms.</li>
            </ul>
            <h3>9. Relationship Status</h3>
            <p>This partnership is between independent entities. No employer-employee relationship is created.</p>
            <p>MyBestGuide may adjust commission terms with prior written agreement from the Partner.</p>
            <h3>10. Acceptance</h3>
            <p>By joining the MyBestGuide Referral Partnership Program, you acknowledge and agree to these Terms and Conditions.</p>
            <br />
            <h3>Contact Information</h3>
            <p>If you have any questions, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:info@mybestguide.com">info@mybestguide.com</a></li>
              <li><strong>Location:</strong> Lucknow, Uttar Pradesh, India</li>
              <li><strong>Location:</strong> Bengaluru, Karnataka, India</li>
            </ul>
            <br />
            <p className="text-center font-bold">Thank you for partnering with MyBestGuide. We look forward to a successful collaboration!</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
