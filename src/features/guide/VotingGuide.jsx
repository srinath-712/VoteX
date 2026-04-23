import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import VotingGuideStep from './VotingGuideStep';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

const VotingGuide = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [track, setTrack] = useState(null); // 'firstTime' | 'refresher' | null
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use the full english array length in case non-english is empty during MVP
  const t = (key) => getTranslation(`guide.hero.${key}`, language) || getTranslation(`guide.hero.${key}`, 'en');
  
  const rawTrackData = track ? (getTranslation(`guide.${track}`, language) || []) : [];
  const enTrackData = track ? getTranslation(`guide.${track}`, 'en') : [];
  
  // MVP safe-guard: if current language array is empty, use english
  const activeSteps = rawTrackData.length > 0 ? rawTrackData : enTrackData;

  const handleNext = () => {
    if (currentIndex < activeSteps.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      // Go back to track selection
      setTrack(null);
    }
  };

  // Touch swipe handling
  const [touchStart, setTouchStart] = useState(null);
  
  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Swipe left (next)
    if (diff > 50) handleNext();
    // Swipe right (prev)
    if (diff < -50) handlePrev();
    
    setTouchStart(null);
  };

  if (!track) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 flex flex-col justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => { setTrack('firstTime'); setCurrentIndex(0); }}
            className="w-full flex items-center justify-between p-6 bg-white border border-gray-200 rounded-card shadow-sm hover:border-primary hover:ring-1 hover:ring-primary transition-all group"
          >
            <span className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
              {t('firstTimeBtn')}
            </span>
            <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>

          <button 
            onClick={() => { setTrack('refresher'); setCurrentIndex(0); }}
            className="w-full flex items-center justify-between p-6 bg-white border border-gray-200 rounded-card shadow-sm hover:border-primary hover:ring-1 hover:ring-primary transition-all group"
          >
            <span className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
              {t('refresherBtn')}
            </span>
            <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    );
  }

  const currentStep = activeSteps[currentIndex];
  // Replaces {{current}} and {{total}} manually since we don't have an interpolator here yet
  const progressText = t('progress')
    .replace('{{current}}', currentIndex + 1)
    .replace('{{total}}', activeSteps.length);

  return (
    <div className="max-w-2xl mx-auto flex flex-col" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      
      {/* Top Header / Progress */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={handlePrev}
          className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors flex items-center"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-semibold">{t('prevBtn')}</span>
        </button>

        <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
          {progressText}
        </span>
      </div>

      {/* Progress Bar Linear */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / activeSteps.length) * 100}%` }}
        />
      </div>

      {/* Step Card */}
      <div className="mb-8">
        <VotingGuideStep step={currentStep} />
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-auto">
        {currentIndex < activeSteps.length - 1 ? (
          <button 
            onClick={handleNext}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 bg-primary text-white rounded-btn font-semibold hover:bg-blue-700 transition active:scale-95 ml-auto"
          >
            {t('nextBtn')}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        ) : (
          <button 
            onClick={() => navigate('/simulator')}
            className="w-full flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-btn font-bold hover:bg-black transition shadow-md active:scale-95"
          >
            {t('simulatorCta')}
            <PlayCircle className="w-5 h-5 ml-3" />
          </button>
        )}
      </div>

    </div>
  );
};

export default VotingGuide;
