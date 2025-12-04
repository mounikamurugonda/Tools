
import React from "react";
import { Tool, ToolCategory } from "./types";
import CaseConverter from "@/tools/CaseConverter";
import WordCounter from "@/tools/WordCounter";
import LoremIpsumGenerator from "@/tools/LoremIpsumGenerator";
import Base64Converter from "@/tools/Base64Converter";
import UrlEncoder from "@/tools/UrlEncoder";
import JsonFormatter from "@/tools/JsonFormatter";
import UuidGenerator from "@/tools/UuidGenerator";
import PasswordGenerator from "@/tools/PasswordGenerator";
import ImageToBase64 from "@/tools/ImageToBase64";
import TextReverser from "@/tools/TextReverser";
import Base64ToImage from "@/tools/Base64ToImage";
import BoxShadowGenerator from "@/tools/BoxShadowGenerator";
import CssGradientGenerator from "@/tools/CssGradientGenerator";
import BorderRadiusGenerator from "@/tools/BorderRadiusGenerator";
import TextShadowGenerator from "@/tools/TextShadowGenerator";
import GlassmorphismGenerator from "@/tools/GlassmorphismGenerator";
import HashGenerator from "@/tools/HashGenerator";
import JwtDebugger from "@/tools/JwtDebugger";
import QrCodeGenerator from "@/tools/QrCodeGenerator";
import MarkdownPreviewer from "@/tools/MarkdownPreviewer";
import DateCalculator from "@/tools/DateCalculator";
import DiffChecker from "@/tools/DiffChecker";
import PomodoroTimer from "@/tools/PomodoroTimer";
import MemeGenerator from "@/tools/MemeGenerator";
import RegexTester from "@/tools/RegexTester";
import ColorPaletteGenerator from "@/tools/ColorPaletteGenerator";
import ColorThemeWheel from "@/tools/ColorThemeWheel";
import UnitConverter from "@/tools/UnitConverter";
import BmiCalculator from "@/tools/BmiCalculator";
import TodoList from "@/tools/TodoList";
import CurrencyConverter from "@/tools/CurrencyConverter";
import WorldClock from "@/tools/WorldClock";
import TimersAndStopwatch from "@/tools/TimersAndStopwatch";
import CsvToJson from "@/tools/CsvToJson";
import JsonToCsv from "@/tools/JsonToCsv";
import CsvXlsxConverter from "@/tools/CsvXlsxConverter";
import CharacterCounter from "@/tools/CharacterCounter";
import KeywordDensityAnalyzer from "@/tools/KeywordDensityAnalyzer";
import ReadabilityScore from "@/tools/ReadabilityScore";
import LoanCalculator from "@/tools/LoanCalculator";
import TimeZoneConverter from "@/tools/TimeZoneConverter";
import CssColorCodeConverter from "@/tools/CssColorCodeConverter";

import VideoCompressor from "@/tools/VideoCompressor";
import VideoToAudioConverter from "@/tools/VideoToAudioConverter";
import GifMaker from "@/tools/GifMaker";
import TrimVideo from "@/tools/TrimVideo";
import FormatConverter from "@/tools/FormatConverter";
import VideoThumbnailExtractor from "@/tools/VideoThumbnailExtractor";
import VideoMute from "@/tools/VideoMute";
import WatermarkAdder from "@/tools/WatermarkAdder";
import ImageResizer from "@/tools/ImageResizer";
import ImageConverter from "@/tools/ImageConverter";
import ImageCompressor from "@/tools/ImageCompressor";

// New Tool Imports
import JsonToTypescript from "@/tools/JsonToTypescript";
import CodeToImage from "@/tools/CodeToImage";
import SqlFormatter from "@/tools/SqlFormatter";
import CronParser from "@/tools/CronParser";
import SlugGenerator from "@/tools/SlugGenerator";
import MetaTagGenerator from "@/tools/MetaTagGenerator";
import ContrastChecker from "@/tools/ContrastChecker";
import ChmodCalculator from "@/tools/ChmodCalculator";
import UtmBuilder from "@/tools/UtmBuilder";
import AspectRatio from "@/tools/AspectRatio";
import CssTriangle from "@/tools/CssTriangle";
import XmlFormatter from "@/tools/XmlFormatter";
import MorseConverter from "@/tools/MorseConverter";
import BinaryConverter from "@/tools/BinaryConverter";
import PasswordStrength from "@/tools/PasswordStrength";
import StringEscaper from "@/tools/StringEscaper";
import PercentageCalculator from "@/tools/PercentageCalculator";
import MarkdownTable from "@/tools/MarkdownTable";
import ListRandomizer from "@/tools/ListRandomizer";
import TextCleaner from "@/tools/TextCleaner";
import AsciiArt from "@/tools/AsciiArt";
import SvgToDataUri from "@/tools/SvgToDataUri";
import YamlToJson from "@/tools/YamlToJson";
import JsonToYaml from "@/tools/JsonToYaml";

// Batch 3 Imports
import YouTubeThumbnail from "@/tools/YouTubeThumbnail";
import FancyFontGenerator from "@/tools/FancyFontGenerator";
import HashtagExtractor from "@/tools/HashtagExtractor";
import ImageFilters from "@/tools/ImageFilters";
import SvgBlobGenerator from "@/tools/SvgBlobGenerator";
import SvgWaveGenerator from "@/tools/SvgWaveGenerator";
import KeycodeInfo from "@/tools/KeycodeInfo";
import ScreenInfo from "@/tools/ScreenInfo";
import TextToSpeech from "@/tools/TextToSpeech";
import RomanNumeral from "@/tools/RomanNumeral";
import AgeCalculator from "@/tools/AgeCalculator";
import RandomNumber from "@/tools/RandomNumber";
import DuplicateRemover from "@/tools/DuplicateRemover";
import HtmlEntity from "@/tools/HtmlEntity";
import CssCursors from "@/tools/CssCursors";
import DeviceResolutions from "@/tools/DeviceResolutions";
import LoremImage from "@/tools/LoremImage";
import CssBorders from "@/tools/CssBorders";
import CssPatterns from "@/tools/CssPatterns";
import SignaturePad from "@/tools/SignaturePad";

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
  AsciiIconComponent,
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
  SignatureIcon
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
    details: { introduction: "Convert JSON to Typescript", howToUse: ["Paste JSON", "Copy TS"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "code-to-image",
    name: "Code to Image",
    description: "Create beautiful images of your code snippets for sharing.",
    icon: <CameraToolIcon />,
    component: CodeToImage,
    category: ToolCategory.CODING,
    details: { introduction: "Create screenshots of code.", howToUse: ["Paste Code", "Select Theme", "Snapshot"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Format and beautify your SQL queries.",
    icon: <SqlIcon />,
    component: SqlFormatter,
    category: ToolCategory.CODING,
    details: { introduction: "Format SQL queries.", howToUse: ["Paste SQL", "Click Format"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "cron-generator",
    name: "Cron Expression Generator",
    description: "Visually build and explain cron job schedules.",
    icon: <CronIcon />,
    component: CronParser,
    category: ToolCategory.CODING,
    details: { introduction: "Build Cron expressions visually.", howToUse: ["Select intervals", "Copy string"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "slug-generator",
    name: "Slug Generator",
    description: "Convert text into SEO-friendly URL slugs.",
    icon: <Link2Icon />,
    component: SlugGenerator,
    category: ToolCategory.TEXT,
    details: { introduction: "Create URL slugs.", howToUse: ["Type title", "Copy slug"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Generate SEO meta tags for your website.",
    icon: <TagIcon />,
    component: MetaTagGenerator,
    category: ToolCategory.CODING,
    details: { introduction: "Create HTML meta tags.", howToUse: ["Enter details", "Copy HTML"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "contrast-checker",
    name: "Contrast Checker",
    description: "Check color contrast accessibility (WCAG).",
    icon: <ContrastIcon />,
    component: ContrastChecker,
    category: ToolCategory.COLOR,
    details: { introduction: "Check color contrast.", howToUse: ["Select colors", "See rating"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "chmod-calculator",
    name: "Chmod Calculator",
    description: "Visual calculator for Unix file permissions.",
    icon: <ChmodIcon />,
    component: ChmodCalculator,
    category: ToolCategory.CODING,
    details: { introduction: "Calculate Linux permissions.", howToUse: ["Check boxes", "Copy code"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "utm-builder",
    name: "UTM Builder",
    description: "Build tracking URLs for marketing campaigns.",
    icon: <UtmIcon />,
    component: UtmBuilder,
    category: ToolCategory.PRODUCTIVITY,
    details: { introduction: "Create tracking links.", howToUse: ["Enter URL", "Add params", "Copy"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    description: "Calculate dimensions and aspect ratios for images and video.",
    icon: <AspectRatioIcon />,
    component: AspectRatio,
    category: ToolCategory.IMAGE,
    details: { introduction: "Calculate aspect ratios.", howToUse: ["Enter dims", "See ratio"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "css-triangle-generator",
    name: "CSS Triangle Generator",
    description: "Generate CSS code for geometric triangles.",
    icon: <TriangleIcon />,
    component: CssTriangle,
    category: ToolCategory.CSS,
    details: { introduction: "Create CSS triangles.", howToUse: ["Set direction/color", "Copy CSS"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    description: "Beautify and format XML strings.",
    icon: <XmlIcon />,
    component: XmlFormatter,
    category: ToolCategory.CODING,
    details: { introduction: "Format XML.", howToUse: ["Paste XML", "Copy formatted"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "morse-converter",
    name: "Morse Code Converter",
    description: "Translate text to Morse code and vice versa.",
    icon: <MorseIcon />,
    component: MorseConverter,
    category: ToolCategory.FUN,
    details: { introduction: "Text to Morse conversion.", howToUse: ["Type text", "See dots/dashes"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "binary-converter",
    name: "Binary Converter",
    description: "Translate text to binary code and back.",
    icon: <BinaryIcon />,
    component: BinaryConverter,
    category: ToolCategory.CODING,
    details: { introduction: "Convert text to 0s and 1s.", howToUse: ["Type text", "Get binary"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "password-strength",
    name: "Password Strength Checker",
    description: "Test the strength of your passwords.",
    icon: <ShieldCheckIcon />,
    component: PasswordStrength,
    category: ToolCategory.MISC,
    details: { introduction: "Check password strength.", howToUse: ["Type password", "See score"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "string-escaper",
    name: "String Escaper",
    description: "Escape strings for JSON, HTML, URL, and Java.",
    icon: <StringEscaperIcon />,
    component: StringEscaper,
    category: ToolCategory.CODING,
    details: { introduction: "Escape special characters.", howToUse: ["Paste text", "Select format"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Quickly calculate percentages for common math problems.",
    icon: <PercentIcon />,
    component: PercentageCalculator,
    category: ToolCategory.MATH,
    details: { introduction: "Calculate percentages.", howToUse: ["Enter numbers", "Get result"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "markdown-table-generator",
    name: "Markdown Table Generator",
    description: "Create Markdown tables easily with a visual editor.",
    icon: <TableIcon />,
    component: MarkdownTable,
    category: ToolCategory.TEXT,
    details: { introduction: "Generate MD tables.", howToUse: ["Set rows/cols", "Fill data", "Copy"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "list-randomizer",
    name: "List Randomizer",
    description: "Shuffle and randomize a list of items.",
    icon: <ListIcon />,
    component: ListRandomizer,
    category: ToolCategory.FUN,
    details: { introduction: "Randomize lists.", howToUse: ["Paste list", "Shuffle"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "text-cleaner",
    name: "Text Cleaner",
    description: "Remove extra spaces, line breaks, and format text.",
    icon: <EraserIcon />,
    component: TextCleaner,
    category: ToolCategory.TEXT,
    details: { introduction: "Clean up text.", howToUse: ["Paste text", "Click clean"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "ascii-art-generator",
    name: "ASCII Art Generator",
    description: "Generate simple ASCII art text banners.",
    icon: <AsciiIconComponent />,
    component: AsciiArt,
    category: ToolCategory.FUN,
    details: { introduction: "Create text banners.", howToUse: ["Type text", "See art"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "svg-to-data-uri",
    name: "SVG to Data URI",
    description: "Convert SVG code into a Data URI for use in CSS.",
    icon: <ImageIcon />,
    component: SvgToDataUri,
    category: ToolCategory.IMAGE,
    details: { introduction: "Convert SVG to URI.", howToUse: ["Paste SVG", "Copy URI"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "yaml-to-json",
    name: "YAML to JSON",
    description: "Convert simple YAML to JSON.",
    icon: <FileCodeIcon />,
    component: YamlToJson,
    category: ToolCategory.CODING,
    details: { introduction: "Convert YAML to JSON.", howToUse: ["Paste YAML", "Get JSON"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "json-to-yaml",
    name: "JSON to YAML",
    description: "Convert JSON objects to YAML format.",
    icon: <FileCodeIcon />,
    component: JsonToYaml,
    category: ToolCategory.CODING,
    details: { introduction: "Convert JSON to YAML.", howToUse: ["Paste JSON", "Get YAML"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  // Batch 3
  {
    id: "youtube-thumbnail",
    name: "YouTube Thumbnail Downloader",
    description: "Download thumbnails from any YouTube video in max resolution.",
    icon: <YoutubeIcon />,
    component: YouTubeThumbnail,
    category: ToolCategory.IMAGE,
    details: { introduction: "Grab video thumbnails.", howToUse: ["Paste URL", "Get Images"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "fancy-font",
    name: "Fancy Font Generator",
    description: "Generate stylish text for social media bios.",
    icon: <PenIcon />,
    component: FancyFontGenerator,
    category: ToolCategory.TEXT,
    details: { introduction: "Create fancy text.", howToUse: ["Type text", "Copy style"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "hashtag-extractor",
    name: "Hashtag Extractor",
    description: "Extract hashtags from a block of text.",
    icon: <TagsIcon />,
    component: HashtagExtractor,
    category: ToolCategory.TEXT,
    details: { introduction: "Find all hashtags.", howToUse: ["Paste text", "Copy tags"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "image-filters",
    name: "Instagram Photo Filters",
    description: "Apply CSS filters like grayscale, sepia, and blur to images.",
    icon: <FiltersIcon />,
    component: ImageFilters,
    category: ToolCategory.IMAGE,
    details: { introduction: "Apply effects to images.", howToUse: ["Upload image", "Adjust sliders", "Download"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "svg-blob",
    name: "SVG Blob Generator",
    description: "Create organic blob shapes for backgrounds.",
    icon: <BlobIcon />,
    component: SvgBlobGenerator,
    category: ToolCategory.IMAGE,
    details: { introduction: "Generate random blobs.", howToUse: ["Adjust settings", "Copy SVG"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "svg-wave",
    name: "SVG Wave Generator",
    description: "Generate smooth wave dividers for your website.",
    icon: <WavesIcon />,
    component: SvgWaveGenerator,
    category: ToolCategory.IMAGE,
    details: { introduction: "Create page dividers.", howToUse: ["Set layers", "Copy SVG"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "keycode-info",
    name: "Keycode Event Info",
    description: "Get JavaScript event codes for any key press.",
    icon: <KeyboardIcon />,
    component: KeycodeInfo,
    category: ToolCategory.CODING,
    details: { introduction: "Find key codes.", howToUse: ["Press key", "See codes"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "screen-info",
    name: "Screen Resolution Info",
    description: "View your current screen and viewport dimensions.",
    icon: <ScreenIcon />,
    component: ScreenInfo,
    category: ToolCategory.PRODUCTIVITY,
    details: { introduction: "Check your resolution.", howToUse: ["Open tool", "See stats"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "text-to-speech",
    name: "Text to Speech",
    description: "Convert text to spoken audio in your browser.",
    icon: <MicIcon />,
    component: TextToSpeech,
    category: ToolCategory.FUN,
    details: { introduction: "Read text aloud.", howToUse: ["Type text", "Click speak"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "roman-numeral",
    name: "Roman Numeral Converter",
    description: "Convert numbers to Roman numerals and back.",
    icon: <RomanIcon />,
    component: RomanNumeral,
    category: ToolCategory.MATH,
    details: { introduction: "Convert numbers.", howToUse: ["Enter number", "See result"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, and days.",
    icon: <BabyIcon />,
    component: AgeCalculator,
    category: ToolCategory.MATH,
    details: { introduction: "Find your exact age.", howToUse: ["Enter birthdate", "See age"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "random-number",
    name: "Random Number Generator",
    description: "Generate random numbers within a specific range.",
    icon: <DiceIcon />,
    component: RandomNumber,
    category: ToolCategory.MATH,
    details: { introduction: "Get random numbers.", howToUse: ["Set range", "Generate"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "duplicate-remover",
    name: "Duplicate Line Remover",
    description: "Remove duplicate entries from a list of text.",
    icon: <DuplicateIcon />,
    component: DuplicateRemover,
    category: ToolCategory.TEXT,
    details: { introduction: "Clean lists.", howToUse: ["Paste list", "Remove dupes"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "html-entity",
    name: "HTML Entity Encoder",
    description: "Encode/Decode text to HTML entities.",
    icon: <HtmlEntityIcon />,
    component: HtmlEntity,
    category: ToolCategory.CODING,
    details: { introduction: "Escape HTML.", howToUse: ["Paste text", "Encode/Decode"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "css-cursors",
    name: "CSS Cursor Viewer",
    description: "Visual reference for all CSS cursor types.",
    icon: <CursorIcon />,
    component: CssCursors,
    category: ToolCategory.CSS,
    details: { introduction: "View CSS cursors.", howToUse: ["Hover boxes", "Copy CSS"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "device-resolutions",
    name: "Device Resolution List",
    description: "Reference guide for common device screen sizes.",
    icon: <DevicesIcon />,
    component: DeviceResolutions,
    category: ToolCategory.PRODUCTIVITY,
    details: { introduction: "Check device sizes.", howToUse: ["Search device", "See specs"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "lorem-image",
    name: "Lorem Picsum Generator",
    description: "Generate placeholder image URLs.",
    icon: <PlaceholderIcon />,
    component: LoremImage,
    category: ToolCategory.IMAGE,
    details: { introduction: "Get dummy images.", howToUse: ["Set size", "Copy URL"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "css-borders",
    name: "CSS Border Preview",
    description: "Visualizer for all CSS border styles.",
    icon: <BorderIcon />,
    component: CssBorders,
    category: ToolCategory.CSS,
    details: { introduction: "Preview borders.", howToUse: ["Click style", "Copy code"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "css-patterns",
    name: "CSS Background Patterns",
    description: "Generate pure CSS background patterns.",
    icon: <PatternIcon />,
    component: CssPatterns,
    category: ToolCategory.CSS,
    details: { introduction: "Create patterns.", howToUse: ["Select style", "Customize", "Copy"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "signature-pad",
    name: "Signature Pad",
    description: "Draw and save digital signatures.",
    icon: <SignatureIcon />,
    component: SignaturePad,
    category: ToolCategory.MISC,
    details: { introduction: "Draw signature.", howToUse: ["Draw", "Download"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
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

    details: {
      introduction:
        "Write with confidence and clarity. Our Readability Score Calculator instantly analyzes your text to see how easy it is to understand. Using trusted metrics like Flesch Reading Ease and Flesch-Kincaid Grade Level, this tool helps you connect with your audience, improve engagement, and make your message accessible to everyone. Perfect for bloggers, marketers, and writers who care about quality.",

      howToUse: [
        "Paste your text into the input field.",
        "Watch as the tool analyzes your writing in real-time.",
        "Review your scores, including Flesch Reading Ease and the estimated U.S. grade level.",
        "Get detailed stats like word count, sentence length, and syllable count.",
        "Refine your text to match your audience's reading level and boost clarity.",
      ],

      features: [
        "Instant Readability Scores: Get Flesch Reading Ease and Flesch-Kincaid Grade Level in seconds.",
        "Detailed Text Analysis: See stats on words, sentences, syllables, and more.",
        "Audience-Focused Writing: Create content that's perfectly tailored to your readers.",
        "Essential for Professionals: A must-have for SEOs, marketers, educators, and UX writers.",
        "Completely Private: Your text is analyzed locally in your browser and never stored.",
      ],

      privacy: PRIVACY_STATEMENT,

      explanation:
        "Readability scores measure how simple your writing is to understand. Formulas like Flesch-Kincaid analyze sentence length and word complexity (syllables) to generate a score. A higher Reading Ease score (0-100) means your text is easier to read, while the Grade Level score shows the U.S. school grade needed to comprehend it. Using these metrics helps you create clear, effective content that resonates with a broader audience.",

      usageExamples: [
        "A blogger ensuring their post is easy for a general audience to digest.",
        "A technical writer simplifying complex documentation for clarity.",
        "A marketer crafting landing page copy that converts.",
        "A UX writer making sure in-app instructions are crystal clear.",
      ],

      underlyingConcept:
        "The tool implements two proven readability formulas. The Flesch Reading Ease formula: 206.835 - 1.015 × (Total Words / Total Sentences) - 84.6 × (Total Syllables / Total Words). The Flesch-Kincaid Grade Level formula: 0.39 × (Total Words / Total Sentences) + 11.8 × (Total Syllables / Total Words) - 15.59. These calculations provide a reliable measure of text complexity, empowering writers to improve clarity.",

      faqs: [
        {
          question: "What is a good readability score?",
          answer:
            "For most online content, a Flesch Reading Ease score of 60-70 is great. This means your text is easily understood by the average reader (around an 8th-grade level).",
        },
        {
          question: "Is a higher grade level better?",
          answer:
            "Not always. Simpler is often better. A high grade level means your text is complex, which can alienate readers. Aim for a grade level that matches your target audience.",
        },
        {
          question: "Is my text private?",
          answer:
            "Yes. All analysis happens on your device. Your text never touches our servers.",
        },
      ],
    },
  },
  {
    id: "loan-calculator",
    name: "Loan Calculator",
    description:
      "Calculate accurate monthly payments, interest costs, and a complete amortization schedule for any type of loan.",
    seoTitle:
      "Free Loan Calculator | Estimate Monthly Payments & Amortization",
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

    details: {
      introduction:
        "Demystify your loan and take control of your financial future. Our advanced Loan Calculator gives you a crystal-clear breakdown of any loan, whether it's a mortgage, car loan, or personal financing. Instantly see your monthly payments, the total interest you'll pay, and a detailed amortization schedule. Make smarter financial decisions by comparing scenarios and finding the loan that works for you.",

      howToUse: [
        "Enter the total Loan Amount you wish to borrow.",
        "Input the annual Interest Rate (e.g., 5 for 5%).",
        "Set the Loan Term in either years or months.",
        "Instantly see your estimated monthly payment, total interest, and total cost.",
        "Explore the full Amortization Schedule to see how your payments reduce the principal over time.",
        "Adjust the numbers to compare different loans and find your best fit.",
      ],

      features: [
        "Accurate Payment Calculation: Get precise monthly payment estimates for any fixed-rate loan.",
        "Full Amortization Schedule: See a detailed, month-by-month breakdown of interest vs. principal.",
        "Total Cost Breakdown: Understand the true cost of your loan with total interest calculations.",
        "Flexible Terms: Supports loan terms in both years and months for ultimate flexibility.",
        "Instant Comparisons: Adjust values on the fly to compare different loan options.",
        "100% Private & Secure: All calculations are performed in your browser. Your financial data is never stored.",
      ],

      privacy: PRIVACY_STATEMENT,

      explanation:
        "An amortization schedule reveals how your loan is paid off over time. With each payment, a portion goes to interest and the rest to the principal (the amount you borrowed). In the beginning, more of your payment covers interest. As you pay down the balance, more goes toward the principal, accelerating your path to being debt-free. Our calculator uses the standard formula to give you a precise financial forecast.",

      usageExamples: [
        "A homebuyer comparing 15-year vs. 30-year mortgage terms.",
        "A car buyer determining what interest rate they can afford.",
        "A student planning their repayment strategy for an education loan.",
        "An entrepreneur forecasting costs for a new business loan.",
      ],

      underlyingConcept:
        "The calculator uses the standard amortizing loan formula: M = P × [r(1+r)^n] / [(1+r)^n − 1], where M is the monthly payment, P is the principal, r is the monthly interest rate, and n is the number of payments. This industry-standard formula ensures you get an accurate and reliable financial picture.",

      faqs: [
        {
          question: "Why do my first few payments mostly go to interest?",
          answer:
            "Interest is calculated on your outstanding balance. Since your balance is highest at the start, the interest portion of your payment is also at its peak. As you pay down the principal, this amount decreases.",
        },
        {
          question: "How can I pay less interest overall?",
          answer:
            "Choose a shorter loan term, secure a lower interest rate, or make extra payments toward the principal. Even small extra payments can save you thousands over the life of the loan.",
        },
        {
          question: "Does this work for all types of loans?",
          answer:
            "Yes, it works perfectly for any fixed-rate installment loan, including mortgages, auto loans, and personal loans.",
        },
      ],
    },
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

    details: {
      introduction:
        "Effortlessly sync with the world. The Time Zone Converter eliminates confusion when dealing with global times. Whether you're scheduling a meeting with an international client, planning your next trip, or coordinating with a remote team, this tool provides instant, accurate time conversions. See the exact time anywhere on the planet with a clean, simple interface.",

      howToUse: [
        "Pick the date and time you want to convert.",
        "Select your 'From' and 'To' time zones from the dropdown lists.",
        "The converted date and time appear instantly.",
        "Use the 'Swap' button to quickly reverse the conversion.",
        "The tool automatically handles Daylight Saving Time (DST) for you.",
      ],

      features: [
        "Instant & Accurate: Real-time conversions between any two global time zones.",
        "Clear Comparison: A side-by-side display makes it easy to see the time difference.",
        "DST Aware: Automatically adjusts for Daylight Saving Time so you don't have to.",
        "Comprehensive List: Search from a clean, IANA-standard list of time zones.",
        "Swap Functionality: Quickly flip your 'From' and 'To' locations with one click.",
        "Completely Private: All calculations happen in your browser. Your data is never saved.",
      ],

      privacy: PRIVACY_STATEMENT,

      explanation:
        "This converter uses your browser's built-in Internationalization API (Intl) for maximum accuracy. By formatting a single time object according to different IANA time zone rules (like 'America/New_York' or 'Asia/Tokyo'), it ensures every conversion is precise and accounts for regional complexities like Daylight Saving Time, all without needing external servers.",

      usageExamples: [
        "A project manager finding the perfect meeting time for a team spread across continents.",
        "A traveler checking their arrival time in the local destination.",
        "A remote worker making sure they don't message a colleague in the middle of the night.",
        "Someone sending birthday wishes at exactly midnight in a friend's time zone.",
      ],

      underlyingConcept:
        "Powered by `Intl.DateTimeFormat`, the tool renders a single UTC timestamp in the context of different IANA time zones. This modern approach guarantees accuracy by respecting regional offsets, DST rules, and date boundaries, providing a reliable conversion every time.",

      faqs: [
        {
          question: "What are IANA time zones?",
          answer:
            "They are standardized identifiers for time zones, like 'America/Los_Angeles' or 'Europe/London'. They are the global standard and automatically account for local rules and DST.",
        },
        {
          question: "Why is the converted day sometimes different?",
          answer:
            "When the time difference between two zones is large, it can cross over midnight. For example, evening in New York might already be the next morning in Tokyo.",
        },
        {
          question: "Is my data private?",
          answer:
            "Absolutely. All conversions happen locally on your device. Nothing is ever stored or transmitted.",
        },
      ],
    },
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
    details: {
      tip: "Use 'Title Case' for professional-looking headlines and 'Sentence case' for easy-to-read paragraphs.",
      introduction:
        "Tired of manually fixing text case? Our Case Converter tool instantly transforms your text into the format you need. Whether it's for a headline, a document, or a piece of code, you can switch between UPPERCASE, lowercase, Sentence case, Title Case, and more in a single click. Save time and eliminate errors with this simple yet powerful tool.",
      explanation:
        "The tool uses smart logic to apply the correct case transformation. For Title Case, it capitalizes major words while ignoring minor ones (like 'a' or 'the'). For Sentence case, it capitalizes the first letter of each sentence. It's fast, efficient, and all done in your browser.",
      usageExamples: [
        "A writer converting a headline to Title Case for a blog post.",
        "A developer changing variable names to UPPER_CASE for constants.",
        "A student formatting an essay with proper Sentence case.",
      ],
      underlyingConcept:
        "Text casing is crucial for readability and style. Different cases serve different purposes: uppercase for emphasis, title case for headlines, and sentence case for readability. This tool automates these conventions, handling various languages and special characters with Unicode support.",
      howToUse: [
        "Paste your text into the input box.",
        "Click the button for the case you want (e.g., UPPER CASE, lower case).",
        "Your converted text appears instantly in the result area.",
        "Copy the result with a single click.",
      ],
      features: [
        "Multiple Formats: Supports UPPER, lower, Sentence, Title case, and more.",
        "Instant Conversion: No delays, no server processing.",
        "Simple Interface: Clean, intuitive, and easy to use.",
        "Handles Large Text: Works efficiently even with long documents.",
      ],
      faqs: [
        {
          question: "Does it work with other languages?",
          answer:
            "Yes, it supports Unicode, so it works with accented letters and other alphabets.",
        },
        {
          question: "Can I convert a whole document?",
          answer:
            "Absolutely. The tool can handle large blocks of text without a problem.",
        },
        {
          question: "Is there a text limit?",
          answer:
            "No strict limit. Performance with extremely large texts depends on your browser.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Every word matters. Our free Word Counter gives you a real-time analysis of your text, helping you write with precision and meet any requirement. Whether you're a student drafting an essay, a blogger optimizing for SEO, or a marketer crafting the perfect social media post, this tool provides the essential metrics you need: word count, character count, sentence and paragraph totals, and even an estimated reading time. It's fast, accurate, and designed to keep you focused.",
      howToUse: [
        "Start typing or paste your text into the input area.",
        "Watch the counts for words, characters, sentences, and paragraphs update in real-time.",
        "Check the estimated reading time to see how long it will take to read your content.",
        "Use the clean, distraction-free interface to focus on your writing.",
      ],
      features: [
        "Real-Time Analytics: Instant counts for words, characters, sentences, and paragraphs.",
        "Reading Time Estimator: See how long your text will take to read.",
        "Multi-Language Support: Works accurately with any language thanks to Unicode compatibility.",
        "Clean & Focused UI: A minimalist design with dark mode for comfortable writing sessions.",
        "Advanced Detection: Smartly recognizes sentences, even with abbreviations.",
        "Privacy-First: All analysis is done locally in your browser. Your text is never stored.",
      ],
      privacy: PRIVACY_STATEMENT,
      explanation:
        "This Word Counter uses smart linguistic parsing to deliver precise metrics. Words are identified by spaces and punctuation, sentences by analyzing boundaries, and paragraphs by line breaks. This provides a deeper understanding of your writing style and structure, helping you improve readability and meet specific guidelines for any platform.",
      usageExamples: [
        "A student ensuring their essay meets the required word count.",
        "A blogger optimizing an article's length for better reader engagement.",
        "A social media manager checking character limits for a post.",
        "An editor analyzing sentence structure and pacing in a manuscript.",
      ],
      faqs: [
        {
          question: "How are words counted?",
          answer:
            "Words are counted based on spaces and punctuation. Hyphenated words and contractions (like 'don't') are counted as single words for accuracy.",
        },
        {
          question: "What's the difference between character counts?",
          answer:
            "Characters 'with spaces' includes every keystroke, while 'without spaces' measures only the letters and symbols, which is useful for certain SEO analyses.",
        },
        {
          question: "Does it work for other languages?",
          answer:
            "Yes. The tool is built with Unicode support, ensuring accurate counts for languages like Spanish, Chinese, Arabic, and more.",
        },
        {
          question: "How is reading time calculated?",
          answer:
            "It's estimated based on an average reading speed of 200-300 words per minute (WPM), but this can vary depending on the complexity of the text.",
        },
      ],
      underlyingConcept:
        "The tool uses computational linguistics to tokenize and segment text. Words are identified by delimiters, sentences by punctuation patterns, and paragraphs by line breaks. This mirrors the methods used in NLP frameworks, providing insights into text density, structure, and readability.",
    },
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

    details: {
      introduction:
        "Stay within the limits. Our Character Counter is a precision tool for anyone who writes for digital platforms. It instantly calculates characters (with and without spaces) and total byte size, making it perfect for crafting social media posts, SMS messages, or API payloads. Ensure your text fits every time, without the guesswork.",

      explanation:
        "This tool counts every character in real-time. For byte size, it encodes your text in UTF-8 to measure the exact storage space required, which is crucial for handling multi-byte characters like emojis and international symbols.",

      usageExamples: [
        "Crafting the perfect tweet that fits within the 280-character limit.",
        "Ensuring an SMS message doesn't get split into multiple texts.",
        "Verifying that an API payload won't exceed data limits.",
        "Checking that a title or caption meets a platform's character requirements.",
      ],

      underlyingConcept:
        "Character counting is more than just counting letters. With UTF-8 encoding, standard ASCII characters use 1 byte, but special characters like emojis can use up to 4 bytes. This tool distinguishes between visual characters and their actual byte size, giving developers and writers the precise information they need.",

      howToUse: [
        "Paste or type your text into the input area.",
        "Instantly see the counts for characters (with and without spaces) and the UTF-8 byte size.",
        "The counts will update in real-time as you edit.",
      ],

      features: [
        "Instant Character Counts: See counts with and without spaces as you type.",
        "Accurate Byte Size: Calculates the UTF-8 byte size for technical precision.",
        "Full Unicode Support: Correctly counts all characters, including emojis and symbols.",
        "Real-Time Feedback: Watch the numbers update instantly as you write.",
        "Essential for Digital Content: Perfect for social media, SMS, and development.",
      ],

      faqs: [
        {
          question: "Why is the byte size different from the character count?",
          answer:
            "Because special characters like emojis (👍) or accented letters (é) require more than one byte of storage in UTF-8 encoding.",
        },
        {
          question: "Does it count spaces?",
          answer:
            "Yes, it provides counts both with and without spaces so you have all the information you need.",
        },
        {
          question: "Is it accurate for all languages?",
          answer:
            "Yes, it fully supports Unicode, ensuring every language is counted correctly.",
        },
      ],

      privacy: PRIVACY_STATEMENT,
    },
  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description:
      "Generate customizable placeholder text for web design, UI/UX prototypes, print layouts, and content mockups.",
    seoTitle:
      "Lorem Ipsum Generator | Create Custom Placeholder Text",
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

    details: {
      introduction:
        "Focus on design, not content. Our Lorem Ipsum Generator instantly creates professional placeholder text for your projects. Whether you're a designer crafting a website, a developer building a UI, or a strategist creating a wireframe, this tool provides the perfect filler text to make your layouts look complete. Generate paragraphs, sentences, or words to fit any design.",

      howToUse: [
        "Choose whether you want to generate paragraphs, sentences, or words.",
        "Use the slider to select the amount of text you need.",
        "Click 'Generate' to create your custom placeholder text.",
        "Copy the text with a single click and paste it into your design.",
      ],

      features: [
        "Flexible Generation: Create paragraphs, sentences, or words to fit any layout.",
        "Customizable Length: Easily control the amount of text you generate.",
        "Classic & Random: Uses traditional Latin text for a professional look.",
        "Instant & Easy: Generate and copy text in seconds.",
        "Perfect for Designers: Ideal for Figma, Sketch, Adobe XD, and more.",
      ],

      privacy: PRIVACY_STATEMENT,

      explanation:
        "Lorem Ipsum is the industry standard for placeholder text. It mimics the flow of real language without distracting from the design. Our generator uses a smart algorithm to create natural-looking passages, ensuring your mockups and wireframes look polished and professional.",

      usageExamples: [
        "A web designer testing typography and spacing on a new site.",
        "A UI/UX designer populating a wireframe in Figma or Sketch.",
        "A print designer creating a mockup for a brochure or flyer.",
        "A developer styling a component with realistic-looking text.",
      ],

      faqs: [
        {
          question: "Why use Lorem Ipsum?",
          answer:
            "It allows you and your clients to focus on the design and layout without getting distracted by the actual content.",
        },
        {
          question: "Is this real Latin?",
          answer:
            "It's based on a classical Latin text by Cicero, but it's intentionally scrambled to be nonsensical, which is what makes it great for placeholder text.",
        },
        {
          question: "Can I generate text in other languages?",
          answer:
            "This tool focuses on the classic Latin Lorem Ipsum. For other languages, you can use a translation tool on the generated text.",
        },
        {
          question: "Will this hurt my SEO?",
          answer:
            "No, as long as you replace it with real content before you publish your site. Search engines are smart enough to ignore placeholder text.",
        },
      ],

      underlyingConcept:
        "The generator uses procedural generation to combine words and phrases from a classical Latin text, creating passages that have a natural rhythm and word distribution. This avoids the repetitive look of simple copy-pasted text, making your designs feel more realistic.",
    },
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

    details: {
      introduction:
        "Type, and watch it flip! Our Text Reverser is a simple and fun tool that instantly reverses any text you enter. Whether you're creating a quirky social media post, making a puzzle, or just having fun, this tool flips letters, words, and even emojis in real-time. It's fast, easy, and works with any language.",

      explanation:
        "The tool takes your text, splits it into individual characters, reverses their order, and then joins them back together. It's a classic string manipulation that works seamlessly with all Unicode characters, including emojis.",

      usageExamples: [
        "Creating fun, backwards posts for social media.",
        "Making clues for a puzzle or game.",
        "Testing a string reversal function for a coding interview.",
        "Generating a 'mirror' effect for a design.",
      ],

      underlyingConcept:
        "Text reversal is a fundamental operation in computer science that demonstrates basic array and string manipulation. By iterating through a string from end to beginning, each character is repositioned to create a mirror image of the original text.",

      howToUse: [
        "Type or paste your text into the 'Original Text' box.",
        "The reversed text will appear instantly in the box below.",
        "Copy your new, backwards text with a single click.",
      ],

      features: [
        "Instant Reversal: See your text flip in real-time as you type.",
        "Full Unicode Support: Correctly reverses all characters, symbols, and emojis.",
        "Simple & Fun: Easy to use for creative projects, puzzles, and more.",
        "100% Private: All processing happens in your browser.",
      ],

      faqs: [
        {
          question: "Does it reverse the whole text or just the words?",
          answer:
            "It reverses the entire string, character by character. For example, 'hello world' becomes 'dlrow olleh'.",
        },
        {
          question: "Are emojis reversed correctly?",
          answer:
            "Yes, emojis are treated as single characters and will appear correctly in the reversed text.",
        },
        {
          question: "Can I reverse multiple lines?",
          answer:
            "Yes, the tool will reverse the entire block of text, including line breaks.",
        },
      ],

      privacy: PRIVACY_STATEMENT,
    },
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

    details: {
      introduction:
        "Write, preview, and perfect your Markdown in one seamless experience. Our live Markdown Previewer shows you exactly how your text will look as you type. With a side-by-side view of your code and the rendered HTML, it's the perfect tool for developers creating READMEs, bloggers drafting posts, and writers working on documentation. No more switching tabs or guessing formats—just fast, accurate, real-time results.",

      explanation:
        "The tool parses your Markdown syntax on the fly and converts it into clean, standard HTML. It supports all the essentials—headers, lists, code blocks, links, images, and tables—giving you an exact preview of your final document.",

      usageExamples: [
        "A developer drafting a GitHub README and checking the formatting live.",
        "A blogger writing a post and seeing how it will look before publishing.",
        "A technical writer creating documentation with instant visual feedback.",
        "Anyone learning Markdown and wanting to see how the syntax works.",
      ],

      underlyingConcept:
        "Markdown is a lightweight markup language designed for readability. This tool uses a powerful parser to instantly translate your plain text into structured HTML, making it easy to create beautiful, well-formatted web content without writing a single line of HTML.",

      howToUse: [
        "Type your Markdown in the editor on the left.",
        "Watch the live preview appear on the right.",
        "The preview updates automatically as you edit.",
        "Use standard Markdown syntax for headers, lists, code blocks, and more.",
      ],

      features: [
        "Live Side-by-Side Preview: See your changes instantly as you type.",
        "Full Markdown Support: Works with standard and GitHub Flavored Markdown (GFM).",
        "Clean HTML Output: Generates a perfect visual representation of your content.",
        "Fast & Efficient: No delays, no lag. Just smooth, real-time rendering.",
        "Secure & Private: All processing is done in your browser.",
      ],

      faqs: [
        {
          question: "Does it support GitHub Flavored Markdown (GFM)?",
          answer:
            "Yes, it supports GFM features like tables, task lists, and strikethrough.",
        },
        {
          question: "Can I add images?",
          answer:
            "Absolutely. Just use the standard Markdown image syntax: `![alt text](image_url)`.",
        },
        {
          question: "Is the preview safe?",
          answer:
            "Yes, all output is sanitized to prevent security risks like XSS attacks.",
        },
      ],

      privacy: PRIVACY_STATEMENT,
    },
  },
  // Coding Tools
  {
    id: "base64-converter",
    name: "Base64 Converter",
    description:
      "Instantly encode and decode text, images, and files to/from Base64 online.",
    seoTitle:
      "Online Base64 Converter | Encode & Decode Text, Files & Images",
    seoDescription:
      "A free, powerful tool to encode and decode Base64. Easily convert text, images, or any file into a Base64 string and back again. Secure, fast, and all in your browser.",
    icon: <Base64Icon />,
    component: Base64Converter,
    category: ToolCategory.CODING,
    details: {
      introduction:
        "The ultimate Base64 tool for developers. Our free Base64 Converter lets you effortlessly encode text and files into Base64 strings or decode them back to their original form. It's perfect for embedding images in CSS, transmitting data in JSON, or handling file uploads in web applications. Fast, secure, and entirely browser-based—no server uploads required.",
      howToUse: [
        "Choose whether you want to 'Encode' to Base64 or 'Decode' from it.",
        "For text, simply paste your content into the input field.",
        "For files, drag and drop an image, PDF, or any other file.",
        "The tool processes it instantly, and the result appears below.",
        "Copy the output with a single click or download the decoded file.",
      ],
      features: [
        "Encode & Decode: Seamlessly switch between encoding and decoding.",
        "File Support: Works with images, PDFs, and other binary files.",
        "Real-Time Processing: Instant results as you type or upload.",
        "URL-Safe Option: Generate URL-safe Base64 for use in web addresses.",
        "Error Highlighting: Instantly spots and flags invalid Base64 strings.",
        "100% Browser-Based: Your data is never uploaded, ensuring complete privacy.",
      ],
      privacy: PRIVACY_STATEMENT,
      explanation:
        "Base64 is an encoding scheme that converts binary data into a text-based format, making it safe to transmit over protocols that only support plain text (like email or JSON). It works by translating binary data into a 64-character set. Our tool handles this process perfectly, including the necessary padding, so you get a reliable result every time.",
      usageExamples: [
        "Embedding a small icon directly into a CSS file to reduce HTTP requests.",
        "Encoding a JSON object for safe transmission in an API call.",
        "Preparing an image for an inline `src` attribute in HTML.",
        "Decoding a Base64 string from an API response to view the original content.",
      ],
      faqs: [
        {
          question: "What is Base64 used for?",
          answer:
            "It's used to encode binary data (like images) into text so it can be safely sent over text-only systems like email or included in text files like HTML and CSS.",
        },
        {
          question: "Does Base64 make my data smaller?",
          answer:
            "No, it actually increases the size by about 33%. Its purpose is safe transmission, not compression.",
        },
        {
          question: "Is this tool secure?",
          answer:
            "Yes. All encoding and decoding happens locally in your browser. Your data is never sent to our servers.",
        },
        {
          question: "Why did my decoding fail?",
          answer:
            "This usually happens if the text is not a valid Base64 string, has incorrect padding, or contains invalid characters. Our tool will highlight these errors for you.",
        },
      ],
      underlyingConcept:
        "Base64 encoding maps groups of 3 bytes of binary data into 4 characters from a 64-character alphabet. If the data is not a multiple of 3, padding (`=`) is added. This ensures that the binary data can be reliably transmitted through systems designed to handle only text.",
    },
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
    details: {
      introduction:
        "Ensure your URLs are always safe and valid. Our URL Encoder/Decoder makes it easy to convert strings with special characters (like spaces, `&`, or `?`) into a format that can be safely transmitted over the web. It's an essential tool for developers building APIs, marketers creating campaign links, or anyone who needs to handle complex URLs.",
      explanation:
        "URL encoding, also known as percent-encoding, replaces unsafe characters with a `%` followed by their two-digit hex code. This prevents browsers and servers from misinterpreting your URLs. Our tool uses the standard `encodeURIComponent` function for maximum safety and compatibility.",
      usageExamples: [
        "Building a search query with user-generated input.",
        "Creating a link with special characters in the parameters.",
        "Debugging a malformed URL from a server log.",
      ],
      underlyingConcept:
        "Following the RFC 3986 standard, URL encoding ensures that data in a URL is correctly interpreted. Reserved characters (like `?` and `&`) have special meanings, so they and other non-standard characters must be encoded to be treated as literal data.",
      howToUse: [
        "Paste your string or URL into the input box.",
        "Click 'Encode' to convert it into a URL-safe format.",
        "To reverse the process, paste an encoded string and click 'Decode'.",
      ],
      features: [
        "Safe & Reliable: Uses the standard `encodeURIComponent()` function.",
        "Handles All Special Characters: Correctly encodes spaces, symbols, and more.",
        "Instant Results: Real-time encoding and decoding.",
        "Simple Interface: Clean, fast, and easy to use.",
      ],
      faqs: [
        {
          question: "What's the difference between this and `encodeURI`?",
          answer:
            "`encodeURIComponent` is safer because it encodes more characters. It's best for encoding individual URL parameters, while `encodeURI` is for encoding a full URL.",
        },
        {
          question: "How are spaces handled?",
          answer:
            "Spaces are typically converted to `%20` or `+`, depending on the context. Our tool uses `%20` for broad compatibility.",
        },
        {
          question: "Is it safe for full URLs?",
          answer:
            "It's safest to encode only the components of a URL, not the entire thing, as that can break the `http://` part.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      tip: "Paste a messy, single-line JSON response from an API and click 'Format' to make it beautiful and readable in a second!",
      introduction:
        "Tired of trying to read ugly, minified JSON? Our JSON Formatter instantly transforms messy data into a clean, perfectly indented, and human-readable format. It also validates your JSON, pointing out any syntax errors so you can fix them fast. It's an essential tool for any developer working with APIs or configuration files.",
      explanation:
        "The tool first tries to parse your text using `JSON.parse()`. If it's valid JSON, it's then re-formatted with `JSON.stringify()` using indentation to make it 'pretty'. If it's not valid, it catches the error and tells you where to look.",
      usageExamples: [
        "Debugging a JSON response from an API.",
        "Formatting a `.json` configuration file to make it easier to read.",
        "Validating JSON created by a user or another system.",
      ],
      underlyingConcept:
        "JSON (JavaScript Object Notation) is a lightweight data-interchange format. While it's easy for machines to parse, it can be hard for humans to read when it's 'minified' (all on one line). 'Pretty-printing' adds indentation and line breaks to reveal its nested structure.",
      howToUse: [
        "Paste your raw JSON into the input box.",
        "Click the 'Format / Validate' button.",
        "If your JSON is valid, it will be beautifully formatted below.",
        "If there's an error, a helpful message will appear telling you what's wrong.",
      ],
      features: [
        "Pretty-Prints JSON: Turns minified JSON into a readable, indented structure.",
        "Validates Your Code: Instantly checks for syntax errors.",
        "Clear Error Messages: Helps you find and fix problems fast.",
        "Clean Interface: Simple, fast, and easy to use.",
      ],
      faqs: [
        {
          question: "Can it handle large JSON files?",
          answer:
            "Yes, it can handle large amounts of text, though performance may depend on your browser.",
        },
        {
          question: "Does it change the order of the keys?",
          answer:
            "No, the original order of the keys in your objects is preserved.",
        },
        {
          question: "What if my JSON is invalid?",
          answer:
            "The tool will display a descriptive error message, often with a line number, to help you find the mistake.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Stop the guesswork and master regular expressions. Our online Regex Tester lets you build and test your patterns in real-time, instantly showing you the matches and capture groups in your text. It's the perfect playground for developers, data analysts, and anyone looking to harness the power of regex for validation, parsing, or data extraction.",
      explanation:
        "The tool creates a JavaScript `RegExp` object from your pattern and flags, then uses it to find all matches in your test string. The results are highlighted instantly, giving you immediate feedback as you type.",
      usageExamples: [
        "Validating an email address or phone number format.",
        "Extracting all the links from a block of HTML.",
        "Building a search-and-replace pattern for your code editor.",
      ],
      underlyingConcept:
        "Regular expressions (regex) are powerful patterns used to match and manipulate text. They are a fundamental tool in programming for tasks like input validation, data scraping, and text processing. This tool provides a safe and easy way to experiment with them.",
      howToUse: [
        "Enter your regex pattern in the 'Regular Expression' field.",
        "Add any flags you need (like `g` for global or `i` for case-insensitive).",
        "Type or paste the text you want to test in the 'Test String' area.",
        "See your matches highlighted instantly in the results panel.",
      ],
      features: [
        "Real-Time Highlighting: Matches and capture groups are highlighted as you type.",
        "Flag Support: Supports all standard JavaScript regex flags (g, i, m, s, etc.).",
        "Detailed Match List: See a clear list of all matches found.",
        "Error Detection: Instantly flags invalid regex patterns.",
      ],
      faqs: [
        {
          question: "What flags are supported?",
          answer:
            "It supports all standard JavaScript flags: `g` (global), `i` (case-insensitive), `m` (multiline), `s` (dotall), `u` (unicode), and `y` (sticky).",
        },
        {
          question: "Is this specific to JavaScript regex?",
          answer:
            "Yes, this tool uses the JavaScript regex engine, so it's perfect for web developers.",
        },
        {
          question: "Does it show replacements?",
          answer:
            "Currently, it focuses on matching and capturing. A replacement feature may be added in the future.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Generate cryptographically strong, random Version 4 UUIDs (Universally Unique Identifiers) with a single click. This tool is essential for developers and database administrators who need guaranteed unique IDs for records, sessions, or distributed systems. No libraries, no commands—just instant, secure UUIDs.",
      explanation:
        "This tool uses the browser's built-in `crypto.randomUUID()` method, which generates a 128-bit random UUID according to the RFC 4122 standard. This is the most secure and modern way to create UUIDs on the web.",
      usageExamples: [
        "Assigning a unique primary key to a new database record.",
        "Generating a secure session ID for a user.",
        "Creating a unique identifier for a transaction in a distributed system.",
      ],
      underlyingConcept:
        "A Version 4 UUID is a 128-bit number that is generated randomly. The sheer number of possible combinations (2^122) makes the probability of two randomly generated UUIDs being the same virtually zero, making them ideal for decentralized systems.",
      howToUse: [
        "Click the 'Generate UUID' button.",
        "A new, random UUID will appear instantly.",
        "Click the 'Copy' button to copy it to your clipboard.",
      ],
      features: [
        "Cryptographically Strong: Generates secure, random UUIDs (v4).",
        "Browser-Native Security: Uses the Web Crypto API for maximum security.",
        "One-Click Generation: Instantly create and copy a new UUID.",
        "No Collisions: The probability of a duplicate is practically zero.",
      ],
      faqs: [
        {
          question: "Is a v4 UUID truly unique?",
          answer:
            "For all practical purposes, yes. The chance of generating a duplicate is astronomically low.",
        },
        {
          question: "Can I generate more than one?",
          answer:
            "Yes, just keep clicking the 'Generate UUID' button for as many as you need.",
        },
        {
          question: "What about other UUID versions?",
          answer:
            "This tool focuses on Version 4, which is the most common and recommended version for generating random IDs. Other versions, like v1, are based on timestamps.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    seoTitle: "Online Hash Generator | Generate SHA-1, SHA-256 & SHA-512 Hashes",
    seoDescription:
      "Instantly generate secure SHA-1, SHA-256, and SHA-512 hashes from any text with our free online tool. Powered by the Web Crypto API for maximum security. 100% private.",
    icon: <HashIcon />,
    component: HashGenerator,
    category: ToolCategory.CODING,
    details: {
      introduction:
        "Quickly generate secure cryptographic hashes from any text. Our Hash Generator supports SHA-1, SHA-256, and SHA-512, making it an essential tool for verifying data integrity, creating checksums, or hashing sensitive information. It's fast, secure, and runs entirely in your browser.",
      explanation:
        "The tool takes your text, converts it into bytes, and then uses the browser's native Web Crypto API to generate a secure hash. The result is a fixed-length hexadecimal string that is unique to your input.",
      usageExamples: [
        "Creating a checksum to verify that a file has not been altered.",
        "Hashing a password before storing it in a database.",
        "Generating a unique key from a string of text.",
      ],
      underlyingConcept:
        "A cryptographic hash function is a one-way function that takes an input and produces a fixed-size string of bytes, known as the 'hash'. Good hash functions are designed to be fast, deterministic, and collision-resistant. SHA (Secure Hash Algorithm) is a family of widely-used cryptographic hash functions.",
      howToUse: [
        "Enter the text you want to hash in the input box.",
        "Select the hash algorithm you want to use (SHA-1, SHA-256, or SHA-512).",
        "Click 'Generate' to see the resulting hash in hexadecimal format.",
      ],
      features: [
        "Multiple Algorithms: Supports SHA-1, SHA-256, and SHA-512.",
        "Secure & Private: Uses the browser's Web Crypto API, so your data never leaves your machine.",
        "Instant Results: Generates hashes in real-time.",
        "Easy to Use: A simple interface for quick hash generation.",
      ],
      faqs: [
        {
          question: "Is SHA-1 still secure?",
          answer:
            "SHA-1 is considered insecure and should not be used for security purposes. It's included here for legacy use cases. For new applications, always use SHA-256 or SHA-512.",
        },
        {
          question: "Can this tool hash files?",
          answer:
            "This tool is designed for text only. Hashing large files requires a different approach to read the file in chunks.",
        },
        {
          question: "What does the hexadecimal output mean?",
          answer:
            "It's the standard way of representing the binary hash digest in a human-readable format.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Demystify your JSON Web Tokens. Our JWT Decoder instantly breaks down a JWT into its header and payload, displaying them in a clean, readable format. It's an essential tool for any developer or security analyst working with token-based authentication. Debug your tokens, inspect claims, and understand your auth flow with ease.",
      explanation:
        "A JWT consists of three parts separated by dots: the header, the payload, and the signature. This tool takes a JWT, Base64-decodes the first two parts, and then pretty-prints the resulting JSON. It does not and cannot verify the signature, as that requires your secret key.",
      usageExamples: [
        "Debugging an authentication token from an API.",
        "Inspecting the claims (like user ID or roles) inside a token.",
        "Verifying the structure of a JWT before implementing it in an application.",
      ],
      underlyingConcept:
        "JWT (JSON Web Token) is a compact, URL-safe standard (RFC 7519) for creating access tokens. The header contains metadata, and the payload contains 'claims' (statements about the user and token). The signature is used to verify that the token has not been tampered with.",
      howToUse: [
        "Paste your JWT into the input field.",
        "The decoded header and payload will appear instantly in separate, readable boxes.",
        "If the token is malformed, an error message will be displayed.",
      ],
      features: [
        "Real-Time Decoding: See the decoded header and payload as you type.",
        "Clear Separation: Displays the header and payload in distinct, easy-to-read panels.",
        "Pretty-Printed JSON: Automatically formats the JSON for readability.",
        "Error Detection: Instantly flags malformed tokens.",
      ],
      faqs: [
        {
          question: "Does this tool verify the signature?",
          answer:
            "No. Signature verification requires a secret key that should never be shared with a third-party tool. This decoder is for inspecting the public parts of the token only.",
        },
        {
          question: "Can it decode encrypted JWTs (JWE)?",
          answer:
            "No, this tool is for standard, Base64-encoded JWTs (JWS), not encrypted ones.",
        },
        {
          question: "What kind of information is in the payload?",
          answer:
            "The payload contains 'claims,' which are statements about the user and the token itself, such as the user's ID, roles, and the token's expiration time (`exp`).",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Stop wasting time manually searching for changes. Our Diff Checker instantly compares two blocks of text or code and highlights every difference, line by line. Whether you're reviewing a code change, comparing document versions, or checking for subtle edits, this tool helps you spot every modification in seconds.",
      explanation:
        "The tool uses a powerful diffing algorithm (similar to the one used in Git) to detect insertions, deletions, and modified lines between two texts. It then renders the results in a clean, side-by-side view, with additions highlighted in green and deletions in red.",
      usageExamples: [
        "A developer reviewing code changes before a merge.",
        "A writer comparing two drafts of an article to see what's changed.",
        "An editor checking for revisions in a document.",
      ],
      underlyingConcept:
        "Based on the principles of version control systems, a 'diff' (difference) algorithm calculates the minimal set of edits needed to transform one text into another. This allows for an efficient and accurate representation of changes.",
      howToUse: [
        "Paste the original text into the panel on the left.",
        "Paste the modified text into the panel on the right.",
        "The differences will be highlighted instantly.",
      ],
      features: [
        "Side-by-Side Comparison: A clear, intuitive view of the changes.",
        "Line-by-Line Highlighting: Instantly spot additions (green) and deletions (red).",
        "Real-Time Updates: The diff updates automatically as you edit.",
        "Essential for Collaboration: Perfect for developers, writers, and editors.",
      ],
      faqs: [
        {
          question: "Does it compare word by word?",
          answer:
            "Currently, it highlights differences on a line-by-line basis. Word-level highlighting is a planned future update.",
        },
        {
          question: "Can it handle large files?",
          answer:
            "It's optimized for typical code and text files. Extremely large files may be slower to process depending on your browser.",
        },
        {
          question: "Can I ignore whitespace changes?",
          answer:
            "This feature is not yet available but is on our roadmap for future improvements.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Unlock your data. Our CSV to JSON converter instantly transforms your comma-separated data into a clean, structured JSON array. It's the perfect tool for developers needing to import spreadsheet data into a web application, prepare data for an API, or simply switch between formats. No coding, no hassle—just instant, accurate conversion.",
      explanation:
        "The tool parses your CSV, automatically using the first row as headers for the JSON keys. It correctly handles quoted values and newlines, generating a well-formatted JSON array that's ready to be used in your code.",
      usageExamples: [
        "Importing data from a spreadsheet into a web application.",
        "Converting a database export into a format suitable for an API.",
        "Transforming CSV log files for data analysis.",
      ],
      underlyingConcept:
        "CSV is a tabular data format, while JSON is a hierarchical key-value format. This tool bridges the gap by converting each row of the CSV into a JSON object, with the column headers serving as the keys.",
      howToUse: [
        "Paste your CSV content into the input box.",
        "Click 'Convert' to instantly generate the JSON.",
        "Copy the JSON array or download it as a file.",
      ],
      features: [
        "Instant Conversion: Client-side processing for maximum speed.",
        "Smart Header Detection: Automatically uses the first row as JSON keys.",
        "Handles Standard CSV: Correctly parses quoted values and delimiters.",
        "Pretty-Printed Output: Generates clean, readable JSON.",
      ],
      faqs: [
        {
          question: "What if my CSV doesn't have a header row?",
          answer:
            "The tool will use the first row as headers by default. If you need to handle CSVs without headers, that's a great suggestion for a future feature!",
        },
        {
          question: "Does it handle commas inside quotes?",
          answer:
            "Yes, it correctly parses fields that contain commas, as long as they are properly quoted.",
        },
        {
          question: "Is there a file size limit?",
          answer:
            "Since the conversion happens in your browser, very large files may be limited by your browser's memory.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Easily transform your JSON data into a CSV file. Our JSON to CSV converter takes a JSON array and instantly turns it into a clean, well-formatted CSV, ready for Excel, Google Sheets, or any data analysis tool. It's the perfect way to export API data or JavaScript objects for reporting and analysis.",
      explanation:
        "The tool automatically detects the keys from the first object in your JSON array to create the CSV headers. It then flattens each object into a row, correctly quoting fields to handle commas and newlines.",
      usageExamples: [
        "Exporting the results of an API call to a CSV for a report.",
        "Converting a JavaScript array of objects into a spreadsheet.",
        "Migrating data from a JSON-based system to a CSV-based one.",
      ],
      underlyingConcept:
        "This tool performs the reverse of a CSV-to-JSON conversion. It takes a hierarchical data format (JSON) and flattens it into a tabular one (CSV), making it compatible with traditional spreadsheet applications.",
      howToUse: [
        "Paste your JSON array into the input box.",
        "The CSV will be generated instantly in the output area.",
        "Copy the CSV or download it as a file.",
      ],
      features: [
        "Automatic Header Detection: Creates CSV headers from the JSON keys.",
        "Smart Formatting: Correctly handles commas and newlines within your data.",
        "Instant Download: Download your CSV file with a single click.",
        "Client-Side & Secure: Your data is never sent to a server.",
      ],
      faqs: [
        {
          question: "What if the objects in my JSON array have different keys?",
          answer:
            "The tool will create a column for every unique key found in the array. If an object doesn't have a particular key, that field will be left empty in the CSV.",
        },
        {
          question: "Does it support nested JSON objects?",
          answer:
            "This tool works best with flat JSON arrays. Nested objects will be represented as `[object Object]`. For complex nested data, you may need to flatten your JSON first.",
        },
        {
          question: "What format is the downloaded file?",
          answer: "A standard, UTF-8 encoded `.csv` file.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Stop wrestling with incompatible file formats. Our Universal Data Converter is your all-in-one solution for instantly transforming data. Whether you have a CSV from a database export, an Excel sheet from a colleague, or pasted data, you can convert it into JSON for your web app, SQL for your database, an HTML table for a report, or many other formats. It's powerful, fast, and 100% private.",
      howToUse: [
        "Upload a CSV or Excel (.xlsx) file, or paste your raw CSV data into the text area.",
        "The tool instantly processes your input.",
        "Select your desired output format from the list: JSON, SQL, HTML, Markdown, and more.",
        "Configure advanced options if needed (like separators or table names).",
        "Click 'Download' to get your newly converted file.",
      ],
      features: [
        "Multi-Format Support: Convert from CSV or XLSX to JSON, SQL, HTML, Markdown, TSV, vCard, and more.",
        "Two-Way Conversion: Not just from CSV/XLSX, but also enables conversions like JSON to CSV.",
        "Intelligent Parsing: Automatically detects headers and handles various delimiters.",
        "Advanced Options: Fine-tune your output with options for separators, headers, and SQL table names.",
        "100% Browser-Based: Your data is never sent to a server. All conversions happen locally for maximum privacy and speed.",
        "Handles Large Files: Efficiently processes large datasets right in your browser.",
      ],
      explanation:
        "In a data-driven world, information rarely stays in one place or one format. A CSV file is great for spreadsheets, but a web application needs JSON. A data analyst might need SQL `INSERT` statements. This tool acts as a universal translator for your data, bridging the gap between different systems and requirements without needing complex software or command-line scripts.",
      usageExamples: [
        "A developer converting a client's Excel price list into a JSON object for an e-commerce site.",
        "A data analyst transforming a CSV export into SQL `INSERT` statements to populate a database.",
        "A project manager pasting tabular data and converting it to a Markdown table for a GitHub wiki.",
        "An office administrator converting a XLSX contact list into vCards for easy import into a phone.",
      ],
      faqs: [
        {
          question: "What is the largest file size you support?",
          answer:
            "Since all processing happens in your browser, the limit depends on your computer's memory and browser version. It's optimized for typical datasets but may slow down with extremely large files (hundreds of megabytes).",
        },
        {
          question: "Are my files and data secure?",
          answer:
            "Yes. Your data never leaves your computer. All conversions are done locally, ensuring your information remains 100% private.",
        },
        {
          question: "Can I convert from JSON to CSV?",
          answer:
            "This specific tool is optimized for converting *from* tabular data (CSV/XLSX) to other formats. For JSON to CSV, please use our dedicated 'JSON to CSV' converter.",
        },
        {
          question: "Does the tool retain my original file's styling?",
          answer:
            "No. The converter focuses on extracting and transforming the raw data. It does not preserve any styling, formulas, or formatting from Excel files.",
        },
      ],
      underlyingConcept:
        "This tool leverages powerful JavaScript libraries like SheetJS (for XLSX parsing) and custom data-structure mapping to transform data. It first converts any input into a standardized internal representation (an array of objects), and then serializes that representation into the target output format, whether it's a structured language like SQL or a markup format like HTML.",
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      tip: "Base64 is perfect for inlining small icons in CSS. It reduces HTTP requests, which can make your website load faster!",
      introduction:
        "Tired of managing countless small image files? Our Image to Base64 converter transforms any image into a single line of text that you can embed directly in your code. This is the secret to faster-loading websites, cleaner code, and easier-to-manage assets. Perfect for developers who want to inline small icons, logos, or background images.",
      explanation:
        "This tool reads your image file and uses the browser's FileReader API to create a Data URL. This URL includes the Base64-encoded version of your image, which can be used directly in web pages.",
      usageExamples: [
        "Embedding a logo directly into an email signature.",
        "Inlining small icons in a CSS file to reduce server requests.",
        "Storing image data within a JSON file for a web application.",
      ],
      underlyingConcept:
        "Data URLs (defined in RFC 2397) allow content to be embedded in web pages as if they were external resources. Base64 is the encoding scheme used to convert the binary image data into a text format that can be included in the URL.",
      howToUse: [
        "Drag and drop your image or click to upload.",
        "Instantly see a preview of your image on the left.",
        "The Base64 data URL will be generated automatically on the right.",
        "Click 'Copy' to grab the entire string and paste it into your HTML or CSS.",
      ],
      features: [
        "Supports All Major Formats: Works with PNG, JPEG, GIF, SVG, and more.",
        "Instant Preview: See your uploaded image immediately.",
        "Ready-to-Use Output: Generates a complete data URL for `src` attributes or CSS `url()`.",
        "Improves Performance: Reduces HTTP requests by inlining small images.",
        "100% Secure & Private: All conversions happen in your browser. Your images are never uploaded.",
      ],
      faqs: [
        {
          question: "Why should I use Data URLs?",
          answer:
            "They are great for small images because they eliminate the need for an extra server request, which can speed up page load times.",
        },
        {
          question: "Does this increase the file size?",
          answer:
            "Yes, Base64 encoding increases the size of the data by about 33%. It's best used for small images where the overhead is less than the cost of an HTTP request.",
        },
        {
          question: "Is it supported in all browsers?",
          answer:
            "Yes, Data URLs are supported by all modern web browsers.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Found a Base64 string embedded in code and wondering what it is? Our Base64 to Image converter instantly decodes it, revealing the hidden image. Preview the image directly in your browser and download it as a standard file. It's the perfect tool for extracting embedded assets from CSS, HTML, or API responses.",
      explanation:
        "The tool takes your Base64 Data URL and sets it as the `src` of an image element to generate a preview. It then creates a 'blob' from the data, which allows you to download it as a file.",
      usageExamples: [
        "Extracting an embedded image from a CSS file.",
        "Downloading an image from an email signature.",
        "Converting a Base64 image from an API response into a file.",
      ],
      underlyingConcept:
        "This tool performs the reverse of Base64 encoding. It parses the MIME type and Base64 data from the Data URL, converts the Base64 text back into binary data, and then renders that data as an image.",
      howToUse: [
        "Paste your Base64 data URL (it should start with `data:image/...`).",
        "The image will instantly appear in the preview box.",
        "Click the 'Download Image' button to save it to your device.",
      ],
      features: [
        "Instant Decoding: Renders an image preview from any valid Base64 string.",
        "Easy Download: Save the decoded image as a standard file (e.g., PNG, JPG).",
        "Smart Validation: Automatically detects if the string is a valid image data URL.",
        "Developer's Companion: An essential tool for working with APIs and web assets.",
      ],
      faqs: [
        {
          question: "What formats can it decode?",
          answer:
            "It can decode any image format that can be represented in a Data URL, like PNG, JPEG, GIF, or SVG.",
        },
        {
          question: "What if the string is invalid?",
          answer:
            "The tool will show an error message if the text you paste is not a valid image Data URL.",
        },
        {
          question: "What will the downloaded file be named?",
          answer:
            "It will be given a generic name like 'download.png'. You can rename it after you save it.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Stop guessing your CSS shadows and start designing them. Our visual Box Shadow Generator gives you an interactive playground to create the perfect shadow effect. Use simple sliders and color pickers to design complex, layered shadows, and get the production-ready CSS code instantly. It's the fastest way to add depth and polish to your UI.",
      explanation:
        "The tool dynamically builds a CSS `box-shadow` string by combining your inputs for horizontal/vertical offset, blur radius, spread radius, and color. This string is applied to a preview element in real-time, giving you instant feedback.",
      usageExamples: [
        "Designing modern, layered cards for a user interface.",
        "Adding a subtle, realistic depth to buttons and interactive elements.",
        "Creating trendy 'neumorphic' (soft UI) effects.",
      ],
      underlyingConcept:
        "The `box-shadow` CSS property is a powerful tool for creating depth in 2D. It allows you to apply one or more shadows to an element, each with its own position, blur, spread, and color. This generator simplifies the process of creating those layers.",
      howToUse: [
        "Use the sliders to adjust the Horizontal and Vertical Offsets.",
        "Control the softness of the shadow with the Blur slider.",
        "Increase or decrease the size of the shadow with the Spread slider.",
        "Choose a shadow color and adjust its opacity.",
        "Toggle 'Inset' to create an inner shadow for a 'pressed-in' effect.",
        "Copy the generated CSS code with a single click.",
      ],
      features: [
        "Live Visual Preview: See your shadow update in real-time.",
        "Full Control: Adjust offset, blur, spread, color, and opacity.",
        "Inset & Outset: Easily switch between inner and outer shadows.",
        "One-Click Copy: Grab the generated CSS rule instantly.",
      ],
      faqs: [
        {
          question: "Can I create multiple shadows on one element?",
          answer:
            "This version focuses on creating a single, perfect shadow layer. The ability to stack multiple shadows is planned for a future update.",
        },
        {
          question: "What units are used?",
          answer:
            "The generator uses pixels (`px`) for all length values, which is the most common unit for box shadows.",
        },
        {
          question: "Is this compatible with all browsers?",
          answer:
            "Yes, the `box-shadow` property is a standard part of CSS3 and is supported by all modern browsers.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Unleash your creativity with our intuitive CSS Gradient Generator. Effortlessly design stunning, professional-grade gradients for any project. Our visual editor provides a seamless experience, allowing you to choose from a vibrant spectrum of colors, fine-tune angles, and instantly switch between linear and radial styles. Whether you're crafting eye-catching backgrounds, creating dynamic buttons, or building breathtaking hero sections, our tool is the perfect companion for modern web design.",
      explanation:
        "Our CSS Gradient Generator simplifies the gradient creation process by providing a powerful and interactive interface. As you select and adjust colors, angles, and positions, the tool dynamically generates the corresponding CSS code in real-time. This immediate feedback loop allows you to experiment and iterate quickly, ensuring you achieve the perfect look for your design. The generator handles all the complex syntax, so you can focus on the creative aspect of your work.",
      usageExamples: [
        "Designing a vibrant, multi-toned background for a landing page to capture visitor attention.",
        "Creating subtle gradients for UI elements like cards and buttons to add depth and a modern feel.",
        "Building a dramatic, full-screen hero image with a gradient overlay for a powerful visual impact.",
        "Generating a consistent set of gradients for a design system or brand style guide.",
        "Experimenting with different color combinations and gradient types for design inspiration.",
      ],
      underlyingConcept:
        "CSS gradients are a powerful feature of modern web design, allowing for smooth and dynamic color transitions without the need for image files. Linear gradients progress along a straight line, which can be oriented at any angle. Radial gradients, on the other hand, emanate from a single point, creating circular or elliptical color spreads. Our tool leverages these native CSS capabilities to provide a flexible and powerful way to create a wide range of visual effects.",
      howToUse: [
        "Choose between Linear or Radial gradient type.",
        "For linear gradients, adjust the angle using the slider.",
        "For radial gradients, select the shape and position from the dropdowns.",
        "Click on the color stops to change colors.",
        'Click the "+" icon between color stops to add a new color.',
        "Adjust the position of each color stop with the slider.",
        "Use the presets for quick inspiration.",
        "Copy the generated CSS code from the output box.",
      ],
      features: [
        "Linear & Radial Gradients: Switch between gradient types with one click.",
        "Multi-Color Support: Add as many color stops as you need to create complex gradients.",
        "Full Control: Adjust angles, positions, and shapes for precise results.",
        "Live Preview: See your gradient come to life as you design it.",
        "Inspiring Presets: Get started quickly with a variety of pre-made gradients.",
        "Instant Code: Copy the generated CSS with a single click.",
      ],
      faqs: [
        {
          question: "How do I use the generated code?",
          answer:
            "Simply copy the code and apply it to the `background` or `background-image` property of any HTML element in your CSS.",
        },
        {
          question:
            "What's the difference between linear and radial gradients?",
          answer:
            "A linear gradient transitions colors along a straight line (at any angle). A radial gradient transitions colors outwards from a central point in a circle or ellipse.",
        },
        {
          question: "Can I animate these gradients?",
          answer:
            "While you can't directly animate the `background-gradient` property, a common technique is to create a larger gradient and animate its `background-position`. Our tool is a great starting point for creating the gradient you'll use in such an animation.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Go beyond simple rounded corners. Our Border Radius Generator gives you precise, individual control over each corner of an element, allowing you to create everything from subtle curves to unique, organic shapes. It's the perfect tool for designing modern cards, buttons, and other UI elements.",
      explanation:
        "The tool maps the slider values to the `border-radius` CSS property. When you control the corners individually, it uses the long-form syntax (`border-top-left-radius`, etc.) to give you granular control.",
      usageExamples: [
        "Designing modern, friendly-looking cards and containers.",
        "Creating pill-shaped buttons and tags.",
        "Building organic, 'blob'-like shapes for visual interest.",
      ],
      underlyingConcept:
        "The `border-radius` property in CSS can accept one, two, three, or four values to control the rounding of the top-left, top-right, bottom-right, and bottom-left corners respectively. This tool provides a visual interface for that control.",
      howToUse: [
        "Use the 'All Corners' slider for a uniform radius.",
        "Uncheck 'Link all corners' to control each corner individually.",
        "Switch between `px` and `%` units for different effects.",
        "Watch the live preview update as you adjust the sliders.",
        "Copy the generated CSS code with one click.",
      ],
      features: [
        "Individual Corner Control: Fine-tune each corner separately.",
        "Uniform Radius Option: Link all corners for quick, uniform rounding.",
        "Pixel & Percent Units: Switch between absolute and relative units.",
        "Real-Time Visual Preview: See your shape come to life instantly.",
        "Instant Code: Get clean, production-ready CSS.",
      ],
      faqs: [
        {
          question: "Can I create a circle?",
          answer:
            "Yes! Just set the `border-radius` to `50%` on a square element.",
        },
        {
          question: "How do I make a pill shape?",
          answer:
            "Use a large radius value (like 9999px) on a rectangular element.",
        },
        {
          question: "Is this performant?",
          answer:
            "Yes, `border-radius` is a highly optimized CSS property and is very performant.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Make your text pop. Our Text Shadow Generator lets you visually design the perfect shadow effect for your typography. Control the position, blur, color, and opacity to create everything from subtle, readable depth to dramatic, glowing effects. It's the easiest way to add a professional touch to your headings and titles.",
      explanation:
        "The tool combines your inputs for X/Y offsets, blur radius, and color into a valid CSS `text-shadow` property. The preview text is updated in real-time, giving you instant feedback on your design.",
      usageExamples: [
        "Adding a subtle drop shadow to a heading to make it stand out from the background.",
        "Creating a 'glowing' text effect with a blurred, colored shadow.",
        "Designing a retro, 3D text effect with a hard, offset shadow.",
      ],
      underlyingConcept:
        "The `text-shadow` CSS property applies a shadow directly to the text characters of an element. It's defined by a horizontal offset, a vertical offset, an optional blur radius, and a color.",
      howToUse: [
        "Adjust the horizontal and vertical offset sliders to position the shadow.",
        "Use the blur radius slider to control the softness of the shadow.",
        "Choose a shadow color and set its opacity.",
        "Customize the text and background colors to match your design.",
        "Copy the generated CSS code with a single click.",
      ],
      features: [
        "Precise Control: Fine-tune the shadow's position and blur.",
        "Color & Opacity: Use any color and control its transparency.",
        "Customizable Preview: See how the shadow looks on your text and background colors.",
        "Real-Time Feedback: Watch the preview update instantly.",
        "Instant Code: Get a clean CSS rule ready to paste into your project.",
      ],
      faqs: [
        {
          question: "Can I create multiple shadows?",
          answer:
            "This version focuses on creating a single shadow layer. The ability to stack multiple shadows (by separating them with commas) is planned for a future update.",
        },
        {
          question: "Is this supported by all browsers?",
          answer:
            "Yes, `text-shadow` is a standard CSS property with excellent support across all modern browsers.",
        },
        {
          question: "Is this performant?",
          answer:
            "Yes, `text-shadow` is highly optimized by modern browsers and is very performant.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Step into the future of UI design. Our generator makes it easy to create two of the most popular modern design trends: Glassmorphism (a frosted-glass effect) and Neumorphism (a soft, extruded plastic look). Use our simple controls to design beautiful, contemporary UI elements and get the CSS code in seconds.",
      explanation:
        "Glassmorphism is achieved using the `backdrop-filter` property to blur the background, combined with transparency. Neumorphism uses a clever combination of two `box-shadow` values (one light, one dark) to create the illusion of a soft, extruded surface.",
      usageExamples: [
        "Designing a sleek, frosted-glass navigation bar or sidebar.",
        "Creating a modern dashboard with glassmorphic cards.",
        "Building a soft, tactile interface with neumorphic buttons and controls.",
      ],
      underlyingConcept:
        "Glassmorphism creates a sense of depth and hierarchy by mimicking frosted glass. Neumorphism (or 'soft UI') aims for a more realistic, physical look by playing with light and shadow to make elements appear as if they are part of the background.",
      howToUse: [
        "Choose between the 'Glassmorphism' or 'Neumorphism' style.",
        "For Glassmorphism, adjust the blur and opacity to get the perfect frosted look.",
        "For Neumorphism, pick a background color and then fine-tune the shadow properties.",
        "Watch the live preview update in real-time.",
        "Copy the generated CSS code with a single click.",
      ],
      features: [
        "Two Modern Styles: Create both Glassmorphism and Neumorphism effects.",
        "Full Control: Adjust all the necessary parameters for each style.",
        "Live Visual Preview: See your design on a sample background.",
        "Instant Code: Get clean, production-ready CSS.",
        "Helpful Tips: Includes guidance on how to best use these effects.",
      ],
      faqs: [
        {
          question: "Is Glassmorphism supported everywhere?",
          answer:
            "The `backdrop-filter` property is supported by all modern browsers, but not by Internet Explorer. It's a good idea to provide a fallback background color.",
        },
        {
          question: "Is Neumorphism accessible?",
          answer:
            "It can be challenging. Because it relies on subtle shadows, it's crucial to ensure you have enough contrast for your text and borders to be readable for everyone.",
        },
        {
          question: "Is this performant?",
          answer:
            "The `backdrop-filter` used in Glassmorphism can be resource-intensive. Use it sparingly for the best performance. Neumorphism is generally very performant.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Find the perfect color scheme in seconds. Our Color Palette Generator takes your base color and instantly creates a harmonious palette based on classic color theory. Whether you need a subtle monochromatic look or a bold complementary scheme, this tool provides the inspiration you need for your next design project.",
      explanation:
        "The tool uses the HSL (Hue, Saturation, Lightness) color model. Based on the scheme you choose, it calculates new colors by adjusting the hue, saturation, or lightness of your base color. For example, a complementary color is found by rotating the hue by 180 degrees.",
      usageExamples: [
        "A designer creating a color scheme for a new website.",
        "A marketer developing a consistent color palette for a brand.",
        "An artist looking for inspiration for a new piece.",
      ],
      underlyingConcept:
        "Color theory provides a set of guidelines for creating harmonious color combinations. Schemes like 'analogous' (colors next to each other on the color wheel) and 'complementary' (colors opposite each other) are proven to be aesthetically pleasing.",
      howToUse: [
        "Pick your starting color using the color picker or by entering a HEX code.",
        "Choose the type of color scheme you want from the dropdown menu.",
        "The tool will instantly generate a 5-color palette.",
        "Click on any color's HEX code to copy it to your clipboard.",
      ],
      features: [
        "Multiple Schemes: Generates Monochromatic, Analogous, Complementary, and Triadic palettes.",
        "Custom Base Color: Start from any color you like.",
        "Visual Preview: See your generated color scheme instantly.",
        "One-Click Copy: Easily copy the HEX codes for use in your designs.",
      ],
      faqs: [
        {
          question: "Can I get more than 5 colors?",
          answer:
            "This version generates a standard 5-color palette. The ability to customize the number of colors is planned for a future update.",
        },
        {
          question: "Does this check for accessibility?",
          answer:
            "No, this tool focuses on creating harmonious color schemes. You should always use a separate contrast checker to ensure your text is readable.",
        },
        {
          question: "Can I export the palette?",
          answer:
            "Currently, you can copy the individual HEX codes. A full palette export feature may be added in the future.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    },
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
    details: {
      introduction:
        "Visually design your next color palette with our interactive Color Wheel. Drag the picker to find your perfect base color, then choose from a variety of classic color harmony rules—like complementary, triadic, or analogous—to instantly generate a full theme. It's the most intuitive way to create beautiful, balanced color schemes for your UI, brand, or artwork.",
      howToUse: [
        "Drag the picker on the color wheel to select your base hue and saturation.",
        "Use the Lightness slider to fine-tune the brightness.",
        "Select a color harmony rule (like 'Triad' or 'Analogous') from the dropdown.",
        "Your full color palette will be generated instantly.",
        "Copy individual HEX codes, or export the entire palette as CSS variables or JSON.",
      ],
      features: [
        "Interactive Color Wheel: An intuitive way to explore hues and saturation.",
        "Classic Color Harmonies: Generate palettes with Monochromatic, Analogous, Complementary, Triadic, and more.",
        "Live Swatch Preview: See your full color palette update in real-time.",
        "Export for Devs: One-click export to CSS variables or JSON for easy integration.",
        "100% Private: All calculations happen in your browser.",
      ],
      privacy: PRIVACY_STATEMENT,
      explanation:
        "The tool maps the position of the picker on the wheel to HSL (Hue, Saturation, Lightness) values. The angle corresponds to the hue (0-360°), and the distance from the center corresponds to the saturation (0-100%). The different color harmony rules are then applied by mathematically rotating the hue on the wheel.",
      usageExamples: [
        "A UI designer building a theme for a new app by starting with a brand color and finding complementary accents.",
        "A developer exporting a full color palette as CSS variables to quickly theme a website.",
        "An artist exploring triadic color schemes for a new illustration.",
      ],
      underlyingConcept:
        "Color harmony is based on the idea that certain combinations of colors, based on their position on a color wheel, are inherently pleasing. This tool automates the mathematical relationships (like 180° for complementary colors) to make applying color theory simple and fast.",
      faqs: [
        {
          question: "Can I save my palettes?",
          answer:
            "Currently, you can export the palette as code. A feature to save palettes to your account may be added in the future.",
        },
        {
          question: "Does this support transparency (alpha)?",
          answer:
            "This tool focuses on generating solid colors. For transparency, you can use our Color Code Converter to add an alpha channel to your chosen HEX codes.",
        },
        {
          question: "Is the color wheel perceptually uniform?",
          answer:
            "No, it uses the standard HSL color model, which is great for intuitive design but is not perceptually uniform (meaning changes in value don't always correspond to how we perceive changes in brightness).",
        },
      ],
    },
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
    details: {
      introduction:
        "Stop juggling different color formats. Our CSS Color Code Converter is the only tool you need to instantly translate any color between HEX, RGB, and HSL. It fully supports alpha channels (transparency) and even recognizes CSS color names. It's the perfect companion for any developer or designer working on the web.",
      howToUse: [
        "Enter a color in any of the formats (HEX, RGB, or HSL).",
        "All other formats will update instantly in real-time.",
        "Use the alpha slider to adjust the transparency.",
        "You can also type a CSS color name (like 'tomato') and click 'Resolve'.",
        "Click the 'Copy' button next to any format to grab the code.",
      ],
      features: [
        "Two-Way Sync: Edit any format, and all others update instantly.",
        "Full Alpha Support: Works with HEXA, RGBA, and HSLA for transparency.",
        "CSS Color Name Resolver: Converts names like 'rebeccapurple' to their codes.",
        "Live Preview: See your color with its current transparency.",
        "Error-Proof: Validates your input and provides clear error messages.",
      ],
      privacy: PRIVACY_STATEMENT,
      explanation:
        "The converter takes your input, normalizes it into an RGBA (Red, Green, Blue, Alpha) format, and then uses standard color space formulas to calculate the equivalent values for HEX, HSL, and other formats. For CSS color names, it cleverly uses the browser to compute the exact RGB value.",
      usageExamples: [
        "A developer converting a HEX color from a design file into RGBA to add transparency.",
        "A designer taking an HSL color and converting it to HEX for use in a style guide.",
        "Quickly finding the HEX code for a standard CSS color name like 'cornflowerblue'.",
      ],
      underlyingConcept:
        "RGB, HSL, and HEX are different ways to represent colors in a digital space. RGB is based on mixing red, green, and blue light. HSL is a more intuitive model based on hue, saturation, and lightness. HEX is just a compact, hexadecimal representation of RGB. This tool provides the math to switch between them.",
      faqs: [
        {
          question: "Does it support short HEX codes like #F0C?",
          answer:
            "Yes, it supports 3-digit (e.g., #F0C) and 4-digit (e.g., #F0C8) shorthand HEX codes and will convert them correctly.",
        },
        {
          question: "What are CSS color keywords?",
          answer:
            "They are a set of 140+ standard color names (like 'tomato', 'skyblue', 'gold') that are built into CSS. Our tool can convert these names to their corresponding codes.",
        },
        {
          question: "Is my data private?",
          answer:
            "Yes, all conversions happen locally in your browser. No data is ever sent to a server.",
        },
      ],
    },
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
    details: { introduction: "Compress video files easily.", howToUse: ["Upload video", "Click compress", "Download"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "video-to-audio-converter",
    name: "Video to Audio Converter",
    description: "Extract audio tracks from video files as MP3.",
    icon: <VideoToAudioIcon />,
    component: VideoToAudioConverter,
    category: ToolCategory.VIDEO,
    details: { introduction: "Convert video to audio.", howToUse: ["Upload video", "Convert", "Download MP3"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "gif-maker",
    name: "GIF Maker",
    description: "Convert video clips into animated GIFs.",
    icon: <GifMakerIcon />,
    component: GifMaker,
    category: ToolCategory.VIDEO,
    details: { introduction: "Create GIFs from video.", howToUse: ["Upload video", "Create GIF", "Download"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "trim-video",
    name: "Trim Video",
    description: "Cut and trim video files to desired length.",
    icon: <TrimVideoIcon />,
    component: TrimVideo,
    category: ToolCategory.VIDEO,
    details: { introduction: "Trim video clips.", howToUse: ["Upload video", "Set start/end", "Trim"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "format-converter",
    name: "Video Format Converter",
    description: "Convert videos between different formats like MP4, AVI, MOV.",
    icon: <FormatConverterIcon />,
    component: FormatConverter,
    category: ToolCategory.VIDEO,
    details: { introduction: "Convert video formats.", howToUse: ["Upload video", "Select format", "Convert"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "video-thumbnail-extractor",
    name: "Video Thumbnail Extractor",
    description: "Extract image thumbnails from specific timestamps in a video.",
    icon: <VideoThumbnailIcon />,
    component: VideoThumbnailExtractor,
    category: ToolCategory.VIDEO,
    details: { introduction: "Extract thumbnails from video.", howToUse: ["Upload video", "Set time", "Extract"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "video-mute",
    name: "Mute Video",
    description: "Remove audio track from a video file.",
    icon: <VideoMuteIcon />,
    component: VideoMute,
    category: ToolCategory.VIDEO,
    details: { introduction: "Remove audio from video.", howToUse: ["Upload video", "Mute", "Download"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "watermark-adder",
    name: "Watermark Adder",
    description: "Add image or text watermarks to your photos.",
    icon: <WatermarkAdderIcon />,
    component: WatermarkAdder,
    category: ToolCategory.IMAGE,
    details: { introduction: "Add watermark to images.", howToUse: ["Upload image", "Upload watermark", "Apply"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images by dimensions or percentage.",
    icon: <ImageResizerIcon />,
    component: ImageResizer,
    category: ToolCategory.IMAGE,
    details: { introduction: "Resize images.", howToUse: ["Upload image", "Set size", "Download"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "image-converter",
    name: "Image Converter",
    description: "Convert images between formats like PNG, JPG, WEBP.",
    icon: <ImageConverterIcon />,
    component: ImageConverter,
    category: ToolCategory.IMAGE,
    details: { introduction: "Convert image formats.", howToUse: ["Upload image", "Select format", "Convert"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Compress images to reduce file size while maintaining quality.",
    icon: <ImageCompressorIcon />,
    component: ImageCompressor,
    category: ToolCategory.IMAGE,
    details: { introduction: "Compress images.", howToUse: ["Upload image", "Set quality", "Compress"], features: [], privacy: PRIVACY_STATEMENT, explanation: "", usageExamples: [], underlyingConcept: "", faqs: [] }
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
    details: {
      introduction:
        "Capture your thoughts and organize your day. Our To-Do List is a clean, simple, and persistent tool to help you keep track of your tasks. Add items, mark them as complete, and filter your view to stay focused. Your list is automatically saved in your browser, so it's always here when you need it.",
      explanation:
        "The tool uses your browser's local storage (LocalStorage) to save your task list directly on your device. This means your data persists even if you close the tab or restart your browser, but it is never sent to any external server.",
      usageExamples: [
        "Keeping a daily task list.",
        "Tracking a shopping list.",
        "Managing a mini-project's steps.",
      ],
      underlyingConcept:
        "LocalStorage is a web storage API that allows JavaScript sites and apps to store key/value pairs in a web browser with no expiration date.",
      howToUse: [
        "Type a task in the input box and press Enter or click 'Add'.",
        "Click the checkbox to mark a task as complete.",
        "Use the filter buttons (All, Active, Completed) to change your view.",
        "Click the trash icon to delete a task.",
      ],
      features: [
        "Persistent Storage: Tasks are saved automatically.",
        "Filter Views: Easily see active or completed tasks.",
        "Clean Design: No distractions, just your list.",
      ],
      faqs: [
        {
          question: "Will I lose my tasks if I close the browser?",
          answer: "No, they are saved in LocalStorage and will be there when you come back.",
        },
        {
          question: "Can I sync this with other devices?",
          answer: "No, the data is stored locally on this specific device and browser.",
        },
      ],
      privacy: PRIVACY_STATEMENT,
    }
  }
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
  [ToolCategory.TEXT]: 'text',
  [ToolCategory.IMAGE]: 'image',
  [ToolCategory.CSS]: 'css',
  [ToolCategory.CODING]: 'coding',
  [ToolCategory.COLOR]: 'color',
  [ToolCategory.MATH]: 'calculator',
  [ToolCategory.PRODUCTIVITY]: 'productivity',
  [ToolCategory.FUN]: 'fun',
  [ToolCategory.VIDEO]: 'video',
  [ToolCategory.MISC]: 'other',
};

export const URL_TO_CATEGORY_MAP: Record<string, ToolCategory> = Object.entries(CATEGORY_URL_MAP).reduce((acc, [key, value]) => {
  acc[value] = key as ToolCategory;
  return acc;
}, {} as Record<string, ToolCategory>);

export const CATEGORY_ICONS: Record<ToolCategory, React.ComponentType<{ className?: string }>> = {
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

export const CATEGORY_CONTENT: Record<ToolCategory, { introduction: string }> = {
  [ToolCategory.TEXT]: { introduction: "A collection of tools for text manipulation." },
  [ToolCategory.IMAGE]: { introduction: "Tools for working with images." },
  [ToolCategory.CSS]: { introduction: "Generators for CSS styles." },
  [ToolCategory.CODING]: { introduction: "Format, validate, and convert code." },
  [ToolCategory.COLOR]: { introduction: "Generate palettes and convert colors." },
  [ToolCategory.MATH]: { introduction: "Perform calculations and conversions." },
  [ToolCategory.PRODUCTIVITY]: { introduction: "Boost your efficiency with these tools." },
  [ToolCategory.FUN]: { introduction: "Have some fun with these generators." },
  [ToolCategory.VIDEO]: { introduction: "Edit and convert video files." },
  [ToolCategory.MISC]: { introduction: "Various useful tools." },
};
