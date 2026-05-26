# E2E Completion Plan — utiltoolkits-next

> Living checklist for taking the site to portfolio-grade end-to-end completion. Pair this with `AI_PROMPT.md`.
> **Update this file after every session.** Tick boxes, add findings, link PRs/commits.

---

## Phase 0 — Foundations (do once, before category sweeps)

These are repo-wide fixes. They unblock every later category.

- [~] **Design-system audit.** Current `components/ui/*`: Button, Card, CustomSelect, FileUpload, Input, Label, Select, Slider, Tabs, TextArea, Toast, ToastProvider. Missing-and-likely-needed primitives identified for category sweeps: `Accordion` (FAQ blocks), `EmptyState`, `ProgressBar` (video/image tools), `CodeBlock` (with built-in copy). **Deferred to category sweeps** — add only when 3+ tools genuinely need each one, to avoid speculative abstraction.
- [~] **Theme token sweep.** Tailwind tokens defined: `light-background`, `dark-background`, `light-text`, `dark-text`, `accent.{DEFAULT,hover,light}`. Most tool code uses raw `gray-*` / `blue-*` Tailwind classes (acceptable). **Deferred to category sweeps** — per-tool replacement is safer than a blind global grep, and each sweep already includes a "dark/light mode renders correctly" check.
- [x] **`FileUpload` capability matrix.** Consolidated `components/FileUpload.tsx` + `components/ui/FileUpload.tsx` into a single primitive. Now supports: click-to-pick, drag-drop, clipboard paste (Ctrl/Cmd+V), multi-file via `multiple`+`onFilesSelect`, MIME validation, `maxSizeMB`, selected-file chip with remove, `useId` so multiple instances on a page no longer collide, focus-visible ring + Enter/Space keyboard activation, `onError` callback. Migrated 4 callers (`WatermarkAdder`, `MemeGenerator`, `ImageToBase64`, `ImageConverter`). Deleted `components/FileUpload.tsx`. TS clean.
- [x] **Toast pattern.** Added `components/ui/ToastProvider.tsx` exposing `<ToastProvider>` + `useToast()` hook (`.success`, `.error`, `.info`, `.show`, `.dismiss`). Stacks multiple toasts, auto-dismiss with per-type defaults, ARIA live region. Mounted in `app/layout.tsx`. Use during category sweeps: `const toast = useToast(); toast.success('Copied!')`.
- [x] **Lazy-load wrapper.** `lib/lazy.ts` exports `lazyTool()` — thin wrapper around `next/dynamic` with `ssr: false` + default skeleton. Use during category sweeps to split heavy tools (Monaco, FFmpeg, transformers, kokoro, onnxruntime).
- [x] **Web Worker harness.** `lib/worker-runner.ts` exports `createInlineWorker(fn)` — turns a self-contained function into a one-shot off-thread runner with main-thread fallback when Worker is unavailable. Use during TEXT/CODING sweeps for dedupe, hashing, big regex.
- [x] **`ToolDetails` completeness check.** `scripts/check-tool-details.mjs` (zero-dep Node script). Regex-parses `constants.tsx` + `lib/tool-details.ts` and verifies SEO meta + TOOL_DETAILS fields + FAQ count. Exposed via `npm run check:tool-details`. Current state: 5 errors + 3 warnings — see below; fix during category sweeps.

**Tool-detail gaps surfaced (fix during category sweeps):**
- `screen-info` — missing `seoTitle`, `seoDescription` in `TOOLS`
- `comma-separator` — no entry in `TOOL_DETAILS`
- `markdown-previewer` — only 2 FAQs (need ≥3)
- `todo-list` — only 2 FAQs (need ≥3)
- `gif-maker` — 0 `usageExamples`
- `csv-to-json`, `json-to-csv` — orphan TOOL_DETAILS entries (no matching tool registered)
- [x] **SEO smoke test.** `e2e/seo-smoke.spec.ts` visits one representative tool per category + 7 static pages and asserts: non-empty `<title>` (not the not-found fallback), `<meta name="description">`, `og:title/description/image`, `twitter:card`, `<link rel="canonical">`, and at least one parseable JSON-LD block. Runs via `npm test`. Sampled rather than exhaustive to keep CI fast — `link-validation.spec.ts` already covers all 95 routes.
- [ ] **Lighthouse baseline.** Capture current Performance / SEO / Accessibility / Best Practices scores for 5 representative tools. Record below. Re-measure at end of each phase. **User action: run `npm run build && npm start` then Lighthouse on the URLs in the table below.**
- [ ] **Bundle audit.** `next build` → analyze. Identify routes >300KB JS. Note offenders here. **User action: run `npm run build` and paste output.**
- [x] **404 / loading.tsx / error.tsx** present and on-theme. Added `app/loading.tsx` (route-wide skeleton), `app/error.tsx` (per-route error boundary with retry + back-home + error digest), `app/global-error.tsx` (top-level boundary that owns its own `<html>`). Existing `app/not-found.tsx` and `app/tools/[toolId]/loading.tsx` kept as-is.

**Lighthouse baseline (fill in):**

| Tool | Perf | SEO | A11y | Best | Notes |
|---|---|---|---|---|---|
| / |  |  |  |  | |
| /tools |  |  |  |  | |
| /tools/json-formatter |  |  |  |  | |
| /tools/image-compressor |  |  |  |  | |
| /tools/video-compressor |  |  |  |  | |

---

## Phase 1 — Category sweeps

Order chosen for ROI: start with categories where SEO content and consistency wins are largest, end with the heaviest (video) once the patterns are settled.

For each tool, run the **§6 checklist from `AI_PROMPT.md`**. Add a sub-bullet per tool noting findings + the commit that fixed them.

### 1A. TEXT — Text Tools (14)

Source of truth: tools in `constants.tsx` with `category: ToolCategory.TEXT`.

- [ ] case-converter
- [ ] word-counter
- [ ] character-counter
- [ ] lorem-ipsum-generator
- [ ] text-reverser
- [ ] text-cleaner
- [ ] slug-generator
- [ ] markdown-table-generator
- [ ] markdown-previewer
- [ ] duplicate-remover
- [ ] hashtag-extractor
- [ ] fancy-font-generator
- [ ] readability-score-calculator
- [ ] keyword-density-analyzer
- [ ] comma-separator

**Cross-cutting for TEXT:** all text tools must accept paste + `.txt`/`.md` upload + drag-drop. Word/char/line stats footer if applicable. Worker offload above 1MB.

### 1B. CODING — Coding Tools (~24)

Largest category. Most likely AdSense-friendly (developer search intent).

- [ ] json-to-typescript
- [ ] code-to-image
- [ ] sql-formatter
- [ ] cron-generator
- [ ] meta-tag-generator
- [ ] chmod-calculator
- [ ] xml-formatter
- [ ] binary-converter
- [ ] string-escaper
- [ ] json-yaml-converter
- [ ] (fill in remaining ~14)

**Cross-cutting for CODING:** Monaco-based editors must be lazy. Format/minify pairs should share input pane. Add "load sample" button for instant demo.

### 1C. CSS — CSS Tools (~8)

- [ ] css-triangle-generator
- [ ] (fill in remaining ~7)

**Cross-cutting for CSS:** every generator needs a live preview using shared `<PreviewCard/>`. "Copy CSS" + "Copy Tailwind" buttons where possible.

### 1D. COLOR — Color Tools (~4)

- [ ] contrast-checker
- [ ] (fill in remaining ~3)

### 1E. MATH — Calculator Tools (~9)

- [ ] percentage-calculator
- [ ] (fill in remaining ~8)

### 1F. PRODUCTIVITY — Productivity Tools (~8)

- [ ] utm-builder
- [ ] (fill in remaining ~7)

### 1G. FUN — Fun Tools (~4)

- [ ] morse-converter
- [ ] list-randomizer
- [ ] (fill in remaining ~2)

### 1H. IMAGE — Image Tools (~13)

- [ ] aspect-ratio-calculator
- [ ] svg-to-data-uri
- [ ] (fill in remaining ~11)

**Cross-cutting for IMAGE:** all image tools share an upload pattern (FileUpload + drag-drop + paste-from-clipboard). Output: download + copy data-URI. Size limit warning at 20MB.

### 1I. VIDEO — Video Tools (~7)

- [ ] (fill in all 7)

**Cross-cutting for VIDEO:** ffmpeg.wasm loads ONCE per session. Show a single "Loading FFmpeg core (~30MB)" progress bar. Consider routing all video tools through a shared `useFFmpeg()` hook so the WASM module is cached.

### 1J. MISC — Other Tools (~2)

- [ ] password-strength
- [ ] (fill in remaining 1)

---

## Phase 2 — Cross-cutting polish

After all categories pass §6:

- [ ] **Homepage.** Hero + "featured tools" grid + category cards + recently-used (localStorage). Smooth, on-brand.
- [ ] **Tools index (`/tools`).** Search + filter by category + tag. Keyboard-first.
- [ ] **Category page (`/tools/category/[name]`).** Long-form intro for SEO (~150 words/category) + tool grid.
- [ ] **Blog (`/blogs`).** At least 5 cornerstone posts linking to tools. Helps AdSense + SEO.
- [ ] **Sitemap + robots.** Confirm `sitemap.ts` lists every tool + category + blog. Confirm `robots.ts` allows crawling.
- [ ] **Open Graph images.** Generate per-tool OG image (`/og-${tool.id}.png`) or fall back gracefully.
- [ ] **Analytics.** Verify GA + GTM + AdSense load only in production, do not block render.
- [ ] **Cookie / privacy banner.** EU + AdSense compliance.
- [ ] **404 / not-found.** On-theme with helpful links.
- [ ] **Internationalization-readiness.** All strings sourced from one place if we plan to translate.

## Phase 3 — Performance + a11y final pass

- [ ] All routes ≥90 Performance, ≥95 SEO, ≥95 A11y, ≥95 Best Practices on Lighthouse mobile.
- [ ] No CLS > 0.05 on any tool page.
- [ ] LCP < 2.5s on `/`, `/tools`, top 10 tool pages.
- [ ] Tab order audited; all interactive elements reachable + visible focus.
- [ ] `eslint-plugin-jsx-a11y` clean.
- [ ] Tested with `prefers-reduced-motion`.
- [ ] Smooth-scroll (`lenis`) does not break anchor links or browser back/forward.

## Phase 4 — Launch readiness

- [ ] `npm run lint` clean
- [ ] `npm run build` clean
- [ ] `npm run knip` — review and remove dead code
- [ ] `npm run test:e2e` — green on CI
- [ ] AdSense account submission checklist done (substantive content + privacy + about + contact)
- [ ] README polished for portfolio reviewers

---

## Session log

Append one entry per work session. Newest at top.

### 2026-05-26 — Phase 0 (mostly) complete
- Created `AI_PROMPT.md` + `TASK_PLAN.md`; saved motto + goals to Claude memory.
- User chose: Phase 0 first, per-tool refactor scope, one commit per concern.
- **Phase 0 commits landed:**
  1. `52c913d` planning docs
  2. `887dec7` FileUpload consolidation (fix id collision, add paste/multi/validation)
  3. `38e155d` Toast provider + tool-details completeness check
  4. `818a93f` SEO smoke spec + lazyTool helper + Worker harness
  5. `b70c207` route loading + error + global-error boundaries
- Deferred to category sweeps: design-system gap-filling, theme token cleanup.
- Deferred to user: Lighthouse baseline + bundle audit (require running build).
- Next: start TEXT category sweep against the §6 checklist.
