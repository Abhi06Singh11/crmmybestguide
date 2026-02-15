'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FreeWebsiteRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/services');
  }, [router]);

  return null;
}
