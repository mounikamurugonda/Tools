import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.utiltoolkits.com'),
  title: {
    default: 'UtilToolkits | Free Online Developer Tools',
    template: '%s | UtilToolkits',
  },
  description: "A collection of useful frontend-only tools. Includes converters, generators, formatters, and more, all running directly in your browser for enhanced speed and privacy.",
  keywords: ['developer tools', 'online tools', 'frontend', 'json formatter', 'base64 converter', 'uuid generator', 'color converter', 'unit converter', 'free tools'],
  openGraph: {
    title: 'UtilToolkits | Free Online Developer Tools',
    description: 'A comprehensive suite of free, browser-based utilities for developers.',
    url: 'https://www.utiltoolkits.com',
    siteName: 'UtilToolkits',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UtilToolkits | Free Online Developer Tools',
    description: 'A comprehensive suite of free, browser-based utilities for developers.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M22 8.33333V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8.33333' stroke='%233b82f6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M20 4H4C2.89543 4 2 4.89543 2 6V8.33333H22V6C22 4.89543 21.1046 4 20 4Z' stroke='%233b82f6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M14 12V14' stroke='%233b82f6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M10 12V14' stroke='%233b82f6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e",
  }
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
      <body className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="bg-transparent text-center p-6 text-gray-500 dark:text-gray-400 text-sm">
              <div className="flex justify-center space-x-6">
                  <Link href="/about" className="hover:text-blue-500">About</Link>
                  <Link href="/contact" className="hover:text-blue-500">Contact</Link>
                  <Link href="/privacy" className="hover:text-blue-500">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-blue-500">Terms of Service</Link>
              </div>
              <p className="mt-4">
                © {new Date().getFullYear()} UtilToolkits. All Rights Reserved.
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}