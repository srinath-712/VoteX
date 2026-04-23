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
  
  // State: object mapping step_id to state ('not_started', 'in_progress', 'done')
  const [stepStates, setStepStates] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch { /* ignore */ }
    
    return STEP_KEYS.reduce((acc, key, i) => {
      // First step defaults to in progress, rest not started
      acc[key] = i === 0 ? 'in_progress' : 'not_started';
      return acc;
    }, {});
  });

  const [activeStep, setActiveStep] = useState(null);

  // Sync to localstorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stepStates));
  }, [stepStates]);

  // Check for completion
  useEffect(() => {
    const allDone = Object.values(stepStates).every(state => state === 'done');
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
    const colors = ['#1a56db', '#057a55', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleToggleStatus = (stepId) => {
    setStepStates(prev => {
      const isDone = prev[stepId] === 'done';
      const newState = { ...prev };
      
      if (isDone) {
        // Unmark
        newState[stepId] = 'in_progress';
      } else {
        // Mark as done
        newState[stepId] = 'done';
        
        // Auto-start the next available step
        const currentIndex = STEP_KEYS.indexOf(stepId);
        if (currentIndex < STEP_KEYS.length - 1) {
          const nextStep = STEP_KEYS[currentIndex + 1];
          if (newState[nextStep] === 'not_started') {
            newState[nextStep] = 'in_progress';
          }
        }
      }
      return newState;
    });
  };

  const title = getTranslation('journey.hero.title', language);
  const subtitle = getTranslation('journey.hero.subtitle', language);
  const completedAll = getTranslation('journey.hero.completedAll', language);

  const allDone = Object.values(stepStates).every(state => state === 'done');
  const activeIcon = activeStep ? ICONS[STEP_KEYS.indexOf(activeStep)] : null;
  const activeState = activeStep ? stepStates[activeStep] : 'not_started';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-3">
          {title}
        </h1>
        <p className="text-lg text-gray-600">
          {subtitle}
        </p>
      </div>

      {allDone && (
         <div className="mb-6 bg-green-50 rounded-card p-4 border border-green-200 flex items-center shadow-sm">
           <div className="flex-shrink-0 w-10 h-10 rounded-full bg-success flex items-center justify-center mr-4">
             <CheckSquare className="w-5 h-5 text-white" />
           </div>
           <p className="text-green-800 font-semibold">{completedAll}</p>
         </div>
      )}

      {/* The main visual journey */}
      <div className="relative space-y-4">
        {/* Visual connecting line behind the cards (desktop) */}
        <div className="hidden sm:block absolute left-[3.5rem] top-6 bottom-6 w-0.5 bg-gray-200 z-0"></div>

        {STEP_KEYS.map((key, i) => (
          <div key={key} className="relative z-10">
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
