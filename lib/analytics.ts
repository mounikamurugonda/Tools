// Google Analytics utility functions

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-1FR50BJ792', {
      page_path: url,
    });
  }
};

// Track search events
export const trackSearch = (searchQuery: string, resultsCount: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchQuery,
      results_count: resultsCount,
    });
  }
};

// Track tool usage
export const trackToolUsage = (toolName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tool_used', {
      tool_name: toolName,
    });
  }
};

// Track category views
export const trackCategoryView = (categoryName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'category_view', {
      category_name: categoryName,
    });
  }
};

// Track tip views
export const trackTipView = (tipTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tip_view', {
      tip_title: tipTitle,
    });
  }
};

// ==================== CodeCast Analytics ====================

// Track CodeCast page visits
export const trackCodeCastVisit = (page: 'landing' | 'animate' | 'type' | 'image') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'codecast_visit', {
      event_category: 'CodeCast',
      event_label: page,
      page_type: page,
    });
  }
};

// Track video recordings
export const trackCodeCastRecording = (duration?: number, aspectRatio?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'codecast_recording_started', {
      event_category: 'CodeCast',
      event_label: 'Recording',
      recording_duration: duration,
      aspect_ratio: aspectRatio,
    });
  }
};

// Track video downloads
export const trackCodeCastDownload = (format: 'webm' | 'mp4', duration?: number, userId?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'codecast_download', {
      event_category: 'CodeCast',
      event_label: 'Download',
      video_format: format,
      video_duration: duration,
      user_id: userId,
    });
  }
};

// Track animation playback
export const trackCodeCastAnimation = (action: 'play' | 'pause' | 'stop' | 'complete', speed?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'codecast_animation', {
      event_category: 'CodeCast',
      event_label: 'Animation',
      animation_action: action,
      animation_speed: speed,
    });
  }
};

// Track sidebar interactions
export const trackCodeCastSidebar = (action: 'open' | 'close' | 'tab_change', tabName?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'codecast_sidebar', {
      event_category: 'CodeCast',
      event_label: 'Sidebar',
      sidebar_action: action,
      tab_name: tabName,
    });
  }
};

// Track theme changes
export const trackCodeCastTheme = (theme: 'light' | 'dark' | string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'codecast_theme_change', {
      event_category: 'CodeCast',
      event_label: 'Theme',
      selected_theme: theme,
    });
  }
};

// Track layout/aspect ratio changes
export const trackCodeCastLayout = (aspectRatio: string, watermarkEnabled?: boolean) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'codecast_layout_change', {
      event_category: 'CodeCast',
      event_label: 'Layout',
      aspect_ratio: aspectRatio,
      watermark_enabled: watermarkEnabled,
    });
  }
};

// Track code language selection
export const trackCodeCastLanguage = (language: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'codecast_language_select', {
      event_category: 'CodeCast',
      event_label: 'Language',
      code_language: language,
    });
  }
};

// Track recording completion
export const trackCodeCastRecordingComplete = (duration: number, aspectRatio: string, fileSize?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'codecast_recording_complete', {
      event_category: 'CodeCast',
      event_label: 'Recording Complete',
      recording_duration: duration,
      aspect_ratio: aspectRatio,
      file_size_mb: fileSize ? (fileSize / (1024 * 1024)).toFixed(2) : undefined,
    });
  }
};
