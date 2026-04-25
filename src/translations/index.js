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
