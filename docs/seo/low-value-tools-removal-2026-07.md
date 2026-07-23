# Low-Value Tool Delisting — 2026-07-22

## Why

GSC validation for **"Crawled – currently not indexed"** (started 16 Jun 2026) **failed on 1 Jul 2026**: Google recrawled 13 tool pages between 24 Jun and 4 Jul 2026 and again declined to index them, even after all Phase 1–4 fixes from `GOOGLE_INDEXING.md` (unique meta, FAQ/HowTo JSON-LD, internal linking, sitemap hygiene) had shipped. 45 more pages remain pending.

These pages are commodity utilities (age calculator, QR generator, random number generator, world clock…) competing against thousands of established sites. Google's verdict after two crawls is a quality signal: to Google, they are thin duplicative content that drags down the whole site's quality score and wastes crawl budget. Pruning them concentrates authority on the pages that actually earn impressions.

## Evidence (GSC, 3 months to 2026-07-20)

Site-wide: 21 clicks, 10.8k impressions.

### The 13 failed-validation URLs vs traffic

| Tool | Clicks | Impressions | Decision |
| --- | --- | --- | --- |
| percentage-calculator | 0 | 535 | **KEEP** — highest tool impressions on site after utm-builder; ranking, just not clicked yet |
| markdown-table-generator | 1 | 79 | **KEEP** — has a real click |
| list-randomizer | 0 | 80 | REMOVE |
| string-escaper | 0 | 36 | REMOVE |
| youtube-thumbnail | 0 | 26 | REMOVE |
| text-to-speech | 0 | 16 | REMOVE |
| world-clock | 0 | 9 | REMOVE |
| qr-code-generator | 0 | 0 | REMOVE |
| age-calculator | 0 | 0 | REMOVE |
| lorem-image-generator | 0 | 0 | REMOVE |
| border-radius-generator | 0 | 0 | REMOVE |
| random-number-generator | 0 | 0 | REMOVE |
| duplicate-remover | 0 | 0 | REMOVE |

None of the 11 removed tools received a single click in 3 months; six of them received zero impressions.

## What was done (2026-07-22)

Files are **not deleted** — tools are delisted from the public site only.

1. **`constants.tsx`** — new `REMOVED_TOOL_IDS` set (11 ids). The tool array was renamed to `ALL_TOOLS` (entries intact) and the exported `TOOLS` is now `ALL_TOOLS.filter(t => !REMOVED_TOOL_IDS.has(t.id))`. Because every surface (tool page + `generateStaticParams`, `/tools` listing, category pages, footer counts, search, RelatedTools, credits, `app/sitemap.ts`) consumes `TOOLS`, the 11 tools simultaneously:
   - return **404** at `/tools/:id` (page does `TOOLS.find` → `notFound()`),
   - disappear from the **sitemap** (regenerates automatically from `TOOLS` on next build),
   - disappear from all listings, search, related-tools blocks, and footer counts.
2. **`lib/blogs.ts`** — new `HIDDEN_BLOG_IDS` set hides the 5 guides whose sole subject was a removed tool: `text-to-speech-guide`, `qr-codes-marketing-guide`, `randomizing-lists-fairness`, `string-escaping-security`, `cleaning-data-duplicates`. They drop out of `/blogs`, the blog sitemap entries, and RelatedGuides. In the remaining 10 blogs, every inline `<a href="/tools/<removed>">` link was rewritten or dropped, and `relatedTools` arrays pruned.
3. **`lib/collections.ts`** — removed `border-radius-generator` (CSS collection) and `duplicate-remover` (text collection); CSS collection SEO title/description no longer mention Border Radius.
4. **`next.config.mjs`** — `/tools/random-number` redirect repointed from the now-delisted `random-number-generator` to `/tools`.
5. **`e2e/link-validation.spec.ts`** — 11 ids removed from the crawl list.

Not changed (intentionally): `lib/tool-details.ts` entries, `TOOL_COMPONENT_MAP`, `lib/credits.ts` map, and the component files under `tools/` — all dead-but-harmless data kept so the tools can be relisted by deleting one id from `REMOVED_TOOL_IDS`.

## Expected effect in GSC

- The 11 URLs will return 404 on next crawl → move from "Crawled – currently not indexed" to "Not found (404)", then age out of the report entirely. That is the desired outcome; do **not** "fix" those 404s.
- The failed validation can be re-run ("Start new validation") after the deploy; the remaining pool is smaller and higher quality.
- Watch that `percentage-calculator` and `markdown-table-generator` (kept) eventually index; if impressions die off, they are candidates for a future prune.

## Relisting a tool

Delete its id from `REMOVED_TOOL_IDS` in `constants.tsx` (and, if applicable, its guide from `HIDDEN_BLOG_IDS` in `lib/blogs.ts`), restore any collection/blog links, and rebuild.
