import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import Glossary from './Glossary';
import Quiz from './Quiz';
import CandidateComparison from './CandidateComparison';
import { BookA, Lightbulb, Users } from 'lucide-react';

const LearnDashboard = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('glossary');

  const t = (key) => getTranslation(`learn.hero.${key}`, language) || getTranslation(`learn.hero.${key}`, 'en');
  const tabs = getTranslation('learn.hero.tabs', language) || getTranslation('learn.hero.tabs', 'en');

  return (
    <div className="max-w-4xl mx-auto py-2">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-3">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-xl">
          {t('subtitle')}
        </p>
      </div>

      {/* Custom Tabs Navigation */}
      <div className="flex overflow-x-auto hide-scrollbar bg-gray-100 p-1.5 rounded-2xl mb-8 border border-gray-200 shadow-inner">
        <button 
          onClick={() => setActiveTab('glossary')}
          className={`flex-1 flex items-center justify-center whitespace-nowrap px-4 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'glossary' ? 'bg-white text-primary shadow border border-gray-200' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <BookA className={`w-4 h-4 mr-2 ${activeTab === 'glossary' ? 'text-primary' : 'opacity-50'}`} />
          {tabs.glossary}
        </button>
        <button 
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 flex items-center justify-center whitespace-nowrap px-4 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'quiz' ? 'bg-white text-primary shadow border border-gray-200' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Lightbulb className={`w-4 h-4 mr-2 ${activeTab === 'quiz' ? 'text-primary' : 'opacity-50'}`} />
          {tabs.quiz}
        </button>
        <button 
          onClick={() => setActiveTab('candidates')}
          className={`flex-1 flex items-center justify-center whitespace-nowrap px-4 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'candidates' ? 'bg-white text-primary shadow border border-gray-200' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Users className={`w-4 h-4 mr-2 ${activeTab === 'candidates' ? 'text-primary' : 'opacity-50'}`} />
          {tabs.candidates}
        </button>
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-300">
         {activeTab === 'glossary' && <Glossary />}
         {activeTab === 'quiz' && <Quiz />}
         {activeTab === 'candidates' && <CandidateComparison />}
      </div>
      
    </div>
  );
};

export default LearnDashboard;
