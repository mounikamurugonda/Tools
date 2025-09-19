import HomePageClient from "@/components/HomePageClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UtilToolkits | Your Free Online Developer Toolbox',
  description: 'A comprehensive suite of nearly 30 free, browser-based utilities for developers. Includes Case Converter, JSON Formatter, Base64 Encoder, Password Generator, and dozens more. Fast, private, and easy to use.',
   alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomePageClient />;
}