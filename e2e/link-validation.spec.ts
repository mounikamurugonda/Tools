import { test, expect } from '@playwright/test';

// All tool IDs from TOOL_CONFIGS
const TOOL_IDS = [
  // Text Tools
  'case-converter',
  'word-counter',
  'lorem-ipsum-generator',
  'text-reverser',
  'character-counter',
  'slug-generator',
  'keyword-density-analyzer',
  'readability-score',
  'text-cleaner',
  'markdown-table-generator',
  'hashtag-extractor',
  'duplicate-remover',
  // Image Tools
  'base64-to-image',
  'image-to-base64',
  'qr-code-generator',
  'image-resizer',
  'image-converter',
  'image-compressor',
  'image-filters',
  'youtube-thumbnail',
  'aspect-ratio-calculator',
  'lorem-image-generator',
  // CSS Tools
  'box-shadow-generator',
  'css-gradient-generator',
  'border-radius-generator',
  'text-shadow-generator',
  'glassmorphism-generator',
  'css-color-code-converter',
  'css-triangle-generator',
  'css-cursors',
  'css-borders',
  'css-patterns',
  // Coding Tools
  'base64-converter',
  'url-encoder',
  'json-formatter',
  'uuid-generator',
  'password-generator',
  'hash-generator',
  'jwt-debugger',
  'markdown-previewer',
  'diff-checker',
  'regex-tester',
  'json-to-typescript',
  'code-to-image',
  'sql-formatter',
  'cron-generator',
  'meta-tag-generator',
  'chmod-calculator',
  'xml-formatter',
  'string-escaper',
  'html-entity',
  'json-yaml-converter',
  'csv-xlsx-converter',
  // Color Tools
  'color-palette-generator',
  'color-theme-wheel',
  'contrast-checker',
  // Math Tools
  'unit-converter',
  'bmi-calculator',
  'currency-converter',
  'date-calculator',
  'loan-calculator',
  'percentage-calculator',
  'roman-numeral-converter',
  'age-calculator',
  'random-number-generator',
  // Productivity Tools
  'pomodoro-timer',
  'world-clock',
  'timers-and-stopwatch',
  'todo-list',
  'utm-builder',
  'timezone-converter',
  // Fun Tools
  'meme-generator',
  'fancy-font-generator',
  'morse-converter',
  'keycode-info',
  'screen-info',
  'text-to-speech',
  'signature-pad',
  // Video Tools
  'video-compressor',
  'video-to-audio',
  'gif-maker',
  'trim-video',
  'format-converter',
  'video-thumbnail-extractor',
  'video-mute',
  'watermark-adder',
  // Misc Tools
  'json-csv-converter',
  'svg-to-data-uri',
  'svg-blob-generator',
  'svg-wave-generator',
  'binary-converter',
  'password-strength',
  'list-randomizer',
  'device-resolutions',
];

// Static pages to test
const STATIC_PAGES = [
  { path: '/', name: 'Home' },
  { path: '/tools', name: 'Tools' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/privacy', name: 'Privacy' },
  { path: '/terms', name: 'Terms' },
  { path: '/credits', name: 'Credits' },
  { path: '/blogs', name: 'Blogs' },
];

test.describe('Static Pages', () => {
  for (const page of STATIC_PAGES) {
    test(`${page.name} page loads correctly`, async ({ page: browserPage }) => {
      const response = await browserPage.goto(page.path);
      expect(response?.status()).toBe(200);
      // Verify page has content
      await expect(browserPage.locator('body')).toBeVisible();
    });
  }
});

test.describe('Tool Pages', () => {
  // Create a test for each tool
  for (const toolId of TOOL_IDS) {
    test(`Tool: ${toolId} loads correctly`, async ({ page }) => {
      const response = await page.goto(`/tools/${toolId}`);
      expect(response?.status()).toBe(200);
      // Verify the tool container is present
      await expect(page.locator('body')).toBeVisible();
      // Basic content check - page should not show 404
      await expect(page.locator('text=Tool Not Found')).not.toBeVisible();
    });
  }
});

test.describe('Navigation Links', () => {
  test('Home page has working navigation links', async ({ page }) => {
    await page.goto('/');

    // Check main navigation links exist
    const navLinks = page.locator('nav a, header a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Tools page sidebar navigation works', async ({ page }) => {
    await page.goto('/tools');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check that tool cards/links are present
    const toolLinks = page.locator('a[href^="/tools/"]');
    const count = await toolLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Footer links are accessible', async ({ page }) => {
    await page.goto('/');

    // Check footer exists and has links
    const footer = page.locator('footer');
    if ((await footer.count()) > 0) {
      const footerLinks = footer.locator('a');
      const count = await footerLinks.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});

test.describe('Link Validation Summary', () => {
  test('All configured tools have valid routes', async ({ page }) => {
    const results: { toolId: string; status: number | null }[] = [];

    // Test a sample of tools for quick validation
    const sampleTools = TOOL_IDS.slice(0, 10);

    for (const toolId of sampleTools) {
      const response = await page.goto(`/tools/${toolId}`);
      results.push({ toolId, status: response?.status() ?? null });
    }

    // All should return 200
    const failedTools = results.filter(r => r.status !== 200);
    expect(failedTools).toHaveLength(0);
  });
});
