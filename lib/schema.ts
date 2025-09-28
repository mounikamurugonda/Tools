import { TOOLS } from '@/constants';
import { TIPS } from '@/lib/tips';

// Base website schema
export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "UtilToolkits",
  "description": "Your free online developer toolbox with 30+ browser-based utilities for developers, designers, and productivity enthusiasts.",
  "url": "https://utiltoolkits.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://utiltoolkits.com/tools?search={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "sameAs": [
    "https://github.com/utiltoolkits",
    "https://twitter.com/utiltoolkits"
  ]
});

// Organization schema
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "UtilToolkits",
  "description": "A comprehensive collection of free, browser-based developer tools and utilities.",
  "url": "https://utiltoolkits.com",
  "logo": "https://utiltoolkits.com/logo.png",
  "foundingDate": "2024",
  "sameAs": [
    "https://github.com/utiltoolkits",
    "https://twitter.com/utiltoolkits"
  ]
});

// Homepage schema
export const getHomepageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "UtilToolkits - Your Free Online Developer Toolbox",
  "description": "A comprehensive collection of free, browser-based utilities for developers. All tools run locally for maximum speed and privacy.",
  "url": "https://utiltoolkits.com",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Developer Tools Collection",
    "description": "Free browser-based utilities for developers and designers",
    "numberOfItems": TOOLS.length,
    "itemListElement": TOOLS.slice(0, 10).map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.description,
        "url": `https://utiltoolkits.com/tools/${tool.id}`,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web Browser"
      }
    }))
  }
});

// Tips page schema
export const getTipsPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Helpful Tips & Tricks",
  "description": "A collection of tips and tricks for productivity, coding, design, and more to help you work smarter.",
  "url": "https://utiltoolkits.com/tips",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Productivity Tips Collection",
    "description": "Expert tips and tricks for developers and designers",
    "numberOfItems": TIPS.length,
    "itemListElement": TIPS.map((tip, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "HowTo",
        "name": tip.content,
        "description": tip.content,
        "category": tip.category
      }
    }))
  }
});

// Tools page schema
export const getToolsPageSchema = (searchQuery?: string) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": searchQuery ? `Search Results for "${searchQuery}"` : "All Tools",
  "description": searchQuery 
    ? `Find tools matching "${searchQuery}"` 
    : "Discover and use our collection of utility tools to boost your productivity.",
  "url": searchQuery ? `https://utiltoolkits.com/tools?search=${encodeURIComponent(searchQuery)}` : "https://utiltoolkits.com/tools",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Developer Tools",
    "description": "Free browser-based utilities for developers",
    "numberOfItems": TOOLS.length
  }
});

// Category page schema
export const getCategoryPageSchema = (category: string, tools: any[]) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": `${category} Tools`,
  "description": `A collection of ${category} tools to streamline your workflow.`,
  "url": `https://utiltoolkits.com/tools/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
  "mainEntity": {
    "@type": "ItemList",
    "name": `${category} Tools Collection`,
    "description": `Professional ${category} tools for developers and designers`,
    "numberOfItems": tools.length,
    "itemListElement": tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.description,
        "url": `https://utiltoolkits.com/tools/${tool.id}`,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web Browser"
      }
    }))
  }
});

// Individual tool schema
export const getToolSchema = (tool: any) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": tool.name,
  "description": tool.description,
  "url": `https://utiltoolkits.com/tools/${tool.id}`,
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "UtilToolkits"
  },
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split('T')[0]
});

// Breadcrumb schema
export const getBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// FAQ schema
export const getFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
