import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { AlertCircle, Users, Activity } from 'lucide-react';

const TimelineDetail = ({ phaseId }) => {
  const { language } = useLanguage();
  
  const whatHappens = getTranslation(`timeline.phases.${phaseId}.whatHappens`, language);
  const whoInvolved = getTranslation(`timeline.phases.${phaseId}.whoInvolved`, language);
  const affectsMe = getTranslation(`timeline.phases.${phaseId}.affectsMe`, language);

  return (
    <div className="bg-gray-50 border-t border-gray-100 p-5 rounded-b-2xl space-y-4 animate-in slide-in-from-top-2 duration-300">
      
      <div className="flex items-start">
        <Activity className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-1.5 opacity-80">What Happens</h4>
          <p className="text-[15px] text-gray-700 leading-relaxed">{whatHappens}</p>
        </div>
      </div>
      
      <div className="flex items-start">
        <Users className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-1.5 opacity-80">Who is Involved</h4>
          <p className="text-[15px] text-gray-700 leading-relaxed">{whoInvolved}</p>
        </div>
      </div>
      
      <div className="flex items-start p-4 bg-primary/5 rounded-xl border border-primary/10 mt-6 !mb-2">
        <AlertCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-1.5">How Does This Affect Me?</h4>
          <p className="text-[15px] text-gray-800 leading-relaxed font-medium">{affectsMe}</p>
        </div>
      </div>

    </div>
  );
};

export default TimelineDetail;
