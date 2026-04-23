import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { X, Check } from 'lucide-react';

const JourneyDrawer = ({ open, onOpenChange, stepId, state, onToggleStatus, icon: Icon }) => {
  const { language } = useLanguage();

  if (!stepId) return null;

  const title = getTranslation(`journey.steps.${stepId}.title`, language);
  const subtitle = getTranslation(`journey.steps.${stepId}.subtitle`, language);
  const details = getTranslation(`journey.steps.${stepId}.details`, language);

  const isDone = state === 'done';
  const toggleLabel = getTranslation(
    isDone ? 'journey.drawer.markIncomplete' : 'journey.drawer.markComplete', 
    language
  );
  
  const closeLabel = getTranslation('journey.drawer.close', language);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content className="fixed right-0 top-0 bottom-0 w-full md:w-[400px] bg-white shadow-xl flex flex-col z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300 sm:rounded-l-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <button 
              onClick={() => onOpenChange(false)}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={closeLabel}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${isDone ? 'bg-green-50 text-success border-green-100' : 'bg-blue-50 text-primary border-blue-100'}`}>
               {Icon && <Icon className="w-8 h-8" />}
            </div>
            
            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-1">
              {title}
            </Dialog.Title>
            <Dialog.Description className="text-base text-gray-500 font-medium mb-6">
              {subtitle}
            </Dialog.Description>

            <div className="prose prose-sm prose-gray max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-[15px]">
                {details}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 rounded-bl-2xl">
            <button
              onClick={() => {
                onToggleStatus();
                // Optionally auto-close on mark complete
                if (!isDone) onOpenChange(false);
              }}
              className={`w-full flex items-center justify-center py-3.5 px-4 rounded-btn font-semibold text-[15px] transition-all shadow-sm ${
                isDone 
                  ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900' 
                  : 'bg-primary text-white border border-transparent hover:bg-blue-700 hover:shadow-md'
              }`}
            >
              {isDone && <Check className="w-5 h-5 mr-2 text-gray-500" />}
              {toggleLabel}
            </button>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default JourneyDrawer;
