import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Sparkles } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 border ${
          isUser 
            ? 'ml-3 bg-blue-100 text-primary border-blue-200' 
            : 'mr-3 bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-600 border-indigo-100'
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
        </div>
        
        {/* Message Bubble */}
        <div className={`px-4 py-3 rounded-2xl shadow-sm text-[15px] leading-relaxed ${
          isUser 
            ? 'bg-primary text-white rounded-tr-sm' 
            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
        }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 text-gray-800">
              {message.content ? <ReactMarkdown>{message.content}</ReactMarkdown> : <span className="animate-pulse">...</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
