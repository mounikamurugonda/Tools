import React from "react";
import { Tool, ToolCategory } from "./types";
import dynamic from "next/dynamic";

const CaseConverter = dynamic(() => import("@/tools/CaseConverter"));
const WordCounter = dynamic(() => import("@/tools/WordCounter"));
const LoremIpsumGenerator = dynamic(
  () => import("@/tools/LoremIpsumGenerator")
);
const Base64Converter = dynamic(() => import("@/tools/Base64Converter"));
const UrlEncoder = dynamic(() => import("@/tools/UrlEncoder"));
const JsonFormatter = dynamic(() => import("@/tools/JsonFormatter"));
const UuidGenerator = dynamic(() => import("@/tools/UuidGenerator"));
const PasswordGenerator = dynamic(() => import("@/tools/PasswordGenerator"));
const ImageToBase64 = dynamic(() => import("@/tools/ImageToBase64"));
const TextReverser = dynamic(() => import("@/tools/TextReverser"));
const Base64ToImage = dynamic(() => import("@/tools/Base64ToImage"));
const BoxShadowGenerator = dynamic(() => import("@/tools/BoxShadowGenerator"));
const CssGradientGenerator = dynamic(
  () => import("@/tools/CssGradientGenerator")
);
const BorderRadiusGenerator = dynamic(
  () => import("@/tools/BorderRadiusGenerator")
);
const TextShadowGenerator = dynamic(
  () => import("@/tools/TextShadowGenerator")
);
const GlassmorphismGenerator = dynamic(
  () => import("@/tools/GlassmorphismGenerator")
);
const HashGenerator = dynamic(() => import("@/tools/HashGenerator"));
const JwtDebugger = dynamic(() => import("@/tools/JwtDebugger"));
const QrCodeGenerator = dynamic(() => import("@/tools/QrCodeGenerator"));
const MarkdownPreviewer = dynamic(() => import("@/tools/MarkdownPreviewer"));
const DateCalculator = dynamic(() => import("@/tools/DateCalculator"));
const DiffChecker = dynamic(() => import("@/tools/DiffChecker"));
const PomodoroTimer = dynamic(() => import("@/tools/PomodoroTimer"));
const MemeGenerator = dynamic(() => import("@/tools/MemeGenerator"));
const RegexTester = dynamic(() => import("@/tools/RegexTester"));
const ColorPaletteGenerator = dynamic(
  () => import("@/tools/ColorPaletteGenerator")
);
const ColorThemeWheel = dynamic(() => import("@/tools/ColorThemeWheel"));
const UnitConverter = dynamic(() => import("@/tools/UnitConverter"));
const BmiCalculator = dynamic(() => import("@/tools/BmiCalculator"));
const TodoList = dynamic(() => import("@/tools/TodoList"));
const CurrencyConverter = dynamic(() => import("@/tools/CurrencyConverter"));
const WorldClock = dynamic(() => import("@/tools/WorldClock"));
const TimersAndStopwatch = dynamic(() => import("@/tools/TimersAndStopwatch"));
const CsvToJson = dynamic(() => import("@/tools/CsvToJson"));
const JsonToCsv = dynamic(() => import("@/tools/JsonToCsv"));
const CsvXlsxConverter = dynamic(() => import("@/tools/CsvXlsxConverter"));
const CharacterCounter = dynamic(() => import("@/tools/CharacterCounter"));
const KeywordDensityAnalyzer = dynamic(
  () => import("@/tools/KeywordDensityAnalyzer")
);
const ReadabilityScore = dynamic(() => import("@/tools/ReadabilityScore"));
const LoanCalculator = dynamic(() => import("@/tools/LoanCalculator"));
const TimeZoneConverter = dynamic(() => import("@/tools/TimeZoneConverter"));
const CssColorCodeConverter = dynamic(
  () => import("@/tools/CssColorCodeConverter")
);

const VideoCompressor = dynamic(() => import("@/tools/VideoCompressor"));
const VideoToAudioConverter = dynamic(
  () => import("@/tools/VideoToAudioConverter")
);
const GifMaker = dynamic(() => import("@/tools/GifMaker"));
const TrimVideo = dynamic(() => import("@/tools/TrimVideo"));
const FormatConverter = dynamic(() => import("@/tools/FormatConverter"));
const VideoThumbnailExtractor = dynamic(
  () => import("@/tools/VideoThumbnailExtractor")
);
const VideoMute = dynamic(() => import("@/tools/VideoMute"));
const WatermarkAdder = dynamic(() => import("@/tools/WatermarkAdder"));
const ImageResizer = dynamic(() => import("@/tools/ImageResizer"));
const ImageConverter = dynamic(() => import("@/tools/ImageConverter"));
const ImageCompressor = dynamic(() => import("@/tools/ImageCompressor"));

const JsonToTypescript = dynamic(() => import("@/tools/JsonToTypescript"));
const CodeToImage = dynamic(() => import("@/tools/CodeToImage"));
const SqlFormatter = dynamic(() => import("@/tools/SqlFormatter"));
const CronParser = dynamic(() => import("@/tools/CronParser"));
const SlugGenerator = dynamic(() => import("@/tools/SlugGenerator"));
const MetaTagGenerator = dynamic(() => import("@/tools/MetaTagGenerator"));
const ContrastChecker = dynamic(() => import("@/tools/ContrastChecker"));
const ChmodCalculator = dynamic(() => import("@/tools/ChmodCalculator"));
const UtmBuilder = dynamic(() => import("@/tools/UtmBuilder"));
const AspectRatio = dynamic(() => import("@/tools/AspectRatio"));
const CssTriangle = dynamic(() => import("@/tools/CssTriangle"));
const XmlFormatter = dynamic(() => import("@/tools/XmlFormatter"));
const MorseConverter = dynamic(() => import("@/tools/MorseConverter"));
const BinaryConverter = dynamic(() => import("@/tools/BinaryConverter"));
const PasswordStrength = dynamic(() => import("@/tools/PasswordStrength"));
const StringEscaper = dynamic(() => import("@/tools/StringEscaper"));
const PercentageCalculator = dynamic(
  () => import("@/tools/PercentageCalculator")
);
const MarkdownTable = dynamic(() => import("@/tools/MarkdownTable"));
const ListRandomizer = dynamic(() => import("@/tools/ListRandomizer"));
const TextCleaner = dynamic(() => import("@/tools/TextCleaner"));
// Removed: AsciiArt tool
const SvgToDataUri = dynamic(() => import("@/tools/SvgToDataUri"));
const YamlToJson = dynamic(() => import("@/tools/YamlToJson"));
const JsonToYaml = dynamic(() => import("@/tools/JsonToYaml"));

const YouTubeThumbnail = dynamic(() => import("@/tools/YouTubeThumbnail"));
const FancyFontGenerator = dynamic(() => import("@/tools/FancyFontGenerator"));
const HashtagExtractor = dynamic(() => import("@/tools/HashtagExtractor"));
const ImageFilters = dynamic(() => import("@/tools/ImageFilters"));
const SvgBlobGenerator = dynamic(() => import("@/tools/SvgBlobGenerator"));
const SvgWaveGenerator = dynamic(() => import("@/tools/SvgWaveGenerator"));
const KeycodeInfo = dynamic(() => import("@/tools/KeycodeInfo"));
const ScreenInfo = dynamic(() => import("@/tools/ScreenInfo"));
const TextToSpeech = dynamic(() => import("@/tools/TextToSpeech"));
const RomanNumeral = dynamic(() => import("@/tools/RomanNumeral"));
const AgeCalculator = dynamic(() => import("@/tools/AgeCalculator"));
const RandomNumber = dynamic(() => import("@/tools/RandomNumber"));
const DuplicateRemover = dynamic(() => import("@/tools/DuplicateRemover"));
const HtmlEntity = dynamic(() => import("@/tools/HtmlEntity"));
const CssCursors = dynamic(() => import("@/tools/CssCursors"));
const DeviceResolutions = dynamic(() => import("@/tools/DeviceResolutions"));
const LoremImage = dynamic(() => import("@/tools/LoremImage"));
const CssBorders = dynamic(() => import("@/tools/CssBorders"));
const CssPatterns = dynamic(() => import("@/tools/CssPatterns"));
const SignaturePad = dynamic(() => import("@/tools/SignaturePad"));

import {
  CaseIcon,
  CounterIcon,
  LoremIpsumIcon,
  Base64Icon,
  UrlIcon,
  JsonIcon,
  UuidIcon,
  PasswordIcon,
  ColorIcon,
  ImageIcon,
  TextReverseIcon,
  BoxShadowIcon,
  GradientIcon,
  BorderRadiusIcon,
  TextShadowIcon,
  GlassmorphismIcon,
  HashIcon,
  JwtIcon,
  QrCodeIcon,
  MarkdownIcon,
  DateCalcIcon,
  DiffIcon,
  PomodoroIcon,
  MemeIcon,
  RecipeIcon,
  RegexIcon,
  PaletteIcon,
  UnitConverterIcon,
  BmiIcon,
  TodoIcon,
  CurrencyIcon,
  WorldClockIcon,
  TimersIcon,
  FileConversionIcon,
  TextCategoryIcon,
  ImageCategoryIcon,
  CssCategoryIcon,
  CodeCategoryIcon,
  ColorCategoryIcon,
  MathCategoryIcon,
  ProductivityCategoryIcon,
  FunCategoryIcon,
  MiscCategoryIcon,
  VideoCategoryIcon,
  CharacterCounterIcon,
  KeywordDensityIcon,
  ReadabilityIcon,
  LoanCalculatorIcon,
  TimeZoneConverterIcon,
  VideoCompressorIcon,
  VideoToAudioIcon,
  GifMakerIcon,
  TrimVideoIcon,
  FormatConverterIcon,
  VideoThumbnailIcon,
  VideoMuteIcon,
  WatermarkAdderIcon,
  ImageResizerIcon,
  ImageConverterIcon,
  ImageCompressorIcon,
  CsvToJsonIcon,
  JsonToCsvIcon,
  CsvToXlsxIcon,
  XlsxToCsvIcon,
  Base64ToImageIcon,
  WordCounterIcon,
  TerminalIcon,
  CameraToolIcon,
  SqlIcon,
  CronIcon,
  Link2Icon,
  TagIcon,
  ContrastIcon,
  ChmodIcon,
  UtmIcon,
  TriangleIcon,
  XmlIcon,
  MorseIcon,
  BinaryIcon,
  ShieldCheckIcon,
  StringEscaperIcon,
  PercentIcon,
  TableIcon,
  ListIcon,
  EraserIcon,
  AspectRatioIcon,
  FileCodeIcon,
  YoutubeIcon,
  PenIcon,
  TagsIcon,
  FiltersIcon,
  BlobIcon,
  WavesIcon,
  KeyboardIcon,
  ScreenIcon,
  MicIcon,
  RomanIcon,
  BabyIcon,
  DiceIcon,
  DuplicateIcon,
  HtmlEntityIcon,
  CursorIcon,
  DevicesIcon,
  PlaceholderIcon,
  BorderIcon,
  PatternIcon,
  SignatureIcon,
} from "@/components/icons";

const PRIVACY_STATEMENT =
  "All calculations and data processing for this tool are performed locally in your browser. We do not send any of your data to our servers, ensuring your information remains private and secure.";

export const TOOLS: Tool[] = [
  // ... existing tools
  {
    id: "json-to-typescript",
    name: "JSON to TypeScript",
    description: "Instantly generate TypeScript interfaces from JSON objects.",
    icon: <JsonIcon />,
    component: JsonToTypescript,
    category: ToolCategory.CODING,
  },
  {
    id: "code-to-image",
    name: "Code to Image",
    description: "Create beautiful images of your code snippets for sharing.",
    icon: <CameraToolIcon />,
    component: CodeToImage,
    category: ToolCategory.CODING,
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Format and beautify your SQL queries.",
    icon: <SqlIcon />,
    component: SqlFormatter,
    category: ToolCategory.CODING,
  },
  {
    id: "cron-generator",
    name: "Cron Expression Generator",
    description: "Visually build and explain cron job schedules.",
    icon: <CronIcon />,
    component: CronParser,
    category: ToolCategory.CODING,
  },
  {
    id: "slug-generator",
    name: "Slug Generator",
    description: "Convert text into SEO-friendly URL slugs.",
    icon: <Link2Icon />,
    component: SlugGenerator,
    category: ToolCategory.TEXT,
  },
  {
    id: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Generate SEO meta tags for your website.",
    icon: <TagIcon />,
    component: MetaTagGenerator,
    category: ToolCategory.CODING,
  },
  {
    id: "contrast-checker",
    name: "Contrast Checker",
    description: "Check color contrast accessibility (WCAG).",
    icon: <ContrastIcon />,
    component: ContrastChecker,
    category: ToolCategory.COLOR,
  },
  {
    id: "chmod-calculator",
    name: "Chmod Calculator",
    description: "Visual calculator for Unix file permissions.",
    icon: <ChmodIcon />,
    component: ChmodCalculator,
    category: ToolCategory.CODING,
  },
  {
    id: "utm-builder",
    name: "UTM Builder",
    description: "Build tracking URLs for marketing campaigns.",
    icon: <UtmIcon />,
    component: UtmBuilder,
    category: ToolCategory.PRODUCTIVITY,
  },
  {
    id: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    description: "Calculate dimensions and aspect ratios for images and video.",
    icon: <AspectRatioIcon />,
    component: AspectRatio,
    category: ToolCategory.IMAGE,
  },
  {
    id: "css-triangle-generator",
    name: "CSS Triangle Generator",
    description: "Generate CSS code for geometric triangles.",
    icon: <TriangleIcon />,
    component: CssTriangle,
    category: ToolCategory.CSS,
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    description: "Beautify and format XML strings.",
    icon: <XmlIcon />,
    component: XmlFormatter,
    category: ToolCategory.CODING,
  },
  {
    id: "morse-converter",
    name: "Morse Code Converter",
    description: "Translate text to Morse code and vice versa.",
    icon: <MorseIcon />,
    component: MorseConverter,
    category: ToolCategory.FUN,
  },
  {
    id: "binary-converter",
    name: "Binary Converter",
    description: "Translate text to binary code and back.",
    icon: <BinaryIcon />,
    component: BinaryConverter,
    category: ToolCategory.CODING,
  },
  {
    id: "password-strength",
    name: "Password Strength Checker",
    description: "Test the strength of your passwords.",
    icon: <ShieldCheckIcon />,
    component: PasswordStrength,
    category: ToolCategory.MISC,
  },
  {
    id: "string-escaper",
    name: "String Escaper",
    description: "Escape strings for JSON, HTML, URL, and Java.",
    icon: <StringEscaperIcon />,
    component: StringEscaper,
    category: ToolCategory.CODING,
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Quickly calculate percentages for common math problems.",
    icon: <PercentIcon />,
    component: PercentageCalculator,
    category: ToolCategory.MATH,
  },
  {
    id: "markdown-table-generator",
    name: "Markdown Table Generator",
    description: "Create Markdown tables easily with a visual editor.",
    icon: <TableIcon />,
    component: MarkdownTable,
    category: ToolCategory.TEXT,
  },
  {
    id: "list-randomizer",
    name: "List Randomizer",
    description: "Shuffle and randomize a list of items.",
    icon: <ListIcon />,
    component: ListRandomizer,
    category: ToolCategory.FUN,
  },
  {
    id: "text-cleaner",
    name: "Text Cleaner",
    description: "Remove extra spaces, line breaks, and format text.",
    icon: <EraserIcon />,
    component: TextCleaner,
    category: ToolCategory.TEXT,
  },

  {
    id: "svg-to-data-uri",
    name: "SVG to Data URI",
    description: "Convert SVG code into a Data URI for use in CSS.",
    icon: <ImageIcon />,
    component: SvgToDataUri,
    category: ToolCategory.IMAGE,
  },
  {
    id: "yaml-to-json",
    name: "YAML to JSON",
    description: "Convert simple YAML to JSON.",
    icon: <FileCodeIcon />,
    component: YamlToJson,
    category: ToolCategory.CODING,
  },
  {
    id: "json-to-yaml",
    name: "JSON to YAML",
    description: "Convert JSON objects to YAML format.",
    icon: <FileCodeIcon />,
    component: JsonToYaml,
    category: ToolCategory.CODING,
  },
  // Batch 3
  {
    id: "youtube-thumbnail",
    name: "YouTube Thumbnail Downloader",
    description:
      "Download thumbnails from any YouTube video in max resolution.",
    icon: <YoutubeIcon />,
    component: YouTubeThumbnail,
    category: ToolCategory.IMAGE,
  },
  {
    id: "fancy-font",
    name: "Fancy Font Generator",
    description: "Generate stylish text for social media bios.",
    icon: <PenIcon />,
    component: FancyFontGenerator,
    category: ToolCategory.TEXT,
  },
  {
    id: "hashtag-extractor",
    name: "Hashtag Extractor",
    description: "Extract hashtags from a block of text.",
    icon: <TagsIcon />,
    component: HashtagExtractor,
    category: ToolCategory.TEXT,
  },
  {
    id: "image-filters",
    name: "Instagram Photo Filters",
    description: "Apply CSS filters like grayscale, sepia, and blur to images.",
    icon: <FiltersIcon />,
    component: ImageFilters,
    category: ToolCategory.IMAGE,
  },
  {
    id: "svg-blob",
    name: "SVG Blob Generator",
    description: "Create organic blob shapes for backgrounds.",
    icon: <BlobIcon />,
    component: SvgBlobGenerator,
    category: ToolCategory.IMAGE,
  },
  {
    id: "svg-wave",
    name: "SVG Wave Generator",
    description: "Generate smooth wave dividers for your website.",
    icon: <WavesIcon />,
    component: SvgWaveGenerator,
    category: ToolCategory.IMAGE,
  },
  {
    id: "keycode-info",
    name: "Keycode Event Info",
    description: "Get JavaScript event codes for any key press.",
    icon: <KeyboardIcon />,
    component: KeycodeInfo,
    category: ToolCategory.CODING,
  },
  {
    id: "screen-info",
    name: "Screen Resolution Info",
    description: "View your current screen and viewport dimensions.",
    icon: <ScreenIcon />,
    component: ScreenInfo,
    category: ToolCategory.PRODUCTIVITY,
  },
  {
    id: "text-to-speech",
    name: "Text to Speech",
    description: "Convert text to spoken audio in your browser.",
    icon: <MicIcon />,
    component: TextToSpeech,
    category: ToolCategory.FUN,
  },
  {
    id: "roman-numeral",
    name: "Roman Numeral Converter",
    description: "Convert numbers to Roman numerals and back.",
    icon: <RomanIcon />,
    component: RomanNumeral,
    category: ToolCategory.MATH,
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, and days.",
    icon: <BabyIcon />,
    component: AgeCalculator,
    category: ToolCategory.MATH,
  },
  {
    id: "random-number",
    name: "Random Number Generator",
    description: "Generate random numbers within a specific range.",
    icon: <DiceIcon />,
    component: RandomNumber,
    category: ToolCategory.MATH,
  },
  {
    id: "duplicate-remover",
    name: "Duplicate Line Remover",
    description: "Remove duplicate entries from a list of text.",
    icon: <DuplicateIcon />,
    component: DuplicateRemover,
    category: ToolCategory.TEXT,
  },
  {
    id: "html-entity",
    name: "HTML Entity Encoder",
    description: "Encode/Decode text to HTML entities.",
    icon: <HtmlEntityIcon />,
    component: HtmlEntity,
    category: ToolCategory.CODING,
  },
  {
    id: "css-cursors",
    name: "CSS Cursor Viewer",
    description: "Visual reference for all CSS cursor types.",
    icon: <CursorIcon />,
    component: CssCursors,
    category: ToolCategory.CSS,
  },
  {
    id: "device-resolutions",
    name: "Device Resolution List",
    description: "Reference guide for common device screen sizes.",
    icon: <DevicesIcon />,
    component: DeviceResolutions,
    category: ToolCategory.PRODUCTIVITY,
  },
  {
    id: "lorem-image",
    name: "Lorem Picsum Generator",
    description: "Generate placeholder image URLs.",
    icon: <PlaceholderIcon />,
    component: LoremImage,
    category: ToolCategory.IMAGE,
  },
  {
    id: "css-borders",
    name: "CSS Border Preview",
    description: "Visualizer for all CSS border styles.",
    icon: <BorderIcon />,
    component: CssBorders,
    category: ToolCategory.CSS,
  },
  {
    id: "css-patterns",
    name: "CSS Background Patterns",
    description: "Generate pure CSS background patterns.",
    icon: <PatternIcon />,
    component: CssPatterns,
    category: ToolCategory.CSS,
  },
  {
    id: "signature-pad",
    name: "Signature Pad",
    description: "Draw and save digital signatures.",
    icon: <SignatureIcon />,
    component: SignaturePad,
    category: ToolCategory.MISC,
  },
  // ... rest of the existing tools (ensure Readability Score, Loan Calculator, etc. are preserved)
  {
    id: "readability-score-calculator",
    name: "Readability Score Calculator",
    description:
      "Analyze text complexity and calculate Flesch-Kincaid and other readability scores to improve content clarity and accessibility.",
    seoTitle:
      "Free Readability Score Calculator | Instantly Check Your Content's Grade Level",
    seoDescription:
      "Is your writing easy to understand? Our free Readability Score Calculator gives you instant feedback with Flesch-Kincaid scores. Write clearer, more effective content for everyone. 100% private.",
    icon: <ReadabilityIcon />,
    component: ReadabilityScore,
    category: ToolCategory.TEXT,

    keywords: [
      "readability score calculator",
      "flesch kincaid readability",
      "readability checker online",
      "text grade level checker",
      "content readability tool",
      "reading ease score",
      "writing clarity analyzer",
      "text complexity checker",
      "writing score",
      "content accessibility",
    ],

  },
  {
    id: "loan-calculator",
    name: "Loan Calculator",
    description:
      "Calculate accurate monthly payments, interest costs, and a complete amortization schedule for any type of loan.",
    seoTitle: "Free Loan Calculator | Estimate Monthly Payments & Amortization",
    seoDescription:
      "Take control of your finances. Our free Loan Calculator helps you estimate monthly payments, total interest, and see a full amortization schedule for any loan. Plan for mortgages, car loans, and more. Fast, accurate, and 100% private.",

    icon: <LoanCalculatorIcon />,
    component: LoanCalculator,
    category: ToolCategory.MATH,

    keywords: [
      "loan calculator",
      "monthly payment calculator",
      "loan amortization calculator",
      "mortgage payment calculator",
      "car loan calculator",
      "interest rate calculator",
      "principal and interest calculator",
      "loan repayment schedule",
      "financial planning tool",
    ],

  },
  {
    id: "timezone-converter",
    name: "Time Zone Converter",
    description:
      "Instantly convert any date and time between global time zones with precise, real-time accuracy.",
    seoTitle:
      "Time Zone Converter | Instantly Convert Time Between Cities Worldwide",
    seoDescription:
      "Never get the time wrong again. Our free Time Zone Converter makes it easy to convert time between any cities in the world. Perfect for scheduling meetings, planning travel, and staying in sync with global teams.",
    icon: <TimeZoneConverterIcon />,
    component: TimeZoneConverter,
    category: ToolCategory.PRODUCTIVITY,

    keywords: [
      "time zone converter",
      "timezone calculator",
      "world time converter",
      "time difference calculator",
      "international meeting scheduler",
      "gmt to ist converter",
      "pst to est converter",
      "utc time converter",
      "global clock",
    ],

  },
  {
    id: "case-converter",
    name: "Case Converter",
    description:
      "Convert text between uppercase, lowercase, title case, and more formats.",
    seoTitle: "Online Case Converter | Instantly Change Text Case",
    seoDescription:
      "Quickly convert text to UPPERCASE, lowercase, Title Case, Sentence case, and more with our free online tool. Perfect for headlines, essays, and code. 100% private and easy to use.",
    icon: <CaseIcon />,
    component: CaseConverter,
    category: ToolCategory.TEXT,
    featured: true,
    keywords: [
      "text case converter",
      "change case online",
      "uppercase to lowercase",
      "title case generator",
      "sentence case tool",
      "text formatting",
    ],
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description:
      "Instantly count words, characters, sentences, and paragraphs with our advanced, real-time Word Counter tool.",
    seoTitle: "Free Online Word Counter | Real-Time Word & Character Count",
    seoDescription:
      "Hit your writing goals with our free online Word Counter. Get instant, accurate counts for words, characters, sentences, and paragraphs, plus an estimated reading time. Perfect for writers, students, and SEOs.",
    icon: <WordCounterIcon />,
    component: WordCounter,
    category: ToolCategory.TEXT,
    keywords: [
      "word counter",
      "word count tool",
      "character counter",
      "online word counter",
      "word calculator",
      "sentence counter",
      "paragraph counter",
      "text analysis tool",
      "reading time calculator",
      "content writing tool",
    ],
  },
  {
    id: "character-counter",
    name: "Character Counter",
    description:
      "Count characters, letters, and byte size instantly to ensure your text fits limits for social media, SMS, and online platforms.",
    seoTitle: "Online Character Counter | Letter, Symbol & Byte Counter",
    seoDescription:
      "Never exceed the limit again. Our free Character Counter instantly checks characters, letters, and byte size. Perfect for Twitter/X posts, SMS, and more. 100% private and secure.",
    icon: <CharacterCounterIcon />,
    component: CharacterCounter,
    category: ToolCategory.TEXT,

    keywords: [
      "character counter online",
      "letter count tool",
      "byte size calculator",
      "text character limit",
      "social media post counter",
      "SMS character counter",
      "Unicode character counter",
      "emoji byte counter",
    ],

  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description:
      "Generate customizable placeholder text for web design, UI/UX prototypes, print layouts, and content mockups.",
    seoTitle: "Lorem Ipsum Generator | Create Custom Placeholder Text",
    seoDescription:
      "Need placeholder text? Our free Lorem Ipsum Generator creates custom dummy text for your designs. Generate paragraphs, sentences, or words to perfect your layouts. Fast, easy, and professional.",
    icon: <LoremIpsumIcon />,
    component: LoremIpsumGenerator,
    category: ToolCategory.TEXT,

    keywords: [
      "lorem ipsum generator",
      "placeholder text generator",
      "dummy text creator",
      "mockup text tool",
      "filler text generator",
      "UI/UX placeholder text",
      "web design dummy text",
      "design content filler",
    ],

  },
  {
    id: "text-reverser",
    name: "Text Reverser",
    description:
      "Instantly reverse any string of text, words, letters, or symbols for fun, puzzles, or programming tasks.",
    seoTitle: "Online Text Reverser | Reverse Words, Letters & Strings",
    seoDescription:
      "Flip your text backwards with our free Text Reverser. Instantly reverse words, letters, and even emojis. Perfect for fun social media posts, puzzles, or coding challenges.",
    icon: <TextReverseIcon />,
    component: TextReverser,
    category: ToolCategory.TEXT,

    keywords: [
      "text reverser online",
      "reverse words tool",
      "string reverser",
      "backwards text generator",
      "mirror text creator",
      "flip letters online",
      "reverse string tool",
      "unicode text reverser",
    ],

  },
  {
    id: "markdown-previewer",
    name: "Markdown Previewer",
    description:
      "Write Markdown and instantly see the rendered HTML in a live, real-time preview for documentation, blogs, and READMEs.",
    seoTitle: "Live Markdown Editor | Real-Time Markdown Previewer",
    seoDescription:
      "Write and preview Markdown side-by-side with our free live editor. Instantly see how your text will look as HTML. Perfect for READMEs, blogs, and documentation. Fast, secure, and easy to use.",
    icon: <MarkdownIcon />,
    component: MarkdownPreviewer,
    category: ToolCategory.TEXT,

    keywords: [
      "markdown editor online",
      "live markdown preview",
      "markdown to html converter",
      "readme editor",
      "md file viewer",
      "markdown live editor",
      "markdown documentation tool",
      "markdown blog preview",
    ],

  },
  // Coding Tools
  {
    id: "base64-converter",
    name: "Base64 Converter",
    description:
      "Instantly encode and decode text, images, and files to/from Base64 online.",
    seoTitle: "Online Base64 Converter | Encode & Decode Text, Files & Images",
    seoDescription:
      "A free, powerful tool to encode and decode Base64. Easily convert text, images, or any file into a Base64 string and back again. Secure, fast, and all in your browser.",
    icon: <Base64Icon />,
    component: Base64Converter,
    category: ToolCategory.CODING,
    keywords: [
      "base64 converter online",
      "encode text to base64",
      "decode base64 string",
      "file to base64 converter",
      "data uri generator online",
      "base64 image",
    ],
  },
  {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode and decode strings for safe URL transmission online.",
    seoTitle: "Online URL Encoder & Decoder | Percent-Encoding Tool",
    seoDescription:
      "Quickly and safely encode or decode strings for use in URLs. Our free tool handles special characters and spaces, preventing broken links. Perfect for developers and marketers.",
    icon: <UrlIcon />,
    component: UrlEncoder,
    category: ToolCategory.CODING,
    keywords: [
      "url encoder decoder online",
      "percent encoding tool",
      "url safe encoding",
      "encodeURIComponent online",
      "query string encoder",
      "url escape tool",
    ],
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description:
      "Validate, format, and pretty-print your JSON data instantly online.",
    seoTitle: "Online JSON Formatter | Validate & Beautify JSON",
    seoDescription:
      "Clean up your messy JSON with our free online formatter. Instantly validate, format, and beautify your JSON data to make it readable. Perfect for developers debugging APIs.",
    icon: <JsonIcon />,
    component: JsonFormatter,
    category: ToolCategory.CODING,
    featured: true,
    keywords: [
      "json formatter online",
      "json validator",
      "pretty print json online",
      "json beautifier tool",
      "json viewer online",
      "json lint",
    ],
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions against strings online.",
    seoTitle: "Online Regex Tester | Test & Debug Regular Expressions",
    seoDescription:
      "Test your regular expressions in real-time with our free online Regex Tester. Instantly see matches and capture groups highlighted. Perfect for developers and data analysts. 100% private.",
    icon: <RegexIcon />,
    component: RegexTester,
    category: ToolCategory.CODING,
    keywords: [
      "regex tester online",
      "regular expression tester",
      "javascript regex checker",
      "validate regex pattern",
      "regex debugger online",
      "regex live test",
    ],
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate secure, random UUIDs (v4) online instantly.",
    seoTitle: "Online UUID Generator | Instantly Create Random UUIDs (v4)",
    seoDescription:
      "Need a unique ID? Our free UUID Generator creates random, secure Version 4 UUIDs in a single click. Perfect for databases, session IDs, and any application needing a unique identifier.",
    icon: <UuidIcon />,
    component: UuidGenerator,
    category: ToolCategory.CODING,
    keywords: [
      "uuid generator online",
      "generate uuid v4",
      "random uuid online",
      "guid generator",
      "unique identifier generator",
      "crypto.randomuuid",
    ],
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    description:
      "Create SHA-1, SHA-256, or SHA-512 hashes online from any text.",
    seoTitle:
      "Online Hash Generator | Generate SHA-1, SHA-256 & SHA-512 Hashes",
    seoDescription:
      "Instantly generate secure SHA-1, SHA-256, and SHA-512 hashes from any text with our free online tool. Powered by the Web Crypto API for maximum security. 100% private.",
    icon: <HashIcon />,
    component: HashGenerator,
    category: ToolCategory.CODING,
    keywords: [
      "sha256 generator online",
      "sha512 hash calculator",
      "sha1 generator online",
      "string to hash",
      "web crypto hash tool",
      "text to sha256",
    ],
  },
  {
    id: "jwt-debugger",
    name: "JWT Decoder",
    description: "Decode JSON Web Tokens to view header and payload online.",
    seoTitle: "Online JWT Decoder | Decode & Inspect JSON Web Tokens",
    seoDescription:
      "Instantly decode and inspect JSON Web Tokens (JWTs) with our free online tool. View the header and payload in a readable format. Perfect for debugging authentication tokens. 100% private.",
    icon: <JwtIcon />,
    component: JwtDebugger,
    category: ToolCategory.CODING,
    keywords: [
      "jwt decoder online",
      "json web token decoder",
      "inspect jwt payload",
      "decode jwt online",
      "auth token debugger",
      "jwt.io alternative",
    ],
  },
  {
    id: "diff-checker",
    name: "Diff Checker",
    description:
      "Instantly compare text or code and highlight every difference in seconds.",
    seoTitle: "Online Diff Checker | Instantly Compare Text & Code",
    seoDescription:
      "Easily compare two blocks of text or code and see the differences highlighted instantly. Our free Diff Checker is perfect for developers, writers, and editors. Fast, secure, and 100% private.",
    icon: <DiffIcon />,
    component: DiffChecker,
    category: ToolCategory.CODING,
    keywords: [
      "diff tool online",
      "compare text",
      "compare code",
      "track changes",
      "highlight differences",
      "text comparison tool",
    ],
  },
  {
    id: "csv-to-json",
    name: "CSV to JSON",
    description:
      "Convert CSV files into structured JSON arrays instantly, no coding needed.",
    seoTitle: "Online CSV to JSON Converter | Free & Instant",
    seoDescription:
      "Effortlessly convert your CSV data into a structured JSON array with our free online tool. Perfect for developers working with APIs and web applications. Fast, secure, and browser-based.",
    icon: <CsvToJsonIcon />,
    component: CsvToJson,
    category: ToolCategory.CODING,
    keywords: [
      "csv to json online",
      "convert csv to json",
      "csv parser",
      "spreadsheet to json",
      "data transformation tool",
      "csv to json array",
    ],
  },
  {
    id: "json-to-csv",
    name: "JSON to CSV",
    description:
      "Convert JSON arrays into CSV files for Excel or other spreadsheet tools instantly.",
    seoTitle: "Online JSON to CSV Converter | Free & Instant",
    seoDescription:
      "Quickly convert a JSON array into a clean CSV file with our free online tool. Perfect for exporting data for use in Excel or other spreadsheet software. Fast, secure, and browser-based.",
    icon: <JsonToCsvIcon />,
    component: JsonToCsv,
    category: ToolCategory.CODING,
    keywords: [
      "json to csv online",
      "convert json to csv",
      "export json to excel",
      "json array to csv",
      "data export tool",
      "json to spreadsheet",
    ],
  },
  {
    id: "csv-xlsx-converter",
    name: "Data Converter",
    description:
      "The ultimate data conversion tool. Convert CSV or XLSX files to JSON, SQL, HTML, and more, instantly in your browser.",
    seoTitle:
      "Universal Data Converter | Convert CSV, XLSX, JSON, SQL, and more",
    seoDescription:
      "Our free online Data Converter instantly transforms your files. Convert CSV or Excel (XLSX) to JSON, SQL, HTML, Markdown, and more. Secure, browser-based, and incredibly fast.",
    icon: <FileConversionIcon />,
    component: CsvXlsxConverter,
    category: ToolCategory.CODING,
    keywords: [
      "data converter",
      "file converter",
      "csv to json",
      "xlsx to csv",
      "csv to sql",
      "excel to json",
      "json to csv",
      "data transformation",
      "file format converter",
      "browser-based tools",
    ],
  },
  // Image Tools
  {
    id: "image-to-base64",
    name: "Image to Base64",
    description: "Convert an image file into a Base64 data URL string.",
    seoTitle: "Image to Base64 Converter | Instantly Encode Images Online",
    seoDescription:
      "Convert any image (PNG, JPG, SVG) into a Base64 data URL with our free online tool. Perfect for embedding images directly into HTML and CSS to improve site speed. 100% private.",
    icon: <ImageIcon />,
    component: ImageToBase64,
    category: ToolCategory.IMAGE,
    featured: true,
    keywords: [
      "image to base64 converter",
      "data uri generator",
      "embed image in html",
      "css background image base64",
      "png to base64",
      "jpg to base64",
    ],
  },
  {
    id: "base64-to-image",
    name: "Base64 to Image",
    description: "Convert a Base64 data URL into a viewable image.",
    seoTitle: "Base64 to Image Converter | Decode & View Base64 Images",
    seoDescription:
      "Have a Base64 string and want to see the image? Our free tool instantly decodes any Base64 data URL back into a viewable and downloadable image. Perfect for developers and designers.",
    icon: <Base64ToImageIcon />,
    component: Base64ToImage,
    category: ToolCategory.IMAGE,
    keywords: [
      "base64 to image converter",
      "decode base64 to image",
      "view base64 image",
      "data uri viewer",
      "base64 image downloader",
    ],
  },
  // CSS Tools
  {
    id: "box-shadow-generator",
    name: "Box Shadow Generator",
    description:
      "Create and customize CSS box-shadow effects with a visual editor.",
    seoTitle: "CSS Box Shadow Generator | Visual & Interactive Tool",
    seoDescription:
      "Design the perfect CSS box-shadow with our free visual generator. Control offsets, blur, spread, and color in real-time and get the code instantly. Perfect for modern UI design.",
    icon: <BoxShadowIcon />,
    component: BoxShadowGenerator,
    category: ToolCategory.CSS,
    keywords: [
      "css box shadow generator",
      "visual box shadow tool",
      "css shadow creator",
      "drop shadow css",
      "inset shadow generator",
      "css ui generator",
    ],
  },
  {
    id: "css-gradient-generator",
    name: "CSS Gradient Generator",
    description:
      "Create beautiful CSS gradients with color pickers and angle controls.",
    seoTitle: "CSS Gradient Generator | Create Beautiful Gradients Online",
    seoDescription:
      "Design stunning linear and radial CSS gradients with our free visual editor. Add multiple colors, control angles, and get production-ready code instantly. Perfect for modern web design.",
    icon: <GradientIcon />,
    component: CssGradientGenerator,
    category: ToolCategory.CSS,
    keywords: [
      "css gradient generator",
      "gradient generator online",
      "css gradient background generator",
      "linear gradient css generator",
      "radial gradient css generator",
      "conic gradient generator",
      "css gradient code generator",
      "gradient background maker for website",
      "css gradient editor live preview",
      "animated css gradient generator",
      "gradient button generator css",
      "css gradient tutorial for beginners",
      "generate css gradient code free",
      "multi color css gradient generator",
      "best css gradient generator 2025",
      "how to make css gradient background",
      "css gradient maker with angle control",
      "css gradient presets for UI design",
      "copy css gradient code",
      "css gradient generator for tailwind",
    ],
  },
  {
    id: "border-radius-generator",
    name: "Border Radius Generator",
    description:
      "Create custom border radius values with individual corner controls.",
    seoTitle: "CSS Border Radius Generator | Create Custom Shapes",
    seoDescription:
      "Visually design the perfect rounded corners with our free CSS Border Radius Generator. Control each corner individually to create unique shapes and get the code instantly.",
    icon: <BorderRadiusIcon />,
    component: BorderRadiusGenerator,
    category: ToolCategory.CSS,
    keywords: [
      "css border radius generator",
      "rounded corners css",
      "custom shape css",
      "visual border radius tool",
      "css shape generator",
    ],
  },
  {
    id: "text-shadow-generator",
    name: "Text Shadow Generator",
    description:
      "Create beautiful text shadows with precise control over position and blur.",
    seoTitle: "CSS Text Shadow Generator | Visual & Interactive Tool",
    seoDescription:
      "Design the perfect CSS text-shadow with our free visual generator. Control offsets, blur, color, and opacity in real-time and get the code instantly. Add depth and style to your text.",
    icon: <TextShadowIcon />,
    component: TextShadowGenerator,
    category: ToolCategory.CSS,
    keywords: [
      "css text shadow generator",
      "text glow effect css",
      "3d text css",
      "visual text shadow tool",
      "font shadow",
    ],
  },
  {
    id: "glassmorphism-generator",
    name: "Glassmorphism & Neumorphism Generator",
    description:
      "Create modern glassmorphism and neumorphism effects with visual controls.",
    seoTitle: "Glassmorphism & Neumorphism CSS Generator | Modern UI Tool",
    seoDescription:
      "Easily create trendy Glassmorphism (frosted glass) and Neumorphism (soft UI) effects with our free visual CSS generator. Get the code for your modern UI designs instantly.",
    icon: <GlassmorphismIcon />,
    component: GlassmorphismGenerator,
    category: ToolCategory.CSS,
    keywords: [
      "glassmorphism css generator",
      "frosted glass effect css",
      "neumorphism ui generator",
      "css blur background",
      "modern ui design",
      "soft ui css",
    ],
  },
  // Color Tools
  {
    id: "color-palette-generator",
    name: "Color Palette Generator",
    description: "Generate color palettes from a base color.",
    seoTitle: "Color Palette Generator | Create Beautiful Color Schemes",
    seoDescription:
      "Instantly generate beautiful, harmonious color palettes from any base color. Our free tool creates monochromatic, analogous, complementary, and triadic schemes for your designs.",
    icon: <PaletteIcon />,
    component: ColorPaletteGenerator,
    category: ToolCategory.COLOR,
    keywords: [
      "color palette generator",
      "color scheme generator",
      "design color combinations",
      "monochromatic color palette",
      "complementary colors",
      "color wheel tool",
    ],
  },
  {
    id: "color-theme-wheel",
    name: "Color Theme Generator (Color Wheel)",
    description:
      "Generate color themes using an interactive color wheel and scheme presets (analogous, complementary, triad, etc.).",
    seoTitle: "Interactive Color Wheel | Color Theme Generator",
    seoDescription:
      "Design beautiful color themes with our free interactive color wheel. Choose from analogous, complementary, and triadic schemes and export your palette as CSS variables or JSON.",
    icon: <PaletteIcon />,
    component: ColorThemeWheel,
    category: ToolCategory.COLOR,
    keywords: [
      "color wheel tool",
      "color harmony generator",
      "triadic color scheme",
      "analogous colors",
      "color picker online",
      "ui color palette generator",
    ],
  },
  {
    id: "css-color-code-converter",
    name: "CSS Color Code Converter",
    description:
      "Convert between HEX/HEXA, RGB/RGBA, HSL/HSLA, and CSS color keywords.",
    seoTitle: "CSS Color Code Converter | HEX, RGB & HSL Converter",
    seoDescription:
      "Instantly convert between HEX, RGB, and HSL color codes with our free online tool. Supports alpha channels (transparency) and CSS color names. Perfect for developers and designers.",
    icon: <ColorIcon />,
    component: CssColorCodeConverter,
    category: ToolCategory.COLOR,
    keywords: [
      "hex to rgb converter",
      "hsl to hex",
      "rgba color picker",
      "css color converter",
      "color code translator",
      "hex to hsl",
    ],
  },
  {
    id: "video-compressor",
    name: "Video Compressor",
    description: "Reduce video file size without significant quality loss.",
    icon: <VideoCompressorIcon />,
    component: VideoCompressor,
    category: ToolCategory.VIDEO,
  },
  {
    id: "video-to-audio-converter",
    name: "Video to Audio Converter",
    description: "Extract audio tracks from video files as MP3.",
    icon: <VideoToAudioIcon />,
    component: VideoToAudioConverter,
    category: ToolCategory.VIDEO,
  },
  {
    id: "gif-maker",
    name: "GIF Maker",
    description: "Convert video clips into animated GIFs.",
    icon: <GifMakerIcon />,
    component: GifMaker,
    category: ToolCategory.VIDEO,
  },
  {
    id: "trim-video",
    name: "Trim Video",
    description: "Cut and trim video files to desired length.",
    icon: <TrimVideoIcon />,
    component: TrimVideo,
    category: ToolCategory.VIDEO,
  },
  {
    id: "format-converter",
    name: "Video Format Converter",
    description: "Convert videos between different formats like MP4, AVI, MOV.",
    icon: <FormatConverterIcon />,
    component: FormatConverter,
    category: ToolCategory.VIDEO,
  },
  {
    id: "video-thumbnail-extractor",
    name: "Video Thumbnail Extractor",
    description:
      "Extract image thumbnails from specific timestamps in a video.",
    icon: <VideoThumbnailIcon />,
    component: VideoThumbnailExtractor,
    category: ToolCategory.VIDEO,
  },
  {
    id: "video-mute",
    name: "Mute Video",
    description: "Remove audio track from a video file.",
    icon: <VideoMuteIcon />,
    component: VideoMute,
    category: ToolCategory.VIDEO,
  },
  {
    id: "watermark-adder",
    name: "Watermark Adder",
    description: "Add image or text watermarks to your photos.",
    icon: <WatermarkAdderIcon />,
    component: WatermarkAdder,
    category: ToolCategory.IMAGE,
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images by dimensions or percentage.",
    icon: <ImageResizerIcon />,
    component: ImageResizer,
    category: ToolCategory.IMAGE,
  },
  {
    id: "image-converter",
    name: "Image Converter",
    description: "Convert images between formats like PNG, JPG, WEBP.",
    icon: <ImageConverterIcon />,
    component: ImageConverter,
    category: ToolCategory.IMAGE,
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description:
      "Compress images to reduce file size while maintaining quality.",
    icon: <ImageCompressorIcon />,
    component: ImageCompressor,
    category: ToolCategory.IMAGE,
  },
  {
    id: "todo-list",
    name: "To-Do List",
    description: "A simple to-do list that saves your tasks in the browser.",
    seoTitle: "Simple To-Do List | Online & Persistent",
    seoDescription:
      "A clean and simple to-do list that saves your tasks in your browser. Organize your day and stay on track with our free and private To-Do List tool.",
    icon: <TodoIcon />,
    component: TodoList,
    category: ToolCategory.PRODUCTIVITY,
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure passwords.",
    icon: <PasswordIcon />,
    component: PasswordGenerator,
    category: ToolCategory.CODING,
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs.",
    icon: <QrCodeIcon />,
    component: QrCodeGenerator,
    category: ToolCategory.IMAGE,
  },
  {
    id: "date-calculator",
    name: "Date Calculator",
    description: "Calculate the difference between two dates.",
    icon: <DateCalcIcon />,
    component: DateCalculator,
    category: ToolCategory.MATH,
  },
  {
    id: "pomodoro-timer",
    name: "Pomodoro Timer",
    description: "A timer to help you focus using the Pomodoro Technique.",
    icon: <PomodoroIcon />,
    component: PomodoroTimer,
    category: ToolCategory.PRODUCTIVITY,
  },
  {
    id: "meme-generator",
    name: "Meme Generator",
    description: "Create your own memes with popular templates.",
    icon: <MemeIcon />,
    component: MemeGenerator,
    category: ToolCategory.FUN,
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between different units of measurement.",
    icon: <UnitConverterIcon />,
    component: UnitConverter,
    category: ToolCategory.MATH,
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index.",
    icon: <BmiIcon />,
    component: BmiCalculator,
    category: ToolCategory.MATH,
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    description: "Convert between different currencies.",
    icon: <CurrencyIcon />,
    component: CurrencyConverter,
    category: ToolCategory.MATH,
  },
  {
    id: "world-clock",
    name: "World Clock",
    description: "Check the time in different cities around the world.",
    icon: <WorldClockIcon />,
    component: WorldClock,
    category: ToolCategory.PRODUCTIVITY,
  },
  {
    id: "timers-and-stopwatch",
    name: "Timers and Stopwatch",
    description: "A simple timer and stopwatch.",
    icon: <TimersIcon />,
    component: TimersAndStopwatch,
    category: ToolCategory.PRODUCTIVITY,
  },
  {
    id: "keyword-density-analyzer",
    name: "Keyword Density Analyzer",
    description: "Analyze the keyword density of a text.",
    icon: <KeywordDensityIcon />,
    component: KeywordDensityAnalyzer,
    category: ToolCategory.TEXT,
  },
];

export const CATEGORY_ORDER: ToolCategory[] = [
  ToolCategory.TEXT,
  ToolCategory.IMAGE,
  ToolCategory.CSS,
  ToolCategory.CODING,
  ToolCategory.COLOR,
  ToolCategory.MATH,
  ToolCategory.PRODUCTIVITY,
  ToolCategory.FUN,
  ToolCategory.VIDEO,
  ToolCategory.MISC,
];

export const CATEGORY_URL_MAP: Record<ToolCategory, string> = {
  [ToolCategory.TEXT]: "text",
  [ToolCategory.IMAGE]: "image",
  [ToolCategory.CSS]: "css",
  [ToolCategory.CODING]: "coding",
  [ToolCategory.COLOR]: "color",
  [ToolCategory.MATH]: "calculator",
  [ToolCategory.PRODUCTIVITY]: "productivity",
  [ToolCategory.FUN]: "fun",
  [ToolCategory.VIDEO]: "video",
  [ToolCategory.MISC]: "other",
};

export const URL_TO_CATEGORY_MAP: Record<string, ToolCategory> = Object.entries(
  CATEGORY_URL_MAP
).reduce((acc, [key, value]) => {
  acc[value] = key as ToolCategory;
  return acc;
}, {} as Record<string, ToolCategory>);

export const CATEGORY_ICONS: Record<
  ToolCategory,
  React.ComponentType<{ className?: string }>
> = {
  [ToolCategory.TEXT]: TextCategoryIcon,
  [ToolCategory.IMAGE]: ImageCategoryIcon,
  [ToolCategory.CSS]: CssCategoryIcon,
  [ToolCategory.CODING]: CodeCategoryIcon,
  [ToolCategory.COLOR]: ColorCategoryIcon,
  [ToolCategory.MATH]: MathCategoryIcon,
  [ToolCategory.PRODUCTIVITY]: ProductivityCategoryIcon,
  [ToolCategory.FUN]: FunCategoryIcon,
  [ToolCategory.VIDEO]: VideoCategoryIcon,
  [ToolCategory.MISC]: MiscCategoryIcon,
};

export const CATEGORY_DESCRIPTIONS: Record<ToolCategory, string> = {
  [ToolCategory.TEXT]: "Manipulate text, count words, and more.",
  [ToolCategory.IMAGE]: "Edit, convert, and optimize images.",
  [ToolCategory.CSS]: "Generate CSS code for your projects.",
  [ToolCategory.CODING]: "Format, validate, and convert code.",
  [ToolCategory.COLOR]: "Generate palettes and convert colors.",
  [ToolCategory.MATH]: "Perform calculations and conversions.",
  [ToolCategory.PRODUCTIVITY]: "Boost your efficiency with these tools.",
  [ToolCategory.FUN]: "Have some fun with these generators.",
  [ToolCategory.VIDEO]: "Edit and convert video files.",
  [ToolCategory.MISC]: "Various useful tools.",
};

export const CATEGORY_CONTENT: Record<ToolCategory, { introduction: string }> =
  {
    [ToolCategory.TEXT]: {
      introduction: "A collection of tools for text manipulation.",
    },
    [ToolCategory.IMAGE]: { introduction: "Tools for working with images." },
    [ToolCategory.CSS]: { introduction: "Generators for CSS styles." },
    [ToolCategory.CODING]: {
      introduction: "Format, validate, and convert code.",
    },
    [ToolCategory.COLOR]: {
      introduction: "Generate palettes and convert colors.",
    },
    [ToolCategory.MATH]: {
      introduction: "Perform calculations and conversions.",
    },
    [ToolCategory.PRODUCTIVITY]: {
      introduction: "Boost your efficiency with these tools.",
    },
    [ToolCategory.FUN]: {
      introduction: "Have some fun with these generators.",
    },
    [ToolCategory.VIDEO]: { introduction: "Edit and convert video files." },
    [ToolCategory.MISC]: { introduction: "Various useful tools." },
  };
