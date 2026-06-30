
export const defineGlassThemes = (monaco: any) => {
    // Dark Liquid Glass Theme (Whiter & Brighter Mix)
    monaco.editor.defineTheme('glass-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: 'd4d4d4', fontStyle: 'italic' }, // Very light grey
            { token: 'keyword', foreground: 'ff9ce6', fontStyle: 'bold' },    // Lighter Pink
            { token: 'string', foreground: 'ffffd4' },      // Lighter Yellow
            { token: 'number', foreground: 'ffe0b2' },      // Lighter Orange
            { token: 'regexp', foreground: 'ffb3b3' },      // Lighter Red
            { token: 'type', foreground: 'ccf5ff' },        // Lighter Cyan
            { token: 'class', foreground: 'ccf5ff' },       // Lighter Cyan
            { token: 'function', foreground: '99ffbb' },    // Lighter Green
            { token: 'variable', foreground: 'ffffff' },    // Pure White
            { token: 'operator', foreground: 'ff9ce6' },    // Lighter Pink
            { token: 'identifier', foreground: 'ffffff' },  // Pure White
            { token: 'tag', foreground: 'ff9ce6' },         // Lighter Pink
            { token: 'attribute.name', foreground: '99ffbb' }, // Lighter Green
            { token: 'attribute.value', foreground: 'ffffd4' }, // Lighter Yellow
            { token: 'delimiter', foreground: 'ffffff' },   // Pure White
            { token: 'delimiter.html', foreground: 'ffffff' }, // Pure White for brackets
        ],
        colors: {
            'editor.background': '#00000000',
            'editor.foreground': '#ffffff',
            'editorCursor.foreground': '#ff9ce6',
            'editor.selectionBackground': '#ffffff30',
            'editor.lineHighlightBackground': '#ffffff10',
            'editor.lineHighlightBorder': '#00000000', // No blue border
            'editorLineNumber.foreground': '#d4d4d4',
            'editorIndentGuide.background': '#ffffff20',
            'editorIndentGuide.activeBackground': '#ffffff50',
            'minimap.background': '#00000000',
            'scrollbarSlider.background': '#ffffff20',
            'scrollbarSlider.hoverBackground': '#ffffff30',
            'scrollbarSlider.activeBackground': '#ffffff40',
        }
    });

    // Light Liquid Glass Theme (Refined for Warmth)
    monaco.editor.defineTheme('glass-light', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '6a737d', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'd73a49', fontStyle: 'bold' },
            { token: 'string', foreground: '032f62' },
            { token: 'number', foreground: 'e36209' }, // Orange for numbers
            { token: 'regexp', foreground: 'd73a49' },
            { token: 'type', foreground: '6f42c1' },
            { token: 'class', foreground: '6f42c1' },
            { token: 'function', foreground: '005cc5' },
            { token: 'variable', foreground: '424a53' }, // Charcoal instead of black
            { token: 'operator', foreground: 'd73a49' },
            { token: 'identifier', foreground: '424a53' }, // Charcoal
            { token: 'tag', foreground: '22863a' },
            { token: 'attribute.name', foreground: '6f42c1' },
            { token: 'attribute.value', foreground: '032f62' },
            { token: 'delimiter', foreground: '424a53' }, // Charcoal
            { token: 'delimiter.html', foreground: '8b949e' }, // Lighter Grey for brackets
        ],
        colors: {
            'editor.background': '#00000000',
            'editor.foreground': '#424a53', // Charcoal base text
            'editorCursor.foreground': '#d73a49',
            'editor.selectionBackground': '#0366d615',
            'editor.lineHighlightBackground': '#00000003',
            'editor.lineHighlightBorder': '#00000000', // No blue border
            'editorLineNumber.foreground': '#959da5',
            'editorIndentGuide.background': '#d1d5da',
            'editorIndentGuide.activeBackground': '#959da5',
            'minimap.background': '#00000000',
            'scrollbarSlider.background': '#00000005',
            'scrollbarSlider.hoverBackground': '#00000010',
            'scrollbarSlider.activeBackground': '#00000020',
        }
    });
};

export const getGlassEditorStyles = (isLight: boolean) => `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&display=swap');
    .monaco-editor, .monaco-editor-background, .monaco-editor .inputarea.ime-input {
        background-color: transparent !important;
    }
    .monaco-editor .margin {
        background-color: transparent !important;
    }
    .monaco-editor .view-lines {
        text-shadow: ${isLight ? '0 1px 0 rgba(255,255,255,0.4)' : '0 1px 2px rgba(0,0,0,0.3)'};
        font-family: 'Fredoka', sans-serif !important;
        font-weight: 400 !important;
        letter-spacing: 0.02em;
    }
    .monaco-editor .token {
        font-weight: 400 !important;
    }
`;

export const glassContainerStyles = "backdrop-blur-[6px] bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_0_0_1px_rgba(255,255,255,0.1),0_8px_32px_0_rgba(0,0,0,0.2)] ring-1 ring-white/10";
