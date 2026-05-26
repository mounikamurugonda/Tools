#!/usr/bin/env node
/**
 * Completeness check for tool SEO content.
 *
 * Verifies, for every tool registered in `constants.tsx`:
 *   - `seoTitle`, `seoDescription`, `keywords` (>=3) are present
 *   - a matching entry exists in `lib/tool-details.ts` with all required
 *     ToolDetails fields populated and FAQs >= 3
 *
 * Exits non-zero on failure so it can gate CI.
 *
 * Usage:  node scripts/check-tool-details.mjs
 *
 * Implementation note: we regex-parse the two TS files instead of
 * spinning up a TS runtime, so this script has zero dependencies.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONSTANTS = path.join(ROOT, 'constants.tsx');
const DETAILS = path.join(ROOT, 'lib', 'tool-details.ts');

const REQUIRED_DETAIL_FIELDS = [
  'introduction',
  'howToUse',
  'features',
  'privacy',
  'explanation',
  'usageExamples',
  'underlyingConcept',
  'faqs',
];

const MIN_FAQS = 3;
const MIN_KEYWORDS = 3;
const MIN_HOW_TO_USE = 2;
const MIN_FEATURES = 3;
const MIN_USAGE_EXAMPLES = 2;

const red = s => `\x1b[31m${s}\x1b[0m`;
const yellow = s => `\x1b[33m${s}\x1b[0m`;
const green = s => `\x1b[32m${s}\x1b[0m`;
const dim = s => `\x1b[2m${s}\x1b[0m`;

function readFile(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch (e) {
    console.error(red(`Cannot read ${p}: ${e.message}`));
    process.exit(2);
  }
}

/** Parse the TOOLS array entries from constants.tsx. Returns array of tool meta objects. */
function parseTools(src) {
  const tools = [];
  // Match each object literal that contains an `id:` property in the TOOLS array.
  // We isolate the TOOLS array body first.
  const startMatch = src.match(/export const TOOLS\s*:\s*Tool\[\]\s*=\s*\[/);
  if (!startMatch) {
    throw new Error('Could not locate TOOLS array in constants.tsx');
  }
  const startIdx = startMatch.index + startMatch[0].length;

  // Walk braces to find the matching closing `];`
  let depth = 1;
  let i = startIdx;
  while (i < src.length && depth > 0) {
    const c = src[i];
    if (c === '[') depth++;
    else if (c === ']') depth--;
    i++;
  }
  const body = src.slice(startIdx, i - 1);

  // Split into per-tool object literals at top level
  const objs = [];
  let braceDepth = 0;
  let chunkStart = -1;
  for (let j = 0; j < body.length; j++) {
    const ch = body[j];
    if (ch === '{') {
      if (braceDepth === 0) chunkStart = j;
      braceDepth++;
    } else if (ch === '}') {
      braceDepth--;
      if (braceDepth === 0 && chunkStart !== -1) {
        objs.push(body.slice(chunkStart, j + 1));
        chunkStart = -1;
      }
    }
  }

  for (const obj of objs) {
    const idMatch = obj.match(/\bid\s*:\s*['"]([^'"]+)['"]/);
    if (!idMatch) continue;
    const id = idMatch[1];
    const seoTitle = /\bseoTitle\s*:\s*['"`]/.test(obj);
    const seoDescription = /\bseoDescription\s*:\s*['"`]/.test(obj);
    const description = /\bdescription\s*:\s*['"`]/.test(obj);
    const keywordsMatch = obj.match(/\bkeywords\s*:\s*\[([\s\S]*?)\]/);
    const keywords = keywordsMatch
      ? (keywordsMatch[1].match(/['"][^'"]+['"]/g) ?? []).length
      : 0;
    tools.push({ id, seoTitle, seoDescription, description, keywords });
  }
  return tools;
}

/** Parse the TOOL_DETAILS record keys from lib/tool-details.ts and check their content. */
function parseDetails(src) {
  const details = {};
  // Top-level keys appear as `'id':` or `"id":` or `'id': {` after the opening of TOOL_DETAILS.
  const startMatch = src.match(/export const TOOL_DETAILS\s*:\s*Record<string,\s*ToolDetails>\s*=\s*\{/);
  if (!startMatch) {
    throw new Error('Could not locate TOOL_DETAILS in lib/tool-details.ts');
  }
  const startIdx = startMatch.index + startMatch[0].length;

  // Walk to matching closing brace
  let depth = 1;
  let i = startIdx;
  while (i < src.length && depth > 0) {
    const c = src[i];
    if (c === '{') depth++;
    else if (c === '}') depth--;
    i++;
  }
  const body = src.slice(startIdx, i - 1);

  // Split top-level entries: each starts with `'id':` or `"id":` at brace depth 0
  let braceDepth = 0;
  let entryStart = -1;
  let currentId = null;

  // We do a single pass tracking depth; capture each entry's body between { ... }
  let j = 0;
  while (j < body.length) {
    if (braceDepth === 0) {
      // Try to read a key at top level
      const slice = body.slice(j);
      const keyMatch = slice.match(/^[\s,]*['"]([^'"]+)['"]\s*:\s*\{/);
      if (keyMatch) {
        currentId = keyMatch[1];
        j += keyMatch[0].length;
        braceDepth = 1;
        entryStart = j;
        continue;
      }
    }
    const ch = body[j];
    if (ch === '{') braceDepth++;
    else if (ch === '}') {
      braceDepth--;
      if (braceDepth === 0 && currentId) {
        const entryBody = body.slice(entryStart, j);
        details[currentId] = analyzeDetailEntry(entryBody);
        currentId = null;
      }
    }
    j++;
  }
  return details;
}

function analyzeDetailEntry(entryBody) {
  const has = name => new RegExp(`\\b${name}\\s*:`).test(entryBody);
  const arrayLen = name => {
    const m = entryBody.match(new RegExp(`\\b${name}\\s*:\\s*\\[([\\s\\S]*?)\\]`));
    if (!m) return 0;
    // Count string literals OR object literals (for faqs)
    if (name === 'faqs') {
      return (m[1].match(/question\s*:/g) ?? []).length;
    }
    return (m[1].match(/['"`][^'"`]+['"`]/g) ?? []).length;
  };
  return {
    present: true,
    fieldsPresent: REQUIRED_DETAIL_FIELDS.filter(has),
    fieldsMissing: REQUIRED_DETAIL_FIELDS.filter(f => !has(f)),
    counts: {
      howToUse: arrayLen('howToUse'),
      features: arrayLen('features'),
      usageExamples: arrayLen('usageExamples'),
      faqs: arrayLen('faqs'),
    },
  };
}

function main() {
  const tools = parseTools(readFile(CONSTANTS));
  const details = parseDetails(readFile(DETAILS));

  const errors = [];
  const warnings = [];

  for (const t of tools) {
    const prefix = `[${t.id}]`;
    if (!t.description) errors.push(`${prefix} missing description in TOOLS`);
    if (!t.seoTitle) errors.push(`${prefix} missing seoTitle in TOOLS`);
    if (!t.seoDescription) errors.push(`${prefix} missing seoDescription in TOOLS`);
    if (t.keywords < MIN_KEYWORDS)
      errors.push(`${prefix} keywords < ${MIN_KEYWORDS} (got ${t.keywords})`);

    const d = details[t.id];
    if (!d) {
      errors.push(`${prefix} no entry in TOOL_DETAILS (falls back to generic SEO content)`);
      continue;
    }
    if (d.fieldsMissing.length) {
      errors.push(`${prefix} TOOL_DETAILS missing fields: ${d.fieldsMissing.join(', ')}`);
    }
    if (d.counts.faqs < MIN_FAQS)
      errors.push(`${prefix} faqs < ${MIN_FAQS} (got ${d.counts.faqs})`);
    if (d.counts.howToUse < MIN_HOW_TO_USE)
      warnings.push(`${prefix} howToUse < ${MIN_HOW_TO_USE} (got ${d.counts.howToUse})`);
    if (d.counts.features < MIN_FEATURES)
      warnings.push(`${prefix} features < ${MIN_FEATURES} (got ${d.counts.features})`);
    if (d.counts.usageExamples < MIN_USAGE_EXAMPLES)
      warnings.push(`${prefix} usageExamples < ${MIN_USAGE_EXAMPLES} (got ${d.counts.usageExamples})`);
  }

  // Orphan details (entry exists but no tool registered)
  const toolIds = new Set(tools.map(t => t.id));
  for (const id of Object.keys(details)) {
    if (!toolIds.has(id)) warnings.push(`[${id}] orphan TOOL_DETAILS entry (no matching tool)`);
  }

  console.log(`Tools: ${tools.length}    With TOOL_DETAILS: ${Object.keys(details).length}`);
  console.log(dim('-'.repeat(72)));

  if (warnings.length) {
    console.log(yellow(`Warnings (${warnings.length}):`));
    for (const w of warnings) console.log(yellow('  ! ') + w);
  }
  if (errors.length) {
    console.log(red(`\nErrors (${errors.length}):`));
    for (const e of errors) console.log(red('  x ') + e);
    console.log(red(`\nFAILED — fix ${errors.length} issue(s).`));
    process.exit(1);
  }

  console.log(green(`OK — all ${tools.length} tools have complete SEO content.`));
}

main();
