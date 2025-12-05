import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Link from 'next/link';
import { ThemeProvider } from '@/components/ThemeProvider';
import Script from 'next/script';
import ConditionalFooter from '@/components/ConditionalFooter';
import BuyMeACoffeeSection from '@/components/BuyMeACoffeeSection';

export const metadata: Metadata = {
  metadataBase: new URL('https://utiltoolkits.com'),
  title: {
    default: 'UtilToolkits | Free Online Developer Tools & Utilities',
    template: '%s | UtilToolkits',
  },
  description:
    'Your comprehensive free online developer toolbox with 50+ browser-based utilities. Includes JSON formatter, Base64 encoder, password generator, image tools, and more. All tools run locally for maximum speed and privacy.',
  keywords: [
    'developer tools',
    'online tools',
    'free utilities',
    'json formatter',
    'base64 converter',
    'password generator',
    'image tools',
    'text tools',
    'converter tools',
    'browser tools',
    'productivity tools',
    'web development tools',
  ],
  authors: [{ name: 'UtilToolkits Team' }],
  creator: 'UtilToolkits',
  publisher: 'UtilToolkits',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'UtilToolkits | Free Online Developer Tools & Utilities',
    description:
      'Your comprehensive free online developer toolbox with 50+ browser-based utilities. All tools run locally for maximum speed and privacy.',
    url: 'https://utiltoolkits.com',
    siteName: 'UtilToolkits',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UtilToolkits - Free Developer Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UtilToolkits | Free Online Developer Tools & Utilities',
    description:
      'Your comprehensive free online developer toolbox with 50+ browser-based utilities. All tools run locally for maximum speed and privacy.',
    images: ['/og-image.png'],
    creator: '@utiltoolkits',
  },
  alternates: {
    canonical: '/',
  },
  other: {
    'theme-color': '#3b82f6',
    'msapplication-TileColor': '#3b82f6',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
  icons: {
    icon: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M22 8.33333V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8.33333' stroke='%233b82f6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M20 4H4C2.89543 4 2 4.89543 2 6V8.33333H22V6C22 4.89543 21.1046 4 20 4Z' stroke='%233b82f6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M14 12V14' stroke='%233b82f6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M10 12V14' stroke='%233b82f6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7845670227485203"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1FR50BJ792"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1FR50BJ792');
            `,
          }}
        />
        {/* Initial theme script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function() {
                  function getInitialTheme() {
                    if (typeof window !== 'undefined' && window.localStorage) {
                      const storedTheme = window.localStorage.getItem('theme');
                      if (typeof storedTheme === 'string') {
                        return storedTheme;
                      }
                      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
                      if (userMedia.matches) {
                        return 'dark';
                      }
                    }
                    return 'light';
                  }
                  const theme = getInitialTheme();
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                })();
              `,
          }}
        />
      </head>
      <body className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
        <ThemeProvider>
          <div className="min-h-screen w-full flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow flex flex-col">{children}</main>
            <BuyMeACoffeeSection />
            <ConditionalFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
