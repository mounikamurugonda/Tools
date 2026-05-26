import { test, expect, type Page } from '@playwright/test';

/**
 * SEO smoke test.
 *
 * Visits one representative tool per category plus the index pages and
 * asserts the SEO surface area is intact:
 *   - <title> non-empty and not the not-found fallback
 *   - meta description present and non-empty
 *   - canonical link present
 *   - Open Graph title + description + image present
 *   - Twitter card meta present
 *   - at least one JSON-LD <script> block parses as JSON
 *
 * This protects the AdSense-eligibility surface during refactors.
 */

const SAMPLE_TOOL_URLS = [
  '/tools/case-converter', // TEXT
  '/tools/json-formatter', // CODING
  '/tools/css-gradient-generator', // CSS
  '/tools/contrast-checker', // COLOR
  '/tools/percentage-calculator', // MATH
  '/tools/utm-builder', // PRODUCTIVITY
  '/tools/morse-converter', // FUN
  '/tools/image-resizer', // IMAGE
  '/tools/video-compressor', // VIDEO
  '/tools/password-strength', // MISC
];

const STATIC_URLS = ['/', '/tools', '/about', '/contact', '/blogs', '/privacy', '/terms'];

async function assertMeta(page: Page, name: string, attr: 'name' | 'property' = 'name') {
  const locator = page.locator(`meta[${attr}="${name}"]`).first();
  await expect(locator, `meta[${attr}="${name}"] should exist`).toHaveCount(1);
  const content = await locator.getAttribute('content');
  expect(content?.trim(), `meta[${attr}="${name}"] content should be non-empty`).toBeTruthy();
}

async function assertSeoSurface(page: Page, url: string) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const title = await page.title();
  expect(title.trim(), `${url}: <title>`).not.toBe('');
  expect(title.toLowerCase(), `${url}: not the not-found title`).not.toContain('not found');

  await assertMeta(page, 'description');
  await assertMeta(page, 'og:title', 'property');
  await assertMeta(page, 'og:description', 'property');
  await assertMeta(page, 'og:image', 'property');
  await assertMeta(page, 'twitter:card');

  // canonical link
  const canonical = page.locator('link[rel="canonical"]').first();
  await expect(canonical, `${url}: <link rel="canonical">`).toHaveCount(1);
  const href = await canonical.getAttribute('href');
  expect(href, `${url}: canonical href`).toBeTruthy();
}

async function assertJsonLd(page: Page, url: string) {
  const scripts = page.locator('script[type="application/ld+json"]');
  const count = await scripts.count();
  expect(count, `${url}: at least one JSON-LD script`).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const raw = (await scripts.nth(i).textContent()) ?? '';
    expect(() => JSON.parse(raw), `${url}: JSON-LD block ${i} parses`).not.toThrow();
  }
}

test.describe('SEO smoke — tool pages', () => {
  for (const url of SAMPLE_TOOL_URLS) {
    test(`${url}`, async ({ page }) => {
      await assertSeoSurface(page, url);
      await assertJsonLd(page, url);
    });
  }
});

test.describe('SEO smoke — static pages', () => {
  for (const url of STATIC_URLS) {
    test(`${url}`, async ({ page }) => {
      await assertSeoSurface(page, url);
    });
  }
});
