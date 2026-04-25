import { appTranslations } from './app.translations';
import { pollingTranslations } from './polling.translations';
import { journeyTranslations } from './journey.translations';
import { checklistTranslations } from './checklist.translations';
import { guideTranslations } from './guide.translations';
import { chatTranslations } from './chat.translations';
import { timelineTranslations } from './timeline.translations';
import { simulatorTranslations } from './simulator.translations';
import { learnTranslations } from './learn.translations';

export const translations = {
  app: appTranslations,
  polling: pollingTranslations,
  journey: journeyTranslations,
  checklist: checklistTranslations,
  guide: guideTranslations,
  chat: chatTranslations,
  timeline: timelineTranslations,
  simulator: simulatorTranslations,
  learn: learnTranslations,
};

// Helper function to easily get a localized string,
// e.g. t('app.nav.journey', 'en') -> "Journey"
export const getTranslation = (path, lang = 'en', vars = {}) => {
  const parts = path.split('.');
  const namespace = parts[0];
  const rest = parts.slice(1);
  
  const nsData = translations[namespace];
  if (!nsData) return path;

  // Function to resolve path within a specific language block
  const resolvePath = (langData) => {
    let current = langData;
    for (const part of rest) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        return undefined;
      }
    }
    return current;
  };

  // Try selected language
  let text = resolvePath(nsData[lang]);

  // Fallback to English if not found
  if (text === undefined && lang !== 'en') {
    text = resolvePath(nsData['en']);
  }

  // Final fallback to the path itself
  if (text === undefined) {
    return path;
  }

  // Simple string interpolation
  if (typeof text === 'string') {
      for (const [key, value] of Object.entries(vars)) {
        text = text.replace(new RegExp(`{${key}}`, 'g'), value);
      }
      return text;
  }
  
  return text; // likely an object or array, handle correctly in component
};
