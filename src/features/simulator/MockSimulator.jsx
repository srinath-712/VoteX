import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import SimulatorEVM from './SimulatorEVM';
import SimulatorVVPAT from './SimulatorVVPAT';
import { ChevronRight, ShieldCheck, Flag } from 'lucide-react';
import confetti from 'canvas-confetti';

const MockSimulator = () => {
  const { language } = useLanguage();
  const [scene, setScene] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);

  // Read scene translations safely
  const t = (key) => getTranslation(`simulator.scenes.scene${scene}.${key}`, language) || getTranslation(`simulator.scenes.scene${scene}.${key}`, 'en');
  const mainTitle = getTranslation('simulator.hero.title', language) || 'Mock Simulator';

  const handleNextScene = () => {
    if (scene < 5) setScene(prev => prev + 1);
  };

  const handleVote = (candidate) => {
    // Only vote if we are in EVM scene (scene 2)
    if (scene === 2) {
      setSelectedCandidate(candidate);
      handleNextScene(); // Move to Beep!
    }
  };

  const triggerVVPAT = () => {
    handleNextScene(); // Move to Verification
    setIsPrinting(true);
  };

  const handlePrintComplete = () => {
    setIsPrinting(false);
    handleNextScene(); // Move to Vote Complete!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF9933', '#FFFFFF', '#138808'] // Indian flag colors
    });
  };

  const handleReset = () => {
    setScene(1);
    setSelectedCandidate(null);
    setIsPrinting(false);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 min-h-[60vh] bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Left panel: Narrative Instructions */}
      <div className="w-full md:w-1/3 bg-gray-50 p-6 md:p-8 flex flex-col items-start border-r border-gray-100">
        <h1 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-6">{mainTitle}</h1>
        
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 w-full relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {scene}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('title')}</h2>
             <p className="text-gray-600 leading-relaxed mb-6">
                {t('instruction')}
             </p>

            {/* Action Buttons purely for manual advancement when required */}
            {scene === 1 && (
               <button onClick={handleNextScene} className="w-full flex items-center justify-center bg-primary text-white py-3 rounded-btn font-semibold hover:bg-blue-700 transition active:scale-95 shadow-md">
                 {t('actionBtn')} <ChevronRight className="w-5 h-5 ml-2" />
               </button>
            )}
            {scene === 3 && (
               <button onClick={triggerVVPAT} className="w-full flex items-center justify-center bg-primary text-white py-3 rounded-btn font-semibold hover:bg-blue-700 transition shadow-md animate-pulse">
                 {t('actionBtn')} <ChevronRight className="w-5 h-5 ml-2" />
               </button>
            )}
            {scene === 5 && (
               <button onClick={handleReset} className="w-full flex items-center justify-center border-2 border-primary text-primary py-3 rounded-btn font-bold hover:bg-blue-50 transition">
                 <Flag className="w-5 h-5 mr-2" /> {t('actionBtn') || "Restart"}
               </button>
            )}

            {/* Shield security message */}
            <div className="mt-6 flex items-start text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 mr-2 text-success flex-shrink-0" />
              <p>Your vote is entirely secret and recorded securely. The EVM does not use internet or Bluetooth.</p>
            </div>
         </div>
      </div>

      {/* Right panel: The Machine View */}
      <div className="w-full md:w-2/3 p-6 md:p-8 bg-gray-100 flex items-center justify-center min-h-[500px]">
        {scene === 1 && (
          <div className="w-64 h-80 bg-gray-300 rounded-lg border-4 border-gray-400 flex items-center justify-center relative overflow-hidden shadow-2xl">
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-800 flex items-end justify-center pb-4 text-gray-400 font-bold uppercase tracking-widest text-sm">
               Cardboard Shield
             </div>
             <p className="z-10 text-center font-semibold text-gray-700 px-4">Voting Compartment is empty.</p>
          </div>
        )}

        {scene === 2 && (
          <div className="animate-in slide-in-from-right fade-in duration-500 w-full max-w-sm">
             <SimulatorEVM onVote={handleVote} selectedId={null} disabled={false} />
          </div>
        )}

        {scene === 3 && (
          <div className="text-center">
             <div className="w-24 h-24 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-ping">
                <span className="text-white font-bold opacity-0">BEEP</span>
             </div>
             <h2 className="text-3xl font-black text-gray-900 tracking-widest animate-pulse">BEEEEEEEEEEP</h2>
          </div>
        )}

        {scene === 4 && (
          <div className="animate-in zoom-in-95 duration-300 w-full max-w-sm">
             <SimulatorVVPAT 
                selectedCandidate={selectedCandidate} 
                isPrinting={isPrinting}
                onPrintComplete={handlePrintComplete}
             />
          </div>
        )}

        {scene === 5 && (
          <div className="text-center max-w-sm">
             <div className="w-24 h-24 bg-success text-white rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl shadow-green-100">
                <ShieldCheck className="w-12 h-12" />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Vote Recorded</h3>
             <p className="text-gray-600 font-medium bg-white p-4 rounded-xl border border-gray-200">The VVPAT slip was printed accurately and cut securely into the sealed box.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MockSimulator;
