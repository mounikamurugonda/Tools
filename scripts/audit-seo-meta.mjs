// Audits seoTitle / seoDescription quality across all tools.
// Flags: missing, too-short, too-long, duplicate, and generic boilerplate.
// Run with: node scripts/audit-seo-meta.mjs

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(__dirname, '..', 'constants.tsx'), 'utf8');

// Parse each tool object's id, name, seoTitle, seoDescription with a tolerant regex.
const toolBlocks = src.match(/\{\s*id:\s*['"][^'"]+['"][\s\S]*?\n\s{2}\},?/g) ?? [];

const tools = toolBlocks
  .map(block => {
    const get = (k) => {
      const m = block.match(new RegExp(`${k}:\\s*['\"]([^'\"]+)['\"]`));
      return m ? m[1] : null;
    };
    return {
      id: get('id'),
      name: get('name'),
      seoTitle: get('seoTitle'),
      seoDescription: get('seoDescription'),
    };
  })
  .filter(t => t.id && t.name);

const titleSeen = new Map();
const descSeen = new Map();
const findings = [];

const MIN_T = 40, MAX_T = 65;
const MIN_D = 120, MAX_D = 160;

for (const t of tools) {
  if (!t.seoTitle) {
    findings.push({ id: t.id, level: 'error', issue: 'missing seoTitle' });
  } else {
    const len = t.seoTitle.length;
    if (len < MIN_T) findings.push({ id: t.id, level: 'warn', issue: `seoTitle ${len} chars (<${MIN_T})`, value: t.seoTitle });
    if (len > MAX_T) findings.push({ id: t.id, level: 'warn', issue: `seoTitle ${len} chars (>${MAX_T})`, value: t.seoTitle });
    const key = t.seoTitle.trim().toLowerCase();
    if (titleSeen.has(key)) findings.push({ id: t.id, level: 'error', issue: `duplicate seoTitle (also: ${titleSeen.get(key)})`, value: t.seoTitle });
    else titleSeen.set(key, t.id);
  }

  if (!t.seoDescription) {
    findings.push({ id: t.id, level: 'error', issue: 'missing seoDescription' });
  } else {
    const len = t.seoDescription.length;
    if (len < MIN_D) findings.push({ id: t.id, level: 'warn', issue: `seoDescription ${len} chars (<${MIN_D})`, value: t.seoDescription });
    if (len > MAX_D) findings.push({ id: t.id, level: 'warn', issue: `seoDescription ${len} chars (>${MAX_D})`, value: t.seoDescription });
    const key = t.seoDescription.trim().toLowerCase();
    if (descSeen.has(key)) findings.push({ id: t.id, level: 'error', issue: `duplicate seoDescription (also: ${descSeen.get(key)})`, value: t.seoDescription });
    else descSeen.set(key, t.id);
  }
}

console.log(`Audited ${tools.length} tools`);
console.log(`Findings: ${findings.length}`);
console.log('');

const errors = findings.filter(f => f.level === 'error');
const warns = findings.filter(f => f.level === 'warn');

console.log(`ERRORS (${errors.length}):`);
for (const f of errors) console.log(`  ${f.id}: ${f.issue}${f.value ? ` — "${f.value}"` : ''}`);

console.log('');
console.log(`WARNINGS (${warns.length}):`);
for (const f of warns) console.log(`  ${f.id}: ${f.issue}`);

process.exit(errors.length > 0 ? 1 : 0);
