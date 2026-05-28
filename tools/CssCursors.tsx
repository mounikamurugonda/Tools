'use client';

import React, { useState } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import { useToast } from '@/components/ui/ToastProvider';
import {
  MousePointer2,
  Hand,
  Type,
  Move,
  HelpCircle,
  Ban,
  Crosshair,
  ZoomIn,
  ZoomOut,
  Loader2,
  Copy,
  MoveHorizontal,
  MoveVertical,
  MoveDiagonal,
  MoveDiagonal2,
  Grab,
  AlertCircle,
  Menu,
  ArrowBigUp,
  XCircle,
  MousePointerClick
} from 'lucide-react';

// Cursor Categories with Icon Mappings
const CURSOR_CATEGORIES = [
  {
    title: 'General & Actions',
    items: [
      { name: 'default', icon: MousePointer2, description: 'Standard arrow' },
      { name: 'pointer', icon: Hand, description: 'Link selection' },
      { name: 'context-menu', icon: Menu, description: 'Context menu available' },
      { name: 'help', icon: HelpCircle, description: 'Help information' },
      { name: 'wait', icon: Loader2, description: 'Program is busy' },
      { name: 'progress', icon: Loader2, description: 'Processing in background' },
      { name: 'none', icon: Ban, description: 'No cursor' },
    ]
  },
  {
    title: 'Selection & Input',
    items: [
      { name: 'text', icon: Type, description: 'Text selection' },
      { name: 'vertical-text', icon: Type, description: 'Vertical text selection' },
      { name: 'cell', icon: MousePointerClick, description: 'Cell selection (Excel)' },
      { name: 'crosshair', icon: Crosshair, description: 'Precise selection' },
    ]
  },
  {
    title: 'Drag & Drop',
    items: [
      { name: 'grab', icon: Hand, description: 'Something can be grabbed' },
      { name: 'grabbing', icon: Grab, description: 'Something is being grabbed' },
      { name: 'move', icon: Move, description: 'Move content' },
      { name: 'copy', icon: Copy, description: 'Copy content' },
      { name: 'alias', icon: ArrowBigUp, description: 'Create link/shortcut' },
      { name: 'no-drop', icon: XCircle, description: 'Dropping not allowed' },
      { name: 'not-allowed', icon: Ban, description: 'Action not allowed' },
    ]
  },
  {
    title: 'Resizing',
    items: [
      { name: 'col-resize', icon: MoveHorizontal, description: 'Resize horizontally' },
      { name: 'row-resize', icon: MoveVertical, description: 'Resize vertically' },
      { name: 'n-resize', icon: MoveVertical, description: 'Resize North' },
      { name: 'e-resize', icon: MoveHorizontal, description: 'Resize East' },
      { name: 's-resize', icon: MoveVertical, description: 'Resize South' },
      { name: 'w-resize', icon: MoveHorizontal, description: 'Resize West' },
      { name: 'ne-resize', icon: MoveDiagonal, description: 'Resize North-East' },
      { name: 'nw-resize', icon: MoveDiagonal2, description: 'Resize North-West' },
      { name: 'se-resize', icon: MoveDiagonal2, description: 'Resize South-East' },
      { name: 'sw-resize', icon: MoveDiagonal, description: 'Resize South-West' },
      { name: 'ns-resize', icon: MoveVertical, description: 'Resize North-South' },
      { name: 'ew-resize', icon: MoveHorizontal, description: 'Resize East-West' },
      { name: 'nwse-resize', icon: MoveDiagonal2, description: 'Resize NW-SE' },
      { name: 'nesw-resize', icon: MoveDiagonal, description: 'Resize NE-SW' },
      { name: 'all-scroll', icon: Move, description: 'Scroll in any direction' },
    ]
  },
  {
    title: 'Zooming',
    items: [
      { name: 'zoom-in', icon: ZoomIn, description: 'Zoom in' },
      { name: 'zoom-out', icon: ZoomOut, description: 'Zoom out' },
    ]
  }
];

const CssCursors: React.FC<ToolProps> = ({ details, toolId }) => {
  const toast = useToast();
  const [selectedCursor, setSelectedCursor] = useState(CURSOR_CATEGORIES[0].items[0]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`cursor: ${selectedCursor.name};`);
      toast.success('Copied CSS');
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <ToolContainer title="CSS Cursor Viewer" details={details} toolId={toolId}>
      <div className="grid lg:grid-cols-2 gap-8 items-start">

        {/* Left Side: Selection */}
        <div className="space-y-8">


          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {CURSOR_CATEGORIES.map((category) => (
              <div key={category.title}>
                <Label className="mb-3 block text-gray-500 uppercase tracking-wider text-xs font-bold">{category.title}</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedCursor.name === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setSelectedCursor(item)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${isSelected
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                      >
                        <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
                        <span className="text-xs font-mono font-medium">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Preview & Code */}
        <div className="space-y-6 sticky top-6">
          <div className="space-y-2">
            <Label>Interactive Preview</Label>
            <div
              className="h-[300px] w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center relative overflow-hidden group transition-colors hover:bg-white dark:hover:bg-gray-800"
              style={{ cursor: selectedCursor.name }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Visual Icon Representation (Big) */}
              <div className={`p-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4 transition-transform group-hover:scale-110 duration-300`}>
                <selectedCursor.icon className="w-12 h-12" />
              </div>

              <div className="text-center z-10 px-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-mono mb-1">{selectedCursor.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedCursor.description}</p>
              </div>

              <div className="absolute bottom-4 text-xs text-gray-400 animate-pulse hidden md:block">
                Hover here to test
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>CSS Output</Label>
              <Button size="sm" variant="ghost" onClick={copyToClipboard} className="h-6 text-xs text-blue-600 hover:bg-blue-50 px-2">
                <Copy className="w-3 h-3 mr-1.5" /> Copy Code
              </Button>
            </div>
            <div className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <pre className="p-4 text-gray-800 dark:text-gray-200 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
                <code>cursor: {selectedCursor.name};</code>
              </pre>
            </div>
          </div>
        </div>

      </div>
    </ToolContainer>
  );
};

export default CssCursors;
