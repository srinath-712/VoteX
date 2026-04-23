import { appTranslations } from './app.translations';
import { pollingTranslations } from './polling.translations';
// We will import and merge other translations here as they are created

export const translations = {
  app: appTranslations,
  polling: pollingTranslations,
};

// Helper function to easily get a localized string,
// e.g. t('app.nav.journey', 'en') -> "Journey"
export const getTranslation = (path, lang = 'en', vars = {}) => {
  const parts = path.split('.');
  let current = translations;
  for (const part of parts) {
    if (current && current[part]) {
      current = current[part];
    } else {
      return path; // fallback
    }
  }

  // Get language specific or fallback to en
  let text = current[lang] || current['en'] || path;

  // Simple string interpolation if it's an object instead of string handle it
  if (typeof text === 'string') {
      for (const [key, value] of Object.entries(vars)) {
        text = text.replace(new RegExp(`{${key}}`, 'g'), value);
      }
      return text;
  }
  
  return text; // likely an object or array, handle correctly in component
};
