'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import figlet from 'figlet';

// List of popular fonts available on cdnjs/figlet
const FONTS = [
  '3-D',
  '3x5',
  '5lineoblique',
  'Acrobatic',
  'Alligator',
  'Alligator2',
  'Alphabet',
  'Avatar',
  'Banner',
  'Banner3-D',
  'Banner3',
  'Banner4',
  'Barbwire',
  'Basic',
  'Bell',
  'Big',
  'Bigfig',
  'Bolger',
  'Braced',
  'Bright',
  'Broadway',
  'Bubble',
  'Bulbhead',
  'Caligraphy',
  'Catwalk',
  'Chunky',
  'Coinstak',
  'Colossal',
  'Computer',
  'Contessa',
  'Contrast',
  'Cosmike',
  'Crawford',
  'Crazy',
  'Cricket',
  'Cursive',
  'Cyberlarge',
  'Cybermedium',
  'Cybersmall',
  'Diamond',
  'Digital',
  'Doh',
  'Doom',
  'Dot Matrix',
  'Double',
  'Dr Pepper',
  'Efti Font',
  'Efti Italic',
  'Efti Pifi',
  'Efti Robot',
  'Efti Wall',
  'Efti Water',
  'Epic',
  'Fender',
  'FourTops',
  'Fuzzy',
  'Goofy',
  'Gothic',
  'Graffiti',
  'Hollywood',
  'Invita',
  'Isometric1',
  'Isometric2',
  'Isometric3',
  'Isometric4',
  'Italic',
  'Ivory',
  'Jacky',
  'Jazmine',
  'Jerusalem',
  'Katakana',
  'Kban',
  'Larry 3D',
  'LCD',
  'Lean',
  'Letters',
  'Linux',
  'Lockergnome',
  'Madrid',
  'Marquee',
  'Maxfour',
  'Mike',
  'Mini',
  'Mirror',
  'Mnemonic',
  'Morse',
  'Moscow',
  'Nancyj-Fancy',
  'Nancyj-Underlined',
  'Nancyj',
  'Nipples',
  'O8',
  'Ogre',
  'Pawp',
  'Peaks',
  'Pebbles',
  'Pepper',
  'Poison',
  'Puffy',
  'Puzzle',
  'Pyramid',
  'Rammstein',
  'Rectangles',
  'Red Phoenix',
  'Relief',
  'Relief2',
  'Reverse',
  'Roman',
  'Rot13',
  'Rotated',
  'Rounded',
  'Rowan Cap',
  'Rozzo',
  'Runic',
  'Runyc',
  'S Blood',
  'SL Script',
  'Santa Clara',
  'Script',
  'Serifcap',
  'Shadow',
  'Shimrod',
  'Short',
  'Slant',
  'Slide',
  'Small',
  'Small Caps',
  'Small Isometric1',
  'Small Keyboard',
  'Small Poison',
  'Small Script',
  'Small Shadow',
  'Small Slant',
  'Small Tengwar',
  'Soft',
  'Speed',
  'Spliff',
  'Stacey',
  'Stampate',
  'Stampatello',
  'Standard',
  'Star Wars',
  'Stellar',
  'Stforek',
  'Stop',
  'Straight',
  'Sub-Zero',
  'Swamp Land',
  'Swan',
  'Sweet',
  'Tanja',
  'Tengwar',
  'Term',
  'Test1',
  'Thick',
  'Thin',
  'Thorned',
  'Three Point',
  'Ticks',
  'Ticksslant',
  'Tiles',
  'Tinker-Toy',
  'Tombstone',
  'Train',
  'Trek',
  'Tsalagi',
  'Tubular',
  'Twisted',
  'Two Point',
  'Univers',
  'USA Flag',
  'Varsity',
  'Wavy',
  'Weird',
  'Wet Letter',
  'Whimsy',
  'Wow',
];

const AsciiArt: React.FC<ToolProps> = ({ details, toolId }) => {
  const [text, setText] = useState('Type Something');
  const [font, setFont] = useState('Graffiti');
  const [horizontalLayout, setHorizontalLayout] = useState<
    'default' | 'full' | 'fitted' | 'controlled smushing' | 'universal smushing'
  >('default');
  const [verticalLayout, setVerticalLayout] = useState<
    'default' | 'full' | 'fitted' | 'controlled smushing' | 'universal smushing'
  >('default');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize figlet with CDN font path
    figlet.defaults({
      fontPath: 'https://cdnjs.cloudflare.com/ajax/libs/figlet/1.7.0/fonts',
    });
  }, []);

  const generateArt = useCallback(() => {
    if (!text) {
      setOutput('');
      return;
    }

    setLoading(true);
    setError('');

    figlet.text(
      text,
      {
        font: font as any,
        horizontalLayout: horizontalLayout,
        verticalLayout: verticalLayout,
        width: 120, // Increased width
        whitespaceBreak: true,
      },
      (err: any, data: any) => {
        setLoading(false);
        if (err) {
          console.error('Something went wrong...', err);
          setError(
            'Failed to load font or generate art. Please try a different font.',
          );
          return;
        }
        setOutput(data);
      },
    );
  }, [text, font, horizontalLayout, verticalLayout]);

  // Debounce generation to avoid too many requests while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      generateArt();
    }, 500);

    return () => clearTimeout(timer);
  }, [generateArt]);

  return (
    <ToolContainer
      title="ASCII Art Generator"
      details={details}
      toolId={toolId}
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Text
              </label>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="brand-input"
                placeholder="Type something..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Font
                </label>
                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 text-sm"
                >
                  {FONTS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  H. Layout
                </label>
                <select
                  value={horizontalLayout}
                  onChange={(e) => setHorizontalLayout(e.target.value as any)}
                  className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 text-sm"
                >
                  <option value="default">Default</option>
                  <option value="full">Full</option>
                  <option value="fitted">Fitted</option>
                  <option value="controlled smushing">
                    Controlled Smushing
                  </option>
                  <option value="universal smushing">Universal Smushing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  V. Layout
                </label>
                <select
                  value={verticalLayout}
                  onChange={(e) => setVerticalLayout(e.target.value as any)}
                  className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 text-sm"
                >
                  <option value="default">Default</option>
                  <option value="full">Full</option>
                  <option value="fitted">Fitted</option>
                  <option value="controlled smushing">
                    Controlled Smushing
                  </option>
                  <option value="universal smushing">Universal Smushing</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <button
              onClick={generateArt}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Regenerate'}
            </button>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Output
          </label>
          <div className="relative w-full bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            {/* Terminal Controls */}
            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-xs text-gray-400 font-mono">
                bash — {font}
              </div>
            </div>

            <pre className="p-4 text-green-400 font-mono overflow-x-auto text-sm md:text-base leading-tight min-h-[200px] w-full">
              {loading
                ? 'Loading font and generating...'
                : error || output || ' '}
            </pre>

            {output && !loading && !error && (
              <CopyButton
                textToCopy={output}
                className="absolute top-12 right-4 bg-gray-800 hover:bg-gray-700 text-gray-300"
              />
            )}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};

export default AsciiArt;
