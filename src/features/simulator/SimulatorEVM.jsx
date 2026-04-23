import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';

const SimulatorEVM = ({ onVote, selectedId, disabled }) => {
  const { language } = useLanguage();
  
  // Safe extraction relying on EN fallback if candidates list is missing
  const rawCandidates = getTranslation('simulator.evm.candidates', language);
  const enCandidates = getTranslation('simulator.evm.candidates', 'en');
  const candidates = (rawCandidates && rawCandidates.length > 0) ? rawCandidates : enCandidates;

  return (
    <div className="bg-gray-200 p-4 sm:p-6 rounded-3xl shadow-xl border-4 border-gray-300 max-w-sm mx-auto relative">
      {/* Top Header */}
      <div className="bg-gray-800 text-white text-center py-2 px-4 rounded-xl mb-6 flex justify-between items-center shadow-inner">
         <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
         <span className="font-mono text-sm tracking-widest uppercase font-bold text-gray-300">Target: BALLOT UNIT</span>
         <div className="w-3 h-3 rounded-full bg-red-500 opacity-50"></div>
      </div>

      {/* Button Panel list */}
      <div className="space-y-3 bg-white p-3 rounded-xl border-2 border-gray-300 shadow-inner">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
            {/* Display candidate info */}
            <div className="flex items-center flex-1 pr-4">
              <div className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center text-xl bg-gray-50 mr-3 shadow-sm">
                {candidate.symbol}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 leading-tight uppercase text-sm">{candidate.name}</h4>
              </div>
            </div>

            {/* Voting Mechanism */}
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${selectedId === candidate.id ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]' : 'bg-gray-300'} transition-all duration-300`}></div>
              <button 
                onClick={() => onVote(candidate)}
                disabled={disabled}
                className={`w-10 h-10 rounded-full border-b-4 bg-primary border-blue-900 hover:bg-blue-600 active:border-b-0 active:translate-y-1 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer shadow-md'}`}
                aria-label={`Vote for ${candidate.name}`}
              >
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Speaker grill deco */}
      <div className="mt-6 flex justify-center space-x-1">
         {[...Array(15)].map((_, i) => (
           <div key={i} className="w-1 h-3 bg-gray-400 rounded-full"></div>
         ))}
      </div>
    </div>
  );
};

export default SimulatorEVM;
