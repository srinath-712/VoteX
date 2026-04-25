import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { Users, GraduationCap, Banknote, Scale, CalendarCheck } from 'lucide-react';

const CandidateComparison = () => {
  const { language } = useLanguage();
  
  const rawData = getTranslation('learn.candidates.mockData', language);
  const data = (rawData && rawData.length > 0) ? rawData : (getTranslation('learn.candidates.mockData', 'en') || []);
  const metrics = getTranslation('learn.candidates.metrics', language) || getTranslation('learn.candidates.metrics', 'en');

  return (
    <div className="space-y-6">
      
      <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-start text-blue-800 text-sm mb-6">
        <Users className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 opacity-80" />
        <p>{getTranslation('learn.candidates.description', language) || getTranslation('learn.candidates.description', 'en')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map(candidate => (
          <div key={candidate.id} className="bg-white rounded-card shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            
            <div className="bg-gray-50 border-b border-gray-100 p-5 text-center">
              <div className="w-16 h-16 bg-white border border-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center shadow-sm">
                 <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{candidate.name}</h3>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{candidate.party}</p>
            </div>

            <div className="p-5 space-y-4">
               {/* Education */}
               <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2.5">
                  <span className="text-xs font-medium text-gray-500 flex items-center"><GraduationCap className="w-3.5 h-3.5 mr-1.5" />{metrics.education}</span>
                  <span className="text-sm font-bold text-gray-900 text-right">{candidate.education}</span>
               </div>
               
               {/* Assets */}
               <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2.5">
                  <span className="text-xs font-medium text-gray-500 flex items-center"><Banknote className="w-3.5 h-3.5 mr-1.5" />{metrics.assets}</span>
                  <span className="text-sm font-bold text-gray-900 text-right">{candidate.assets}</span>
               </div>
               
               {/* Cases */}
               <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2.5">
                  <span className="text-xs font-medium text-gray-500 flex items-center"><Scale className="w-3.5 h-3.5 mr-1.5" />{metrics.cases}</span>
                  <span className={`text-sm font-bold text-right ${candidate.cases === '0' ? 'text-success' : 'text-danger'}`}>{candidate.cases}</span>
               </div>
               
               {/* Attendance */}
               <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2.5">
                  <span className="text-xs font-medium text-gray-500 flex items-center"><CalendarCheck className="w-3.5 h-3.5 mr-1.5" />{metrics.attendance}</span>
                  <span className="text-sm font-bold text-gray-900 text-right">{candidate.attendance}</span>
               </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateComparison;
