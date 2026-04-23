import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { Check, Clock } from 'lucide-react';

const ChecklistItem = ({ itemKey, isChecked, onToggle }) => {
  const { language } = useLanguage();
  
  const title = getTranslation(`checklist.items.${itemKey}.title`, language);
  const subtitle = getTranslation(`checklist.items.${itemKey}.subtitle`, language);
  const deadline = getTranslation(`checklist.items.${itemKey}.deadline`, language);

  return (
    <div 
      onClick={onToggle}
      className={`relative flex items-start p-4 mb-3 border rounded-card cursor-pointer transition-all duration-200 group ${
        isChecked 
          ? 'bg-gray-50 border-gray-100 opacity-60' 
          : 'bg-white border-gray-200 hover:border-primary/50 hover:shadow-sm'
      }`}
    >
      <div className="flex-shrink-0 pt-0.5 mr-4">
        <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${
          isChecked 
            ? 'bg-success border-success text-white' 
            : 'border-gray-300 group-hover:border-primary bg-white text-transparent'
        }`}>
          <Check className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className={`text-base font-medium mb-1 transition-all ${
          isChecked ? 'text-gray-500 line-through' : 'text-gray-900 group-hover:text-primary'
        }`}>
          {title}
        </h4>
        
        {subtitle && (
          <p className={`text-sm ${isChecked ? 'text-gray-400' : 'text-gray-500'}`}>
            {subtitle}
          </p>
        )}
        
        {deadline && !isChecked && (
          <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3 mr-1" />
            {deadline}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChecklistItem;
