import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';

const SimulatorVVPAT = ({ selectedCandidate, isPrinting, onPrintComplete }) => {
  const { language } = useLanguage();
  const [showSlip, setShowSlip] = useState(false);
  const [dropSlip, setDropSlip] = useState(false);

  const vvpatLabel = getTranslation('simulator.scenes.scene4.vvpatLabel', language) || "VVPAT Window";

  // Sequence: Print for 7 seconds, then drop, then complete
  useEffect(() => {
    if (isPrinting && selectedCandidate) {
      setShowSlip(true);
      setDropSlip(false);
      
      // Wait exactly 7 seconds per India voting law
      const dropTimer = setTimeout(() => {
        setDropSlip(true);
      }, 7000);

      // Clean up sequence and notify parent
      const finishTimer = setTimeout(() => {
        setShowSlip(false);
        setDropSlip(false);
        if (onPrintComplete) onPrintComplete();
      }, 8500); // 1.5s drop animation time

      return () => {
        clearTimeout(dropTimer);
        clearTimeout(finishTimer);
      };
    }
  }, [isPrinting, selectedCandidate, onPrintComplete]);

  return (
    <div className="bg-gray-200 p-4 sm:p-6 rounded-t-3xl rounded-b-lg shadow-xl border-4 border-gray-300 w-full max-w-sm mx-auto relative flex flex-col items-center">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full shadow-sm">
        VVPAT Machine
      </div>

      <div className="w-full bg-gray-800 h-6 rounded-t-lg mt-4 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
      </div>

      {/* The Transparent Window */}
      <div className="w-full h-48 bg-gray-900 border-8 border-gray-800 rounded-b-xl relative overflow-hidden flex flex-col shadow-inner">
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-20"></div>
        
        <div className="absolute top-2 left-2 text-[10px] text-gray-500 font-mono uppercase tracking-wider z-20">
          {vvpatLabel}
        </div>

        {/* The Paper Slip */}
        {showSlip && selectedCandidate && (
          <div 
            className={`w-[70%] bg-[#f4f4ece6] absolute left-[15%] rounded-sm shadow-md flex flex-col items-center justify-center border border-gray-300 p-3 z-10 transition-all duration-1000 ${
              dropSlip 
                ? 'top-full opacity-0' 
                : 'top-20' // Center of window
            }`}
            style={{
               animation: !dropSlip ? "slideDown 1s ease-out forwards" : "none"
            }}
          >
             <div className="text-xl font-bold mb-1">{selectedCandidate.id}</div>
             <div className="text-2xl mb-1 filter grayscale">{selectedCandidate.symbol}</div>
             <div className="text-sm font-bold uppercase truncate w-full text-center">{selectedCandidate.name}</div>
          </div>
        )}
        
        {/* Cutoff / drop slot visual */}
        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-gray-950 to-transparent z-10"></div>
      </div>
      
      {/* Storage box area */}
      <div className="w-[85%] h-16 border-t-2 border-gray-400 mt-4 bg-gray-300 rounded shadow-inner flex items-center justify-center relative">
         <div className="absolute w-2 h-2 rounded-full bg-gray-400 top-2 left-2"></div>
         <div className="absolute w-2 h-2 rounded-full bg-gray-400 top-2 right-2"></div>
         <div className="text-xs text-gray-500 font-mono uppercase tracking-widest font-bold opacity-50">Sealed Drop Box</div>
      </div>

      <style jsx="true">{`
        @keyframes slideDown {
          0% { top: -100px; opacity: 0; }
          100% { top: 20px; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SimulatorVVPAT;
