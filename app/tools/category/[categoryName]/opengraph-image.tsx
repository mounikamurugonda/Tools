import { ImageResponse } from 'next/og';
import { TOOLS, CATEGORY_ORDER, CATEGORY_URL_MAP, URL_TO_CATEGORY_MAP } from '@/constants';
import { notFound } from 'next/navigation';

export const runtime = 'nodejs';
export const alt = 'utiltoolkits — free online tools by category';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return CATEGORY_ORDER.map(category => ({ categoryName: CATEGORY_URL_MAP[category] }));
}

const CATEGORY_TINT: Record<string, [string, string]> = {
  'Text Tools': ['#0f172a', '#1e3a8a'],
  'Image Tools': ['#0f172a', '#7c2d12'],
  'CSS Tools': ['#0f172a', '#312e81'],
  'Coding Tools': ['#0f172a', '#064e3b'],
  'Color Tools': ['#0f172a', '#831843'],
  'Calculator Tools': ['#0f172a', '#1e293b'],
  'Productivity Tools': ['#0f172a', '#155e75'],
  'Fun Tools': ['#0f172a', '#581c87'],
  'Video Tools': ['#0f172a', '#7f1d1d'],
  'Other Tools': ['#0f172a', '#334155'],
};

export default async function Image({ params }: { params: Promise<{ categoryName: string }> }) {
  const { categoryName } = await params;
  const category = URL_TO_CATEGORY_MAP[categoryName];
  if (!category) notFound();

  const count = TOOLS.filter(t => t.category === category).length;
  const [from, to] = CATEGORY_TINT[category] ?? ['#0f172a', '#1e293b'];
  const label = category.replace(/\s+Tools$/i, '');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
          color: '#f8fafc',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 12,
              background: '#3b82f6',
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            U
          </div>
          <div style={{ display: 'flex', fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
            utiltoolkits
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', fontSize: 24, textTransform: 'uppercase', letterSpacing: 4, color: '#94a3b8' }}>
            Category
          </div>
          <div style={{ display: 'flex', fontSize: 88, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            {label} Tools
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#cbd5e1' }}>
            {count} free, browser-based {label.toLowerCase()} tools — no signup.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, color: '#94a3b8' }}>
          <div style={{ display: 'flex' }}>utiltoolkits.com/tools/category/{categoryName}</div>
          <div style={{ display: 'flex' }}>Free • Private • Instant</div>
        </div>
      </div>
    ),
    size
  );
}
