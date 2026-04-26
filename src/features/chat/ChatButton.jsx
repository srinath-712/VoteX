import React, { useState } from 'react';
import ChatPanel from './ChatPanel';
import { MessageSquare, X } from 'lucide-react';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleToggle = () => {
    if (!hasOpened) setHasOpened(true);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Panel — floating */}
      {isOpen && (
        <div className="fixed z-50 inset-0 md:inset-auto md:bottom-24 md:right-6 md:w-[380px] md:h-[560px] flex flex-col transition-all duration-300">
          <div className="flex-1 glass border border-black/[0.07] md:rounded-2xl shadow-[0_20px_80px_-16px_rgba(0,0,0,0.25)] overflow-hidden animate-slide-up-fade origin-bottom-right">
            <ChatPanel onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}

      {/* FAB Trigger Button */}
      {!isOpen && (
        <div className="fixed z-50 bottom-20 md:bottom-6 right-4 md:right-6">
          <button
            onClick={handleToggle}
            className="relative w-14 h-14 flex items-center justify-center rounded-full text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary animate-glow-pulse"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #7c3aed 100%)',
              boxShadow: '0 0 24px rgba(99,102,241,0.5), 0 8px 32px rgba(79,70,229,0.3)',
            }}
            aria-label="Open Election Assistant"
          >
            <MessageSquare className="w-5 h-5" />
            {/* Outer glow ring */}
            <span className="absolute inset-0 rounded-full border-2 border-indigo-400/30 animate-ping" />
            {/* Notification dot */}
            {!hasOpened && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-[7px] text-white font-bold">1</span>
              </span>
            )}
          </button>

          {/* Tooltip bubble */}
          {!hasOpened && (
            <div className="absolute right-16 bottom-1.5 glass border border-black/[0.06] rounded-xl px-3.5 py-2 shadow-card whitespace-nowrap pointer-events-none">
              <p className="text-xs font-semibold text-gray-800">Have questions?</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Ask the AI assistant →</p>
              {/* Arrow */}
              <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-r border-t border-black/[0.06] rotate-45" />
            </div>
          )}
        </div>
      )}

      {/* Mobile: close button when panel is open */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed bottom-4 right-4 z-[60] w-11 h-11 rounded-full glass border border-black/[0.07] shadow-card flex items-center justify-center text-gray-600 hover:text-gray-900 transition"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default ChatButton;
