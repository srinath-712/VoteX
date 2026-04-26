import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Settings, Zap, ArrowLeft } from 'lucide-react';

const Navbar = ({ home }) => {
  const { language, setLanguage, supportedLanguages } = useLanguage();
  const navigate  = useNavigate();
  const location  = useLocation();

  const isHome = location.pathname === '/' || location.pathname === '';

  return (
    <header className="sticky top-0 z-50 glass border-b border-black/[0.06] shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14">

          {/* Left: Logo + optional back */}
          <div className="flex items-center gap-3">
            {!isHome && (
              <button
                onClick={() => navigate('/')}
                className="btn-ghost !p-2 !rounded-xl -ml-2 text-gray-400 hover:text-gray-700 hidden sm:flex"
                aria-label="Back to home"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 focus:outline-none group"
              aria-label="VoteX Home"
            >
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
                <Zap className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="text-sm font-bold tracking-tight text-gray-900">VoteX</span>
            </button>
            {isHome && (
              <span className="hidden sm:inline-flex badge bg-indigo-50 text-indigo-600 border border-indigo-100/80 ml-0.5 text-[10px]">
                India
              </span>
            )}
          </div>

          {/* Right: Language + Settings */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none text-xs font-semibold text-gray-600 bg-gray-100/80 hover:bg-gray-200/70 border-0 rounded-lg px-3 py-1.5 cursor-pointer transition-colors focus:ring-2 focus:ring-primary/30 focus:outline-none"
              aria-label="Language Switcher"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>

            {/* Settings icon */}
            <button
              onClick={() => navigate('/settings')}
              className={`btn-ghost !p-2 !rounded-xl relative ${location.pathname === '/settings' ? 'text-primary bg-indigo-50' : ''}`}
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
