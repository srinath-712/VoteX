import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { Zap } from 'lucide-react';

const Navbar = () => {
  const { language, setLanguage, supportedLanguages } = useLanguage();

  return (
    <header className="sticky top-0 z-50 glass border-b border-black/[0.06] shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-glow">
              <Zap className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <span className="text-sm font-bold tracking-tight text-gray-900">VoteX</span>
            <span className="hidden sm:inline-flex badge bg-indigo-50 text-indigo-600 border border-indigo-100 ml-1">India</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none text-xs font-medium text-gray-600 bg-gray-100/80 hover:bg-gray-200/70 border-0 rounded-lg px-3 py-1.5 cursor-pointer transition-colors focus:ring-2 focus:ring-primary/30 focus:outline-none"
              aria-label="Language Switcher"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
