
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
} from '@/components/icons';


export const TOOLS: Tool[] = [
  // Text Tools
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between uppercase, lowercase, title case, and more.',
    icon: <CaseIcon />,
    component: CaseConverter,
    category: ToolCategory.TEXT,
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and lines in your text.',
    icon: <CounterIcon />,
    component: WordCounter,
    category: ToolCategory.TEXT,
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text with a specified number of paragraphs.',
    icon: <LoremIpsumIcon />,
    component: LoremIpsumGenerator,
    category: ToolCategory.TEXT,
  },
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    description: 'Quickly reverse any string of text.',
    icon: <TextReverseIcon />,
    component: TextReverser,
    category: ToolCategory.TEXT,
  },
  {
    id: 'markdown-previewer',
    name: 'Markdown Previewer',
    description: 'Write Markdown and see the rendered HTML in real-time.',
    icon: <MarkdownIcon />,
    component: MarkdownPreviewer,
    category: ToolCategory.TEXT,
  },
  // Coding Tools
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode text to Base64 or decode a Base64 string back to text.',
    icon: <Base64Icon />,
    component: Base64Converter,
    category: ToolCategory.CODING,
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode strings for safe use in URLs.',
    icon: <UrlIcon />,
    component: UrlEncoder,
    category: ToolCategory.CODING,
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, pretty-print, and validate your JSON data.',
    icon: <JsonIcon />,
    component: JsonFormatter,
    category: ToolCategory.CODING,
  },
    {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions against strings and see matches.',
    icon: <RegexIcon />,
    component: RegexTester,
    category: ToolCategory.CODING,
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate universally unique identifiers (UUID v4).',
    icon: <UuidIcon />,
    component: UuidGenerator,
    category: ToolCategory.CODING,
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate SHA hashes from text using the Web Crypto API.',
    icon: <HashIcon />,
    component: HashGenerator,
    category: ToolCategory.CODING,
  },
  {
    id: 'jwt-debugger',
    name: 'JWT Decoder',
    description: 'Decode a JSON Web Token to view its header and payload.',
    icon: <JwtIcon />,
    component: JwtDebugger,
    category: ToolCategory.CODING,
  },
   {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Compare two blocks of text and highlight the differences.',
    icon: <DiffIcon />,
    component: DiffChecker,
    category: ToolCategory.CODING,
  },
  // Image Tools
  {
    id: 'image-to-base64',
    name: 'Image to Base64',
    description: 'Convert an image file into a Base64 data URL string.',
    icon: <ImageIcon />,
    component: ImageToBase64,
    category: ToolCategory.IMAGE,
  },
    {
    id: 'base64-to-image',
    name: 'Base64 to Image',
    description: 'Convert a Base64 data URL into a viewable image.',
    icon: <ImageIcon />,
    component: Base64ToImage,
    category: ToolCategory.IMAGE,
  },
  // CSS Tools
  {
    id: 'box-shadow-generator',
    name: 'Box Shadow Generator',
    description: 'Create and customize CSS box-shadow effects with a visual editor.',
    icon: <BoxShadowIcon />,
    component: BoxShadowGenerator,
    category: ToolCategory.CSS,
  },
  // Color Tools
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert colors between HEX, RGB, and HSL formats.',
    icon: <ColorIcon />,
    component: ColorConverter,
    category: ToolCategory.COLOR,
  },
  {
    id: 'color-palette-generator',
    name: 'Color Palette Generator',
    description: 'Generate color palettes from a base color.',
    icon: <PaletteIcon />,
    component: ColorPaletteGenerator,
    category: ToolCategory.COLOR,
  },
  // Math Tools
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between common units of measurement.',
    icon: <UnitConverterIcon />,
    component: UnitConverter,
    category: ToolCategory.MATH,
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between currencies with near real-time rates.',
    icon: <CurrencyIcon />,
    component: CurrencyConverter,
    category: ToolCategory.MATH,
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index.',
    icon: <BmiIcon />,
    component: BmiCalculator,
    category: ToolCategory.MATH,
  },
  {
    id: 'date-calculator',
    name: 'Date Calculator',
    description: 'Calculate duration between dates or add/subtract days.',
    icon: <DateCalcIcon />,
    component: DateCalculator,
    category: ToolCategory.MATH,
  },
  // Productivity Tools
  {
    id: 'world-clock',
    name: 'World Clock',
    description: 'Display and compare the current time in different cities.',
    icon: <WorldClockIcon />,
    component: WorldClock,
    category: ToolCategory.PRODUCTIVITY,
  },
  {
    id: 'timers-stopwatch',
    name: 'Timers & Stopwatch',
    description: 'Use a countdown timer or a stopwatch with lap functionality.',
    icon: <TimersIcon />,
    component: TimersAndStopwatch,
    category: ToolCategory.PRODUCTIVITY,
  },
  {
    id: 'todo-list',
    name: 'To-Do List',
    description: 'A simple to-do list that saves your tasks in the browser.',
    icon: <TodoIcon />,
    component: TodoList,
    category: ToolCategory.PRODUCTIVITY,
  },
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    description: 'A simple timer to help you focus with the Pomodoro Technique.',
    icon: <PomodoroIcon />,
    component: PomodoroTimer,
    category: ToolCategory.PRODUCTIVITY,
  },
  // Fun Tools
  {
    id: 'meme-generator',
    name: 'Meme Generator',
    description: 'Create your own memes by adding text to an image.',
    icon: <MemeIcon />,
    component: MemeGenerator,
    category: ToolCategory.FUN,
  },
  // Misc Tools
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, random passwords with customizable options.',
    icon: <PasswordIcon />,
    component: PasswordGenerator,
    category: ToolCategory.MISC,
  },
  {
    id: 'qrcode-generator',
    name: 'QR Code Generator',
    description: 'Generate a QR code from a URL or text.',
    icon: <QrCodeIcon />,
    component: QrCodeGenerator,
    category: ToolCategory.MISC,
  },
];
