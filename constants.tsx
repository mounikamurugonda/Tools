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
import ColorConverter from '@/tools/ColorConverter';
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
  CharacterCounterIcon,
  KeywordDensityIcon,
  ReadabilityIcon,
  LoanCalculatorIcon,
  TimeZoneConverterIcon,
  CsvToJsonIcon,
  JsonToCsvIcon,
  CsvToXlsxIcon,
  XlsxToCsvIcon,
  Base64ToImageIcon,
} from '@/components/icons';

const PRIVACY_STATEMENT = "All calculations and data processing for this tool are performed locally in your browser. We do not send any of your data to our servers, ensuring your information remains private and secure.";


export const TOOLS: Tool[] = [
  // Text Tools
  {
    id: 'keyword-density-analyzer',
    name: 'Keyword Density Analyzer',
    description: 'Analyze text to find keyword frequency and density.',
    icon: <KeywordDensityIcon />,
    component: KeywordDensityAnalyzer,
    category: ToolCategory.TEXT,
    details: {
      introduction: 'This tool helps you analyze the density of keywords and keyphrases in your text. It\'s an essential utility for SEO professionals and content writers to ensure their content is optimized for search engines without overstuffing keywords.',
      howToUse: [
        'Paste your text into the input area.',
        'The tool will automatically process the text and display a table of keywords.',
        'The table shows the count and density percentage for one-word, two-word, and three-word phrases.',
        'You can configure options like stop-word removal to refine the analysis.'
      ],
      features: [
        'Calculates density for 1-word, 2-word, and 3-word phrases.',
        'Sortable results table to easily identify top keywords.',
        'Option to ignore common "stop words" (like "the", "a", "is") for more meaningful results.',
        'Real-time analysis as you type.'
      ],
      privacy: PRIVACY_STATEMENT,
      explanation: 'Keyword density is a fundamental concept in SEO. It refers to the percentage of times a keyword or phrase appears on a web page compared to the total number of words on the page. This tool automates the counting process and calculates the density for single words and multi-word phrases, providing a clear overview of your content\'s keyword landscape.',
      usageExamples: [
        'An SEO specialist can use this tool to check if a blog post is sufficiently optimized for a target keyword before publishing.',
        'A content writer can analyze a competitor\'s article to understand their keyword strategy.',
        'A student can use it to ensure their academic paper does not overuse certain terms.'
      ],
      underlyingConcept: 'The tool works by parsing the input text, splitting it into individual words (tokens), and counting the occurrences of each word. For multi-word phrases, it iterates through the text in sliding windows of two or three words. It then calculates density using the formula: (Keyword Count / Total Words) * 100. Stop words can be filtered out to focus on more significant terms.',
      faqs: [
        {
          question: 'What is a good keyword density?',
          answer: 'There is no magic number, but most SEO experts suggest a density of 1-2%. The key is to sound natural and avoid keyword stuffing, which can lead to search engine penalties.'
        },
        {
          question: 'Why are multi-word phrases important?',
          answer: 'Multi-word phrases, or long-tail keywords, are often more specific and can attract more qualified traffic. Analyzing them helps you understand user intent better.'
        }
      ]
    }
  },
  {
    id: 'readability-score-calculator',
    name: 'Readability Score Calculator',
    description: 'Calculate Flesch-Kincaid and other readability scores.',
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
    }
  },
    {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments and see a full amortization schedule.',
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
    }
  },
    {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Convert a specific time from one timezone to another.',
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
    }
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between uppercase, lowercase, title case, and more.',
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
    }
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and lines in your text.',
    icon: <CounterIcon />,
    component: WordCounter,
    category: ToolCategory.TEXT,
    details: {
      tip: "Writing an essay or a tweet? Keep this tool open in a separate tab to quickly check if you're within the required length limits as you write.",
      introduction: 'The Word Counter provides real-time statistics for any text you input. It instantly counts words, characters, sentences, and lines, making it perfect for writers, students, and professionals who need to meet specific length requirements. This tool addresses the challenge of manually counting elements in text, which can be time-consuming and prone to errors, especially in long documents.',
      explanation: 'How does it work? As you type or paste text, the tool splits the string based on spaces for words, periods/exclamations/questions for sentences, and newlines for lines. It uses regular expressions to accurately identify these elements, ensuring reliable counts even with complex punctuation.',
      usageExamples: [
        'A blogger aiming for 500-word articles can monitor progress in real-time.',
        'Students writing essays with word limits use it to stay within guidelines.',
        'SEO specialists check keyword density by counting occurrences in content.'
      ],
      underlyingConcept: 'Word counting is rooted in linguistics and content analysis. A "word" is typically defined as a sequence of characters separated by spaces, while sentences are delimited by punctuation. This tool applies these concepts digitally to provide metrics that help gauge content volume and structure.',
      howToUse: [
        'Paste or type your text into the text area.',
        'The statistics for words, characters, sentences, and lines will update automatically as you type.',
      ],
      features: [
        'Real-time counting of words, characters, sentences, and lines.',
        'Accurate analysis that correctly handles various punctuation and spacing.',
        'Simple interface with a clear display of all key metrics.',
      ],
      faqs: [
        { question: 'Does it count hyphenated words as one or two?', answer: 'Hyphenated words are counted as one word.' },
        { question: 'How are numbers treated?', answer: 'Numbers are counted as words if separated by spaces.' },
        { question: 'Can it handle multiple languages?', answer: 'Yes, it works with any text, though word splitting is space-based.' }
      ],
      privacy: PRIVACY_STATEMENT
    }
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    description: 'Count characters with and without spaces, and see the byte size.',
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
    }
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text with a specified number of paragraphs.',
    icon: <LoremIpsumIcon />,
    component: LoremIpsumGenerator,
    category: ToolCategory.TEXT,
    details: {
      introduction: 'This tool generates "Lorem Ipsum" placeholder text, commonly used in design and publishing to preview layouts and visual mockups before the final content is available. It helps designers focus on aesthetics without being distracted by meaningful text, solving the issue of incomplete content during the development phase.',
      explanation: 'How does it work? You specify the number of paragraphs, and the tool repeats a standard Latin text block, derived from Cicero\'s work, to create the desired length. It ensures the text looks natural with varied sentence lengths.',
      usageExamples: [
        'Web designers use it to fill website templates during prototyping.',
        'Print publishers generate dummy text for brochure layouts.',
        'App developers placeholder content in UI mockups.'
      ],
      underlyingConcept: 'Lorem Ipsum is a scrambled version of Latin text from 45 BC, used since the 1500s in typesetting. The concept is to provide text that mimics English word distribution without conveying meaning, allowing focus on design elements like fonts and spacing.',
      howToUse: [
        'Enter the desired number of paragraphs you want to generate.',
        'Click the "Generate" button.',
        'The generated text will appear in the text area below.',
        'Click the "Copy" button to copy the text to your clipboard.'
      ],
      features: [
        'Customizable number of paragraphs.',
        'Generates standard Lorem Ipsum text for realistic mockups.',
        'One-click copy to clipboard functionality.',
      ],
      faqs: [
        { question: 'Is the text always the same?', answer: 'It starts with the classic Lorem Ipsum but repeats as needed.' },
        { question: 'Can I generate words or sentences instead?', answer: 'This version focuses on paragraphs, but expansions could be added.' },
        { question: 'Why Latin?', answer: 'It provides a neutral, non-distracting filler.' }
      ],
      privacy: PRIVACY_STATEMENT
    }
  },
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    description: 'Quickly reverse any string of text.',
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
    }
  },
  {
    id: 'markdown-previewer',
    name: 'Markdown Previewer',
    description: 'Write Markdown and see the rendered HTML in real-time.',
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
    }
  },
  // Coding Tools
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode text to Base64 or decode a Base64 string back to text.',
    icon: <Base64Icon />,
    component: Base64Converter,
    category: ToolCategory.CODING,
    details: {
      introduction: 'This tool provides a simple way to encode plain text into a Base64 string and decode Base64 strings back to their original plain text form. Base64 encoding is commonly used to transmit data over media that are designed to handle text, solving issues with binary data in text-based protocols like email or JSON.',
      explanation: 'How does it work? Encoding converts binary data to a 64-character alphabet (A-Z, a-z, 0-9, +, /). Decoding reverses this. The tool uses browser APIs for accurate handling of UTF-8.',
      usageExamples: [
        'Web devs embed images in CSS as Base64 to reduce requests.',
        'API users encode auth credentials in HTTP headers.',
        'Email systems encode attachments for safe transmission.'
      ],
      underlyingConcept: 'Base64 is a binary-to-text encoding scheme from the 1980s, part of MIME standards. It groups 3 bytes into 4 characters, padding as needed, ensuring safe transport over 7-bit channels.',
      howToUse: [
        'Enter your text or Base64 string into the input area.',
        'Click "Encode" to convert your text to Base64.',
        'Click "Decode" to convert a Base64 string back to plain text.',
        'The result will be displayed in the output area.'
      ],
      features: [
        'Fast and reliable encoding and decoding.',
        'Handles multi-byte characters (UTF-8) correctly.',
        'Provides error handling for invalid Base64 strings.',
      ],
      faqs: [
        { question: 'Why use Base64 instead of hex?', answer: 'Base64 is more compact, using 64 chars vs. hex\'s 16.' },
        { question: 'Does it increase data size?', answer: 'Yes, by about 33% due to encoding overhead.' },
        { question: 'Can it handle binary files?', answer: 'Yes, but this version focuses on text; images have separate tools.' }
      ],
      privacy: PRIVACY_STATEMENT
    }
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode strings for safe use in URLs.',
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
    }
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, pretty-print, and validate your JSON data.',
    icon: <JsonIcon />,
    component: JsonFormatter,
    category: ToolCategory.CODING,
    featured: true,
    details: {
      tip: "Got a long, messy line of JSON from an API? Just paste it here and click 'Format' to instantly make it clean, indented, and readable. It's a lifesaver for debugging!",
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
    }
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions against strings and see matches.',
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
    }
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate universally unique identifiers (UUID v4).',
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
    }
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate SHA hashes from text using the Web Crypto API.',
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
    }
  },
  {
    id: 'jwt-debugger',
    name: 'JWT Decoder',
    description: 'Decode a JSON Web Token to view its header and payload.',
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
    }
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Compare two blocks of text and highlight the differences.',
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
    }
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert CSV data into a structured JSON array.',
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
    }
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Convert a JSON array of objects into CSV format.',
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
    }
  },
  {
    id: 'csv-to-xlsx',
    name: 'CSV to XLSX',
    description: 'Convert CSV data directly into an Excel (.xlsx) file.',
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
    }
  },
  {
    id: 'xlsx-to-csv',
    name: 'XLSX to CSV',
    description: 'Extract data from an Excel (.xlsx) file and convert it to CSV.',
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
    }
  },
  // Image Tools
  {
    id: 'image-to-base64',
    name: 'Image to Base64',
    description: 'Convert an image file into a Base64 data URL string.',
    icon: <ImageIcon />,
    component: ImageToBase64,
    category: ToolCategory.IMAGE,
    featured: true,
    details: {
      tip: "Base64 is great for small icons or logos in your website's CSS. It can reduce HTTP requests and make your site load a tiny bit faster!",
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
    }
  },
  {
    id: 'base64-to-image',
    name: 'Base64 to Image',
    description: 'Convert a Base64 data URL into a viewable image.',
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
    }
  },
  // CSS Tools
  {
    id: 'box-shadow-generator',
    name: 'Box Shadow Generator',
    description: 'Create and customize CSS box-shadow effects with a visual editor.',
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
    }
  },
  {
    id: 'css-gradient-generator',
    name: 'CSS Gradient Generator',
    description: 'Create beautiful CSS gradients with color pickers and angle controls.',
    icon: <GradientIcon />,
    component: CssGradientGenerator,
    category: ToolCategory.CSS,
    details: {
      introduction: 'Create stunning CSS gradients with an intuitive visual editor. Choose colors, adjust angles, and switch between linear and radial gradients. Perfect for backgrounds, buttons, and modern UI elements.',
      explanation: 'How does it work? Combines color inputs with angle/position controls to generate CSS gradient syntax. Updates preview element in real-time.',
      usageExamples: [
        'Creating modern website backgrounds',
        'Designing gradient buttons and cards',
        'Building hero sections with eye-catching gradients'
      ],
      underlyingConcept: 'CSS gradients create smooth color transitions. Linear gradients follow a direction, radial gradients spread from a center point.',
      howToUse: [
        'Choose between Linear or Radial gradient type',
        'For linear: adjust the angle slider (0-360 degrees)',
        'For radial: select the position from the dropdown',
        'Pick your two colors using the color pickers',
        'Copy the generated CSS code'
      ],
      features: [
        'Support for both linear and radial gradients',
        'Real-time visual preview',
        'Color picker and text input for precise color selection',
        'Angle control for linear gradients',
        'Position control for radial gradients'
      ],
      faqs: [
        { question: 'More than 2 colors?', answer: 'Not yet; planned for future updates.' },
        { question: 'Browser support?', answer: 'Excellent; CSS3 standard.' },
        { question: 'Performance?', answer: 'Gradients are GPU-accelerated.' }
      ],
      privacy: PRIVACY_STATEMENT
    }
  },
  {
    id: 'border-radius-generator',
    name: 'Border Radius Generator',
    description: 'Create custom border radius values with individual corner controls.',
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
    }
  },
  {
    id: 'text-shadow-generator',
    name: 'Text Shadow Generator',
    description: 'Create beautiful text shadows with precise control over position and blur.',
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
    }
  },
  {
    id: 'glassmorphism-generator',
    name: 'Glassmorphism & Neumorphism Generator',
    description: 'Create modern glassmorphism and neumorphism effects with visual controls.',
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
    }
  },
  // Color Tools
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert colors between HEX, RGB, and HSL formats.',
    icon: <ColorIcon />,
    component: ColorConverter,
    category: ToolCategory.COLOR,
    featured: true,
    details: {
      tip: "HSL (Hue, Saturation, Lightness) is an amazing format for creating color variations. Just tweak the 'Lightness' value to get perfect shades and tints of your base color.",
      introduction: 'A handy tool for web designers and developers to convert color codes between HEX, RGB, and HSL formats. Use the color picker or type in a value to see the conversions instantly, solving format mismatches in design tools or code.',
      explanation: 'How does it work? Parses input, converts using math formulas (e.g., hex to RGB by bit shifting), updates all fields.',
      usageExamples: [
        'Converting Photoshop RGB to CSS HEX.',
        'Adjusting HSL for hue variations.',
        'Ensuring consistency in branding.'
      ],
      underlyingConcept: 'Colors are models: RGB additive, HSL cylindrical. Conversion involves transforms like RGB to HSL using min/max calculations.',
      howToUse: [
        'Use the color picker to select a color visually.',
        'Alternatively, type a valid HEX code into the HEX input field.',
        'The tool will automatically calculate and display the corresponding RGB and HSL values.',
        'Click "Copy" next to any value to copy it to your clipboard.'
      ],
      features: [
        'Interactive color picker for easy selection.',
        'Real-time conversion between HEX, RGB, and HSL.',
        'Supports 3-digit and 6-digit hex codes.',
        'Simple copy-to-clipboard functionality.'
      ],
      faqs: [
        { question: 'Alpha support?', answer: 'Not yet; RGBA/HSLA in future.' },
        { question: 'Invalid input?', answer: 'Resets to default.' },
        { question: 'Why HSL?', answer: 'Easier for saturation/lightness adjustments.' }
      ],
      privacy: PRIVACY_STATEMENT
    }
  },
  {
    id: 'color-palette-generator',
    name: 'Color Palette Generator',
    description: 'Generate color palettes from a base color.',
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
    }
  },
  // Math Tools
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between common units of measurement.',
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
    }
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between currencies with near real-time rates.',
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
      privacy: "This tool fetches exchange rates from a third-party API (open.er-api.com). The amounts and currencies you select are used for calculation in your browser and are not sent to our servers. Please refer to the API provider's privacy policy for their data handling practices."
    }
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index.',
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
    }
  },
  {
    id: 'date-calculator',
    name: 'Date Calculator',
    description: 'Calculate duration between dates or add/subtract days.',
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
    }
  },
  // Productivity Tools
  {
    id: 'world-clock',
    name: 'World Clock',
    description: 'Display and compare the current time in different cities.',
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
      privacy: "Your selected clock preferences are stored in your browser's `localStorage` and are not sent to any server."
    }
  },
  {
    id: 'timers-stopwatch',
    name: 'Timers & Stopwatch',
    description: 'Use a countdown timer or a stopwatch with lap functionality.',
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
    }
  },
  {
    id: 'todo-list',
    name: 'To-Do List',
    description: 'A simple to-do list that saves your tasks in the browser.',
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
      privacy: "Your to-do list is stored in your browser's `localStorage`. This data is not transmitted to our servers and remains private to your device."
    }
  },
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    description: 'A simple timer to help you focus with the Pomodoro Technique.',
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
    }
  },
  // Fun Tools
  {
    id: 'meme-generator',
    name: 'Meme Generator',
    description: 'Create your own memes by adding text to an image.',
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
    }
  },
  // Misc Tools
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, random passwords with customizable options.',
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
    }
  },
  {
    id: 'qrcode-generator',
    name: 'QR Code Generator',
    description: 'Generate a QR code from a URL or text.',
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
    }
  },
];

export const CATEGORY_ORDER: ToolCategory[] = [
    ToolCategory.TEXT,
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
};

export const CATEGORY_CONTENT: Record<ToolCategory, {
  introduction: string;
  benefits: string[];
  useCases: string[];
}> = {
  [ToolCategory.TEXT]: {
    introduction: "Text is everywhere in our digital world—whether you're writing content, coding, or just organizing notes. Our Text Tools category makes working with words effortless and fun. From transforming case formats to analyzing readability, these utilities help you refine, analyze, and perfect your text without the hassle of manual editing.",
    benefits: [
      "Quickly transform text to fit any format or style",
      "Get instant insights into word counts, keywords, and readability",
      "Save time on repetitive text tasks with one-click solutions",
      "Perfect for writers, developers, and content creators alike"
    ],
    useCases: [
      "Bloggers checking readability scores before publishing",
      "Developers converting variable names between coding conventions",
      "Students analyzing keyword density in essays",
      "Marketers generating placeholder text for layouts"
    ]
  },
  [ToolCategory.CODING]: {
    introduction: "Coding is creative, but it can also be tedious when you're dealing with formatting, debugging, or data conversion. Our Coding Tools are designed for developers who want to focus on building amazing things, not wrestling with syntax or file formats. These utilities run right in your browser, keeping your workflow smooth and secure.",
    benefits: [
      "Format and validate code/data instantly without servers",
      "Debug complex tokens and patterns with visual feedback",
      "Convert between formats seamlessly for better interoperability",
      "All processing happens locally for complete privacy"
    ],
    useCases: [
      "Frontend developers pretty-printing API responses",
      "Full-stack engineers testing regex patterns for validation",
      "Data scientists converting CSV files to JSON for analysis",
      "DevOps teams generating secure hashes for configuration"
    ]
  },
  [ToolCategory.IMAGE]: {
    introduction: "Images bring your ideas to life, but preparing them for the web or apps can be tricky. Our Image Tools simplify the process of converting and embedding images, so you can focus on creativity rather than technical headaches. Whether you're embedding assets in code or sharing optimized files, these tools make it quick and easy.",
    benefits: [
      "Convert images to formats that work anywhere",
      "Embed images directly in code without extra files",
      "Maintain quality while reducing file sizes",
      "No uploads required—everything stays on your device"
    ],
    useCases: [
      "Web designers embedding logos in email templates",
      "Developers converting images to Base64 for CSS backgrounds",
      "Content creators preparing assets for social media",
      "App developers testing image data in prototypes"
    ]
  },
  [ToolCategory.CSS]: {
    introduction: "CSS is the magic behind beautiful websites, but crafting the perfect styles can take trial and error. Our CSS Tools let you experiment visually and generate clean, production-ready code. From shadows to gradients, these utilities help you create stunning designs faster and with more confidence.",
    benefits: [
      "Visual previews of styles before coding",
      "Generate complex CSS properties with simple controls",
      "Copy-paste ready code that works across browsers",
      "Perfect for rapid prototyping and design iteration"
    ],
    useCases: [
      "UI designers creating button shadows for prototypes",
      "Front-end developers experimenting with neumorphism effects",
      "Landing page builders generating custom gradients",
      "CSS learners practicing with interactive generators"
    ]
  },
  [ToolCategory.COLOR]: {
    introduction: "Color is the soul of design—it sets the mood, guides the eye, and makes your creations memorable. Our Color Tools help you explore, convert, and harmonize colors effortlessly, whether you're building a brand or just experimenting. Turn inspiration into precise palettes with tools that understand the nuances of color theory.",
    benefits: [
      "Convert between color formats instantly (HEX, RGB, HSL)",
      "Generate harmonious palettes from a single color",
      "Visual feedback to see how colors work together",
      "Perfect for both beginners and design professionals"
    ],
    useCases: [
      "Graphic designers creating brand color schemes",
      "Web developers converting Photoshop colors to CSS",
      "Artists experimenting with color harmonies",
      "Marketers ensuring consistent branding across platforms"
    ]
  },
  [ToolCategory.MATH]: {
    introduction: "Math doesn't have to be complicated or confined to calculators. Our Math Tools bring practical calculations to your fingertips, from unit conversions to financial planning. Whether you're a student solving problems, a professional crunching numbers, or just curious about the world, these utilities make math accessible and useful.",
    benefits: [
      "Accurate conversions between units and currencies",
      "Financial calculators for real-world planning",
      "Health metrics like BMI with easy interpretation",
      "All calculations done locally for instant results"
    ],
    useCases: [
      "Students converting units for homework assignments",
      "Travelers checking currency exchange rates",
      "Fitness enthusiasts tracking BMI progress",
      "Homeowners estimating loan payments"
    ]
  },
  [ToolCategory.PRODUCTIVITY]: {
    introduction: "In a busy world, staying organized and focused is key to getting things done. Our Productivity Tools are like your personal assistant—timers, clocks, and task managers that help you make the most of your time. Designed for the modern workflow, they keep you on track without overwhelming you with complexity.",
    benefits: [
      "Time management with Pomodoro and world clocks",
      "Task organization that syncs with your browser",
      "Timers and stopwatches for precise tracking",
      "Cross-timezone coordination for global teams"
    ],
    useCases: [
      "Remote workers scheduling calls across time zones",
      "Students using Pomodoro for focused study sessions",
      "Professionals managing to-do lists during the day",
      "Freelancers timing client work with stopwatches"
    ]
  },
  [ToolCategory.FUN]: {
    introduction: "Who says tools have to be serious? Our Fun Tools let you unleash your creativity and add some joy to your digital life. From meme creation to playful text effects, these utilities are perfect for breaking up the workday or sharing laughs with friends. Because even developers deserve a bit of fun!",
    benefits: [
      "Quick, easy creation of shareable content",
      "No design skills required—just your imagination",
      "Perfect for social media, team chats, or personal enjoyment",
      "Lightweight tools that run instantly in your browser"
    ],
    useCases: [
      "Social media enthusiasts creating custom memes",
      "Team members sharing funny posts in Slack",
      "Content creators generating viral graphics",
      "Friends experimenting with text effects for messages"
    ]
  },
  [ToolCategory.MISC]: {
    introduction: "Sometimes you need a tool that doesn't fit neatly into a box—and that's exactly what our Misc Tools are for. From generating secure passwords to creating QR codes, these utilities cover the unexpected but essential tasks that pop up in everyday digital life. Think of them as your Swiss Army knife for the web.",
    benefits: [
      "Versatile utilities for security and convenience",
      "Generate unique IDs, codes, and secure strings",
      "Quick solutions for one-off tasks",
      "Everything processed locally for your privacy"
    ],
    useCases: [
      "Users creating strong passwords for new accounts",
      "Business owners generating QR codes for products",
      "Developers needing unique IDs for testing",
      "Anyone sharing links via scannable codes"
    ]
  }
};