import type React from 'react';

export enum ToolCategory {
  AI = 'AI Tools',
  TEXT = 'Text Tools',
  IMAGE = 'Image Tools',
  CSS = 'CSS Tools',
  CODING = 'Coding Tools',
  COLOR = 'Color Tools',
  MATH = 'Calculator Tools',
  PRODUCTIVITY = 'Productivity Tools',
  FUN = 'Fun Tools',
  VIDEO = 'Video Tools',
  MISC = 'Other Tools',
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
  seoTitle?: string;
  seoDescription?: string;
  icon: React.ReactNode;
  component?: React.ComponentType<ToolProps> | any;
  category: ToolCategory;
  details?: ToolDetails;
  featured?: boolean;
  keywords?: string[];
  tags?: string[];
}

export interface ToolData {
  id: string;
  name: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  category: ToolCategory;
  featured?: boolean;
  keywords?: string[];
  tags?: string[];
}

export interface ToolProps {
  details: ToolDetails;
  toolId?: string;
  tool?: ToolData;
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  content: string;
  image?: string;
  authorImage?: string;
  relatedPosts?: string[];
  relatedTools?: string[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  updatedDate?: string;
}
