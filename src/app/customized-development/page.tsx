'use client';

import ServiceDetails from '@/components/sections/service-details';
import { customizedDevelopmentData } from '@/lib/data';

export default function CustomizedDevelopmentPage() {
  return <ServiceDetails {...customizedDevelopmentData} />;
}
