import React from 'react';

const iconProps = {
  className: "w-8 h-8 text-blue-400 mb-2",
  strokeWidth: "1.5"
};

const categoryIconProps = {
    className: "w-6 h-6 mr-3 text-blue-400",
    strokeWidth: "1.5"
};

export const ChevronDownIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export const ChevronRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

export const SunIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

export const MoonIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

export const SearchIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

export const MenuIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const CloseIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


export const LogoIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-8 h-8"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 8.33333V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 4H4C2.89543 4 2 4.89543 2 6V8.33333H22V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


// Category Icons
export const TextCategoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...categoryIconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.25v13.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25v13.5" />
    </svg>
);
export const ImageCategoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...categoryIconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
    </svg>
);
export const CssCategoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...categoryIconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 15.25M9.75 3.104a2.25 2.25 0 014.5 0v5.714a2.25 2.25 0 01-.659 1.591L14.25 15.25M9.75 3.104a2.25 2.25 0 00-4.5 0v5.714a2.25 2.25 0 00.659 1.591L5 15.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
export const CodeCategoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...categoryIconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
);
export const ColorCategoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...categoryIconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.622-3.385m-5.043-.025a15.998 15.998 0 01-3.388-1.621m-4.5 5.25a.75.75 0 01.025 1.06z" />
    </svg>
);
export const MiscCategoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...categoryIconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.007 1.11-1.212l2.173-.815a1.125 1.125 0 011.42 1.42l-.815 2.173a1.125 1.125 0 01-1.212 1.11M10.343 3.94a1.125 1.125 0 01-1.212-1.11l.815-2.173a1.125 1.125 0 011.42-1.42l2.173.815c.542.205 1.007.672 1.212 1.11M10.343 3.94c-1.191.226-2.28.69-3.182 1.34-1.84 1.32-2.903 3.32-2.903 5.56v.512c0 2.24 1.063 4.24 2.903 5.56 1.84 1.32 4.143 1.954 6.567 1.677a8.25 8.25 0 005.986-5.986c-.277-2.424-.957-4.727-2.277-6.567-1.32-1.84-3.32-2.903-5.56-2.903h-.512c-.933 0-1.794.204-2.58.56" />
    </svg>
);
export const MathCategoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...categoryIconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm3-6h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zM4.5 6.75h15v10.5h-15V6.75z" />
    </svg>
);
export const ProductivityCategoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...categoryIconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
export const FunCategoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...categoryIconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.595.482-1.077 1.077-1.077h.01a1.077 1.077 0 011.077 1.077v.01a1.077 1.077 0 01-1.077 1.077h-.01a1.077 1.077 0 01-1.077-1.077v-.01zM10.5 12h3m-3 3h3m-3-6h3m-3 6a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6.087c0-.595-.482-1.077-1.077-1.077h-.01a1.077 1.077 0 00-1.077 1.077v.01a1.077 1.077 0 001.077 1.077h.01a1.077 1.077 0 001.077-1.077v-.01z" />
    </svg>
);



// Tool Icons
export const CaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h14.25M3 13.5h14.25m-9.75 4.5h9.75M4.5 19.5v-15" />
  </svg>
);

export const CounterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.75h-9a.75.75 0 00-.75.75v9a.75.75 0 00.75.75h9a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m-3-3h6" />
  </svg>
);

export const CharacterCounterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 20L7 4l3 16m-4-8h4m6-6h5m-5 4h5m-4-6v8m3-8v8" />
    </svg>
);

export const LoremIpsumIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const Base64Icon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />
  </svg>
);

export const UrlIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
);

export const JsonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);

export const UuidIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.5a3 3 0 00-1.659-4.043 3 3 0 00-4.043 1.659L2.1 8.25m13.65 1.5l3-3" />
    </svg>
);

export const PasswordIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.5a3 3 0 00-1.659-4.043 3 3 0 00-4.043 1.659L2.1 8.25m13.65 1.5l-3.75 3.75" />
    </svg>
);

export const ColorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.622-3.385m-5.043-.025a15.998 15.998 0 01-3.388-1.621m-4.5 5.25a.75.75 0 01.025 1.06z" />
    </svg>
);

export const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

export const TextReverseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
  </svg>
);

export const BoxShadowIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.792V21H3V3h8.208M17.208 3L21 6.792M12 12H3m9 9V3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21l9-9" fill="currentColor" fillOpacity="0.2"/>
    </svg>
);

export const HashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h13.5m-13.5 7.5h13.5m-1.5-15l-3 15m-6-15l-3 15" />
    </svg>
);

export const JwtIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m-12 9a3 3 0 01-3-3m12-9a3 3 0 00-3-3m-9 12a3 3 0 003 3m9-12h-3m-6 0H4.5m9 12v-3m0-6V4.5m-6 15v-3m0-6V4.5" />
    </svg>
);

export const QrCodeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75h-4.5zM3.75 14.25a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75h-4.5zM14.25 4.5a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75h-4.5z" />
        <path stroke="currentColor" d="M15 15h.01M15 18h.01M18 15h.01M18 18h.01M15 21h.01M21 15h.01M21 18h.01M21 21h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6h1.5M9 9h1.5M6 6v1.5M6 9v1.5M9 15H7.5M9 18H7.5M6 15v1.5M6 18v1.5M15 6h1.5M15 9h1.5M18 6v1.5M18 9v1.5" />
    </svg>
);

export const MarkdownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
    </svg>
);

export const DateCalcIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z" />
    </svg>
);

export const DiffIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const PomodoroIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75a8.963 8.963 0 016 0" />
    </svg>
);

export const MemeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const RegexIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l.386-.966A2.25 2.25 0 0111.998 12h.004c1.116 0 2.12.723 2.404 1.784l.386.966M12 6.75v.007" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
    </svg>
);

export const PaletteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1015 0m-15 0a7.5 7.5 0 0115 0m-15 0H3m18 0h-1.5" />
    </svg>
);

export const UnitConverterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
);

export const BmiIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const TodoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const CurrencyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.21 12.77 11 12 11h-1.5a.75.75 0 01-.75-.75V9.75M12 6c-2.071 0-4.042.966-5.414 2.586m10.828 0A7.488 7.488 0 0012 6" />
    </svg>
);

export const WorldClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75c-4.29 0-7.85 3.33-8.625 7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v4.5l3.75 2.25" />
    </svg>
);

export const TimersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3.75L3.75 5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 3.75L20.25 5" />
    </svg>
);

export const FileConversionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

export const CsvToJsonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h6v15H3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5v15M3 9h6m-6 6h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12h3m0 0l-1.5 1.5M13.5 12l-1.5-1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75h-.75a.75.75 0 00-.75.75v9c0 .414.336.75.75.75h.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.5h-1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 16.5h-1.5" />
  </svg>
);

export const JsonToCsvIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h-.75a.75.75 0 00-.75.75v9c0 .414.336.75.75.75h.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5H7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 16.5H7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12h3m0 0l1.5 1.5m-1.5-1.5l1.5-1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 4.5h6v15h-6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 4.5v15m-2.25-10.5h2.25m-2.25 6h2.25" />
  </svg>
);

export const CsvToXlsxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h6v15H3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5v15M3 9h6m-6 6h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12h3m0 0l-1.5 1.5M13.5 12l-1.5-1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 3.75h6v16.5h-6zM15 9h6m-6 6h6m-3-12v16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12.75l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5V9" />
  </svg>
);

export const XlsxToCsvIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3.75h6v16.5H3zM3 9h6m-6 6h6m-3-12v16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12.75l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5V9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12h3m0 0l1.5 1.5m-1.5-1.5l1.5-1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 4.5h6v15h-6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 4.5v15m-2.25-10.5h2.25m-2.25 6h2.25" />
  </svg>
);

export const Base64ToImageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h4.5v15H3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12h3m0 0l-1.5 1.5m1.5-1.5l-1.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 3.75h6v16.5h-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 14.25l-1.5-1.5-1.5 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
);

export const RecipeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);


export const KeywordDensityIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-1" />
    </svg>
);

export const ReadabilityIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4 4-2-2" />
    </svg>
);

export const LoanCalculatorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const TimeZoneConverterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75c-4.29 0-7.85 3.33-8.625 7.5h17.25C19.85 7.08 16.29 3.75 12 3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 19.5L19 16.5m0 0L16 13.5M19 16.5H5" />
    </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311V21m-3.75-2.311V21m0 0a2.25 2.25 0 01-2.25-2.25m2.25-2.25a2.25 2.25 0 00-2.25-2.25M15 5.25l-3 3m0 0l-3-3m3 3V1.5M9 5.25l3 3m0 0l3-3" />
    </svg>
);

// CSS Tool Icons
export const GradientIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l3-3 3 3" />
    </svg>
);

export const BorderRadiusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18V3H3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l6 6m12-6l-6 6" />
    </svg>
);

export const TextShadowIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l6 6m12-6l-6 6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18V3H3z" fill="currentColor" fillOpacity="0.2" />
    </svg>
);

export const GlassmorphismIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...iconProps} {...(className && { className })}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18V3H3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l6 6m0-6l-6 6" />
    </svg>
);