'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import CopyButton from '@/components/CopyButton';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
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
        <Card title="Settings">
          <div className="space-y-6">
            <div>
              <Label>Text</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something..."
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label>Font</Label>
                <Select
                  value={{ value: font, label: font }}
                  onChange={(option) => setFont(option?.value || 'Graffiti')}
                  options={FONTS.map(f => ({ value: f, label: f }))}
                />
              </div>
              <div>
                <Label>H. Layout</Label>
                <Select
                  value={{ value: horizontalLayout, label: horizontalLayout.charAt(0).toUpperCase() + horizontalLayout.slice(1) }}
                  onChange={(option) => setHorizontalLayout(option?.value as any)}
                  options={[
                    { value: 'default', label: 'Default' },
                    { value: 'full', label: 'Full' },
                    { value: 'fitted', label: 'Fitted' },
                    { value: 'controlled smushing', label: 'Controlled Smushing' },
                    { value: 'universal smushing', label: 'Universal Smushing' }
                  ]}
                />
              </div>
              <div>
                <Label>V. Layout</Label>
                <Select
                  value={{ value: verticalLayout, label: verticalLayout.charAt(0).toUpperCase() + verticalLayout.slice(1) }}
                  onChange={(option) => setVerticalLayout(option?.value as any)}
                  options={[
                    { value: 'default', label: 'Default' },
                    { value: 'full', label: 'Full' },
                    { value: 'fitted', label: 'Fitted' },
                    { value: 'controlled smushing', label: 'Controlled Smushing' },
                    { value: 'universal smushing', label: 'Universal Smushing' }
                  ]}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={generateArt}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Regenerate'}
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Output">
          <div className="relative w-full bg-gray-950 dark:bg-gray-950 rounded-lg border border-gray-800 dark:border-gray-800 overflow-hidden shadow-2xl">
            {/* Terminal Controls */}
            <div className="flex items-center px-4 py-2 bg-gray-900 border-b border-gray-800">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-xs text-gray-400 font-mono">
                bash — {font}
              </div>
            </div>

            <pre className="p-4 text-green-400 font-mono overflow-x-auto text-sm md:text-base leading-tight min-h-[200px] w-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {loading
                ? 'Loading font and generating...'
                : error || output || ' '}
            </pre>

            {output && !loading && !error && (
              <div className="absolute top-12 right-4">
                <CopyButton
                  textToCopy={output}
                  className="bg-gray-800/80 hover:bg-gray-700 text-gray-300 backdrop-blur-sm"
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolContainer>
  );
};

export default AsciiArt;
