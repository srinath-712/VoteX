import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import JourneyStep from './JourneyStep';
import JourneyDrawer from './JourneyDrawer';
import { UserCheck, ShieldCheck, MapPin, Users, MonitorPlay, CheckSquare } from 'lucide-react';

const STEP_KEYS = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6'];
const ICONS = [UserCheck, ShieldCheck, MapPin, Users, MonitorPlay, CheckSquare];
const STORAGE_KEY = 'voteasy_journey';

const JourneyMap = () => {
  const { language } = useLanguage();
  
  const [stepStates, setStepStates] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch { /* ignore */ }
    
    return STEP_KEYS.reduce((acc, key, i) => {
      acc[key] = i === 0 ? 'in_progress' : 'not_started';
      return acc;
    }, {});
  });

  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stepStates));
  }, [stepStates]);

  useEffect(() => {
    const allDone = Object.values(stepStates).every(s => s === 'done');
    const previouslyAllDone = localStorage.getItem(`${STORAGE_KEY}_completed`) === 'true';
    if (allDone && !previouslyAllDone) {
      fireConfetti();
      localStorage.setItem(`${STORAGE_KEY}_completed`, 'true');
    } else if (!allDone && previouslyAllDone) {
      localStorage.removeItem(`${STORAGE_KEY}_completed`);
    }
  }, [stepStates]);

  const fireConfetti = () => {
    const end = Date.now() + 1.5 * 1000;
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ffffff'];
    (function frame() {
      confetti({ particleCount: 5, angle: 60,  spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const handleToggleStatus = (stepId) => {
    setStepStates(prev => {
      const isDone = prev[stepId] === 'done';
      const newState = { ...prev };
      if (isDone) {
        newState[stepId] = 'in_progress';
      } else {
        newState[stepId] = 'done';
        const currentIndex = STEP_KEYS.indexOf(stepId);
        if (currentIndex < STEP_KEYS.length - 1) {
          const nextStep = STEP_KEYS[currentIndex + 1];
          if (newState[nextStep] === 'not_started') newState[nextStep] = 'in_progress';
        }
      }
      return newState;
    });
  };

  const title       = getTranslation('journey.hero.title', language);
  const subtitle    = getTranslation('journey.hero.subtitle', language);
  const completedAll= getTranslation('journey.hero.completedAll', language);
  const allDone     = Object.values(stepStates).every(s => s === 'done');
  const doneCount   = Object.values(stepStates).filter(s => s === 'done').length;

  const activeIcon  = activeStep ? ICONS[STEP_KEYS.indexOf(activeStep)] : null;
  const activeState = activeStep ? stepStates[activeStep] : 'not_started';

  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero header — Stripe-style */}
      <div className="mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          {doneCount} of {STEP_KEYS.length} steps complete
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-2 leading-tight">
          {title}
        </h1>
        <p className="text-base text-gray-500 leading-relaxed max-w-lg">
          {subtitle}
        </p>

        {/* Step progress bar */}
        <div className="mt-5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${(doneCount / STEP_KEYS.length) * 100}%` }}
          />
        </div>
      </div>

      {allDone && (
        <div className="mb-6 animate-fade-up surface-elevated rounded-2xl p-5 flex items-center gap-4 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center shadow-[0_4px_14px_rgba(16,185,129,0.4)] shrink-0">
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-green-900 text-sm">{completedAll}</p>
            <p className="text-xs text-green-700 mt-0.5">You're ready for election day 🎉</p>
          </div>
        </div>
      )}

      {/* Journey steps */}
      <div className="space-y-3 relative">
        {/* Connecting line */}
        <div className="absolute left-[1.85rem] top-8 bottom-8 w-px bg-gradient-to-b from-indigo-200/70 via-gray-200/50 to-transparent hidden sm:block z-0" />

        {STEP_KEYS.map((key, i) => (
          <div key={key} className="relative z-10 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <JourneyStep
              id={key}
              icon={ICONS[i]}
              state={stepStates[key]}
              onClick={() => setActiveStep(key)}
            />
          </div>
        ))}
      </div>

      <JourneyDrawer
        open={!!activeStep}
        onOpenChange={(open) => !open && setActiveStep(null)}
        stepId={activeStep}
        state={activeState}
        icon={activeIcon}
        onToggleStatus={() => handleToggleStatus(activeStep)}
      />
    </div>
  );
};

export default JourneyMap;
