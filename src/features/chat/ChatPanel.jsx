import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { useChat } from './useChat';
import ChatMessage from './ChatMessage';
import { X, Send, AlertCircle, RefreshCw, Sparkles, Zap } from 'lucide-react';

const ChatPanel = ({ onClose }) => {
  const { language } = useLanguage();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  
  const t = (key) => getTranslation(`chat.ui.${key}`, language) || getTranslation(`chat.ui.${key}`, 'en');
  const greeting = getTranslation('chat.greetings.initial', language) || getTranslation('chat.greetings.initial', 'en');
  const starters = getTranslation('chat.starterQuestions', language) || getTranslation('chat.starterQuestions', 'en') || [];

  const { messages, isLoading, error, sendMessage, setInitialMessage } = useChat();

  useEffect(() => {
    if (messages.length === 0) setInitialMessage(greeting);
  }, [messages.length, greeting, setInitialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-black/[0.05] bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow">
            <Zap className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 leading-tight">{t('title')}</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="btn-ghost !p-2 rounded-xl"
          aria-label="Close chat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, index) => (
          <ChatMessage key={msg.id || index} message={msg} />
        ))}

        {/* Starter questions */}
        {messages.length === 1 && !isLoading && starters.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {starters.map((q, i) => (
              <button
                key={i}
                onClick={() => !isLoading && sendMessage(q)}
                className="text-left px-3 py-1.5 surface rounded-xl text-xs font-medium text-gray-600 hover:text-indigo-700 hover:border-indigo-200/80 hover:bg-indigo-50/50 transition-all duration-200 shadow-none hover:shadow-soft"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 px-1">
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">Thinking…</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-sm">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800 font-medium text-xs">{t('error')}</p>
              <button
                className="mt-1 flex items-center gap-1 text-red-600 hover:underline font-semibold text-xs"
                onClick={() => {
                  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
                  if (lastUserMsg) sendMessage(lastUserMsg.content);
                }}
              >
                <RefreshCw className="w-3 h-3" /> {t('retry')}
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input */}
      <div className="p-3.5 border-t border-black/[0.05] bg-white/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('placeholder')}
            disabled={isLoading}
            className="flex-1 bg-gray-50/80 border border-gray-200/80 text-gray-900 text-sm rounded-xl pl-4 pr-3 py-2.5 focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-300 focus:bg-white transition-all disabled:opacity-50 placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-xl text-white disabled:opacity-40 transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            aria-label={t('sendBtn')}
          >
            <Send className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </form>
        <div className="flex items-center justify-center mt-2.5 gap-1">
          <Sparkles className="w-2.5 h-2.5 text-gray-300" />
          <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">{t('poweredBy')}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
