'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';

const UtmBuilder: React.FC<ToolProps> = ({ details, toolId }) => {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (!url) {
      setResult('');
      return;
    }
    try {
      const builtUrl = new URL(url);
      if (source) builtUrl.searchParams.set('utm_source', source);
      if (medium) builtUrl.searchParams.set('utm_medium', medium);
      if (campaign) builtUrl.searchParams.set('utm_campaign', campaign);
      if (term) builtUrl.searchParams.set('utm_term', term);
      if (content) builtUrl.searchParams.set('utm_content', content);
      setResult(builtUrl.toString());
    } catch (e) {
      setResult('Invalid URL');
    }
  }, [url, source, medium, campaign, term, content]);

  return (
    <ToolContainer title="UTM Builder" details={details} toolId={toolId}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Website URL *</label>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="brand-input"
            placeholder="https://example.com"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Campaign Source *</label>
            <input
              value={source}
              onChange={e => setSource(e.target.value)}
              className="brand-input"
              placeholder="google, newsletter"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Campaign Medium *</label>
            <input
              value={medium}
              onChange={e => setMedium(e.target.value)}
              className="brand-input"
              placeholder="cpc, banner, email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Campaign Name</label>
            <input
              value={campaign}
              onChange={e => setCampaign(e.target.value)}
              className="brand-input"
              placeholder="spring_sale"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Campaign Term</label>
            <input
              value={term}
              onChange={e => setTerm(e.target.value)}
              className="brand-input"
              placeholder="running+shoes"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Campaign Content</label>
            <input
              value={content}
              onChange={e => setContent(e.target.value)}
              className="brand-input"
              placeholder="logolink, textlink"
            />
          </div>
        </div>

        <div className="relative mt-6">
          <label className="block text-sm font-medium mb-1">Generated URL</label>
          <textarea
            data-lenis-prevent
            readOnly
            value={result}
            className="w-full h-24 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-3 font-mono text-sm break-all"
          />
          {result && result !== 'Invalid URL' && (
            <CopyButton textToCopy={result} className="absolute top-8 right-2" />
          )}
        </div>
      </div>
    </ToolContainer>
  );
};

export default UtmBuilder;
