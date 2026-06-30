import { ImageResponse } from 'next/og';
import { TOOLS } from '@/constants';
import { notFound } from 'next/navigation';

export const runtime = 'nodejs';
export const alt = 'utiltoolkits — free online developer tool';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return TOOLS.map(tool => ({ toolId: tool.id }));
}

const CATEGORY_TINT: Record<string, [string, string]> = {
  Text: ['#0f172a', '#1e3a8a'],
  Image: ['#0f172a', '#7c2d12'],
  CSS: ['#0f172a', '#312e81'],
  Coding: ['#0f172a', '#064e3b'],
  Color: ['#0f172a', '#831843'],
  'Math & Calculations': ['#0f172a', '#1e293b'],
  Productivity: ['#0f172a', '#155e75'],
  Fun: ['#0f172a', '#581c87'],
  Video: ['#0f172a', '#7f1d1d'],
  Misc: ['#0f172a', '#334155'],
};

export default async function Image({ params }: { params: Promise<{ toolId: string }> }) {
  const { toolId } = await params;
  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) notFound();

  const [from, to] = CATEGORY_TINT[tool.category] ?? ['#0f172a', '#1e293b'];

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
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              textTransform: 'uppercase',
              letterSpacing: 4,
              color: '#94a3b8',
            }}
          >
            {tool.category}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {tool.name}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              lineHeight: 1.3,
              color: '#cbd5e1',
              maxWidth: 980,
            }}
          >
            {tool.description}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#94a3b8',
          }}
        >
          <div style={{ display: 'flex' }}>utiltoolkits.com/tools/{tool.id}</div>
          <div style={{ display: 'flex' }}>Free • Browser-based • No signup</div>
        </div>
      </div>
    ),
    size
  );
}
