import { Metadata } from 'next';

export const siteConfig = {
  name: 'RiderGuy',
  description: 'Empowering riders with professional delivery services, community support, and comprehensive welfare programs',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://riderguy.com',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/riderguy',
    facebook: 'https://facebook.com/riderguy',
    instagram: 'https://instagram.com/riderguy',
  },
  keywords: [
    'delivery service',
    'rider',
    'courier',
    'Ghana delivery',
    'Accra delivery',
    'rider jobs',
    'delivery platform',
    'rider welfare',
    'rider community',
    'delivery earnings',
    'rider training',
    'rider insurance',
  ],
};

export function generateSEOMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const fullDescription = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description: fullDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_GH',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
      creator: '@riderguy',
      site: '@riderguy',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    category: 'Business',
    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': siteConfig.name,
      'application-name': siteConfig.name,
      'format-detection': 'telephone=no',
    },
  };
}

export const pageMetadata = {
  dashboard: {
    title: 'Dashboard',
    description: 'Your rider dashboard - track earnings, deliveries, and performance in real-time',
    path: '/dashboard',
  },
  performance: {
    title: 'Performance Analytics',
    description: 'Comprehensive performance tracking with delivery metrics, time management, and customer satisfaction insights',
    path: '/dashboard/performance',
  },
  earnings: {
    title: 'Earnings & Wallet',
    description: 'Manage your earnings, track transactions, and withdraw funds instantly',
    path: '/dashboard/earnings',
  },
  rewards: {
    title: 'XP & Rewards',
    description: 'Level up your rider account, earn XP, unlock perks, and redeem exclusive rewards',
    path: '/dashboard/rewards',
  },
  training: {
    title: 'Training Center',
    description: 'Access professional courses, earn certifications, and enhance your riding skills',
    path: '/dashboard/training',
  },
  schedule: {
    title: 'My Schedule',
    description: 'Plan your shifts, manage availability, and optimize your work schedule',
    path: '/dashboard/schedule',
  },
  welfare: {
    title: 'Rider Welfare',
    description: 'Access insurance coverage, emergency support, medical assistance, and wellness programs',
    path: '/dashboard/welfare',
  },
  referrals: {
    title: 'Referrals & Network',
    description: 'Build your network, refer new riders, and earn bonus commissions',
    path: '/dashboard/referrals',
  },
  deliveries: {
    title: 'My Deliveries',
    description: 'Track active orders, view delivery history, and manage your delivery schedule',
    path: '/dashboard/deliveries',
  },
  community: {
    title: 'Rider Community',
    description: 'Connect with fellow riders, join groups, and participate in community events',
    path: '/dashboard/community',
  },
};
