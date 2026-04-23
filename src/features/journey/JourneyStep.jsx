import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { CheckCircle2, CircleDashed, ChevronRight, Check } from 'lucide-react';

const JourneyStep = ({ id, icon: Icon, state, onClick }) => {
  const { language } = useLanguage();
  
  const title = getTranslation(`journey.steps.${id}.title`, language);
  const subtitle = getTranslation(`journey.steps.${id}.subtitle`, language);
  const t = (key) => getTranslation(`journey.status.${key}`, language);

  let statusConfig = {
    color: 'text-gray-400 bg-gray-50 border-gray-200',
    iconColor: 'text-gray-500',
    icon: CircleDashed,
    label: t('notStarted'),
    badge: 'bg-gray-100 text-gray-600',
    isActive: false,
    ring: ''
  };

  if (state === 'in_progress') {
    statusConfig = {
      color: 'text-primary bg-blue-50 border-blue-200',
      iconColor: 'text-primary',
      icon: CircleDashed,
      label: t('inProgress'),
      badge: 'bg-blue-100 text-primary',
      isActive: true,
      ring: 'ring-4 ring-blue-100'
    };
  } else if (state === 'done') {
    statusConfig = {
      color: 'text-success bg-green-50 border-green-200',
      iconColor: 'text-success',
      icon: CheckCircle2,
      label: t('done'),
      badge: 'bg-green-100 text-success',
      isActive: true,
      ring: ''
    };
  }

  const StatusIcon = statusConfig.icon;

  return (
    <div 
      onClick={onClick}
      className={`relative group rounded-card p-4 transition-all duration-200 cursor-pointer border ${statusConfig.color} hover:shadow-md hover:-translate-y-0.5 active:translate-y-0`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100 ${statusConfig.ring} ${statusConfig.iconColor} transition-all`}>
             <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-semibold text-base md:text-lg mb-0.5 ${state === 'done' ? 'text-gray-800' : 'text-gray-900'} group-hover:text-primary transition-colors`}>
              {title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {subtitle}
            </p>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider ${statusConfig.badge}`}>
               {state === 'done' && <Check className="w-3 h-3 mr-1" />}
               {statusConfig.label}
            </span>
          </div>
        </div>
        
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white opacity-0 group-hover:opacity-100 shadow-sm text-gray-400 transition-opacity">
          <ChevronRight className="w-5 h-5 group-hover:text-primary" />
        </div>
      </div>
    </div>
  );
};

export default JourneyStep;
