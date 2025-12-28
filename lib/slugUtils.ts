import { CATEGORY_URL_MAP } from '@/constants';
import { ToolCategory } from '@/types';

export function getCategorySlug(categoryName: string): string {
  // Find if categoryName matches any ToolCategory value
  // The ToolCategory enum values are the strings we use in blogs (e.g., "Coding Tools")
  const categoryEnum = Object.values(ToolCategory).find(val => val === categoryName);

  if (categoryEnum && CATEGORY_URL_MAP[categoryEnum]) {
    return CATEGORY_URL_MAP[categoryEnum];
  }

  // Fallback slugification
  return categoryName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
