import React from 'react';
import {
  // Category Icons
  Type,
  Code,
  Image as ImageL,
  Palette,
  Calculator,
  Clock,
  Smile,
  Wrench,
  Folder,
  Lock as LockIcon,
  Video,
  // UI Icons
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  Search,
  Menu,
  X,
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
  BookOpen,
  CreditCard,
  MapPin,
  // Video Tool Icons
  Minimize2,
  Music,
  Image as GifIcon,
  Scissors,
  RefreshCw,
  Camera,
  VolumeX,
  Upload,
  Stamp,
  Maximize2,
  FileImage,
  Zap,
  // New Icons
  Terminal,
  Camera as CameraIcon,
  Table,
  Link2,
  Contrast,
  Sliders,
  Triangle,
  MoreHorizontal,
  Binary,
  ShieldCheck,
  Percent,
  List,
  Eraser,
  Lightbulb,
  // Even Newer Icons
  Youtube,
  PenTool,
  Tags,
  Aperture,
  Cloud,
  Waves,
  Keyboard,
  Monitor,
  Mic,
  Coins,
  Baby,
  Dices,
  Copy,
  Code2,
  MousePointer2,
  Smartphone,
  ImagePlus,
  Square,
  Grid,
} from 'lucide-react';

const iconProps = {
  className: 'w-8 h-8 text-blue-400',
  strokeWidth: '1.5',
};

const categoryIconProps = {
  className: 'w-6 h-6 mr-3 text-blue-400',
  strokeWidth: '1.5',
};

// UI Icons - Using Lucide React
export const ChevronDownIcon: React.FC<{ className?: string }> = ({
  className,
}) => <ChevronDown className={className || 'w-5 h-5'} />;

export const ChevronRightIcon: React.FC<{ className?: string }> = ({
  className,
}) => <ChevronRight className={className || 'w-5 h-5'} />;

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Sun className={className || 'w-6 h-6'} />
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Moon className={className || 'w-6 h-6'} />
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Search className={className || 'w-5 h-5'} />
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Menu className={className || 'w-6 h-6'} />
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <X className={className || 'w-6 h-6'} />
);

// Category Icons - Using Lucide React for clean, professional icons
export const TextCategoryIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Type {...categoryIconProps} {...(className && { className })} />;

export const ImageCategoryIcon: React.FC<{ className?: string }> = ({
  className,
}) => <ImageL {...categoryIconProps} {...(className && { className })} />;

export const CssCategoryIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Code {...categoryIconProps} {...(className && { className })} />;

export const CodeCategoryIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Code {...categoryIconProps} {...(className && { className })} />;

export const ColorCategoryIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Palette {...categoryIconProps} {...(className && { className })} />;

export const MiscCategoryIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Wrench {...categoryIconProps} {...(className && { className })} />;

export const MathCategoryIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Calculator {...categoryIconProps} {...(className && { className })} />;

export const ProductivityCategoryIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Clock {...categoryIconProps} {...(className && { className })} />;

export const FunCategoryIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Smile {...categoryIconProps} {...(className && { className })} />;

export const VideoCategoryIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Video {...categoryIconProps} {...(className && { className })} />;

export const SecurityCategoryIcon: React.FC<{ className?: string }> = ({
  className,
}) => <LockIcon {...categoryIconProps} {...(className && { className })} />;

export const ContentCategoryIcon: React.FC<{ className?: string }> = ({
  className,
}) => <FileText {...categoryIconProps} {...(className && { className })} />;

// Tool Icons
export const CaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <CaseSensitive {...iconProps} {...(className && { className })} />
);

export const CounterIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Hash {...iconProps} {...(className && { className })} />;

export const WordCounterIcon = CounterIcon;

export const CharacterCounterIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Hash {...iconProps} {...(className && { className })} />;

export const LoremIpsumIcon: React.FC<{ className?: string }> = ({
  className,
}) => <FileText {...iconProps} {...(className && { className })} />;

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

export const PasswordIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Lock {...iconProps} {...(className && { className })} />;

export const ColorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Paintbrush {...iconProps} {...(className && { className })} />
);

export const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <ImageL {...iconProps} {...(className && { className })} />
);

export const TextReverseIcon: React.FC<{ className?: string }> = ({
  className,
}) => <RotateCcw {...iconProps} {...(className && { className })} />;

export const BoxShadowIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Box {...iconProps} {...(className && { className })} />;

export const HashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Hash {...iconProps} {...(className && { className })} />
);

export const JwtIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Shield {...iconProps} {...(className && { className })} />
);

export const QrCodeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <QrCode {...iconProps} {...(className && { className })} />
);

export const MarkdownIcon: React.FC<{ className?: string }> = ({
  className,
}) => <FileCode {...iconProps} {...(className && { className })} />;

export const FileCodeIcon: React.FC<{ className?: string }> = ({
  className,
}) => <FileCode {...iconProps} {...(className && { className })} />;

export const DateCalcIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Calendar {...iconProps} {...(className && { className })} />;

export const DiffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <GitCompare {...iconProps} {...(className && { className })} />
);

export const PomodoroIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Timer {...iconProps} {...(className && { className })} />;

export const MemeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Laugh {...iconProps} {...(className && { className })} />
);

export const RegexIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Regex {...iconProps} {...(className && { className })} />
);

export const PaletteIcon: React.FC<{ className?: string }> = ({
  className,
}) => <PaletteTool {...iconProps} {...(className && { className })} />;

export const UnitConverterIcon: React.FC<{ className?: string }> = ({
  className,
}) => <ArrowLeftRight {...iconProps} {...(className && { className })} />;

export const BmiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <User {...iconProps} {...(className && { className })} />
);

export const TodoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <CheckCircle {...iconProps} {...(className && { className })} />
);

export const CurrencyIcon: React.FC<{ className?: string }> = ({
  className,
}) => <DollarSign {...iconProps} {...(className && { className })} />;

export const WorldClockIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Globe {...iconProps} {...(className && { className })} />;

export const TimersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Stopwatch {...iconProps} {...(className && { className })} />
);

export const FileConversionIcon: React.FC<{ className?: string }> = ({
  className,
}) => <FileUp {...iconProps} {...(className && { className })} />;

export const CsvToJsonIcon: React.FC<{ className?: string }> = ({
  className,
}) => <FileSpreadsheet {...iconProps} {...(className && { className })} />;

export const JsonToCsvIcon: React.FC<{ className?: string }> = ({
  className,
}) => <FileSpreadsheet {...iconProps} {...(className && { className })} />;

export const CsvToXlsxIcon: React.FC<{ className?: string }> = ({
  className,
}) => <FileSpreadsheet {...iconProps} {...(className && { className })} />;

export const XlsxToCsvIcon: React.FC<{ className?: string }> = ({
  className,
}) => <FileDown {...iconProps} {...(className && { className })} />;

export const Base64ToImageIcon: React.FC<{ className?: string }> = ({
  className,
}) => <ImageL {...iconProps} {...(className && { className })} />;

export const RecipeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...iconProps}
    {...(className && { className })}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

export const KeywordDensityIcon: React.FC<{ className?: string }> = ({
  className,
}) => <BarChart3 {...iconProps} {...(className && { className })} />;

export const ReadabilityIcon: React.FC<{ className?: string }> = ({
  className,
}) => <BookOpen {...iconProps} {...(className && { className })} />;

export const LoanCalculatorIcon: React.FC<{ className?: string }> = ({
  className,
}) => <CreditCard {...iconProps} {...(className && { className })} />;

export const TimeZoneConverterIcon: React.FC<{ className?: string }> = ({
  className,
}) => <MapPin {...iconProps} {...(className && { className })} />;

export const FolderIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Folder className={className} />
);

// CSS Tool Icons
export const GradientIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...iconProps}
    {...(className && { className })}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l3-3 3 3" />
  </svg>
);

export const BorderRadiusIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Box {...iconProps} {...(className && { className })} />;

export const TextShadowIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Type {...iconProps} {...(className && { className })} />;

export const GlassmorphismIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Box {...iconProps} {...(className && { className })} />;

// Video Tool Icons
export const VideoCompressorIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Minimize2 {...iconProps} {...(className && { className })} />;

export const VideoToAudioIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Music {...iconProps} {...(className && { className })} />;

export const TrimVideoIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Scissors {...iconProps} {...(className && { className })} />;

export const FormatConverterIcon: React.FC<{ className?: string }> = ({
  className,
}) => <RefreshCw {...iconProps} {...(className && { className })} />;

export const VideoThumbnailIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Camera {...iconProps} {...(className && { className })} />;

export const VideoMuteIcon: React.FC<{ className?: string }> = ({
  className,
}) => <VolumeX {...iconProps} {...(className && { className })} />;

export const WatermarkAdderIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Stamp {...iconProps} {...(className && { className })} />;

export const ImageResizerIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Maximize2 {...iconProps} {...(className && { className })} />;

export const ImageConverterIcon: React.FC<{ className?: string }> = ({
  className,
}) => <FileImage {...iconProps} {...(className && { className })} />;

export const ImageCompressorIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Zap {...iconProps} {...(className && { className })} />;

// New Icons for Added Tools
export const TerminalIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Terminal {...iconProps} {...(className && { className })} />;

export const CameraToolIcon: React.FC<{ className?: string }> = ({
  className,
}) => <CameraIcon {...iconProps} {...(className && { className })} />;

export const SqlIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Database {...iconProps} {...(className && { className })} />
);

export const CronIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Clock {...iconProps} {...(className && { className })} />
);

export const Link2Icon: React.FC<{ className?: string }> = ({ className }) => (
  <Link2 {...iconProps} {...(className && { className })} />
);

export const TagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Code {...iconProps} {...(className && { className })} />
);

export const ContrastIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Contrast {...iconProps} {...(className && { className })} />;

export const ChmodIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Sliders {...iconProps} {...(className && { className })} />
);

export const UtmIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Link {...iconProps} {...(className && { className })} />
);

export const TriangleIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Triangle {...iconProps} {...(className && { className })} />;

export const XmlIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FileCode {...iconProps} {...(className && { className })} />
);

export const MorseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <MoreHorizontal {...iconProps} {...(className && { className })} />
);

export const BinaryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Binary {...iconProps} {...(className && { className })} />
);

export const ShieldCheckIcon: React.FC<{ className?: string }> = ({
  className,
}) => <ShieldCheck {...iconProps} {...(className && { className })} />;

export const StringEscaperIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Code {...iconProps} {...(className && { className })} />;

export const PercentIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Percent {...iconProps} {...(className && { className })} />;

export const TableIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Table {...iconProps} {...(className && { className })} />
);

export const ListIcon: React.FC<{ className?: string }> = ({ className }) => (
  <List {...iconProps} {...(className && { className })} />
);

export const EraserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Eraser {...iconProps} {...(className && { className })} />
);

export const AspectRatioIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Maximize2 {...iconProps} {...(className && { className })} />;

// Newly Added Icons
export const YoutubeIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Youtube {...iconProps} {...(className && { className })} />;

export const TagsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Tags {...iconProps} {...(className && { className })} />
);

export const FiltersIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Aperture {...iconProps} {...(className && { className })} />;

export const BlobIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Cloud {...iconProps} {...(className && { className })} />
);

export const WavesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Waves {...iconProps} {...(className && { className })} />
);

export const KeyboardIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Keyboard {...iconProps} {...(className && { className })} />;

export const ScreenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Monitor {...iconProps} {...(className && { className })} />
);

export const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Mic {...iconProps} {...(className && { className })} />
);

export const RomanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Coins {...iconProps} {...(className && { className })} />
);

export const BabyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Baby {...iconProps} {...(className && { className })} />
);

export const DiceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Dices {...iconProps} {...(className && { className })} />
);

export const DuplicateIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Copy {...iconProps} {...(className && { className })} />;

export const HtmlEntityIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Code2 {...iconProps} {...(className && { className })} />;

export const CursorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <MousePointer2 {...iconProps} {...(className && { className })} />
);

export const DevicesIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Smartphone {...iconProps} {...(className && { className })} />;

export const PlaceholderIcon: React.FC<{ className?: string }> = ({
  className,
}) => <ImagePlus {...iconProps} {...(className && { className })} />;

export const BorderIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Square {...iconProps} {...(className && { className })} />
);

export const PatternIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Grid {...iconProps} {...(className && { className })} />;

export const SignatureIcon: React.FC<{ className?: string }> = ({
  className,
}) => <PenTool {...iconProps} {...(className && { className })} />;

export const GifMakerIcon: React.FC<{ className?: string }> = ({
  className,
}) => <GifIcon {...iconProps} {...(className && { className })} />;

export const PenIcon: React.FC<{ className?: string }> = ({
  className,
}) => <PenTool {...iconProps} {...(className && { className })} />;

export const LightbulbIcon: React.FC<{ className?: string }> = ({
  className,
}) => <Lightbulb {...iconProps} {...(className && { className })} />;

export const AsciiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FileText {...iconProps} {...(className && { className })} />
);

export const SeparatorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <List {...iconProps} {...(className && { className })} />
);
