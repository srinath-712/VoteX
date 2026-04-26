import React, { useState, useEffect } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import ChecklistItem from './ChecklistItem';
import { ChevronDown, Share2, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'voteasy_checklist';

const BEFORE_KEYS = [
  'checkRegistration', 'findBooth', 'understandEVM', 
  'researchCandidates', 'prepareID', 'reviewManifestos'
];

const DAY_KEYS = [
  'carryID', 'leavePhone', 'verifySlip', 
  'getInk', 'dontWearPartyColors', 'helpElderly'
];

const ALL_KEYS = [...BEFORE_KEYS, ...DAY_KEYS];

const Checklist = () => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch { /* ignore */ }
    
    return ALL_KEYS.reduce((acc, key) => { acc[key] = false; return acc; }, {});
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
  }, [checkedItems]);

  const handleToggle = (key) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleShare = async () => {
    const text = getTranslation('checklist.hero.shareText', language);
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'VoteX Checklist',
          text: text,
          url: window.location.origin
        });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      // User cancelled share or clipboard not available — no action needed
    }
  };

  // derived state
  const totalItems = ALL_KEYS.length;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);
  const strokeDashoffset = 126 - (126 * progressPercent) / 100; // 126 is approx 2 * pi * r for r=20
  const isAllDone = completedCount === totalItems;

  const renderGroup = (keys, groupTitleKey, accordionValue) => {
    const sorted = [...keys].sort((a, b) => {
      // unchecked first, checked last
      return (checkedItems[a] === checkedItems[b]) ? 0 : checkedItems[a] ? 1 : -1;
    });

    const title = getTranslation(groupTitleKey, language);

    return (
      <Accordion.Item value={accordionValue} className="surface-elevated rounded-2xl overflow-hidden">
        <Accordion.Header className="flex">
          <Accordion.Trigger className="flex flex-1 items-center justify-between px-5 py-4 bg-white/60 hover:bg-white/90 transition-colors cursor-pointer group">
            <h3 className="text-sm font-bold text-gray-800 tracking-tight">{title}</h3>
            <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-300 group-data-[state=open]:rotate-180" aria-hidden="true" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="px-4 pt-2 pb-3">
            {sorted.map(key => (
              <ChecklistItem
                key={key}
                itemKey={key}
                isChecked={checkedItems[key]}
                onToggle={() => handleToggle(key)}
              />
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    );
  };

  const t = (key) => getTranslation(`checklist.hero.${key}`, language);

  return (
    <div className="max-w-2xl mx-auto">
      
      {/* Progress header — premium stats card */}
      <div className="mb-8 animate-fade-up">
        <div className="surface-elevated rounded-2xl overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gray-100 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">{t('title')}</h1>
              <p className="text-sm text-gray-500">{t('subtitle')}</p>
            </div>
            
            {/* Ring + counter */}
            <div className="relative w-[72px] h-[72px] shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" className="stroke-current text-gray-100" strokeWidth="5" fill="none" />
                <circle
                  cx="24" cy="24" r="20"
                  className="stroke-current text-primary transition-all duration-1000 ease-out"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="125.66"
                  strokeDashoffset={125.66 - (125.66 * progressPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-base font-bold text-gray-900 leading-none">{completedCount}</span>
                <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide leading-none mt-0.5">of {totalItems}</span>
              </div>
            </div>
          </div>
        </div>

        {isAllDone && (
          <div className="mt-4 rounded-2xl p-5 flex items-center gap-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100/80 shadow-[0_4px_20px_rgba(16,185,129,0.1)] animate-fade-up">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-[0_4px_14px_rgba(16,185,129,0.4)] shrink-0">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-emerald-900 text-sm">{t('readyToVote')}</p>
              <p className="text-xs text-emerald-700 mt-0.5">You've completed all pre-election tasks 🗳️</p>
            </div>
            <button
              onClick={handleShare}
              className="btn-primary !py-2 !px-3.5 !text-xs gap-1.5 shrink-0"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? t('shareCopied') : t('shareBtn')}
            </button>
          </div>
        )}
      </div>

      {/* Accordion groups */}
      <Accordion.Root type="multiple" defaultValue={['before', 'day']} className="w-full space-y-3">
        {renderGroup(BEFORE_KEYS, 'checklist.groups.beforeElection', 'before')}
        {renderGroup(DAY_KEYS, 'checklist.groups.onElectionDay', 'day')}
      </Accordion.Root>

    </div>
  );
};

export default Checklist;
