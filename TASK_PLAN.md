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
- ~~`comma-separator` — no entry in `TOOL_DETAILS`~~ ✅ fixed during TEXT sweep
- ~~`markdown-previewer` — only 2 FAQs~~ ✅ was a script regex bug (false positive); script fix landed alongside markdown-previewer commit
- `screen-info` — missing `seoTitle`, `seoDescription` in `TOOLS` (MISC sweep)
- `todo-list` — only 2 FAQs (need ≥3) (PRODUCTIVITY sweep)
- `gif-maker` — 0 `usageExamples` (VIDEO sweep)
- ~~`csv-to-json`, `json-to-csv` — orphan TOOL_DETAILS entries (no matching tool registered)~~ ✅ resolved during CODING sweep — both entries deleted; `/tools/csv-to-json` and `/tools/json-to-csv` now 301-redirect to the bi-directional `json-csv-converter` (precedent: character-counter → word-counter)
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

- [x] case-converter — file upload, +camel/snake/kebab modes, stats footer, download, clear, toast.
- [x] word-counter — file upload, +chars-no-space/paragraphs/reading+speaking time, Twitter/SMS/meta/title length-limit gauges.
- [x] character-counter — **merged into word-counter** with 301 redirect in `next.config.mjs`; constants/TOOL_DETAILS/tools file removed; word-counter keywords extended with byte/Twitter/SMS/meta-desc terms.
- [x] lorem-ipsum-generator — paragraphs/sentences/words modes, max 1000 words, "start with Lorem ipsum…" toggle, plain/`<p>`/`<br>` HTML wrap, regenerate button, char+word footer, toast copy, download.
- [x] text-reverser — 4 modes (chars/words/lines/word-order), surrogate-pair-aware (emojis don't break), file upload, copy+download+clear toolbar, toast, aria-live output.
- [x] text-cleaner — 11 cleaning ops (collapse spaces, trim, blank-line removal, line breaks, HTML strip, dedupe, sort, smart quotes, diacritics, emoji, punctuation), file upload up to 50MB, **runs cleanText() in a Web Worker via `createInlineWorker` when input >500KB** so the UI doesn't jank, before/after stats with delta %, "apply to input" to chain operations, toast feedback.
- [x] slug-generator — Single + Batch tabs, batch file upload (.txt/.csv up to 5MB), separator picker (-/_/./*/*), max-length, lowercase, diacritics removal, stop-word removal, copy-all + download-all for batch, aria-live live preview.
- [x] word-counter — added file upload (up to 20MB), characters-without-spaces, paragraphs, reading time (225 wpm), speaking time (130 wpm), platform length-limit gauges (Twitter 280 / SMS 160 / meta desc 160 / title 60) with color-changing progress bars + aria-progressbar. Added copy/download/clear toolbar with toast feedback. aria-live on stats region.
- [ ] character-counter
- [ ] lorem-ipsum-generator
- [ ] text-reverser
- [ ] text-cleaner
- [ ] slug-generator
- [x] markdown-table-generator — full rewrite: CSV/TSV file upload + paste-from-clipboard import, per-column alignment toggle (left/center/right via header click → cycles `:--- / :---: / ---:`), aligned source formatting (padded for human-readability), add/remove row & column buttons, max 500 rows × 20 cols, download .md, toast feedback, aria-live output.
- [x] markdown-previewer — added file upload (.md/.markdown/.txt up to 5MB), copy+download for both Markdown and rendered HTML, "Sample" button to restore starter, useToast feedback. (3rd FAQ was already present — check-script had a regex bug that this batch also fixed.)
- [x] duplicate-remover — full rewrite: options (case-sensitive, trim, drop blanks, keep first/last, sort none/asc/desc with locale-aware numeric collator), file upload up to 50MB, **Web Worker for inputs >500KB**, toast feedback, total/unique/removed stats, copy + download .txt.
- [x] hashtag-extractor — full rewrite: hashtags **+ mentions** modes (Unicode-aware via `\p{L}\p{N}_`), frequency ranking with ×N badges, case-insensitive toggle, strip-symbol toggle, click-a-chip-to-copy, 3 output formats (space / csv / lines), CSV download with counts, file upload, clear button.
- [x] comma-separator — targeted polish: fixed "Commma" typo in delimiter list, added file upload (.txt/.csv), useToast on copy, replaced legacy `CopyButton` with inline button, and **added a full TOOL_DETAILS entry** (was the script's only missing-detail error).
- [x] fancy-font-generator — expanded from 6 to 13 Unicode font styles (Bold, Italic, Bold-Italic, Script, Fraktur, Double-Struck, Monospace, Sans-serif, Bubble, Small Caps, Upside-down, Strikethrough, Wide), live filter input, click-any-style-to-copy with toast, full digit support where the block contains them, replaces raw `<textarea>` with primitive.
- [x] readability-score-calculator — added 4 more metrics (Gunning Fog, SMOG, Coleman–Liau, ARI), complex-word count, longest-sentence highlight, file upload, copy + download .md report, refined Flesch ranges. Existing FRE + F-K Grade kept.
- [x] keyword-density-analyzer — full rewrite. File upload, Unicode-aware tokenizer (\p{L}\p{N}), sort by count/density/alpha, total + filtered + unique stats footer, click-any-row-to-copy keyword, CSV export with all 3 n-gram lengths in one file, replaces raw `<textarea>` with primitive.
- ~~comma-separator~~ done in previous batch.

**Cross-cutting for TEXT:** all text tools must accept paste + `.txt`/`.md` upload + drag-drop. Word/char/line stats footer if applicable. Worker offload above 1MB.

### 1B. CODING — Coding Tools (~24)

Largest category. Most likely AdSense-friendly (developer search intent).

- [x] json-formatter — pretty/minify toggle, indent (2/4/tab), sort-keys deep, error line+col display, size before→after with delta %, save .json, useToast.
- [x] base64-converter — **fix: now Unicode-safe** (TextEncoder/TextDecoder; previously btoa would throw on emojis), URL-safe (base64url) toggle, fixed Swap to actually flip mode, error surfacing.
- [x] url-encoder — `encodeURIComponent` vs `encodeURI` scope toggle (correctly preserves URI reserved chars), "+ = space" toggle for form-data, fixed Swap.
- [x] uuid-generator — batch 1-1000, v4 + v7 (time-ordered, draft RFC 9562), 4 formats (standard/UPPER/no-hyphens/{braces}), copy-all + download .txt, toast.
- [x] hash-generator — shows all 4 algorithms (SHA-1/256/384/512) simultaneously with individual copy buttons; **new file-hashing mode** up to 500MB; aria-live on hash output.
- [x] json-to-typescript — rewrote generator: union-type detection for mixed arrays, `interface | type` toggle, configurable indent (2/4/tab), `null → optional` toggle, optional `export` keyword, configurable root name, smart pascal/singular for nested + item types, identifier-safe quoting, decl + line count footer, `.ts` download, structured error with line/col.
- [x] code-to-image — added Language `<Select>` (was unreachable from UI), JPEG export button alongside PNG/SVG, replaced `alert()` with toast feedback for export + clipboard + auto-detect, extended file-extension auto-detect (sql/rs/go/sh/java), uses shared `useToast`.
- [x] sql-formatter — 15 dialects (MySQL/Postgres/SQLite/T-SQL/PL-SQL/BigQuery/Snowflake/Redshift/Spark/Hive/DB2/TiDB/Trino/MariaDB/Standard), keyword-case picker (UPPER/lower/preserve), indent picker (2/4/tab incl. tab vs space), pretty↔minify toggle with custom minifier that strips comments + collapses whitespace, before→after byte stats with delta %, `.sql` download, inline error card.
- [x] cron-generator — full rewrite: real validating parser for `*` / `n` / `a-b` / `a,b,c` / `*/n` / `a-b/n` across all 5 fields, plain-English description of every parsed expression, **Next 5 runs** computed via per-minute iteration up to 1 year, 10 common presets (every-N-min, daily, weekly, weekdays, monthly, yearly) with pressed-state pills, POSIX DOM/DOW union semantics, copy with toast.
- [x] meta-tag-generator — added Open Graph + Twitter Card + canonical + robots blocks (the TOOL_DETAILS promised them; previous code only emitted basic name=meta), Twitter handle field, OG type + Twitter card selects, HTML-escapes user input, **live Google SERP preview + Twitter card preview** with image fallback, copy + download as `.html`, length-limit color thresholds.
- [x] chmod-calculator — full rewrite: per-role checkboxes with live r/w/x breakdown + per-role octal digit, side-by-side hero cards (octal + symbolic) with copy buttons, terminal-styled `chmod NNN filename` command box with configurable filename + copy, 6 common presets (755/644/700/600/777/444) with `aria-pressed` chips, paste-an-octal-to-set workflow via preset apply.
- [x] xml-formatter — added pretty↔minify toggle with custom comment-stripping minifier, indent picker (2/4/tab), **DOMParser-based validation** that surfaces real parser errors (was just "Invalid XML"), before→after byte stats with delta %, `.xml` download, expanded accept list to `.xml/.xsd/.xsl/.svg/.txt`.
- [x] binary-converter — **UTF-8 round-trip** via `TextEncoder`/`TextDecoder` (previous `charCodeAt` broke on any non-ASCII incl. emoji), 4 bases (binary/octal/decimal/hex) with per-base widths, encode↔decode toggle, swap button, per-byte validation with position-aware error message, sample input now includes an emoji to prove Unicode works.
- [x] string-escaper — expanded from 4 to **7 flavors** (JSON/JS/HTML/XML/URL/CSV/Regex), each with both `escape` AND `unescape` (was one-way only), CSV uses RFC 4180 quoting, HTML/XML unescape handles numeric + hex entities + named entities, regex unescape strips backslash on the standard 12 meta-chars, swap button, validation error surfacing.
- [x] json-yaml-converter — **replaced the broken flat custom parser** (was treating every `:`-separated line as a top-level string property and dropping nesting entirely) with `js-yaml` (added as direct dep — was a transitive dep of eslint/knip only), indent picker (2/4), sort-keys toggle, swap button that flips the mode, `.yaml`/`.json` download with correct MIME, line-count footer.
- [x] html-entity — expanded encoding from a single low-coverage regex (only `[ -香<>&]`) to **3 schemes** (named/decimal/hex), full ASCII safety (always escapes `& < > " '`), optional "escape all non-ASCII" for safe ASCII-only output, **swapped `innerHTML`-based decoder for a regex parser** (avoids the textarea hack — no DOM mutation, no XSS surface), handles named + numeric + hex entities, swap button.
- [x] keycode-info — fixed the showstopper: previous code did `preventDefault()` on every global keydown, **swallowing Ctrl-T, F5, Cmd-W, and every browser shortcut on the page**. Now only suppresses default when the dedicated capture area is focused (focusable div with focus ring). Added `event.repeat` auto-repeat badge, `(deprecated)` tag on `which`, copy-as-JSON, pause/resume capture, reset.
- [x] regex-tester — **fixed React anti-pattern** (was calling `setError` inside `useMemo`), added 6 flag toggles (gimsuy) with tooltips, **replace mode** with `$&/$1/$2` reference + warning when `g` is missing, named-capture-group display (`<name>:`), per-match position display, zero-width-match infinite-loop guard, copy output.
- [x] jwt-debugger — was a basic 2-card view; rewrote as a proper JWT inspector. **Strips `Bearer ` prefix** automatically, 3-color segment ribbon (red/violet/blue like jwt.io), per-segment color hints, signature panel (with note on why we can't verify it client-side), **validity badge** that computes exp/nbf state with relative countdown ("Expires in 2h" / "Expired 3d ago"), explanations for the 7 standard claims (`iss`/`sub`/`aud`/`exp`/`nbf`/`iat`/`jti`) with Unix-epoch → local time + relative time. Dropped `jwt-decode` dep in favor of a 15-line base64url decoder.
- [x] json-csv-converter — **replaced naive `split(sep)` parser** with proper RFC 4180 state-machine (correctly handles quoted fields containing the separator, embedded `\n`/`\r\n`, and `""` escapes — previous code silently corrupted any row with a comma inside quotes). Collects key *union* across all rows (not just `Object.keys(json[0])`) so heterogeneous arrays don't lose columns. 4 separators (`,` `;` ⇥ `|`), Objects vs Arrays output shape, type coercion toggles (numbers/booleans), header-row toggle, swap + download, indent picker for JSON output.
- [x] diff-checker — Monaco DiffEditor view: added live diff stats (+added / −removed / N change blocks) via `onDidUpdateDiff`, per-pane copy + download (.txt) + upload (10MB cap) controls, toast feedback on every action (replaced silent `confirm()` clear), swapped muted CSS-var tokens for sibling-pattern gray/blue toggle pills, loading state on the editor.
- [x] csv-xlsx-converter — **replaced naive `line.split(sep)` parser** (silently corrupted any quoted field containing a comma/newline) with an RFC 4180 state machine; **added the missing multi-sheet picker** (xlsx with >1 sheet was unselectable); **dropped the `node:stream` Readable import** (xlsx now built via `addRow` loop — smaller client bundle); `hasHeaders` now honored across JSON/SQL/HTML/MD/VCF/TSV; useToast feedback; copy-to-clipboard for text outputs; SQL identifiers backtick-escaped.
- [x] password-generator — **fixed modulo bias** (was `value % charset.length`) with rejection sampling on `crypto.getRandomValues`; **guarantees one char from each selected class** (Fisher–Yates shuffle after seeding); exclude-ambiguous toggle (l/I/1/O/0); live entropy strength meter (bits + qualitative label + bar); batch generation 1–50 with copy-all / download .txt; show/hide reveal toggle; replaced `setPassword(errorString)` anti-pattern with a real error state.

**Cross-cutting for CODING:** Monaco-based editors must be lazy. Format/minify pairs should share input pane. Add "load sample" button for instant demo.

### 1C. CSS — CSS Tools (9)

- [x] css-triangle-generator — added 4 diagonal directions (8 total), swapped custom range inputs for shared `Slider` primitive, toast on copy (was silent), copy-as-rule with `.triangle{}` wrapper.
- [x] css-cursors — toast on copy (was silent). Full cursor gallery + interactive hover preview already solid.
- [x] css-borders — **upgraded thin static gallery to a real builder**: width/radius/color controls, live preview, CSS + Tailwind copy with toast (was a silent click-to-copy `border: 1px black` regardless of selection).
- [x] css-patterns — toast on copy (was silent), dropped unused imports.
- [x] box-shadow-generator — toast on copy (was silent), added Copy-Tailwind (`shadow-[…]`) alongside Copy-CSS. 2D drag pad + multi-layer already solid.
- [x] css-gradient-generator — toast on copy (was silent), added Copy-Tailwind (`bg-[…]` arbitrary value) alongside Copy-CSS.
- [x] border-radius-generator — toast on copy (was silent), added Copy-Tailwind (`rounded-[…]`) alongside Copy-CSS.
- [x] text-shadow-generator — toast on copy (was silent), added Copy-Tailwind (`[text-shadow:…]`) alongside Copy-CSS.
- [x] glassmorphism-generator — toast on copy alongside existing check-icon feedback. Glass/neu/clay modes + presets + reset already solid.

**Cross-cutting for CSS:** every generator needs a live preview. "Copy CSS" + "Copy Tailwind" buttons where possible. Use sibling toggle-pill pattern for unit/mode switches; no off-theme colors.

### 1D. COLOR — Color Tools (4)

- [x] contrast-checker — **added AAA ratings** (was AA-only) for normal + large text in a 4-up grid; **robust hex parsing** (3- or 6-digit, no NaN on partial input — preview falls back gracefully); swap button; invalid-input alert.
- [x] color-palette-generator — toast on copy (was silent); random-base-color button; copy-all-as-CSS-variables.
- [x] color-theme-wheel — toast feedback on copy + copy-errors (was a silent catch). Wheel drag, image colour extraction, per-swatch WCAG contrast, UI preview, and CSS/SCSS/Tailwind/JSON/URL exports were already excellent — left intact.
- [x] css-color-code-converter — toast on copy (was a silent catch); **native color picker overlaid on the preview swatch** (there was no visual picker, only text fields); **EyeDropper API button** (graceful "not supported" toast on unsupported browsers). HEX/RGB/HSL round-trip + keyword resolver already solid.

**Cross-cutting for COLOR:** support hex/rgb/hsl round-trip, copy-to-clipboard with toast, WCAG ratios where relevant, eyedropper (EyeDropper API) where supported.

### 1E. MATH — Calculator Tools (9)

- [ ] percentage-calculator
- [ ] roman-numeral-converter
- [ ] age-calculator
- [ ] random-number-generator
- [ ] loan-calculator
- [ ] date-calculator
- [ ] unit-converter
- [ ] bmi-calculator
- [ ] currency-converter

**Cross-cutting for MATH:** validate numeric input (no NaN output), show formula/working where useful, copy result. currency-converter needs a rates source — confirm whether it's live (API) or static before touching.

### 1F. PRODUCTIVITY — Productivity Tools (8)

- [ ] utm-builder
- [ ] screen-info — **also fix: missing seoTitle + seoDescription in TOOLS** (flagged in Phase 0)
- [ ] device-resolutions
- [ ] timezone-converter
- [ ] todo-list — **also fix: only 2 FAQs, need ≥3** (flagged in Phase 0)
- [ ] pomodoro-timer
- [ ] world-clock
- [ ] timers-and-stopwatch

**Cross-cutting for PRODUCTIVITY:** timer tools must survive tab-backgrounding (use timestamps, not setInterval counts); persist state to localStorage where it makes sense; toast on completion.

### 1G. FUN — Fun Tools (4)

- [ ] morse-converter
- [ ] list-randomizer
- [ ] text-to-speech — heavy (kokoro/transformers) — must lazy-load
- [ ] meme-generator — canvas/image upload — already migrated to shared FileUpload in Phase 0

### 1H. IMAGE — Image Tools (14)

- [ ] aspect-ratio-calculator
- [ ] svg-to-data-uri
- [ ] youtube-thumbnail
- [ ] image-filters
- [ ] svg-blob-generator
- [ ] svg-wave-generator
- [ ] lorem-image-generator
- [ ] image-to-base64 — already migrated to shared FileUpload in Phase 0
- [ ] base64-to-image
- [ ] watermark-adder — already migrated to shared FileUpload in Phase 0
- [ ] image-resizer
- [ ] image-converter — already migrated to shared FileUpload in Phase 0
- [ ] image-compressor
- [ ] qr-code-generator

**Cross-cutting for IMAGE:** all image tools share an upload pattern (FileUpload + drag-drop + paste-from-clipboard). Output: download + copy data-URI. Size limit warning at 20MB.

### 1I. VIDEO — Video Tools (7)

- [ ] video-compressor
- [ ] video-to-audio-converter
- [ ] gif-maker — **also fix: 0 usageExamples** (flagged in Phase 0)
- [ ] trim-video
- [ ] format-converter
- [ ] video-thumbnail-extractor
- [ ] video-mute

**Cross-cutting for VIDEO:** ffmpeg.wasm loads ONCE per session. Show a single "Loading FFmpeg core (~30MB)" progress bar. Consider routing all video tools through a shared `useFFmpeg()` hook so the WASM module is cached.

### 1J. MISC — Other Tools (2)

- [ ] password-strength
- [ ] signature-pad — canvas drawing, export PNG/SVG

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

### 2026-05-28 — COLOR sweep COMPLETE (4 tools) + build-blocker discovery
All 4 COLOR tools swept, one commit each. **contrast-checker** got the most work: was AA-only and computed NaN on partial hex input — now does AA+AAA for normal+large in a 4-up grid with robust 3/6-digit parsing and a swap button. **css-color-code-converter** gained a native color picker on the swatch (previously no visual picker at all) + an EyeDropper API button. palette-generator got random-base + copy-all-as-CSS-vars. color-theme-wheel was already excellent (wheel/image-extract/exports/share) so just got copy toast. **Build-blocker found:** `next build` (Turbopack) panics with `os error 225 — the file contains a virus or potentially unwanted software` on `app/request-tool/page.tsx` + `components/ContactForm.tsx`. **This is Windows Defender quarantining those two files — it's the root cause of the "something keeps re-deleting them" mystery from the CODING sweep.** `tsc --noEmit` is clean (those two files aside). USER ACTION NEEDED: add a Defender exclusion for the repo (or inspect what in those two files trips the heuristic) before a production build can pass. Next: MATH (9 tools).

### 2026-05-28 — CSS sweep COMPLETE (9 tools) + remaining-category plan
Fleshed out the rest of the plan first: pulled real tool ids per category from `constants.tsx` (94 total confirmed; CSS/COLOR/MATH/PRODUCTIVITY/FUN/IMAGE/VIDEO/MISC = 57 remaining) and folded in the Phase 0 SEO gaps. Then swept **all 9 CSS tools, one commit each.** Cross-cutting wins: every generator now gives **toast feedback on copy** (all were silently writing to clipboard) and the value-output tools (gradient, box-shadow, text-shadow, border-radius, borders) gained a **Copy-Tailwind** button (arbitrary-value classes) next to Copy-CSS. Real upgrades: **css-borders** was a thin static swatch gallery that copied `border: 1px black` regardless of what you clicked — rebuilt as a proper width/style/radius/color builder with live preview; **css-triangle-generator** added 4 diagonal directions + migrated to the shared `Slider` primitive. Box-shadow's 2D drag pad, glassmorphism's glass/neu/clay presets, and the cursor gallery were already solid and left intact. CSS category COMPLETE. Next: COLOR (4 tools).

### 2026-05-27 — CODING batch 5 — FINAL (diff-checker, csv-xlsx-converter, password-generator + orphan cleanup)
Closes out the CODING sweep: **24/24 tools done.** Real fixes this batch: **csv-xlsx-converter's CSV parser was a naive `split(sep)`** that corrupted any quoted field with a comma/newline — replaced with an RFC 4180 state machine, plus it was **missing a multi-sheet picker** entirely (multi-sheet xlsx files were stuck on sheet 1) and pulled in `node:stream` `Readable` on the client (removed — xlsx now built via `addRow`). **password-generator had modulo bias** (`value % charset.length`) — replaced with rejection sampling, and now guarantees one char per selected class + an entropy strength meter + batch 1–50. **diff-checker** gained live +/−/block stats, per-pane copy/download/upload, and toast feedback (was a silent `confirm()`); migrated off muted CSS-var tokens to sibling toggle-pill pattern. **Orphan cleanup:** deleted the dead `csv-to-json` + `json-to-csv` TOOL_DETAILS and 301-redirected both URLs to the bi-directional `json-csv-converter`. `check:tool-details` now shows zero CODING issues (remaining 3 belong to MISC/PRODUCTIVITY/VIDEO sweeps). **CODING category COMPLETE.**

### 2026-05-27 — CODING batch 4 (html-entity, keycode-info, regex-tester, jwt-debugger, json-csv-converter)
5 more CODING tools shipped, full §6 audit each, one commit per tool. Real bug fixes this batch: **keycode-info was swallowing every browser shortcut** (Ctrl-T, F5, Cmd-W, …) with a global `preventDefault()` — now scoped to a focusable capture area; **json-csv-converter's CSV parser silently corrupted any row with a comma-inside-quotes** — replaced with an RFC 4180 state machine; **html-entity decoder was using `innerHTML`** and only covered chars > U+00A0 for encoding — now a proper regex-based decoder + 3-scheme encoder; **regex-tester was calling `setState` inside `useMemo`** (React anti-pattern) — moved error handling out; **jwt-debugger** rewritten with validity countdown + claim explanations + 3-color segment ribbon, dropped `jwt-decode` for a 15-line base64url decoder. 20/24 CODING tools done. Next batch (final 4-5): diff-checker, csv-xlsx-converter, password-generator, plus the orphan CODING entries.

### 2026-05-27 — CODING batch 3 (chmod-calculator, xml-formatter, binary-converter, string-escaper, json-yaml-converter)
5 more CODING tools shipped, full §6 audit each, one commit per tool. Highlights: chmod-calculator now has per-role digit breakdown + terminal command box + presets; xml-formatter validates via DOMParser (real error messages, not "Invalid XML") and supports minify + indent; binary-converter now Unicode-safe via TextEncoder/TextDecoder (was ASCII-only — emoji silently corrupted) and supports binary/octal/decimal/hex; string-escaper jumped from 4 one-way modes to 7 bi-directional flavors (JSON/JS/HTML/XML/URL/CSV/Regex) with proper round-tripping; json-yaml-converter fixed the showstopper — replaced a hand-rolled "flat" parser that dropped nesting entirely with real js-yaml. Also tightened sibling UI tokens in MetaTagGenerator (was `dark:bg-gray-950`) + CronParser. 15/24 CODING tools done. Next batch: htm-entity, json-csv-converter, jwt-debugger, keycode-info, regex-tester.

### 2026-05-26 — CODING batch 2 (json-to-typescript, code-to-image, sql-formatter, cron-generator, meta-tag-generator)
5 more CODING tools shipped, full §6 audit each, one commit per tool. Highlights: json-to-typescript now emits union types for heterogeneous arrays and supports `interface | type` + `?`-on-null; sql-formatter gained 15 dialects + keyword-case + minify; cron-generator rewritten with a real validating parser, plain-English description, and next-5-runs; meta-tag-generator now actually produces the OG + Twitter cards promised in its TOOL_DETAILS, with live Google SERP + Twitter card previews; code-to-image got a missing language picker + JPEG export + toast (replaced raw `alert()`). 10/24 CODING tools done. Next batch starts with chmod-calculator.

### 2026-05-26 — TEXT sweep COMPLETE (14 + 1 merged)
All 14 remaining TEXT tools shipped with file upload, toast feedback, large-dataset support (Web Worker where applicable), enriched options/exports, and a11y improvements. `character-counter` consolidated into `word-counter` with 301 redirect. `comma-separator`'s missing TOOL_DETAILS entry filled. tool-details FAQ-counter script bug fixed. Next: CODING sweep (~24 tools).

### 2026-05-26 — TEXT sweep started
- case-converter: full §6 pass. Added file upload, 3 new modes (camel/snake/kebab), live stats, download, clear, toast feedback, aria-live/aria-pressed.
- word-counter: full §6 pass. Added file upload, chars-without-spaces, paragraphs, reading/speaking time, Twitter/SMS/meta-desc/title length-limit gauges with color thresholds and aria-progressbar.

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
