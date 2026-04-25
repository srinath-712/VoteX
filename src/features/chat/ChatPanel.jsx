import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { useChat } from './useChat';
import ChatMessage from './ChatMessage';
import { X, Send, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

const ChatPanel = ({ onClose }) => {
  const { language } = useLanguage();
  const [inputTimer, setInputTimer] = useState('');
  const messagesEndRef = useRef(null);
  
  const t = (key) => getTranslation(`chat.ui.${key}`, language) || getTranslation(`chat.ui.${key}`, 'en');
  const greeting = getTranslation('chat.greetings.initial', language) || getTranslation('chat.greetings.initial', 'en');
  const starters = getTranslation('chat.starterQuestions', language) || getTranslation('chat.starterQuestions', 'en') || [];

  const { messages, isLoading, error, sendMessage, setInitialMessage } = useChat();

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setInitialMessage(greeting);
    }
  }, [messages.length, greeting, setInitialMessage]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputTimer.trim() && !isLoading) {
      sendMessage(inputTimer);
      setInputTimer('');
    }
  };

  const handleStarterClick = (question) => {
    if (!isLoading) {
      sendMessage(question);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm z-10 rounded-t-2xl">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 border border-blue-100">
            <span className="text-primary font-bold text-sm">VX</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">{t('title')}</h3>
            <span className="text-xs font-semibold text-green-600 flex items-center">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
               Online
            </span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 relative">
        {messages.map((msg, index) => (
          <ChatMessage key={msg.id || index} message={msg} />
        ))}
        
        {messages.length === 1 && !isLoading && (
          <div className="flex flex-wrap gap-2 mt-6">
            {starters.map((q, i) => (
              <button
                key={i}
                onClick={() => handleStarterClick(q)}
                className="text-left px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-primary hover:text-primary hover:bg-blue-50 transition shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center text-sm text-gray-500 mt-2 px-2">
            <div className="flex space-x-1">
               <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
               <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-btn flex items-start text-danger text-sm">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium mb-1">{t('error')}</p>
              <button
                className="flex items-center text-red-700 hover:underline font-semibold text-xs"
                onClick={() => {
                  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
                  if (lastUserMsg) sendMessage(lastUserMsg.content);
                }}
              >
                <RefreshCw className="w-3 h-3 mr-1" /> {t('retry')}
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 rounded-b-2xl">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={inputTimer}
            onChange={(e) => setInputTimer(e.target.value)}
            placeholder={t('placeholder')}
            disabled={isLoading}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-full pl-5 pr-12 py-3 focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputTimer.trim() || isLoading}
            className="absolute right-2 p-2 bg-primary text-white rounded-full disabled:opacity-50 hover:bg-blue-700 transition"
            aria-label={t('sendBtn')}
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
        <div className="text-center mt-3">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold flex flex-row items-center justify-center">
            <Sparkles className="w-3 h-3 mr-1" />
            {t('poweredBy')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
