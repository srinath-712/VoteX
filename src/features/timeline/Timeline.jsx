import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { ELECTION_CONFIG, getCurrentPhase } from '../../config';
import TimelinePhase from './TimelinePhase';

const Timeline = () => {
  const { language } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);
  
  const currentPhaseNum = getCurrentPhase();

  const title = getTranslation('timeline.hero.title', language) || getTranslation('timeline.hero.title', 'en');
  const subtitle = getTranslation('timeline.hero.subtitle', language) || getTranslation('timeline.hero.subtitle', 'en');

  // Auto-expand current phase on load
  useEffect(() => {
    const current = ELECTION_CONFIG.TIMELINE_PHASES.find(p => p.number === currentPhaseNum);
    if (current) setExpandedId(current.id);
  }, [currentPhaseNum]);

  const handleToggle = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="mb-10 text-center sm:text-left px-4 sm:px-0">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-3">
          {title}
        </h1>
        <p className="text-lg text-gray-600 max-w-xl">
          {subtitle}
        </p>
      </div>

      <div className="relative px-4 sm:px-0">
        {/* The continuous vertical line */}
        <div className="hidden sm:block absolute top-[28px] bottom-10 left-[19px] w-0.5 bg-gray-200 z-0"></div>
        {/* Mobile vertical line */}
        <div className="sm:hidden absolute top-[28px] bottom-10 left-[35px] w-0.5 bg-gray-200 z-0"></div>

        <div className="space-y-6 sm:space-y-12">
          {ELECTION_CONFIG.TIMELINE_PHASES.map((phase) => (
            <TimelinePhase 
              key={phase.id}
              phase={phase}
              isCurrent={phase.number === currentPhaseNum}
              isPast={phase.number < currentPhaseNum}
              isExpanded={expandedId === phase.id}
              onToggle={() => handleToggle(phase.id)}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Timeline;
