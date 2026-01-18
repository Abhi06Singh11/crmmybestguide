'use client';

import ServiceDetails from '@/components/sections/service-details';
import { technicalSupportData } from '@/lib/data';

export default function TechnicalSupportPage() {
  return <ServiceDetails {...technicalSupportData} />;
}
