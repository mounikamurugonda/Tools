'use client';

import React, { useCallback, useMemo, useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy, Download, Globe, Twitter, Search } from 'lucide-react';

type Robots = 'index,follow' | 'noindex,follow' | 'index,nofollow' | 'noindex,nofollow';
type TwitterCard = 'summary' | 'summary_large_image';
type OgType = 'website' | 'article' | 'product' | 'profile';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function host(url: string): string {
  try { return new URL(url).host; } catch { return url || 'example.com'; }
}

const MetaTagGenerator: React.FC<ToolProps> = ({ details, toolId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [ogType, setOgType] = useState<OgType>('website');
  const [twitterCard, setTwitterCard] = useState<TwitterCard>('summary_large_image');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [robots, setRobots] = useState<Robots>('index,follow');
  const [includeOg, setIncludeOg] = useState(true);
  const [includeTwitter, setIncludeTwitter] = useState(true);
  const toast = useToast();

  const output = useMemo(() => {
    const lines: string[] = [];
    lines.push('<!-- Primary Meta Tags -->');
    if (title) lines.push(`<title>${esc(title)}</title>`);
    if (title) lines.push(`<meta name="title" content="${esc(title)}">`);
    if (description) lines.push(`<meta name="description" content="${esc(description)}">`);
    if (keywords) lines.push(`<meta name="keywords" content="${esc(keywords)}">`);
    if (author) lines.push(`<meta name="author" content="${esc(author)}">`);
    lines.push(`<meta name="robots" content="${robots}">`);
    lines.push('<meta name="viewport" content="width=device-width, initial-scale=1">');
    if (url) lines.push(`<link rel="canonical" href="${esc(url)}">`);

    if (includeOg) {
      lines.push('');
      lines.push('<!-- Open Graph / Facebook -->');
      lines.push(`<meta property="og:type" content="${ogType}">`);
      if (url) lines.push(`<meta property="og:url" content="${esc(url)}">`);
      if (title) lines.push(`<meta property="og:title" content="${esc(title)}">`);
      if (description) lines.push(`<meta property="og:description" content="${esc(description)}">`);
      if (image) lines.push(`<meta property="og:image" content="${esc(image)}">`);
    }

    if (includeTwitter) {
      lines.push('');
      lines.push('<!-- Twitter -->');
      lines.push(`<meta name="twitter:card" content="${twitterCard}">`);
      if (url) lines.push(`<meta name="twitter:url" content="${esc(url)}">`);
      if (title) lines.push(`<meta name="twitter:title" content="${esc(title)}">`);
      if (description) lines.push(`<meta name="twitter:description" content="${esc(description)}">`);
      if (image) lines.push(`<meta name="twitter:image" content="${esc(image)}">`);
      if (twitterHandle) {
        const handle = twitterHandle.startsWith('@') ? twitterHandle : `@${twitterHandle}`;
        lines.push(`<meta name="twitter:site" content="${esc(handle)}">`);
        lines.push(`<meta name="twitter:creator" content="${esc(handle)}">`);
      }
    }

    return lines.join('\n');
  }, [title, description, keywords, author, url, image, ogType, twitterCard, twitterHandle, robots, includeOg, includeTwitter]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success('HTML copied');
    } catch {
      toast.error('Copy failed');
    }
  }, [output, toast]);

  const download = useCallback(() => {
    const blob = new Blob([output], { type: 'text/html;charset=utf-8' });
    const u = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = u;
    a.download = 'meta-tags.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(u);
    toast.success('Downloaded');
  }, [output, toast]);

  return (
    <ToolContainer title="Meta Tag Generator" details={details} toolId={toolId}>
      <div className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card title="Page Details" className="space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="mt-title">Page Title</Label>
                <span className={`text-xs tabular-nums ${title.length > 60 ? 'text-red-500' : 'text-gray-500'}`}>{title.length}/60</span>
              </div>
              <Input id="mt-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="My Awesome Page" />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="mt-desc">Description</Label>
                <span className={`text-xs tabular-nums ${description.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>{description.length}/160</span>
              </div>
              <TextArea id="mt-desc" value={description} onChange={e => setDescription(e.target.value)} placeholder="A short, compelling description for search engines and social shares." className="h-24" />
            </div>
            <div>
              <Label htmlFor="mt-url">Canonical URL</Label>
              <Input id="mt-url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page" type="url" />
            </div>
            <div>
              <Label htmlFor="mt-image">Social Image URL</Label>
              <Input id="mt-image" value={image} onChange={e => setImage(e.target.value)} placeholder="https://example.com/og-image.png" type="url" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mt-keywords">Keywords</Label>
                <Input id="mt-keywords" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="seo, meta, tags" />
              </div>
              <div>
                <Label htmlFor="mt-author">Author</Label>
                <Input id="mt-author" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Jane Doe" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mt-robots">Robots</Label>
                <Select id="mt-robots" value={robots} onChange={e => setRobots(e.target.value as Robots)} className="!py-2 text-sm">
                  <option value="index,follow">index, follow</option>
                  <option value="noindex,follow">noindex, follow</option>
                  <option value="index,nofollow">index, nofollow</option>
                  <option value="noindex,nofollow">noindex, nofollow</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="mt-ogtype">OG Type</Label>
                <Select id="mt-ogtype" value={ogType} onChange={e => setOgType(e.target.value as OgType)} className="!py-2 text-sm">
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                  <option value="profile">profile</option>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mt-tcard">Twitter Card</Label>
                <Select id="mt-tcard" value={twitterCard} onChange={e => setTwitterCard(e.target.value as TwitterCard)} className="!py-2 text-sm">
                  <option value="summary_large_image">summary_large_image</option>
                  <option value="summary">summary</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="mt-thandle">Twitter Handle</Label>
                <Input id="mt-thandle" value={twitterHandle} onChange={e => setTwitterHandle(e.target.value)} placeholder="@yoursite" />
              </div>
            </div>
            <div className="flex gap-4 pt-2 text-sm">
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <input type="checkbox" checked={includeOg} onChange={e => setIncludeOg(e.target.checked)} />
                Include Open Graph
              </label>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <input type="checkbox" checked={includeTwitter} onChange={e => setIncludeTwitter(e.target.checked)} />
                Include Twitter
              </label>
            </div>
          </Card>

          <div className="space-y-4">
            <Card title="Google Preview" className="p-4">
              <div className="space-y-1">
                <div className="text-xs text-gray-500 inline-flex items-center gap-1.5">
                  <Search size={12} /> {host(url)}
                </div>
                <div className="text-blue-700 dark:text-blue-400 text-lg leading-snug line-clamp-1">
                  {title || 'Your page title appears here'}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {description || 'Your meta description appears here as the search snippet.'}
                </div>
              </div>
            </Card>

            <Card title="Twitter / X Card Preview" className="p-4">
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {image ? (
                  <div className="aspect-[1.91/1] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt="" className="w-full h-full object-cover" onError={e => ((e.target as HTMLImageElement).style.display = 'none')} />
                  </div>
                ) : (
                  <div className="aspect-[1.91/1] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-gray-400 text-sm">
                    <Twitter size={28} />
                  </div>
                )}
                <div className="p-3 space-y-1">
                  <div className="text-xs text-gray-500 uppercase tracking-wide inline-flex items-center gap-1">
                    <Globe size={10} /> {host(url)}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                    {title || 'Your page title appears here'}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {description || 'Your description appears here.'}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card title="Generated HTML" className="p-0 overflow-hidden">
          <div className="flex items-center justify-end gap-2 px-4 py-2 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <Button onClick={copy} size="sm" variant="outline" disabled={!output}>
              <Copy size={14} className="mr-1" /> Copy
            </Button>
            <Button onClick={download} size="sm" variant="outline" disabled={!output}>
              <Download size={14} className="mr-1" /> Download
            </Button>
          </div>
          <pre className="text-xs sm:text-sm font-mono p-4 overflow-auto bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 whitespace-pre min-h-[200px] border-t-0">{output}</pre>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default MetaTagGenerator;
