import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';

const JourneyStep = ({ id, icon: Icon, state, onClick }) => {
  const { language } = useLanguage();
  
  const title    = getTranslation(`journey.steps.${id}.title`, language);
  const subtitle = getTranslation(`journey.steps.${id}.subtitle`, language);
  const t = (key) => getTranslation(`journey.status.${key}`, language);

  const isDone       = state === 'done';
  const isInProgress = state === 'in_progress';
  const isNotStarted = state === 'not_started';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full text-left surface-interactive rounded-2xl p-4 sm:p-5 flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        isDone       ? 'opacity-70' :
        isInProgress ? 'shadow-[0_0_0_1.5px_rgba(99,102,241,0.25),0_4px_24px_rgba(99,102,241,0.1)]' : ''
      }`}
    >
      {/* Step icon */}
      <div className={`shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
        isDone
          ? 'bg-emerald-50 text-emerald-500 shadow-[0_0_0_1px_rgba(16,185,129,0.2)]'
          : isInProgress
          ? 'bg-indigo-500 text-white shadow-glow'
          : 'bg-gray-100 text-gray-400'
      }`}>
        {isDone
          ? <CheckCircle2 className="w-5 h-5" />
          : <Icon className={`w-5 h-5 ${isInProgress ? '' : 'opacity-60'}`} />
        }
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className={`text-sm font-semibold leading-snug ${
            isDone ? 'text-gray-500 line-through decoration-gray-300' :
            isInProgress ? 'text-gray-900' : 'text-gray-600'
          }`}>
            {title}
          </h3>
          {isInProgress && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
              Active
            </span>
          )}
          {isDone && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">
              Done
            </span>
          )}
        </div>
        <p className={`text-xs mt-0.5 leading-relaxed truncate ${
          isNotStarted ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {subtitle}
        </p>
      </div>

      {/* Arrow */}
      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </button>
  );
};

export default JourneyStep;
