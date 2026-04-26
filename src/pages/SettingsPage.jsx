import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Globe, Trash2, ChevronRight, Info, CheckCircle2,
  Shield, Zap, Database, Bell, Contrast, AlertTriangle
} from 'lucide-react';

// Language metadata with native script labels and flag emoji
const LANGUAGE_META = [
  { code: 'en', label: 'English',          native: 'English',    flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi',            native: 'हिन्दी',      flag: '🇮🇳' },
];

const SECTION_HEADING = ({ children }) => (
  <p className="px-1 mb-2 text-2xs text-gray-400 font-bold uppercase tracking-[0.14em]">{children}</p>
);

const SettingsRow = ({ icon: Icon, label, sublabel, right, onClick, danger }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
      danger
        ? 'hover:bg-red-50 focus-visible:ring-red-400'
        : 'surface-interactive'
    }`}
  >
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
      danger ? 'bg-red-50 text-red-500 group-hover:bg-red-100' : 'bg-gray-100 text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600'
    }`}>
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-1 min-w-0">
      <div className={`text-sm font-semibold ${danger ? 'text-red-600' : 'text-gray-800'}`}>{label}</div>
      {sublabel && <div className="text-xs text-gray-400 mt-0.5">{sublabel}</div>}
    </div>
    {right !== undefined ? right : (
      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 shrink-0 transition-colors" />
    )}
  </button>
);

const SettingsPage = () => {
  const { language, setLanguage, supportedLanguages } = useLanguage();
  const [resetConfirm, setResetConfirm]   = useState(false);
  const [resetDone, setResetDone]         = useState(false);
  const [textSize, setTextSize]           = useState('default');

  const handleReset = () => {
    if (!resetConfirm) { setResetConfirm(true); return; }
    // Clear all VoteX keys from localStorage
    const keys = Object.keys(localStorage).filter(k => k.startsWith('voteasy'));
    keys.forEach(k => localStorage.removeItem(k));
    setResetDone(true);
    setResetConfirm(false);
    setTimeout(() => setResetDone(false), 3000);
  };

  const currentLang = LANGUAGE_META.find(l => l.code === language) || LANGUAGE_META[0];

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your preferences and app data</p>
      </div>

      <div className="space-y-7">

        {/* ── Language ─────────────────────────────────────────────────── */}
        <div>
          <SECTION_HEADING>Language & region</SECTION_HEADING>
          <div className="surface-elevated rounded-2xl overflow-hidden divide-y divide-gray-100/80">
            <div className="px-4 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Interface Language</p>
                  <p className="text-xs text-gray-400">Currently: {currentLang.flag} {currentLang.native}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGE_META.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 focus:outline-none ${
                      language === lang.code
                        ? 'border-indigo-300 bg-indigo-50 text-indigo-700 shadow-[0_0_0_1px_rgba(99,102,241,0.2)]'
                        : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl leading-none">{lang.flag}</span>
                    <div className="text-left">
                      <div className="text-sm font-semibold leading-none">{lang.native}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{lang.label}</div>
                    </div>
                    {language === lang.code && <CheckCircle2 className="w-4 h-4 ml-auto text-indigo-500" />}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1.5 px-1">
                <Info className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <p className="text-[11px] text-gray-400">More languages (Tamil, Telugu, Bengali, and 8 more) coming soon.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <div>
          <SECTION_HEADING>Accessibility</SECTION_HEADING>
          <div className="surface-elevated rounded-2xl overflow-hidden divide-y divide-gray-100/80">
            <div className="px-4 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Contrast className="w-4 h-4 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Text Size</p>
                  <p className="text-xs text-gray-400">Applies across the interface</p>
                </div>
              </div>
              <div className="flex gap-2">
                {['small', 'default', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setTextSize(size)}
                    className={`flex-1 py-2 rounded-xl text-sm border font-medium capitalize transition-all duration-200 ${
                      textSize === size
                        ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                        : 'border-gray-100 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {size === 'small' ? 'A' : size === 'default' ? 'Aa' : 'A+'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Privacy & Data ───────────────────────────────────────────── */}
        <div>
          <SECTION_HEADING>Privacy & data</SECTION_HEADING>
          <div className="space-y-2">
            <div className="surface-elevated rounded-2xl overflow-hidden p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Database className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Local data only</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    VoteX stores your journey progress and checklist state only on your device using localStorage. No data is ever sent to any server.
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-elevated rounded-2xl overflow-hidden">
              <div className="px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${resetDone ? 'bg-emerald-50' : 'bg-red-50'}`}>
                      {resetDone
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        : <Trash2 className="w-4 h-4 text-red-500" />
                      }
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${resetDone ? 'text-emerald-700' : 'text-red-600'}`}>
                        {resetDone ? 'All data cleared' : 'Reset All Progress'}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {resetDone
                          ? 'Your journey and checklist have been reset.'
                          : resetConfirm
                          ? 'Click again to confirm — this cannot be undone.'
                          : 'Clears journey, checklist, and chat history.'}
                      </p>
                    </div>
                  </div>

                  {!resetDone && (
                    <button
                      onClick={handleReset}
                      className={`shrink-0 ml-3 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                        resetConfirm
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100'
                      }`}
                    >
                      {resetConfirm ? '⚠ Confirm' : 'Reset'}
                    </button>
                  )}
                </div>

                {resetConfirm && !resetDone && (
                  <div className="mt-3 flex items-start gap-2 px-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">This will permanently delete your progress. It cannot be undone.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── About ────────────────────────────────────────────────────── */}
        <div>
          <SECTION_HEADING>About</SECTION_HEADING>
          <div className="surface-elevated rounded-2xl overflow-hidden divide-y divide-gray-100/80">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-glow">
                  <Zap className="w-4 h-4 text-white" fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">VoteX</p>
                  <p className="text-2xs text-gray-400 font-medium uppercase tracking-wider">Version 1.0.0 · India</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                VoteX is a free, non-partisan voter education tool built for India's first-time voters. It is not affiliated with, endorsed by, or connected to the Election Commission of India. All content is for educational purposes only.
              </p>
            </div>
            <div className="px-5 py-3 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <p className="text-xs text-gray-500">
                No tracking. No ads. No political affiliation.
              </p>
            </div>
            <div className="px-5 py-3">
              <p className="text-xs text-gray-400">
                AI responses are powered by Google Gemini and may occasionally be inaccurate. Always verify critical information with official ECI sources at <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline">eci.gov.in</a>.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom safe space */}
      <div className="h-8" />
    </div>
  );
};

export default SettingsPage;
