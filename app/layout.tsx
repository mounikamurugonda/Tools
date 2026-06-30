import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RootLayoutWrapper from '@/components/RootLayoutWrapper';
import GoogleTagManager from '@/components/GoogleTagManager';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleAdSense from '@/components/GoogleAdSense';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://utiltoolkits.com'),
  title: {
    default: 'UtilToolkits | Free Browser Tools for Developers & AI Workflows',
    template: '%s | UtilToolkits',
  },
  description:
    'Stop wasting AI tokens on tasks tools can do instantly. 100+ free browser tools — AI token counter, prompt builder, JSON formatter, CSV converter, image tools, and more. No upload, no tracking, no cost.',
  keywords: [
    'developer tools',
    'ai tools free',
    'ai token counter',
    'prompt builder',
    'json formatter',
    'csv to json',
    'free utilities',
    'base64 converter',
    'password generator',
    'image tools',
    'text tools',
    'browser tools',
    'productivity tools',
    'web development tools',
    'ai workflow tools',
    'context window calculator',
    'prompt template library',
  ],
  authors: [{ name: 'UtilToolkits' }],
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
    title: 'UtilToolkits — Free Browser Tools for Developers & AI Workflows',
    description:
      'AI token counter, prompt builder, JSON formatter, CSV converter, image tools and 100+ more — all free, browser-based, no upload required.',
    url: 'https://utiltoolkits.com',
    siteName: 'UtilToolkits',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UtilToolkits — Free Browser Tools for Developers & AI Workflows',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UtilToolkits | Free Online Developer Tools & Utilities',
    description:
      'Your comprehensive free online developer toolbox with 90+ browser-based utilities. All tools run locally for maximum speed and privacy.',
    images: ['/og-image.png'],
    creator: '@utiltoolkits',
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  other: {
    'theme-color': '#3b82f6',
    'msapplication-TileColor': '#3b82f6',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

import { ThemeProvider } from '@/components/ThemeProvider';
import SmoothScrolling from '@/components/SmoothScrolling';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import QueryProvider from '@/components/QueryProvider';
import { ToastProvider } from '@/components/ui/ToastProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <GoogleTagManager />
        <GoogleAdSense />
        <GoogleAnalytics />
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
      <body
        className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TDPZNRZ2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <QueryProvider>
          <ThemeProvider>
            <SessionProviderWrapper>
              <ToastProvider>
                <SmoothScrolling>
                  <RootLayoutWrapper>{children}</RootLayoutWrapper>
                </SmoothScrolling>
              </ToastProvider>
            </SessionProviderWrapper>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
