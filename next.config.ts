
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/d/:path*',
        destination: '/dashboard/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/e-commerce-development',
        destination: '/services/e-commerce-development',
        permanent: true,
      },
      {
        source: '/mobile-application-development',
        destination: '/services/mobile-application-development',
        permanent: true,
      },
      {
        source: '/erp-saas-development',
        destination: '/services/erp-saas-development',
        permanent: true,
      },
      {
        source: '/customized-development',
        destination: '/services/customized-development',
        permanent: true,
      },
      {
        source: '/technical-support',
        destination: '/services/technical-support',
        permanent: true,
      },
      {
        source: '/odoo-development',
        destination: '/services/odoo-development',
        permanent: true,
      },
       {
        source: '/d/developer/projects/bid',
        destination: '/d/developer/available-projects',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

    
