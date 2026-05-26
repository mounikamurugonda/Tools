# AI Working Prompt — utiltoolkits-next

> **Paste this file (or link it) at the start of any AI session — Claude, Cursor, Copilot Chat, ChatGPT, Gemini — so the assistant has full context before touching code.** Keep this file in sync with reality. Update it when stack, conventions, or goals change.

---

## 1. Product motto (non-negotiable)

This is a portfolio-grade product. Every change must respect these three principles:

1. **Developer tools for large / real datasets.** Every tool must handle realistic input sizes. Where it makes sense: support file upload/import, drag-and-drop, paste, chunked/streamed processing, and clear feedback on size limits or progress.
2. **Interactive, bug-free UI with strict consistency.** Use the shared design system in `components/ui/*` (`Button`, `Card`, `FileUpload`, `Tabs`, `TextArea`, `Input`, `Select`, `Slider`, `Toast`, etc.). No ad-hoc markup, no off-theme colors. Light + dark mode must both look correct. No broken loading/empty/error states.
3. **SEO-rich for AdSense eligibility.** Every tool needs strong `seoTitle`, `seoDescription`, `keywords`, and a complete `ToolDetails` entry (intro, how-to, features, FAQ, explanation, usage examples, underlying concept). Structured data (JSON-LD via `lib/schema.ts` + `components/Schema.tsx`) must render.

If a change conflicts with any of the three, stop and surface the conflict.

## 2. Stack snapshot

- **Framework:** Next.js ^16.1.6 (App Router), React 19, TypeScript 5.9
- **Styling:** Tailwind 3.4 + `@tailwindcss/forms` + `@tailwindcss/typography`. Theming via `ThemeProvider` (light/dark, class-based).
- **State / data:** Zustand stores in `store/`, TanStack Query for async data, Supabase (`@supabase/supabase-js`) for backend.
- **Auth:** NextAuth (`next-auth`) + Supabase user table; JWT decode via `jwt-decode`.
- **Heavy tool deps:** `@ffmpeg/ffmpeg` (video), `@huggingface/transformers` + `onnxruntime-web` + `kokoro-js` (AI/TTS), `ollama` (LLM proxy), `@monaco-editor/react` (editors), `exceljs`, `jszip`, `file-saver`, `qrcode`, `marked`, `sql-formatter`, `js-beautify`, `html-to-image`, `lenis` (smooth scroll).
- **Testing / QA:** Playwright (`e2e/`, `playwright.config.ts`), Knip (unused detection), ESLint 9, Prettier 3.
- **Scripts:** `npm run dev | build | start | lint | knip | test | test:e2e`

## 3. Repository map

```
app/                            # Next.js App Router
  layout.tsx                    # Root layout (theme script, GTM, AdSense, analytics)
  page.tsx                      # Home
  globals.css
  tools/
    page.tsx                    # All-tools index
    [toolId]/page.tsx           # Dynamic tool page — wraps <ToolLoader/> + schema + tip
    category/[categoryName]/    # Dynamic category page
  about/  api/  blogs/  contact/  credits/  privacy/  product/
  request-tool/  s/  terms/  verify-users/  not-found.tsx  robots.ts  sitemap.ts
components/
  ui/                           # *** Design system — reuse these, do not reinvent ***
    Button.tsx Card.tsx CustomSelect.tsx FileUpload.tsx Input.tsx Label.tsx
    Select.tsx Slider.tsx Tabs.tsx TextArea.tsx Toast.tsx
  icons/                        # All icons — import from '@/components/icons'
  (ToolLoader, Schema, AnalyticsWrapper, TipCard, ThemeProvider, RootLayoutWrapper,
   SmoothScrolling, SessionProviderWrapper, QueryProvider, GoogleAdSense, etc.)
hooks/                          # Custom React hooks
lib/                            # Shared utils — tool-details.ts, schema.ts, tips.ts
store/                          # Zustand stores
tools/                          # Tool-specific feature code (tts/ etc.)
codecast-mcp/                   # MCP integration (separate concern)
supabase/                       # Supabase config
public/                         # Static assets
e2e/                            # Playwright specs
constants.tsx                   # *** TOOLS registry — all ~94 tools, categories, SEO meta ***
types.ts                        # Tool, ToolCategory, ToolDetails, ToolProps, Blog
```

Root SQL files (`setup_favorites.sql`, `setup_users_table.sql`, `supabase_update_visits.sql`, `supabase_add_user_email.sql`) define Supabase tables.

## 4. Conventions & rules

**File structure for a tool:**
- Registry entry in `constants.tsx` (`TOOLS` array): id, name, description, seoTitle, seoDescription, icon, category, keywords. `featured` is optional.
- Tool component lives under `tools/<tool-id>/` or is dynamically loaded by `components/ToolLoader.tsx` (check that file for the resolution pattern before adding new tools).
- Long-form SEO content lives in `lib/tool-details.ts` keyed by tool id, typed as `ToolDetails`.
- Icon component lives in `components/icons/` and is re-exported from `components/icons/index.ts`.

**UI rules:**
- Always import from `@/components/ui/*` — do not build new buttons, inputs, file pickers, tabs, toasts.
- Use Tailwind classes only; no inline styles unless dynamic (e.g., gradient preview).
- Support light + dark. Use the `light-*` / `dark-*` token classes already in `tailwind.config.ts`.
- Tools must have: visible loading state, clear empty state, error toast via `Toast`, copy-to-clipboard feedback.
- Large input: must accept paste, drag-and-drop, and `FileUpload`. Show file size + processing progress for >1MB inputs.
- Buttons get keyboard focus rings. Forms get labels via `<Label/>`. No raw `<input>`.

**Performance:**
- Heavy libs (`ffmpeg`, `transformers`, `monaco`, `kokoro`, `onnxruntime-web`) must be lazy-imported inside the tool component (`dynamic(() => import(...), { ssr: false })` or runtime `await import(...)`).
- Use `useMemo` / `useCallback` for any work over moderate data sizes.
- Stream / chunk processing for >5MB inputs; never block the main thread > 100ms — offload to Web Workers if needed.

**SEO:**
- `app/tools/[toolId]/page.tsx` already emits OG, Twitter, canonical, JSON-LD via `getToolSchema` and `getBreadcrumbSchema`. Don't bypass it.
- Every tool **must** have a `ToolDetails` entry in `lib/tool-details.ts`. Missing details = thin content = AdSense risk.
- Keywords array should be 4–8 specific, search-realistic phrases — not 30 stuffed terms.

**Type safety:** TS strict mode is assumed. No `any` unless interfacing with an untyped 3rd-party API; prefer `unknown` + narrow.

**Git:** branch is `main`, remote `github.com/mounikamurugonda/Tools`. Create new commits, do not amend. Never force-push. Do not skip hooks.

## 5. The 10 tool categories (from `types.ts`)

| Enum | Label | Approx. count |
|---|---|---|
| `TEXT` | Text Tools | ~14 |
| `IMAGE` | Image Tools | ~13 |
| `CSS` | CSS Tools | ~8 |
| `CODING` | Coding Tools | ~24 |
| `COLOR` | Color Tools | ~4 |
| `MATH` | Calculator Tools | ~9 |
| `PRODUCTIVITY` | Productivity Tools | ~8 |
| `FUN` | Fun Tools | ~4 |
| `VIDEO` | Video Tools | ~7 |
| `MISC` | Other Tools | ~2 |

Total ≈ 93 tools. Source of truth: `constants.tsx`.

## 6. The category-by-category audit checklist

Apply this to **every tool** as you sweep a category. Track findings in `TASK_PLAN.md`.

1. **Functionality**
   - [ ] Happy path works on small input
   - [ ] Happy path works on a realistic large input (≥1MB where applicable)
   - [ ] All advertised options/modes work
   - [ ] Error states surface a `Toast` with a helpful message
2. **Import / export**
   - [ ] Paste works
   - [ ] File upload via `FileUpload` works (where input is text/file)
   - [ ] Drag-and-drop works (where applicable)
   - [ ] Download / copy-to-clipboard for the output works
3. **UI consistency**
   - [ ] Uses `components/ui/*` primitives only
   - [ ] Light + dark mode both render correctly
   - [ ] Layout matches sibling tools (header, padding, spacing)
   - [ ] No layout shift on input change
   - [ ] Keyboard navigation + focus visible
   - [ ] Mobile (≤640px) usable
4. **Performance**
   - [ ] Heavy deps lazy-loaded
   - [ ] No jank on large input (use Worker if needed)
   - [ ] Loading skeleton or spinner for async work
5. **SEO**
   - [ ] `seoTitle`, `seoDescription`, `keywords` in `constants.tsx`
   - [ ] Complete `ToolDetails` entry in `lib/tool-details.ts` (intro, how-to, features, FAQ ≥3, explanation, usage examples, underlying concept)
   - [ ] Schema markup renders (verify via Rich Results test)
6. **QA**
   - [ ] Playwright spec covers smoke path
   - [ ] `npm run lint` clean
   - [ ] `npm run build` succeeds

## 7. How to work with this codebase as an AI

- **Read before writing.** `constants.tsx` is large — grep for the tool id before reading.
- **Don't bulk-rewrite tools.** One tool at a time, against the checklist, with a focused diff.
- **Confirm scope.** If a fix touches >3 files or changes shared UI, surface a short plan first.
- **Don't add new UI primitives.** Extend `components/ui/*` if a real gap exists; otherwise compose existing ones.
- **Don't add libraries casually.** Check `package.json` first — there is probably already something installed for the job.
- **Update `TASK_PLAN.md`** when you finish a tool. Tick the box. Add findings (e.g., "missing upload", "thin SEO") as sub-bullets so the next session sees them.

## 8. Definition of Done for a tool

A tool is "done" when **every** box in §6 is checked **and** a teammate could land on the tool page cold, use it on a real file, and leave without confusion.
