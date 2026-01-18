'use client';

import ServiceDetails from '@/components/sections/service-details';
import { ecommerceDevelopmentData } from '@/lib/data';

export default function EcommerceDevelopmentPage() {
  return <ServiceDetails {...ecommerceDevelopmentData} />;
}
