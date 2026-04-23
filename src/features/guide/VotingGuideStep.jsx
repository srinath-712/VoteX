import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { Check, Info } from 'lucide-react';

const VotingGuideStep = ({ step, onUnderstand }) => {
  const { language } = useLanguage();
  const [understood, setUnderstood] = useState(false);

  const markBtnText = getTranslation('guide.hero.markUnderstood', language) || "Mark as understood";
  const understoodText = getTranslation('guide.hero.understood', language) || "Understood";

  const handleUnderstand = () => {
    setUnderstood(true);
    if (onUnderstand) onUnderstand(step.id);
  };

  // We can render glossary links via a simple regex or just display body for MVP
  // For Chunk 8 (Glossary), we could map words to deep links. For now, pure text.

  return (
    <div className="bg-white rounded-card shadow-sm border border-gray-100 p-6 sm:p-8 min-h-[300px] flex flex-col transition-all">
      <div className="flex-1">
        <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 border border-blue-100">
           <Info className="w-6 h-6" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          {step.title}
        </h2>
        
        <p className="text-gray-600 text-[17px] leading-relaxed mb-8">
          {step.body}
        </p>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <button
          onClick={handleUnderstand}
          disabled={understood}
          className={`flex items-center px-4 py-2.5 rounded-btn font-medium text-sm transition-all ${
            understood 
              ? 'bg-green-50 text-success border border-green-200 cursor-default' 
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm active:scale-95'
          }`}
        >
          {understood && <Check className="w-4 h-4 mr-2" />}
          {understood ? understoodText : markBtnText}
        </button>
      </div>
    </div>
  );
};

export default VotingGuideStep;
