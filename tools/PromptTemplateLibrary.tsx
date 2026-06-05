'use client';

import React, { useState, useMemo, useCallback } from 'react';
import type { ToolProps } from '@/types';

interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  prompt: string;
  tags: string[];
}

const TEMPLATES: Template[] = [
  // Coding
  { id: 'code-review', category: 'Coding', title: 'Code Review', description: 'Get a thorough code review with actionable feedback', tags: ['code', 'review', 'quality'],
    prompt: `You are a senior software engineer conducting a code review. Review the following code for:
1. Logic errors and bugs
2. Performance issues
3. Security vulnerabilities
4. Code style and readability
5. Edge cases not handled

For each issue found, specify: location, severity (critical/major/minor), explanation, and suggested fix.

Code to review:
[PASTE CODE HERE]` },
  { id: 'debug-error', category: 'Coding', title: 'Debug an Error', description: 'Diagnose and fix any error message systematically', tags: ['debug', 'error', 'fix'],
    prompt: `You are an expert debugger. I have the following error:

Error message: [ERROR MESSAGE]
Language/framework: [LANGUAGE/FRAMEWORK]
What I was trying to do: [INTENT]

Code context:
[PASTE RELEVANT CODE]

Please: (1) Explain exactly why this error occurs, (2) Provide the fixed code, (3) Explain what was wrong and how the fix resolves it.` },
  { id: 'explain-code', category: 'Coding', title: 'Explain Code', description: 'Get a plain-English explanation of any code', tags: ['code', 'explain', 'learning'],
    prompt: `Explain the following code to me as if I understand programming basics but am not familiar with this specific pattern/library/language.

Break down:
1. What it does at a high level
2. What each section does, step by step
3. Any non-obvious patterns or concepts used
4. Potential issues or gotchas

Code:
[PASTE CODE HERE]` },
  { id: 'write-tests', category: 'Coding', title: 'Write Unit Tests', description: 'Generate comprehensive unit tests for any function', tags: ['testing', 'unit tests', 'code'],
    prompt: `Write comprehensive unit tests for the following function. Use [TESTING FRAMEWORK: e.g. Jest/pytest/JUnit].

Cover these cases:
- Happy path (expected inputs)
- Edge cases (empty, null, zero, negative, very large values)
- Error/exception cases
- Boundary conditions

Function to test:
[PASTE FUNCTION HERE]` },
  // Writing
  { id: 'blog-outline', category: 'Writing', title: 'Blog Post Outline', description: 'Create an SEO-optimized blog post outline', tags: ['blog', 'writing', 'seo', 'outline'],
    prompt: `Create a detailed SEO-optimized outline for a blog post about: [TOPIC]

Target audience: [AUDIENCE]
Target keyword: [KEYWORD]
Desired word count: [WORD COUNT]

Include:
- An engaging H1 title (include keyword)
- Meta description (under 160 characters)
- H2 and H3 subheadings
- Key points to cover under each section
- Suggested internal and external links
- CTA for the conclusion` },
  { id: 'email-rewrite', category: 'Writing', title: 'Rewrite Email', description: 'Make any email clearer, more professional, and more effective', tags: ['email', 'writing', 'professional'],
    prompt: `Rewrite the following email to be [TONE: professional/friendly/concise/persuasive].

Goals for the rewrite:
- Clear subject line
- One-sentence purpose statement at the top
- Logical flow
- Specific ask or next steps
- Appropriate length (no padding)

Original email:
[PASTE EMAIL HERE]` },
  { id: 'product-description', category: 'Writing', title: 'Product Description', description: 'Write compelling product copy that converts', tags: ['marketing', 'ecommerce', 'copy'],
    prompt: `Write a compelling product description for: [PRODUCT NAME]

Key features: [LIST FEATURES]
Target customer: [TARGET CUSTOMER]
Price point: [PRICE]
Tone: [TONE]

Include: a hook headline, emotional benefits (not just features), key specs, social proof placeholder, and a clear CTA. Keep it under 200 words.` },
  // Data Analysis
  { id: 'analyze-data', category: 'Data Analysis', title: 'Analyze Dataset', description: 'Get insights and patterns from any dataset', tags: ['data', 'analysis', 'insights'],
    prompt: `Analyze the following dataset and provide:

1. Summary statistics (mean, median, range for numeric columns)
2. Key patterns and trends
3. Anomalies or outliers to investigate
4. Top 3 actionable insights
5. Suggested follow-up analyses

Dataset:
[PASTE DATA HERE]` },
  { id: 'sql-query', category: 'Data Analysis', title: 'Write SQL Query', description: 'Generate complex SQL queries from plain English', tags: ['sql', 'database', 'query'],
    prompt: `Write an optimized SQL query to [DESCRIBE WHAT YOU WANT].

Database: [MySQL/PostgreSQL/SQLite/etc.]

Table schema:
[PASTE CREATE TABLE STATEMENTS OR DESCRIBE TABLES]

Requirements:
- [Requirement 1]
- [Requirement 2]

Also explain what the query does and any performance considerations.` },
  { id: 'chart-suggestion', category: 'Data Analysis', title: 'Choose the Right Chart', description: 'Get recommendations for visualizing your data', tags: ['data', 'visualization', 'charts'],
    prompt: `I have the following data and want to create a visualization:

Data description: [DESCRIBE YOUR DATA]
What I want to show: [INSIGHT OR STORY]
Audience: [WHO WILL SEE THIS]
Tool I'll use: [Excel/Tableau/Python/D3.js/etc.]

Recommend: (1) The best chart type and why, (2) Configuration tips (colors, labels, axes), (3) What to avoid for this data type, (4) Sample code/steps if applicable.` },
  // SEO & Marketing
  { id: 'meta-tags', category: 'SEO', title: 'Generate Meta Tags', description: 'Create optimized title tags and meta descriptions', tags: ['seo', 'meta', 'marketing'],
    prompt: `Generate SEO-optimized meta tags for the following page:

Page topic: [TOPIC]
Target keyword: [PRIMARY KEYWORD]
Secondary keywords: [SECONDARY KEYWORDS]
Page type: [Blog post / Product page / Landing page / etc.]

Provide:
1. Title tag (50-60 chars, includes primary keyword)
2. Meta description (150-160 chars, compelling, includes keyword)
3. 3 alternative title tag options
4. OG title and description for social sharing` },
  { id: 'social-posts', category: 'SEO', title: 'Social Media Posts', description: 'Create platform-specific posts from any content', tags: ['social media', 'marketing', 'content'],
    prompt: `Create platform-specific social media posts for the following content:

Content summary: [DESCRIBE YOUR CONTENT/ANNOUNCEMENT]
Brand voice: [PROFESSIONAL/CASUAL/WITTY/etc.]
Goal: [AWARENESS/ENGAGEMENT/CLICKS/etc.]

Generate posts for:
- LinkedIn (professional, 1-3 paragraphs, no hashtag spam)
- Twitter/X (under 280 chars, punchy, 2-3 relevant hashtags)
- Instagram caption (engaging opener, storytelling, 5-10 hashtags)` },
  // Productivity
  { id: 'meeting-summary', category: 'Productivity', title: 'Meeting Summary', description: 'Turn messy meeting notes into structured summaries', tags: ['meetings', 'productivity', 'notes'],
    prompt: `Convert the following meeting notes into a structured summary:

[PASTE NOTES HERE]

Format the output as:
## Meeting Summary
**Date:** [DATE]
**Attendees:** [NAMES]

### Key Decisions
- [Decision 1]

### Action Items
| Task | Owner | Deadline |
|------|-------|----------|

### Next Steps
[What happens next]` },
  { id: 'job-description', category: 'Productivity', title: 'Write Job Description', description: 'Create inclusive, compelling job postings', tags: ['hiring', 'hr', 'recruiting'],
    prompt: `Write a compelling, inclusive job description for a [JOB TITLE] role.

Company: [COMPANY NAME/TYPE]
Department: [DEPARTMENT]
Key responsibilities: [LIST 3-5]
Required skills: [LIST SKILLS]
Nice-to-have: [OPTIONAL SKILLS]
Salary range: [RANGE or "Competitive"]

Make it: specific (avoid vague buzzwords), inclusive (avoid gendered language), compelling (sell the role and company), and under 500 words.` },
  // Summarization
  { id: 'summarize-long', category: 'Summarization', title: 'Summarize Long Document', description: 'Condense any document to its key points', tags: ['summary', 'reading', 'productivity'],
    prompt: `Summarize the following document. Provide:

1. **TL;DR** (2-3 sentences max)
2. **Key Points** (5-7 bullet points)
3. **Important Details** (numbers, dates, names that matter)
4. **Action Items** (if any)
5. **What's NOT covered** (gaps or caveats)

Document:
[PASTE DOCUMENT HERE]` },
];

const CATEGORIES = Array.from(new Set(TEMPLATES.map(t => t.category)));

const PromptTemplateLibrary: React.FC<ToolProps> = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  const [customized, setCustomized] = useState('');
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => TEMPLATES.filter(t =>
    (activeCategory === 'All' || t.category === activeCategory) &&
    (search === '' || t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()) || t.tags.some(tag => tag.includes(search.toLowerCase())))
  ), [search, activeCategory]);

  const openTemplate = useCallback((t: Template) => {
    setActiveTemplate(t);
    setCustomized(t.prompt);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!customized) return;
    await navigator.clipboard.writeText(customized);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [customized]);

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prompt Template Library</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
          {TEMPLATES.length}+ battle-tested prompts for coding, writing, data analysis, SEO, and more. Customize and copy in one click.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
          <div className="space-y-1">
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                {cat} {cat === 'All' ? `(${TEMPLATES.length})` : `(${TEMPLATES.filter(t => t.category === cat).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Template list or detail */}
        {!activeTemplate ? (
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map(t => (
              <button
                key={t.id}
                onClick={() => openTemplate(t)}
                className="text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{t.title}</h3>
                  <span className="shrink-0 px-2 py-0.5 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">{t.category}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{t.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {t.tags.slice(0, 3).map(tag => <span key={tag} className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400">{tag}</span>)}
                </div>
              </button>
            ))}
            {filtered.length === 0 && <p className="col-span-2 text-center py-8 text-gray-400 text-sm">No templates match your search.</p>}
          </div>
        ) : (
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveTemplate(null)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                ← Back to library
              </button>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="px-2 py-0.5 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">{activeTemplate.category}</span>
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">{activeTemplate.title}</h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{activeTemplate.description}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">Customize the template below, then copy it.</p>
            <textarea
              value={customized}
              onChange={e => setCustomized(e.target.value)}
              rows={18}
              className="w-full p-4 text-sm font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setCustomized(activeTemplate.prompt)}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
              >Reset</button>
              <button
                onClick={handleCopy}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >{copied ? '✓ Copied!' : 'Copy Prompt'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptTemplateLibrary;
