type CreditItem = { label: string; href?: string };

// Site-wide credits
export const SITE_CREDITS: CreditItem[] = [
  { label: 'Next.js', href: 'https://nextjs.org/' },
  { label: 'React', href: 'https://react.dev/' },
  { label: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
  { label: 'Lucide Icons', href: 'https://lucide.dev/' },
];

// Per-tool credits by tool id from constants.tsx
export const TOOL_CREDITS: Record<string, CreditItem[]> = {
  'qrcode-generator': [{ label: 'qrcode', href: 'https://github.com/soldair/node-qrcode' }],
  'markdown-previewer': [{ label: 'marked', href: 'https://marked.js.org/' }],
  'jwt-debugger': [{ label: 'jwt-decode', href: 'https://github.com/auth0/jwt-decode' }],
  'diff-checker': [{ label: 'diff', href: 'https://github.com/kpdecker/jsdiff' }],
  'world-clock': [{ label: 'react-select', href: 'https://react-select.com/' }],
  'csv-to-xlsx': [{ label: 'xlsx', href: 'https://docs.sheetjs.com/' }],
  'xlsx-to-csv': [{ label: 'xlsx', href: 'https://docs.sheetjs.com/' }],
  'video-compressor': [
    {
      label: '@ffmpeg/ffmpeg',
      href: 'https://github.com/ffmpegwasm/ffmpeg.wasm',
    },
    {
      label: '@ffmpeg/util',
      href: 'https://github.com/ffmpegwasm/ffmpeg.wasm',
    },
  ],
  'video-to-audio-converter': [
    {
      label: '@ffmpeg/ffmpeg',
      href: 'https://github.com/ffmpegwasm/ffmpeg.wasm',
    },
    {
      label: '@ffmpeg/util',
      href: 'https://github.com/ffmpegwasm/ffmpeg.wasm',
    },
  ],
  'gif-maker': [
    {
      label: '@ffmpeg/ffmpeg',
      href: 'https://github.com/ffmpegwasm/ffmpeg.wasm',
    },
  ],
  'trim-video': [
    {
      label: '@ffmpeg/ffmpeg',
      href: 'https://github.com/ffmpegwasm/ffmpeg.wasm',
    },
  ],
  'format-converter': [
    {
      label: '@ffmpeg/ffmpeg',
      href: 'https://github.com/ffmpegwasm/ffmpeg.wasm',
    },
  ],
  'video-thumbnail-extractor': [
    {
      label: '@ffmpeg/ffmpeg',
      href: 'https://github.com/ffmpegwasm/ffmpeg.wasm',
    },
  ],
  'video-mute': [
    {
      label: '@ffmpeg/ffmpeg',
      href: 'https://github.com/ffmpegwasm/ffmpeg.wasm',
    },
  ],
};
