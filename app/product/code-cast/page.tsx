import { Metadata } from 'next';
import CodeCastClientWrapper from './CodeCastClientWrapper';
import Schema from '../../../components/Schema';
import { getCodeCastProductSchema, getBreadcrumbSchema } from '../../../lib/schema';

export const metadata: Metadata = {
  title: 'CodeCast - Professional Code Animations',
  description:
    'The #1 tool for developer content creators. Create studio-quality code animations, beautiful screenshots, and viral coding videos for Instagram, TikTok, and YouTube in seconds.',
  keywords: [
    'code animation',
    'code to video',
    'syntax highlighter',
    'carbon for video',
    'developer content creation',
    'coding tutorials',
    'source code to image',
    'instagram for developers',
    'programmng reels',
    'react code snippet',
    'beautify code',
  ],
  openGraph: {
    title: 'CodeCast - Turn Code into Viral Content',
    description:
      'Stop posting static screenshots. Create engaging, animated code demos that go viral. Trusted by top developer creators.',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // Fallback to main OG, user can customize later
        width: 1200,
        height: 630,
        alt: 'CodeCast - Professional Code Animations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeCast | Create Viral Coding Videos',
    description:
      'Turn your code into engaging videos for socials. Auto-animate typing, create studio-quality visuals, and boost engagement.',
  },
};

export default function CodeCastPage() {
  return (
    <>
      <Schema schema={getCodeCastProductSchema()} />
      <Schema
        schema={getBreadcrumbSchema([
          { name: 'Home', url: 'https://utiltoolkits.com' },
          { name: 'CodeCast', url: 'https://utiltoolkits.com/product/code-cast' },
        ])}
      />
      <CodeCastClientWrapper />
    </>
  );
}
