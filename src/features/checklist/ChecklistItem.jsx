import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { Check, Clock } from 'lucide-react';

const ChecklistItem = ({ itemKey, isChecked, onToggle }) => {
  const { language } = useLanguage();
  
  const title    = getTranslation(`checklist.items.${itemKey}.title`, language);
  const subtitle = getTranslation(`checklist.items.${itemKey}.subtitle`, language);
  const deadline = getTranslation(`checklist.items.${itemKey}.deadline`, language);

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      onClick={onToggle}
      className={`group w-full text-left flex items-start gap-3.5 px-4 py-3.5 rounded-xl mb-2 border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
        isChecked
          ? 'bg-gray-50/80 border-gray-100 opacity-60'
          : 'bg-white/80 border-gray-100/80 hover:border-indigo-200/70 hover:shadow-[0_2px_16px_rgba(99,102,241,0.08)] hover:-translate-y-0.5'
      }`}
    >
      {/* Custom checkbox */}
      <div className={`shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all duration-200 ${
        isChecked
          ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.1)]'
          : 'border-gray-300 group-hover:border-indigo-400 bg-white'
      }`}>
        {isChecked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className={`block text-sm font-medium leading-snug transition-all duration-200 ${
          isChecked ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-800 group-hover:text-gray-900'
        }`}>
          {title}
        </span>

        {subtitle && (
          <span className={`block text-xs mt-0.5 ${isChecked ? 'text-gray-400' : 'text-gray-500'}`}>
            {subtitle}
          </span>
        )}

        {deadline && !isChecked && (
          <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-100">
            <Clock className="w-2.5 h-2.5" />
            {deadline}
          </div>
        )}
      </div>
    </button>
  );
};

export default ChecklistItem;
