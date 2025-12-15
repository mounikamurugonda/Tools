
import React, { useRef, useEffect } from 'react';
import { AppConfig } from '../types';

interface CodeEditorProps {
  code: string;
  language: string;
  config: AppConfig;
  onChange?: (val: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, config, onChange, readOnly }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  // Auto-scroll to bottom as code updates
  useEffect(() => {
    if (textareaRef.current && preRef.current) {
      const { scrollHeight, clientHeight } = textareaRef.current;
      // Scroll if the content is taller than the container
      if (scrollHeight > clientHeight) {
        textareaRef.current.scrollTop = scrollHeight;
        preRef.current.scrollTop = scrollHeight;
      }
    }
  }, [code]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e.target.value);
  };

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Improved syntax highlighting using placeholder strategy to avoid regex collisions
  const highlightCode = (input: string) => {
    // 1. Escape HTML entities
    let code = input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const placeholders: string[] = [];
    const save = (content: string) => {
      placeholders.push(content);
      return `%%%PLACEHOLDER_${placeholders.length - 1}%%%`;
    };

    // 2. Protect Strings & Comments first
    code = code.replace(/(".*?"|'.*?'|`.*?`)|(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match, str, comment) => {
      if (comment) {
        return save(`<span class="text-[#5c6370] italic">${comment}</span>`);
      }
      if (str) {
        return save(`<span class="text-[#98c379]">${str}</span>`);
      }
      return match;
    });

    // 3. HTML Tags
    code = code.replace(/(&lt;\/?)(\w+)(.*?)(&gt;)/g, (match, start, tagName, attrs, end) => {
      const highlightedAttrs = attrs.replace(/\b([a-zA-Z-:]+)(=)/g,
        '<span class="text-[#d19a66]">$1</span>$2');
      return save(`${start}<span class="text-[#e06c75]">${tagName}</span>${highlightedAttrs}${end}`);
    });

    // 4. Keywords
    code = code.replace(/\b(const|let|var|function|return|import|export|from|class|if|else|for|while|await|async|try|catch|document|window|console)\b/g,
      (match) => save(`<span class="text-[#c678dd] font-bold">${match}</span>`));

    // 5. CSS Properties
    code = code.replace(/\b([a-z-]+)(:)/g, (match, prop, colon) => {
      return save(`<span class="text-[#56b6c2]">${prop}</span>${colon}`);
    });

    // 6. Functions
    code = code.replace(/\b(\w+)(?=\()/g, (match) => {
      return save(`<span class="text-[#61afef]">${match}</span>`);
    });

    // 7. Numbers
    code = code.replace(/\b(\d+)\b/g, (match) => {
      return save(`<span class="text-[#d19a66]">${match}</span>`);
    });

    // 8. Hex Colors
    code = code.replace(/(#[0-9a-fA-F]{3,8})\b/g, (match) => {
      return save(`<span class="text-[#d19a66]">${match}</span>`);
    });

    // Restore placeholders
    let lastCode;
    for (let i = 0; i < 5; i++) {
      if (!code.includes('%%%PLACEHOLDER_')) break;
      lastCode = code;
      code = code.replace(/%%%PLACEHOLDER_(\d+)%%%/g, (match, index) => {
        return placeholders[parseInt(index, 10)] || match;
      });
      if (code === lastCode) break;
    }

    return code;
  };

  const getThemeStyles = () => {
    switch (config.theme) {
      case 'light': return 'bg-gray-50 text-gray-800';
      case 'github': return 'bg-[#ffffff] text-[#24292e]';
      case 'dracula': return 'bg-[#282a36] text-[#f8f8f2]';
      case 'monokai': return 'bg-[#272822] text-[#f8f8f2]';
      case 'twilight': return 'bg-[#141414] text-[#f7f7f7]';
      case 'nord': return 'bg-[#2e3440] text-[#d8dee9]';
      case 'solarized-dark': return 'bg-[#002b36] text-[#839496]';
      case 'solarized-light': return 'bg-[#fdf6e3] text-[#657b83]';
      case 'synthwave': return 'bg-[#2b213a] text-[#ff7edb]';
      case 'dark': default: return 'bg-transparent text-[#abb2bf]';
    }
  };

  // Calculations for dynamic sizing
  const fontSize = config.fontSize;
  const lineHeight = Math.round(fontSize * 1.5);
  // Calculate gutter width based on font size (approx 3 chars width) or minimum 40px
  const gutterWidth = config.lineNumbers ? Math.max(40, fontSize * 3) : 0;
  const paddingLeft = config.lineNumbers ? gutterWidth + 16 : 16;

  // Cursor Element HTML
  // Uses em units for height/width to scale with font size
  const cursorHtml = config.showCursor
    ? `<span class="inline-block w-[1ch] bg-[#528bff] align-middle cursor-blink ml-[1px] shadow-[0_0_8px_rgba(82,139,255,0.6)]" style="height: 1.2em"></span>`
    : '';

  const commonClasses = `absolute inset-0 m-0 pt-4 pr-4 pb-4 leading-none`;

  // Helper to inject line numbers into HTML for wrapping support
  const injectLineNumbers = (html: string, width: number) => {
    // Style for the line number span
    // - absolute left:0 puts it in the padding area (gutter)
    // - text-right aligns numbers to the code
    const style = `position:absolute;left:0;width:${width}px;padding-right:12px;text-align:right;color:#6b7280;user-select:none;opacity:0.6;`;

    let line = 2;
    // Replace newlines with newline + line number
    // We start with line 2 because line 1 is prepended
    const content = html.replace(/\n/g, () => {
      const num = line++;
      return `\n<span class="line-number" style="${style}">${num}</span>`;
    });

    // Add first line number
    return `<span class="line-number" style="${style}">1</span>${content}`;
  };

  const highlightedCode = highlightCode(code);
  const finalHtml = config.lineNumbers
    ? injectLineNumbers(highlightedCode, gutterWidth) + cursorHtml
    : highlightedCode + cursorHtml;

  return (
    <div className={`relative w-full h-full font-mono overflow-hidden ${getThemeStyles()}`}>
      <div className="relative w-full h-full">
        {/* Highlight Layer with Cursor */}
        <pre
          ref={preRef}
          className={`${commonClasses} pointer-events-none whitespace-pre-wrap break-all overflow-hidden`}
          aria-hidden="true"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            paddingLeft: `${paddingLeft}px`
          }}
          dangerouslySetInnerHTML={{ __html: finalHtml }}
        ></pre>

        {/* Input Layer */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleInput}
          onScroll={handleScroll}
          spellCheck="false"
          readOnly={readOnly}
          className={`${commonClasses} bg-transparent text-transparent caret-white resize-none border-none outline-none whitespace-pre-wrap break-all overflow-auto z-0 ${readOnly ? 'caret-transparent' : ''}`}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            paddingLeft: `${paddingLeft}px`
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
