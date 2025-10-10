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

export interface ToolDetails {
  introduction: string;
  howToUse: string[];
  features: string[];
  privacy: string;
  explanation: string;
  usageExamples: string[];
  underlyingConcept: string;
  faqs: { question: string; answer: string }[];
  tip?: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  component: React.FC<ToolProps>;
  category: ToolCategory;
  details: ToolDetails;
  featured?: boolean;
  keywords?: string[];
}

export interface ToolProps {
  details: ToolDetails;
  toolId?: string;
}