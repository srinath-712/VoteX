import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const Quiz = () => {
  const { language } = useLanguage();
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const rawQuestions = getTranslation('learn.quiz.questions', language);
  const enQuestions = getTranslation('learn.quiz.questions', 'en');
  const questions = (rawQuestions && rawQuestions.length > 0) ? rawQuestions : (enQuestions || []);
  
  const t = (key) => getTranslation(`learn.quiz.${key}`, language) || getTranslation(`learn.quiz.${key}`, 'en');

  if (questions.length === 0) return <div>No quiz data available.</div>;

  const currentQ = questions[currentIdx];

  const handleStart = () => setStarted(true);

  const handleSelectOption = (index) => {
    if (showExplanation) return; // Prevent changing answer
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (index === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setFinished(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleRetry = () => {
    setStarted(false);
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
  };

  if (!started) {
    return (
      <div className="bg-white p-8 rounded-card border border-gray-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-3">{t('title')}</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Take a quick 4-question test to see how well you understand the voting process.</p>
        <button onClick={handleStart} className="px-8 py-3 bg-primary text-white rounded-btn font-bold hover:bg-blue-700 transition">
          {t('startBtn')}
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="bg-white p-8 rounded-card border border-gray-100 shadow-sm text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-2">{t('scoreTitle')}</h2>
        <div className="text-6xl font-extrabold text-primary mb-6">
          {score} <span className="text-2xl text-gray-400">/ {questions.length}</span>
        </div>
        <button onClick={handleRetry} className="flex items-center mx-auto px-6 py-2.5 bg-gray-100 text-gray-700 rounded-btn font-bold hover:bg-gray-200 transition">
          <RotateCcw className="w-4 h-4 mr-2" /> {t('retryBtn')}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-card border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center text-sm font-bold text-gray-500 uppercase tracking-widest">
        <span>Question {currentIdx + 1} of {questions.length}</span>
        <span className="text-primary">Score: {score}</span>
      </div>
      
      <div className="p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
          {currentQ.question}
        </h3>
        
        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt, idx) => {
            let btnClass = "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300";
            let icon = null;
            
            if (showExplanation) {
              if (idx === currentQ.correctIndex) {
                 btnClass = "bg-green-50 border-2 border-success text-green-900";
                 icon = <CheckCircle2 className="w-5 h-5 text-success ml-auto" />;
              } else if (idx === selectedOption) {
                 btnClass = "bg-red-50 border-2 border-danger text-red-900 opacity-70";
                 icon = <XCircle className="w-5 h-5 text-danger ml-auto" />;
              } else {
                 btnClass = "bg-white border-2 border-gray-100 text-gray-400 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                disabled={showExplanation}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left px-5 py-4 rounded-xl font-medium transition-all flex items-center ${btnClass}`}
              >
                <span>{opt}</span>
                {icon}
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className="p-4 bg-blue-50 border border-blue-100 text-blue-900 rounded-xl mb-6 text-sm leading-relaxed animate-in slide-in-from-bottom-2">
            <strong>Explanation:</strong> {currentQ.explanation}
          </div>
        )}

        <button 
          onClick={handleNext} 
          disabled={!showExplanation}
          className={`w-full py-3.5 rounded-btn font-bold transition-all ${showExplanation ? 'bg-primary text-white hover:bg-blue-700 shadow-md transform active:scale-[0.98]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          {currentIdx === questions.length - 1 ? t('finishBtn') : t('nextBtn')}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
