# Blog SEO Rewrite — Progress Tracker

> **Purpose:** Resume blog SEO rewrites across sessions without losing progress.
> When starting a new session, read this file first and continue from the first unchecked Tier 1 → 2 → 3 → 4 item.

## Goal
Rewrite all 32 blogs in `lib/blogs.ts` for SEO + practical usefulness + strong internal CTAs to `/tools/*` pages. Reason for the work: blogs were getting zero traffic — root cause was missing per-blog metadata (now fixed) plus generic content with no link-worthy hooks.

## Template (applied to every blog)
1. **`seoTitle`** — keyword-front-loaded, ~55-65 chars, distinct from H1
2. **`seoDescription`** — 140-160 chars with primary keyword + value prop
3. **`keywords`** — 6-10 focused phrases (used in meta + JSON-LD Article)
4. **`updatedDate`** — set to current rewrite date (`2026-05-31`)
5. **Content structure:**
   - **TL;DR** with 2-3 internal CTAs in first 50 words (front-loaded for Google snippets + click-through)
   - **Problem section** — listicle of common pain points (link-bait)
   - **How-to** in numbered steps mentioning the tool by name
   - **Code/data example** (before/after, real snippet, table, etc.)
   - **Privacy / differentiation** paragraph (browser-based, no upload)
   - **FAQ** — 4-6 questions (eligible for "People also ask")
   - **CTA list** linking 3 related tools + category page

## Infra (already complete — DO NOT redo)
- [x] `types.ts` — added `seoTitle`, `seoDescription`, `keywords`, `updatedDate` on `Blog` interface
- [x] `lib/schema.ts` — `getArticleSchema()` helper added
- [x] `app/blogs/[blogId]/page.tsx` — `generateMetadata` (title/desc/OG/Twitter/canonical) + `<Schema>` for Article + BreadcrumbList JSON-LD
- [x] `app/sitemap.ts` — already includes blog routes (no change needed)

## Tier 1 — Popular tools per `sitemap.ts` (do first)
- [x] `guide-json-formatter-validator` → json-formatter (sample, approved)
- [x] `importance-of-strong-passwords` → password-generator
- [x] `image-optimization-seo-guide` → image-compressor
- [x] `uuid-guide-for-developers` → uuid-generator
- [x] `base64-encoding-developers` → base64-converter
- [x] `welcome-to-utiltoolkits-2025` → general (site intro, links all 3 popular tools)

## Tier 2 — High developer-search volume / commercial intent
- [x] `jwt-debugging-guide` → jwt-debugger
- [x] `regex-beginners-guide` → regex-tester
- [x] `sql-formatting-best-practices` → sql-formatter
- [x] `mastering-meta-tags-seo` → meta-tag-generator
- [x] `seo-writing-metrics-guide` → word-counter
- [x] `url-encoding-explained` → url-encoder
- [x] `cron-jobs-explained` → cron-generator
- [x] `pdf-management-guide` → pdf-merger/splitter/compressor

## Tier 3 — Medium-volume practical topics
- [x] `create-stunning-css-gradients` → css-gradient-generator
- [x] `markdown-tables-made-easy` → markdown-table-generator
- [x] `qr-codes-marketing-guide` → qr-code-generator
- [x] `unix-timestamp-debugging` → unix-timestamp-converter
- [x] `image-to-base64-guide` → image-to-base64
- [x] `image-resizing-web-guide` → image-resizer
- [x] `understanding-loan-amortization` → loan-calculator
- [x] `timezone-management-remote-work` → timezone-converter
- [x] `code-diff-checking-guide` → diff-checker
- [x] `text-to-speech-guide` → text-to-speech
- [x] `color-theory-web-design` → color-palette-generator

## Tier 4 — Long-tail / lower priority
- [ ] `daily-unit-conversions-guide` → unit-converter
- [ ] `text-cleaning-automation` → text-cleaner
- [ ] `randomizing-lists-fairness` → list-randomizer
- [ ] `string-escaping-security` → string-escaper
- [ ] `html-entities-guide` → html-entity
- [ ] `cleaning-data-duplicates` → duplicate-remover
- [ ] `text-case-formatting-guide` → case-converter

## After every batch
- Check off the completed items above
- `git add lib/blogs.ts blog_task.md && git commit` with message like `blogs: SEO rewrite tier 1 batch (5 posts)`

## Verification (run once after all tiers done)
```powershell
npm run dev
# Spot-check 3 random blogs in browser, view source for <title>/JSON-LD
npm run build  # confirm static generation works for all blog routes
```
