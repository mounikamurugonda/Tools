import React from 'react';
import { 
  // Category Icons
  Type, 
  Code, 
  Image as ImageL, 
  Palette, 
  Settings, 
  Calculator, 
  Clock, 
  Smile, 
  Wrench,
  Folder,
  Heart,
  Lock as LockIcon,
  // UI Icons
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  Search,
  Menu,
  X,
  Eye,
  // Tool Icons
  CaseSensitive,
  Hash,
  FileText,
  Database,
  Link,
  Braces,
  Key,
  Lock,
  Paintbrush,
  RotateCcw,
  Box,
  Shield,
  QrCode,
  FileCode,
  Calendar,
  GitCompare,
  Timer,
  Laugh,
  Regex,
  Palette as PaletteTool,
  ArrowLeftRight,
  User,
  CheckCircle,
  DollarSign,
  Globe,
  Timer as Stopwatch,
  FileUp,
  FileSpreadsheet,
  FileDown,
  BarChart3,
  Search as SearchTool,
  BookOpen,
  CreditCard,
  MapPin
} from 'lucide-react';

const iconProps = {
  className: "w-8 h-8 text-blue-400 mb-2",
  strokeWidth: "1.5"
};

const categoryIconProps = {
    className: "w-6 h-6 mr-3 text-blue-400",
    strokeWidth: "1.5"
};

// UI Icons - Using Lucide React
export const ChevronDownIcon: React.FC<{className?: string}> = ({ className }) => (
    <ChevronDown className={className || "w-5 h-5"} />
);

export const ChevronRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <ChevronRight className={className || "w-5 h-5"} />
);

export const SunIcon: React.FC<{className?: string}> = ({ className }) => (
    <Sun className={className || "w-6 h-6"} />
);

export const MoonIcon: React.FC<{className?: string}> = ({ className }) => (
    <Moon className={className || "w-6 h-6"} />
);

export const SearchIcon: React.FC<{className?: string}> = ({ className }) => (
    <Search className={className || "w-5 h-5"} />
);

export const MenuIcon: React.FC<{className?: string}> = ({ className }) => (
    <Menu className={className || "w-6 h-6"} />
);

export const CloseIcon: React.FC<{className?: string}> = ({ className }) => (
    <X className={className || "w-6 h-6"} />
);


export const LogoIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-8 h-8"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 8.33333V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 4H4C2.89543 4 2 4.89543 2 6V8.33333H22V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


// Category Icons - Using Lucide React for clean, professional icons
export const TextCategoryIcon: React.FC<{className?: string}> = ({ className }) => (
    <Type {...categoryIconProps} {...(className && { className })} />
);

export const ImageCategoryIcon: React.FC<{className?: string}> = ({ className }) => (
    <ImageL {...categoryIconProps} {...(className && { className })} />
);

export const CssCategoryIcon: React.FC<{className?: string}> = ({ className }) => (
    <Code {...categoryIconProps} {...(className && { className })} />
);

export const CodeCategoryIcon: React.FC<{className?: string}> = ({ className }) => (
    <Code {...categoryIconProps} {...(className && { className })} />
);

export const ColorCategoryIcon: React.FC<{className?: string}> = ({ className }) => (
    <Palette {...categoryIconProps} {...(className && { className })} />
);

export const MiscCategoryIcon: React.FC<{className?: string}> = ({ className }) => (
    <Wrench {...categoryIconProps} {...(className && { className })} />
);

export const MathCategoryIcon: React.FC<{className?: string}> = ({ className }) => (
    <Calculator {...categoryIconProps} {...(className && { className })} />
);

export const ProductivityCategoryIcon: React.FC<{className?: string}> = ({ className }) => (
    <Clock {...categoryIconProps} {...(className && { className })} />
);

export const FunCategoryIcon: React.FC<{className?: string}> = ({ className }) => (
    <Smile {...categoryIconProps} {...(className && { className })} />
);

export const SecurityCategoryIcon: React.FC<{className?: string}> = ({ className }) => (
    <LockIcon {...categoryIconProps} {...(className && { className })} />
);

export const ContentCategoryIcon: React.FC<{className?: string}> = ({ className }) => (
    <FileText {...categoryIconProps} {...(className && { className })} />
);


// Tool Icons
export const CaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <CaseSensitive {...iconProps} {...(className && { className })} />
);

export const CounterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Hash {...iconProps} {...(className && { className })} />
);

export const WordCounterIcon = CounterIcon;

export const CharacterCounterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Hash {...iconProps} {...(className && { className })} />
);

export const LoremIpsumIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FileText {...iconProps} {...(className && { className })} />
);

export const Base64Icon: React.FC<{ className?: string }> = ({ className }) => (
  <Database {...iconProps} {...(className && { className })} />
);

export const UrlIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Link {...iconProps} {...(className && { className })} />
);

export const JsonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Braces {...iconProps} {...(className && { className })} />
);

export const UuidIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Key {...iconProps} {...(className && { className })} />
);

export const PasswordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Lock {...iconProps} {...(className && { className })} />
);

export const ColorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Paintbrush {...iconProps} {...(className && { className })} />
);

export const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <ImageL {...iconProps} {...(className && { className })} />
);

export const TextReverseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <RotateCcw {...iconProps} {...(className && { className })} />
);

export const BoxShadowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Box {...iconProps} {...(className && { className })} />
);

export const HashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Hash {...iconProps} {...(className && { className })} />
);

export const JwtIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Shield {...iconProps} {...(className && { className })} />
);

export const QrCodeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <QrCode {...iconProps} {...(className && { className })} />
);

export const MarkdownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FileCode {...iconProps} {...(className && { className })} />
);

export const DateCalcIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Calendar {...iconProps} {...(className && { className })} />
);

export const DiffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <GitCompare {...iconProps} {...(className && { className })} />
);

export const PomodoroIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Timer {...iconProps} {...(className && { className })} />
);

export const MemeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Laugh {...iconProps} {...(className && { className })} />
);

export const RegexIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Regex {...iconProps} {...(className && { className })} />
);

export const PaletteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <PaletteTool {...iconProps} {...(className && { className })} />
);

export const UnitConverterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <ArrowLeftRight {...iconProps} {...(className && { className })} />
);

export const BmiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <User {...iconProps} {...(className && { className })} />
);

export const TodoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <CheckCircle {...iconProps} {...(className && { className })} />
);

export const CurrencyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <DollarSign {...iconProps} {...(className && { className })} />
);

export const WorldClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Globe {...iconProps} {...(className && { className })} />
);

export const TimersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Stopwatch {...iconProps} {...(className && { className })} />
);

export const FileConversionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FileUp {...iconProps} {...(className && { className })} />
);

export const CsvToJsonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FileSpreadsheet {...iconProps} {...(className && { className })} />
);

export const JsonToCsvIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FileSpreadsheet {...iconProps} {...(className && { className })} />
);

export const CsvToXlsxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FileSpreadsheet {...iconProps} {...(className && { className })} />
);

export const XlsxToCsvIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FileDown {...iconProps} {...(className && { className })} />
);

export const Base64ToImageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <ImageL {...iconProps} {...(className && { className })} />
);

export const RecipeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);


export const KeywordDensityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <BarChart3 {...iconProps} {...(className && { className })} />
);

export const ReadabilityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <BookOpen {...iconProps} {...(className && { className })} />
);

export const LoanCalculatorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <CreditCard {...iconProps} {...(className && { className })} />
);

export const TimeZoneConverterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <MapPin {...iconProps} {...(className && { className })} />
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Eye className={className || "w-4 h-4"} />
);

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311V21m-3.75-2.311V21m0 0a2.25 2.25 0 01-2.25-2.25m2.25-2.25a2.25 2.25 0 00-2.25-2.25M15 5.25l-3 3m0 0l-3-3m3 3V1.5M9 5.25l3 3m0 0l3-3" />
    </svg>
);

export const FolderIcon: React.FC<{className?: string}> = ({ className }) => (
    <Folder className={className} />
);

// CSS Tool Icons
export const GradientIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l3-3 3 3" />
    </svg>
);

export const BorderRadiusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Box {...iconProps} {...(className && { className })} />
);

export const TextShadowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Type {...iconProps} {...(className && { className })} />
);

export const GlassmorphismIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Box {...iconProps} {...(className && { className })} />
);