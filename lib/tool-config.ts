/**
 * Tool Configuration & Metadata (server-safe, no component imports)
 * This file contains only tool metadata without dynamic imports.
 * Components are loaded on-demand in the client.
 */

import { ToolCategory } from '@/types';

export interface ToolMetadata {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  tags?: string[];
  featured?: boolean;
}

const PRIVACY_STATEMENT =
  'All calculations and data processing for this tool are performed locally in your browser. We do not send any of your data to our servers, ensuring your information remains private and secure.';

export const TOOL_CONFIGS: ToolMetadata[] = [
  // Text Tools
  { id: 'case-converter', name: 'Case Converter', description: 'Instantly convert text between Uppercase, Lowercase, Title Case, Sentence case, and more. Perfect for fixing capitalization errors or formatting headlines.', category: ToolCategory.TEXT },
  { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs in real-time. Includes reading time estimation. Ideal for essays, blog posts, and social media limits.', category: ToolCategory.TEXT },
  { id: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', description: 'Generate custom Lorem Ipsum placeholder text for your designs. Choose paragraphs, sentences, or words to fit your layout perfectly.', category: ToolCategory.TEXT },
  { id: 'text-reverser', name: 'Text Reverser', description: 'Flip your text backwards instantly. Reverse entire strings, individual words, or letters. A fun tool for puzzles, social media, and testing.', category: ToolCategory.TEXT },
  { id: 'character-counter', name: 'Character Counter', description: 'Precise character count with and without spaces. Calculates UTF-8 byte size for technical needs. Essential for tweets, SMS, and database limits.', category: ToolCategory.TEXT },
  { id: 'slug-generator', name: 'Slug Generator', description: 'Convert titles into clean, SEO-friendly URL slugs. Removes special characters and replaces spaces with hyphens. Essential for web developers and bloggers.', category: ToolCategory.TEXT },
  { id: 'keyword-density-analyzer', name: 'Keyword Density Analyzer', description: 'Analyze text to find the most frequent words and phrases. Optimize your content for SEO by identifying keyword usage and preventing over-optimization.', category: ToolCategory.TEXT },
  { id: 'readability-score-calculator', name: 'Readability Score', description: 'Check how easy your text is to read. Get Flesch Reading Ease and Grade Level scores instantly. Improve clarity for your audience.', category: ToolCategory.TEXT },
  { id: 'text-cleaner', name: 'Text Cleaner', description: 'Clean up messy text instantly. Remove extra spaces, strip HTML tags, fix line breaks, and normalize whitespace for perfectly formatted content.', category: ToolCategory.TEXT },
  { id: 'markdown-table-generator', name: 'Markdown Table Generator', description: 'Create Markdown tables visually. Edit rows and columns easily and copy the code. Perfect for GitHub READMEs and technical documentation.', category: ToolCategory.TEXT },
  { id: 'hashtag-extractor', name: 'Hashtag Extractor', description: 'Extract every hashtag from a block of text instantly. Get a clean list or a copy-ready string. Perfect for social media managers and marketers.', category: ToolCategory.TEXT },
  { id: 'duplicate-remover', name: 'Duplicate Remover', description: 'Remove duplicate lines or words from your lists instantly. Clean up email lists, datasets, and text files. Supports case sensitivity.', category: ToolCategory.TEXT },
  { id: 'comma-separator', name: 'Comma Separator', description: 'Convert column data (like Excel columns) into comma-separated value (CSV) lists. Customize delimiters and quotes for SQL queries or arrays.', category: ToolCategory.TEXT },
  // Image Tools
  { id: 'base64-to-image', name: 'Base64 to Image', description: 'Convert Base64 strings back into real image files. Visual preview and instant download. Supports PNG, JPG, GIF, and WebP formats.', category: ToolCategory.IMAGE },
  { id: 'image-to-base64', name: 'Image to Base64', description: 'Convert images to Base64 strings for use in HTML, CSS, or JSON. Embed images directly in code to reduce HTTP requests.', category: ToolCategory.IMAGE },
  { id: 'qr-code-generator', name: 'QR Code Generator', description: 'Create custom QR codes for URLs, text, WiFi, and email. Customize colors and size. Download high-quality PNG or SVG files instantly.', category: ToolCategory.IMAGE },
  { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images to specific dimensions or percentages. Maintain aspect ratio and download optimized files. Fast and runs entirely in your browser.', category: ToolCategory.IMAGE },
  { id: 'image-converter', name: 'Image Converter', description: 'Convert images between formats like PNG, JPG, WebP, and GIF. Bulk conversion support. Optimizes file size without quality loss.', category: ToolCategory.IMAGE },
  { id: 'image-compressor', name: 'Image Compressor', description: 'Compress PNG, JPG, and WebP images to reduce file size. Balance quality and speed for faster website loading. No server uploads.', category: ToolCategory.IMAGE },
  { id: 'image-filters', name: 'Image Filters', description: 'Apply professional filters to your photos. Adjust brightness, contrast, grayscale, and more in real-time. Download the edited image instantly.', category: ToolCategory.IMAGE },
  { id: 'youtube-thumbnail', name: 'YouTube Thumbnail Downloader', description: 'Download high-quality thumbnails from any YouTube video. Get 4K, HD, and SD versions instantly. Just paste the video URL.', category: ToolCategory.IMAGE },
  { id: 'aspect-ratio-calculator', name: 'Aspect Ratio Calculator', description: 'Calculate aspect ratios and resize dimensions accurately. Perfect for photographers, videographers, and designers working with different screen sizes.', category: ToolCategory.IMAGE },
  { id: 'lorem-image-generator', name: 'Lorem Image Generator', description: 'Generate random placeholder images for your mockups. Customize dimensions and categories to fit your design needs instantly.', category: ToolCategory.IMAGE },

  // CSS Tools
  { id: 'box-shadow-generator', name: 'Box Shadow Generator', description: 'Create beautiful CSS box shadows visually. Adjust blur, spread, color, and opacity. Copy the code instantly for modern UI designs.', category: ToolCategory.CSS },
  { id: 'css-gradient-generator', name: 'CSS Gradient Generator', description: 'Design stunning linear and radial gradients visually. Add multiple color stops, adjust angles, and copy cross-browser CSS code.', category: ToolCategory.CSS },
  { id: 'border-radius-generator', name: 'Border Radius Generator', description: 'Generate advanced border-radius CSS. Create rounded corners, circles, and organic shapes. Visualize changes instantly and copy the code.', category: ToolCategory.CSS },
  { id: 'text-shadow-generator', name: 'Text Shadow Generator', description: 'Create catchy text shadow effects visually. Layer multiple shadows, adjust blur and color. Perfect for headings and creative typography.', category: ToolCategory.CSS },
  { id: 'glassmorphism-generator', name: 'Glassmorphism Generator', description: 'Design modern glassmorphism effects. Adjust blur, transparency, and saturation. Get the complete CSS backdrop-filter code instantly.', category: ToolCategory.CSS },
  { id: 'css-color-code-converter', name: 'CSS Color Code Converter', description: 'Convert colors between Hex, RGB, HSL, and CMYK formats. Pick colors visually and get accurate codes for web and print design.', category: ToolCategory.CSS },
  { id: 'css-triangle-generator', name: 'CSS Triangle Generator', description: 'Generate pure CSS triangles without images. Adjust size, color, and direction. Get the exact border-width and border-color code.', category: ToolCategory.CSS },
  { id: 'css-cursors', name: 'CSS Cursors', description: 'Preview all standard CSS cursor styles interactively. Hover to see the effect and copy the exact CSS value for your UI elements.', category: ToolCategory.CSS },
  { id: 'css-borders', name: 'CSS Borders', description: 'Visualize and generate CSS border styles. Test different widths, colors, and types like solid, dashed, or double. Copy the code instantly.', category: ToolCategory.CSS },
  { id: 'css-patterns', name: 'CSS Patterns', description: 'Create lightweight, scalable background patterns with pure CSS gradients. Customize colors and sizes without using heavy image files.', category: ToolCategory.CSS },

  // Coding Tools
  { id: 'base64-converter', name: 'Base64 Converter', description: 'Encode and decode text or files to Base64 format. Secure, client-side processing for safe data transmission via email or JSON.', category: ToolCategory.CODING },
  { id: 'url-encoder', name: 'URL Encoder', description: 'Encode or decode URLs to ensure they are safe for the web. Handle special characters and query parameters correctly with standard percent-encoding.', category: ToolCategory.CODING },
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Beautify and validate your JSON data. Fix indentation, spot syntax errors, and make minified JSON readable instantly.', category: ToolCategory.CODING },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate cryptographically secure v4 UUIDs (Universally Unique Identifiers). Create unique IDs for databases and systems instantly.', category: ToolCategory.CODING },
  { id: 'password-generator', name: 'Password Generator', description: 'Create strong, random passwords to keep your accounts safe. Customize length and characters (symbols, numbers) for maximum security.', category: ToolCategory.CODING },
  { id: 'hash-generator', name: 'Hash Generator', description: 'Generate secure cryptographic hashes like MD5, SHA-1, SHA-256, and SHA-512. Verify file integrity and protect sensitive data.', category: ToolCategory.CODING },
  { id: 'jwt-debugger', name: 'JWT Debugger', description: 'Decode and inspect JSON Web Tokens (JWTs). View header, payload, and signature details to debug authentication issues easily.', category: ToolCategory.CODING },
  { id: 'markdown-previewer', name: 'Markdown Previewer', description: 'Write and preview Markdown in real-time. See your formatted text side-by-side with your code. Supports GFM (GitHub Flavored Markdown) and common syntax.', category: ToolCategory.CODING },
  { id: 'diff-checker', name: 'Diff Checker', description: 'Compare two blocks of text or code to find the differences. Highlights additions and deletions visually. Perfect for reviewing code changes.', category: ToolCategory.CODING },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test and debug JavaScript regular expressions. Highlight matches and capture groups in real-time. Includes a cheat sheet for common patterns.', category: ToolCategory.CODING },
  { id: 'json-to-typescript', name: 'JSON to TypeScript', description: 'Instantly generate TypeScript interfaces from JSON objects. Type-safe your API responses without manual coding. Supports nested objects and arrays.', category: ToolCategory.CODING },
  { id: 'code-to-image', name: 'Code to Image', description: 'Create beautiful, shareable images of your code. Customize syntax highlighting, background colors, and window styles for social media.', category: ToolCategory.CODING },
  { id: 'sql-formatter', name: 'SQL Formatter', description: 'Format and beautify standard SQL queries. Fix indentation and keyword casing for better readability. Debug complex queries faster.', category: ToolCategory.CODING },
  { id: 'cron-generator', name: 'Cron Expression Generator', description: 'Visually build and test Cron expressions. Set schedules for scripts and jobs without memorizing syntax. See the next run dates instantly.', category: ToolCategory.CODING },
  { id: 'meta-tag-generator', name: 'Meta Tag Generator', description: 'Generate SEO-friendly meta tags for your website. Create Open Graph and Twitter Card tags to improve social sharing and search visibility.', category: ToolCategory.CODING },
  { id: 'chmod-calculator', name: 'Chmod Calculator', description: 'Calculate Linux file permissions visually. Convert between numeric (755) and symbolic (rwxr-xr-x) formats. Essential for server management.', category: ToolCategory.CODING },
  { id: 'xml-formatter', name: 'XML Formatter', description: 'Format and validate XML strings. Fix indentation and minify files. Makes complex XML structures easy to read and debug.', category: ToolCategory.CODING },
  { id: 'string-escaper', name: 'String Escaper', description: 'Escape safely. Automatically escape special characters in strings for JavaScript, JSON, SQL, and HTML. Prevent syntax errors and security issues.', category: ToolCategory.CODING },
  { id: 'html-entity', name: 'HTML Entity Converter', description: 'Decode and encode HTML entities. Convert reserved characters like <, >, and & into simple, safe codes. Essential for web development.', category: ToolCategory.CODING },
  { id: 'json-yaml-converter', name: 'JSON <> YAML Converter', description: 'Convert between JSON and YAML formats instantly. Ideal for configuration files (Kubernetes, Docker) and data serialization. Error-free conversion.', category: ToolCategory.CODING },

  // Color Tools
  { id: 'color-palette-generator', name: 'Color Palette Generator', description: 'Generate beautiful, harmonious color palettes for your designs. Extract colors from images or create random schemes. Export to CSS instantly.', category: ToolCategory.COLOR },
  { id: 'color-theme-wheel', name: 'Color Theme Wheel', description: 'Find perfect color combinations using the color wheel. Create complementary, analogous, and triadic schemes for professional design.', category: ToolCategory.COLOR },
  { id: 'contrast-checker', name: 'Contrast Checker', description: 'Ensure your text is readable for everyone. Check color contrast against WCAG accessibility standards (AA & AAA). Improve usability instantly.', category: ToolCategory.COLOR },

  // Math/Calculator Tools
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between thousands of units (length, weight, temperature, etc.). Fast, accurate, and easy to use. Perfect for students and professionals.', category: ToolCategory.MATH },
  { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate your Body Mass Index (BMI) easily. Enter your height and weight to get an instant check on your health status.', category: ToolCategory.MATH },
  { id: 'currency-converter', name: 'Currency Converter', description: 'Get real-time exchange rates for over 150 currencies. Convert money instantly with up-to-date market data. Perfect for travel and business.', category: ToolCategory.MATH },
  { id: 'date-calculator', name: 'Date Calculator', description: 'Calculate the difference between two dates. Find out exactly how many days, weeks, or months are until your next deadline or event.', category: ToolCategory.MATH },
  { id: 'loan-calculator', name: 'Loan Calculator', description: 'Understand your loan costs. Calculate monthly payments, total interest, and amortization schedules for mortgages, auto loans, and more.', category: ToolCategory.MATH },
  { id: 'percentage-calculator', name: 'Percentage Calculator', description: 'Solve any percentage problem instantly. Calculate increases, decreases, differences, and parts of a whole value. Essential for finance and math.', category: ToolCategory.MATH },
  { id: 'roman-numeral-converter', name: 'Roman Numeral Converter', description: 'Convert numbers to Roman Numerals and back instantly. Learn the logic behind the symbols. Perfect for dates, history, and styling.', category: ToolCategory.MATH },
  { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate your exact age in years, months, and days. Find out how many seconds you\'ve been alive or the time until your next birthday.', category: ToolCategory.MATH },
  { id: 'random-number-generator', name: 'Random Number Generator', description: 'Generate true random numbers for giveaways, games, or simulations. Customize range, duplicates, and quantity. Secure and unbiased.', category: ToolCategory.MATH },

  // Productivity Tools
  { id: 'pomodoro-timer', name: 'Pomodoro Timer', description: 'Boost productivity with the Pomodoro technique. Focus for 25 minutes, take a break, and track your completed sessions. Stay in the flow.', category: ToolCategory.PRODUCTIVITY },
  { id: 'world-clock', name: 'World Clock', description: 'Check the current time in cities around the globe. Compare time zones instantly to plan meetings and calls across the world.', category: ToolCategory.PRODUCTIVITY },
  { id: 'timers-and-stopwatch', name: 'Timers and Stopwatch', description: 'Simple, reliable countdown timers and stopwatches. Track laps, set multiple alarms, and manage your time effectively in the browser.', category: ToolCategory.PRODUCTIVITY },
  { id: 'todo-list', name: 'Todo List', description: 'Organize your life with a simple, effective Todo List. Add tasks, prioritize them, and check them off. Your data stays in your browser.', category: ToolCategory.PRODUCTIVITY },
  { id: 'utm-builder', name: 'UTM Builder', description: 'Build perfect tracking URLs for your marketing campaigns. Add sources, mediums, and content tags to measure performance accurately.', category: ToolCategory.PRODUCTIVITY },
  { id: 'timezone-converter', name: 'Timezone Converter', description: 'Convert time across the globe effortlessly. Compare multiple time zones, handle DST automatically, and plan international events with ease.', category: ToolCategory.PRODUCTIVITY },

  // Fun Tools
  { id: 'meme-generator', name: 'Meme Generator', description: 'Create hilarious memes in seconds. Choose from popular templates or upload your own image. Add custom text and download instantly.', category: ToolCategory.FUN },
  { id: 'fancy-font-generator', name: 'Fancy Font Generator', description: 'Transform your text into cool, stylish fonts for social media. Copy and paste 𝐵𝑜𝑙𝑑, 𝐼𝑡𝑎𝑙𝑖𝑐, 𝔊𝔬𝔱𝔥𝔦𝔠, and more unicode styles.', category: ToolCategory.FUN },
  { id: 'morse-converter', name: 'Morse Code Converter', description: 'Translate text to Morse code and back. Listen to the audio output or download it. Perfect for learning or secret messages.', category: ToolCategory.FUN },
  { id: 'keycode-info', name: 'Keycode Info', description: 'Press any key to get its JavaScript event code. View `event.key`, `event.code`, and `event.which` instantly. Essential for web developers.', category: ToolCategory.FUN },
  { id: 'screen-info', name: 'Screen Info', description: 'Get detailed specs about your screen instantly. Check viewport size, pixel ratio, color depth, and orientation for development and testing.', category: ToolCategory.FUN },
  { id: 'text-to-speech', name: 'Text to Speech', description: 'Convert text into lifelike spoken audio. Choose from different voices, adjust pitch and rate, and listen directly in your browser.', category: ToolCategory.FUN },
  { id: 'signature-pad', name: 'Signature Pad', description: 'Create a digital signature online. Draw with your mouse or finger, customize the pen style, and download a transparent PNG image.', category: ToolCategory.FUN },

  // Video Tools
  { id: 'video-compressor', name: 'Video Compressor', description: 'Reduce video file size without losing quality. Optimize videos for web, email, or social media. Fast, private, and runs in your browser.', category: ToolCategory.VIDEO },
  { id: 'video-to-audio-converter', name: 'Video to Audio Converter', description: 'Extract high-quality audio tracks from video files. Save as MP3 or WAV. Perfect for turning video lectures or music clips into audio.', category: ToolCategory.VIDEO },
  { id: 'gif-maker', name: 'GIF Maker', description: 'Create animated GIFs from your video clips. Select the perfect segment, adjust speed and size. Make moments looping and shareable instantly.', category: ToolCategory.VIDEO },
  { id: 'trim-video', name: 'Trim Video', description: 'Cut out the unwanted parts of your video. Select start and end points precisely. Save the best moments without re-encoding quality loss.', category: ToolCategory.VIDEO },
  { id: 'format-converter', name: 'Format Converter', description: 'Convert videos to MP4, MKV, AVI, and MOV. Ensure compatibility with any device or player. Fast conversion with adjustable quality settings.', category: ToolCategory.VIDEO },
  { id: 'video-thumbnail-extractor', name: 'Video Thumbnail Extractor', description: 'Extract high-quality images from any precise moment in your video. Download custom thumbnails for YouTube or social media.', category: ToolCategory.VIDEO },
  { id: 'video-mute', name: 'Video Mute', description: 'Remove the audio track from your video clips instantly. Create silent videos for background loops or copyright safety.', category: ToolCategory.VIDEO },
  { id: 'watermark-adder', name: 'Watermark Adder', description: 'Protect your content by adding a text or image watermark to your videos. Customize position, opacity, and size easily.', category: ToolCategory.VIDEO },

  // File Conversion Tools
  { id: 'json-csv-converter', name: 'JSON <> CSV Converter', description: 'Convert data between JSON and CSV formats. Flatten nested JSON objects to CSV rows or parse CSV to structured JSON arrays.', category: ToolCategory.MISC },
  { id: 'csv-xlsx-converter', name: 'Data Converter', description: 'Convert CSV files to Excel (XLSX) spreadsheets and back. Reliable data transformation for analysis and reporting.', category: ToolCategory.CODING },

  // SVG Tools
  { id: 'svg-to-data-uri', name: 'SVG to Data URI', description: 'Convert SVG code or files into Base64 Data URIs. Embed icons directly in CSS or HTML to reduce network requests.', category: ToolCategory.MISC },
  { id: 'svg-blob-generator', name: 'SVG Blob Generator', description: 'Create organic, smooth blob shapes for your design. Randomize uniqueness and download as SVG or copy the code.', category: ToolCategory.MISC },
  { id: 'svg-wave-generator', name: 'SVG Wave Generator', description: 'Generate beautiful SVG waves for website dividers. Adjust amplitude, layers, and color. Copy code for instant use.', category: ToolCategory.MISC },

  // Other Tools
  { id: 'binary-converter', name: 'Binary Converter', description: 'Translate text to binary code (010101) and back. Understand how computers store data or encode secret messages.', category: ToolCategory.MISC },
  { id: 'password-strength', name: 'Password Strength Checker', description: 'Test how strong your password is. Get instant feedback on crack time and tips to improve security against hackers.', category: ToolCategory.MISC },
  { id: 'list-randomizer', name: 'List Randomizer', description: 'Shuffle any list of items, names, or numbers instantly. Perfect for raffles, lottery picks, or randomizing team order.', category: ToolCategory.MISC },
  { id: 'device-resolutions', name: 'Device Resolutions', description: 'Reference guide for common screen sizes. View viewports for iPhones, Androids, tablets, and laptops to test responsiveness.', category: ToolCategory.MISC },
];

/**
 * Map tool IDs to component file paths for dynamic loading
 * This allows lazy-loading without importing all components upfront
 */
export const TOOL_COMPONENT_MAP: Record<string, string> = {
  'comma-separator': 'CommaSeparator',
  'case-converter': 'CaseConverter',
  'word-counter': 'WordCounter',
  'lorem-ipsum-generator': 'LoremIpsumGenerator',
  'base64-converter': 'Base64Converter',
  'url-encoder': 'UrlEncoder',
  'json-formatter': 'JsonFormatter',
  'uuid-generator': 'UuidGenerator',
  'password-generator': 'PasswordGenerator',
  'image-to-base64': 'ImageToBase64',
  'text-reverser': 'TextReverser',
  'base64-to-image': 'Base64ToImage',
  'box-shadow-generator': 'BoxShadowGenerator',
  'css-gradient-generator': 'CssGradientGenerator',
  'border-radius-generator': 'BorderRadiusGenerator',
  'text-shadow-generator': 'TextShadowGenerator',
  'glassmorphism-generator': 'GlassmorphismGenerator',
  'hash-generator': 'HashGenerator',
  'jwt-debugger': 'JwtDebugger',
  'qr-code-generator': 'QrCodeGenerator',
  'markdown-previewer': 'MarkdownPreviewer',
  'date-calculator': 'DateCalculator',
  'diff-checker': 'DiffChecker',
  'pomodoro-timer': 'PomodoroTimer',
  'meme-generator': 'MemeGenerator',
  'regex-tester': 'RegexTester',
  'color-palette-generator': 'ColorPaletteGenerator',
  'color-theme-wheel': 'ColorThemeWheel',
  'unit-converter': 'UnitConverter',
  'bmi-calculator': 'BmiCalculator',
  'todo-list': 'TodoList',
  'currency-converter': 'CurrencyConverter',
  'world-clock': 'WorldClock',
  'timers-and-stopwatch': 'TimersAndStopwatch',
  'json-csv-converter': 'JsonCsvConverter',
  'csv-xlsx-converter': 'CsvXlsxConverter',
  'character-counter': 'CharacterCounter',
  'keyword-density-analyzer': 'KeywordDensityAnalyzer',
  'readability-score-calculator': 'ReadabilityScore',
  'loan-calculator': 'LoanCalculator',
  'timezone-converter': 'TimeZoneConverter',
  'css-color-code-converter': 'CssColorCodeConverter',
  'video-compressor': 'VideoCompressor',
  'video-to-audio-converter': 'VideoToAudioConverter',
  'gif-maker': 'GifMaker',
  'trim-video': 'TrimVideo',
  'format-converter': 'FormatConverter',
  'video-thumbnail-extractor': 'VideoThumbnailExtractor',
  'video-mute': 'VideoMute',
  'watermark-adder': 'WatermarkAdder',
  'image-resizer': 'ImageResizer',
  'image-converter': 'ImageConverter',
  'image-compressor': 'ImageCompressor',
  'json-to-typescript': 'JsonToTypescript',
  'code-to-image': 'CodeToImage',
  'sql-formatter': 'SqlFormatter',
  'cron-generator': 'CronParser',
  'slug-generator': 'SlugGenerator',
  'meta-tag-generator': 'MetaTagGenerator',
  'contrast-checker': 'ContrastChecker',
  'chmod-calculator': 'ChmodCalculator',
  'utm-builder': 'UtmBuilder',
  'aspect-ratio-calculator': 'AspectRatio',
  'css-triangle-generator': 'CssTriangle',
  'xml-formatter': 'XmlFormatter',
  'morse-converter': 'MorseConverter',
  'binary-converter': 'BinaryConverter',
  'password-strength': 'PasswordStrength',
  'string-escaper': 'StringEscaper',
  'percentage-calculator': 'PercentageCalculator',
  'markdown-table-generator': 'MarkdownTable',
  'list-randomizer': 'ListRandomizer',
  'text-cleaner': 'TextCleaner',
  'svg-to-data-uri': 'SvgToDataUri',
  'json-yaml-converter': 'JsonYamlConverter',
  'youtube-thumbnail': 'YouTubeThumbnail',
  'fancy-font-generator': 'FancyFontGenerator',
  'hashtag-extractor': 'HashtagExtractor',
  'image-filters': 'ImageFilters',
  'svg-blob-generator': 'SvgBlobGenerator',
  'svg-wave-generator': 'SvgWaveGenerator',
  'keycode-info': 'KeycodeInfo',
  'screen-info': 'ScreenInfo',
  'text-to-speech': 'TextToSpeech',
  'roman-numeral-converter': 'RomanNumeral',
  'age-calculator': 'AgeCalculator',
  'random-number-generator': 'RandomNumber',
  'duplicate-remover': 'DuplicateRemover',
  'html-entity': 'HtmlEntity',
  'css-cursors': 'CssCursors',
  'device-resolutions': 'DeviceResolutions',
  'lorem-image-generator': 'LoremImage',
  'css-borders': 'CssBorders',
  'css-patterns': 'CssPatterns',
  'signature-pad': 'SignaturePad',
};

/**
 * Create tool details dynamically
 * Used by the server to avoid importing all components
 */
import { TOOL_DETAILS } from './tool-details';

/**
 * Create tool details dynamically
 * Used by the server to avoid importing all components
 */
export function getToolDetails(toolId: string) {
  const PRIVACY_STATEMENT_DESC =
    'All calculations and data processing for this tool are performed locally in your browser. We do not send any of your data to our servers, ensuring your information remains private and secure.';

  const details = TOOL_DETAILS[toolId];

  if (details) {
    return details;
  }

  // Fallback if details are not found
  return {
    introduction: '',
    howToUse: [],
    features: [],
    privacy: PRIVACY_STATEMENT_DESC,
    explanation: '',
    usageExamples: [],
    underlyingConcept: '',
    faqs: [],
    tip: '',
  };
}
