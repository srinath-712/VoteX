import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';

const Navbar = () => {
  const { language, setLanguage, supportedLanguages } = useLanguage();
  
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">VoteX</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-sm text-gray-600">
              {getTranslation('app.appName', language) || 'VoteX'}
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-btn focus:ring-primary focus:border-primary block p-2"
              aria-label="Language Switcher"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
