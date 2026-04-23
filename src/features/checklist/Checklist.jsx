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
      console.log('Share failed', err);
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
      <Accordion.Item value={accordionValue} className="mb-4 bg-white border border-gray-200 rounded-card overflow-hidden shadow-sm">
        <Accordion.Header className="flex">
          <Accordion.Trigger className="flex flex-1 items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="p-4 bg-white pb-1">
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
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Progress Header */}
      <div className="bg-white rounded-card shadow-sm border border-gray-100 p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{t('title')}</h1>
          <p className="text-sm text-gray-500 max-w-[200px] m:max-w-full">{t('subtitle')}</p>
        </div>
        
        {/* SVG Progress Ring */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" className="stroke-current text-gray-100" strokeWidth="6" fill="none" />
            <circle 
              cx="24" cy="24" r="20" 
              className="stroke-current text-primary transition-all duration-1000 ease-out" 
              strokeWidth="6" 
              fill="none" 
              strokeDasharray="126" 
              strokeDashoffset={strokeDashoffset} 
              strokeLinecap="round" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-gray-900">{completedCount}/{totalItems}</span>
          </div>
        </div>
      </div>

      {isAllDone && (
        <div className="bg-green-50 border border-green-200 rounded-card p-6 flex flex-col items-center text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center mb-4 shadow-sm">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-green-900 mb-2">{t('readyToVote')}</h2>
          
          <button 
            onClick={handleShare}
            className="mt-4 flex items-center px-6 py-2.5 bg-green-600 text-white font-semibold rounded-btn hover:bg-green-700 transition active:scale-95"
          >
            <Share2 className="w-4 h-4 mr-2" />
            {copied ? t('shareCopied') : t('shareBtn')}
          </button>
        </div>
      )}

      {/* Accordion Lists */}
      <Accordion.Root type="multiple" defaultValue={['before', 'day']} className="w-full">
        {renderGroup(BEFORE_KEYS, 'checklist.groups.beforeElection', 'before')}
        {renderGroup(DAY_KEYS, 'checklist.groups.onElectionDay', 'day')}
      </Accordion.Root>

    </div>
  );
};

export default Checklist;
