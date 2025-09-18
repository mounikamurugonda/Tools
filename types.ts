import type React from 'react';

export enum ToolCategory {
  TEXT = 'Text Tools',
  IMAGE = 'Image Tools',
  CSS = 'CSS Tools',
  CODING = 'Coding Tools',
  COLOR = 'Color Tools',
  MATH = 'Math & Calculation Tools',
  PRODUCTIVITY = 'Productivity Tools',
  FUN = 'Fun & Interactive Tools',
  MISC = 'Miscellaneous Tools',
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  component: React.FC<ToolProps>;
  category: ToolCategory;
}

export interface ToolProps {
  // This interface is now empty but preserved for consistency.
}