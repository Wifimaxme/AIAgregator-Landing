
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    ym: (...args: any[]) => void;
  }
}

// Replace with your actual Yandex Metrica Counter ID
const YM_COUNTER_ID = 99999999;

export const trackEvent = (category: string, action: string, label?: string) => {
  // Log to console for debugging/development
  console.log(`📊 [Analytics] Category: ${category} | Action: ${action} | Label: ${label || 'N/A'}`);

  // Send to Google Analytics if initialized
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }

  // Send to Yandex Metrica if initialized
  if (typeof window !== 'undefined' && typeof window.ym === 'function') {
    // Construct a goal ID suitable for Yandex Metrica (e.g. "REGISTRATION_SUBMIT_SUCCESS")
    // Replace spaces with underscores and make uppercase
    const goalId = `${category}_${action}`.toUpperCase().replace(/[^A-Z0-9_]/g, '_');
    
    window.ym(YM_COUNTER_ID, 'reachGoal', goalId, {
      category,
      action,
      label
    });
  }
};
