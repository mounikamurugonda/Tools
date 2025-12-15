import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import Script from 'next/script';
import ConditionalFooter from '@/components/ConditionalFooter';
import BuyMeACoffeeSection from '@/components/BuyMeACoffeeSection';
import React from 'react';
import SmoothScrolling from '@/components/SmoothScrolling';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://utiltoolkits.com'),
  title: {
    default: 'UtilToolkits | Free Online Developer Tools & Utilities',
    template: '%s | UtilToolkits',
  },
  description:
    'Your comprehensive free online developer toolbox with 90+ browser-based utilities. Includes JSON formatter, Base64 encoder, password generator, image tools, and more. All tools run locally for maximum speed and privacy.',
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
    title: 'UtilToolkits | Free Online Developer Tools & Utilities',
    description:
      'Your comprehensive free online developer toolbox with 90+ browser-based utilities. All tools run locally for maximum speed and privacy.',
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
      'Your comprehensive free online developer toolbox with 90+ browser-based utilities. All tools run locally for maximum speed and privacy.',
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
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7845670227485203"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1FR50BJ792"
          strategy="lazyOnload"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
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
      <body className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text" suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScrolling>
            <div className="min-h-screen w-full flex flex-col transition-colors duration-300 pt-20">
              <Header />
              <main className="flex-grow flex flex-col">
                {children}
              </main>
              <BuyMeACoffeeSection />
              <ConditionalFooter />
            </div>
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}