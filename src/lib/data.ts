
import { CodeXml, ShoppingCart, Layers3, Smartphone, Database, Wrench, Shapes, ShieldCheck, Users, Award, MessageCircle, BarChart, Store, Workflow, CreditCard, ShoppingBag, LineChart, Shield, GitBranch, Component, Languages, Milestone, Server, Users2, FileText, Activity, AlertCircle, TrendingUp, Zap, Apple, Devices, LayoutTemplate } from 'lucide-react';

export const services = [
  {
    title: 'E-Commerce Website Development',
    link: '/e-commerce-development'
  },
  {
    title: 'Mobile Application Development',
    link: '/mobile-application-development'
  },
  {
    title: 'ERP SaaS Development',
    link: '/erp-saas-development'
  },
  {
    title: 'Odoo Development & Customization',
    link: '/odoo-development'
  },
  {
    title: 'Technical Support & Maintenance',
    link: '/technical-support'
  },
  {
    title: 'Customized Development Solutions',
    link: '/customized-development'
  }
];

export const serviceDetails = [
    {
        icon: ShoppingCart,
        title: 'E-commerce Website Development',
        link: '/e-commerce-development',
        description: 'At MyBestGuide, we design and develop fully customized e-commerce platforms that reflect your brand identity and business goals. Our solutions focus on performance, usability, and secure transactions to help you convert visitors into loyal customers.',
        features: [
            'Secure payment gateway integration',
            'Mobile-friendly and responsive layouts',
            'User-centric product browsing and checkout flows',
            'Scalable architecture for growing businesses'
        ]
    },
    {
        icon: Smartphone,
        title: 'Mobile Application Development',
        link: '/mobile-application-development',
        description: 'We build native and cross-platform mobile applications that deliver seamless performance and engaging user experiences. Our apps are designed to scale as your business grows.',
        features: [
            'iOS and Android development expertise',
            'Intuitive UI with smooth navigation',
            'Scalable and future-ready architecture',
            'Backend and API integration'
        ]
    },
    {
        icon: Layers3,
        title: 'ERP SaaS Development',
        link: '/erp-saas-development',
        description: 'Our ERP SaaS solutions centralize your business operations, improve efficiency, and provide real-time insights to support smarter decision-making.',
        features: [
            'Real-time analytics and reporting',
            'Inventory and resource management',
            'Automated business processes',
            'Cloud-based and secure solutions'
        ]
    },
    {
        icon: Database,
        title: 'Odoo Development & Customization',
        link: '/odoo-development',
        description: 'MyBestGuide specializes in adapting Odoo ERP to match your exact business requirements, ensuring seamless operations and system flexibility.',
        features: [
            'Custom Odoo modules',
            'Third-party system integrations',
            'Deep expertise in the Odoo framework',
            'Odoo upgrades and optimization'
        ]
    },
    {
        icon: ShieldCheck,
        title: 'Technical Support, Website and App Maintenance',
        link: '/technical-support',
        description: 'We provide continuous technical support to ensure your applications and systems remain stable, secure, and up to date.',
        features: [
          'Proactive system monitoring and alerts',
          'Fast issue resolution based on SLAs',
          'Regular security patching and updates',
          '24/7 support and incident reporting'
        ]
    },
    {
        icon: Shapes,
        title: 'Customized Development Solutions',
        link: '/customized-development',
        description: 'When standard solutions fall short, we create custom-built software designed specifically for your operational and strategic needs.',
        features: [
            'Solutions tailored to your business model',
            'Dedicated and experienced developers',
            'Scalable systems built for long-term growth',
            'Full lifecycle support from concept to deployment'
        ]
    }
];

export const serviceSegments = [
    {
      title: "Core Development Services",
      services: [
        serviceDetails[0], // E-commerce
        serviceDetails[1], // Mobile App
        serviceDetails[2], // ERP SaaS
        serviceDetails[5], // Customized Development
      ]
    },
    {
      title: "Platform & Support Services",
      services: [
        serviceDetails[4], // Technical Support
        serviceDetails[3], // Odoo
      ]
    }
  ];

export const whyPartnerWithUs = [
    {
        icon: Users,
        title: 'Experienced Team',
        description: 'Our expert developers bring years of experience in web, mobile, and enterprise software development, ensuring reliable and high-quality delivery.'
    },
    {
        icon: Award,
        title: 'Custom-Fit Solutions',
        description: 'We build digital products that align perfectly with your business goals, workflows, and future growth plans.'
    },
    {
        icon: MessageCircle,
        title: 'Clear Communication',
        description: 'We keep you informed at every stage with transparent updates, open collaboration, and a streamlined development process.'
    },
    {
        icon: BarChart,
        title: 'Focused on Results',
        description: 'Our strategies are designed to deliver measurable results—performance, usability, and long-term business growth.'
    }
];

export const projects = [
  {
    name: "NearMeR",
    description: "A location-based service platform where users can find nearby services like salons, garages, or restaurants. Features dynamic listings, location tracking, responsive UI, and robust filters.",
    category: "Web",
    url: "https://nearmerv.com/",
    image: '1'
  },
  {
    name: "TipTop Ride",
    description: "An Uber-like ride-booking solution with real-time driver tracking, GPS integration, in-app payments, and a comprehensive rating system. Built for reliability and scale.",
    category: "App",
    url: "https://apps.apple.com/in/app/tiptop-ride/id6739037902",
    image: '2'
  },
  {
    name: "OmaShram",
    description: "A senior care home informational platform with donation capabilities, senior profiles, and a fully responsive design for accessibility.",
    category: "Web",
    url: "https://www.omashram.com/",
    image: '13'
  },
  {
    name: "PostmortemShala – LMS",
    description: "A full-featured online learning management system (LMS) with courses, exams, and a certification dashboard, founded to make learning accessible.",
    category: "Web",
    url: "https://www.postmortemshala.co.in/",
    image: '14'
  },
  {
    name: "Technique Loss Adjusters",
    description: "An insurance claim platform built to manage complex insurance loss adjusting and audit documentation workflows with a focus on quality and speed.",
    category: "Web",
    url: "https://techniquelossadjusters.com/",
    image: '15'
  },
  {
    name: "Creative Phy",
    description: "A full-service creative and digital marketing agency dedicated to innovative ideas, impactful designs, and data-driven digital strategies.",
    category: "Web",
    url: "https://www.creativephy.com/",
    image: '16'
  },
  {
    name: "Pillow Factory UK",
    description: "A sophisticated online bedding store featuring multi-currency support, discount engines, and complex product variants, reflecting a dedication to comfort and style.",
    category: "E-Commerce",
    url: "https://www.pillowfactory.co.uk/",
    image: '3'
  },
  {
    name: "Ground of Law",
    description: "A multi-page responsive site for a legal consultancy firm, featuring a professional design, contact forms, profile showcases, and service details.",
    category: "Web",
    url: "https://groundoflaw.qa/",
    image: '17'
  },
  {
    name: "Ainab Home Health Care",
    description: "A platform for a top Personal Care Assistant (PCA) provider in Minnesota, committed to enhancing quality of life at home with exceptional service.",
    category: "Web",
    url: "https://ainabhomehealthcare.com/",
    image: '18'
  },
  {
    name: "Fahad M Al Mazrou Co.",
    description: "A trusted leader in logistics since 1997, specializing in customs clearance and transportation services with a reputation for excellence.",
    category: "Web",
    url: "https://fmco.com.sa/",
    image: '19'
  },
  {
    name: "Khasta",
    description: "A delightful online bakery specializing in custom cookies and desserts inspired by rich cultural heritage. (Project Discontinued).",
    category: "E-Commerce",
    url: "https://khasta.co/",
    image: '4'
  },
  {
    name: "Sweorn Advisors",
    description: "A visa consultation service for student, work, and business visas, staffed by a team of experienced former consular officers. (URL not available).",
    category: "Other",
    url: "#",
    image: '20'
  },
  {
    name: "Singapore Airport Transfers",
    description: "A premier car service provider in Singapore offering a diverse fleet, from standard sedans to luxury Mercedes vehicles and large coaches.",
    category: "Web",
    url: "https://www.singaporeairporttransfers.com/",
    image: '21'
  },
  {
    name: "ACGEM Africa",
    description: "Promotes effective governance and sustainable economic development across Africa, with a commitment to transparency and accountability.",
    category: "Web",
    url: "https://acgemafrica.org/",
    image: '22'
  },
  {
    name: "Smseducations",
    description: "A training institute portal for batch, attendance, and course management. (Project terminated by client).",
    category: "Other",
    url: "#",
    image: '23'
  },
  {
    name: "Portchef",
    description: "A revolutionary chef hiring app that allows users to book chefs on an hourly or per-dish basis. Includes complex scheduling logic and dynamic pricing.",
    category: "Other",
    url: "#",
    image: '5'
  },
  {
    name: "Carlos",
    description: "A fitness trainer booking app designed to seamlessly connect trainers with clients. The platform supports scheduling, in-app chat, and progress tracking.",
    category: "Other",
    url: "#",
    image: '6'
  },
  {
    name: "MMT – Employee Increment Panel",
    description: "An internal HR evaluation tool designed to track employee KPIs and automate data-driven decisions for salary increments.",
    category: "Other",
    url: "#",
    image: '24'
  },
  {
    name: "Wayne – Contractor App (Backend)",
    description: "The complete backend system for a service provider application, connecting users with plumbers, painters, and cleaners. Features a robust admin panel.",
    category: "Other",
    url: "#",
    image: '7'
  }
];

export const testimonials = [
  {
    id: 'testimonial-1',
    quote: "MyBestGuide transformed our digital presence. Their team is professional, creative, and delivered beyond our expectations.",
    name: 'Jane Doe',
    title: 'CEO, Innovate Inc.',
    image: '10'
  },
  {
    id: 'testimonial-2',
    quote: "The custom ERP solution they built for us has revolutionized our workflow. Efficiency is up by 40%!",
    name: 'John Smith',
    title: 'COO, Manufacturing Co.',
    image: '11'
  },
  {
    id: 'testimonial-3',
    quote: "Our new e-commerce site is not only beautiful but also incredibly fast. We saw an immediate increase in conversions.",
    name: 'Emily White',
    title: 'Founder, The Chic Boutique',
    image: '12'
  },
];

export const ecommerceDevelopmentData = {
  heroTitle: "E-commerce Website Development",
  heroDescription: "Build powerful, secure, and scalable online stores that turn visitors into loyal customers. We create conversion-focused digital experiences backed by strategy, performance, and user-centric design.",
  ctaText: "Build Your E-commerce Platform",
  services: [
    {
      icon: Store,
      title: "Custom Storefront Development",
      description: "We build unique, brand-aligned e-commerce sites from the ground up, ensuring your online presence is a true reflection of your business. Our custom solutions provide the flexibility to create tailored user experiences that stand out in a crowded market.",
      image: "3"
    },
    {
      icon: ShoppingBag,
      title: "Shopify Storefront Implementations",
      description: "Leverage the power of Shopify with our expert implementation services. We customize Shopify themes and build bespoke features to create a robust, scalable, and easy-to-manage online store that aligns perfectly with your brand identity.",
      image: "4"
    },
    {
      icon: CreditCard,
      title: "Payment Gateway Integration",
      description: "Secure and seamless transactions are the backbone of any successful e-commerce business. We integrate a wide range of popular and reliable payment gateways, ensuring your customers have a smooth and trustworthy checkout experience.",
       image: "5"
    },
    {
      icon: ShoppingCart,
      title: "Cart, Checkout & Order Management",
      description: "We optimize the entire purchasing journey, from adding items to the cart to final order confirmation. Our intuitive cart and checkout designs reduce abandonment rates, while robust order management systems streamline your backend operations.",
       image: "6"
    },
    {
      icon: Zap,
      title: "Performance & Scalability Optimization",
      description: "A slow website costs you sales. We architect e-commerce platforms for speed and reliability, ensuring your site can handle high traffic volumes without compromising performance. Prepare your business for growth with a scalable and optimized solution.",
       image: "7"
    },
  ]
};

export const mobileAppDevelopmentData = {
  heroTitle: "Mobile Application Development",
  heroDescription: "Engage your users with high-performance, intuitive, and scalable mobile apps. We build user-centric mobile solutions for both Android and iOS that drive business growth and customer loyalty.",
  services: [
    {
      icon: Apple,
      title: "iOS App Development",
      description: "We build high-performance native iOS apps that are optimized for Apple's ecosystem. Our focus is on creating a smooth, responsive, and engaging user experience that feels at home on iPhone and iPad.",
      image: "2"
    },
    {
      icon: Smartphone,
      title: "Android App Development",
      description: "We specialize in creating native applications for the Android platform, delivering apps with superior performance, seamless integration, and an intuitive user experience tailored to a wide range of devices.",
      image: "2"
    },
    {
      icon: Devices,
      title: "Cross-Platform App Development",
      description: "Reach a wider audience faster with cross-platform development. Using modern frameworks like Flutter and React Native, we build beautiful, high-performance apps that run on both Android and iOS from a single codebase.",
      image: "13"
    },
    {
      icon: LayoutTemplate,
      title: "UI/UX Design for Mobile Apps",
      description: "We create intuitive and visually appealing user interfaces that make your app a joy to use. Our design process is user-centered, focusing on creating seamless navigation and engaging interactions.",
      image: "14"
    },
    {
      icon: Zap,
      title: "App Performance & Optimization",
      description: "In the mobile world, speed and reliability are everything. We fine-tune every aspect of your application—from code efficiency to resource management—to ensure fast load times, smooth animations, and a flawless user experience, even under heavy load.",
      image: "15"
    }
  ]
};

export const erpSaaSDevelopmentData = {
  heroTitle: "ERP & SaaS Development",
  heroDescription: "Build scalable, secure, and enterprise-ready ERP and SaaS solutions. We architect and develop custom platforms that streamline operations, automate workflows, and drive business intelligence.",
  services: [
    {
      icon: Layers3,
      title: "Custom ERP Systems",
      description: "Move beyond one-size-fits-all solutions. We design and build bespoke Enterprise Resource Planning (ERP) systems tailored to your unique business processes, integrating everything from finance and HR to supply chain and customer management.",
       image: "16"
    },
    {
      icon: Milestone,
      title: "SaaS Product Architecture",
      description: "A successful SaaS product starts with a solid foundation. Our architects design scalable, resilient, and secure cloud-native architectures that support your product's long-term growth, ensuring high availability and cost-effective operation.",
       image: "17"
    },
    {
      icon: Users2,
      title: "Multi-Tenant Applications",
      description: "Serve multiple customers from a single, unified platform. We specialize in building multi-tenant applications with robust data isolation, custom branding capabilities, and scalable infrastructure to ensure each tenant's experience is secure and private.",
       image: "18"
    },
    {
      icon: Workflow,
      title: "Role-Based Access & Workflow Management",
      description: "Ensure security and efficiency with fine-grained control over your application. We implement sophisticated role-based access control (RBAC) and configurable workflow management systems, allowing you to define user permissions and automate complex business processes.",
       image: "19"
    }
  ]
};

export const customizedDevelopmentData = {
  heroTitle: "Customized Development Solutions",
  heroDescription: "When off-the-shelf software doesn't fit, we build it for you. Our custom development solutions solve your unique challenges, automate your processes, and give you a competitive edge.",
  ctaText: "Get a Custom Solution",
  services: [
    {
      icon: Shapes,
      title: "Tailor-Made Software Solutions",
      description: "Your business is unique, and your software should be too. We work closely with you to understand your specific needs and build custom applications from scratch, delivering a solution that fits your workflow perfectly and drives efficiency.",
       image: "20"
    },
    {
      icon: Workflow,
      title: "Business Process Automation",
      description: "Eliminate manual tasks and reduce human error. We analyze your existing workflows and develop custom automation tools that streamline operations, improve accuracy, and free up your team to focus on high-value activities.",
       image: "21"
    },
    {
      icon: GitBranch,
      title: "Custom APIs & Integrations",
      description: "Connect your systems and unlock new capabilities. We build robust, secure, and well-documented custom APIs that allow your different software applications to communicate seamlessly, creating a unified and powerful digital ecosystem.",
       image: "22"
    },
    {
      icon: Server,
      title: "Legacy System Modernization",
      description: "Breathe new life into your outdated software. We help you migrate from aging, inefficient legacy systems to modern, scalable, and maintainable technology stacks, reducing risk and positioning your business for future growth.",
       image: "23"
    }
  ]
};

export const odooDevelopmentData = {
  heroTitle: "Odoo Development & Customization",
  heroDescription: "Unlock the full potential of your business with Odoo. We provide expert Odoo development, customization, and integration services to create an ERP system that works exactly the way you do.",
  ctaText: "Optimize with Odoo",
  services: [
    {
      icon: Component,
      title: "Odoo Module Customization",
      description: "Extend Odoo’s functionality to meet your specific needs. Our developers create and customize Odoo modules for accounting, inventory, CRM, and more, ensuring the platform aligns perfectly with your unique business processes.",
       image: "24"
    },
    {
      icon: Milestone,
      title: "Odoo Implementation & Migration",
      description: "Get started with Odoo the right way. We manage the entire implementation process, from initial setup and configuration to data migration from your existing systems, ensuring a smooth and successful transition with minimal disruption.",
       image: "25"
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Streamline your operations and improve efficiency. We leverage Odoo’s powerful workflow engine to automate your business processes, from sales and marketing to manufacturing and project management, reducing manual effort and ensuring consistency.",
       image: "26"
    },
    {
      icon: GitBranch,
      title: "Third-Party Integrations",
      description: "Create a unified system by connecting Odoo to your other essential business tools. We develop seamless integrations with payment gateways, shipping carriers, e-commerce platforms, and other third-party applications to centralize your data and operations.",
       image: "27"
    }
  ]
};

export const technicalSupportData = {
  heroTitle: "Technical Support, Website & App Maintenance",
  heroDescription: "Keep your digital assets running smoothly with our reliable, proactive, and expert support services. We ensure uptime, security, and performance, so you can focus on your core business.",
  ctaText: "Ensure System Stability",
  services: [
    {
      icon: FileText,
      title: "Ticket Management",
      description: "Our systematic approach to ticket management ensures that every issue is tracked, prioritized, and resolved efficiently. We provide clear communication and status updates, so you are always in the loop.",
       image: "28"
    },
    {
      icon: Shield,
      title: "SLA Management",
      description: "We are committed to meeting your business needs with guaranteed response and resolution times. Our Service Level Agreements (SLAs) are tailored to your requirements, providing peace of mind and predictable support.",
       image: "1"
    },
    {
      icon: AlertCircle,
      title: "Alert Monitoring",
      description: "We proactively monitor your systems 24/7 to detect and address potential issues before they impact your users. Our automated alert systems enable us to respond instantly to performance degradation or downtime.",
       image: "2"
    },
    {
      icon: Activity,
      title: "SOP Creation",
      description: "We develop Standard Operating Procedures (SOPs) for routine maintenance and emergency responses. This ensures consistency, reduces resolution time, and empowers your team with clear, actionable guidelines.",
       image: "3"
    },
    {
      icon: FileText,
      title: "Documentation Preparation",
      description: "Clear, comprehensive documentation is key to maintainable systems. We prepare and maintain detailed documentation for your applications, infrastructure, and processes, ensuring knowledge is always accessible.",
       image: "4"
    },
    {
      icon: TrendingUp,
      title: "Performance Monitoring",
      description: "We continuously track key performance indicators to ensure your applications are fast, responsive, and reliable. Our insights help you make informed decisions about scaling and optimization.",
       image: "5"
    },
    {
      icon: ShieldCheck,
      title: "Security Updates & Patching",
      description: "Protect your systems from vulnerabilities with our timely security updates and patching services. We keep your platforms secure and compliant with the latest security standards.",
       image: "6"
    },
    {
      icon: Wrench,
      title: "Incident Resolution & Reporting",
      description: "When incidents occur, our team acts quickly to diagnose and resolve the root cause. We provide detailed incident reports and analysis to prevent future occurrences and improve system resilience.",
       image: "7"
    },
  ]
};
