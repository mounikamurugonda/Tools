export interface Collection {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  icon: string;
  toolIds: string[];
  intro: string;
  whyUse: string;
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'json-api-tools',
    title: 'JSON & API Developer Tools',
    description:
      'Format, validate, transform, and debug JSON and API data — all in the browser.',
    seoTitle: 'JSON & API Developer Tools — Free Online Utilities | UtilToolkits',
    seoDescription:
      'Free browser-based JSON formatter, validator, JSON to TypeScript converter, YAML converter, JWT debugger, and more. No upload, no signup, instant results.',
    keywords: [
      'json formatter online',
      'json validator',
      'json to typescript',
      'json to yaml',
      'jwt debugger',
      'api developer tools',
      'json tools free',
      'online json tools',
    ],
    icon: '🗂️',
    toolIds: [
      'json-formatter',
      'json-to-typescript',
      'json-yaml-converter',
      'json-to-csv',
      'xml-formatter',
      'jwt-debugger',
      'url-encoder',
      'base64-converter',
      'hash-generator',
    ],
    intro:
      'Whether you\'re debugging a REST response, writing TypeScript interfaces from a payload, or converting between data formats, these free browser tools handle the grunt work instantly.',
    whyUse:
      'Every tool runs entirely in your browser — your API payloads, JWTs, and credentials never leave your machine. No rate limits, no server round-trips, no accounts.',
  },
  {
    slug: 'css-developer-tools',
    title: 'CSS Developer Tools',
    description:
      'Generate, preview, and copy CSS for shadows, gradients, borders, glassmorphism, and more.',
    seoTitle: 'CSS Generator Tools — Box Shadow, Gradient, Glassmorphism & More | UtilToolkits',
    seoDescription:
      'Free CSS generator tools: box shadow, CSS gradients, glassmorphism, text shadow, CSS patterns. Live preview, copy-ready code, no signup.',
    keywords: [
      'css box shadow generator',
      'css gradient generator',
      'glassmorphism generator',
      'css tools online',
      'css generator free',
      'text shadow generator',
      'css code generator',
    ],
    icon: '🎨',
    toolIds: [
      'box-shadow-generator',
      'css-gradient-generator',
      'glassmorphism-generator',
      'text-shadow-generator',
      'css-triangle-generator',
      'css-borders',
      'css-patterns',
    ],
    intro:
      'Stop hand-writing CSS properties from memory. These visual generators let you tweak values with sliders, see a live preview, and copy production-ready CSS in seconds.',
    whyUse:
      'Each generator produces clean, cross-browser CSS you can paste straight into your stylesheet. No frameworks required — pure CSS output that works anywhere.',
  },
  {
    slug: 'image-optimization-tools',
    title: 'Image Optimization Tools',
    description:
      'Compress, convert, resize, and transform images without uploading them to a server.',
    seoTitle: 'Free Image Optimization Tools — Compress, Convert, Resize | UtilToolkits',
    seoDescription:
      'Browser-based image tools: compress JPEG/PNG/WebP, convert image formats, resize images, add watermarks, and convert to Base64. 100% private — no uploads.',
    keywords: [
      'image compressor online',
      'image converter free',
      'resize image online',
      'webp converter',
      'png to jpg converter',
      'image optimization tools',
      'compress image free',
      'image tools no upload',
    ],
    icon: '🖼️',
    toolIds: [
      'image-compressor',
      'image-converter',
      'image-resizer',
      'image-filters',
      'watermark-adder',
      'image-to-base64',
      'svg-to-data-uri',
    ],
    intro:
      'Heavy images slow down your site and waste bandwidth. These tools let you compress, convert, and resize images directly in your browser — no upload queues, no file size anxiety.',
    whyUse:
      'All processing is done client-side using the Canvas API. Your photos and designs stay on your device. Results are download-ready in seconds.',
  },
  {
    slug: 'frontend-developer-toolkit',
    title: 'Front-End Developer Toolkit',
    description:
      'The most-used browser tools for front-end developers: formatters, converters, generators, and debuggers.',
    seoTitle: 'Front-End Developer Toolkit — Essential Free Tools | UtilToolkits',
    seoDescription:
      'Essential free tools for front-end developers: JSON formatter, CSS generators, color tools, Base64 converter, regex tester, UUID generator, and more. All browser-based.',
    keywords: [
      'frontend developer tools',
      'front end tools online',
      'free developer utilities',
      'web developer tools',
      'browser developer tools',
      'coding tools free',
      'developer toolkit online',
    ],
    icon: '🛠️',
    toolIds: [
      'json-formatter',
      'base64-converter',
      'url-encoder',
      'regex-tester',
      'uuid-generator',
      'color-picker',
      'css-gradient-generator',
      'box-shadow-generator',
      'html-entity',
      'meta-tag-generator',
      'code-to-image',
    ],
    intro:
      'A curated set of the tools front-end developers reach for every day. Bookmark this page and skip the Google search next time you need a quick formatter, generator, or debugger.',
    whyUse:
      'Everything is free, runs in your browser, and requires no account. No ads in the way of the tool, no file size limits, no server-side processing of your code or data.',
  },
  {
    slug: 'text-processing-tools',
    title: 'Text Processing & Writing Tools',
    description:
      'Clean, format, analyze, and transform text — word counter, case converter, markdown previewer, and more.',
    seoTitle: 'Free Text Processing Tools — Word Counter, Case Converter, Markdown | UtilToolkits',
    seoDescription:
      'Free browser-based text tools: word counter, character counter, case converter, markdown previewer, text cleaner, slug generator, and readability scorer.',
    keywords: [
      'word counter online',
      'character counter',
      'case converter',
      'markdown previewer',
      'text cleaner online',
      'slug generator',
      'text tools free',
      'online text processing',
    ],
    icon: '✍️',
    toolIds: [
      'word-counter',
      'case-converter',
      'markdown-previewer',
      'text-cleaner',
      'slug-generator',
      'readability-score-calculator',
      'keyword-density-analyzer',
      'lorem-ipsum-generator',
      'fancy-font-generator',
    ],
    intro:
      'Whether you\'re writing copy, cleaning up a data dump, or preparing content for publishing, these text tools save you the repetitive formatting work.',
    whyUse:
      'All tools process text locally in your browser. Paste a 50MB log file, clean it, and download the result — no server limits, no privacy concerns.',
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find(c => c.slug === slug);
}
