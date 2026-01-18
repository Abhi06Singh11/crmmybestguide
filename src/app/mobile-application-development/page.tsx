'use client';

import ServiceDetails from '@/components/sections/service-details';
import { mobileAppDevelopmentData } from '@/lib/data';

export default function MobileAppDevelopmentPage() {
  return <ServiceDetails {...mobileAppDevelopmentData} />;
}
