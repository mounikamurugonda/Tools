
// @ts-ignore
import * as prettier from 'prettier/standalone';
// @ts-ignore
import parserHtml from 'prettier/plugins/html';
// @ts-ignore
import parserPostcss from 'prettier/plugins/postcss';
// @ts-ignore
import parserBabel from 'prettier/plugins/babel';
// @ts-ignore
import parserEstree from 'prettier/plugins/estree';

export const formatCode = async (code: string, language: 'html' | 'css' | 'js') => {
  try {
    let parser = 'babel';

    // Ensure we are using the plugin objects correctly (handling default exports if necessary)
    // esm.sh imports often work as default, but sometimes named. 
    // We put them in an array which Prettier iterates over to find parsers.
    const plugins = [
      (parserBabel as any).default || parserBabel,
      (parserEstree as any).default || parserEstree,
      (parserHtml as any).default || parserHtml,
      (parserPostcss as any).default || parserPostcss
    ];

    if (language === 'html') {
      parser = 'html';
    } else if (language === 'css') {
      parser = 'css';
    }

    const formatted = await prettier.format(code, {
      parser,
      plugins,
      printWidth: 60, // Keep it narrow for the sidebar
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
    });

    return formatted.trim();
  } catch (e) {
    console.error(`Auto-formatting failed for ${language}:`, e);
    return code;
  }
};
