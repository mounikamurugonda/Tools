'use client';

import React, { useState, useMemo } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { Copy } from 'lucide-react';

// One-click channel presets fill in the conventional source/medium pair for each
// marketing channel, the single biggest source of inconsistent UTM tagging.
const PRESETS: { label: string; source: string; medium: string }[] = [
  { label: 'Google Ads', source: 'google', medium: 'cpc' },
  { label: 'Facebook', source: 'facebook', medium: 'paid_social' },
  { label: 'Instagram', source: 'instagram', medium: 'paid_social' },
  { label: 'LinkedIn', source: 'linkedin', medium: 'paid_social' },
  { label: 'Email', source: 'newsletter', medium: 'email' },
  { label: 'Organic Social', source: 'twitter', medium: 'social' },
];

const UtmBuilder: React.FC<ToolProps> = ({ details, toolId }) => {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [lowercase, setLowercase] = useState(true);
  const toast = useToast();

  const applyPreset = (p: { label: string; source: string; medium: string }) => {
    setSource(p.source);
    setMedium(p.medium);
    toast.success(`${p.label} preset applied`);
  };

  const { result, error } = useMemo(() => {
    if (!url.trim()) return { result: '', error: '' };
    let normalized = url.trim();
    // Be forgiving: assume https:// when no scheme is present.
    if (!/^https?:\/\//i.test(normalized)) normalized = `https://${normalized}`;
    try {
      const built = new URL(normalized);
      const norm = (v: string) => (lowercase ? v.trim().toLowerCase() : v.trim());
      if (source) built.searchParams.set('utm_source', norm(source));
      if (medium) built.searchParams.set('utm_medium', norm(medium));
      if (campaign) built.searchParams.set('utm_campaign', norm(campaign));
      if (term) built.searchParams.set('utm_term', norm(term));
      if (content) built.searchParams.set('utm_content', norm(content));
      return { result: built.toString(), error: '' };
    } catch {
      return { result: '', error: 'Enter a valid website URL (e.g. https://example.com).' };
    }
  }, [url, source, medium, campaign, term, content, lowercase]);

  const missingRequired = url.trim() && (!source || !medium);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard
      .writeText(result)
      .then(() => toast.success('Campaign URL copied'))
      .catch(() => toast.error('Failed to copy'));
  };

  const handleReset = () => {
    setUrl('');
    setSource('');
    setMedium('');
    setCampaign('');
    setTerm('');
    setContent('');
  };

  return (
    <ToolContainer title="UTM Builder" details={details} toolId={toolId}>
      <div className="space-y-4 max-w-3xl mx-auto">
        <div>
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quick presets
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(p => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p)}
                className="px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                title={`Set source=${p.source}, medium=${p.medium}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="utm-url">Website URL *</Label>
          <Input
            id="utm-url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://example.com"
            error={!!error}
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="utm-source">Campaign Source *</Label>
            <Input
              id="utm-source"
              value={source}
              onChange={e => setSource(e.target.value)}
              placeholder="google, newsletter"
            />
          </div>
          <div>
            <Label htmlFor="utm-medium">Campaign Medium *</Label>
            <Input
              id="utm-medium"
              value={medium}
              onChange={e => setMedium(e.target.value)}
              placeholder="cpc, banner, email"
            />
          </div>
          <div>
            <Label htmlFor="utm-campaign">Campaign Name</Label>
            <Input
              id="utm-campaign"
              value={campaign}
              onChange={e => setCampaign(e.target.value)}
              placeholder="spring_sale"
            />
          </div>
          <div>
            <Label htmlFor="utm-term">Campaign Term</Label>
            <Input
              id="utm-term"
              value={term}
              onChange={e => setTerm(e.target.value)}
              placeholder="running+shoes"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="utm-content">Campaign Content</Label>
            <Input
              id="utm-content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="logolink, textlink"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={e => setLowercase(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
          />
          Force lowercase parameters (recommended — keeps analytics data clean)
        </label>

        {missingRequired && !error && (
          <p className="text-sm text-amber-600 dark:text-amber-400">
            Tip: Source and Medium are recommended for Google Analytics to attribute traffic
            correctly.
          </p>
        )}

        <div className="relative mt-6">
          <Label htmlFor="utm-result">Generated URL</Label>
          <textarea
            id="utm-result"
            data-lenis-prevent
            readOnly
            value={result}
            placeholder="Your campaign URL will appear here…"
            className="w-full h-24 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 pr-12 font-mono text-sm break-all text-gray-900 dark:text-white"
          />
          {result && (
            <button
              onClick={handleCopy}
              aria-label="Copy generated URL"
              className="absolute top-10 right-2 p-2 rounded-lg text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Copy className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={handleCopy} disabled={!result}>
            Copy URL
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </ToolContainer>
  );
};

export default UtmBuilder;
