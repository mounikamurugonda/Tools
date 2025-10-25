import React from 'react';
import { Tool, ToolCategory } from './types';
import CaseConverter from '@/tools/CaseConverter';
import WordCounter from '@/tools/WordCounter';
import LoremIpsumGenerator from '@/tools/LoremIpsumGenerator';
import Base64Converter from '@/tools/Base64Converter';
import UrlEncoder from '@/tools/UrlEncoder';
import JsonFormatter from '@/tools/JsonFormatter';
import UuidGenerator from '@/tools/UuidGenerator';
import PasswordGenerator from '@/tools/PasswordGenerator';
import ImageToBase64 from '@/tools/ImageToBase64';
import TextReverser from '@/tools/TextReverser';
import Base64ToImage from '@/tools/Base64ToImage';
import BoxShadowGenerator from '@/tools/BoxShadowGenerator';
import CssGradientGenerator from '@/tools/CssGradientGenerator';
import BorderRadiusGenerator from '@/tools/BorderRadiusGenerator';
import TextShadowGenerator from '@/tools/TextShadowGenerator';
import GlassmorphismGenerator from '@/tools/GlassmorphismGenerator';
import HashGenerator from '@/tools/HashGenerator';
import JwtDebugger from '@/tools/JwtDebugger';
import QrCodeGenerator from '@/tools/QrCodeGenerator';
import MarkdownPreviewer from '@/tools/MarkdownPreviewer';
import DateCalculator from '@/tools/DateCalculator';
import DiffChecker from '@/tools/DiffChecker';
import PomodoroTimer from '@/tools/PomodoroTimer';
import MemeGenerator from '@/tools/MemeGenerator';
import RegexTester from '@/tools/RegexTester';
import ColorPaletteGenerator from '@/tools/ColorPaletteGenerator';
import ColorThemeWheel from '@/tools/ColorThemeWheel';
import UnitConverter from '@/tools/UnitConverter';
import BmiCalculator from '@/tools/BmiCalculator';
import TodoList from '@/tools/TodoList';
import CurrencyConverter from '@/tools/CurrencyConverter';
import WorldClock from '@/tools/WorldClock';
import TimersAndStopwatch from '@/tools/TimersAndStopwatch';
import CsvToJson from '@/tools/CsvToJson';
import JsonToCsv from '@/tools/JsonToCsv';
import CsvToXlsx from '@/tools/CsvToXlsx';
import XlsxToCsv from '@/tools/XlsxToCsv';
import CharacterCounter from '@/tools/CharacterCounter';
import KeywordDensityAnalyzer from '@/tools/KeywordDensityAnalyzer';
import ReadabilityScore from '@/tools/ReadabilityScore';
import LoanCalculator from '@/tools/LoanCalculator';
import TimeZoneConverter from '@/tools/TimeZoneConverter';
import CssColorCodeConverter from '@/tools/CssColorCodeConverter';

import VideoCompressor from '@/tools/VideoCompressor';
import VideoToAudioConverter from '@/tools/VideoToAudioConverter';
import GifMaker from '@/tools/GifMaker';
import TrimVideo from '@/tools/TrimVideo';
import FormatConverter from '@/tools/FormatConverter';
import VideoThumbnailExtractor from '@/tools/VideoThumbnailExtractor';
import VideoMute from '@/tools/VideoMute';
import WatermarkAdder from '@/tools/WatermarkAdder';
import ImageResizer from '@/tools/ImageResizer';
import ImageConverter from '@/tools/ImageConverter';
import ImageCompressor from '@/tools/ImageCompressor';
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
} from '@/components/icons';

const PRIVACY_STATEMENT = "All calculations and data processing for this tool are performed locally in your browser. We do not send any of your data to our servers, ensuring your information remains private and secure.";


export const TOOLS: Tool[] = [
  // Text Tools
  {
    id: 'keyword-density-analyzer',
    name: 'Keyword Density Analyzer',
    description: 'Analyze text to find keyword frequency and density for better SEO optimization.',
    seoTitle: 'Free Keyword Density Analyzer - Check SEO Content',
    seoDescription: 'Improve your on-page SEO with our free Keyword Density Analyzer. Easily check keyword frequency and content optimization for any text. No registration required, 100% private and secure.',
    icon: <KeywordDensityIcon />,
    component: KeywordDensityAnalyzer,
    category: ToolCategory.TEXT,
    details: {
      introduction: 'Unlock the power of your content with our free Keyword Density Analyzer – the ultimate SEO keyword analysis tool designed for content creators, digital marketers, and SEO professionals. This intelligent tool scans your text to reveal keyword frequency, density percentages, and optimal phrasing patterns, helping you craft search-engine optimized content that ranks higher and engages readers more effectively. Whether you\'re optimizing blog posts, product descriptions, or website copy, our analyzer provides actionable insights to balance keyword usage without overstuffing, ensuring your content remains natural and reader-friendly.',
      howToUse: [
        'Start by pasting your complete text content into the spacious input area – whether it\'s a blog post, article, or webpage excerpt.',
        'Watch as our advanced algorithm instantly processes your text, identifying single words, two-word phrases, and three-word combinations.',
        'Review the comprehensive results table that displays keyword counts, total occurrences, and precise density percentages for each term.',
        'Customize your analysis by toggling the stop-word removal feature to exclude common words like "the", "and", or "is" for more meaningful insights.',
        'Sort and filter results by density, frequency, or alphabetically to pinpoint your most important keywords and refine your content strategy accordingly.',
        'Export or copy your findings to integrate them seamlessly into your SEO workflow and content optimization process.'
      ],
      features: [
        'Lightning-fast analysis of 1-word, 2-word, and 3-word keyword combinations with real-time updates as you type.',
        'Interactive, sortable results table that lets you prioritize high-impact keywords for better SEO performance.',
        'Smart stop-word filtering to focus on meaningful terms and eliminate noise from your keyword analysis.',
        'Precise density calculations that help maintain the ideal 1-2% keyword density recommended by search engines.',
        'Mobile-responsive design that works flawlessly on any device, perfect for on-the-go content optimization.',
        'Privacy-focused processing – all analysis happens locally in your browser, ensuring your content stays secure.'
      ],
      privacy: PRIVACY_STATEMENT,
      explanation: 'Keyword density analysis is a cornerstone of modern SEO strategy, measuring how frequently specific words or phrases appear in your content relative to the total word count. Our tool employs sophisticated natural language processing to break down your text into actionable insights, calculating density as (keyword occurrences / total words) × 100. This helps identify over-optimization risks (which can trigger search engine penalties) while highlighting opportunities to naturally incorporate high-value search terms. By analyzing n-grams (multi-word phrases), we provide deeper context than traditional single-word tools, enabling you to optimize for long-tail keywords that drive targeted traffic and conversions.',
      usageExamples: [
        'Optimizing a new blog post for target keywords like "digital marketing strategies" to improve organic search rankings.',
        'Analyzing competitor content to identify their keyword patterns and gaps you can exploit for better positioning.',
        'Refining product descriptions on e-commerce sites to include relevant search terms without sounding unnatural.',
        'Conducting content audits for existing website pages to balance keyword usage and enhance overall SEO health.',
        'Creating SEO reports for clients by demonstrating keyword density improvements before and after optimization.'
      ],
      faqs: [
        { question: 'What is the ideal keyword density for SEO?', answer: 'Search engines like Google recommend a natural density of 1-2% for primary keywords. Our tool helps you stay within this range while ensuring content reads naturally to users.' },
        { question: 'Does this tool handle multilingual content?', answer: 'Absolutely! Our analyzer works with any language, though stop-word filtering is optimized for English. For other languages, you can disable stop-word removal for accurate results.' },
        { question: 'Can I analyze very long documents?', answer: 'Yes, our tool efficiently processes documents up to 100,000 words. For extremely large content, we recommend breaking it into sections for more granular insights.' },
        { question: 'How does stop-word removal work?', answer: 'Stop words are common function words like "the", "a", "an", "and", etc., that don\'t add semantic value. Removing them helps focus on content-bearing keywords that matter for SEO.' },
        { question: 'Is my content stored or shared?', answer: 'Never! All processing happens entirely in your browser using JavaScript, so your content remains private and secure on your device.' }
      ],
      underlyingConcept: 'At its core, keyword density analysis leverages frequency-based text mining techniques from information retrieval systems. The tool tokenizes input via whitespace and punctuation splitting, then applies stemming/lemmatization optionally to normalize variations (e.g., "running" to "run"). N-gram extraction creates multi-word candidates, while TF-IDF-inspired weighting could enhance future iterations. Stop-word filtering uses predefined lists from NLP corpora, ensuring focus on substantive terms. This methodology, rooted in vector space models from 1970s IR research, quantifies semantic relevance, aiding not just SEO but also topic modeling and sentiment analysis in content strategy.',
    },
    keywords: ["keyword density checker", "seo analysis tool", "content optimization", "keyword frequency", "on-page seo"],
  },
  {
    id: 'readability-score-calculator',
    name: 'Readability Score Calculator',
    description: 'Calculate Flesch-Kincaid and other readability scores to improve your writing.',
    seoTitle: 'Readability Score Calculator - Improve Your Writing',
    seoDescription: 'Instantly calculate Flesch-Kincaid and other readability scores to make your writing more accessible. Our free tool helps you improve your content\'s clarity. 100% private and secure.',
    icon: <ReadabilityIcon />,
    component: ReadabilityScore,
    category: ToolCategory.TEXT,
    details: {
      introduction: 'Determine how easy your text is to read with the Readability Score Calculator. This tool analyzes your content and calculates its score based on the Flesch Reading Ease and Flesch-Kincaid Grade Level formulas, helping you write more accessible content.',
      howToUse: [
        'Paste your text into the input field.',
        'The tool instantly analyzes the text.',
        'The results panel will display key metrics like word count, sentence count, and average syllables per word.',
        'The Flesch Reading Ease score and the corresponding U.S. school grade level will be shown.'
      ],
      features: [
        'Calculates Flesch Reading Ease score.',
        'Determines Flesch-Kincaid Grade Level.',
        'Provides detailed text statistics (words, sentences, syllables).',
        'Helps writers tailor their content to a specific audience.'
      ],
      privacy: PRIVACY_STATEMENT,
      explanation: 'Readability formulas are used to measure the accessibility of a text. They work by analyzing sentence length and word complexity (often measured by syllables). The Flesch-Kincaid formulas are among the most common, providing a score that correlates to a U.S. school grade level, making it easy to understand if your text is suitable for your target audience.',
      usageExamples: [
        'A blogger can check if their post is easy for a general audience to understand.',
        'A technical writer can use it to simplify complex documentation.',
        'A teacher can assess the reading level of educational materials.'
      ],
      underlyingConcept: 'The tool implements two main formulas. The Flesch Reading Ease formula is: 206.835 - 1.015 * (Total Words / Total Sentences) - 84.6 * (Total Syllables / Total Words). The Flesch-Kincaid Grade Level formula is: 0.39 * (Total Words / Total Sentences) + 11.8 * (Total Syllables / Total Words) - 15.59. The tool counts words, sentences, and syllables to plug into these equations.',
      faqs: [
        {
          question: 'What is a good Flesch Reading Ease score?',
          answer: 'A score of 60-70 is considered easily understandable by 13-15-year-old students. For a general audience, aiming for a score above 60 is a good goal.'
        },
        {
          question: 'Does a higher grade level mean the writing is better?',
          answer: 'Not necessarily. It just means the writing is more complex. The "best" grade level depends entirely on your target audience. For a broad audience, a lower grade level (around 8th grade) is often recommended.'
        }
      ]
    },
    keywords: ["readability score", "flesch-kincaid calculator", "writing analysis", "grade level checker", "text difficulty"],
  },
    {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments and see a full amortization schedule for loans.',
    seoTitle: 'Loan Calculator - Monthly Payments & Amortization',
    seoDescription: 'Estimate your monthly loan payments and see a full amortization schedule with our free Loan Calculator. Perfect for mortgages, car loans, and personal loans. 100% private and secure.',
    icon: <LoanCalculatorIcon />,
    component: LoanCalculator,
    category: ToolCategory.MATH,
    details: {
      introduction: 'The Loan Calculator helps you understand the financial details of a loan. By providing the loan amount, interest rate, and term, it calculates your monthly payment, total interest paid, and generates a complete amortization table showing the breakdown of each payment.',
      howToUse: [
        'Enter the total Loan Amount.',
        'Provide the annual Interest Rate (e.g., 5 for 5%).',
        'Set the Loan Term in either years or months.',
        'The summary of your monthly payment, total interest, and total cost will be calculated automatically.',
        'A detailed amortization schedule will be displayed below, showing how your loan balance decreases over time.'
      ],
      features: [
        'Calculates fixed monthly loan payments.',
        'Shows total principal and interest paid over the life of the loan.',
        'Generates a full amortization schedule.',
        'Supports loan terms in both years and months.'
      ],
      privacy: PRIVACY_STATEMENT,
      explanation: 'An amortization schedule is a table detailing each periodic payment on a loan. It shows how much of each payment is applied to interest and how much is applied to the principal balance. This tool automates the complex calculations involved, giving you a clear financial picture.',
      usageExamples: [
        'A potential homebuyer can estimate their monthly mortgage payments.',
        'A student can figure out the cost of a personal loan for their education.',
        'A small business owner can analyze the terms of a business loan.'
      ],
      underlyingConcept: 'The calculator uses the standard formula for calculating the monthly payment (M) of a fixed-rate loan: M = P * [r(1+r)^n] / [(1+r)^n - 1], where P is the principal loan amount, r is the monthly interest rate (annual rate / 12), and n is the number of payments (term in months). The amortization schedule is then built by calculating the interest for each month on the remaining balance and subtracting it from the payment to find the principal portion.',
      faqs: [
        {
          question: 'Why is so much of my early payment going to interest?',
          answer: 'In the beginning of a loan, the principal balance is at its highest, so the interest portion of your payment is also at its highest. As you pay down the principal, the interest portion of each payment decreases.'
        },
        {
          question: 'How can I pay less interest overall?',
          answer: 'You can pay less interest by getting a lower interest rate, choosing a shorter loan term, or making extra payments towards the principal whenever possible.'
        }
      ]
    },
    keywords: ["loan payment calculator", "amortization schedule", "mortgage calculator", "personal loan calculator", "interest calculator"],
  },
    {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Convert a specific time from one timezone to another instantly.',
    seoTitle: 'Time Zone Converter - Convert Time Across Zones',
    seoDescription: 'Easily convert time between different time zones with our free Time Zone Converter. Perfect for scheduling international meetings and calls. 100% private and secure.',
    icon: <TimeZoneConverterIcon />,
    component: TimeZoneConverter,
    category: ToolCategory.PRODUCTIVITY,
    details: {
      introduction: 'Never get confused by time zones again. The Time Zone Converter allows you to instantly see what time it will be in another part of the world. It is perfect for scheduling international meetings, planning travel, or coordinating with friends and family globally.',
      howToUse: [
        'Select the date and time you want to convert using the input fields.',
        'Choose your starting timezone from the "From" dropdown and your target timezone from the "To" dropdown.',
        'The tool will instantly display the converted date and time for both locations in a clear, side-by-side view.',
        'The time difference in hours between the two zones is shown right below the selectors.',
        'Click the swap button between the dropdowns to quickly reverse the conversion.'
      ],
      features: [
        'Side-by-side display for easy comparison of two timezones.',
        'Calculates and shows the exact hour difference between the selected zones.',
        'Comprehensive, grouped list of IANA timezones for easy selection.',
        'Displays the converted day of the week, which is crucial for future or past dates.',
        'Real-time updates as you change the date, time, or timezones.',
        'A swap button to quickly invert the "From" and "To" locations.'
      ],
      privacy: PRIVACY_STATEMENT,
      explanation: 'This tool leverages your browser\'s built-in Internationalization API (Intl) to perform accurate timezone conversions. It takes a specific date and time, treats it as being in the "From" timezone, and then calculates the equivalent date and time in the "To" timezone, accounting for complexities like Daylight Saving Time (DST).',
      usageExamples: [
        'A project manager in New York can schedule a video call with a developer in Berlin by checking the corresponding work hours.',
        'A traveler can find out the local time of their arrival city before they land.',
        'Someone can wish their friend in another country a "Happy Birthday" at the right local time.'
      ],
      underlyingConcept: 'The core of this tool is the `Intl.DateTimeFormat` object in JavaScript. By providing a specific IANA timezone name (e.g., "America/New_York" or "Europe/Paris"), we can format a single date object to display the correct local time for that zone. The tool creates a date object from your input and then uses formatters for both the "From" and "To" zones to display the results.',
      faqs: [
        {
          question: 'What are IANA timezones?',
          answer: 'IANA (Internet Assigned Numbers Authority) timezones are standardized names like "America/New_York" that represent specific geographical regions. They are the most reliable way to handle timezones in software because they automatically account for local time rules and Daylight Saving Time changes.'
        },
        {
          question: 'Why is the day of the week different after conversion?',
          answer: 'When you convert between timezones with a large hour difference, it\'s common for the time to cross over midnight, resulting in a different day. For example, 10 PM on Tuesday in Los Angeles is already 7 AM on Wednesday in Paris.'
        }
      ]
    },
    keywords: ["time zone converter", "world clock", "time difference calculator", "international meeting planner", "gmt converter"],
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between uppercase, lowercase, title case, and more formats.',
    seoTitle: 'Case Converter - Change Text Case Online',
    seoDescription: 'Easily convert text between uppercase, lowercase, title case, sentence case, and more with our free online Case Converter. No registration required, 100% private and secure.',
    icon: <CaseIcon />,
    component: CaseConverter,
    category: ToolCategory.TEXT,
    featured: true,
    details: {
      tip: "Use 'Title Case' for blog post headlines to make them look professional, and 'Sentence case' for paragraphs to keep them easy to read!",
      introduction: 'The Case Converter tool allows you to easily transform the case of your text. Whether you need your text in all uppercase, all lowercase, sentence case, or title case, this tool provides a quick and easy solution. It works by analyzing the input text and applying string manipulation techniques to change the casing of each character or word as per the selected option. This solves the common problem of manually editing text to fit specific formatting requirements, saving time and reducing errors in documents, emails, or code.',
      explanation: 'How does it work? The tool takes your input string and uses JavaScript string methods like toUpperCase(), toLowerCase(), or custom logic for title and sentence case. For title case, it capitalizes the first letter of each major word, ignoring minor words like "the" or "and" unless specified. Sentence case capitalizes only the first letter of each sentence. This automation eliminates the tedium of manual corrections, especially for large texts.',
      usageExamples: [
        'A student writing an essay might use it to convert all text to title case for headings.',
        'A developer could convert variable names from camelCase to UPPER_CASE for constants in code.',
        'A marketer preparing email campaigns might switch text to sentence case for better readability in subject lines.'
      ],
      underlyingConcept: 'Text casing is a fundamental concept in typography and programming. It involves modifying the capitalization of letters to convey structure, emphasis, or style. For instance, uppercase is often used for shouting or acronyms, while title case is common in headlines. The tool leverages Unicode character properties to handle various languages and special characters accurately.',
      howToUse: [
        'Paste or type your text into the input area.',
        'Click one of the buttons for the desired case transformation (e.g., UPPER CASE, lower case).',
        'The converted text will instantly appear in the result area below.',
        'You can then copy the result to your clipboard.'
      ],
      features: [
        'Supports multiple case formats: UPPER, lower, Sentence, and Title case.',
        'Instant conversion with no server-side processing.',
        'Simple and intuitive interface.',
        'Handles large blocks of text efficiently.'
      ],
      faqs: [
        { question: 'Does this tool support non-English characters?', answer: 'Yes, it handles Unicode characters, including accented letters and other alphabets.' },
        { question: 'Can I convert multiple paragraphs at once?', answer: 'Absolutely, the tool processes any amount of text efficiently.' },
        { question: 'Is there a limit to the text length?', answer: 'No strict limit, but very large texts may depend on your browser\'s memory.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["text case converter", "change case online", "uppercase to lowercase", "title case generator", "sentence case tool"],
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text instantly.',
    seoTitle: 'Word Counter - Count Words & Characters Online',
    seoDescription: 'Our free Word Counter tool instantly counts words, characters, sentences, and paragraphs in your text. Perfect for writers, students, and editors. 100% private and secure.',
    icon: <CounterIcon />,
    component: WordCounter,
    category: ToolCategory.TEXT,
    details: {
      introduction: 'Discover the precision of our Free Word Counter Tool – the essential online word count checker for writers, students, editors, and content creators who need accurate text statistics at their fingertips. Whether you\'re meeting word limits for essays, blog posts, or social media content, this versatile tool provides comprehensive analysis including words, characters (with and without spaces), sentences, paragraphs, and reading time estimates. Say goodbye to manual counting and hello to instant, reliable insights that help you craft content that hits the mark every time, optimized for productivity and precision in your writing workflow.',
      howToUse: [
        'Simply paste or type your text directly into the expansive input field – supports up to 50,000 characters for thorough analysis.',
        'Instantly view real-time counters updating as you write, displaying word count, character count, sentence count, and more.',
        'Explore additional metrics like reading time (based on average reading speeds of 200-300 words per minute) and paragraph breakdown.',
        'Utilize the clean, distraction-free interface to focus on your writing while keeping essential stats in view.',
        'Copy individual counts or export the full analysis to integrate seamlessly into your documents or reports.'
      ],
      features: [
        'Real-time counting of words, characters (with/without spaces), sentences, and paragraphs as you type.',
        'Estimated reading time calculations tailored to different reading speeds for better content planning.',
        'Support for multiple languages and character sets, including Unicode for global content creators.',
        'Clean, minimalist interface with dark mode support for comfortable use during long writing sessions.',
        'Advanced sentence detection that accurately handles complex punctuation and abbreviations.',
        'Privacy-first design – all counting performed locally without data transmission or storage.'
      ],
      privacy: PRIVACY_STATEMENT,
      explanation: 'Our Word Counter employs sophisticated text parsing algorithms to deliver precise metrics essential for professional writing. Words are tokenized by spaces and punctuation, characters are counted byte-by-byte (distinguishing spaces for SEO and formatting needs), sentences are identified via ending punctuation patterns, and paragraphs by double line breaks. Reading time estimates use evidence-based averages from readability research, helping writers gauge audience engagement. This tool goes beyond basic counting by providing contextual insights, such as average sentence length for style analysis, making it invaluable for academic, journalistic, and marketing writing where precision directly impacts quality and compliance with guidelines.',
      usageExamples: [
        'Students ensuring their essays meet exact word count requirements for assignments and theses.',
        'Bloggers and journalists tracking content length to optimize for platform algorithms and reader attention spans.',
        'Social media managers crafting posts within character limits while maximizing engagement potential.',
        'Editors reviewing manuscripts to maintain consistent pacing and structure across chapters.',
        'Marketers analyzing email newsletters and ad copy for optimal length and readability scores.'
      ],
      faqs: [
        { question: 'How does the tool count words?', answer: 'We use standard tokenization: words are separated by spaces or punctuation. Hyphenated words count as one, and numbers/ contractions are treated as single words for accuracy.' },
        { question: 'What\'s the difference between characters with and without spaces?', answer: 'Characters with spaces include all text as displayed, ideal for layout planning. Without spaces, it\'s the pure letter count, perfect for SEO keyword density calculations.' },
        { question: 'Does it support non-English languages?', answer: 'Yes! Our counter handles Unicode characters from languages like Chinese, Arabic, and Hindi, providing accurate counts regardless of script.' },
        { question: 'How accurate is the reading time estimate?', answer: 'Based on research-backed averages (200 wpm for casual reading, 300 wpm for scanning), it\'s a reliable guide but may vary by content complexity and reader proficiency.' }
      ],
      underlyingConcept: 'Word counting fundamentals draw from computational linguistics, where text is tokenized into meaningful units for analysis. Our implementation uses space and punctuation as delimiters for words, regex patterns for sentence boundaries (handling contractions and abbreviations), and newline detection for paragraphs. This approach aligns with standards from natural language processing libraries like NLTK, providing metrics that inform readability scores (Flesch-Kincaid) and content optimization. By distinguishing between with/without spaces, we cater to both display layout needs and pure semantic analysis, empowering writers to refine voice, pace, and SEO density across diverse content types from technical docs to creative prose.',
    },
    keywords: ["word count tool", "character counter", "sentence counter online", "text statistics", "reading time calculator"],
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    description: 'Count characters with and without spaces, and see the byte size.',
    seoTitle: 'Character Counter - Online Letter & Byte Counter',
    seoDescription: 'Instantly count characters, letters, and bytes in your text with our free Character Counter. Perfect for social media posts, SMS messages, and more. 100% private and secure.',
    icon: <CharacterCounterIcon />,
    component: CharacterCounter,
    category: ToolCategory.TEXT,
    details: {
      introduction: 'The Character Counter provides a detailed breakdown of your text\'s length. It calculates the number of characters including spaces, the number of characters excluding spaces, and the total byte size assuming UTF-8 encoding. This solves problems like fitting text into limited fields, such as social media posts or database entries, where character limits are strict.',
      explanation: 'How does it work? The tool iterates through each character in the input string, counting them directly. For byte size, it encodes the string in UTF-8 and measures the length, accounting for multi-byte characters like emojis or accented letters.',
      usageExamples: [
        'Twitter users (now X) can check if their tweet fits within 280 characters.',
        'Developers ensure API payloads don\'t exceed size limits by checking bytes.',
        'Writers for SMS marketing verify messages under 160 characters to avoid splitting.'
      ],
      underlyingConcept: 'Character counting involves understanding text encoding. In UTF-8, ASCII characters use 1 byte, while others use more. This tool highlights the difference between visual characters and storage size, crucial in computing and communication.',
      howToUse: [
        'Paste or type your text into the text area.',
        'The statistics for characters (with and without spaces) and bytes will update automatically as you type.',
      ],
      features: [
        'Real-time counting of characters.',
        'Provides character count both with and without whitespace.',
        'Calculates the UTF-8 byte size of the text.',
        'Useful for social media post limits, SMS messages, and data size estimation.'
      ],
      faqs: [
        { question: 'Why is byte size different from character count?', answer: 'Non-ASCII characters like emojis use multiple bytes in UTF-8.' },
        { question: 'Does it include line breaks?', answer: 'Yes, line breaks are counted as characters.' },
        { question: 'Is it accurate for all languages?', answer: 'Yes, it supports Unicode fully.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["character count online", "letter counter", "byte size calculator", "social media character limit", "tweet character counter"],
  },
  {
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for web design and layout projects.',
    seoTitle: 'Lorem Ipsum Generator - Create Placeholder Text',
    seoDescription: 'Quickly generate Lorem Ipsum placeholder text for your web design and layout projects. Our free tool lets you customize the length and format. 100% private and secure.',
    icon: <LoremIpsumIcon />,
    component: LoremIpsumGenerator,
    category: ToolCategory.TEXT,
    details: {
      introduction: 'Spark your design process with our Free Lorem Ipsum Generator – the go-to dummy text placeholder tool for web designers, UI/UX specialists, and developers seeking realistic filler content without the hassle of writing mock copy. Instantly create customizable passages of classic Latin lorem ipsum text in various lengths, paragraphs, and words to perfectly fill layouts, prototypes, and mockups. This essential tool saves hours of manual typing while providing authentic-looking text that mimics real content structure, helping you focus on design aesthetics and functionality rather than placeholder creation. Ideal for responsive web design, print layouts, and app prototyping where visual hierarchy and spacing are key.',
      howToUse: [
        'Select your desired output format: paragraphs, words, or sentences to match your layout needs.',
        'Adjust the quantity using intuitive sliders or input fields – from a single paragraph to hundreds of words.',
        'Customize the starting text if needed, or stick with the traditional "Lorem ipsum dolor sit amet" classic.',
        'Click generate to instantly produce your placeholder text, formatted and ready for copy-paste.',
        'Use the preview pane to see how the text flows in your design before integrating it into your project.',
        'Easily copy the generated text with one click and paste it directly into your design software or code.'
      ],
      features: [
        'Multiple generation modes: paragraphs, sentences, or word counts for flexible layout filling.',
        'Customizable length controls with precise sliders for exact placeholder sizing.',
        'Traditional Latin lorem ipsum or randomized variations to suit different design aesthetics.',
        'Real-time preview that updates as you adjust settings, perfect for iterative design work.',
        'Clean, distraction-free interface optimized for designers working in Figma, Adobe XD, or code editors.',
        'Mobile-friendly responsive design that works seamlessly on tablets and phones for on-the-go prototyping.',
        'No watermarks or branding – pure, professional placeholder text ready for client presentations.'
      ],
      privacy: PRIVACY_STATEMENT,
      explanation: 'Lorem ipsum, derived from sections of Cicero\'s De Finibus Bonorum et Malorum (45 BC), has been the industry standard for placeholder text since the 1960s. Our generator uses algorithmic recombination of authentic Latin words and phrases to create coherent, readable passages that closely resemble natural language flow without conveying meaning. This prevents cognitive bias during design reviews, as readers focus on layout and typography rather than content. The tool employs randomization seeded by user inputs to ensure each generation is unique, while maintaining grammatical structure for realistic spacing and line breaks in various font sizes and widths.',
      usageExamples: [
        'Web designers populating responsive layouts to test typography hierarchy and spacing across devices.',
        'UI/UX prototypers filling wireframes in Figma or Sketch to simulate content density without writing real copy.',
        'Print designers creating brochure mockups in InDesign to evaluate visual balance and grid systems.',
        'Front-end developers styling CSS components with realistic text blocks for accurate rendering tests.',
        'Marketing teams preparing client presentation decks with placeholder content to showcase design concepts.',
        'Content strategists planning sitemaps and page structures with estimated text volumes.'
      ],
      faqs: [
        { question: 'Why use lorem ipsum instead of real text?', answer: 'Lorem ipsum avoids distraction from actual meaning, allowing focus on design elements like fonts, spacing, and layout. It also prevents subconscious bias toward familiar content during reviews.' },
        { question: 'Is the generated text real Latin?', answer: 'Yes, it\'s scrambled from authentic Cicero text, maintaining Latin word roots and sentence structure for realistic appearance without modern meaning.' },
        { question: 'Can I generate text in other languages?', answer: 'Our core tool uses classic Latin, but you can combine it with translation tools for other languages. We\'re exploring multilingual expansions based on user feedback.' },
        { question: 'How long can the generated text be?', answer: 'Unlimited! Generate from a few words up to thousands of paragraphs – perfect for filling entire page mockups or long-form content prototypes.' },
        { question: 'Does it affect SEO during development?', answer: 'No impact – lorem ipsum is for design only. Always replace with real content before going live to ensure proper keyword optimization and search visibility.' }
      ],
      underlyingConcept: 'The lorem ipsum technique originates from typesetting traditions, scrambling classical Latin to simulate typographic behavior without semantic interference. Our generator applies procedural generation principles, using seeded randomization to recombine a corpus of authentic Cicero-derived tokens while preserving syntactic validity through part-of-speech preservation. This creates pseudo-natural text distributions mimicking Zipf\'s law (word frequency curves), ensuring realistic line breaks and kerning tests across fonts. Unlike simple repetition, algorithmic variation prevents pattern recognition, aligning with UX research on cognitive load during design evaluation phases.',
    },
    keywords: ["lorem ipsum generator", "placeholder text generator", "dummy text creator", "mockup text", "filler text"],
  },
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    description: 'Quickly reverse any string of text with our instant reverser tool.',
    seoTitle: 'Text Reverser - Reverse Words & Strings Online',
    seoDescription: 'Instantly reverse any string of text, words, or letters with our free Text Reverser tool. Perfect for fun, puzzles, or data manipulation. 100% private and secure.',
    icon: <TextReverseIcon />,
    component: TextReverser,
    category: ToolCategory.TEXT,
    details: {
      introduction: 'A simple yet fun utility to reverse any text you provide. It flips the entire string of characters, including letters, numbers, symbols, and spaces, instantly. This tool solves creative needs like generating mirror text for designs or puzzles, or even basic data manipulation in programming.',
      explanation: 'How does it work? The tool splits the input string into an array of characters, reverses the array, and joins it back into a string. This handles all Unicode characters seamlessly.',
      usageExamples: [
        'Social media users create "upside-down" or reversed posts for fun.',
        'Puzzle creators generate reversed clues for games.',
        'Programmers test string manipulation functions with reversed inputs.'
      ],
      underlyingConcept: 'String reversal is a basic algorithm in computer science, often used to teach array operations. It involves iterating from the end to the start, preserving order but in reverse, which can reveal symmetries or be used in encryption basics.',
      howToUse: [
        'Enter or paste the text you want to reverse into the "Original Text" box.',
        'The reversed text will automatically appear in the "Reversed Text" box below.',
      ],
      features: [
        'Reverses text in real-time as you type.',
        'Handles all characters, including special symbols and emojis.',
        'Useful for creating "backwards" text for social media or light-hearted puzzles.',
      ],
      faqs: [
        { question: 'Does it reverse words or the entire string?', answer: 'The entire string, character by character.' },
        { question: 'What about emojis?', answer: 'Emojis are reversed as whole units.' },
        { question: 'Can I reverse multiple lines?', answer: 'Yes, it treats the whole input as one string.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["reverse text tool", "string reverser", "backwards text generator", "mirror text", "flip text"],
  },
  {
    id: 'markdown-previewer',
    name: 'Markdown Previewer',
    description: 'Write Markdown and see the rendered HTML in real-time preview.',
    seoTitle: 'Markdown Previewer - Real-Time MD to HTML',
    seoDescription: 'Write Markdown and see the rendered HTML in a real-time, side-by-side preview. Our free Markdown Previewer is perfect for drafting documentation and READMEs. 100% private and secure.',
    icon: <MarkdownIcon />,
    component: MarkdownPreviewer,
    category: ToolCategory.TEXT,
    details: {
      introduction: 'This real-time Markdown editor allows you to write in Markdown syntax on one side and see the rendered HTML output on the other. It\'s an excellent tool for drafting documentation, blog posts, or README files, solving the problem of switching between editing and viewing modes.',
      explanation: 'How does it work? As you type Markdown, the tool parses it using a library like marked or remark, converting it to HTML and rendering it live. This includes handling headers, lists, code blocks, and more.',
      usageExamples: [
        'Developers write GitHub READMEs and preview formatting.',
        'Bloggers draft posts before publishing.',
        'Technical writers create docs with instant visual feedback.'
      ],
      underlyingConcept: 'Markdown is a lightweight markup language created by John Gruber in 2004. It uses plain text formatting to produce HTML, emphasizing readability in source form. The concept is to simplify writing for the web without full HTML knowledge.',
      howToUse: [
        'Type your Markdown text in the left-hand editor panel.',
        'The right-hand panel will instantly display a preview of the rendered HTML.',
        'The preview updates automatically as you type.',
      ],
      features: [
        'Live, side-by-side preview.',
        'Supports standard Markdown syntax, including headers, lists, links, images, and code blocks.',
        'Clean, readable output for accurate visualization.',
      ],
      faqs: [
        { question: 'Does it support GitHub Flavored Markdown?', answer: 'Yes, including tables and task lists.' },
        { question: 'Can I embed images?', answer: 'Yes, via Markdown image syntax.' },
        { question: 'Is the preview sanitized?', answer: 'Yes, to prevent XSS issues.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["markdown editor online", "live markdown preview", "markdown to html converter", "readme editor", "md file viewer"],
  },
  // Coding Tools
  {
    id: 'base64-converter',
    name: 'Base64 Converter',
    description: 'Encode and decode text or files to/from Base64 format instantly.',
    seoTitle: 'Base64 Converter - Encode & Decode Online',
    seoDescription: 'Easily encode and decode text, files, and images to or from Base64 format with our free online Base64 Converter. No registration required, 100% private and secure.',
    icon: <Base64Icon />,
    component: Base64Converter,
    category: ToolCategory.CODING,
    details: {
      introduction: 'Master data encoding with our Free Base64 Encoder and Decoder – the premier online Base64 converter tool for developers, web engineers, and tech enthusiasts handling binary data in text formats. Seamlessly transform plain text, images, or files into compact Base64 strings for safe transmission in URLs, CSS, JSON, or emails, and decode them back with pixel-perfect accuracy. This essential utility eliminates the need for complex command-line tools or libraries, providing instant, browser-based conversion that\'s perfect for debugging APIs, embedding media in code, or preparing data for web applications. Say goodbye to encoding headaches and hello to effortless data handling that keeps your projects moving forward.',
      howToUse: [
        'Choose your mode: Encode to convert plain text or files to Base64, or Decode to reverse the process.',
        'For text encoding/decoding, simply paste your content into the input field – supports multi-line and special characters.',
        'For file operations, upload images, documents, or binaries up to 10MB, and let our tool handle the conversion automatically.',
        'Click the respective "Encode" or "Decode" button to process your input in real-time, with results appearing instantly below.',
        'Review the output, which includes the Base64 string, original size info, and download options for decoded files.',
        'Copy the result with one click or download as a file, ready for integration into your code or data pipeline.'
      ],
      features: [
        'Dual-mode operation: Encode text/files to Base64 or decode strings back to original format with 100% accuracy.',
        'File upload support for images, PDFs, and binaries – converts large files without size limitations in modern browsers.',
        'Real-time preview with character count and size comparison to monitor encoding efficiency.',
        'URL-safe Base64 variant option for web-safe transmission in query parameters and headers.',
        'Advanced error detection that highlights invalid Base64 input and provides helpful troubleshooting tips.',
        'Lightweight, no-install required – works entirely in-browser with zero data upload to servers.',
        'Export options including copy-to-clipboard, file download, and code snippet generation for easy integration.'
      ],
      privacy: PRIVACY_STATEMENT,
      explanation: 'Base64 encoding represents binary data in an ASCII string format using 64 characters (A-Z, a-z, 0-9, +, /) plus padding (=). It converts every 3 bytes of input into 4 Base64 characters, expanding data by about 33% but ensuring safe transmission over text-only protocols like HTTP or SMTP. Our tool implements the standard RFC 4648 algorithm, handling edge cases like partial bytes and padding correctly. For files, it reads binary data as an array buffer and encodes it chunk-by-chunk to prevent memory issues with large inputs. Decoding reverses this process, validating the input string to ensure it conforms to Base64 rules before outputting the original data, making it indispensable for web development, API testing, and data serialization tasks.',
      usageExamples: [
        'Web developers embedding small images as Base64 data URIs in CSS or HTML to reduce HTTP requests.',
        'API testers encoding JSON payloads with special characters for POST requests in tools like Postman.',
        'Email marketers preparing HTML newsletters with inline CSS and images encoded for compatibility.',
        'Full-stack engineers serializing binary configs or tokens for storage in databases or config files.',
        'Security professionals encoding sensitive data snippets for logging or sharing without revealing content.',
        'Frontend designers converting icons to Base64 for inline SVG usage in responsive components.'
      ],
      faqs: [
        { question: 'What is Base64 used for?', answer: 'Base64 encodes binary data (like images or files) into text for safe transmission in email, URLs, or JSON. It\'s not encryption but prevents corruption in text-only systems.' },
        { question: 'Does encoding increase file size?', answer: 'Yes, by approximately 33% due to the 6-bit to 8-bit conversion. For small assets like icons, the benefits outweigh the size increase.' },
        { question: 'Is your tool URL-safe?', answer: 'Yes! We offer a URL-safe variant that replaces + with - and / with _, removing padding for direct use in web addresses.' },
        { question: 'Can it handle very large files?', answer: 'For files under 50MB, yes – processed in chunks. For larger files, consider server-side tools to avoid browser memory limits.' },
        { question: 'Why does decoding sometimes fail?', answer: 'Common issues include incorrect padding (= signs), invalid characters, or non-Base64 input. Our tool provides specific error messages to help troubleshoot.' }
      ],
      underlyingConcept: 'Base64 encoding embodies MIME standards for binary-text interoperability, mapping 8-bit bytes to 6-bit indices in a 64-symbol alphabet to achieve 4:3 expansion ratio. The algorithm processes input in triplets, using bit shifting and modulo operations for character lookup, with padding (=) for incomplete groups per RFC 4648. Decoding validates alphabet membership and padding, then reconstructs bytes via reverse mapping. This radix-64 scheme, evolved from uuencode, ensures robustness against channel noise in protocols like SMTP, while variants (URL-safe) adapt +/ to -_ for URI compatibility, underpinning web data URIs and embedded resources in modern development ecosystems.',
    },
    keywords: ["base64 encode decode", "text to base64", "file to base64", "base64 converter online", "data URI generator"],
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode strings for safe use in URLs.',
    seoTitle: 'URL Encoder/Decoder - Percent-Encoding Tool',
    seoDescription: 'Safely encode or decode strings for use in URLs with our free URL Encoder/Decoder. Handles all special characters for safe transmission. 100% private and secure.',
    icon: <UrlIcon />,
    component: UrlEncoder,
    category: ToolCategory.CODING,
    details: {
      introduction: 'URL encoding, also known as percent-encoding, converts characters into a format that can be safely transmitted over the Internet. This tool allows you to both encode and decode URL components, solving problems with special characters breaking URLs in browsers or servers.',
      explanation: 'How does it work? It replaces unsafe characters with % followed by their hex code, using encodeURIComponent for components or encodeURI for full URLs.',
      usageExamples: [
        'Building query strings for APIs with user input.',
        'Encoding file names in download links.',
        'Debugging malformed URLs from logs.'
      ],
      underlyingConcept: 'URL encoding follows RFC 3986, reserving characters like ?, &, = for structure. The concept ensures unambiguous parsing by escaping others, preventing injection or misinterpretation.',
      howToUse: [
        'Enter a string (like a search query or URL parameter) into the input area.',
        'Click "Encode" to convert it into a URL-safe format.',
        'To reverse the process, enter an encoded string and click "Decode".',
        'The output will appear in the result area.'
      ],
      features: [
        'Uses the standard `encodeURIComponent()` and `decodeURIComponent()` functions.',
        'Essential for working with URL query strings and parameters in web development.',
        'Provides error feedback for malformed strings during decoding.',
      ],
      faqs: [
        { question: 'What\'s the difference from encodeURI?', answer: 'encodeURIComponent escapes more chars for query params.' },
        { question: 'Does it handle spaces?', answer: 'Yes, spaces become %20.' },
        { question: 'Is it safe for full URLs?', answer: 'For components yes; use encodeURI for whole URLs.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["url encoder decoder", "percent encoding", "url safe characters", "encodeuricomponent online", "query string encoder"],
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, pretty-print, and validate your JSON data instantly.',
    seoTitle: 'JSON Formatter - Validate & Beautify JSON Online',
    seoDescription: 'Format, validate, and pretty-print your JSON data instantly with our free JSON Formatter. Makes debugging and reading JSON a breeze. 100% private and secure.',
    icon: <JsonIcon />,
    component: JsonFormatter,
    category: ToolCategory.CODING,
    featured: true,
    details: {
      tip: "Got a long, messy line of JSON from an API? Just paste it here and click 'Format' to instantly make it clean, indented, and readable. It\'s a lifesaver for debugging!",
      introduction: 'The JSON Formatter helps you validate and beautify your JSON data. It makes convoluted, single-line JSON readable by formatting it into a well-structured, indented tree, solving the issue of debugging minified or malformed JSON in development.',
      explanation: 'How does it work? It parses the input with JSON.parse(), catches errors for validation, and uses JSON.stringify() with indentation for pretty-printing.',
      usageExamples: [
        'Debugging API responses in console logs.',
        'Formatting config files for readability.',
        'Validating user-submitted JSON in forms.'
      ],
      underlyingConcept: 'JSON (JavaScript Object Notation) is a data interchange format based on JS objects. Formatting involves tree traversal to add whitespace, making nested structures visible. Validation ensures compliance with JSON rules like quoted keys.',
      howToUse: [
        'Paste your raw JSON data into the input text area.',
        'Click the "Format / Validate" button.',
        'If the JSON is valid, it will be formatted and displayed in the output area. A success message will appear.',
        'If the JSON is invalid, an error message will describe the issue.'
      ],
      features: [
        'Pretty-prints minified or unformatted JSON.',
        'Validates JSON syntax and provides clear error messages.',
        'Monospaced font for easy reading and analysis.',
      ],
      faqs: [
        { question: 'Can it handle large JSON?', answer: 'Yes, but browser memory limits apply.' },
        { question: 'Does it sort keys?', answer: 'No, it preserves original order.' },
        { question: 'What if there\'s a syntax error?', answer: 'It shows the line and description.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["json formatter online", "json validator", "json beautifier", "pretty print json", "json viewer"],
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions against strings and see matches.',
    seoTitle: 'Regex Tester - Test Regular Expressions Online',
    seoDescription: 'Test and debug your regular expressions in real-time with our free Regex Tester. See matches and capture groups as you type. 100% private and secure.',
    icon: <RegexIcon />,
    component: RegexTester,
    category: ToolCategory.CODING,
    details: {
      introduction: 'A tool for developers to test and debug regular expressions. Instantly see how your pattern matches against a test string, with results and matches highlighted. It solves the complexity of crafting regex that work as intended without trial and error in code.',
      explanation: 'How does it work? It creates a RegExp object with your pattern and flags, then uses matchAll() or exec() to find and highlight matches, listing groups.',
      usageExamples: [
        'Validating email formats in form inputs.',
        'Extracting data from logs or HTML.',
        'Searching and replacing in code editors.'
      ],
      underlyingConcept: 'Regular expressions are patterns for matching text, based on formal language theory. They use symbols for quantifiers, groups, etc., enabling powerful string operations like search, validate, extract.',
      howToUse: [
        'Enter your regular expression pattern in the first input field.',
        'Optionally, add any flags (like `g`, `i`, `m`) in the flags field.',
        'Provide the string you want to test against in the "Test String" area.',
        'The "Result" box will highlight all matches in real-time.',
        'The "Matches" box will list all matched strings and capture groups.'
      ],
      features: [
        'Real-time match highlighting.',
        'Support for regex flags (global, case-insensitive, etc.).',
        'Detailed list of all matches and their capture groups.',
        'Error handling for invalid regular expressions.'
      ],
      faqs: [
        { question: 'What flags are supported?', answer: 'g (global), i (insensitive), m (multiline), s (dotall), etc.' },
        { question: 'Can it show replacements?', answer: 'This version focuses on matching; future updates may add replace.' },
        { question: 'Is it JS-specific?', answer: 'Yes, uses JS RegExp engine.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["regex tester online", "regular expression tester", "javascript regex checker", "validate regex pattern", "regex debugger"],
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate universally unique identifiers (UUID v4).',
    seoTitle: 'UUID Generator - Create UUIDs Online',
    seoDescription: 'Generate universally unique identifiers (UUID v4) with our free online UUID Generator. Create multiple UUIDs with a single click. 100% private and secure.',
    icon: <UuidIcon />,
    component: UuidGenerator,
    category: ToolCategory.CODING,
    details: {
      introduction: 'Generate Version 4 UUIDs (Universally Unique Identifiers), which are random, 128-bit numbers used to uniquely identify information in computer systems. This tool addresses the need for collision-resistant IDs in databases, sessions, or distributed systems.',
      explanation: 'How does it work? It uses crypto.randomUUID() to generate a random 128-bit value, formatted as 8-4-4-4-12 hex digits.',
      usageExamples: [
        'Assigning unique keys to database records.',
        'Generating session IDs for web apps.',
        'Tagging files in content management systems.'
      ],
      underlyingConcept: 'UUIDs follow RFC 4122, with v4 being random. The concept relies on vast 128-bit space (3.4e38 possibilities) for near-zero collision probability, enabling decentralized ID generation.',
      howToUse: [
        'Click the "Generate UUID" button.',
        'A new, random UUID will be generated and displayed.',
        'Click the "Copy" button to copy the UUID to your clipboard.'
      ],
      features: [
        'Generates cryptographically strong random UUIDs (v4).',
        'Uses the browser\'s built-in `crypto.randomUUID()` method for security.',
        'Simple one-click generation and copying.',
      ],
      faqs: [
        { question: 'Is v4 truly unique?', answer: 'Practically yes, with extremely low collision risk.' },
        { question: 'Can I generate multiple?', answer: 'Yes, click generate repeatedly.' },
        { question: 'What about other versions?', answer: 'This focuses on v4; others like v1 use timestamps.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["uuid generator online", "guid generator", "generate uuid v4", "random uuid", "unique identifier"],
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate SHA hashes from text using the Web Crypto API.',
    seoTitle: 'Hash Generator - Create SHA Hashes Online',
    seoDescription: 'Generate SHA-1, SHA-256, and SHA-512 hashes from any text with our free online Hash Generator. Uses the secure Web Crypto API. 100% private and secure.',
    icon: <HashIcon />,
    component: HashGenerator,
    category: ToolCategory.CODING,
    details: {
      introduction: 'Create a cryptographic hash (or "digest") of any text using the secure SHA (Secure Hash Algorithm) family. This tool uses the native Web Crypto API in your browser for enhanced security, solving needs for data integrity checks or password storage.',
      explanation: 'How does it work? It encodes text to bytes, then applies SHA via subtle.digest(), outputting hex.',
      usageExamples: [
        'Verifying file integrity with checksums.',
        'Hashing passwords before storage.',
        'Generating unique keys from strings.'
      ],
      underlyingConcept: 'Hashing maps data to fixed-size values, one-way and collision-resistant. SHA is from NIST, with SHA-256/512 being secure for most uses, used in blockchain, SSL, etc.',
      howToUse: [
        'Enter the text you want to hash into the input area.',
        'Select the desired SHA algorithm (SHA-1, SHA-256, or SHA-512).',
        'Click the "Generate" button.',
        'The resulting hexadecimal hash will be displayed in the output area.'
      ],
      features: [
        'Supports SHA-1, SHA-256, and SHA-512 algorithms.',
        'Powered by the secure, built-in Web Crypto API.',
        'No server interaction ensures your input data remains private.',
      ],
      faqs: [
        { question: 'Is SHA-1 secure?', answer: 'No, use for legacy; prefer SHA-256.' },
        { question: 'Can I hash files?', answer: 'This is text-based; file hashing needs upload.' },
        { question: 'What\'s hex output?', answer: 'Base16 representation of the binary hash.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["sha256 generator online", "sha512 hash calculator", "md5 generator", "string to hash", "web crypto api"],
  },
  {
    id: 'jwt-debugger',
    name: 'JWT Decoder',
    description: 'Decode a JSON Web Token to view its header and payload.',
    seoTitle: 'JWT Decoder - Decode & Inspect JWTs Online',
    seoDescription: 'Decode and inspect JSON Web Tokens (JWTs) with our free online JWT Decoder. View the header and payload of any JWT. 100% private and secure.',
    icon: <JwtIcon />,
    component: JwtDebugger,
    category: ToolCategory.CODING,
    details: {
      introduction: 'The JWT Decoder allows you to quickly inspect the contents of a JSON Web Token. Simply paste the token to see the decoded header and payload data. Note: This tool does not verify the token\'s signature. It solves debugging auth issues by revealing claims without code.',
      explanation: 'How does it work? It splits the token by dots, Base64-decodes header and payload, then parses to JSON.',
      usageExamples: [
        'Debugging API auth tokens in dev tools.',
        'Inspecting user claims in sessions.',
        'Verifying token structure before implementation.'
      ],
      underlyingConcept: 'JWT (RFC 7519) is a compact claims representation, with header, payload, signature. Decoding extracts info; verification needs key. Concept is stateless auth for APIs.',
      howToUse: [
        'Paste your full JWT string into the input text area.',
        'The tool will automatically decode the token.',
        'The decoded header and payload will be displayed in their respective boxes.',
        'If the token is invalid, an error message will be shown.'
      ],
      features: [
        'Decodes JWTs in real-time as you type.',
        'Clearly separates the header and payload.',
        'Pretty-prints the JSON content for readability.',
        'Validates token structure and provides error feedback.'
      ],
      faqs: [
        { question: 'Why no signature verification?', answer: 'It requires the secret key, which varies.' },
        { question: 'Can it decode encrypted JWT?', answer: 'No, only standard Base64.' },
        { question: 'What\'s in the payload?', answer: 'Claims like iss, sub, exp.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["jwt decoder online", "json web token decoder", "inspect jwt", "jwt payload viewer", "auth token debugger"],
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Compare two blocks of text and highlight the differences.',
    seoTitle: 'Diff Checker - Compare Text & Code Online',
    seoDescription: 'Compare two blocks of text or code and highlight the differences with our free online Diff Checker. Perfect for code reviews and tracking changes. 100% private and secure.',
    icon: <DiffIcon />,
    component: DiffChecker,
    category: ToolCategory.CODING,
    details: {
      introduction: 'The Diff Checker helps you compare two pieces of text to find the differences between them. It highlights added and removed lines, making it easy to spot changes in code, documents, or any text-based content. This tool solves the problem of manually scanning for changes, which is error-prone in long texts.',
      explanation: 'How does it work? It uses a diff algorithm like LCS (Longest Common Subsequence) to identify insertions, deletions, and common parts, then highlights them.',
      usageExamples: [
        'Code reviews in pull requests.',
        'Tracking edits in document versions.',
        'Comparing config files for discrepancies.'
      ],
      underlyingConcept: 'Diff is from Unix utilities, based on edit distance. The concept computes minimal changes to transform one string to another, useful in version control like Git.',
      howToUse: [
        'Paste the original text into the left-hand text area.',
        'Paste the changed or new text into the right-hand text area.',
        'The differences will be instantly displayed in the result panel below.',
        'Lines highlighted in red have been removed, and lines in green have been added.'
      ],
      features: [
        'Side-by-side comparison of two text blocks.',
        'Line-by-line difference highlighting.',
        'Real-time updates as you edit the text.',
        'Useful for code reviews, tracking document changes, and more.'
      ],
      faqs: [
        { question: 'Does it handle word-level diffs?', answer: 'This version is line-based; word diffs could be added.' },
        { question: 'What about large texts?', answer: 'Efficient for reasonable sizes.' },
        { question: 'Can it ignore whitespace?', answer: 'Not currently, but future options may include.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["text compare tool", "diff tool online", "compare two text files", "highlight differences", "code diff checker"],
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert CSV data into a structured JSON array.',
    seoTitle: 'CSV to JSON Converter - Free Online Tool',
    seoDescription: 'Convert your CSV data into a structured JSON array with our free online CSV to JSON converter. No registration required, 100% private and secure.',
    icon: <CsvToJsonIcon />,
    component: CsvToJson,
    category: ToolCategory.CODING,
    details: {
      introduction: 'This tool converts data from CSV (Comma-Separated Values) format into a JSON array of objects. It uses the first line of the CSV as headers for the JSON keys. It solves interoperability issues between tabular data and object-based systems like APIs.',
      explanation: 'How does it work? It splits lines by newline, then fields by comma (handling quotes), mapping to objects.',
      usageExamples: [
        'Importing spreadsheet data to web apps.',
        'Converting exports for database ingestion.',
        'Transforming logs for analysis tools.'
      ],
      underlyingConcept: 'CSV is a simple table format; JSON is hierarchical. Conversion maps rows to objects, columns to keys, enabling data exchange between flat files and structured formats.',
      howToUse: [
        'Paste your CSV data into the input text area.',
        'Click the "Convert" button.',
        'The resulting JSON array will be displayed in the output area.',
        'Note: This tool handles basic CSV files and may not support complex cases like multi-line fields.'
      ],
      features: [
        'Fast, client-side conversion.',
        'Handles standard comma-separated values.',
        'Pretty-prints JSON output for readability.',
      ],
      faqs: [
        { question: 'What if no headers?', answer: 'Assumes first row is headers; otherwise, use numbers.' },
        { question: 'Handles quoted commas?', answer: 'Yes, properly parses.' },
        { question: 'Large files?', answer: 'Browser-limited.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["csv to json converter", "convert csv to json online", "spreadsheet to json", "data transformation", "parsing csv"],
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Convert a JSON array of objects into CSV format.',
    seoTitle: 'JSON to CSV Converter - Free Online Tool',
    seoDescription: 'Convert a JSON array of objects into CSV format with our free online JSON to CSV converter. No registration required, 100% private and secure.',
    icon: <JsonToCsvIcon />,
    component: JsonToCsv,
    category: ToolCategory.CODING,
    details: {
      introduction: 'Convert a JSON array of objects into CSV (Comma-Separated Values) format. The keys from the first object in the array are used as the CSV headers. This tool helps export structured data to spreadsheets or simple storage.',
      explanation: 'How does it work? It extracts keys from first object, then for each object, joins values with commas, quoting as needed.',
      usageExamples: [
        'Exporting API data to Excel.',
        'Generating reports from JS objects.',
        'Migrating data to CSV-based tools.'
      ],
      underlyingConcept: 'Reverse of CSV to JSON, flattening objects to rows. Ensures consistency by using union of keys if varying.',
      howToUse: [
        'Paste your JSON array into the input area.',
        'The CSV output will be generated automatically.',
        'You can copy the result or download it as a .csv file.',
      ],
      features: [
        'Handles conversion from a JSON array of objects.',
        'Automatically uses keys from the first object as headers.',
        'Correctly quotes fields containing commas or newlines.',
        'Option to download the result as a .csv file.',
      ],
      faqs: [
        { question: 'What if objects have different keys?', answer: 'Uses all unique keys, filling missing with empty.' },
        { question: 'Nested objects?', answer: 'Flattens or skips; basic flat objects best.' },
        { question: 'Download format?', answer: 'UTF-8 CSV.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["json to csv converter", "convert json to csv online", "json array to csv", "export json to excel", "data export"],
  },
  {
    id: 'csv-to-xlsx',
    name: 'CSV to XLSX',
    description: 'Convert CSV data directly into an Excel (.xlsx) file.',
    seoTitle: 'CSV to XLSX Converter - Free Online Tool',
    seoDescription: 'Convert your CSV data directly into an Excel (.xlsx) file with our free online CSV to XLSX converter. No registration required, 100% private and secure.',
    icon: <CsvToXlsxIcon />,
    component: CsvToXlsx,
    category: ToolCategory.CODING,
    details: {
      introduction: 'Easily convert your CSV data into a downloadable Excel spreadsheet (.xlsx format). This tool processes the data in your browser and generates a file for you to save, solving the need for offline tools or servers for quick conversions.',
      explanation: 'How does it work? Uses libraries like SheetJS to parse CSV and create an XLSX binary, then triggers download.',
      usageExamples: [
        'Sharing CSV data with non-tech users via Excel.',
        'Importing logs to spreadsheets for analysis.',
        'Batch converting reports.'
      ],
      underlyingConcept: 'XLSX is XML-based format by Microsoft. Conversion involves mapping CSV rows to sheet cells, preserving data types where possible.',
      howToUse: [
        'Paste your CSV data into the text area.',
        'Click the "Download .xlsx" button.',
        'Your browser will prompt you to save the generated Excel file.',
      ],
      features: [
        'Direct conversion to modern Excel .xlsx format.',
        'Completely client-side, no data is uploaded.',
        'Handles headers and data rows correctly.',
      ],
      faqs: [
        { question: 'Does it support formulas?', answer: 'No, plain data only.' },
        { question: 'Large datasets?', answer: 'Depends on browser; small to medium best.' },
        { question: 'Encoding?', answer: 'UTF-8.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["csv to excel converter", "convert csv to xlsx online", "spreadsheet conversion", "data export", "csv file opener"],
  },
  {
    id: 'xlsx-to-csv',
    name: 'XLSX to CSV',
    description: 'Extract data from an Excel (.xlsx) file and convert it to CSV.',
    seoTitle: 'XLSX to CSV Converter - Free Online Tool',
    seoDescription: 'Extract data from an Excel (.xlsx) file and convert it to CSV format with our free online XLSX to CSV converter. No registration required, 100% private and secure.',
    icon: <XlsxToCsvIcon />,
    component: XlsxToCsv,
    category: ToolCategory.CODING,
    details: {
      introduction: 'This tool allows you to upload an Excel file (.xlsx) and convert the first sheet into CSV format. The conversion happens entirely within your browser for complete privacy, useful for simplifying data or importing to other systems.',
      explanation: 'How does it work? Reads file with FileReader, parses with SheetJS, extracts first sheet, converts to CSV string.',
      usageExamples: [
        'Extracting data from Excel for scripting.',
        'Converting reports to plain text.',
        'Batch processing spreadsheets.'
      ],
      underlyingConcept: 'Reverse of CSV to XLSX, extracting cell values to delimited strings. Handles types like dates by stringifying.',
      howToUse: [
        'Click "Upload XLSX File" and select your file, or drag and drop a file onto the area.',
        'The data from the first sheet of your Excel file will be converted to CSV and displayed.',
        'You can then copy the CSV data or download it as a file.',
      ],
      features: [
        'Reads .xlsx and other spreadsheet formats.',
        'Converts the first worksheet into CSV data.',
        'Provides options to copy or download the resulting CSV.',
      ],
      faqs: [
        { question: 'Multiple sheets?', answer: 'Only first; select in Excel first.' },
        { question: 'Formulas?', answer: 'Converts calculated values.' },
        { question: 'File size limit?', answer: 'Browser-dependent.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["excel to csv converter", "convert xlsx to csv online", "spreadsheet to csv", "data extraction", "xlsx file reader"],
  },
  // Image Tools
  {
    id: 'image-to-base64',
    name: 'Image to Base64',
    description: 'Convert an image file into a Base64 data URL string.',
    seoTitle: 'Image to Base64 Converter - Online Tool',
    seoDescription: 'Convert any image file (PNG, JPEG, GIF, SVG) into a Base64 data URL string with our free online Image to Base64 converter. 100% private and secure.',
    icon: <ImageIcon />,
    component: ImageToBase64,
    category: ToolCategory.IMAGE,
    featured: true,
    details: {
      tip: "Base64 is great for small icons or logos in your website\'s CSS. It can reduce HTTP requests and make your site load a tiny bit faster!",
      introduction: 'This tool converts an image file from your computer into a Base64-encoded Data URL. This format can be directly embedded in HTML or CSS files, which can be useful for reducing HTTP requests for small icons and images, solving performance issues in web pages.',
      explanation: 'How does it work? Uploads image, reads as data URL via FileReader, which includes Base64.',
      usageExamples: [
        'Embedding logos in email signatures.',
        'Inlining images in CSS for faster loads.',
        'Storing images in JSON for apps.'
      ],
      underlyingConcept: 'Data URLs (RFC 2397) embed resources inline. Base64 encodes binary to text, allowing image data in URLs like data:image/png;base64,...',
      howToUse: [
        'Click the "Upload an image" button and select an image file from your device.',
        'An image preview will appear on the left.',
        'The corresponding Base64 Data URL will be generated and displayed on the right.',
        'Click the "Copy" button to copy the entire Base64 string.'
      ],
      features: [
        'Works with common image formats like PNG, JPEG, GIF, and SVG.',
        'Provides an instant preview of the uploaded image.',
        'Generates a complete Data URL, ready for use in `src` or `url()` attributes.',
      ],
      faqs: [
        { question: 'Why use Data URLs?', answer: 'Reduces server requests for small files.' },
        { question: 'Size increase?', answer: 'Yes, 33% overhead.' },
        { question: 'Browser support?', answer: 'Universal for modern browsers.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["image to base64 converter", "data uri generator", "embed image in html", "css background image base64", "png to base64"],
  },
  {
    id: 'base64-to-image',
    name: 'Base64 to Image',
    description: 'Convert a Base64 data URL into a viewable image.',
    seoTitle: 'Base64 to Image Converter - Online Tool',
    seoDescription: 'Convert a Base64 data URL string back into a viewable image with our free online Base64 to Image converter. 100% private and secure.',
    icon: <Base64ToImageIcon />,
    component: Base64ToImage,
    category: ToolCategory.IMAGE,
    details: {
      introduction: 'If you have a Base64 Data URL, this tool can decode it back into a viewable image. You can then preview the image and download it as a file, solving the need to extract embedded images from code or data.',
      explanation: 'How does it work? Sets the Data URL as img src for preview, then creates blob for download.',
      usageExamples: [
        'Extracting images from CSS code.',
        'Downloading embedded email images.',
        'Converting API responses to files.'
      ],
      underlyingConcept: 'Reverse of encoding, parsing MIME type and Base64 to binary, then rendering as image.',
      howToUse: [
        'Paste a valid Base64 Data URL (starting with `data:image/...`) into the text area.',
        'The image will be rendered in the preview box below.',
        'If the image is valid, a "Download Image" button will appear.',
        'Click the button to save the image to your device.'
      ],
      features: [
        'Renders an image preview from a Base64 string.',
        'Allows downloading of the decoded image.',
        'Provides validation to ensure the string is a valid image Data URL.',
      ],
      faqs: [
        { question: 'What formats?', answer: 'Any in Data URL, like PNG, JPG.' },
        { question: 'Invalid string?', answer: 'Shows error.' },
        { question: 'Download name?', answer: 'Generic; rename after.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["base64 to image converter", "decode base64 to image", "view base64 image", "data uri viewer", "base64 image downloader"],
  },
  // CSS Tools
  {
    id: 'box-shadow-generator',
    name: 'Box Shadow Generator',
    description: 'Create and customize CSS box-shadow effects with a visual editor.',
    seoTitle: 'CSS Box Shadow Generator - Visual Tool',
    seoDescription: 'Create and customize CSS box-shadow effects with our free visual editor. Generate the perfect box-shadow for your project. 100% private and secure.',
    icon: <BoxShadowIcon />,
    component: BoxShadowGenerator,
    category: ToolCategory.CSS,
    details: {
      introduction: 'Visually design complex CSS `box-shadow` effects. This generator provides sliders and color pickers to intuitively create the perfect shadow, then gives you the CSS code to copy and paste. It solves trial-and-error in CSS editing for shadows.',
      explanation: 'How does it work? Updates CSS property in preview element based on inputs, generates string like "x y blur spread color".',
      usageExamples: [
        'Designing card components in UI.',
        'Adding depth to buttons.',
        'Creating neumorphic effects.'
      ],
      underlyingConcept: 'Box-shadow is CSS3 property for layered shadows. Concept mimics light and depth in 2D, with params for position, size, color.',
      howToUse: [
        'Use the sliders to adjust the Horizontal and Vertical Offsets, Blur, and Spread.',
        'Adjust the opacity slider and choose a shadow color.',
        'Toggle the "Inset" checkbox to create an inner shadow.',
        'A live preview of the shadow will be shown on the example element.',
        'Copy the generated CSS code from the code box.'
      ],
      features: [
        'Live visual feedback for all shadow properties.',
        'Controls for offset, blur, spread, color, and opacity.',
        'Support for both outset and inset shadows.',
        'One-click copy of the generated CSS rule.'
      ],
      faqs: [
        { question: 'Multiple shadows?', answer: 'Not yet; comma-separated in future.' },
        { question: 'Browser compatibility?', answer: 'CSS3 standard.' },
        { question: 'Units?', answer: 'Pixels.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["css box shadow generator", "visual box shadow tool", "css shadow creator", "drop shadow css", "inset shadow generator"],
  },
  {
    id: 'css-gradient-generator',
    name: 'CSS Gradient Generator',
    description: 'Create beautiful CSS gradients with color pickers and angle controls.',
    seoTitle: 'CSS Gradient Generator - Create Gradients Online',
    seoDescription: 'Create beautiful linear and radial CSS gradients with our free visual editor. Perfect for modern web design. 100% private and secure.',
    icon: <GradientIcon />,
    component: CssGradientGenerator,
    category: ToolCategory.CSS,
    details: {
      introduction: 'Unleash your creativity with our intuitive CSS Gradient Generator. Effortlessly design stunning, professional-grade gradients for any project. Our visual editor provides a seamless experience, allowing you to choose from a vibrant spectrum of colors, fine-tune angles, and instantly switch between linear and radial styles. Whether you\'re crafting eye-catching backgrounds, creating dynamic buttons, or building breathtaking hero sections, our tool is the perfect companion for modern web design.',
      explanation: 'Our CSS Gradient Generator simplifies the gradient creation process by providing a powerful and interactive interface. As you select and adjust colors, angles, and positions, the tool dynamically generates the corresponding CSS code in real-time. This immediate feedback loop allows you to experiment and iterate quickly, ensuring you achieve the perfect look for your design. The generator handles all the complex syntax, so you can focus on the creative aspect of your work.',
      usageExamples: [
        'Designing a vibrant, multi-toned background for a landing page to capture visitor attention.',
        'Creating subtle gradients for UI elements like cards and buttons to add depth and a modern feel.',
        'Building a dramatic, full-screen hero image with a gradient overlay for a powerful visual impact.',
        'Generating a consistent set of gradients for a design system or brand style guide.',
        'Experimenting with different color combinations and gradient types for design inspiration.'
      ],
      underlyingConcept: 'CSS gradients are a powerful feature of modern web design, allowing for smooth and dynamic color transitions without the need for image files. Linear gradients progress along a straight line, which can be oriented at any angle. Radial gradients, on the other hand, emanate from a single point, creating circular or elliptical color spreads. Our tool leverages these native CSS capabilities to provide a flexible and powerful way to create a wide range of visual effects.',
      howToUse: [
        'Choose between Linear or Radial gradient type.',
        'For linear gradients, adjust the angle using the slider.',
        'For radial gradients, select the shape and position from the dropdowns.',
        'Click on the color stops to change colors.',
        'Click the "+" icon between color stops to add a new color.',
        'Adjust the position of each color stop with the slider.',
        'Use the presets for quick inspiration.',
        'Copy the generated CSS code from the output box.'
      ],
      features: [
        'Support for both linear and radial gradients',
        'Real-time visual preview',
        'Add multiple color stops',
        'Color picker and text input for precise color selection',
        'Angle control for linear gradients',
        'Position and shape control for radial gradients',
        'A wide variety of presets to get you started'
      ],
      faqs: [
        { question: 'How do I create a CSS gradient background?', answer: 'Our tool makes it easy! Simply choose your colors, set the gradient type (linear or radial), and adjust the options. The tool will generate the CSS code for you, which you can then apply to the `background` property of any HTML element.' },
        { question: 'What is the difference between linear and radial gradients?', answer: 'A linear gradient creates a transition of colors along a straight line. You can control the direction of this line with an angle. A radial gradient, on the other hand, transitions colors outwards from a central point in a circular or elliptical shape.' },
        { question: 'How to animate CSS gradients smoothly?', answer: 'Animating the `background-gradient` property directly is not performant. A better technique is to create a larger gradient and animate its `background-position`. This creates a smooth, looping animation. While our tool doesn\'t generate the animation code directly, you can use the generated gradient as a starting point for this technique.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["css gradient generator", "gradient generator online", "css gradient background generator", "linear gradient css generator", "radial gradient css generator", "conic gradient generator", "css gradient code generator", "gradient background maker for website", "css gradient editor live preview", "animated css gradient generator", "gradient button generator css", "css gradient tutorial for beginners", "generate css gradient code free", "multi color css gradient generator", "best css gradient generator 2025", "how to make css gradient background", "css gradient maker with angle control", "css gradient presets for UI design", "copy css gradient code", "css gradient generator for tailwind"],
  },
  {
    id: 'border-radius-generator',
    name: 'Border Radius Generator',
    description: 'Create custom border radius values with individual corner controls.',
    seoTitle: 'CSS Border Radius Generator - Visual Tool',
    seoDescription: 'Create custom CSS border-radius values with our free visual editor. Control each corner individually to create unique shapes. 100% private and secure.',
    icon: <BorderRadiusIcon />,
    component: BorderRadiusGenerator,
    category: ToolCategory.CSS,
    details: {
      introduction: 'Design perfect rounded corners with individual control over each corner. Create everything from subtle rounded squares to pill-shaped elements and unique organic shapes.',
      explanation: 'How does it work? Maps slider values to CSS border-radius property. Supports both px and % units with optional corner linking.',
      usageExamples: [
        'Creating modern card designs',
        'Designing pill-shaped buttons',
        'Building organic, rounded UI elements',
        'Creating speech bubble shapes'
      ],
      underlyingConcept: 'Border-radius rounds corners by specifying radius values. Can be uniform or individual per corner (top-left, top-right, bottom-right, bottom-left).',
      howToUse: [
        'Choose between px or % units',
        'Toggle "Link all corners" to control all corners together',
        'Adjust individual corner sliders for custom shapes',
        'Watch the live preview update in real-time',
        'Copy the generated CSS code'
      ],
      features: [
        'Individual control for each corner',
        'Link corners option for uniform rounding',
        'Support for both px and % units',
        'Real-time visual preview',
        'Shape ideas and tips included'
      ],
      faqs: [
        { question: 'Negative values?', answer: 'Not supported; radius must be positive.' },
        { question: 'Complex shapes?', answer: 'Use different values per corner.' },
        { question: 'Performance?', answer: 'Border-radius is well-optimized.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["css border radius generator", "rounded corners css", "custom shape css", "visual border radius tool", "css shape generator"],
  },
  {
    id: 'text-shadow-generator',
    name: 'Text Shadow Generator',
    description: 'Create beautiful text shadows with precise control over position and blur.',
    seoTitle: 'CSS Text Shadow Generator - Visual Tool',
    seoDescription: 'Create beautiful CSS text-shadow effects with our free visual editor. Control position, blur, color, and opacity. 100% private and secure.',
    icon: <TextShadowIcon />,
    component: TextShadowGenerator,
    category: ToolCategory.CSS,
    details: {
      introduction: 'Add depth and style to your text with custom shadow effects. Control position, blur, color, and opacity to create everything from subtle depth to dramatic glow effects.',
      explanation: 'How does it work? Combines X/Y offsets, blur radius, and color with opacity to generate CSS text-shadow property. Updates preview text in real-time.',
      usageExamples: [
        'Creating text with depth and dimension',
        'Designing glowing text effects',
        'Adding subtle shadows to headings',
        'Building dramatic text treatments'
      ],
      underlyingConcept: 'Text-shadow creates a shadow behind text. Defined by horizontal offset, vertical offset, blur radius, and color.',
      howToUse: [
        'Adjust the horizontal and vertical offset sliders',
        'Set the blur radius for softness',
        'Choose shadow color and adjust opacity',
        'Customize text and background colors for preview',
        'Copy the generated CSS code'
      ],
      features: [
        'Precise control over shadow position and blur',
        'Color picker with opacity control',
        'Customizable text and background colors',
        'Real-time preview with sample text',
        'Full CSS example generation'
      ],
      faqs: [
        { question: 'Multiple shadows?', answer: 'Not yet; comma-separated in future.' },
        { question: 'Browser support?', answer: 'Excellent; CSS3 standard.' },
        { question: 'Performance?', answer: 'Text-shadow is well-optimized.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["css text shadow generator", "text glow effect css", "3d text css", "visual text shadow tool", "font shadow"],
  },
  {
    id: 'glassmorphism-generator',
    name: 'Glassmorphism & Neumorphism Generator',
    description: 'Create modern glassmorphism and neumorphism effects with visual controls.',
    seoTitle: 'Glassmorphism & Neumorphism Generator - CSS Tool',
    seoDescription: 'Create modern glassmorphism and neumorphism CSS effects with our free visual generator. Perfect for contemporary web design. 100% private and secure.',
    icon: <GlassmorphismIcon />,
    component: GlassmorphismGenerator,
    category: ToolCategory.CSS,
    details: {
      introduction: 'Create stunning modern UI effects including glassmorphism (frosted glass) and neumorphism (soft, extruded) designs. Perfect for contemporary web and mobile interfaces.',
      explanation: 'How does it work? Glassmorphism uses backdrop-filter with transparency, neumorphism uses dual shadows. Combines multiple CSS properties for complex effects.',
      usageExamples: [
        'Building modern mobile app interfaces',
        'Creating frosted glass navigation bars',
        'Designing soft, tactile UI elements',
        'Building contemporary dashboard components'
      ],
      underlyingConcept: 'Glassmorphism mimics frosted glass with blur + transparency. Neumorphism creates soft, extruded surfaces with dual shadows.',
      howToUse: [
        'Choose between Glassmorphism or Neumorphism style',
        'For glassmorphism: adjust opacity, blur, and border settings',
        'For neumorphism: set background color and shadow properties',
        'Fine-tune shadow position, blur, and opacity',
        'Copy the generated CSS code'
      ],
      features: [
        'Two distinct modern design styles',
        'Comprehensive control over all effect parameters',
        'Real-time visual preview with background',
        'Detailed tips and usage guidance',
        'Complete CSS code generation'
      ],
      faqs: [
        { question: 'Browser support?', answer: 'Glassmorphism needs modern browsers.' },
        { question: 'Performance?', answer: 'Backdrop-filter can be intensive.' },
        { question: 'Accessibility?', answer: 'Ensure sufficient contrast.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["glassmorphism css generator", "frosted glass effect css", "neumorphism ui generator", "css blur background", "modern ui design"],
  },
  // Color Tools
  {
    id: 'color-palette-generator',
    name: 'Color Palette Generator',
    description: 'Generate color palettes from a base color.',
    seoTitle: 'Color Palette Generator - Create Color Schemes',
    seoDescription: 'Generate beautiful color palettes from a base color with our free Color Palette Generator. Create monochromatic, analogous, and complementary schemes. 100% private and secure.',
    icon: <PaletteIcon />,
    component: ColorPaletteGenerator,
    category: ToolCategory.COLOR,
    details: {
      introduction: 'Create harmonious color schemes based on a single base color. This tool can generate different types of palettes, such as monochromatic, analogous, complementary, and triadic, to help you with your design projects, solving color selection challenges.',
      explanation: 'How does it work? Uses HSL model to adjust hue, saturation, lightness based on scheme rules (e.g., complementary adds 180 degrees hue).',
      usageExamples: [
        'Designing website themes.',
        'Creating brand color sets.',
        'Inspiring art with variations.'
      ],
      underlyingConcept: 'Color theory: harmonious schemes from wheel positions. Monochromatic varies value, analogous adjacent hues, etc.',
      howToUse: [
        'Select your base color using the color picker or by entering a HEX code.',
        'Choose the type of palette you want to generate from the dropdown menu (e.g., Monochromatic).',
        'The tool will instantly generate and display a 5-color palette.',
        'Click on any color\'s HEX code to copy it to your clipboard.'
      ],
      features: [
        'Generates Monochromatic, Analogous, Complementary, and Triadic palettes.',
        'Starts from any base color you choose.',
        'Visual preview of the generated color scheme.',
        'Easy one-click copying of color codes.'
      ],
      faqs: [
        { question: 'Custom shades?', answer: 'Fixed 5; adjustable in future.' },
        { question: 'Accessibility check?', answer: 'No, but use contrast tools separately.' },
        { question: 'Export?', answer: 'Copy codes; no file yet.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["color palette generator", "color scheme generator", "design color combinations", "monochromatic color palette", "complementary colors"],
  },
  {
    id: 'color-theme-wheel',
    name: 'Color Theme Generator (Color Wheel)',
    description: 'Generate color themes using an interactive color wheel and scheme presets (analogous, complementary, triad, etc.).',
    seoTitle: 'Color Theme Generator - Interactive Color Wheel',
    seoDescription: 'Generate beautiful color themes with our interactive color wheel. Choose from analogous, complementary, and triadic schemes. 100% private and secure.',
    icon: <PaletteIcon />,
    component: ColorThemeWheel,
    category: ToolCategory.COLOR,
    details: {
      introduction: 'Design color themes interactively with a color wheel. Pick your base hue and saturation on the wheel, set lightness, choose a scheme (monochromatic, analogous, complementary, split-complementary, triad, tetrad), and export CSS variables or JSON.',
      howToUse: [
        'Drag on the color wheel to select the hue (angle) and saturation (distance).',
        'Use the Lightness slider to adjust perceived brightness.',
        'Select a scheme from the dropdown to generate related colors.',
        'Copy individual HEX values, or export the full set as CSS variables or JSON.'
      ],
      features: [
        'Interactive color wheel for hue and saturation.',
        'Scheme presets: monochromatic, analogous, complementary, split-complementary, triad, tetrad.',
        'Live swatch preview grid.',
        'One-click export to CSS variables and JSON.',
        'All computations in-browser.'
      ],
      privacy: PRIVACY_STATEMENT,
      explanation: 'The wheel maps pointer angle to hue (0–360°) and distance from center to saturation (0–100%). Generated palettes are computed by rotating the hue by fixed offsets for each scheme, with optional lightness variants to provide balance.',
      usageExamples: [
        'Build a UI theme quickly by selecting a base color and triad scheme for accent pairs.',
        'Create brand-compliant color sets by starting from the primary brand hue and using analogous variations.',
        'Export CSS variables to wire a theme into a design system.'
      ],
      underlyingConcept: 'Color harmonies are based on angular relationships on the color wheel. In HSL space, rotating hue while maintaining saturation/lightness approximates classic design relationships. Practical palettes also vary lightness to provide usable contrast.',
      faqs: [
        { question: 'Can I export more than 5 colors?', answer: 'This version outputs 5 swatches per scheme; you can regenerate new sets or extend manually.' },
        { question: 'Does it support alpha?', answer: 'This tool focuses on opaque HEX outputs; use the Color Code Converter for alpha.' },
        { question: 'Is the color wheel physically accurate?', answer: 'It uses a practical HSL-based approach suitable for UI work; not a perceptually uniform space.' }
      ]
    },
    keywords: ["color wheel tool", "color harmony generator", "triadic color scheme", "analogous colors", "color picker online"],
  },
  {
    id: 'css-color-code-converter',
    name: 'CSS Color Code Converter',
    description: 'Convert between HEX/HEXA, RGB/RGBA, HSL/HSLA, and CSS color keywords.',
    seoTitle: 'CSS Color Code Converter - HEX, RGB, HSL',
    seoDescription: 'Convert between HEX, RGB, and HSL color codes with our free online CSS Color Code Converter. Supports alpha channels (HEXA, RGBA, HSLA). 100% private and secure.',
    icon: <ColorIcon />,
    component: CssColorCodeConverter,
    category: ToolCategory.COLOR,
    details: {
      introduction: 'Convert color values across HEX/HEXA, RGB/RGBA, HSL/HSLA, and CSS color keywords with synchronized inputs and a live preview. Perfect for designers and developers ensuring color consistency across tools and code.',
      howToUse: [
        'Enter a color in any format: HEX/HEXA, RGB/RGBA, or HSL/HSLA.',
        'Use the alpha slider to adjust transparency (applies to RGBA/HSLA/HEXA).',
        'Optional: type a CSS color keyword (e.g., rebeccapurple) and click Resolve to convert it.',
        'Click Copy on any format to copy the current color string to the clipboard.'
      ],
      features: [
        'Bidirectional synchronization across HEX, RGB, and HSL inputs.',
        'HEXA and alpha support with a dedicated transparency slider.',
        'CSS keyword resolver (e.g., tomato, slateblue).',
        'Live preview swatch with brand-styled UI.',
        'Validation with clear error messages.',
        'All operations run locally in your browser.'
      ],
      privacy: PRIVACY_STATEMENT,
      explanation: 'The converter parses the input format and normalizes to RGBA. RGB and HSL are converted using standard color space math. HEX/HEXA values are generated from the RGBA channels. CSS keywords are resolved by applying the keyword to a temporary element and reading the computed RGB value from the browser.',
      usageExamples: [
        'Convert a HEX brand color to HSL to create lighter/darker variants using the Lightness channel.',
        'Convert an RGBA overlay to HEXA for use in CSS variables.',
        'Translate a designer-provided HSL color to RGB for a canvas drawing routine.'
      ],
      underlyingConcept: 'RGB is an additive color model represented by red, green, and blue channels (0-255). HSL is a cylindrical representation with hue (0-360), saturation, and lightness (0-1). HEX is a compact hex-encoded representation of RGB (with optional alpha for HEXA). Conversions use deterministic formulas between these spaces.',
      faqs: [
        { question: 'Does it support alpha?', answer: 'Yes. The alpha slider updates RGBA/HSLA and HEXA outputs. HEX (without alpha) is also available.' },
        { question: 'Can it handle short HEX like #abc?', answer: 'Yes. 3-digit and 4-digit short HEX/HEXA are supported and expanded to full form internally.' },
        { question: 'Are named colors supported?', answer: 'Yes. Enter a CSS color keyword (like rebeccapurple) and click Resolve.' }
      ]
    },
    keywords: ["hex to rgb converter", "hsl to hex", "rgba color picker", "css color converter", "color code translator"],
  },
  // Math Tools
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between common units of measurement.',
    seoTitle: 'Unit Converter - Length, Weight, & More',
    seoDescription: 'Convert between common units of measurement for length, weight, and more with our free online Unit Converter. 100% private and secure.',
    icon: <UnitConverterIcon />,
    component: UnitConverter,
    category: ToolCategory.MATH,
    details: {
      introduction: 'A versatile tool for converting between various units of measurement for length and weight. It provides quick and accurate conversions without needing to search online, solving everyday calculation needs in cooking, travel, or science.',
      explanation: 'How does it work? Uses predefined factors (e.g., 1 inch = 2.54 cm) to multiply/divide input.',
      usageExamples: [
        'Converting recipe ingredients from grams to ounces.',
        'Planning travel distances in km to miles.',
        'Scientific data from metric to imperial.'
      ],
      underlyingConcept: 'Unit conversion uses ratios. Base units like meter/kg, others derived. Accuracy depends on precise constants.',
      howToUse: [
        'Select the category of measurement (Length or Weight).',
        'Enter the value you wish to convert in the "From" field.',
        'Select the starting unit from the first dropdown.',
        'Select the target unit from the second dropdown.',
        'The converted value will instantly appear in the "To" field.'
      ],
      features: [
        'Supports Length (meters, km, cm, miles, feet, inches) and Weight (kg, g, mg, pounds, ounces).',
        'Intuitive interface for quick conversions.',
        'Real-time calculation as you input values.',
      ],
      faqs: [
        { question: 'More categories?', answer: 'Length/weight now; volume/temp future.' },
        { question: 'Precision?', answer: 'Up to decimals; rounds sensibly.' },
        { question: 'Custom units?', answer: 'No, standard only.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["unit converter online", "metric to imperial converter", "length converter", "weight converter", "measurement conversion"],
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between currencies with near real-time rates.',
    seoTitle: 'Currency Converter - Live Exchange Rates',
    seoDescription: 'Convert between currencies with near real-time exchange rates using our free Currency Converter. Supports a wide range of global currencies. 100% private and secure.',
    icon: <CurrencyIcon />,
    component: CurrencyConverter,
    category: ToolCategory.MATH,
    details: {
      introduction: 'This Currency Converter provides exchange rates for a wide range of global currencies. It fetches up-to-date rates to give you an accurate conversion based on the latest financial data, useful for travel, shopping, or finance.',
      explanation: 'How does it work? Fetches rates from API, multiplies amount by rate.',
      usageExamples: [
        'Travelers checking costs abroad.',
        'Online shoppers comparing prices.',
        'Businesses calculating invoices.'
      ],
      underlyingConcept: 'Exchange rates fluctuate based on markets. Conversion is simple multiplication, but rates update frequently.',
      howToUse: [
        'Enter the amount you want to convert in either the "From" or "To" field.',
        'Select your desired currencies from the dropdown menus.',
        'The tool will automatically calculate and display the converted amount.',
        'Click the swap button to easily reverse the conversion direction.'
      ],
      features: [
        'Uses up-to-date exchange rates from an external API.',
        'Supports a large number of international currencies.',
        'Two-way conversion (editing either amount updates the other).',
      ],
      faqs: [
        { question: 'How current are rates?', answer: 'Updated daily or hourly via API.' },
        { question: 'Fees included?', answer: 'No, mid-market rates.' },
        { question: 'Offline?', answer: 'Needs internet for rates.' }
      ],
      privacy: "This tool fetches exchange rates from a third-party API (open.er-api.com). The amounts and currencies you select are used for calculation in your browser and are not sent to our servers. Please refer to the API provider\'s privacy policy for their data handling practices."
    },
    keywords: ["currency converter online", "exchange rate calculator", "forex converter", "dollar to euro", "live exchange rates"],
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index.',
    seoTitle: 'BMI Calculator - Check Your Body Mass Index',
    seoDescription: 'Calculate your Body Mass Index (BMI) with our free online BMI Calculator. Supports both metric and imperial units. 100% private and secure.',
    icon: <BmiIcon />,
    component: BmiCalculator,
    category: ToolCategory.MATH,
    details: {
      introduction: 'The Body Mass Index (BMI) Calculator is a tool that helps estimate body fat based on your weight and height. It provides a general indication of whether you are in a healthy weight range for your height, aiding health awareness.',
      explanation: 'How does it work? BMI = weight / height^2 (kg/m2), categorizes based on WHO ranges.',
      usageExamples: [
        'Personal health tracking.',
        'Fitness apps input.',
        'Medical quick checks.'
      ],
      underlyingConcept: 'BMI, devised by Quetelet in 1830s, correlates height/weight to fat. Limitations exist for athletes, but useful screen.',
      howToUse: [
        'Select your preferred unit system (Metric or Imperial).',
        'Enter your height and weight in the appropriate fields.',
        'The tool will automatically calculate your BMI and display the result.',
        'Your BMI category (e.g., Underweight, Normal, Overweight) will also be shown.'
      ],
      features: [
        'Supports both Metric (cm/kg) and Imperial (ft, in/lbs) units.',
        'Instant BMI calculation.',
        'Provides BMI value and corresponding weight status category.',
        'Color-coded results for easy interpretation.'
      ],
      faqs: [
        { question: 'Accurate for all?', answer: 'General; not for kids/athletes.' },
        { question: 'What\'s healthy BMI?', answer: '18.5-24.9 typically.' },
        { question: 'Alternatives?', answer: 'Body fat %, waist ratio.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["bmi calculator", "body mass index calculator", "healthy weight calculator", "bmi chart", "fitness calculator"],
  },
  {
    id: 'date-calculator',
    name: 'Date Calculator',
    description: 'Calculate duration between dates or add/subtract days.',
    seoTitle: 'Date Calculator - Add/Subtract Days & Find Duration',
    seoDescription: 'Calculate the duration between two dates or find a future/past date by adding or subtracting days with our free online Date Calculator. 100% private and secure.',
    icon: <DateCalcIcon />,
    component: DateCalculator,
    category: ToolCategory.MATH,
    details: {
      introduction: 'This versatile Date Calculator has two modes. It can calculate the total duration (in days and weeks) between two dates, or it can calculate a future or past date by adding or subtracting a specific number of days from a starting date. Useful for planning, deadlines.',
      explanation: 'How does it work? Uses Date objects, milliseconds differences for duration, setDate for add/subtract.',
      usageExamples: [
        'Calculating age in days.',
        'Project deadline projections.',
        'Vacation duration.'
      ],
      underlyingConcept: 'Date math handles Gregorian calendar, leap years. Duration is (end - start) / 86400000 ms/day.',
      howToUse: [
        'Select a mode: "Duration Between Dates" or "Add/Subtract Days".',
        'For Duration mode: select a Start Date and an End Date to see the time between them.',
        'For Add/Subtract mode: select a Start Date, choose "Add" or "Subtract", and enter the number of days to calculate the resulting date.'
      ],
      features: [
        'Dual modes for flexible date calculations.',
        'Calculates duration in both days and weeks.',
        'Easily add or subtract days from any given date.',
        'User-friendly date pickers for easy input.'
      ],
      faqs: [
        { question: 'Leap years?', answer: 'Handled automatically.' },
        { question: 'Time zones?', answer: 'Local time.' },
        { question: 'Months/years add?', answer: 'Days only now.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["date calculator", "days between dates", "add days to date", "time duration calculator", "date difference"],
  },
  // Productivity Tools
  {
    id: 'world-clock',
    name: 'World Clock',
    description: 'Display and compare the current time in different cities.',
    seoTitle: 'World Clock - Compare Time in Different Cities',
    seoDescription: 'Display and compare the current time in multiple cities around the world with our free online World Clock. Perfect for international teams. 100% private and secure.',
    icon: <WorldClockIcon />,
    component: WorldClock,
    category: ToolCategory.PRODUCTIVITY,
    details: {
      introduction: 'Keep track of the current time in multiple cities around the world. This tool is perfect for coordinating with international teams, scheduling meetings across time zones, or simply staying connected with friends and family abroad.',
      explanation: 'How does it work? Uses Intl.DateTimeFormat with timeZone option to format local time for each city.',
      usageExamples: [
        'Remote workers syncing with global offices.',
        'Travelers checking home time.',
        'Event planners for international calls.'
      ],
      underlyingConcept: 'Time zones are UTC offsets. Tool calculates from system time, handling DST via browser API.',
      howToUse: [
        'The clock displays a default set of cities.',
        'To add a new city, select one from the dropdown menu.',
        'To remove a city, click the trash can icon next to it.',
        'Your selected cities are saved in your browser for your next visit.'
      ],
      features: [
        'Displays time for multiple locations simultaneously.',
        'Shows both the time and the current date for each location.',
        'Your list of clocks is saved locally using `localStorage`.',
        'Real-time updates every second.'
      ],
      faqs: [
        { question: 'DST handling?', answer: 'Automatic via browser.' },
        { question: 'City list?', answer: 'Common ones; searchable.' },
        { question: 'Offline?', answer: 'Yes, but time from system.' }
      ],
      privacy: "Your selected clock preferences are stored in your browser\'s `localStorage` and are not sent to any server."
    },
    keywords: ["world clock", "time in different cities", "global time checker", "time zone comparison", "international time"],
  },
  {
    id: 'timers-stopwatch',
    name: 'Timers & Stopwatch',
    description: 'Use a countdown timer or a stopwatch with lap functionality.',
    seoTitle: 'Timers & Stopwatch - Online Countdown & Lap Timer',
    seoDescription: 'Use our free online Timer and Stopwatch with lap functionality. Perfect for workouts, cooking, and timing events. 100% private and secure.',
    icon: <TimersIcon />,
    component: TimersAndStopwatch,
    category: ToolCategory.PRODUCTIVITY,
    details: {
      introduction: 'A multi-function timekeeping tool. Use the countdown Timer for tasks with a set duration, or switch to the Stopwatch to accurately measure elapsed time, complete with lap tracking. Great for workouts, cooking, or timing events.',
      explanation: 'How does it work? Uses setInterval for ticking, notifications for timer end.',
      usageExamples: [
        'Timing study sessions.',
        'Tracking race laps.',
        'Cooking reminders.'
      ],
      underlyingConcept: 'Timing uses system clock. Stopwatch accumulates, timer decrements. Laps snapshot intervals.',
      howToUse: [
        'Select either "Timer" or "Stopwatch" mode.',
        'For the Timer: set the hours, minutes, and seconds, then click "Start". You can also pause and reset.',
        'For the Stopwatch: click "Start" to begin timing, "Stop" to pause, "Lap" to record a lap time, and "Reset" to clear.',
      ],
      features: [
        'Easy-to-use countdown timer with desktop notifications (if permission is granted).',
        'Precise stopwatch with millisecond accuracy.',
        'Lap recording functionality to track split times.',
        'Clean interface showing only the relevant controls for each mode.'
      ],
      faqs: [
        { question: 'Background running?', answer: 'Browser may throttle; keep tab open.' },
        { question: 'Sound?', answer: 'Yes for timer end.' },
        { question: 'Multiple timers?', answer: 'Single now.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["online stopwatch", "countdown timer", "lap timer", "kitchen timer", "study timer"],
  },
  {
    id: 'todo-list',
    name: 'To-Do List',
    description: 'A simple to-do list that saves your tasks in the browser.',
    seoTitle: 'To-Do List - Simple & Persistent Online',
    seoDescription: 'A simple and persistent to-do list that saves your tasks in your browser. Organize your day with our free To-Do List tool. 100% private and secure.',
    icon: <TodoIcon />,
    component: TodoList,
    category: ToolCategory.PRODUCTIVITY,
    details: {
      introduction: 'A straightforward and persistent to-do list to help you stay organized. Add tasks, mark them as complete, and filter your view. Your tasks are automatically saved in your browser\'s local storage, for daily planning.',
      explanation: 'How does it work? Stores array in localStorage, updates UI on changes.',
      usageExamples: [
        'Daily chores.',
        'Work tasks.',
        'Shopping lists.'
      ],
      underlyingConcept: 'Task management with states (active/complete). Persistence via key-value storage.',
      howToUse: [
        'Type a new task into the input field and press Enter or click "Add".',
        'Click the checkbox next to a task to mark it as completed.',
        'Click the "X" icon to delete a task.',
        'Use the filter buttons ("All", "Active", "Completed") to change your view.'
      ],
      features: [
        'Add, complete, and delete tasks.',
        'Filter tasks to see all, only active, or only completed items.',
        'Data is saved to `localStorage`, so your tasks persist between sessions.',
        'Clean and minimalist design.'
      ],
      faqs: [
        { question: 'Sync across devices?', answer: 'No, local only.' },
        { question: 'Priorities?', answer: 'Basic; no yet.' },
        { question: 'Export?', answer: 'Copy manually.' }
      ],
      privacy: "Your to-do list is stored in your browser\'s `localStorage`. This data is not transmitted to our servers and remains private to your device."
    },
    keywords: ["online todo list", "task manager app", "simple to-do list", "daily planner online", "persistent todo list"],
  },
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    description: 'A simple timer to help you focus with the Pomodoro Technique.',
    seoTitle: 'Pomodoro Timer - Focus & Productivity Tool',
    seoDescription: 'Improve your focus and productivity with our free online Pomodoro Timer. Alternates between 25-minute work sessions and 5-minute breaks. 100% private and secure.',
    icon: <PomodoroIcon />,
    component: PomodoroTimer,
    category: ToolCategory.PRODUCTIVITY,
    featured: true,
    details: {
      tip: "Don't skip the breaks! The 5-minute rests in the Pomodoro Technique are just as important as the 25-minute focus sessions. They help your brain recharge.",
      introduction: 'The Pomodoro Timer helps you manage your time and stay focused using the Pomodoro Technique. It alternates between focused work sessions (typically 25 minutes) and short breaks (5 minutes) to improve productivity and prevent burnout.',
      explanation: 'How does it work? Counts down, switches modes, plays sound at end.',
      usageExamples: [
        'Studying with breaks.',
        'Work focus sessions.',
        'Task batching.'
      ],
      underlyingConcept: 'Pomodoro by Cirillo: 25 min work, 5 min break. Enhances focus via time boxing.',
      howToUse: [
        'Click the "Start" button to begin a 25-minute work session.',
        'The timer will count down, and a progress ring will visualize the remaining time.',
        'When the timer finishes, a sound will play, and it will automatically switch to a 5-minute break.',
        'Click "Pause" to stop the timer and "Reset" to return to the initial 25-minute work session.'
      ],
      features: [
        'Standard 25-minute work and 5-minute break intervals.',
        'Visual progress indicator.',
        'Audio notification when a session ends.',
        'Simple Start, Pause, and Reset controls.'
      ],
      faqs: [
        { question: 'Custom times?', answer: 'Fixed now; adjustable future.' },
        { question: 'Long breaks?', answer: 'After 4 pomodoros manually.' },
        { question: 'Sound customizable?', answer: 'Default only.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["pomodoro timer online", "focus timer", "25 minute timer", "study timer app", "productivity timer"],
  },
  // Fun Tools
  {
    id: 'meme-generator',
    name: 'Meme Generator',
    description: 'Create your own memes by adding text to an image.',
    seoTitle: 'Meme Generator - Create Memes Online',
    seoDescription: 'Create your own memes by adding text to an image with our free online Meme Generator. Upload your own image and share your creation. 100% private and secure.',
    icon: <MemeIcon />,
    component: MemeGenerator,
    category: ToolCategory.FUN,
    details: {
      introduction: 'Create classic-style memes with this easy-to-use generator. Upload your own image, add top and bottom text, and download your creation to share. Fun for social media or humor.',
      explanation: 'How does it work? Draws image on canvas, overlays text with Impact font.',
      usageExamples: [
        'Making jokes for friends.',
        'Social media posts.',
        'Marketing with humor.'
      ],
      underlyingConcept: 'Memes are cultural ideas spread virally. Generator mimics Advice Animal style with bold text.',
      howToUse: [
        'Click "Upload an Image" to select a picture from your device.',
        'Enter your desired text in the "Top Text" and "Bottom Text" input fields.',
        'The meme will be generated in real-time in the preview area.',
        'When you\'re happy with it, click "Download Meme" to save it as a PNG file.'
      ],
      features: [
        'Works with any image you upload.',
        'Classic Impact font with white text and a black outline for maximum readability.',
        'Live preview of your meme as you type.',
        'Easy one-click download.'
      ],
      faqs: [
        { question: 'Templates?', answer: 'Upload own; no built-in.' },
        { question: 'Text position?', answer: 'Top/bottom fixed.' },
        { question: 'File size?', answer: 'Depends on image.' }
      ],
      privacy: "All image processing and text rendering happens in your browser. Your images are not uploaded to any server."
    },
    keywords: ["meme generator online", "create your own meme", "image captioner", "meme maker", "funny meme creator"],
  },
  // Misc Tools
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, random passwords with customizable security options.',
    seoTitle: 'Password Generator - Create Strong Passwords',
    seoDescription: 'Generate strong, secure, and random passwords with our free online Password Generator. Customize length and character types. 100% private and secure.',
    icon: <PasswordIcon />,
    component: PasswordGenerator,
    category: ToolCategory.MISC,
    featured: true,
    details: {
      tip: "A great password is long, random, and unique. Aim for at least 16 characters and use a password manager so you don't have to remember them all!",
      introduction: 'Generate strong, secure, and random passwords to protect your online accounts. This tool uses the browser\'s cryptographically secure random number generator for high-quality randomness, helping prevent weak password vulnerabilities.',
      explanation: 'How does it work? Builds charset from options, picks random chars with crypto.getRandomValues.',
      usageExamples: [
        'New account creation.',
        'Password resets.',
        'Security audits.'
      ],
      underlyingConcept: 'Strong passwords have high entropy. Random selection from large set resists brute force.',
      howToUse: [
        'Adjust the "Length" slider to set the desired password length.',
        'Use the checkboxes to include or exclude uppercase letters, lowercase letters, numbers, and symbols.',
        'A new password that meets your criteria will be generated automatically.',
        'Click "Regenerate" to create a new password with the same settings, or click "Copy" to copy the current one.'
      ],
      features: [
        'Customizable password length (4-64 characters).',
        'Options to include uppercase, lowercase, numbers, and symbols.',
        'Uses the secure `crypto.getRandomValues` browser API.',
        'One-click copy to clipboard.'
      ],
      faqs: [
        { question: 'How secure?', answer: 'Cryptographic random.' },
        { question: 'Memorable?', answer: 'Random; use manager.' },
        { question: 'Min length?', answer: '12 recommended.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["strong password generator", "random password creator", "secure password maker", "password security", "cryptographically secure password"],
  },
  {
    id: 'qrcode-generator',
    name: 'QR Code Generator',
    description: 'Generate a QR code from a URL or text.',
    seoTitle: 'QR Code Generator - Create QR Codes Online',
    seoDescription: 'Generate a QR code from any URL or text with our free online QR Code Generator. Download your QR code as a high-quality PNG. 100% private and secure.',
    icon: <QrCodeIcon />,
    component: QrCodeGenerator,
    category: ToolCategory.MISC,
    details: {
      introduction: 'Create a QR Code from any text or URL. QR Codes are scannable barcodes that can store information and are easily read by smartphones, perfect for sharing links, contact info, or Wi-Fi credentials, simplifying data transfer.',
      explanation: 'How does it work? Uses library like qrcode to encode data to matrix, render as image.',
      usageExamples: [
        'Sharing website links on posters.',
        'Quick Wi-Fi access.',
        'Product info in stores.'
      ],
      underlyingConcept: 'QR (Quick Response) from 1994, matrix barcode with error correction. Encodes text to patterns readable by cameras.',
      howToUse: [
        'Enter the text or URL you want to encode into the text area.',
        'The QR code image will be generated automatically in the preview area.',
        'Click the "Download QR Code" button to save the image as a PNG file.',
      ],
      features: [
        'Real-time QR code generation.',
        'Works with any text-based input, including URLs.',
        'High-quality PNG download.',
        'Simple and fast interface.'
      ],
      faqs: [
        { question: 'Error correction?', answer: 'Medium level.' },
        { question: 'Size?', answer: 'Auto; scalable.' },
        { question: 'Colors?', answer: 'Black/white; custom future.' }
      ],
      privacy: PRIVACY_STATEMENT
    },
    keywords: ["qr code generator online", "free qr code maker", "text to qr code", "url to qr code", "generate qr code"],
  },
  {
    id: 'video-compressor',
    name: 'Video Compressor',
    description: 'Reduce the file size of your videos without significant quality loss.',
    seoTitle: 'Video Compressor - Reduce Video File Size Online',
    seoDescription: 'Reduce the file size of your videos without significant quality loss with our free online Video Compressor. Supports various video formats. 100% private and secure.',
    icon: <VideoCompressorIcon />,
    category: ToolCategory.VIDEO,
    component: VideoCompressor,
    details: {
      introduction: 'The Video Compressor helps you shrink video files to save space or for easier sharing, all within your browser.',
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        'Click the "Compress Video" button.',
        'Wait for the compression to finish.',
        'Download your compressed video.'
      ],
      features: [
        'Reduce video file size without significant quality loss',
        'Works entirely in your browser for privacy',
        'Supports various video formats',
        'Fast compression processing'
      ],
      privacy: 'All video processing happens locally in your browser. No files are uploaded to our servers.',
      explanation: 'Video compression reduces file size by removing redundant data and optimizing encoding parameters while maintaining visual quality.',
      usageExamples: [
        'Compress large video files for email attachments',
        'Reduce video size for faster web uploads',
        'Create smaller files for mobile sharing'
      ],
      underlyingConcept: 'Video compression uses algorithms to reduce file size by removing spatial and temporal redundancy in video data.',
      faqs: [
        {
          question: 'Will compression affect video quality?',
          answer: 'The tool uses smart compression algorithms to minimize quality loss while significantly reducing file size.'
        },
        {
          question: 'What video formats are supported?',
          answer: 'The tool supports most common video formats including MP4, AVI, MOV, and more.'
        }
      ]
    }
  },
  {
    id: 'video-to-audio-converter',
    name: 'Video to Audio Converter',
    description: 'Extract audio from your video files and save it as an MP3.',
    seoTitle: 'Video to Audio Converter - Extract MP3 from Video',
    seoDescription: 'Extract audio from your video files and save it as an MP3 with our free online Video to Audio Converter. Supports various video formats. 100% private and secure.',
    icon: <VideoToAudioIcon />,
    category: ToolCategory.VIDEO,
    component: VideoToAudioConverter,
    details: {
      introduction: 'This tool allows you to easily convert video files to high-quality MP3 audio.',
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        'Click the "Convert to Audio" button.',
        'Wait for the conversion to finish.',
        'Download your audio file.'
      ],
      features: [
        'Extract audio from video files',
        'Convert to high-quality MP3 format',
        'Works entirely in your browser',
        'Supports various video formats'
      ],
      privacy: 'All video processing happens locally in your browser. No files are uploaded to our servers.',
      explanation: 'This tool extracts the audio track from video files and converts it to MP3 format for easy sharing and storage.',
      usageExamples: [
        'Extract music from video files',
        'Create audio podcasts from video content',
        'Convert video lectures to audio for listening on the go'
      ],
      underlyingConcept: 'Audio extraction involves separating the audio track from video data and encoding it in MP3 format.',
      faqs: [
        {
          question: 'What audio quality will I get?',
          answer: 'The tool extracts audio at the original quality from your video file and converts it to high-quality MP3.'
        },
        {
          question: 'Can I extract audio from any video format?',
          answer: 'Yes, the tool supports most common video formats including MP4, AVI, MOV, and more.'
        }
      ]
    }
  },
  {
    id: 'gif-maker',
    name: 'GIF Maker from Video',
    description: 'Create animated GIFs from your video files.',
    seoTitle: 'GIF Maker from Video - Create Animated GIFs Online',
    seoDescription: 'Create animated GIFs from your video files with our free online GIF Maker. Convert video segments to high-quality animated GIFs. 100% private and secure.',
    icon: <GifMakerIcon />,
    category: ToolCategory.VIDEO,
    component: GifMaker,
    details: {
      introduction: 'This tool helps you convert segments of your videos into high-quality animated GIFs.',
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        'Click the "Create GIF" button.',
        'Wait for the GIF to be created.',
        'Download your new GIF.'
      ],
      features: [
        'Convert video segments to animated GIFs',
        'High-quality GIF output',
        'Works entirely in your browser',
        'Supports various video formats'
      ],
      privacy: 'All video processing happens locally in your browser. No files are uploaded to our servers.',
      explanation: 'This tool extracts frames from your video and combines them into an animated GIF format.',
      usageExamples: [
        'Create GIFs from funny video moments',
        'Convert video tutorials to animated GIFs',
        'Make GIFs from video clips for social media'
      ],
      underlyingConcept: 'GIF creation involves extracting frames from video at regular intervals and encoding them as an animated sequence.',
      faqs: [
        {
          question: 'What video formats are supported?',
          answer: 'The tool supports most common video formats including MP4, AVI, MOV, and more.'
        },
        {
          question: 'Can I control the GIF quality?',
          answer: 'The tool automatically optimizes GIF quality while keeping file size reasonable for web use.'
        }
      ]
    }
  },
  {
    id: 'trim-video',
    name: 'Trim Video',
    description: 'Cut and trim your video files to get the perfect clip.',
    seoTitle: 'Trim Video - Cut & Trim Videos Online',
    seoDescription: 'Cut and trim your video files to get the perfect clip with our free online Video Trimmer. Supports various video formats. 100% private and secure.',
    icon: <TrimVideoIcon />,
    category: ToolCategory.VIDEO,
    component: TrimVideo,
    details: {
      introduction: 'This tool allows you to easily trim the start and end of your video files.',
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        'Set the start and end times for the trim.',
        'Click the "Trim Video" button.',
        'Wait for the video to be trimmed.',
        'Download your trimmed video.'
      ],
      features: [
        'Trim video start and end points',
        'Precise time control',
        'Works entirely in your browser',
        'Supports various video formats'
      ],
      privacy: 'All video processing happens locally in your browser. No files are uploaded to our servers.',
      explanation: 'This tool allows you to cut unwanted portions from the beginning or end of your video files.',
      usageExamples: [
        'Remove intro/outro from videos',
        'Create shorter clips from long videos',
        'Trim videos for social media platforms'
      ],
      underlyingConcept: 'Video trimming involves cutting specific time segments from video files while preserving quality.',
      faqs: [
        {
          question: 'Can I trim from the middle of a video?',
          answer: 'Currently, the tool supports trimming from the start and end. For middle cuts, you may need to trim multiple times.'
        },
        {
          question: 'What video formats are supported?',
          answer: 'The tool supports most common video formats including MP4, AVI, MOV, and more.'
        }
      ]
    }
  },
  {
    id: 'format-converter',
    name: 'Video Format Converter',
    description: 'Convert your video files to different formats like MP4, AVI, MOV, etc.',
    seoTitle: 'Video Format Converter - Convert Videos Online',
    seoDescription: 'Convert your video files to different formats like MP4, AVI, MOV, and more with our free online Video Format Converter. 100% private and secure.',
    icon: <FormatConverterIcon />,
    category: ToolCategory.VIDEO,
    component: FormatConverter,
    details: {
      introduction: 'This tool allows you to easily convert your video files to various formats.',
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        'Select the desired output format.',
        'Click the "Convert Format" button.',
        'Wait for the conversion to finish.',
        'Download your converted video.'
      ],
      features: [
        'Convert between multiple video formats',
        'Supports MP4, AVI, MOV, and more',
        'Works entirely in your browser',
        'Maintains video quality'
      ],
      privacy: 'All video processing happens locally in your browser. No files are uploaded to our servers.',
      explanation: 'This tool converts video files from one format to another while preserving quality and compatibility.',
      usageExamples: [
        'Convert videos for different devices',
        'Change format for better compatibility',
        'Convert videos for specific applications'
      ],
      underlyingConcept: 'Format conversion involves decoding video from one format and re-encoding it in another format.',
      faqs: [
        {
          question: 'Will conversion affect video quality?',
          answer: 'The tool uses high-quality conversion algorithms to minimize quality loss during format changes.'
        },
        {
          question: 'What formats are supported?',
          answer: 'The tool supports most common formats including MP4, AVI, MOV, WebM, and more.'
        }
      ]
    }
  },
  {
    id: 'video-thumbnail-extractor',
    name: 'Video Thumbnail Extractor',
    description: 'Extract thumbnails (frames) from your video files.',
    seoTitle: 'Video Thumbnail Extractor - Get Frames from Video',
    seoDescription: 'Extract thumbnails (frames) from your video files with our free online Video Thumbnail Extractor. Supports various video formats. 100% private and secure.',
    icon: <VideoThumbnailIcon />,
    category: ToolCategory.VIDEO,
    component: VideoThumbnailExtractor,
    details: {
      introduction: 'This tool helps you capture a specific frame from a video and save it as an image.',
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        'Enter the timestamp (in seconds) of the frame you want to extract.',
        'Click the "Extract Thumbnail" button.',
        'Wait for the thumbnail to be extracted.',
        'Download your thumbnail image.'
      ],
      features: [
        'Extract frames at specific timestamps',
        'High-quality image output',
        'Works entirely in your browser',
        'Supports various video formats'
      ],
      privacy: 'All video processing happens locally in your browser. No files are uploaded to our servers.',
      explanation: 'This tool extracts a specific frame from your video at the timestamp you specify and saves it as an image.',
      usageExamples: [
        'Create thumbnails for video previews',
        'Extract frames for analysis',
        'Capture screenshots from videos'
      ],
      underlyingConcept: 'Frame extraction involves seeking to a specific timestamp in the video and capturing that frame as an image.',
      faqs: [
        {
          question: 'How accurate is the timestamp?',
          answer: 'The tool extracts frames at the exact timestamp you specify, with frame-level accuracy.'
        },
        {
          question: 'What image formats are supported?',
          answer: 'The tool outputs high-quality images in common formats like PNG and JPEG.'
        }
      ]
    }
  },
  {
    id: 'video-mute',
    name: 'Mute Video',
    description: 'Remove the audio track from a video file.',
    seoTitle: 'Mute Video - Remove Audio from Video Online',
    seoDescription: 'Remove the audio track from a video file with our free online Video Muter. Supports various video formats. 100% private and secure.',
    icon: <VideoMuteIcon />,
    category: ToolCategory.VIDEO,
    component: VideoMute,
    details: {
      introduction: 'This tool allows you to easily mute a video by removing its audio track completely.',
      howToUse: [
        'Click the "Choose File" button to upload your video.',
        'Click the "Mute Video" button.',
        'Wait for the video to be processed.',
        'Download your muted video.'
      ],
      features: [
        'Remove audio track from videos',
        'Preserve video quality',
        'Works entirely in your browser',
        'Supports various video formats'
      ],
      privacy: 'All video processing happens locally in your browser. No files are uploaded to our servers.',
      explanation: 'This tool removes the audio track from your video file while keeping the video content intact.',
      usageExamples: [
        'Create silent videos for presentations',
        'Remove unwanted audio from videos',
        'Prepare videos for silent playback'
      ],
      underlyingConcept: 'Audio removal involves extracting the video stream while discarding the audio stream from the video file.',
      faqs: [
        {
          question: 'Will the video quality be affected?',
          answer: 'No, only the audio track is removed. The video quality remains exactly the same.'
        },
        {
          question: 'Can I add audio back later?',
          answer: 'Yes, you can use other tools to add new audio tracks to your muted video.'
        }
      ]
    }
  },
  {
    id: 'watermark-adder',
    name: 'Watermark Adder',
    description: 'Add watermarks or logos to your images with customizable positioning and opacity.',
    seoTitle: 'Watermark Adder - Add Watermark to Images Online',
    seoDescription: 'Add watermarks or logos to your images with our free online Watermark Adder. Customize position, size, and opacity. 100% private and secure.',
    icon: <WatermarkAdderIcon />,
    category: ToolCategory.IMAGE,
    component: WatermarkAdder,
    details: {
      introduction: 'The Watermark Adder allows you to add watermarks or logos to your images with full control over positioning, size, and opacity.',
      howToUse: [
        'Upload your main image using the "Upload Main Image" section.',
        'Upload your watermark/logo using the "Upload Watermark/Logo" section.',
        'Adjust the watermark settings: opacity, size, position, and margin.',
        'Preview the result and download your watermarked image.'
      ],
      features: [
        'Add custom watermarks or logos to images',
        'Adjustable opacity (10% to 100%)',
        'Flexible positioning (5 positions)',
        'Customizable size (5% to 50% of image)',
        'Adjustable margin from edges',
        'Real-time preview',
        'High-quality output',
        'Works entirely in your browser'
      ],
      privacy: 'All image processing happens locally in your browser. No files are uploaded to our servers.',
      explanation: 'This tool uses HTML5 Canvas to overlay your watermark onto the main image with customizable settings for professional results.',
      usageExamples: [
        'Add company logos to photos',
        'Create branded images for social media',
        'Add copyright watermarks to protect images',
        'Create professional presentations with branded images'
      ],
      underlyingConcept: 'The tool uses HTML5 Canvas to draw the main image and then overlay the watermark with specified opacity, position, and size settings.',
      faqs: [
        {
          question: 'What image formats are supported?',
          answer: 'The tool supports all common image formats including PNG, JPEG, GIF, and WebP.'
        },
        {
          question: 'Will the watermark quality be preserved?',
          answer: 'Yes, the watermark maintains its original quality and is scaled proportionally.'
        },
        {
          question: 'Can I adjust the watermark after adding it?',
          answer: 'Yes, you can adjust all settings (opacity, position, size, margin) and the changes will be applied in real-time.'
        },
        {
          question: 'What is the maximum file size?',
          answer: 'Main images can be up to 50MB and watermarks up to 10MB for optimal performance.'
        }
      ]
    }
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images by percentage or exact dimensions with aspect ratio preservation.',
    seoTitle: 'Image Resizer - Resize Images Online',
    seoDescription: 'Resize images by percentage or exact dimensions with our free online Image Resizer. Preserve aspect ratio and adjust quality. 100% private and secure.',
    icon: <ImageResizerIcon />,
    category: ToolCategory.IMAGE,
    component: ImageResizer,
    details: {
      introduction: 'The Image Resizer allows you to resize images using percentage scaling or exact pixel dimensions, with options to preserve aspect ratio and adjust quality.',
      howToUse: [
        'Upload your image using the file upload section.',
        'Choose between percentage or dimension-based resizing.',
        'Adjust the resize settings (percentage, width, height, quality).',
        'Toggle "Keep aspect ratio" to maintain proportions.',
        'Preview the resized image and download the result.'
      ],
      features: [
        'Resize by percentage (1% to 500%)',
        'Resize by exact pixel dimensions',
        'Preserve aspect ratio option',
        'Adjustable output quality (10% to 100%)',
        'Real-time preview of original and resized images',
        'Display original and resized dimensions',
        'File size comparison',
        'High-quality output with HTML5 Canvas',
        'Works entirely in your browser'
      ],
      privacy: 'All image processing happens locally in your browser. No files are uploaded to our servers.',
      explanation: 'This tool uses HTML5 Canvas to resize images with precise control over dimensions, quality, and aspect ratio preservation.',
      usageExamples: [
        'Resize photos for web use',
        'Create thumbnails from large images',
        'Optimize images for social media',
        'Scale images for presentations',
        'Batch resize for consistent dimensions'
      ],
      underlyingConcept: 'The tool uses HTML5 Canvas to draw the original image at the new dimensions, applying quality settings during the conversion process.',
      faqs: [
        {
          question: 'What image formats are supported?',
          answer: 'The tool supports all common image formats including PNG, JPEG, GIF, and WebP. Output is always in JPEG format.'
        },
        {
          question: 'Will image quality be affected?',
          answer: 'Quality can be adjusted from 10% to 100%. Higher quality settings result in larger file sizes but better image quality.'
        },
        {
          question: 'How does aspect ratio preservation work?',
          answer: 'When enabled, the tool maintains the original proportions by scaling one dimension and calculating the other automatically.'
        },
        {
          question: 'What is the maximum image size?',
          answer: 'Input images can be up to 50MB. Output dimensions can be set up to 4000x4000 pixels.'
        }
      ]
    }
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    description: 'Convert images between different formats (JPEG, PNG, WebP, BMP) with quality control.',
    seoTitle: 'Image Converter - Convert Images Online',
    seoDescription: 'Convert images between different formats (JPEG, PNG, WebP, BMP) with our free online Image Converter. Adjust quality and handle transparency. 100% private and secure.',
    icon: <ImageConverterIcon />,
    category: ToolCategory.IMAGE,
    component: ImageConverter,
    details: {
      introduction: 'The Image Converter allows you to convert images between different formats including JPEG, PNG, WebP, and BMP with customizable quality settings.',
      howToUse: [
        'Upload your image using the file upload section.',
        'Select the desired output format (JPEG, PNG, WebP, or BMP).',
        'Adjust quality settings for JPEG and WebP formats.',
        'Enable transparency removal for JPEG conversion if needed.',
        'Preview the converted image and download the result.'
      ],
      features: [
        'Convert between JPEG, PNG, WebP, and BMP formats',
        'Adjustable quality settings (10% to 100%)',
        'Transparency handling for JPEG conversion',
        'Real-time preview of original and converted images',
        'Format-specific optimization',
        'High-quality output with HTML5 Canvas',
        'Works entirely in your browser'
      ],
      privacy: 'All image processing happens locally in your browser. No files are uploaded to our servers.',
      explanation: 'This tool uses HTML5 Canvas to convert images between different formats while maintaining quality and handling transparency appropriately.',
      usageExamples: [
        'Convert PNG to JPEG for web use',
        'Convert JPEG to WebP for better compression',
        'Convert images to BMP for legacy systems',
        'Remove transparency from PNG images',
        'Optimize images for different platforms'
      ],
      underlyingConcept: 'The tool uses HTML5 Canvas to draw the original image and export it in the desired format with appropriate quality settings.',
      faqs: [
        {
          question: 'What image formats are supported?',
          answer: 'The tool supports input from all common image formats and can output to JPEG, PNG, WebP, and BMP formats.'
        },
        {
          question: 'Will transparency be preserved?',
          answer: 'Transparency is preserved in PNG and WebP formats. For JPEG conversion, you can choose to remove transparency with a white background.'
        },
        {
          question: 'Which format should I choose?',
          answer: 'JPEG for photos, PNG for graphics with transparency, WebP for modern web use, and BMP for uncompressed images.'
        },
        {
          question: 'What is the maximum file size?',
          answer: 'Input images can be up to 50MB for optimal performance.'
        }
      ]
    }
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images to reduce file size while maintaining quality with advanced compression options.',
    seoTitle: 'Image Compressor - Compress Images Online',
    seoDescription: 'Compress images to reduce file size while maintaining quality with our free online Image Compressor. Supports JPEG, PNG, and WebP. 100% private and secure.',
    icon: <ImageCompressorIcon />,
    category: ToolCategory.IMAGE,
    component: ImageCompressor,
    details: {
      introduction: 'The Image Compressor helps you reduce image file sizes while maintaining visual quality through intelligent compression techniques.',
      howToUse: [
        'Upload your image using the file upload section.',
        'Choose the output format (JPEG, PNG, or WebP).',
        'Adjust quality settings and maximum dimensions.',
        'Enable aggressive compression for maximum size reduction.',
        'Preview compression results and download the optimized image.'
      ],
      features: [
        'Intelligent compression with quality control',
        'Resize images while compressing',
        'Multiple output formats (JPEG, PNG, WebP)',
        'Aggressive compression mode for maximum reduction',
        'Real-time compression ratio display',
        'Maintain aspect ratio option',
        'Before/after file size comparison',
        'High-quality output with HTML5 Canvas',
        'Works entirely in your browser'
      ],
      privacy: 'All image processing happens locally in your browser. No files are uploaded to our servers.',
      explanation: 'This tool uses HTML5 Canvas with advanced compression techniques to reduce file sizes while preserving visual quality.',
      usageExamples: [
        'Compress photos for web upload',
        'Reduce image sizes for email attachments',
        'Optimize images for mobile apps',
        'Create thumbnails with compression',
        'Batch compress multiple images'
      ],
      underlyingConcept: 'The tool combines dimension reduction, quality adjustment, and format optimization to achieve maximum compression while maintaining acceptable visual quality.',
      faqs: [
        {
          question: 'How much can I compress an image?',
          answer: 'Compression depends on the original image. Typical reductions range from 20% to 80% of the original file size.'
        },
        {
          question: 'Will aggressive compression affect quality?',
          answer: 'Aggressive compression may reduce quality significantly but can achieve maximum file size reduction. Use with caution for important images.'
        },
        {
          question: 'Which format compresses best?',
          answer: 'WebP generally provides the best compression, followed by JPEG, then PNG. Choose based on your compatibility needs.'
        },
        {
          question: 'What is the maximum file size?',
          answer: 'Input images can be up to 50MB. The tool can resize images up to 4000x4000 pixels.'
        }
      ]
    }
  }
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
    [ToolCategory.TEXT]: 'text-tools',
    [ToolCategory.CODING]: 'coding-tools',
    [ToolCategory.IMAGE]: 'image-tools',
    [ToolCategory.CSS]: 'css-tools',
    [ToolCategory.COLOR]: 'color-tools',
    [ToolCategory.MATH]: 'math-calculation-tools',
    [ToolCategory.PRODUCTIVITY]: 'productivity-tools',
    [ToolCategory.FUN]: 'fun-interactive-tools',
    [ToolCategory.MISC]: 'miscellaneous-tools',
    [ToolCategory.VIDEO]: 'video-tools',
};

// Reverse mapping from URL to category
export const URL_TO_CATEGORY_MAP: Record<string, ToolCategory> = {
    'text-tools': ToolCategory.TEXT,
    'coding-tools': ToolCategory.CODING,
    'image-tools': ToolCategory.IMAGE,
    'css-tools': ToolCategory.CSS,
    'color-tools': ToolCategory.COLOR,
    'math-calculation-tools': ToolCategory.MATH,
    'productivity-tools': ToolCategory.PRODUCTIVITY,
    'fun-interactive-tools': ToolCategory.FUN,
    'miscellaneous-tools': ToolCategory.MISC,
    'video-tools': ToolCategory.VIDEO,
};

export const CATEGORY_ICONS: Record<ToolCategory, React.FC<{className?: string}>> = {
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
    [ToolCategory.CODING]: "Utilities for developers to format, debug, and generate code.",
    [ToolCategory.IMAGE]: "Tools for image conversion and manipulation.",
    [ToolCategory.CSS]: "Helpers for generating and previewing CSS styles.",
    [ToolCategory.COLOR]: "Utilities for color conversion and palette generation.",
    [ToolCategory.MATH]: "Calculators and converters for mathematical operations.",
    [ToolCategory.PRODUCTIVITY]: "Tools to help you stay organized and focused.",
    [ToolCategory.FUN]: "Fun tools to create memes and more.",
    [ToolCategory.MISC]: "A collection of other useful miscellaneous tools.",
    [ToolCategory.VIDEO]: "Tools for video processing, conversion, and manipulation.",
};

export const CATEGORY_CONTENT: Record<ToolCategory, {
  introduction: string;
  benefits: string[];
  useCases: string[];
}> = {
  [ToolCategory.TEXT]: {
    introduction: "Master every aspect of text manipulation with our comprehensive Text Tools collection. Whether you're a content creator optimizing for SEO, a developer formatting code, or a student analyzing readability - our text utilities transform how you work with words. From instant case conversion to advanced keyword analysis, these tools help you create, edit, and optimize text content with professional precision.",
    benefits: [
      "Transform text formats instantly with case converters and text reversers",
      "Analyze content quality with readability scores and keyword density tools",
      "Count words, characters, and paragraphs for precise content requirements",
      "Generate placeholder text for design mockups and development projects",
      "Perfect for writers, developers, marketers, and content creators"
    ],
    useCases: [
      "Content creators optimizing blog posts for SEO and readability",
      "Developers converting code between naming conventions (camelCase, snake_case)",
      "Students analyzing essay readability and word count requirements",
      "Designers generating Lorem Ipsum text for website mockups",
      "Marketers analyzing keyword density in marketing copy"
    ]
  },
  [ToolCategory.CODING]: {
    introduction: "Streamline your development workflow with our powerful Coding Tools collection. From JSON formatting and Base64 encoding to regex testing and JWT debugging - these utilities handle the tedious tasks so you can focus on building amazing applications. All tools run locally in your browser, ensuring your code and data remain completely private while providing instant results.",
    benefits: [
      "Format and validate JSON, XML, and other data formats instantly",
      "Encode/decode Base64, URLs, and other formats for web development",
      "Test and debug regular expressions with real-time feedback",
      "Generate secure UUIDs, hashes, and passwords for applications",
      "Convert between CSV, JSON, and Excel formats seamlessly",
      "All processing happens locally for maximum security and speed"
    ],
    useCases: [
      "Frontend developers formatting API responses and debugging JSON",
      "Backend engineers encoding data for secure transmission",
      "Full-stack developers testing regex patterns for form validation",
      "Data scientists converting CSV files to JSON for analysis",
      "DevOps teams generating secure hashes and unique identifiers",
      "QA engineers debugging JWT tokens and API responses"
    ]
  },
  [ToolCategory.IMAGE]: {
    introduction: "Transform your images effortlessly with our comprehensive Image Tools collection. From Base64 conversion for web embedding to format conversion and optimization - these utilities handle all your image processing needs directly in your browser. Perfect for developers embedding images in code, designers optimizing assets, and content creators preparing visuals for web and mobile applications.",
    benefits: [
      "Convert images to Base64 for seamless web embedding",
      "Transform images between different formats (PNG, JPG, WebP)",
      "Optimize image files for faster loading and better performance",
      "Resize images to specific dimensions for responsive design",
      "Add watermarks and extract thumbnails for content protection",
      "All processing happens locally - your images never leave your device"
    ],
    useCases: [
      "Web developers embedding images directly in HTML/CSS code",
      "Mobile app developers converting images for different platforms",
      "Content creators optimizing images for social media and websites",
      "Designers preparing assets for responsive web design",
      "E-commerce managers creating product thumbnails and watermarks",
      "Bloggers optimizing images for faster page loading"
    ]
  },
  [ToolCategory.CSS]: {
    introduction: "Create stunning web designs with our powerful CSS Tools collection. From box shadows and gradients to modern glassmorphism effects - these visual generators help you craft beautiful, responsive designs without the guesswork. Perfect for developers, designers, and anyone who wants to create professional-looking websites with clean, optimized CSS code.",
    benefits: [
      "Generate complex CSS properties with intuitive visual controls",
      "Create modern effects like glassmorphism and neumorphism",
      "Preview styles in real-time before copying code",
      "Generate cross-browser compatible CSS automatically",
      "Perfect for rapid prototyping and design iteration",
      "Copy-paste ready code that works across all modern browsers"
    ],
    useCases: [
      "UI designers creating button shadows and hover effects",
      "Frontend developers experimenting with modern CSS effects",
      "Web designers generating custom gradients for backgrounds",
      "CSS learners practicing with interactive visual tools",
      "Freelancers creating professional website designs quickly",
      "Agencies prototyping client designs with modern effects"
    ]
  },
  [ToolCategory.COLOR]: {
    introduction: "Master the art of color with our comprehensive Color Tools collection. From palette generation to format conversion - these utilities help you create harmonious color schemes that bring your designs to life. Whether you're building a brand identity, designing a website, or creating digital art, our color tools provide the precision and inspiration you need.",
    benefits: [
      "Convert between color formats instantly (HEX, RGB, HSL, CMYK)",
      "Generate harmonious palettes using color theory principles",
      "Create monochromatic, complementary, and triadic color schemes",
      "Interactive color wheel for intuitive color selection",
      "Perfect for both beginners and professional designers",
      "Export palettes for use in design software and code"
    ],
    useCases: [
      "Graphic designers creating brand color schemes and identities",
      "Web developers converting Photoshop colors to CSS formats",
      "UI designers building consistent color systems for apps",
      "Artists experimenting with color harmonies and combinations",
      "Marketers ensuring consistent branding across platforms",
      "Students learning color theory and design principles"
    ]
  },
  [ToolCategory.MATH]: {
    introduction: "Solve real-world problems with our practical Math Tools collection. From unit conversions and currency exchange to financial calculations and health metrics - these utilities make complex math accessible and useful. Perfect for students, professionals, travelers, and anyone who needs accurate calculations for daily life and work.",
    benefits: [
      "Convert between metric and imperial units instantly",
      "Calculate currency exchange rates with real-time data",
      "Compute loan payments and amortization schedules",
      "Calculate BMI and other health metrics accurately",
      "All calculations performed locally for privacy and speed",
      "Perfect for students, professionals, and everyday use"
    ],
    useCases: [
      "Students converting units for science and math homework",
      "Travelers checking currency exchange rates before trips",
      "Homeowners calculating mortgage payments and loan terms",
      "Fitness enthusiasts tracking BMI and health metrics",
      "Engineers converting measurements for international projects",
      "Business owners calculating financial projections and budgets"
    ]
  },
  [ToolCategory.PRODUCTIVITY]: {
    introduction: "Boost your productivity and stay organized with our comprehensive Productivity Tools collection. From Pomodoro timers and world clocks to task management and time zone coordination - these utilities help you manage your time effectively and work more efficiently. Perfect for remote workers, students, freelancers, and anyone looking to optimize their daily workflow.",
    benefits: [
      "Pomodoro timer for focused work sessions and better concentration",
      "World clock for coordinating meetings across time zones",
      "Task management tools for organizing daily priorities",
      "Stopwatch and timer for precise time tracking",
      "All tools work offline and sync with your browser",
      "Designed for modern remote and hybrid work environments"
    ],
    useCases: [
      "Remote workers scheduling calls across different time zones",
      "Students using Pomodoro technique for focused study sessions",
      "Freelancers tracking billable hours with stopwatches",
      "Project managers coordinating global team meetings",
      "Content creators managing deadlines and work schedules",
      "Professionals organizing daily tasks and priorities"
    ]
  },
  [ToolCategory.FUN]: {
    introduction: "Add creativity and fun to your digital life with our entertaining Fun Tools collection. From meme generators to playful text effects - these utilities are perfect for creating shareable content, breaking up the workday, or just having some creative fun. Great for social media, team building, and unleashing your inner creativity.",
    benefits: [
      "Create viral memes and shareable graphics instantly",
      "Generate playful text effects and creative content",
      "Perfect for social media posts and team communications",
      "No design skills required - just your imagination",
      "Lightweight tools that work instantly in your browser",
      "Great for team building and workplace fun"
    ],
    useCases: [
      "Social media managers creating engaging meme content",
      "Team members sharing funny posts in Slack and Discord",
      "Content creators generating viral graphics for platforms",
      "Students creating fun presentations and projects",
      "Friends experimenting with text effects for messages",
      "Marketing teams creating playful promotional content"
    ]
  },
  [ToolCategory.MISC]: {
    introduction: "Handle essential digital tasks with our versatile Misc Tools collection. From password generation and QR code creation to unique ID generation - these utilities cover the important but often overlooked tasks that make digital life easier and more secure. Perfect for developers, business owners, and anyone who needs reliable tools for everyday digital tasks.",
    benefits: [
      "Generate strong, secure passwords with customizable options",
      "Create QR codes for easy link sharing and marketing",
      "Generate unique identifiers and codes for development",
      "All tools process data locally for maximum security",
      "Perfect for security-conscious users and developers",
      "Versatile utilities that solve common digital problems"
    ],
    useCases: [
      "Users creating strong passwords for new accounts and services",
      "Business owners generating QR codes for products and marketing",
      "Developers needing unique IDs and codes for testing",
      "Marketers creating scannable codes for campaigns",
      "Security-conscious individuals generating secure strings",
      "Anyone sharing links and information via QR codes"
    ]
  },
  [ToolCategory.VIDEO]: {
    introduction: "Master video content creation with our powerful Video Tools collection. From compression and format conversion to GIF creation and audio extraction - these utilities handle all your video processing needs directly in your browser. Perfect for content creators, marketers, students, and professionals who need to work with video content efficiently and securely.",
    benefits: [
      "Compress large video files without losing quality for easy sharing",
      "Convert videos between different formats (MP4, AVI, MOV, WebM)",
      "Extract audio tracks from videos for podcasts and music",
      "Create animated GIFs from video clips for social media",
      "Add watermarks and trim videos for content protection",
      "All processing happens locally - your videos never leave your device"
    ],
    useCases: [
      "Content creators compressing videos for social media platforms",
      "Students extracting audio from educational videos for study",
      "Marketers creating GIFs from promotional videos",
      "Professionals converting video formats for presentations",
      "Bloggers optimizing video content for faster loading",
      "Developers testing video functionality in web applications"
    ]
  }
};