import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import TimelineDetail from './TimelineDetail';
import { Check, ChevronDown, CircleDashed } from 'lucide-react';

const TimelinePhase = ({ phase, isCurrent, isPast, isExpanded, onToggle }) => {
  const { language } = useLanguage();
  
  const title = getTranslation(`timeline.phases.${phase.id}.title`, language);
  const description = getTranslation(`timeline.phases.${phase.id}.description`, language);

  let statusStyles = "";
  if (isCurrent) {
    statusStyles = "bg-primary text-white border-primary shadow-md ring-4 ring-blue-50";
  } else if (isPast) {
    statusStyles = "bg-green-50 text-success border-success opacity-80";
  } else {
    statusStyles = "bg-white text-gray-400 border-gray-200";
  }

  return (
    <div className={`relative flex flex-col sm:flex-row group ${!isExpanded ? 'hover:-translate-y-0.5 transition-transform' : ''}`}>
      
      {/* Node Column */}
      <div className="flex sm:flex-col items-center mr-6 mb-3 sm:mb-0 relative z-10 w-full sm:w-auto">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold absolute sm:relative left-0 top-0 sm:top-auto sm:left-auto border-2 transition-all ${statusStyles}`}>
           {isPast && !isCurrent ? <Check className="w-5 h-5" /> : phase.number}
        </div>
        
        {/* Mobile Date Badge aligned with Node */}
        <div className="ml-14 sm:hidden flex items-center h-10 w-full">
           <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded ${isCurrent ? 'bg-blue-100 text-primary' : 'bg-gray-100 text-gray-500'}`}>
              {phase.estimatedDate}
           </span>
        </div>
      </div>
      
      {/* Card Column */}
      <div className="flex-1 -mt-1 sm:mt-0 ml-0 sm:ml-0 bg-white rounded-2xl shadow-sm border border-gray-200 transition-all cursor-pointer overflow-hidden group-hover:border-primary/40 relative" onClick={onToggle}>
        
        {isCurrent && (
          <div className="absolute top-0 right-0 right-4 rounded-b-md px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest hidden sm:block">
            Current Phase
          </div>
        )}

        <div className="p-5 sm:p-6 flex items-start justify-between">
          <div className="pr-4">
            <div className="hidden sm:inline-block mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded ${isCurrent ? 'bg-blue-100 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                {phase.estimatedDate}
              </span>
            </div>
            
            <h3 className={`text-lg sm:text-xl font-bold mb-2 leading-tight ${isCurrent ? 'text-primary' : 'text-gray-900'}`}>
              {title}
            </h3>
            
            <p className="text-sm sm:text-base text-gray-500 line-clamp-2">
              {description}
            </p>
          </div>
          
          <div className="flex-shrink-0 mt-2 p-1.5 rounded-full bg-gray-50 text-gray-400 group-hover:text-primary transition-colors">
             <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* Expansion Panel */}
        {isExpanded && <TimelineDetail phaseId={phase.id} />}
      </div>
    </div>
  );
};

export default TimelinePhase;
