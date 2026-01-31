
import Link from 'next/link';
import { Mail, MapPin, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Projects' },
    { href: '/about', label: 'About Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Instagram, label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <h3 className="font-headline text-xl font-bold text-white">MyBestGuide</h3>
            <p className="text-sm text-gray-400">
              MyBestGuide is a leading web and app development company in India, delivering custom software solutions, responsive websites, and mobile apps to drive business growth.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-blue-400 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-white">Get in Touch</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a href="mailto:contact@mybestguide.com" className="text-sm text-gray-400 hover:text-blue-400 hover:underline">
                  Email Us
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-gray-400">Bangalore</span>
              </li>
               <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-gray-400">Lucknow</span>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="font-headline font-semibold text-white">Follow Us</h4>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} className="text-gray-400 hover:text-blue-400">
                  <social.icon className="h-6 w-6" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; {currentYear} MyBestGuide. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-blue-400 hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-400 hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
