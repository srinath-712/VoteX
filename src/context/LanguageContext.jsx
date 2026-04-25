import React, { createContext, useContext, useState, useEffect } from 'react';

// Languages with complete translations. Add more here as translation files are completed.
// Full list target: hi, ta, te, bn, mr, gu, kn, ml, or, pa
const supportedLanguages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  // Translations coming soon:
  // { code: 'ta', label: 'Tamil' },
  // { code: 'te', label: 'Telugu' },
  // { code: 'bn', label: 'Bengali' },
  // { code: 'mr', label: 'Marathi' },
  // { code: 'gu', label: 'Gujarati' },
  // { code: 'kn', label: 'Kannada' },
  // { code: 'ml', label: 'Malayalam' },
  // { code: 'or', label: 'Odia' },
  // { code: 'pa', label: 'Punjabi' },
];

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('voteasy_lang');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('voteasy_lang', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, supportedLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
