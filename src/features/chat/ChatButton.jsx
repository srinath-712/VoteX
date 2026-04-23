import React, { useState, useEffect } from 'react';
import ChatPanel from './ChatPanel';
import { MessageSquare } from 'lucide-react';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  // When simulator is full screen, we should hide chat, but for now we rely on z-index logic and component state
  // We can just keep it simple

  const handleToggle = () => {
    if (!hasOpened) setHasOpened(true);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`fixed z-50 transition-all duration-300 ${isOpen ? 'bottom-0 right-0 left-0 top-0 md:bottom-24 md:right-8 md:left-auto md:top-auto md:w-[380px] md:h-[550px]' : 'bottom-20 md:bottom-8 right-4 md:right-8 w-14 h-14'}`}>
        {isOpen ? (
          <div className="w-full h-full bg-white md:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-200 origin-bottom-right">
            <ChatPanel onClose={() => setIsOpen(false)} />
          </div>
        ) : (
          <button 
            onClick={handleToggle}
            className="w-full h-full bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all outline-none"
            aria-label="Open Chat Assistant"
          >
            <MessageSquare className="w-6 h-6" />
            {!hasOpened && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-danger border-2 border-white rounded-full"></span>
            )}
            
            {!hasOpened && (
              <div className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-card shadow-lg whitespace-nowrap animate-pulse">
                Have questions?
                <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-gray-900 transform rotate-45 -translate-y-1/2"></div>
              </div>
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default ChatButton;
