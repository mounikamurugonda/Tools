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
  { id: 'case-converter', name: 'Case Converter', description: 'Convert text between different cases.', category: ToolCategory.TEXT },
  { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, and sentences in text.', category: ToolCategory.TEXT },
  { id: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', description: 'Generate placeholder Lorem Ipsum text.', category: ToolCategory.TEXT },
  { id: 'text-reverser', name: 'Text Reverser', description: 'Reverse text or words instantly.', category: ToolCategory.TEXT },
  { id: 'character-counter', name: 'Character Counter', description: 'Count characters including spaces and special characters.', category: ToolCategory.TEXT },
  { id: 'slug-generator', name: 'Slug Generator', description: 'Convert text into SEO-friendly URL slugs.', category: ToolCategory.TEXT },
  { id: 'keyword-density-analyzer', name: 'Keyword Density Analyzer', description: 'Analyze the keyword density of a text.', category: ToolCategory.TEXT },
  { id: 'readability-score', name: 'Readability Score', description: 'Calculate readability score of your text.', category: ToolCategory.TEXT },
  { id: 'text-cleaner', name: 'Text Cleaner', description: 'Clean and format text by removing extra whitespace.', category: ToolCategory.TEXT },
  { id: 'markdown-table', name: 'Markdown Table Generator', description: 'Create Markdown tables easily.', category: ToolCategory.TEXT },
  { id: 'hashtag-extractor', name: 'Hashtag Extractor', description: 'Extract hashtags from text.', category: ToolCategory.TEXT },
  { id: 'duplicate-remover', name: 'Duplicate Remover', description: 'Remove duplicate lines from text.', category: ToolCategory.TEXT },

  // Image Tools
  { id: 'base64-to-image', name: 'Base64 to Image', description: 'Convert Base64 strings to images.', category: ToolCategory.IMAGE },
  { id: 'image-to-base64', name: 'Image to Base64', description: 'Convert images to Base64 strings.', category: ToolCategory.IMAGE },
  { id: 'qr-code-generator', name: 'QR Code Generator', description: 'Generate QR codes from text or URLs.', category: ToolCategory.IMAGE },
  { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images to custom dimensions.', category: ToolCategory.IMAGE },
  { id: 'image-converter', name: 'Image Converter', description: 'Convert images between different formats.', category: ToolCategory.IMAGE },
  { id: 'image-compressor', name: 'Image Compressor', description: 'Compress images to reduce file size.', category: ToolCategory.IMAGE },
  { id: 'image-filters', name: 'Image Filters', description: 'Apply filters and effects to images.', category: ToolCategory.IMAGE },
  { id: 'youtube-thumbnail', name: 'YouTube Thumbnail Downloader', description: 'Download YouTube video thumbnails.', category: ToolCategory.IMAGE },
  { id: 'aspect-ratio-calculator', name: 'Aspect Ratio Calculator', description: 'Calculate dimensions and aspect ratios for images.', category: ToolCategory.IMAGE },
  { id: 'lorem-image-generator', name: 'Lorem Image Generator', description: 'Generate placeholder images.', category: ToolCategory.IMAGE },

  // CSS Tools
  { id: 'box-shadow-generator', name: 'Box Shadow Generator', description: 'Generate CSS box shadow code.', category: ToolCategory.CSS },
  { id: 'css-gradient-generator', name: 'CSS Gradient Generator', description: 'Create CSS gradients visually.', category: ToolCategory.CSS },
  { id: 'border-radius-generator', name: 'Border Radius Generator', description: 'Generate border radius CSS.', category: ToolCategory.CSS },
  { id: 'text-shadow-generator', name: 'Text Shadow Generator', description: 'Create text shadow effects.', category: ToolCategory.CSS },
  { id: 'glassmorphism-generator', name: 'Glassmorphism Generator', description: 'Design glassmorphism effects.', category: ToolCategory.CSS },
  { id: 'css-color-code-converter', name: 'CSS Color Code Converter', description: 'Convert between color formats.', category: ToolCategory.CSS },
  { id: 'css-triangle-generator', name: 'CSS Triangle Generator', description: 'Generate CSS triangles.', category: ToolCategory.CSS },
  { id: 'css-cursors', name: 'CSS Cursors', description: 'Preview CSS cursor styles.', category: ToolCategory.CSS },
  { id: 'css-borders', name: 'CSS Borders', description: 'Generate CSS border styles.', category: ToolCategory.CSS },
  { id: 'css-patterns', name: 'CSS Patterns', description: 'Create CSS background patterns.', category: ToolCategory.CSS },

  // Coding Tools
  { id: 'base64-converter', name: 'Base64 Converter', description: 'Encode/decode Base64 strings.', category: ToolCategory.CODING },
  { id: 'url-encoder', name: 'URL Encoder', description: 'Encode/decode URLs and URI components.', category: ToolCategory.CODING },
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Format, validate, and beautify JSON.', category: ToolCategory.CODING },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate UUIDs and GUIDs.', category: ToolCategory.CODING },
  { id: 'password-generator', name: 'Password Generator', description: 'Generate strong, secure passwords.', category: ToolCategory.CODING },
  { id: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5, SHA hashes.', category: ToolCategory.CODING },
  { id: 'jwt-debugger', name: 'JWT Debugger', description: 'Decode and debug JSON Web Tokens.', category: ToolCategory.CODING },
  { id: 'markdown-previewer', name: 'Markdown Previewer', description: 'Preview Markdown in real-time.', category: ToolCategory.CODING },
  { id: 'diff-checker', name: 'Diff Checker', description: 'Compare and find differences between texts.', category: ToolCategory.CODING },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test and debug regular expressions.', category: ToolCategory.CODING },
  { id: 'json-to-typescript', name: 'JSON to TypeScript', description: 'Generate TypeScript interfaces from JSON.', category: ToolCategory.CODING },
  { id: 'code-to-image', name: 'Code to Image', description: 'Create beautiful code snippet images.', category: ToolCategory.CODING },
  { id: 'sql-formatter', name: 'SQL Formatter', description: 'Format and beautify SQL queries.', category: ToolCategory.CODING },
  { id: 'cron-generator', name: 'Cron Expression Generator', description: 'Visually build cron job schedules.', category: ToolCategory.CODING },
  { id: 'meta-tag-generator', name: 'Meta Tag Generator', description: 'Generate SEO meta tags.', category: ToolCategory.CODING },
  { id: 'chmod-calculator', name: 'Chmod Calculator', description: 'Visual calculator for Unix permissions.', category: ToolCategory.CODING },
  { id: 'xml-formatter', name: 'XML Formatter', description: 'Format and validate XML.', category: ToolCategory.CODING },
  { id: 'string-escaper', name: 'String Escaper', description: 'Escape special characters in strings.', category: ToolCategory.CODING },
  { id: 'html-entity', name: 'HTML Entity Converter', description: 'Convert HTML entities.', category: ToolCategory.CODING },
  { id: 'yaml-to-json', name: 'YAML to JSON', description: 'Convert YAML to JSON.', category: ToolCategory.CODING },
  { id: 'json-to-yaml', name: 'JSON to YAML', description: 'Convert JSON to YAML.', category: ToolCategory.CODING },

  // Color Tools
  { id: 'color-palette-generator', name: 'Color Palette Generator', description: 'Generate color palettes.', category: ToolCategory.COLOR },
  { id: 'color-theme-wheel', name: 'Color Theme Wheel', description: 'Create complementary color schemes.', category: ToolCategory.COLOR },
  { id: 'contrast-checker', name: 'Contrast Checker', description: 'Check WCAG color contrast.', category: ToolCategory.COLOR },

  // Math/Calculator Tools
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between units of measurement.', category: ToolCategory.MATH },
  { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate Body Mass Index.', category: ToolCategory.MATH },
  { id: 'currency-converter', name: 'Currency Converter', description: 'Convert between currencies.', category: ToolCategory.MATH },
  { id: 'date-calculator', name: 'Date Calculator', description: 'Calculate date differences.', category: ToolCategory.MATH },
  { id: 'loan-calculator', name: 'Loan Calculator', description: 'Calculate loan payments.', category: ToolCategory.MATH },
  { id: 'percentage-calculator', name: 'Percentage Calculator', description: 'Calculate percentages.', category: ToolCategory.MATH },
  { id: 'roman-numeral-converter', name: 'Roman Numeral Converter', description: 'Convert to/from Roman numerals.', category: ToolCategory.MATH },
  { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate exact age.', category: ToolCategory.MATH },
  { id: 'random-number-generator', name: 'Random Number Generator', description: 'Generate random numbers.', category: ToolCategory.MATH },

  // Productivity Tools
  { id: 'pomodoro-timer', name: 'Pomodoro Timer', description: 'Focus timer using Pomodoro Technique.', category: ToolCategory.PRODUCTIVITY },
  { id: 'world-clock', name: 'World Clock', description: 'Check time in different cities.', category: ToolCategory.PRODUCTIVITY },
  { id: 'timers-and-stopwatch', name: 'Timers and Stopwatch', description: 'Simple timer and stopwatch.', category: ToolCategory.PRODUCTIVITY },
  { id: 'todo-list', name: 'Todo List', description: 'Manage your tasks.', category: ToolCategory.PRODUCTIVITY },
  { id: 'utm-builder', name: 'UTM Builder', description: 'Build tracking URLs for campaigns.', category: ToolCategory.PRODUCTIVITY },
  { id: 'timezone-converter', name: 'Timezone Converter', description: 'Convert between time zones.', category: ToolCategory.PRODUCTIVITY },

  // Fun Tools
  { id: 'meme-generator', name: 'Meme Generator', description: 'Create memes with templates.', category: ToolCategory.FUN },
  { id: 'fancy-font-generator', name: 'Fancy Font Generator', description: 'Generate fancy text styles.', category: ToolCategory.FUN },
  { id: 'morse-converter', name: 'Morse Code Converter', description: 'Convert text to Morse code.', category: ToolCategory.FUN },
  { id: 'keycode-info', name: 'Keycode Info', description: 'Get JavaScript key codes.', category: ToolCategory.FUN },
  { id: 'screen-info', name: 'Screen Info', description: 'Get device screen information.', category: ToolCategory.FUN },
  { id: 'text-to-speech', name: 'Text to Speech', description: 'Convert text to speech.', category: ToolCategory.FUN },
  { id: 'signature-pad', name: 'Signature Pad', description: 'Draw digital signatures.', category: ToolCategory.FUN },

  // Video Tools
  { id: 'video-compressor', name: 'Video Compressor', description: 'Compress video files.', category: ToolCategory.VIDEO },
  { id: 'video-to-audio', name: 'Video to Audio Converter', description: 'Extract audio from videos.', category: ToolCategory.VIDEO },
  { id: 'gif-maker', name: 'GIF Maker', description: 'Create GIFs from video.', category: ToolCategory.VIDEO },
  { id: 'trim-video', name: 'Trim Video', description: 'Trim video duration.', category: ToolCategory.VIDEO },
  { id: 'format-converter', name: 'Format Converter', description: 'Convert video formats.', category: ToolCategory.VIDEO },
  { id: 'video-thumbnail-extractor', name: 'Video Thumbnail Extractor', description: 'Extract video thumbnails.', category: ToolCategory.VIDEO },
  { id: 'video-mute', name: 'Video Mute', description: 'Remove audio from videos.', category: ToolCategory.VIDEO },
  { id: 'watermark-adder', name: 'Watermark Adder', description: 'Add watermarks to videos.', category: ToolCategory.VIDEO },

  // File Conversion Tools
  { id: 'csv-to-json', name: 'CSV to JSON', description: 'Convert CSV to JSON format.', category: ToolCategory.MISC },
  { id: 'json-to-csv', name: 'JSON to CSV', description: 'Convert JSON to CSV format.', category: ToolCategory.MISC },
  { id: 'csv-to-xlsx', name: 'CSV to XLSX', description: 'Convert CSV to Excel format.', category: ToolCategory.MISC },

  // SVG Tools
  { id: 'svg-to-data-uri', name: 'SVG to Data URI', description: 'Convert SVG to Data URI.', category: ToolCategory.MISC },
  { id: 'svg-blob-generator', name: 'SVG Blob Generator', description: 'Generate blob shapes in SVG.', category: ToolCategory.MISC },
  { id: 'svg-wave-generator', name: 'SVG Wave Generator', description: 'Create wave SVGs.', category: ToolCategory.MISC },

  // Other Tools
  { id: 'binary-converter', name: 'Binary Converter', description: 'Convert between binary and decimal.', category: ToolCategory.MISC },
  { id: 'password-strength', name: 'Password Strength Checker', description: 'Check password strength.', category: ToolCategory.MISC },
  { id: 'list-randomizer', name: 'List Randomizer', description: 'Randomize items in a list.', category: ToolCategory.MISC },
  { id: 'device-resolutions', name: 'Device Resolutions', description: 'Common device screen sizes.', category: ToolCategory.MISC },
];

/**
 * Map tool IDs to component file paths for dynamic loading
 * This allows lazy-loading without importing all components upfront
 */
export const TOOL_COMPONENT_MAP: Record<string, string> = {
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
  'csv-to-json': 'CsvToJson',
  'json-to-csv': 'JsonToCsv',
  'csv-to-xlsx': 'CsvXlsxConverter',
  'character-counter': 'CharacterCounter',
  'keyword-density-analyzer': 'KeywordDensityAnalyzer',
  'readability-score': 'ReadabilityScore',
  'loan-calculator': 'LoanCalculator',
  'timezone-converter': 'TimeZoneConverter',
  'css-color-code-converter': 'CssColorCodeConverter',
  'video-compressor': 'VideoCompressor',
  'video-to-audio': 'VideoToAudioConverter',
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
  'markdown-table': 'MarkdownTable',
  'list-randomizer': 'ListRandomizer',
  'text-cleaner': 'TextCleaner',
  'svg-to-data-uri': 'SvgToDataUri',
  'yaml-to-json': 'YamlToJson',
  'json-to-yaml': 'JsonToYaml',
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
