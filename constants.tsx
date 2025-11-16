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
import CsvToXlsx from "@/tools/CsvToXlsx";
import XlsxToCsv from "@/tools/XlsxToCsv";
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
} from "@/components/icons";

const PRIVACY_STATEMENT =
  "All calculations and data processing for this tool are performed locally in your browser. We do not send any of your data to our servers, ensuring your information remains private and secure.";

export const TOOLS: Tool[] = [
  // Text Tools
  {
    id: "keyword-density-analyzer",
    name: "Keyword Density Analyzer",
    description:
      "Analyze keyword frequency, density, and phrase patterns to optimize your SEO content and improve search rankings.",
    seoTitle:
      "Free Keyword Density Analyzer Tool | Check Keyword Frequency & SEO Optimization",
    seoDescription:
      "Use our free Keyword Density Analyzer to check keyword frequency, keyword percentage, and on-page SEO strength. Perfect for bloggers, marketers and content creators. 100% private, no signup required.",
    icon: <KeywordDensityIcon />,
    component: KeywordDensityAnalyzer,
    category: ToolCategory.TEXT,

    keywords: [
      "keyword density analyzer",
      "keyword density checker",
      "seo keyword tool",
      "keyword frequency checker",
      "content optimization tool",
      "on-page SEO analyzer",
      "long-tail keyword analysis",
      "SEO content checker",
      "keyword percentage checker",
    ],

    details: {
      introduction:
        "Boost your search engine rankings with our advanced Keyword Density Analyzer — a powerful SEO analysis tool built for content creators, bloggers, marketers, and SEO professionals. This tool scans your text to detect keyword frequency, keyword density percentage, and high-value long-tail phrases. With real-time insights, you can optimize blog posts, landing pages, product descriptions, and website copy without overstuffing keywords. Maintain natural readability while improving Google visibility and overall SEO performance.",

      howToUse: [
        "Paste your full content (blog post, article, website copy, or product description) into the input box.",
        "The tool instantly analyzes keyword frequency, single words, and 2-3 word phrase combinations.",
        "Explore the results table showing keyword count, occurrences, and exact density percentage.",
        "Enable or disable stop-word filtering to refine key phrases and remove non-important filler words.",
        "Sort your results by keyword density, frequency, or alphabetical order to identify strong SEO terms.",
        "Copy or export the keyword report to use it for SEO audits, content rewrites, or competitor analysis.",
      ],

      features: [
        "Instant keyword density analysis for single keywords and multi-word phrases.",
        "Accurate keyword percentage calculation to avoid over-optimization and keyword stuffing.",
        "Smart stop-word filtering to focus on meaningful search keywords.",
        "Sortable keyword table for quick insights and SEO prioritization.",
        "Optimized for long-tail keyword research to strengthen organic search performance.",
        "100% privacy — analysis is processed locally in your browser, never stored or uploaded.",
      ],

      privacy: PRIVACY_STATEMENT,

      explanation:
        "Keyword density refers to how often a keyword appears within your content relative to the total word count. Maintaining a balanced keyword density (usually 1–2% for primary keywords) helps avoid SEO penalties and ensures natural readability. Our tool uses NLP-based text processing to tokenize words, detect n-grams, and calculate density using the formula (keyword occurrences / total words) × 100. By analyzing both single and multi-word phrases, the tool helps you optimize for search intent, long-tail keywords, and user engagement — essential factors for modern on-page SEO.",

      usageExamples: [
        'Optimizing a blog post for keywords like "best digital marketing tools" or "SEO tips for beginners."',
        "Analyzing competitor articles to discover their keyword density strategies and ranking phrases.",
        "Improving e-commerce product descriptions by inserting relevant search terms naturally.",
        "Performing an SEO audit on old content to increase keyword clarity and ranking potential.",
        "Creating SEO reports for clients with before-and-after keyword density improvement data.",
      ],

      faqs: [
        {
          question: "What is the recommended keyword density for SEO?",
          answer:
            "Most SEO experts recommend keeping primary keyword density around 1–2%. Our tool helps you stay within this range for clean, natural, optimized content.",
        },
        {
          question: "Does the tool support multiple languages?",
          answer:
            "Yes, the analyzer works with all languages. Stop-word filtering is optimized for English, but you can switch it off for accurate multilingual results.",
        },
        {
          question: "Can this tool analyze long articles?",
          answer:
            "Absolutely! It supports documents up to 100,000 words. For extremely long content, breaking it into sections can give more detailed insights.",
        },
        {
          question: "How does stop-word removal help?",
          answer:
            'Stop-word removal filters out common words like "the", "is", "and", helping you focus on meaningful SEO-rich keywords and phrases.',
        },
        {
          question: "Is my text saved anywhere?",
          answer:
            "No. Everything is processed locally in your browser. Your content is never uploaded, stored, or shared.",
        },
      ],

      underlyingConcept:
        "This tool uses text mining and natural language processing to break down content into tokens and extract meaningful keywords. It identifies n-grams, eliminates stop-words, and measures keyword prominence using classical IR techniques. Inspired by TF-IDF and vector-space models, it offers actionable SEO insights to improve keyword targeting, content clarity, topic relevance, and long-tail search optimization.",
    },
  },

  {
    id: "readability-score-calculator",
    name: "Readability Score Calculator",
    description:
      "Analyze text complexity and calculate Flesch-Kincaid and other readability scores to improve content clarity and accessibility.",
    seoTitle:
      "Free Readability Score Calculator | Flesch-Kincaid Grade Level & Reading Ease Checker",
    seoDescription:
      "Check the readability of your text with our free Readability Score Calculator. Instantly get Flesch Reading Ease, Flesch-Kincaid Grade Level, word stats, and writing clarity insights. 100% private and secure — no data stored.",
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
    ],

    details: {
      introduction:
        "Improve the clarity, accessibility, and overall quality of your writing with our Readability Score Calculator. This tool evaluates your text using industry-standard metrics like Flesch Reading Ease and Flesch-Kincaid Grade Level, helping you understand how simple or complex your content is for readers. Whether you're crafting blog posts, documentation, academic content, or marketing copy, this tool gives you instant feedback to ensure your writing matches your audience’s reading level.",

      howToUse: [
        "Paste or type your text into the input field.",
        "The tool automatically analyzes your writing in real time.",
        "View detailed stats including word count, sentence count, syllable count, and average sentence length.",
        "Review your Flesch Reading Ease score and the estimated U.S. grade level to gauge content difficulty.",
        "Adjust your writing accordingly and re-check until the readability matches your target audience.",
      ],

      features: [
        "Instant calculation of Flesch Reading Ease score and Flesch-Kincaid Grade Level.",
        "Detailed text statistics: total words, sentences, syllables, average sentence length, and more.",
        "Helps you create accessible, easy-to-read content for all audiences.",
        "Ideal for SEO writers, bloggers, educators, marketers, and UX copywriters.",
        "Fully private — text is processed locally in your browser.",
      ],

      privacy: PRIVACY_STATEMENT,

      explanation:
        "Readability scores help measure how easy or difficult a piece of writing is to understand. These formulas analyze two major factors: sentence length (a proxy for structural complexity) and word complexity (often measured using syllables). The Flesch Reading Ease score ranges from 0–100, with higher scores indicating easier reading. The Flesch-Kincaid Grade Level translates text difficulty into a U.S. school grade level, making it straightforward to ensure your writing suits your intended audience. These metrics are widely used in education, marketing, technical writing, and UX content strategy.",

      usageExamples: [
        "A blogger checks if their article is simple enough for a general audience.",
        "A technical writer reduces jargon and improves documentation structure.",
        "A teacher evaluates whether reading material is appropriate for student grade levels.",
        "A marketer ensures landing page copy is easy to read and increases conversions.",
        "A UX writer verifies that microcopy and instructions are accessible to all users.",
      ],

      underlyingConcept:
        "The tool uses two well-established readability formulas. The Flesch Reading Ease formula: 206.835 - 1.015 × (Total Words ÷ Total Sentences) - 84.6 × (Total Syllables ÷ Total Words). The Flesch-Kincaid Grade Level formula: 0.39 × (Total Words ÷ Total Sentences) + 11.8 × (Total Syllables ÷ Total Words) - 15.59. By calculating word count, sentence count, and syllable count, the tool provides accurate readability insights that help writers improve clarity and audience alignment.",

      faqs: [
        {
          question: "What is a good Flesch Reading Ease score?",
          answer:
            "A score between 60 and 70 is ideal for most general-audience content. It’s clear, easy to understand, and suitable for ages 13–15.",
        },
        {
          question: "Does a higher grade level mean better writing?",
          answer:
            "Not necessarily. A higher grade level indicates more complexity, not better quality. The best grade level depends on your audience — for general readers, 7th–9th grade is usually recommended.",
        },
        {
          question: "Is my text stored or shared?",
          answer:
            "No. All processing happens locally on your device. Your text never leaves your browser.",
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
    "Free Loan Calculator | Monthly Payment Estimator & Full Amortization Schedule",
  seoDescription:
    "Use our free Loan Calculator to estimate monthly payments, total interest, and full amortization schedules for mortgages, car loans, personal loans, and more. Fast, accurate, and 100% private.",

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
    "loan repayment schedule"
  ],

  details: {
    introduction:
      "Understand your loan costs with our advanced Loan Calculator. Whether you're comparing mortgage options, planning a car loan, reviewing student loans, or evaluating business financing, this tool gives you a complete financial breakdown. Simply enter the loan amount, interest rate, and term to instantly see your monthly payment, total interest paid, total loan cost, and a full amortization schedule showing how your balance decreases month by month.",

    howToUse: [
      "Enter the Loan Amount you plan to borrow.",
      "Input the annual Interest Rate (e.g., enter 5 for 5%).",
      "Select your Loan Term in years or months.",
      "The calculator instantly shows your monthly payment, total interest, and total repayment amount.",
      "Scroll down to view the complete amortization schedule with month-by-month interest and principal breakdowns.",
      "Adjust values anytime to compare different loan scenarios and choose the best option."
    ],

    features: [
      "Accurate monthly payment calculation for fixed-rate loans.",
      "Detailed amortization schedule showing interest vs. principal for every payment.",
      "Breakdown of total loan cost, including total interest paid.",
      "Supports flexible loan terms (years or months).",
      "Instant recalculations for quick loan comparison.",
      "Private and secure — all calculations happen in your browser."
    ],

    privacy: PRIVACY_STATEMENT,

    explanation:
      "An amortization schedule shows how a fixed-rate loan is repaid over time. Each payment includes both interest and principal. Early in the loan, payments mostly cover interest because the balance is high. Over time, more of your payment applies to principal, helping you pay down the loan faster. This calculator applies the standard fixed-rate loan payment formula, giving you an accurate breakdown of monthly payments and overall loan cost so you can make smarter financial decisions.",

    usageExamples: [
      "A homebuyer estimates monthly mortgage payments and compares loan terms.",
      "A car buyer calculates total interest before choosing financing options.",
      "A student evaluates repayment plans for an education loan.",
      "A small business owner forecasts loan costs for business expansion.",
      "Anyone refinancing a loan can compare new interest rates and shorter terms."
    ],

    underlyingConcept:
      "The calculator uses the standard amortizing loan formula: M = P × [r(1+r)^n] / [(1+r)^n − 1]. Here, M is the monthly payment, P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments. Each month, interest is calculated as (remaining balance × r), and the principal portion is the difference between the payment and interest. By iterating this process, the full amortization schedule is generated.",

    faqs: [
      {
        question: "Why do most early payments go toward interest?",
        answer:
          "Because interest is calculated on the remaining loan balance. At the beginning of a loan, your balance is highest, so the interest portion is also highest. As the balance decreases, interest charges shrink."
      },
      {
        question: "How can I reduce the total interest I pay?",
        answer:
          "You can lower your interest cost by securing a lower interest rate, choosing a shorter loan term, or making extra payments directly toward the principal."
      },
      {
        question: "Does this calculator work for mortgages, car loans, and personal loans?",
        answer:
          "Yes. Any fixed-rate installment loan can be calculated accurately using this tool."
      }
    ]
  }
}
,
  {
  id: "timezone-converter",
  name: "Time Zone Converter",
  description:
    "Instantly convert any date and time between global time zones with precise, real-time accuracy.",
  seoTitle:
    "Free Time Zone Converter | Convert Time Between Cities & Countries Instantly",
  seoDescription:
    "Easily convert time across world time zones with our free Time Zone Converter. Perfect for scheduling global meetings, travel planning, and international coordination. Fast, accurate, and 100% private.",
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
    "utc time converter"
  ],

  details: {
    introduction:
      "Stay perfectly in sync with the world using the Time Zone Converter. Whether you're coordinating global meetings, planning international travel, or simply checking the local time across continents, this tool gives you instant and accurate timezone conversions. No more confusion or guessing — see exactly what time it will be anywhere on the planet with clear, side-by-side results.",

    howToUse: [
      "Select the date and time you want to convert.",
      "Choose your 'From' timezone and your target 'To' timezone using the dropdown lists.",
      "The converted date and time will appear instantly for both locations.",
      "Check the displayed hour difference between the two zones for context.",
      "Use the swap button to quickly reverse the conversion directions.",
      "Adjust time or date anytime to explore different scenarios."
    ],

    features: [
      "Instant, real-time conversion between any two global time zones.",
      "Side-by-side display for easy comparison.",
      "Accurate hour and day differences, including automatic DST adjustments.",
      "Clean, searchable IANA timezone list grouped by region and city.",
      "Correct day-of-week display for future or past conversions.",
      "Swap button to quickly flip 'From' and 'To' zones.",
      "Completely private — calculations happen entirely in your browser."
    ],

    privacy: PRIVACY_STATEMENT,

    explanation:
      "The converter uses the browser’s Internationalization API (Intl) to ensure precise timezone handling. By creating a date object from your input and formatting it separately for each selected timezone, the tool automatically adapts to all regional rules, including Daylight Saving Time. This ensures reliable conversions without relying on external servers or APIs.",

    usageExamples: [
      "A project manager schedules a cross-continent meeting by checking overlapping work hours.",
      "A traveler adjusts their itinerary by previewing local arrival times.",
      "A remote team member checks teammates’ local times before messaging.",
      "Someone sends birthday wishes exactly at midnight in a friend’s timezone."
    ],

    underlyingConcept:
      "Using `Intl.DateTimeFormat`, the tool interprets a single date object through different IANA timezones such as 'America/New_York' or 'Asia/Tokyo'. This allows the same UTC timestamp to be rendered correctly for any region. By formatting both sides independently, the tool accurately reflects offsets, DST rules, and date boundaries.",

    faqs: [
      {
        question: "What are IANA timezones?",
        answer:
          "IANA timezones are standardized regional identifiers like 'Asia/Kolkata' or 'America/Chicago'. They follow global time regulations and DST rules, making them ideal for accurate conversions."
      },
      {
        question: "Why does the converted time sometimes show a different day?",
        answer:
          "Large timezone differences can cross over midnight, causing the converted time to fall on the next or previous day. For instance, evening in one country might already be morning the next day elsewhere."
      },
      {
        question: "Is my time data stored?",
        answer:
          "No. All conversions happen locally on your device, and nothing is saved or transmitted."
      }
    ]
  }
}
,
  {
    id: "case-converter",
    name: "Case Converter",
    description:
      "Convert text between uppercase, lowercase, title case, and more formats.",
    seoTitle: "Case Converter - Change Text Case Online",
    seoDescription:
      "Easily convert text between uppercase, lowercase, title case, sentence case, and more with our free online Case Converter. No registration required, 100% private and secure.",
    icon: <CaseIcon />,
    component: CaseConverter,
    category: ToolCategory.TEXT,
    featured: true,
    details: {
      tip: "Use 'Title Case' for blog post headlines to make them look professional, and 'Sentence case' for paragraphs to keep them easy to read!",
      introduction:
        "The Case Converter tool allows you to easily transform the case of your text. Whether you need your text in all uppercase, all lowercase, sentence case, or title case, this tool provides a quick and easy solution. It works by analyzing the input text and applying string manipulation techniques to change the casing of each character or word as per the selected option. This solves the common problem of manually editing text to fit specific formatting requirements, saving time and reducing errors in documents, emails, or code.",
      explanation:
        'How does it work? The tool takes your input string and uses JavaScript string methods like toUpperCase(), toLowerCase(), or custom logic for title and sentence case. For title case, it capitalizes the first letter of each major word, ignoring minor words like "the" or "and" unless specified. Sentence case capitalizes only the first letter of each sentence. This automation eliminates the tedium of manual corrections, especially for large texts.',
      usageExamples: [
        "A student writing an essay might use it to convert all text to title case for headings.",
        "A developer could convert variable names from camelCase to UPPER_CASE for constants in code.",
        "A marketer preparing email campaigns might switch text to sentence case for better readability in subject lines.",
      ],
      underlyingConcept:
        "Text casing is a fundamental concept in typography and programming. It involves modifying the capitalization of letters to convey structure, emphasis, or style. For instance, uppercase is often used for shouting or acronyms, while title case is common in headlines. The tool leverages Unicode character properties to handle various languages and special characters accurately.",
      howToUse: [
        "Paste or type your text into the input area.",
        "Click one of the buttons for the desired case transformation (e.g., UPPER CASE, lower case).",
        "The converted text will instantly appear in the result area below.",
        "You can then copy the result to your clipboard.",
      ],
      features: [
        "Supports multiple case formats: UPPER, lower, Sentence, and Title case.",
        "Instant conversion with no server-side processing.",
        "Simple and intuitive interface.",
        "Handles large blocks of text efficiently.",
      ],
      faqs: [
        {
          question: "Does this tool support non-English characters?",
          answer:
            "Yes, it handles Unicode characters, including accented letters and other alphabets.",
        },
        {
          question: "Can I convert multiple paragraphs at once?",
          answer:
            "Absolutely, the tool processes any amount of text efficiently.",
        },
        {
          question: "Is there a limit to the text length?",
          answer:
            "No strict limit, but very large texts may depend on your browser's memory.",
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
    ],
  },
  {
  id: "word-counter",
  name: "Word Counter",
  description:
    "Instantly count words, characters, sentences, and paragraphs with our advanced, real-time Word Counter tool.",
  seoTitle: "Free Word Counter Online | Accurate Word & Character Count Tool",
  seoDescription:
    "Use our free online Word Counter to instantly count words, characters, sentences, and paragraphs. Perfect for writers, students, SEO experts, and content creators. 100% private, accurate, and fast.",
  icon: <CounterIcon />,
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
    "content writing tool"
  ],
  details: {
    introduction:
      "Our Free Word Counter Tool delivers fast, accurate, real-time text analysis designed for writers, students, editors, marketers, and content creators. Whether you're optimizing blog posts, crafting essays, preparing social media content, or meeting strict word limits, this powerful tool provides detailed metrics including word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time. With a clean interface and instant calculations, it ensures your writing stays polished, structured, and aligned with content requirements.",
    howToUse: [
      "Paste or type your text into the input area — supports up to 50,000 characters.",
      "Monitor real-time word, character, sentence, and paragraph counts as you type.",
      "Check reading time based on average reading speeds (200–300 WPM).",
      "Use the distraction-free layout to stay focused while reviewing essential stats.",
      "Copy specific counts or export the complete analysis for documentation or reports."
    ],
    features: [
      "Real-time analytical counters for words, characters, sentences, and paragraphs.",
      "Reading time estimation for casual and fast readers.",
      "Multi-language support with Unicode compatibility.",
      "Clean, minimalistic UI with dark mode for comfortable long-session writing.",
      "Advanced sentence recognition that handles abbreviations and complex punctuation.",
      "Privacy-first design — all processing is done locally in your browser."
    ],
    privacy: PRIVACY_STATEMENT,
    explanation:
      "This Word Counter uses advanced linguistic parsing to deliver precise metrics essential for academic, professional, and SEO-focused writing. Words are tokenized using space and punctuation rules; characters are counted both with and without whitespace for layout and SEO needs. Sentences are detected through regex-based boundary analysis, while paragraphs are recognized through line-break patterns. Reading time is calculated from research-backed reading speed averages. The result: accurate, insightful analytics that help refine writing style, improve readability, and meet publication or platform guidelines.",
    usageExamples: [
      "Students verifying word limits for essays, theses, and academic papers.",
      "Bloggers optimizing article length for SEO and reader engagement.",
      "Social media managers checking character limits for posts and captions.",
      "Editors analyzing sentence structure and pacing in manuscripts.",
      "Marketing teams reviewing email newsletters and ad copy for readability."
    ],
    faqs: [
      {
        question: "How does the tool count words?",
        answer:
          "Words are counted using standard tokenization rules: separated by spaces or punctuation. Hyphenated words and contractions count as single words for accuracy."
      },
      {
        question: "What’s the difference between characters with and without spaces?",
        answer:
          "Characters with spaces include every visible character, ideal for layout planning. Characters without spaces measure pure letter count for SEO density and text analysis."
      },
      {
        question: "Does it support non-English languages?",
        answer:
          "Yes. The tool supports Unicode, ensuring accurate counting for languages like Hindi, Chinese, Arabic, Tamil, and more."
      },
      {
        question: "How accurate is the reading time estimate?",
        answer:
          "Reading time is calculated using widely accepted averages — 200 WPM for normal reading and 300 WPM for skim reading — but may vary based on content difficulty."
      }
    ],
    underlyingConcept:
      "The underlying technology uses computational linguistics principles for text tokenization and segmentation. Words are identified via delimiter rules, sentences via punctuation and regex detection, and paragraphs through line-break analysis. This mirrors the methodology used in NLP frameworks like NLTK, enabling deeper insights such as sentence length averages and content readability patterns. Providing both character counts (with and without spaces) supports designers, SEO specialists, and writers in understanding text density, visual layout impact, and structural consistency."
  }
}
,
  {
  id: "character-counter",
  name: "Character Counter",
  description:
    "Count characters, letters, and byte size instantly to ensure your text fits limits for social media, SMS, and online platforms.",
  seoTitle: "Character Counter Tool | Online Letter, Symbol & Byte Counter",
  seoDescription:
    "Use our free Character Counter to instantly check characters, letters, symbols, and byte size of any text. Ideal for Twitter/X posts, SMS messages, social media, and data validation. 100% private and secure.",
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
    "emoji byte counter"
  ],

  details: {
    introduction:
      "The Character Counter is a precise online tool for writers, marketers, developers, and content creators who need to know the exact length of their text. It calculates characters with spaces, characters without spaces, and total byte size in UTF-8 encoding. Perfect for checking social media posts, SMS messages, API payloads, or database entries, this tool ensures your text always meets character and storage limits.",

    explanation:
      "This tool processes your text by iterating through each character, counting them in real time. For byte size, it encodes the text in UTF-8, measuring the exact storage requirement, including multi-byte characters such as emojis, accented letters, and symbols.",

    usageExamples: [
      "Check if a Twitter/X post stays within the 280-character limit.",
      "Ensure SMS messages are under 160 characters to avoid splitting.",
      "Verify API payload size does not exceed data limits using byte count.",
      "Content creators confirm that captions or titles meet platform character limits.",
      "Developers and database admins check string storage requirements."
    ],

    underlyingConcept:
      "Character counting combines text parsing with encoding awareness. UTF-8 encoding uses 1 byte for ASCII characters and multiple bytes for other Unicode characters. By distinguishing between visual characters and byte size, this tool helps writers and developers optimize text for readability, platform limits, and storage requirements.",

    howToUse: [
      "Paste or type your text into the input area.",
      "The tool will instantly display characters (with and without spaces) and UTF-8 byte size.",
      "Update your text and watch counts refresh in real time for immediate feedback."
    ],

    features: [
      "Instant character counting with and without spaces.",
      "Calculates UTF-8 byte size for accurate storage measurement.",
      "Supports all Unicode characters, including emojis and accented letters.",
      "Real-time updates as you type for fast feedback.",
      "Perfect for social media, SMS, email marketing, and API development."
    ],

    faqs: [
      {
        question: "Why is the byte size higher than the character count?",
        answer: "Non-ASCII characters such as emojis, accented letters, and symbols require multiple bytes in UTF-8 encoding."
      },
      {
        question: "Does it count spaces and line breaks?",
        answer: "Yes, spaces, line breaks, and all visible characters are counted."
      },
      {
        question: "Is it accurate for all languages?",
        answer: "Yes, it fully supports Unicode, so any language script is counted accurately."
      }
    ],

    privacy: PRIVACY_STATEMENT
  }
}
,
  {
  id: "lorem-ipsum-generator",
  name: "Lorem Ipsum Generator",
  description:
    "Generate customizable placeholder text for web design, UI/UX prototypes, print layouts, and content mockups.",
  seoTitle:
    "Free Lorem Ipsum Generator | Placeholder Text Creator for Web & Design",
  seoDescription:
    "Quickly generate customizable Lorem Ipsum placeholder text for web design, UI/UX prototypes, and print layouts. Adjust length, paragraphs, or words with our free online tool. 100% private and secure.",
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
    "design content filler"
  ],

  details: {
    introduction:
      "Boost your design workflow with our Free Lorem Ipsum Generator. Whether you are a web designer, UI/UX developer, print designer, or front-end developer, this tool instantly creates realistic, customizable placeholder text. Generate paragraphs, sentences, or words to perfectly fill layouts, wireframes, or mockups, allowing you to focus on design, spacing, and typography without worrying about actual content. Ideal for responsive websites, app prototypes, and client presentations where visual structure matters most.",

    howToUse: [
      "Select the output format: paragraphs, sentences, or words to match your design layout.",
      "Adjust the number of paragraphs, sentences, or words using sliders or input fields.",
      "Optionally customize the starting text or use the default classic 'Lorem ipsum dolor sit amet'.",
      "Click 'Generate' to produce placeholder text instantly, ready to copy and paste.",
      "Preview the text to check spacing and visual flow before integrating it into your project.",
      "Copy the generated text in one click for seamless use in design software or code editors."
    ],

    features: [
      "Flexible generation modes: paragraphs, sentences, or words for precise layout filling.",
      "Customizable length controls with easy sliders and inputs.",
      "Traditional Latin or randomized variations for diverse placeholder aesthetics.",
      "Real-time preview updates as you modify settings.",
      "Clean, minimalist interface optimized for designers using Figma, Adobe XD, Sketch, or code editors.",
      "Responsive design for use on desktop, tablet, and mobile devices.",
      "No watermarks or branding – professional placeholder text ready for client presentations."
    ],

    privacy: PRIVACY_STATEMENT,

    explanation:
      "Derived from Cicero’s classical Latin text, lorem ipsum has been the standard placeholder text for decades. Our generator uses algorithmic recombination to create coherent passages that mimic real language flow without conveying meaning. Randomization ensures each generation is unique while maintaining realistic spacing, line breaks, and paragraph structure, preventing distraction from design elements and ensuring a natural appearance across various font sizes and layouts.",

    usageExamples: [
      "Web designers filling responsive layouts to test typography and spacing.",
      "UI/UX developers populating wireframes in Figma, Sketch, or Adobe XD.",
      "Print designers creating brochure or flyer mockups to visualize content density.",
      "Front-end developers styling components with realistic text for accurate rendering.",
      "Marketing and design teams preparing client presentation decks with professional placeholder text.",
      "Content strategists estimating page text volumes during sitemap and layout planning."
    ],

    faqs: [
      {
        question: "Why use lorem ipsum instead of real content?",
        answer:
          "Lorem ipsum prevents distraction from content meaning, allowing focus on design, typography, spacing, and layout during reviews."
      },
      {
        question: "Is the generated text real Latin?",
        answer:
          "Yes, it is based on authentic Cicero text but scrambled for placeholder use, maintaining realistic word and sentence structures."
      },
      {
        question: "Can I generate text in other languages?",
        answer:
          "Currently the tool uses classic Latin. For other languages, you can use translation tools to adapt the generated text."
      },
      {
        question: "How much text can I generate?",
        answer:
          "You can generate unlimited text, from a few words to thousands of paragraphs, suitable for any project size."
      },
      {
        question: "Does lorem ipsum affect SEO during development?",
        answer:
          "No. Lorem ipsum is only for design and placeholder purposes. Replace it with real content before publishing to ensure proper SEO."
      }
    ],

    underlyingConcept:
      "The generator applies procedural generation techniques, recombining Cicero-derived tokens while preserving syntactic validity through part-of-speech retention. Randomization avoids repetition, mimicking natural word frequency distributions (Zipf's law), and ensures realistic spacing, line breaks, and text flow for design testing. Unlike simple repeated text, algorithmic variation prevents pattern recognition, supporting cognitive load studies and iterative design evaluation."
  }
}
,
  {
  id: "text-reverser",
  name: "Text Reverser",
  description:
    "Instantly reverse any string of text, words, letters, or symbols for fun, puzzles, or programming tasks.",
  seoTitle: "Text Reverser Tool | Reverse Words, Letters & Strings Online",
  seoDescription:
    "Use our free Text Reverser to instantly flip any string of text, words, letters, or symbols. Ideal for fun, puzzles, social media, coding tests, or data manipulation. 100% private and secure.",
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
    "unicode text reverser"
  ],

  details: {
    introduction:
      "The Text Reverser is a fun and practical online tool for flipping any text string. Reverse letters, words, symbols, numbers, or emojis instantly. Perfect for creative projects, social media posts, puzzles, or even testing string manipulation in programming. This easy-to-use tool provides instant results while handling all Unicode characters seamlessly.",

    explanation:
      "The tool splits the input into individual characters, reverses their order, and rejoins them into a string. It preserves all characters, including emojis and special symbols, giving a complete reversed version of your input.",

    usageExamples: [
      "Social media users create reversed or 'backwards' posts for fun and engagement.",
      "Puzzle designers generate reversed clues for games or escape rooms.",
      "Programmers test string manipulation and reversal functions.",
      "Designers create mirrored text effects for graphics and UI elements."
    ],

    underlyingConcept:
      "Text reversal is a fundamental computer science operation, demonstrating array manipulation and string processing. By iterating from the end of the string to the start, each character is repositioned in reverse order, preserving integrity for Unicode and multi-byte characters.",

    howToUse: [
      "Paste or type your text into the 'Original Text' box.",
      "The tool instantly displays the reversed version in the 'Reversed Text' box below."
    ],

    features: [
      "Instant, real-time reversal of text as you type.",
      "Supports all characters, symbols, emojis, and multi-line text.",
      "Ideal for social media, fun puzzles, and coding experiments.",
      "No registration required and fully private – all processing happens in your browser."
    ],

    faqs: [
      {
        question: "Does it reverse the entire string or individual words?",
        answer: "It reverses the entire string character by character."
      },
      {
        question: "Are emojis reversed correctly?",
        answer: "Yes, emojis are treated as whole units and reversed properly."
      },
      {
        question: "Can I reverse multiple lines of text?",
        answer: "Yes, the tool treats the whole input as a single string for reversal."
      }
    ],

    privacy: PRIVACY_STATEMENT
  }
}
,
  {
  id: "markdown-previewer",
  name: "Markdown Previewer",
  description:
    "Write Markdown and instantly see the rendered HTML in a live, real-time preview for documentation, blogs, and READMEs.",
  seoTitle: "Markdown Previewer Online | Live Markdown to HTML Editor",
  seoDescription:
    "Use our free Markdown Previewer to write Markdown and view HTML output in real-time. Perfect for developers, bloggers, and technical writers drafting documentation, READMEs, or blog posts. 100% private and secure.",
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
    "markdown blog preview"
  ],

  details: {
    introduction:
      "Our Markdown Previewer provides a seamless live-editing experience: write in Markdown syntax on one side and view the rendered HTML on the other instantly. Ideal for developers creating GitHub READMEs, bloggers drafting posts, and technical writers preparing documentation, it eliminates the need to switch between editing and preview modes, streamlining your workflow.",

    explanation:
      "The tool parses Markdown as you type using a robust library like marked or remark, converting it into clean HTML output instantly. It supports headers, lists, code blocks, links, images, tables, and more, providing a fully accurate visual representation of your final content.",

    usageExamples: [
      "Developers drafting and previewing GitHub READMEs with accurate formatting.",
      "Bloggers composing posts and checking real-time HTML output before publishing.",
      "Technical writers creating manuals, guides, or documentation with instant feedback.",
      "Students or writers learning Markdown and testing formatting for projects.",
      "Content managers ensuring Markdown-based content renders correctly in web platforms."
    ],

    underlyingConcept:
      "Markdown, created by John Gruber in 2004, is a lightweight markup language that converts plain text into HTML, emphasizing readability. The previewer applies live parsing, rendering HTML as you type, ensuring accurate representation of Markdown syntax without needing advanced HTML knowledge.",

    howToUse: [
      "Type your Markdown text in the left-hand editor panel.",
      "The right-hand panel instantly displays the rendered HTML in real-time.",
      "As you edit Markdown syntax, the preview updates automatically.",
      "Use standard Markdown features like headers, lists, links, images, tables, and code blocks for full content formatting."
    ],

    features: [
      "Live, side-by-side Markdown-to-HTML preview.",
      "Supports full standard Markdown syntax, including GitHub Flavored Markdown (tables, task lists).",
      "Clean, readable HTML output for accurate visualization.",
      "Automatic rendering updates as you type.",
      "Safe and sanitized output to prevent XSS and security issues.",
      "No registration required and fully private – all processing is local in your browser."
    ],

    faqs: [
      {
        question: "Does it support GitHub Flavored Markdown?",
        answer: "Yes, including tables, task lists, and extended syntax."
      },
      {
        question: "Can I embed images?",
        answer: "Yes, using standard Markdown image syntax ![alt text](url)."
      },
      {
        question: "Is the HTML preview safe from scripts?",
        answer: "Yes, all content is sanitized to prevent XSS attacks and unsafe scripts."
      }
    ],

    privacy: PRIVACY_STATEMENT
  }
}
,
  // Coding Tools
  {
    id: "base64-converter",
    name: "Base64 Converter",
    description: "Instantly encode and decode text, images, and files to/from Base64 online.",
    seoTitle: "Base64 Converter Online - Encode & Decode Text, Files, Images",
    seoDescription:
      "Convert text, images, and files to Base64 format or decode Base64 strings instantly with our free online Base64 Converter. Secure, fast, and easy to use without registration.",
    icon: <Base64Icon />,
    component: Base64Converter,
    category: ToolCategory.CODING,
    details: {
      introduction:
        "Easily encode and decode text, images, and files with our Free Base64 Converter – the ultimate online tool for developers, web engineers, and digital creators. Transform plain text, images, or files into Base64 strings for safe transmission in URLs, CSS, JSON, or email content, and decode them back accurately. Avoid complex libraries or command-line tools with our instant, browser-based solution. Perfect for debugging APIs, embedding media, or preparing data for web applications.",
      howToUse: [
        "Select 'Encode' to convert text or files to Base64, or 'Decode' to revert Base64 strings.",
        "For text, paste your content in the input field (supports multi-line and special characters).",
        "For files, upload images, documents, or binaries (up to 10MB).",
        "Click 'Encode' or 'Decode' to process in real-time. Results appear instantly below.",
        "Review the Base64 string, original file size, and download options for decoded files.",
        "Copy the output with one click or download it for integration in your projects.",
      ],
      features: [
        "Encode text, files, and images to Base64 or decode strings with full accuracy.",
        "Supports file uploads for images, PDFs, and binary files directly in the browser.",
        "Real-time preview with character count and size comparison.",
        "URL-safe Base64 option for web-friendly transmission.",
        "Error detection highlights invalid input and provides troubleshooting guidance.",
        "Lightweight, browser-based tool with no installation or server upload required.",
        "Export options include copy-to-clipboard, file download, and code snippet generation.",
      ],
      privacy: PRIVACY_STATEMENT,
      explanation:
        "Base64 encoding converts binary data into ASCII strings using 64 characters (A-Z, a-z, 0-9, +, /) with padding (=). It expands data by ~33% to ensure safe transmission in text-only protocols like HTTP, SMTP, or JSON. Our tool follows RFC 4648, handling partial bytes and padding correctly. Decoding reverses this, validating input before outputting the original content. Ideal for web development, API testing, email encoding, and embedding assets directly into code.",
      usageExamples: [
        "Embed small images as Base64 in CSS or HTML to reduce HTTP requests.",
        "Encode JSON payloads with special characters for API testing.",
        "Prepare HTML emails with inline Base64 images and CSS.",
        "Serialize binary configs or tokens for databases or app storage.",
        "Securely encode data snippets for sharing without exposing content.",
        "Convert icons to Base64 for inline SVG usage in responsive UI components.",
      ],
      faqs: [
        {
          question: "What is Base64 used for?",
          answer:
            "Base64 encodes binary data like images or files into text for safe transmission in emails, URLs, or JSON. It's not encryption but prevents corruption in text-only systems.",
        },
        {
          question: "Does encoding increase file size?",
          answer:
            "Yes, by ~33%. For small assets like icons, Base64 reduces HTTP requests and simplifies embedding.",
        },
        {
          question: "Is your tool URL-safe?",
          answer:
            "Yes, we provide a URL-safe variant that replaces '+' with '-' and '/' with '_', removing padding for web use.",
        },
        {
          question: "Can it handle large files?",
          answer:
            "Files up to 50MB are processed in chunks. Larger files may need server-side handling to avoid browser memory limits.",
        },
        {
          question: "Why does decoding sometimes fail?",
          answer:
            "Errors occur due to incorrect padding, invalid characters, or non-Base64 input. Our tool highlights the issues for easy correction.",
        },
      ],
      underlyingConcept:
        "Base64 encoding maps 8-bit bytes into 6-bit indices using a 64-character alphabet, padding incomplete triplets with '='. Decoding validates the Base64 alphabet and reconstructs bytes. URL-safe variants replace '+' and '/' for safe URI usage. This ensures reliable transmission of binary data over text-based protocols and is widely used in web development, API testing, and data serialization.",
    },
    keywords: [
      "base64 converter online",
      "encode text to base64",
      "decode base64 string",
      "file to base64 converter",
      "data uri generator online",
    ],
  },
   {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode and decode strings for safe URL transmission online.",
    seoTitle: "URL Encoder/Decoder Online - Percent Encoding Tool",
    seoDescription:
      "Safely encode or decode strings for URLs with our free online URL Encoder/Decoder. Handles spaces, special characters, and query parameters for 100% secure URL formatting.",
    icon: <UrlIcon />,
    component: UrlEncoder,
    category: ToolCategory.CODING,
    details: {
      introduction:
        "Encode or decode URL components with our free online URL Encoder/Decoder. Perfect for developers, marketers, and testers needing safe URL transmission. Handle spaces, special characters, and query strings without breaking URLs in browsers or servers.",
      explanation:
        "URL encoding (percent-encoding) replaces unsafe characters with '%' followed by their hexadecimal ASCII value. Use encodeURIComponent for individual components or encodeURI for entire URLs to ensure accurate, unambiguous transmission.",
      usageExamples: [
        "Building API query strings safely with user input.",
        "Encoding file names or paths in download links.",
        "Debugging and fixing malformed URLs from logs.",
      ],
      underlyingConcept:
        "Follows RFC 3986 standards. Reserved characters like ?, &, = are left intact for URL structure, while others are escaped to prevent parsing errors or security issues.",
      howToUse: [
        "Enter a string or URL into the input field.",
        'Click "Encode" to convert it into a URL-safe format.',
        'To reverse, paste an encoded string and click "Decode".',
        "View the output in the result area instantly.",
      ],
      features: [
        "Standard encodeURIComponent()/decodeURIComponent() functions used.",
        "Handles all URL special characters safely.",
        "Real-time encoding and decoding with error feedback.",
      ],
      faqs: [
        {
          question: "Difference from encodeURI?",
          answer: "encodeURIComponent escapes more characters, suitable for query parameters.",
        },
        { question: "Does it handle spaces?", answer: "Yes, spaces convert to %20." },
        { question: "Safe for full URLs?", answer: "Yes, but use encodeURI for entire URLs." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "url encoder decoder online",
      "percent encoding tool",
      "url safe encoding",
      "encodeURIComponent online",
      "query string encoder",
    ],
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Validate, format, and pretty-print your JSON data instantly online.",
    seoTitle: "JSON Formatter Online - Validate, Beautify & Pretty Print JSON",
    seoDescription:
      "Easily format, validate, and beautify JSON data with our free online JSON Formatter. Quickly debug API responses and minified JSON. 100% private and secure.",
    icon: <JsonIcon />,
    component: JsonFormatter,
    category: ToolCategory.CODING,
    featured: true,
    details: {
      tip: "Paste messy JSON from an API and click 'Format' to make it readable instantly!",
      introduction:
        "Format, validate, and beautify JSON data online. Ideal for developers and testers who work with APIs, config files, or user-submitted JSON. Converts single-line or minified JSON into a clean, indented, readable structure.",
      explanation:
        "Uses JSON.parse() to validate the input, then JSON.stringify() with indentation to pretty-print the data.",
      usageExamples: [
        "Debugging API responses in console logs.",
        "Formatting JSON config files for readability.",
        "Validating JSON submitted by users in forms or applications.",
      ],
      underlyingConcept:
        "JSON (JavaScript Object Notation) is a structured data format based on JS objects. Formatting adds whitespace to display nested structures clearly. Validation ensures proper syntax, including quoted keys and correct brackets.",
      howToUse: [
        "Paste your raw JSON into the input field.",
        'Click "Format / Validate".',
        "Valid JSON will be formatted and displayed with a success message.",
        "Invalid JSON triggers a clear error message with line details.",
      ],
      features: [
        "Pretty-prints minified JSON for readability.",
        "Validates JSON syntax with descriptive error messages.",
        "Uses monospaced fonts for easier analysis.",
      ],
      faqs: [
        { question: "Can it handle large JSON?", answer: "Yes, within browser memory limits." },
        { question: "Does it sort keys?", answer: "No, preserves original key order." },
        { question: "Syntax errors?", answer: "Displays line number and error description." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "json formatter online",
      "json validator",
      "pretty print json online",
      "json beautifier tool",
      "json viewer online",
    ],
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions against strings online.",
    seoTitle: "Regex Tester Online - Test & Debug Regular Expressions",
    seoDescription:
      "Test, validate, and debug your regular expressions in real-time with our free Regex Tester. Instantly view matches and capture groups. 100% private and secure.",
    icon: <RegexIcon />,
    component: RegexTester,
    category: ToolCategory.CODING,
    details: {
      introduction:
        "Test and debug regular expressions online. Instantly visualize matches and capture groups against sample text. A must-have tool for developers working with form validation, data extraction, and string parsing.",
      explanation:
        "Creates a RegExp object with your pattern and flags, then uses matchAll() or exec() to find matches and display them in real-time.",
      usageExamples: [
        "Validate email or phone input formats in forms.",
        "Extract data from logs, HTML, or structured text.",
        "Search and replace patterns in code or content.",
      ],
      underlyingConcept:
        "Regular expressions define text patterns using quantifiers, character classes, and groups. They allow efficient search, validation, and extraction from strings based on formal pattern rules.",
      howToUse: [
        "Enter your regex pattern in the input field.",
        "Optionally add flags (g, i, m, s).",
        'Paste or type the string to test against in the test area.',
        "View results and matches instantly in the result panel.",
      ],
      features: [
        "Real-time highlighting of matches and capture groups.",
        "Support for global, case-insensitive, multiline, and other flags.",
        "Displays detailed lists of all matches.",
        "Error detection for invalid regular expressions.",
      ],
      faqs: [
        { question: "Supported flags?", answer: "g, i, m, s, u, y etc." },
        { question: "Show replacements?", answer: "Currently matches only; replace may come in future." },
        { question: "JS-specific?", answer: "Yes, uses JavaScript RegExp engine." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "regex tester online",
      "regular expression tester",
      "javascript regex checker",
      "validate regex pattern",
      "regex debugger online",
    ],
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate secure, random UUIDs (v4) online instantly.",
    seoTitle: "UUID Generator Online - Create Random UUID v4",
    seoDescription:
      "Generate universally unique identifiers (UUID v4) with our free online UUID Generator. Perfect for databases, session IDs, and distributed systems. 100% private and secure.",
    icon: <UuidIcon />,
    component: UuidGenerator,
    category: ToolCategory.CODING,
    details: {
      introduction:
        "Generate Version 4 UUIDs (Universally Unique Identifiers) quickly and securely online. Ideal for developers, database admins, and system architects who need collision-resistant IDs for records, sessions, or distributed systems.",
      explanation:
        "Uses the browser's crypto.randomUUID() method to generate a random 128-bit UUID, formatted as 8-4-4-4-12 hexadecimal digits, following RFC 4122 standards.",
      usageExamples: [
        "Assigning unique keys to database records.",
        "Generating session or token IDs for web applications.",
        "Tagging files or objects in content management systems.",
      ],
      underlyingConcept:
        "UUID v4 uses random 128-bit values to create globally unique identifiers, ensuring near-zero collision probability. It supports decentralized ID generation without relying on central servers.",
      howToUse: [
        'Click "Generate UUID" to create a new random UUID.',
        "The generated UUID will appear instantly.",
        'Click "Copy" to copy the UUID to your clipboard.',
      ],
      features: [
        "Generates cryptographically strong random UUIDs (v4).",
        "Secure, browser-based generation using Web Crypto API.",
        "Instant one-click generation and copying of UUIDs.",
      ],
      faqs: [
        { question: "Is v4 truly unique?", answer: "Yes, extremely low collision probability." },
        { question: "Can I generate multiple UUIDs?", answer: "Yes, click 'Generate' repeatedly." },
        { question: "Other versions supported?", answer: "This tool focuses on UUID v4; v1 uses timestamps." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "uuid generator online",
      "generate uuid v4",
      "random uuid online",
      "guid generator",
      "unique identifier generator",
    ],
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Create SHA-1, SHA-256, or SHA-512 hashes online from any text.",
    seoTitle: "Hash Generator Online - Generate SHA Hashes Securely",
    seoDescription:
      "Generate SHA-1, SHA-256, and SHA-512 hashes from text using our free online Hash Generator. Powered by Web Crypto API, secure and private.",
    icon: <HashIcon />,
    component: HashGenerator,
    category: ToolCategory.CODING,
    details: {
      introduction:
        "Create cryptographic hashes from any text online. Supports SHA-1, SHA-256, and SHA-512 for data integrity verification, password hashing, or generating unique keys.",
      explanation:
        "Text is converted into bytes and processed using the Web Crypto API’s subtle.digest() method, generating a secure hexadecimal hash.",
      usageExamples: [
        "Verify file integrity with checksums.",
        "Hash passwords or sensitive data before storage.",
        "Generate unique identifiers or keys from strings.",
      ],
      underlyingConcept:
        "Hashing maps input data to a fixed-size, one-way value. SHA algorithms are cryptographically secure, collision-resistant, and widely used in blockchain, SSL, and authentication.",
      howToUse: [
        "Enter the text you want to hash.",
        "Select SHA-1, SHA-256, or SHA-512.",
        'Click "Generate" to see the hash output in hexadecimal format.',
      ],
      features: [
        "Supports SHA-1, SHA-256, SHA-512 algorithms.",
        "Uses browser-native Web Crypto API for security.",
        "No data leaves your browser; completely private.",
      ],
      faqs: [
        { question: "Is SHA-1 secure?", answer: "No, use only for legacy; prefer SHA-256 or SHA-512." },
        { question: "Can it hash files?", answer: "This tool is text-only; file hashing needs a different approach." },
        { question: "What is hex output?", answer: "Hexadecimal representation of the hash digest." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "sha256 generator online",
      "sha512 hash calculator",
      "md5 generator online",
      "string to hash",
      "web crypto hash tool",
    ],
  },
  {
    id: "jwt-debugger",
    name: "JWT Decoder",
    description: "Decode JSON Web Tokens to view header and payload online.",
    seoTitle: "JWT Decoder Online - Inspect JSON Web Tokens",
    seoDescription:
      "Decode and inspect JWTs (JSON Web Tokens) online. View header and payload data securely with our free JWT Decoder. 100% private and browser-based.",
    icon: <JwtIcon />,
    component: JwtDebugger,
    category: ToolCategory.CODING,
    details: {
      introduction:
        "Decode JWTs quickly to inspect their header and payload. Useful for developers, security analysts, and testers working with authentication tokens.",
      explanation:
        "Splits the JWT by dots, Base64-decodes the header and payload, and parses them into readable JSON. Signature verification is not included.",
      usageExamples: [
        "Debug API authentication tokens.",
        "Inspect user claims in session data.",
        "Verify JWT structure before integration into applications.",
      ],
      underlyingConcept:
        "JWT (RFC 7519) is a compact, URL-safe token format with a header, payload, and signature. Decoding reveals the claims; signature verification requires the secret key.",
      howToUse: [
        "Paste your JWT string into the input field.",
        "The tool automatically decodes header and payload.",
        "View the decoded JSON content in separate, readable boxes.",
        "Invalid tokens trigger an error message.",
      ],
      features: [
        "Real-time decoding of JWTs as you type.",
        "Separates header and payload clearly.",
        "Pretty-prints JSON for readability.",
        "Error detection for malformed tokens.",
      ],
      faqs: [
        { question: "Why no signature verification?", answer: "Requires secret key which varies per implementation." },
        { question: "Can it decode encrypted JWTs?", answer: "No, only standard Base64-encoded JWTs." },
        { question: "What info is in payload?", answer: "Claims like iss, sub, exp, and custom data." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "jwt decoder online",
      "json web token decoder",
      "inspect jwt payload",
      "decode jwt online",
      "auth token debugger",
    ],
  },
   {
    "id": "diff-checker",
    "name": "Diff Checker",
    "description": "Instantly compare text or code and highlight every difference in seconds.",
    "seoTitle": "Diff Checker Online - Compare Text & Code Instantly",
    "seoDescription": "Easily compare two blocks of text or code and see differences highlighted. Ideal for developers, writers, and editors. Fast, free, and secure.",
    "icon": <DiffIcon />,
    "component": DiffChecker,
    "category": ToolCategory.CODING,
    "details": {
      "introduction": "Stop manually searching for changes in text or code. Diff Checker highlights added and removed lines instantly, helping you spot changes in documents, code, or any text content quickly and accurately.",
      "explanation": "It uses advanced diff algorithms like LCS (Longest Common Subsequence) to detect insertions, deletions, and common sections, then visually highlights them for easy review.",
      "usageExamples": [
        "Code reviews and pull requests",
        "Tracking document edits over versions",
        "Comparing configuration or log files"
      ],
      "underlyingConcept": "Based on Unix diff utilities, it calculates minimal edits required to transform one text block into another. Useful for version control and tracking changes efficiently.",
      "howToUse": [
        "Paste the original text on the left.",
        "Paste the updated text on the right.",
        "See all differences instantly highlighted: green for additions, red for deletions."
      ],
      "features": [
        "Side-by-side comparison for clarity",
        "Line-by-line and real-time highlighting",
        "Automatic updates as you edit",
        "Perfect for developers, writers, and editors"
      ],
      "faqs": [
        {
          "question": "Does it support word-level comparison?",
          "answer": "Currently line-based; word-level diffs are planned for future updates."
        },
        {
          "question": "Can it handle very large texts?",
          "answer": "Optimized for standard text and code blocks; extremely large files may be slower."
        },
        {
          "question": "Can whitespace be ignored?",
          "answer": "Not yet, but this feature may be added soon."
        }
      ],
      "privacy": PRIVACY_STATEMENT
    },
    "keywords": [
      "diff tool online",
      "compare text",
      "compare code",
      "track changes",
      "highlight differences"
    ]
  },
  {
    "id": "csv-to-json",
    "name": "CSV to JSON",
    "description": "Convert CSV files into structured JSON arrays instantly, no coding needed.",
    "seoTitle": "CSV to JSON Converter Online - Free & Fast",
    "seoDescription": "Convert your CSV data into JSON format easily. Perfect for web apps, APIs, and data analysis. Free, secure, and browser-based tool.",
    "icon": <CsvToJsonIcon />,
    "component": CsvToJson,
    "category": ToolCategory.CODING,
    "details": {
      "introduction": "Transform CSV data into structured JSON quickly. The tool maps CSV headers to JSON keys, making it ideal for web apps, APIs, or data processing without any manual work.",
      "explanation": "It parses CSV line by line, handles quotes correctly, and generates a well-formatted JSON array ready to use.",
      "usageExamples": [
        "Import spreadsheet data into web applications",
        "Convert database exports for processing",
        "Transform logs and CSV data for analysis tools"
      ],
      "underlyingConcept": "CSV represents tabular data, while JSON is hierarchical. This tool converts rows into objects, and columns into keys for seamless data exchange.",
      "howToUse": [
        "Paste your CSV content into the input box.",
        "Click 'Convert' to generate JSON instantly.",
        "Copy or download the JSON array for use in your projects."
      ],
      "features": [
        "Instant, client-side conversion",
        "Supports standard CSV formats and quoted values",
        "Pretty-printed JSON for readability"
      ],
      "faqs": [
        {
          "question": "What if the CSV has no headers?",
          "answer": "The first row is used as headers by default, otherwise numeric keys are assigned."
        },
        {
          "question": "Does it handle commas in quotes?",
          "answer": "Yes, quoted commas are parsed correctly."
        },
        {
          "question": "Can it handle large CSV files?",
          "answer": "Limited by browser memory for very large datasets."
        }
      ],
      "privacy": PRIVACY_STATEMENT
    },
    "keywords": [
      "csv to json online",
      "convert csv to json",
      "csv parser",
      "spreadsheet to json",
      "data transformation tool"
    ]
  },
  {
    "id": "json-to-csv",
    "name": "JSON to CSV",
    "description": "Convert JSON arrays into CSV files for Excel or other spreadsheet tools instantly.",
    "seoTitle": "JSON to CSV Converter Online - Free & Fast",
    "seoDescription": "Quickly convert JSON arrays to CSV format for spreadsheets or reports. Browser-based, free, and secure tool for developers and analysts.",
    "icon": <JsonToCsvIcon />,
    "component": JsonToCsv,
    "category": ToolCategory.CODING,
    "details": {
      "introduction": "Easily convert JSON data into CSV format. The tool extracts object keys as headers and generates clean CSV for Excel, reporting, or data export.",
      "explanation": "It flattens JSON objects into rows, quoting fields when needed to preserve structure.",
      "usageExamples": [
        "Export API JSON to Excel",
        "Generate CSV reports from JS objects",
        "Migrate JSON data to spreadsheet tools"
      ],
      "underlyingConcept": "Reverse of CSV to JSON. Each JSON object is converted to a row, ensuring consistent headers across all data entries.",
      "howToUse": [
        "Paste your JSON array into the input area.",
        "CSV is generated instantly in the output.",
        "Copy or download the CSV file for use."
      ],
      "features": [
        "Automatic header detection from JSON keys",
        "Handles commas and newlines properly",
        "Download CSV file instantly"
      ],
      "faqs": [
        {
          "question": "What if JSON objects have different keys?",
          "answer": "All unique keys are used; missing values are left empty."
        },
        {
          "question": "Does it support nested objects?",
          "answer": "Nested objects are flattened or skipped; best for flat structures."
        },
        {
          "question": "What file format is generated?",
          "answer": "UTF-8 encoded CSV."
        }
      ],
      "privacy": PRIVACY_STATEMENT
    },
    "keywords": [
      "json to csv online",
      "convert json to csv",
      "export json to excel",
      "json array to csv",
      "data export tool"
    ]
  },
  {
    "id": "csv-to-xlsx",
    "name": "CSV to XLSX",
    "description": "Convert CSV data to Excel (.xlsx) spreadsheets instantly and securely.",
    "seoTitle": "CSV to Excel Converter Online - Free & Fast",
    "seoDescription": "Convert CSV files to Excel (.xlsx) quickly in your browser. Perfect for reporting, sharing, and analyzing data. Free and secure tool.",
    "icon": <CsvToXlsxIcon />,
    "component": CsvToXlsx,
    "category": ToolCategory.CODING,
    "details": {
      "introduction": "Easily convert CSV files into Excel spreadsheets. This browser-based tool creates downloadable XLSX files quickly without installing software.",
      "explanation": "Uses SheetJS to map CSV rows into Excel cells, preserving headers and basic data formatting, then triggers a download for instant use.",
      "usageExamples": [
        "Share CSV data with non-technical users",
        "Import logs into Excel for analysis",
        "Batch convert CSV reports to XLSX"
      ],
      "underlyingConcept": "XLSX is XML-based. This tool converts flat CSV rows to spreadsheet cells, making the data compatible with Excel and other spreadsheet tools.",
      "howToUse": [
        "Paste your CSV content into the input box.",
        "Click 'Download .xlsx' to generate the Excel file.",
        "Save the file locally and open in Excel or other spreadsheet apps."
      ],
      "features": [
        "Direct CSV to XLSX conversion",
        "Client-side processing; no data uploaded",
        "Handles headers and data rows accurately"
      ],
      "faqs": [
        {
          "question": "Does it support formulas?",
          "answer": "No, it only converts plain data."
        },
        {
          "question": "Can it handle large files?",
          "answer": "Best for small to medium datasets due to browser limitations."
        },
        {
          "question": "What encoding is used?",
          "answer": "UTF-8."
        }
      ],
      "privacy": PRIVACY_STATEMENT
    },
    "keywords": [
      "csv to excel online",
      "convert csv to xlsx",
      "spreadsheet conversion tool",
      "csv to xlsx browser",
      "excel file generator"
    ]
  },
  {
    "id": "xlsx-to-csv",
    "name": "XLSX to CSV",
    "description": "Extract Excel spreadsheet data and convert it to CSV format instantly.",
    "seoTitle": "XLSX to CSV Converter Online - Free Tool",
    "seoDescription": "Convert Excel (.xlsx) files to CSV format quickly and securely in your browser. Perfect for importing or processing spreadsheet data.",
    "icon": <XlsxToCsvIcon />,
    "component": XlsxToCsv,
    "category": ToolCategory.CODING,
    "details": {
      "introduction": "Upload an Excel file and convert the first sheet into CSV instantly. Browser-based conversion keeps your data private and ready for analysis or import.",
      "explanation": "Reads the Excel file using FileReader, parses with SheetJS, extracts the first worksheet, and converts it into a CSV string.",
      "usageExamples": [
        "Extract data for scripts or analysis",
        "Convert reports to plain CSV",
        "Batch process spreadsheets for export"
      ],
      "underlyingConcept": "Reverse of CSV to XLSX. Extracts cell values and converts them to a CSV-friendly format while preserving basic data types.",
      "howToUse": [
        "Click 'Upload XLSX File' or drag-and-drop your file.",
        "The first sheet will be converted to CSV instantly.",
        "Copy or download the resulting CSV for use."
      ],
      "features": [
        "Supports .xlsx and common spreadsheet formats",
        "Converts first worksheet to CSV",
        "Copy or download CSV output easily"
      ],
      "faqs": [
        {
          "question": "Does it support multiple sheets?",
          "answer": "Only the first sheet is converted."
        },
        {
          "question": "Are formulas supported?",
          "answer": "Only the calculated values are converted."
        },
        {
          "question": "Any file size limitations?",
          "answer": "Depends on browser memory."
        }
      ],
      "privacy": PRIVACY_STATEMENT
    },
    "keywords": [
      "xlsx to csv online",
      "convert excel to csv",
      "extract data from xlsx",
      "spreadsheet to csv",
      "csv file converter"
    ]
  },
  // Image Tools
  {
    id: "image-to-base64",
    name: "Image to Base64",
    description: "Convert an image file into a Base64 data URL string.",
    seoTitle: "Image to Base64 Converter - Online Tool",
    seoDescription:
      "Convert any image file (PNG, JPEG, GIF, SVG) into a Base64 data URL string with our free online Image to Base64 converter. 100% private and secure.",
    icon: <ImageIcon />,
    component: ImageToBase64,
    category: ToolCategory.IMAGE,
    featured: true,
    details: {
      tip: "Base64 is great for small icons or logos in your website's CSS. It can reduce HTTP requests and make your site load a tiny bit faster!",
      introduction:
        "This tool converts an image file from your computer into a Base64-encoded Data URL. This format can be directly embedded in HTML or CSS files, which can be useful for reducing HTTP requests for small icons and images, solving performance issues in web pages.",
      explanation:
        "How does it work? Uploads image, reads as data URL via FileReader, which includes Base64.",
      usageExamples: [
        "Embedding logos in email signatures.",
        "Inlining images in CSS for faster loads.",
        "Storing images in JSON for apps.",
      ],
      underlyingConcept:
        "Data URLs (RFC 2397) embed resources inline. Base64 encodes binary to text, allowing image data in URLs like data:image/png;base64,...",
      howToUse: [
        'Click the "Upload an image" button and select an image file from your device.',
        "An image preview will appear on the left.",
        "The corresponding Base64 Data URL will be generated and displayed on the right.",
        'Click the "Copy" button to copy the entire Base64 string.',
      ],
      features: [
        "Works with common image formats like PNG, JPEG, GIF, and SVG.",
        "Provides an instant preview of the uploaded image.",
        "Generates a complete Data URL, ready for use in `src` or `url()` attributes.",
      ],
      faqs: [
        {
          question: "Why use Data URLs?",
          answer: "Reduces server requests for small files.",
        },
        { question: "Size increase?", answer: "Yes, 33% overhead." },
        {
          question: "Browser support?",
          answer: "Universal for modern browsers.",
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
    ],
  },
  {
    id: "base64-to-image",
    name: "Base64 to Image",
    description: "Convert a Base64 data URL into a viewable image.",
    seoTitle: "Base64 to Image Converter - Online Tool",
    seoDescription:
      "Convert a Base64 data URL string back into a viewable image with our free online Base64 to Image converter. 100% private and secure.",
    icon: <Base64ToImageIcon />,
    component: Base64ToImage,
    category: ToolCategory.IMAGE,
    details: {
      introduction:
        "If you have a Base64 Data URL, this tool can decode it back into a viewable image. You can then preview the image and download it as a file, solving the need to extract embedded images from code or data.",
      explanation:
        "How does it work? Sets the Data URL as img src for preview, then creates blob for download.",
      usageExamples: [
        "Extracting images from CSS code.",
        "Downloading embedded email images.",
        "Converting API responses to files.",
      ],
      underlyingConcept:
        "Reverse of encoding, parsing MIME type and Base64 to binary, then rendering as image.",
      howToUse: [
        "Paste a valid Base64 Data URL (starting with `data:image/...`) into the text area.",
        "The image will be rendered in the preview box below.",
        'If the image is valid, a "Download Image" button will appear.',
        "Click the button to save the image to your device.",
      ],
      features: [
        "Renders an image preview from a Base64 string.",
        "Allows downloading of the decoded image.",
        "Provides validation to ensure the string is a valid image Data URL.",
      ],
      faqs: [
        {
          question: "What formats?",
          answer: "Any in Data URL, like PNG, JPG.",
        },
        { question: "Invalid string?", answer: "Shows error." },
        { question: "Download name?", answer: "Generic; rename after." },
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
    seoTitle: "CSS Box Shadow Generator - Visual Tool",
    seoDescription:
      "Create and customize CSS box-shadow effects with our free visual editor. Generate the perfect box-shadow for your project. 100% private and secure.",
    icon: <BoxShadowIcon />,
    component: BoxShadowGenerator,
    category: ToolCategory.CSS,
    details: {
      introduction:
        "Visually design complex CSS `box-shadow` effects. This generator provides sliders and color pickers to intuitively create the perfect shadow, then gives you the CSS code to copy and paste. It solves trial-and-error in CSS editing for shadows.",
      explanation:
        'How does it work? Updates CSS property in preview element based on inputs, generates string like "x y blur spread color".',
      usageExamples: [
        "Designing card components in UI.",
        "Adding depth to buttons.",
        "Creating neumorphic effects.",
      ],
      underlyingConcept:
        "Box-shadow is CSS3 property for layered shadows. Concept mimics light and depth in 2D, with params for position, size, color.",
      howToUse: [
        "Use the sliders to adjust the Horizontal and Vertical Offsets, Blur, and Spread.",
        "Adjust the opacity slider and choose a shadow color.",
        'Toggle the "Inset" checkbox to create an inner shadow.',
        "A live preview of the shadow will be shown on the example element.",
        "Copy the generated CSS code from the code box.",
      ],
      features: [
        "Live visual feedback for all shadow properties.",
        "Controls for offset, blur, spread, color, and opacity.",
        "Support for both outset and inset shadows.",
        "One-click copy of the generated CSS rule.",
      ],
      faqs: [
        {
          question: "Multiple shadows?",
          answer: "Not yet; comma-separated in future.",
        },
        { question: "Browser compatibility?", answer: "CSS3 standard." },
        { question: "Units?", answer: "Pixels." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "css box shadow generator",
      "visual box shadow tool",
      "css shadow creator",
      "drop shadow css",
      "inset shadow generator",
    ],
  },
  {
    id: "css-gradient-generator",
    name: "CSS Gradient Generator",
    description:
      "Create beautiful CSS gradients with color pickers and angle controls.",
    seoTitle: "CSS Gradient Generator - Create Gradients Online",
    seoDescription:
      "Create beautiful linear and radial CSS gradients with our free visual editor. Perfect for modern web design. 100% private and secure.",
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
        "Support for both linear and radial gradients",
        "Real-time visual preview",
        "Add multiple color stops",
        "Color picker and text input for precise color selection",
        "Angle control for linear gradients",
        "Position and shape control for radial gradients",
        "A wide variety of presets to get you started",
      ],
      faqs: [
        {
          question: "How do I create a CSS gradient background?",
          answer:
            "Our tool makes it easy! Simply choose your colors, set the gradient type (linear or radial), and adjust the options. The tool will generate the CSS code for you, which you can then apply to the `background` property of any HTML element.",
        },
        {
          question:
            "What is the difference between linear and radial gradients?",
          answer:
            "A linear gradient creates a transition of colors along a straight line. You can control the direction of this line with an angle. A radial gradient, on the other hand, transitions colors outwards from a central point in a circular or elliptical shape.",
        },
        {
          question: "How to animate CSS gradients smoothly?",
          answer:
            "Animating the `background-gradient` property directly is not performant. A better technique is to create a larger gradient and animate its `background-position`. This creates a smooth, looping animation. While our tool doesn't generate the animation code directly, you can use the generated gradient as a starting point for this technique.",
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
    seoTitle: "CSS Border Radius Generator - Visual Tool",
    seoDescription:
      "Create custom CSS border-radius values with our free visual editor. Control each corner individually to create unique shapes. 100% private and secure.",
    icon: <BorderRadiusIcon />,
    component: BorderRadiusGenerator,
    category: ToolCategory.CSS,
    details: {
      introduction:
        "Design perfect rounded corners with individual control over each corner. Create everything from subtle rounded squares to pill-shaped elements and unique organic shapes.",
      explanation:
        "How does it work? Maps slider values to CSS border-radius property. Supports both px and % units with optional corner linking.",
      usageExamples: [
        "Creating modern card designs",
        "Designing pill-shaped buttons",
        "Building organic, rounded UI elements",
        "Creating speech bubble shapes",
      ],
      underlyingConcept:
        "Border-radius rounds corners by specifying radius values. Can be uniform or individual per corner (top-left, top-right, bottom-right, bottom-left).",
      howToUse: [
        "Choose between px or % units",
        'Toggle "Link all corners" to control all corners together',
        "Adjust individual corner sliders for custom shapes",
        "Watch the live preview update in real-time",
        "Copy the generated CSS code",
      ],
      features: [
        "Individual control for each corner",
        "Link corners option for uniform rounding",
        "Support for both px and % units",
        "Real-time visual preview",
        "Shape ideas and tips included",
      ],
      faqs: [
        {
          question: "Negative values?",
          answer: "Not supported; radius must be positive.",
        },
        {
          question: "Complex shapes?",
          answer: "Use different values per corner.",
        },
        {
          question: "Performance?",
          answer: "Border-radius is well-optimized.",
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
    seoTitle: "CSS Text Shadow Generator - Visual Tool",
    seoDescription:
      "Create beautiful CSS text-shadow effects with our free visual editor. Control position, blur, color, and opacity. 100% private and secure.",
    icon: <TextShadowIcon />,
    component: TextShadowGenerator,
    category: ToolCategory.CSS,
    details: {
      introduction:
        "Add depth and style to your text with custom shadow effects. Control position, blur, color, and opacity to create everything from subtle depth to dramatic glow effects.",
      explanation:
        "How does it work? Combines X/Y offsets, blur radius, and color with opacity to generate CSS text-shadow property. Updates preview text in real-time.",
      usageExamples: [
        "Creating text with depth and dimension",
        "Designing glowing text effects",
        "Adding subtle shadows to headings",
        "Building dramatic text treatments",
      ],
      underlyingConcept:
        "Text-shadow creates a shadow behind text. Defined by horizontal offset, vertical offset, blur radius, and color.",
      howToUse: [
        "Adjust the horizontal and vertical offset sliders",
        "Set the blur radius for softness",
        "Choose shadow color and adjust opacity",
        "Customize text and background colors for preview",
        "Copy the generated CSS code",
      ],
      features: [
        "Precise control over shadow position and blur",
        "Color picker with opacity control",
        "Customizable text and background colors",
        "Real-time preview with sample text",
        "Full CSS example generation",
      ],
      faqs: [
        {
          question: "Multiple shadows?",
          answer: "Not yet; comma-separated in future.",
        },
        { question: "Browser support?", answer: "Excellent; CSS3 standard." },
        { question: "Performance?", answer: "Text-shadow is well-optimized." },
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
    seoTitle: "Glassmorphism & Neumorphism Generator - CSS Tool",
    seoDescription:
      "Create modern glassmorphism and neumorphism CSS effects with our free visual generator. Perfect for contemporary web design. 100% private and secure.",
    icon: <GlassmorphismIcon />,
    component: GlassmorphismGenerator,
    category: ToolCategory.CSS,
    details: {
      introduction:
        "Create stunning modern UI effects including glassmorphism (frosted glass) and neumorphism (soft, extruded) designs. Perfect for contemporary web and mobile interfaces.",
      explanation:
        "How does it work? Glassmorphism uses backdrop-filter with transparency, neumorphism uses dual shadows. Combines multiple CSS properties for complex effects.",
      usageExamples: [
        "Building modern mobile app interfaces",
        "Creating frosted glass navigation bars",
        "Designing soft, tactile UI elements",
        "Building contemporary dashboard components",
      ],
      underlyingConcept:
        "Glassmorphism mimics frosted glass with blur + transparency. Neumorphism creates soft, extruded surfaces with dual shadows.",
      howToUse: [
        "Choose between Glassmorphism or Neumorphism style",
        "For glassmorphism: adjust opacity, blur, and border settings",
        "For neumorphism: set background color and shadow properties",
        "Fine-tune shadow position, blur, and opacity",
        "Copy the generated CSS code",
      ],
      features: [
        "Two distinct modern design styles",
        "Comprehensive control over all effect parameters",
        "Real-time visual preview with background",
        "Detailed tips and usage guidance",
        "Complete CSS code generation",
      ],
      faqs: [
        {
          question: "Browser support?",
          answer: "Glassmorphism needs modern browsers.",
        },
        {
          question: "Performance?",
          answer: "Backdrop-filter can be intensive.",
        },
        { question: "Accessibility?", answer: "Ensure sufficient contrast." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "glassmorphism css generator",
      "frosted glass effect css",
      "neumorphism ui generator",
      "css blur background",
      "modern ui design",
    ],
  },
  // Color Tools
  {
    id: "color-palette-generator",
    name: "Color Palette Generator",
    description: "Generate color palettes from a base color.",
    seoTitle: "Color Palette Generator - Create Color Schemes",
    seoDescription:
      "Generate beautiful color palettes from a base color with our free Color Palette Generator. Create monochromatic, analogous, and complementary schemes. 100% private and secure.",
    icon: <PaletteIcon />,
    component: ColorPaletteGenerator,
    category: ToolCategory.COLOR,
    details: {
      introduction:
        "Create harmonious color schemes based on a single base color. This tool can generate different types of palettes, such as monochromatic, analogous, complementary, and triadic, to help you with your design projects, solving color selection challenges.",
      explanation:
        "How does it work? Uses HSL model to adjust hue, saturation, lightness based on scheme rules (e.g., complementary adds 180 degrees hue).",
      usageExamples: [
        "Designing website themes.",
        "Creating brand color sets.",
        "Inspiring art with variations.",
      ],
      underlyingConcept:
        "Color theory: harmonious schemes from wheel positions. Monochromatic varies value, analogous adjacent hues, etc.",
      howToUse: [
        "Select your base color using the color picker or by entering a HEX code.",
        "Choose the type of palette you want to generate from the dropdown menu (e.g., Monochromatic).",
        "The tool will instantly generate and display a 5-color palette.",
        "Click on any color's HEX code to copy it to your clipboard.",
      ],
      features: [
        "Generates Monochromatic, Analogous, Complementary, and Triadic palettes.",
        "Starts from any base color you choose.",
        "Visual preview of the generated color scheme.",
        "Easy one-click copying of color codes.",
      ],
      faqs: [
        {
          question: "Custom shades?",
          answer: "Fixed 5; adjustable in future.",
        },
        {
          question: "Accessibility check?",
          answer: "No, but use contrast tools separately.",
        },
        { question: "Export?", answer: "Copy codes; no file yet." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "color palette generator",
      "color scheme generator",
      "design color combinations",
      "monochromatic color palette",
      "complementary colors",
    ],
  },
  {
    id: "color-theme-wheel",
    name: "Color Theme Generator (Color Wheel)",
    description:
      "Generate color themes using an interactive color wheel and scheme presets (analogous, complementary, triad, etc.).",
    seoTitle: "Color Theme Generator - Interactive Color Wheel",
    seoDescription:
      "Generate beautiful color themes with our interactive color wheel. Choose from analogous, complementary, and triadic schemes. 100% private and secure.",
    icon: <PaletteIcon />,
    component: ColorThemeWheel,
    category: ToolCategory.COLOR,
    details: {
      introduction:
        "Design color themes interactively with a color wheel. Pick your base hue and saturation on the wheel, set lightness, choose a scheme (monochromatic, analogous, complementary, split-complementary, triad, tetrad), and export CSS variables or JSON.",
      howToUse: [
        "Drag on the color wheel to select the hue (angle) and saturation (distance).",
        "Use the Lightness slider to adjust perceived brightness.",
        "Select a scheme from the dropdown to generate related colors.",
        "Copy individual HEX values, or export the full set as CSS variables or JSON.",
      ],
      features: [
        "Interactive color wheel for hue and saturation.",
        "Scheme presets: monochromatic, analogous, complementary, split-complementary, triad, tetrad.",
        "Live swatch preview grid.",
        "One-click export to CSS variables and JSON.",
        "All computations in-browser.",
      ],
      privacy: PRIVACY_STATEMENT,
      explanation:
        "The wheel maps pointer angle to hue (0–360°) and distance from center to saturation (0–100%). Generated palettes are computed by rotating the hue by fixed offsets for each scheme, with optional lightness variants to provide balance.",
      usageExamples: [
        "Build a UI theme quickly by selecting a base color and triad scheme for accent pairs.",
        "Create brand-compliant color sets by starting from the primary brand hue and using analogous variations.",
        "Export CSS variables to wire a theme into a design system.",
      ],
      underlyingConcept:
        "Color harmonies are based on angular relationships on the color wheel. In HSL space, rotating hue while maintaining saturation/lightness approximates classic design relationships. Practical palettes also vary lightness to provide usable contrast.",
      faqs: [
        {
          question: "Can I export more than 5 colors?",
          answer:
            "This version outputs 5 swatches per scheme; you can regenerate new sets or extend manually.",
        },
        {
          question: "Does it support alpha?",
          answer:
            "This tool focuses on opaque HEX outputs; use the Color Code Converter for alpha.",
        },
        {
          question: "Is the color wheel physically accurate?",
          answer:
            "It uses a practical HSL-based approach suitable for UI work; not a perceptually uniform space.",
        },
      ],
    },
    keywords: [
      "color wheel tool",
      "color harmony generator",
      "triadic color scheme",
      "analogous colors",
      "color picker online",
    ],
  },
  {
    id: "css-color-code-converter",
    name: "CSS Color Code Converter",
    description:
      "Convert between HEX/HEXA, RGB/RGBA, HSL/HSLA, and CSS color keywords.",
    seoTitle: "CSS Color Code Converter - HEX, RGB, HSL",
    seoDescription:
      "Convert between HEX, RGB, and HSL color codes with our free online CSS Color Code Converter. Supports alpha channels (HEXA, RGBA, HSLA). 100% private and secure.",
    icon: <ColorIcon />,
    component: CssColorCodeConverter,
    category: ToolCategory.COLOR,
    details: {
      introduction:
        "Convert color values across HEX/HEXA, RGB/RGBA, HSL/HSLA, and CSS color keywords with synchronized inputs and a live preview. Perfect for designers and developers ensuring color consistency across tools and code.",
      howToUse: [
        "Enter a color in any format: HEX/HEXA, RGB/RGBA, or HSL/HSLA.",
        "Use the alpha slider to adjust transparency (applies to RGBA/HSLA/HEXA).",
        "Optional: type a CSS color keyword (e.g., rebeccapurple) and click Resolve to convert it.",
        "Click Copy on any format to copy the current color string to the clipboard.",
      ],
      features: [
        "Bidirectional synchronization across HEX, RGB, and HSL inputs.",
        "HEXA and alpha support with a dedicated transparency slider.",
        "CSS keyword resolver (e.g., tomato, slateblue).",
        "Live preview swatch with brand-styled UI.",
        "Validation with clear error messages.",
        "All operations run locally in your browser.",
      ],
      privacy: PRIVACY_STATEMENT,
      explanation:
        "The converter parses the input format and normalizes to RGBA. RGB and HSL are converted using standard color space math. HEX/HEXA values are generated from the RGBA channels. CSS keywords are resolved by applying the keyword to a temporary element and reading the computed RGB value from the browser.",
      usageExamples: [
        "Convert a HEX brand color to HSL to create lighter/darker variants using the Lightness channel.",
        "Convert an RGBA overlay to HEXA for use in CSS variables.",
        "Translate a designer-provided HSL color to RGB for a canvas drawing routine.",
      ],
      underlyingConcept:
        "RGB is an additive color model represented by red, green, and blue channels (0-255). HSL is a cylindrical representation with hue (0-360), saturation, and lightness (0-1). HEX is a compact hex-encoded representation of RGB (with optional alpha for HEXA). Conversions use deterministic formulas between these spaces.",
      faqs: [
        {
          question: "Does it support alpha?",
          answer:
            "Yes. The alpha slider updates RGBA/HSLA and HEXA outputs. HEX (without alpha) is also available.",
        },
        {
          question: "Can it handle short HEX like #abc?",
          answer:
            "Yes. 3-digit and 4-digit short HEX/HEXA are supported and expanded to full form internally.",
        },
        {
          question: "Are named colors supported?",
          answer:
            "Yes. Enter a CSS color keyword (like rebeccapurple) and click Resolve.",
        },
      ],
    },
    keywords: [
      "hex to rgb converter",
      "hsl to hex",
      "rgba color picker",
      "css color converter",
      "color code translator",
    ],
  },
  // Math Tools
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between common units of measurement.",
    seoTitle: "Unit Converter - Length, Weight, & More",
    seoDescription:
      "Convert between common units of measurement for length, weight, and more with our free online Unit Converter. 100% private and secure.",
    icon: <UnitConverterIcon />,
    component: UnitConverter,
    category: ToolCategory.MATH,
    details: {
      introduction:
        "A versatile tool for converting between various units of measurement for length and weight. It provides quick and accurate conversions without needing to search online, solving everyday calculation needs in cooking, travel, or science.",
      explanation:
        "How does it work? Uses predefined factors (e.g., 1 inch = 2.54 cm) to multiply/divide input.",
      usageExamples: [
        "Converting recipe ingredients from grams to ounces.",
        "Planning travel distances in km to miles.",
        "Scientific data from metric to imperial.",
      ],
      underlyingConcept:
        "Unit conversion uses ratios. Base units like meter/kg, others derived. Accuracy depends on precise constants.",
      howToUse: [
        "Select the category of measurement (Length or Weight).",
        'Enter the value you wish to convert in the "From" field.',
        "Select the starting unit from the first dropdown.",
        "Select the target unit from the second dropdown.",
        'The converted value will instantly appear in the "To" field.',
      ],
      features: [
        "Supports Length (meters, km, cm, miles, feet, inches) and Weight (kg, g, mg, pounds, ounces).",
        "Intuitive interface for quick conversions.",
        "Real-time calculation as you input values.",
      ],
      faqs: [
        {
          question: "More categories?",
          answer: "Length/weight now; volume/temp future.",
        },
        { question: "Precision?", answer: "Up to decimals; rounds sensibly." },
        { question: "Custom units?", answer: "No, standard only." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "unit converter online",
      "metric to imperial converter",
      "length converter",
      "weight converter",
      "measurement conversion",
    ],
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    description: "Convert between currencies with near real-time rates.",
    seoTitle: "Currency Converter - Live Exchange Rates",
    seoDescription:
      "Convert between currencies with near real-time exchange rates using our free Currency Converter. Supports a wide range of global currencies. 100% private and secure.",
    icon: <CurrencyIcon />,
    component: CurrencyConverter,
    category: ToolCategory.MATH,
    details: {
      introduction:
        "This Currency Converter provides exchange rates for a wide range of global currencies. It fetches up-to-date rates to give you an accurate conversion based on the latest financial data, useful for travel, shopping, or finance.",
      explanation:
        "How does it work? Fetches rates from API, multiplies amount by rate.",
      usageExamples: [
        "Travelers checking costs abroad.",
        "Online shoppers comparing prices.",
        "Businesses calculating invoices.",
      ],
      underlyingConcept:
        "Exchange rates fluctuate based on markets. Conversion is simple multiplication, but rates update frequently.",
      howToUse: [
        'Enter the amount you want to convert in either the "From" or "To" field.',
        "Select your desired currencies from the dropdown menus.",
        "The tool will automatically calculate and display the converted amount.",
        "Click the swap button to easily reverse the conversion direction.",
      ],
      features: [
        "Uses up-to-date exchange rates from an external API.",
        "Supports a large number of international currencies.",
        "Two-way conversion (editing either amount updates the other).",
      ],
      faqs: [
        {
          question: "How current are rates?",
          answer: "Updated daily or hourly via API.",
        },
        { question: "Fees included?", answer: "No, mid-market rates." },
        { question: "Offline?", answer: "Needs internet for rates." },
      ],
      privacy:
        "This tool fetches exchange rates from a third-party API (open.er-api.com). The amounts and currencies you select are used for calculation in your browser and are not sent to our servers. Please refer to the API provider's privacy policy for their data handling practices.",
    },
    keywords: [
      "currency converter online",
      "exchange rate calculator",
      "forex converter",
      "dollar to euro",
      "live exchange rates",
    ],
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index.",
    seoTitle: "BMI Calculator - Check Your Body Mass Index",
    seoDescription:
      "Calculate your Body Mass Index (BMI) with our free online BMI Calculator. Supports both metric and imperial units. 100% private and secure.",
    icon: <BmiIcon />,
    component: BmiCalculator,
    category: ToolCategory.MATH,
    details: {
      introduction:
        "The Body Mass Index (BMI) Calculator is a tool that helps estimate body fat based on your weight and height. It provides a general indication of whether you are in a healthy weight range for your height, aiding health awareness.",
      explanation:
        "How does it work? BMI = weight / height^2 (kg/m2), categorizes based on WHO ranges.",
      usageExamples: [
        "Personal health tracking.",
        "Fitness apps input.",
        "Medical quick checks.",
      ],
      underlyingConcept:
        "BMI, devised by Quetelet in 1830s, correlates height/weight to fat. Limitations exist for athletes, but useful screen.",
      howToUse: [
        "Select your preferred unit system (Metric or Imperial).",
        "Enter your height and weight in the appropriate fields.",
        "The tool will automatically calculate your BMI and display the result.",
        "Your BMI category (e.g., Underweight, Normal, Overweight) will also be shown.",
      ],
      features: [
        "Supports both Metric (cm/kg) and Imperial (ft, in/lbs) units.",
        "Instant BMI calculation.",
        "Provides BMI value and corresponding weight status category.",
        "Color-coded results for easy interpretation.",
      ],
      faqs: [
        {
          question: "Accurate for all?",
          answer: "General; not for kids/athletes.",
        },
        { question: "What's healthy BMI?", answer: "18.5-24.9 typically." },
        { question: "Alternatives?", answer: "Body fat %, waist ratio." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "bmi calculator",
      "body mass index calculator",
      "healthy weight calculator",
      "bmi chart",
      "fitness calculator",
    ],
  },
  {
    id: "date-calculator",
    name: "Date Calculator",
    description: "Calculate duration between dates or add/subtract days.",
    seoTitle: "Date Calculator - Add/Subtract Days & Find Duration",
    seoDescription:
      "Calculate the duration between two dates or find a future/past date by adding or subtracting days with our free online Date Calculator. 100% private and secure.",
    icon: <DateCalcIcon />,
    component: DateCalculator,
    category: ToolCategory.MATH,
    details: {
      introduction:
        "This versatile Date Calculator has two modes. It can calculate the total duration (in days and weeks) between two dates, or it can calculate a future or past date by adding or subtracting a specific number of days from a starting date. Useful for planning, deadlines.",
      explanation:
        "How does it work? Uses Date objects, milliseconds differences for duration, setDate for add/subtract.",
      usageExamples: [
        "Calculating age in days.",
        "Project deadline projections.",
        "Vacation duration.",
      ],
      underlyingConcept:
        "Date math handles Gregorian calendar, leap years. Duration is (end - start) / 86400000 ms/day.",
      howToUse: [
        'Select a mode: "Duration Between Dates" or "Add/Subtract Days".',
        "For Duration mode: select a Start Date and an End Date to see the time between them.",
        'For Add/Subtract mode: select a Start Date, choose "Add" or "Subtract", and enter the number of days to calculate the resulting date.',
      ],
      features: [
        "Dual modes for flexible date calculations.",
        "Calculates duration in both days and weeks.",
        "Easily add or subtract days from any given date.",
        "User-friendly date pickers for easy input.",
      ],
      faqs: [
        { question: "Leap years?", answer: "Handled automatically." },
        { question: "Time zones?", answer: "Local time." },
        { question: "Months/years add?", answer: "Days only now." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "date calculator",
      "days between dates",
      "add days to date",
      "time duration calculator",
      "date difference",
    ],
  },
  // Productivity Tools
  {
    id: "world-clock",
    name: "World Clock",
    description: "Display and compare the current time in different cities.",
    seoTitle: "World Clock - Compare Time in Different Cities",
    seoDescription:
      "Display and compare the current time in multiple cities around the world with our free online World Clock. Perfect for international teams. 100% private and secure.",
    icon: <WorldClockIcon />,
    component: WorldClock,
    category: ToolCategory.PRODUCTIVITY,
    details: {
      introduction:
        "Keep track of the current time in multiple cities around the world. This tool is perfect for coordinating with international teams, scheduling meetings across time zones, or simply staying connected with friends and family abroad.",
      explanation:
        "How does it work? Uses Intl.DateTimeFormat with timeZone option to format local time for each city.",
      usageExamples: [
        "Remote workers syncing with global offices.",
        "Travelers checking home time.",
        "Event planners for international calls.",
      ],
      underlyingConcept:
        "Time zones are UTC offsets. Tool calculates from system time, handling DST via browser API.",
      howToUse: [
        "The clock displays a default set of cities.",
        "To add a new city, select one from the dropdown menu.",
        "To remove a city, click the trash can icon next to it.",
        "Your selected cities are saved in your browser for your next visit.",
      ],
      features: [
        "Displays time for multiple locations simultaneously.",
        "Shows both the time and the current date for each location.",
        "Your list of clocks is saved locally using `localStorage`.",
        "Real-time updates every second.",
      ],
      faqs: [
        { question: "DST handling?", answer: "Automatic via browser." },
        { question: "City list?", answer: "Common ones; searchable." },
        { question: "Offline?", answer: "Yes, but time from system." },
      ],
      privacy:
        "Your selected clock preferences are stored in your browser's `localStorage` and are not sent to any server.",
    },
    keywords: [
      "world clock",
      "time in different cities",
      "global time checker",
      "time zone comparison",
      "international time",
    ],
  },
  {
    id: "timers-stopwatch",
    name: "Timers & Stopwatch",
    description: "Use a countdown timer or a stopwatch with lap functionality.",
    seoTitle: "Timers & Stopwatch - Online Countdown & Lap Timer",
    seoDescription:
      "Use our free online Timer and Stopwatch with lap functionality. Perfect for workouts, cooking, and timing events. 100% private and secure.",
    icon: <TimersIcon />,
    component: TimersAndStopwatch,
    category: ToolCategory.PRODUCTIVITY,
    details: {
      introduction:
        "A multi-function timekeeping tool. Use the countdown Timer for tasks with a set duration, or switch to the Stopwatch to accurately measure elapsed time, complete with lap tracking. Great for workouts, cooking, or timing events.",
      explanation:
        "How does it work? Uses setInterval for ticking, notifications for timer end.",
      usageExamples: [
        "Timing study sessions.",
        "Tracking race laps.",
        "Cooking reminders.",
      ],
      underlyingConcept:
        "Timing uses system clock. Stopwatch accumulates, timer decrements. Laps snapshot intervals.",
      howToUse: [
        'Select either "Timer" or "Stopwatch" mode.',
        'For the Timer: set the hours, minutes, and seconds, then click "Start". You can also pause and reset.',
        'For the Stopwatch: click "Start" to begin timing, "Stop" to pause, "Lap" to record a lap time, and "Reset" to clear.',
      ],
      features: [
        "Easy-to-use countdown timer with desktop notifications (if permission is granted).",
        "Precise stopwatch with millisecond accuracy.",
        "Lap recording functionality to track split times.",
        "Clean interface showing only the relevant controls for each mode.",
      ],
      faqs: [
        {
          question: "Background running?",
          answer: "Browser may throttle; keep tab open.",
        },
        { question: "Sound?", answer: "Yes for timer end." },
        { question: "Multiple timers?", answer: "Single now." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "online stopwatch",
      "countdown timer",
      "lap timer",
      "kitchen timer",
      "study timer",
    ],
  },
  {
    id: "todo-list",
    name: "To-Do List",
    description: "A simple to-do list that saves your tasks in the browser.",
    seoTitle: "To-Do List - Simple & Persistent Online",
    seoDescription:
      "A simple and persistent to-do list that saves your tasks in your browser. Organize your day with our free To-Do List tool. 100% private and secure.",
    icon: <TodoIcon />,
    component: TodoList,
    category: ToolCategory.PRODUCTIVITY,
    details: {
      introduction:
        "A straightforward and persistent to-do list to help you stay organized. Add tasks, mark them as complete, and filter your view. Your tasks are automatically saved in your browser's local storage, for daily planning.",
      explanation:
        "How does it work? Stores array in localStorage, updates UI on changes.",
      usageExamples: ["Daily chores.", "Work tasks.", "Shopping lists."],
      underlyingConcept:
        "Task management with states (active/complete). Persistence via key-value storage.",
      howToUse: [
        'Type a new task into the input field and press Enter or click "Add".',
        "Click the checkbox next to a task to mark it as completed.",
        'Click the "X" icon to delete a task.',
        'Use the filter buttons ("All", "Active", "Completed") to change your view.',
      ],
      features: [
        "Add, complete, and delete tasks.",
        "Filter tasks to see all, only active, or only completed items.",
        "Data is saved to `localStorage`, so your tasks persist between sessions.",
        "Clean and minimalist design.",
      ],
      faqs: [
        { question: "Sync across devices?", answer: "No, local only." },
        { question: "Priorities?", answer: "Basic; no yet." },
        { question: "Export?", answer: "Copy manually." },
      ],
      privacy:
        "Your to-do list is stored in your browser's `localStorage`. This data is not transmitted to our servers and remains private to your device.",
    },
    keywords: [
      "online todo list",
      "task manager app",
      "simple to-do list",
      "daily planner online",
      "persistent todo list",
    ],
  },
  {
    id: "pomodoro-timer",
    name: "Pomodoro Timer",
    description:
      "A simple timer to help you focus with the Pomodoro Technique.",
    seoTitle: "Pomodoro Timer - Focus & Productivity Tool",
    seoDescription:
      "Improve your focus and productivity with our free online Pomodoro Timer. Alternates between 25-minute work sessions and 5-minute breaks. 100% private and secure.",
    icon: <PomodoroIcon />,
    component: PomodoroTimer,
    category: ToolCategory.PRODUCTIVITY,
    featured: true,
    details: {
      tip: "Don't skip the breaks! The 5-minute rests in the Pomodoro Technique are just as important as the 25-minute focus sessions. They help your brain recharge.",
      introduction:
        "The Pomodoro Timer helps you manage your time and stay focused using the Pomodoro Technique. It alternates between focused work sessions (typically 25 minutes) and short breaks (5 minutes) to improve productivity and prevent burnout.",
      explanation:
        "How does it work? Counts down, switches modes, plays sound at end.",
      usageExamples: [
        "Studying with breaks.",
        "Work focus sessions.",
        "Task batching.",
      ],
      underlyingConcept:
        "Pomodoro by Cirillo: 25 min work, 5 min break. Enhances focus via time boxing.",
      howToUse: [
        'Click the "Start" button to begin a 25-minute work session.',
        "The timer will count down, and a progress ring will visualize the remaining time.",
        "When the timer finishes, a sound will play, and it will automatically switch to a 5-minute break.",
        'Click "Pause" to stop the timer and "Reset" to return to the initial 25-minute work session.',
      ],
      features: [
        "Standard 25-minute work and 5-minute break intervals.",
        "Visual progress indicator.",
        "Audio notification when a session ends.",
        "Simple Start, Pause, and Reset controls.",
      ],
      faqs: [
        { question: "Custom times?", answer: "Fixed now; adjustable future." },
        { question: "Long breaks?", answer: "After 4 pomodoros manually." },
        { question: "Sound customizable?", answer: "Default only." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "pomodoro timer online",
      "focus timer",
      "25 minute timer",
      "study timer app",
      "productivity timer",
    ],
  },
  // Fun Tools
  {
    id: "meme-generator",
    name: "Meme Generator",
    description: "Create your own memes by adding text to an image.",
    seoTitle: "Meme Generator - Create Memes Online",
    seoDescription:
      "Create your own memes by adding text to an image with our free online Meme Generator. Upload your own image and share your creation. 100% private and secure.",
    icon: <MemeIcon />,
    component: MemeGenerator,
    category: ToolCategory.FUN,
    details: {
      introduction:
        "Create classic-style memes with this easy-to-use generator. Upload your own image, add top and bottom text, and download your creation to share. Fun for social media or humor.",
      explanation:
        "How does it work? Draws image on canvas, overlays text with Impact font.",
      usageExamples: [
        "Making jokes for friends.",
        "Social media posts.",
        "Marketing with humor.",
      ],
      underlyingConcept:
        "Memes are cultural ideas spread virally. Generator mimics Advice Animal style with bold text.",
      howToUse: [
        'Click "Upload an Image" to select a picture from your device.',
        'Enter your desired text in the "Top Text" and "Bottom Text" input fields.',
        "The meme will be generated in real-time in the preview area.",
        'When you\'re happy with it, click "Download Meme" to save it as a PNG file.',
      ],
      features: [
        "Works with any image you upload.",
        "Classic Impact font with white text and a black outline for maximum readability.",
        "Live preview of your meme as you type.",
        "Easy one-click download.",
      ],
      faqs: [
        { question: "Templates?", answer: "Upload own; no built-in." },
        { question: "Text position?", answer: "Top/bottom fixed." },
        { question: "File size?", answer: "Depends on image." },
      ],
      privacy:
        "All image processing and text rendering happens in your browser. Your images are not uploaded to any server.",
    },
    keywords: [
      "meme generator online",
      "create your own meme",
      "image captioner",
      "meme maker",
      "funny meme creator",
    ],
  },
  // Misc Tools
  {
    id: "password-generator",
    name: "Password Generator",
    description:
      "Create strong, random passwords with customizable security options.",
    seoTitle: "Password Generator - Create Strong Passwords",
    seoDescription:
      "Generate strong, secure, and random passwords with our free online Password Generator. Customize length and character types. 100% private and secure.",
    icon: <PasswordIcon />,
    component: PasswordGenerator,
    category: ToolCategory.MISC,
    featured: true,
    details: {
      tip: "A great password is long, random, and unique. Aim for at least 16 characters and use a password manager so you don't have to remember them all!",
      introduction:
        "Generate strong, secure, and random passwords to protect your online accounts. This tool uses the browser's cryptographically secure random number generator for high-quality randomness, helping prevent weak password vulnerabilities.",
      explanation:
        "How does it work? Builds charset from options, picks random chars with crypto.getRandomValues.",
      usageExamples: [
        "New account creation.",
        "Password resets.",
        "Security audits.",
      ],
      underlyingConcept:
        "Strong passwords have high entropy. Random selection from large set resists brute force.",
      howToUse: [
        'Adjust the "Length" slider to set the desired password length.',
        "Use the checkboxes to include or exclude uppercase letters, lowercase letters, numbers, and symbols.",
        "A new password that meets your criteria will be generated automatically.",
        'Click "Regenerate" to create a new password with the same settings, or click "Copy" to copy the current one.',
      ],
      features: [
        "Customizable password length (4-64 characters).",
        "Options to include uppercase, lowercase, numbers, and symbols.",
        "Uses the secure `crypto.getRandomValues` browser API.",
        "One-click copy to clipboard.",
      ],
      faqs: [
        { question: "How secure?", answer: "Cryptographic random." },
        { question: "Memorable?", answer: "Random; use manager." },
        { question: "Min length?", answer: "12 recommended." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "strong password generator",
      "random password creator",
      "secure password maker",
      "password security",
      "cryptographically secure password",
    ],
  },
  {
    id: "qrcode-generator",
    name: "QR Code Generator",
    description: "Generate a QR code from a URL or text.",
    seoTitle: "QR Code Generator - Create QR Codes Online",
    seoDescription:
      "Generate a QR code from any URL or text with our free online QR Code Generator. Download your QR code as a high-quality PNG. 100% private and secure.",
    icon: <QrCodeIcon />,
    component: QrCodeGenerator,
    category: ToolCategory.MISC,
    details: {
      introduction:
        "Create a QR Code from any text or URL. QR Codes are scannable barcodes that can store information and are easily read by smartphones, perfect for sharing links, contact info, or Wi-Fi credentials, simplifying data transfer.",
      explanation:
        "How does it work? Uses library like qrcode to encode data to matrix, render as image.",
      usageExamples: [
        "Sharing website links on posters.",
        "Quick Wi-Fi access.",
        "Product info in stores.",
      ],
      underlyingConcept:
        "QR (Quick Response) from 1994, matrix barcode with error correction. Encodes text to patterns readable by cameras.",
      howToUse: [
        "Enter the text or URL you want to encode into the text area.",
        "The QR code image will be generated automatically in the preview area.",
        'Click the "Download QR Code" button to save the image as a PNG file.',
      ],
      features: [
        "Real-time QR code generation.",
        "Works with any text-based input, including URLs.",
        "High-quality PNG download.",
        "Simple and fast interface.",
      ],
      faqs: [
        { question: "Error correction?", answer: "Medium level." },
        { question: "Size?", answer: "Auto; scalable." },
        { question: "Colors?", answer: "Black/white; custom future." },
      ],
      privacy: PRIVACY_STATEMENT,
    },
    keywords: [
      "qr code generator online",
      "free qr code maker",
      "text to qr code",
      "url to qr code",
      "generate qr code",
    ],
  },
  {
    id: "video-compressor",
    name: "Video Compressor",
    description:
      "Reduce the file size of your videos without significant quality loss.",
    seoTitle: "Video Compressor - Reduce Video File Size Online",
    seoDescription:
      "Reduce the file size of your videos without significant quality loss with our free online Video Compressor. Supports various video formats. 100% private and secure.",
    icon: <VideoCompressorIcon />,
    category: ToolCategory.VIDEO,
    component: VideoCompressor,
    details: {
      introduction:
        "The Video Compressor helps you shrink video files to save space or for easier sharing, all within your browser.",
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        'Click the "Compress Video" button.',
        "Wait for the compression to finish.",
        "Download your compressed video.",
      ],
      features: [
        "Reduce video file size without significant quality loss",
        "Works entirely in your browser for privacy",
        "Supports various video formats",
        "Fast compression processing",
      ],
      privacy:
        "All video processing happens locally in your browser. No files are uploaded to our servers.",
      explanation:
        "Video compression reduces file size by removing redundant data and optimizing encoding parameters while maintaining visual quality.",
      usageExamples: [
        "Compress large video files for email attachments",
        "Reduce video size for faster web uploads",
        "Create smaller files for mobile sharing",
      ],
      underlyingConcept:
        "Video compression uses algorithms to reduce file size by removing spatial and temporal redundancy in video data.",
      faqs: [
        {
          question: "Will compression affect video quality?",
          answer:
            "The tool uses smart compression algorithms to minimize quality loss while significantly reducing file size.",
        },
        {
          question: "What video formats are supported?",
          answer:
            "The tool supports most common video formats including MP4, AVI, MOV, and more.",
        },
      ],
    },
  },
  {
    id: "video-to-audio-converter",
    name: "Video to Audio Converter",
    description: "Extract audio from your video files and save it as an MP3.",
    seoTitle: "Video to Audio Converter - Extract MP3 from Video",
    seoDescription:
      "Extract audio from your video files and save it as an MP3 with our free online Video to Audio Converter. Supports various video formats. 100% private and secure.",
    icon: <VideoToAudioIcon />,
    category: ToolCategory.VIDEO,
    component: VideoToAudioConverter,
    details: {
      introduction:
        "This tool allows you to easily convert video files to high-quality MP3 audio.",
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        'Click the "Convert to Audio" button.',
        "Wait for the conversion to finish.",
        "Download your audio file.",
      ],
      features: [
        "Extract audio from video files",
        "Convert to high-quality MP3 format",
        "Works entirely in your browser",
        "Supports various video formats",
      ],
      privacy:
        "All video processing happens locally in your browser. No files are uploaded to our servers.",
      explanation:
        "This tool extracts the audio track from video files and converts it to MP3 format for easy sharing and storage.",
      usageExamples: [
        "Extract music from video files",
        "Create audio podcasts from video content",
        "Convert video lectures to audio for listening on the go",
      ],
      underlyingConcept:
        "Audio extraction involves separating the audio track from video data and encoding it in MP3 format.",
      faqs: [
        {
          question: "What audio quality will I get?",
          answer:
            "The tool extracts audio at the original quality from your video file and converts it to high-quality MP3.",
        },
        {
          question: "Can I extract audio from any video format?",
          answer:
            "Yes, the tool supports most common video formats including MP4, AVI, MOV, and more.",
        },
      ],
    },
  },
  {
    id: "gif-maker",
    name: "GIF Maker from Video",
    description: "Create animated GIFs from your video files.",
    seoTitle: "GIF Maker from Video - Create Animated GIFs Online",
    seoDescription:
      "Create animated GIFs from your video files with our free online GIF Maker. Convert video segments to high-quality animated GIFs. 100% private and secure.",
    icon: <GifMakerIcon />,
    category: ToolCategory.VIDEO,
    component: GifMaker,
    details: {
      introduction:
        "This tool helps you convert segments of your videos into high-quality animated GIFs.",
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        'Click the "Create GIF" button.',
        "Wait for the GIF to be created.",
        "Download your new GIF.",
      ],
      features: [
        "Convert video segments to animated GIFs",
        "High-quality GIF output",
        "Works entirely in your browser",
        "Supports various video formats",
      ],
      privacy:
        "All video processing happens locally in your browser. No files are uploaded to our servers.",
      explanation:
        "This tool extracts frames from your video and combines them into an animated GIF format.",
      usageExamples: [
        "Create GIFs from funny video moments",
        "Convert video tutorials to animated GIFs",
        "Make GIFs from video clips for social media",
      ],
      underlyingConcept:
        "GIF creation involves extracting frames from video at regular intervals and encoding them as an animated sequence.",
      faqs: [
        {
          question: "What video formats are supported?",
          answer:
            "The tool supports most common video formats including MP4, AVI, MOV, and more.",
        },
        {
          question: "Can I control the GIF quality?",
          answer:
            "The tool automatically optimizes GIF quality while keeping file size reasonable for web use.",
        },
      ],
    },
  },
  {
    id: "trim-video",
    name: "Trim Video",
    description: "Cut and trim your video files to get the perfect clip.",
    seoTitle: "Trim Video - Cut & Trim Videos Online",
    seoDescription:
      "Cut and trim your video files to get the perfect clip with our free online Video Trimmer. Supports various video formats. 100% private and secure.",
    icon: <TrimVideoIcon />,
    category: ToolCategory.VIDEO,
    component: TrimVideo,
    details: {
      introduction:
        "This tool allows you to easily trim the start and end of your video files.",
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        "Set the start and end times for the trim.",
        'Click the "Trim Video" button.',
        "Wait for the video to be trimmed.",
        "Download your trimmed video.",
      ],
      features: [
        "Trim video start and end points",
        "Precise time control",
        "Works entirely in your browser",
        "Supports various video formats",
      ],
      privacy:
        "All video processing happens locally in your browser. No files are uploaded to our servers.",
      explanation:
        "This tool allows you to cut unwanted portions from the beginning or end of your video files.",
      usageExamples: [
        "Remove intro/outro from videos",
        "Create shorter clips from long videos",
        "Trim videos for social media platforms",
      ],
      underlyingConcept:
        "Video trimming involves cutting specific time segments from video files while preserving quality.",
      faqs: [
        {
          question: "Can I trim from the middle of a video?",
          answer:
            "Currently, the tool supports trimming from the start and end. For middle cuts, you may need to trim multiple times.",
        },
        {
          question: "What video formats are supported?",
          answer:
            "The tool supports most common video formats including MP4, AVI, MOV, and more.",
        },
      ],
    },
  },
  {
    id: "format-converter",
    name: "Video Format Converter",
    description:
      "Convert your video files to different formats like MP4, AVI, MOV, etc.",
    seoTitle: "Video Format Converter - Convert Videos Online",
    seoDescription:
      "Convert your video files to different formats like MP4, AVI, MOV, and more with our free online Video Format Converter. 100% private and secure.",
    icon: <FormatConverterIcon />,
    category: ToolCategory.VIDEO,
    component: FormatConverter,
    details: {
      introduction:
        "This tool allows you to easily convert your video files to various formats.",
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        "Select the desired output format.",
        'Click the "Convert Format" button.',
        "Wait for the conversion to finish.",
        "Download your converted video.",
      ],
      features: [
        "Convert between multiple video formats",
        "Supports MP4, AVI, MOV, and more",
        "Works entirely in your browser",
        "Maintains video quality",
      ],
      privacy:
        "All video processing happens locally in your browser. No files are uploaded to our servers.",
      explanation:
        "This tool converts video files from one format to another while preserving quality and compatibility.",
      usageExamples: [
        "Convert videos for different devices",
        "Change format for better compatibility",
        "Convert videos for specific applications",
      ],
      underlyingConcept:
        "Format conversion involves decoding video from one format and re-encoding it in another format.",
      faqs: [
        {
          question: "Will conversion affect video quality?",
          answer:
            "The tool uses high-quality conversion algorithms to minimize quality loss during format changes.",
        },
        {
          question: "What formats are supported?",
          answer:
            "The tool supports most common formats including MP4, AVI, MOV, WebM, and more.",
        },
      ],
    },
  },
  {
    id: "video-thumbnail-extractor",
    name: "Video Thumbnail Extractor",
    description: "Extract thumbnails (frames) from your video files.",
    seoTitle: "Video Thumbnail Extractor - Get Frames from Video",
    seoDescription:
      "Extract thumbnails (frames) from your video files with our free online Video Thumbnail Extractor. Supports various video formats. 100% private and secure.",
    icon: <VideoThumbnailIcon />,
    category: ToolCategory.VIDEO,
    component: VideoThumbnailExtractor,
    details: {
      introduction:
        "This tool helps you capture a specific frame from a video and save it as an image.",
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        "Enter the timestamp (in seconds) of the frame you want to extract.",
        'Click the "Extract Thumbnail" button.',
        "Wait for the thumbnail to be extracted.",
        "Download your thumbnail image.",
      ],
      features: [
        "Extract frames at specific timestamps",
        "High-quality image output",
        "Works entirely in your browser",
        "Supports various video formats",
      ],
      privacy:
        "All video processing happens locally in your browser. No files are uploaded to our servers.",
      explanation:
        "This tool extracts a specific frame from your video at the timestamp you specify and saves it as an image.",
      usageExamples: [
        "Create thumbnails for video previews",
        "Extract frames for analysis",
        "Capture screenshots from videos",
      ],
      underlyingConcept:
        "Frame extraction involves seeking to a specific timestamp in the video and capturing that frame as an image.",
      faqs: [
        {
          question: "How accurate is the timestamp?",
          answer:
            "The tool extracts frames at the exact timestamp you specify, with frame-level accuracy.",
        },
        {
          question: "What image formats are supported?",
          answer:
            "The tool outputs high-quality images in common formats like PNG and JPEG.",
        },
      ],
    },
  },
  {
    id: "video-mute",
    name: "Mute Video",
    description: "Remove the audio track from a video file.",
    seoTitle: "Mute Video - Remove Audio from Video Online",
    seoDescription:
      "Remove the audio track from a video file with our free online Video Muter. Supports various video formats. 100% private and secure.",
    icon: <VideoMuteIcon />,
    category: ToolCategory.VIDEO,
    component: VideoMute,
    details: {
      introduction:
        "This tool allows you to easily mute a video by removing its audio track completely.",
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        'Click the "Mute Video" button.',
        "Wait for the video to be processed.",
        "Download your muted video.",
      ],
      features: [
        "Remove audio track from videos",
        "Preserve video quality",
        "Works entirely in your browser",
        "Supports various video formats",
      ],
      privacy:
        "All video processing happens locally in your browser. No files are uploaded to our servers.",
      explanation:
        "This tool removes the audio track from your video file while keeping the video content intact.",
      usageExamples: [
        "Create silent videos for presentations",
        "Remove unwanted audio from videos",
        "Prepare videos for silent playback",
      ],
      underlyingConcept:
        "Audio removal involves extracting the video stream while discarding the audio stream from the video file.",
      faqs: [
        {
          question: "Will the video quality be affected?",
          answer:
            "No, only the audio track is removed. The video quality remains exactly the same.",
        },
        {
          question: "Can I add audio back later?",
          answer:
            "Yes, you can use other tools to add new audio tracks to your muted video.",
        },
      ],
    },
  },
  {
    id: "watermark-adder",
    name: "Watermark Adder",
    description:
      "Add watermarks or logos to your images with customizable positioning and opacity.",
    seoTitle: "Watermark Adder - Add Watermark to Images Online",
    seoDescription:
      "Add watermarks or logos to your images with our free online Watermark Adder. Customize position, size, and opacity. 100% private and secure.",
    icon: <WatermarkAdderIcon />,
    category: ToolCategory.IMAGE,
    component: WatermarkAdder,
    details: {
      introduction:
        "The Watermark Adder allows you to add watermarks or logos to your images with full control over positioning, size, and opacity.",
      howToUse: [
        'Upload your main image using the "Upload Main Image" section.',
        'Upload your watermark/logo using the "Upload Watermark/Logo" section.',
        "Adjust the watermark settings: opacity, size, position, and margin.",
        "Preview the result and download your watermarked image.",
      ],
      features: [
        "Add custom watermarks or logos to images",
        "Adjustable opacity (10% to 100%)",
        "Flexible positioning (5 positions)",
        "Customizable size (5% to 50% of image)",
        "Adjustable margin from edges",
        "Real-time preview",
        "High-quality output",
        "Works entirely in your browser",
      ],
      privacy:
        "All image processing happens locally in your browser. No files are uploaded to our servers.",
      explanation:
        "This tool uses HTML5 Canvas to overlay your watermark onto the main image with customizable settings for professional results.",
      usageExamples: [
        "Add company logos to photos",
        "Create branded images for social media",
        "Add copyright watermarks to protect images",
        "Create professional presentations with branded images",
      ],
      underlyingConcept:
        "The tool uses HTML5 Canvas to draw the main image and then overlay the watermark with specified opacity, position, and size settings.",
      faqs: [
        {
          question: "What image formats are supported?",
          answer:
            "The tool supports all common image formats including PNG, JPEG, GIF, and WebP.",
        },
        {
          question: "Will the watermark quality be preserved?",
          answer:
            "Yes, the watermark maintains its original quality and is scaled proportionally.",
        },
        {
          question: "Can I adjust the watermark after adding it?",
          answer:
            "Yes, you can adjust all settings (opacity, position, size, margin) and the changes will be applied in real-time.",
        },
        {
          question: "What is the maximum file size?",
          answer:
            "Main images can be up to 50MB and watermarks up to 10MB for optimal performance.",
        },
      ],
    },
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description:
      "Resize images by percentage or exact dimensions with aspect ratio preservation.",
    seoTitle: "Image Resizer - Resize Images Online",
    seoDescription:
      "Resize images by percentage or exact dimensions with our free online Image Resizer. Preserve aspect ratio and adjust quality. 100% private and secure.",
    icon: <ImageResizerIcon />,
    category: ToolCategory.IMAGE,
    component: ImageResizer,
    details: {
      introduction:
        "The Image Resizer allows you to resize images using percentage scaling or exact pixel dimensions, with options to preserve aspect ratio and adjust quality.",
      howToUse: [
        "Upload your image using the file upload section.",
        "Choose between percentage or dimension-based resizing.",
        "Adjust the resize settings (percentage, width, height, quality).",
        'Toggle "Keep aspect ratio" to maintain proportions.',
        "Preview the resized image and download the result.",
      ],
      features: [
        "Resize by percentage (1% to 500%)",
        "Resize by exact pixel dimensions",
        "Preserve aspect ratio option",
        "Adjustable output quality (10% to 100%)",
        "Real-time preview of original and resized images",
        "Display original and resized dimensions",
        "File size comparison",
        "High-quality output with HTML5 Canvas",
        "Works entirely in your browser",
      ],
      privacy:
        "All image processing happens locally in your browser. No files are uploaded to our servers.",
      explanation:
        "This tool uses HTML5 Canvas to resize images with precise control over dimensions, quality, and aspect ratio preservation.",
      usageExamples: [
        "Resize photos for web use",
        "Create thumbnails from large images",
        "Optimize images for social media",
        "Scale images for presentations",
        "Batch resize for consistent dimensions",
      ],
      underlyingConcept:
        "The tool uses HTML5 Canvas to draw the original image at the new dimensions, applying quality settings during the conversion process.",
      faqs: [
        {
          question: "What image formats are supported?",
          answer:
            "The tool supports all common image formats including PNG, JPEG, GIF, and WebP. Output is always in JPEG format.",
        },
        {
          question: "Will image quality be affected?",
          answer:
            "Quality can be adjusted from 10% to 100%. Higher quality settings result in larger file sizes but better image quality.",
        },
        {
          question: "How does aspect ratio preservation work?",
          answer:
            "When enabled, the tool maintains the original proportions by scaling one dimension and calculating the other automatically.",
        },
        {
          question: "What is the maximum image size?",
          answer:
            "Input images can be up to 50MB. Output dimensions can be set up to 4000x4000 pixels.",
        },
      ],
    },
  },
  {
    id: "image-converter",
    name: "Image Converter",
    description:
      "Convert images between different formats (JPEG, PNG, WebP, BMP) with quality control.",
    seoTitle: "Image Converter - Convert Images Online",
    seoDescription:
      "Convert images between different formats (JPEG, PNG, WebP, BMP) with our free online Image Converter. Adjust quality and handle transparency. 100% private and secure.",
    icon: <ImageConverterIcon />,
    category: ToolCategory.IMAGE,
    component: ImageConverter,
    details: {
      introduction:
        "The Image Converter allows you to convert images between different formats including JPEG, PNG, WebP, and BMP with customizable quality settings.",
      howToUse: [
        "Upload your image using the file upload section.",
        "Select the desired output format (JPEG, PNG, WebP, or BMP).",
        "Adjust quality settings for JPEG and WebP formats.",
        "Enable transparency removal for JPEG conversion if needed.",
        "Preview the converted image and download the result.",
      ],
      features: [
        "Convert between JPEG, PNG, WebP, and BMP formats",
        "Adjustable quality settings (10% to 100%)",
        "Transparency handling for JPEG conversion",
        "Real-time preview of original and converted images",
        "Format-specific optimization",
        "High-quality output with HTML5 Canvas",
        "Works entirely in your browser",
      ],
      privacy:
        "All image processing happens locally in your browser. No files are uploaded to our servers.",
      explanation:
        "This tool uses HTML5 Canvas to convert images between different formats while maintaining quality and handling transparency appropriately.",
      usageExamples: [
        "Convert PNG to JPEG for web use",
        "Convert JPEG to WebP for better compression",
        "Convert images to BMP for legacy systems",
        "Remove transparency from PNG images",
        "Optimize images for different platforms",
      ],
      underlyingConcept:
        "The tool uses HTML5 Canvas to draw the original image and export it in the desired format with appropriate quality settings.",
      faqs: [
        {
          question: "What image formats are supported?",
          answer:
            "The tool supports input from all common image formats and can output to JPEG, PNG, WebP, and BMP formats.",
        },
        {
          question: "Will transparency be preserved?",
          answer:
            "Transparency is preserved in PNG and WebP formats. For JPEG conversion, you can choose to remove transparency with a white background.",
        },
        {
          question: "Which format should I choose?",
          answer:
            "JPEG for photos, PNG for graphics with transparency, WebP for modern web use, and BMP for uncompressed images.",
        },
        {
          question: "What is the maximum file size?",
          answer: "Input images can be up to 50MB for optimal performance.",
        },
      ],
    },
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description:
      "Compress images to reduce file size while maintaining quality with advanced compression options.",
    seoTitle: "Image Compressor - Compress Images Online",
    seoDescription:
      "Compress images to reduce file size while maintaining quality with our free online Image Compressor. Supports JPEG, PNG, and WebP. 100% private and secure.",
    icon: <ImageCompressorIcon />,
    category: ToolCategory.IMAGE,
    component: ImageCompressor,
    details: {
      introduction:
        "The Image Compressor helps you reduce image file sizes while maintaining visual quality through intelligent compression techniques.",
      howToUse: [
        "Upload your image using the file upload section.",
        "Choose the output format (JPEG, PNG, or WebP).",
        "Adjust quality settings and maximum dimensions.",
        "Enable aggressive compression for maximum size reduction.",
        "Preview compression results and download the optimized image.",
      ],
      features: [
        "Intelligent compression with quality control",
        "Resize images while compressing",
        "Multiple output formats (JPEG, PNG, WebP)",
        "Aggressive compression mode for maximum reduction",
        "Real-time compression ratio display",
        "Maintain aspect ratio option",
        "Before/after file size comparison",
        "High-quality output with HTML5 Canvas",
        "Works entirely in your browser",
      ],
      privacy:
        "All image processing happens locally in your browser. No files are uploaded to our servers.",
      explanation:
        "This tool uses HTML5 Canvas with advanced compression techniques to reduce file sizes while preserving visual quality.",
      usageExamples: [
        "Compress photos for web upload",
        "Reduce image sizes for email attachments",
        "Optimize images for mobile apps",
        "Create thumbnails with compression",
        "Batch compress multiple images",
      ],
      underlyingConcept:
        "The tool combines dimension reduction, quality adjustment, and format optimization to achieve maximum compression while maintaining acceptable visual quality.",
      faqs: [
        {
          question: "How much can I compress an image?",
          answer:
            "Compression depends on the original image. Typical reductions range from 20% to 80% of the original file size.",
        },
        {
          question: "Will aggressive compression affect quality?",
          answer:
            "Aggressive compression may reduce quality significantly but can achieve maximum file size reduction. Use with caution for important images.",
        },
        {
          question: "Which format compresses best?",
          answer:
            "WebP generally provides the best compression, followed by JPEG, then PNG. Choose based on your compatibility needs.",
        },
        {
          question: "What is the maximum file size?",
          answer:
            "Input images can be up to 50MB. The tool can resize images up to 4000x4000 pixels.",
        },
      ],
    },
  },
];

export const CATEGORY_ORDER: ToolCategory[] = [
  ToolCategory.TEXT,
  ToolCategory.VIDEO,
  ToolCategory.CODING,
  ToolCategory.IMAGE,
  ToolCategory.CSS,
  ToolCategory.COLOR,
  ToolCategory.MATH,
  ToolCategory.PRODUCTIVITY,
  ToolCategory.FUN,
  ToolCategory.MISC,
];

// SEO-friendly URL mapping for categories
export const CATEGORY_URL_MAP: Record<ToolCategory, string> = {
  [ToolCategory.TEXT]: "text-tools",
  [ToolCategory.CODING]: "coding-tools",
  [ToolCategory.IMAGE]: "image-tools",
  [ToolCategory.CSS]: "css-tools",
  [ToolCategory.COLOR]: "color-tools",
  [ToolCategory.MATH]: "math-calculation-tools",
  [ToolCategory.PRODUCTIVITY]: "productivity-tools",
  [ToolCategory.FUN]: "fun-interactive-tools",
  [ToolCategory.MISC]: "miscellaneous-tools",
  [ToolCategory.VIDEO]: "video-tools",
};

// Reverse mapping from URL to category
export const URL_TO_CATEGORY_MAP: Record<string, ToolCategory> = {
  "text-tools": ToolCategory.TEXT,
  "coding-tools": ToolCategory.CODING,
  "image-tools": ToolCategory.IMAGE,
  "css-tools": ToolCategory.CSS,
  "color-tools": ToolCategory.COLOR,
  "math-calculation-tools": ToolCategory.MATH,
  "productivity-tools": ToolCategory.PRODUCTIVITY,
  "fun-interactive-tools": ToolCategory.FUN,
  "miscellaneous-tools": ToolCategory.MISC,
  "video-tools": ToolCategory.VIDEO,
};

export const CATEGORY_ICONS: Record<
  ToolCategory,
  React.FC<{ className?: string }>
> = {
  [ToolCategory.TEXT]: TextCategoryIcon,
  [ToolCategory.CODING]: CodeCategoryIcon,
  [ToolCategory.IMAGE]: ImageCategoryIcon,
  [ToolCategory.CSS]: CssCategoryIcon,
  [ToolCategory.COLOR]: ColorCategoryIcon,
  [ToolCategory.MATH]: MathCategoryIcon,
  [ToolCategory.PRODUCTIVITY]: ProductivityCategoryIcon,
  [ToolCategory.FUN]: FunCategoryIcon,
  [ToolCategory.MISC]: MiscCategoryIcon,
  [ToolCategory.VIDEO]: VideoCategoryIcon,
};

export const CATEGORY_DESCRIPTIONS: Record<ToolCategory, string> = {
  [ToolCategory.TEXT]: "Tools for text manipulation, counting, and analysis.",
  [ToolCategory.CODING]:
    "Utilities for developers to format, debug, and generate code.",
  [ToolCategory.IMAGE]: "Tools for image conversion and manipulation.",
  [ToolCategory.CSS]: "Helpers for generating and previewing CSS styles.",
  [ToolCategory.COLOR]:
    "Utilities for color conversion and palette generation.",
  [ToolCategory.MATH]:
    "Calculators and converters for mathematical operations.",
  [ToolCategory.PRODUCTIVITY]: "Tools to help you stay organized and focused.",
  [ToolCategory.FUN]: "Fun tools to create memes and more.",
  [ToolCategory.MISC]: "A collection of other useful miscellaneous tools.",
  [ToolCategory.VIDEO]:
    "Tools for video processing, conversion, and manipulation.",
};

export const CATEGORY_CONTENT: Record<
  ToolCategory,
  {
    introduction: string;
    benefits: string[];
    useCases: string[];
  }
> = {
  [ToolCategory.TEXT]: {
    introduction:
      "Master every aspect of text manipulation with our comprehensive Text Tools collection. Whether you're a content creator optimizing for SEO, a developer formatting code, or a student analyzing readability - our text utilities transform how you work with words. From instant case conversion to advanced keyword analysis, these tools help you create, edit, and optimize text content with professional precision.",
    benefits: [
      "Transform text formats instantly with case converters and text reversers",
      "Analyze content quality with readability scores and keyword density tools",
      "Count words, characters, and paragraphs for precise content requirements",
      "Generate placeholder text for design mockups and development projects",
      "Perfect for writers, developers, marketers, and content creators",
    ],
    useCases: [
      "Content creators optimizing blog posts for SEO and readability",
      "Developers converting code between naming conventions (camelCase, snake_case)",
      "Students analyzing essay readability and word count requirements",
      "Designers generating Lorem Ipsum text for website mockups",
      "Marketers analyzing keyword density in marketing copy",
    ],
  },
  [ToolCategory.CODING]: {
    introduction:
      "Streamline your development workflow with our powerful Coding Tools collection. From JSON formatting and Base64 encoding to regex testing and JWT debugging - these utilities handle the tedious tasks so you can focus on building amazing applications. All tools run locally in your browser, ensuring your code and data remain completely private while providing instant results.",
    benefits: [
      "Format and validate JSON, XML, and other data formats instantly",
      "Encode/decode Base64, URLs, and other formats for web development",
      "Test and debug regular expressions with real-time feedback",
      "Generate secure UUIDs, hashes, and passwords for applications",
      "Convert between CSV, JSON, and Excel formats seamlessly",
      "All processing happens locally for maximum security and speed",
    ],
    useCases: [
      "Frontend developers formatting API responses and debugging JSON",
      "Backend engineers encoding data for secure transmission",
      "Full-stack developers testing regex patterns for form validation",
      "Data scientists converting CSV files to JSON for analysis",
      "DevOps teams generating secure hashes and unique identifiers",
      "QA engineers debugging JWT tokens and API responses",
    ],
  },
  [ToolCategory.IMAGE]: {
    introduction:
      "Transform your images effortlessly with our comprehensive Image Tools collection. From Base64 conversion for web embedding to format conversion and optimization - these utilities handle all your image processing needs directly in your browser. Perfect for developers embedding images in code, designers optimizing assets, and content creators preparing visuals for web and mobile applications.",
    benefits: [
      "Convert images to Base64 for seamless web embedding",
      "Transform images between different formats (PNG, JPG, WebP)",
      "Optimize image files for faster loading and better performance",
      "Resize images to specific dimensions for responsive design",
      "Add watermarks and extract thumbnails for content protection",
      "All processing happens locally - your images never leave your device",
    ],
    useCases: [
      "Web developers embedding images directly in HTML/CSS code",
      "Mobile app developers converting images for different platforms",
      "Content creators optimizing images for social media and websites",
      "Designers preparing assets for responsive web design",
      "E-commerce managers creating product thumbnails and watermarks",
      "Bloggers optimizing images for faster page loading",
    ],
  },
  [ToolCategory.CSS]: {
    introduction:
      "Create stunning web designs with our powerful CSS Tools collection. From box shadows and gradients to modern glassmorphism effects - these visual generators help you craft beautiful, responsive designs without the guesswork. Perfect for developers, designers, and anyone who wants to create professional-looking websites with clean, optimized CSS code.",
    benefits: [
      "Generate complex CSS properties with intuitive visual controls",
      "Create modern effects like glassmorphism and neumorphism",
      "Preview styles in real-time before copying code",
      "Generate cross-browser compatible CSS automatically",
      "Perfect for rapid prototyping and design iteration",
      "Copy-paste ready code that works across all modern browsers",
    ],
    useCases: [
      "UI designers creating button shadows and hover effects",
      "Frontend developers experimenting with modern CSS effects",
      "Web designers generating custom gradients for backgrounds",
      "CSS learners practicing with interactive visual tools",
      "Freelancers creating professional website designs quickly",
      "Agencies prototyping client designs with modern effects",
    ],
  },
  [ToolCategory.COLOR]: {
    introduction:
      "Master the art of color with our comprehensive Color Tools collection. From palette generation to format conversion - these utilities help you create harmonious color schemes that bring your designs to life. Whether you're building a brand identity, designing a website, or creating digital art, our color tools provide the precision and inspiration you need.",
    benefits: [
      "Convert between color formats instantly (HEX, RGB, HSL, CMYK)",
      "Generate harmonious palettes using color theory principles",
      "Create monochromatic, complementary, and triadic color schemes",
      "Interactive color wheel for intuitive color selection",
      "Perfect for both beginners and professional designers",
      "Export palettes for use in design software and code",
    ],
    useCases: [
      "Graphic designers creating brand color schemes and identities",
      "Web developers converting Photoshop colors to CSS formats",
      "UI designers building consistent color systems for apps",
      "Artists experimenting with color harmonies and combinations",
      "Marketers ensuring consistent branding across platforms",
      "Students learning color theory and design principles",
    ],
  },
  [ToolCategory.MATH]: {
    introduction:
      "Solve real-world problems with our practical Math Tools collection. From unit conversions and currency exchange to financial calculations and health metrics - these utilities make complex math accessible and useful. Perfect for students, professionals, travelers, and anyone who needs accurate calculations for daily life and work.",
    benefits: [
      "Convert between metric and imperial units instantly",
      "Calculate currency exchange rates with real-time data",
      "Compute loan payments and amortization schedules",
      "Calculate BMI and other health metrics accurately",
      "All calculations performed locally for privacy and speed",
      "Perfect for students, professionals, and everyday use",
    ],
    useCases: [
      "Students converting units for science and math homework",
      "Travelers checking currency exchange rates before trips",
      "Homeowners calculating mortgage payments and loan terms",
      "Fitness enthusiasts tracking BMI and health metrics",
      "Engineers converting measurements for international projects",
      "Business owners calculating financial projections and budgets",
    ],
  },
  [ToolCategory.PRODUCTIVITY]: {
    introduction:
      "Boost your productivity and stay organized with our comprehensive Productivity Tools collection. From Pomodoro timers and world clocks to task management and time zone coordination - these utilities help you manage your time effectively and work more efficiently. Perfect for remote workers, students, freelancers, and anyone looking to optimize their daily workflow.",
    benefits: [
      "Pomodoro timer for focused work sessions and better concentration",
      "World clock for coordinating meetings across time zones",
      "Task management tools for organizing daily priorities",
      "Stopwatch and timer for precise time tracking",
      "All tools work offline and sync with your browser",
      "Designed for modern remote and hybrid work environments",
    ],
    useCases: [
      "Remote workers scheduling calls across different time zones",
      "Students using Pomodoro technique for focused study sessions",
      "Freelancers tracking billable hours with stopwatches",
      "Project managers coordinating global team meetings",
      "Content creators managing deadlines and work schedules",
      "Professionals organizing daily tasks and priorities",
    ],
  },
  [ToolCategory.FUN]: {
    introduction:
      "Add creativity and fun to your digital life with our entertaining Fun Tools collection. From meme generators to playful text effects - these utilities are perfect for creating shareable content, breaking up the workday, or just having some creative fun. Great for social media, team building, and unleashing your inner creativity.",
    benefits: [
      "Create viral memes and shareable graphics instantly",
      "Generate playful text effects and creative content",
      "Perfect for social media posts and team communications",
      "No design skills required - just your imagination",
      "Lightweight tools that work instantly in your browser",
      "Great for team building and workplace fun",
    ],
    useCases: [
      "Social media managers creating engaging meme content",
      "Team members sharing funny posts in Slack and Discord",
      "Content creators generating viral graphics for platforms",
      "Students creating fun presentations and projects",
      "Friends experimenting with text effects for messages",
      "Marketing teams creating playful promotional content",
    ],
  },
  [ToolCategory.MISC]: {
    introduction:
      "Handle essential digital tasks with our versatile Misc Tools collection. From password generation and QR code creation to unique ID generation - these utilities cover the important but often overlooked tasks that make digital life easier and more secure. Perfect for developers, business owners, and anyone who needs reliable tools for everyday digital tasks.",
    benefits: [
      "Generate strong, secure passwords with customizable options",
      "Create QR codes for easy link sharing and marketing",
      "Generate unique identifiers and codes for development",
      "All tools process data locally for maximum security",
      "Perfect for security-conscious users and developers",
      "Versatile utilities that solve common digital problems",
    ],
    useCases: [
      "Users creating strong passwords for new accounts and services",
      "Business owners generating QR codes for products and marketing",
      "Developers needing unique IDs and codes for testing",
      "Marketers creating scannable codes for campaigns",
      "Security-conscious individuals generating secure strings",
      "Anyone sharing links and information via QR codes",
    ],
  },
  [ToolCategory.VIDEO]: {
    introduction:
      "Master video content creation with our powerful Video Tools collection. From compression and format conversion to GIF creation and audio extraction - these utilities handle all your video processing needs directly in your browser. Perfect for content creators, marketers, students, and professionals who need to work with video content efficiently and securely.",
    benefits: [
      "Compress large video files without losing quality for easy sharing",
      "Convert videos between different formats (MP4, AVI, MOV, WebM)",
      "Extract audio tracks from videos for podcasts and music",
      "Create animated GIFs from video clips for social media",
      "Add watermarks and trim videos for content protection",
      "All processing happens locally - your videos never leave your device",
    ],
    useCases: [
      "Content creators compressing videos for social media platforms",
      "Students extracting audio from educational videos for study",
      "Marketers creating GIFs from promotional videos",
      "Professionals converting video formats for presentations",
      "Bloggers optimizing video content for faster loading",
      "Developers testing video functionality in web applications",
    ],
  },
};
