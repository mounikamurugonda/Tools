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
  HashIcon,
  JwtIcon,
  QrCodeIcon,
  MarkdownIcon,
  DateCalcIcon,
  DiffIcon,
  PomodoroIcon,
  MemeIcon,
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
} from '@/components/icons';

const PRIVACY_STATEMENT = "All calculations and data processing for this tool are performed locally in your browser. We do not send any of your data to our servers, ensuring your information remains private and secure.";


export const TOOLS: Tool[] = [
  // Text Tools
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between uppercase, lowercase, title case, and more.',
    icon: <CaseIcon />,
    component: CaseConverter,
    category: ToolCategory.TEXT,
    details: {
      introduction: 'The Case Converter tool allows you to easily transform the case of your text. Whether you need your text in all uppercase, all lowercase, sentence case, or title case, this tool provides a quick and easy solution.',
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
      introduction: 'The Word Counter provides real-time statistics for any text you input. It instantly counts words, characters, sentences, and lines, making it perfect for writers, students, and professionals who need to meet specific length requirements.',
      howToUse: [
        'Paste or type your text into the text area.',
        'The statistics for words, characters, sentences, and lines will update automatically as you type.',
      ],
      features: [
        'Real-time counting of words, characters, sentences, and lines.',
        'Accurate analysis that correctly handles various punctuation and spacing.',
        'Simple interface with a clear display of all key metrics.',
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
      introduction: 'This tool generates "Lorem Ipsum" placeholder text, commonly used in design and publishing to preview layouts and visual mockups before the final content is available.',
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
      introduction: 'A simple yet fun utility to reverse any text you provide. It flips the entire string of characters, including letters, numbers, symbols, and spaces, instantly.',
      howToUse: [
        'Enter or paste the text you want to reverse into the "Original Text" box.',
        'The reversed text will automatically appear in the "Reversed Text" box below.',
      ],
      features: [
        'Reverses text in real-time as you type.',
        'Handles all characters, including special symbols and emojis.',
        'Useful for creating "backwards" text for social media or light-hearted puzzles.',
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
      introduction: 'This real-time Markdown editor allows you to write in Markdown syntax on one side and see the rendered HTML output on the other. It\'s an excellent tool for drafting documentation, blog posts, or README files.',
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
      introduction: 'This tool provides a simple way to encode plain text into a Base64 string and decode Base64 strings back into their original plain text form. Base64 encoding is commonly used to transmit data over media that are designed to handle text.',
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
      introduction: 'URL encoding, also known as percent-encoding, converts characters into a format that can be safely transmitted over the Internet. This tool allows you to both encode and decode URL components.',
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
    details: {
      introduction: 'The JSON Formatter helps you validate and beautify your JSON data. It makes convoluted, single-line JSON readable by formatting it into a well-structured, indented tree.',
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
      introduction: 'A tool for developers to test and debug regular expressions. Instantly see how your pattern matches against a test string, with results and matches highlighted.',
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
      introduction: 'Generate Version 4 UUIDs (Universally Unique Identifiers), which are random, 128-bit numbers used to uniquely identify information in computer systems.',
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
      introduction: 'Create a cryptographic hash (or "digest") of any text using the secure SHA (Secure Hash Algorithm) family. This tool uses the native Web Crypto API in your browser for enhanced security.',
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
      introduction: 'The JWT Decoder allows you to quickly inspect the contents of a JSON Web Token. Simply paste the token to see the decoded header and payload data. Note: This tool does not verify the token\'s signature.',
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
      privacy: PRIVACY_STATEMENT
    }
  },
   {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Compare two blocks of text and highlight the differences.',
    icon: <DiffIcon />,
    component: DiffChecker,
    // FIX: Added missing 'category' property.
    category: ToolCategory.CODING,
    details: {
      introduction: 'The Diff Checker helps you compare two pieces of text to find the differences between them. It highlights added and removed lines, making it easy to spot changes in code, documents, or any text-based content.',
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
      privacy: PRIVACY_STATEMENT
    }
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert CSV data into a structured JSON array.',
    icon: <FileConversionIcon />,
    component: CsvToJson,
    category: ToolCategory.CODING,
    details: {
      introduction: 'This tool converts data from CSV (Comma-Separated Values) format into a JSON array of objects. It uses the first line of the CSV as headers for the JSON keys.',
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
      privacy: PRIVACY_STATEMENT
    }
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Convert a JSON array of objects into CSV format.',
    icon: <FileConversionIcon />,
    component: JsonToCsv,
    category: ToolCategory.CODING,
    details: {
      introduction: 'Convert a JSON array of objects into CSV (Comma-Separated Values) format. The keys from the first object in the array are used as the CSV headers.',
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
      privacy: PRIVACY_STATEMENT
    }
  },
  {
    id: 'csv-to-xlsx',
    name: 'CSV to XLSX',
    description: 'Convert CSV data directly into an Excel (.xlsx) file.',
    icon: <FileConversionIcon />,
    component: CsvToXlsx,
    category: ToolCategory.CODING,
    details: {
      introduction: 'Easily convert your CSV data into a downloadable Excel spreadsheet (.xlsx format). This tool processes the data in your browser and generates a file for you to save.',
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
      privacy: PRIVACY_STATEMENT
    }
  },
  {
    id: 'xlsx-to-csv',
    name: 'XLSX to CSV',
    description: 'Extract data from an Excel (.xlsx) file and convert it to CSV.',
    icon: <FileConversionIcon />,
    component: XlsxToCsv,
    category: ToolCategory.CODING,
    details: {
      introduction: 'This tool allows you to upload an Excel file (.xlsx) and convert the first sheet into CSV format. The conversion happens entirely within your browser for complete privacy.',
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
    details: {
      introduction: 'This tool converts an image file from your computer into a Base64-encoded Data URL. This format can be directly embedded in HTML or CSS files, which can be useful for reducing HTTP requests for small icons and images.',
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
      privacy: PRIVACY_STATEMENT
    }
  },
    {
    id: 'base64-to-image',
    name: 'Base64 to Image',
    description: 'Convert a Base64 data URL into a viewable image.',
    icon: <ImageIcon />,
    component: Base64ToImage,
    category: ToolCategory.IMAGE,
    details: {
      introduction: 'If you have a Base64 Data URL, this tool can decode it back into a viewable image. You can then preview the image and download it as a file.',
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
      introduction: 'Visually design complex CSS `box-shadow` effects. This generator provides sliders and color pickers to intuitively create the perfect shadow, then gives you the CSS code to copy and paste.',
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
    details: {
      introduction: 'A handy tool for web designers and developers to convert color codes between HEX, RGB, and HSL formats. Use the color picker or type in a value to see the conversions instantly.',
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
      introduction: 'Create harmonious color schemes based on a single base color. This tool can generate different types of palettes, such as monochromatic, analogous, complementary, and triadic, to help you with your design projects.',
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
      introduction: 'A versatile tool for converting between various units of measurement for length and weight. It provides quick and accurate conversions without needing to search online.',
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
      introduction: 'This Currency Converter provides exchange rates for a wide range of global currencies. It fetches up-to-date rates to give you an accurate conversion based on the latest financial data.',
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
      introduction: 'The Body Mass Index (BMI) Calculator is a tool that helps estimate body fat based on your weight and height. It provides a general indication of whether you are in a healthy weight range for your height.',
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
      introduction: 'This versatile Date Calculator has two modes. It can calculate the total duration (in days and weeks) between two dates, or it can calculate a future or past date by adding or subtracting a specific number of days from a starting date.',
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
      introduction: 'A multi-function timekeeping tool. Use the countdown Timer for tasks with a set duration, or switch to the Stopwatch to accurately measure elapsed time, complete with lap tracking.',
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
      introduction: 'A straightforward and persistent to-do list to help you stay organized. Add tasks, mark them as complete, and filter your view. Your tasks are automatically saved in your browser\'s local storage.',
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
    details: {
      introduction: 'The Pomodoro Timer helps you manage your time and stay focused using the Pomodoro Technique. It alternates between focused work sessions (typically 25 minutes) and short breaks (5 minutes) to improve productivity and prevent burnout.',
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
      introduction: 'Create classic-style memes with this easy-to-use generator. Upload your own image, add top and bottom text, and download your creation to share.',
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
    details: {
      introduction: 'Generate strong, secure, and random passwords to protect your online accounts. This tool uses the browser\'s cryptographically secure random number generator for high-quality randomness.',
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
      introduction: 'Create a QR Code from any text or URL. QR Codes are scannable barcodes that can store information and are easily read by smartphones, perfect for sharing links, contact info, or Wi-Fi credentials.',
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

export const CATEGORY_ICONS: Record<ToolCategory, React.FC> = {
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
