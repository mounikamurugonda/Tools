import { test, expect, request } from '@playwright/test';

/**
 * Sitemap integrity test.
 *
 * Fetches /sitemap.xml and asserts every URL it advertises returns 200.
 * Catches:
 *   - hard-coded routes that no longer exist (the cause of the 10 GSC 404s)
 *   - tool ids in the TOOLS constant whose page was removed
 *   - blog ids whose MDX/page was deleted
 *   - product subroutes referenced by hand but never shipped
 *
 * Pair this with `seo-smoke.spec.ts` for full SEO surface coverage.
 */

test('sitemap.xml URLs all resolve (no 404s, no noindex pages)', async ({ baseURL }, testInfo) => {
  const ctx = await request.newContext({ baseURL });
  const res = await ctx.get('/sitemap.xml');
  expect(res.status(), 'sitemap.xml itself must be 200').toBe(200);

  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(m => m[1]);
  expect(urls.length, 'sitemap should contain at least one URL').toBeGreaterThan(0);

  // Force every sitemap URL through the local dev server, not prod, so the
  // test reflects the current branch.
  const localUrls = urls.map(u => u.replace(/^https?:\/\/[^/]+/, ''));

  const failures: { url: string; status: number; reason: string }[] = [];

  for (const url of localUrls) {
    const r = await ctx.get(url, { maxRedirects: 0 });
    const status = r.status();
    if (status >= 400) {
      failures.push({ url, status, reason: `HTTP ${status}` });
      continue;
    }
    if (status >= 300) {
      failures.push({ url, status, reason: `unexpected redirect to ${r.headers().location}` });
      continue;
    }
    // Catch the contradiction case: page is in sitemap AND sets noindex.
    const html = await r.text();
    if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
      failures.push({ url, status, reason: 'page is in sitemap but emits noindex meta' });
    }
  }

  if (failures.length) {
    await testInfo.attach('sitemap-failures.json', {
      body: JSON.stringify(failures, null, 2),
      contentType: 'application/json',
    });
  }
  expect(failures, `sitemap entries failing validation:\n${JSON.stringify(failures, null, 2)}`).toHaveLength(0);
});
