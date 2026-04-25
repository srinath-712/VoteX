import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { Search, Book } from 'lucide-react';

const Glossary = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  const rawTerms = getTranslation('learn.glossary.terms', language);
  const enTerms = getTranslation('learn.glossary.terms', 'en');
  const terms = (rawTerms && rawTerms.length > 0) ? rawTerms : (enTerms || []);
  
  const placeholder = getTranslation('learn.glossary.searchPlaceholder', language) || "Search terms...";
  const emptyState = getTranslation('learn.glossary.emptyState', language) || "No terms found.";

  const filteredTerms = terms.filter(t => 
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <input 
          type="text" 
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-primary shadow-sm transition-all"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
      </div>

      <div className="space-y-4">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item, idx) => (
            <div key={idx} className="bg-white rounded-card p-5 border border-gray-100 shadow-sm hover:border-gray-200 transition-colors group">
              <h3 className="text-lg font-bold text-primary mb-2 flex items-center">
                <Book className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                {item.term}
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px]">{item.definition}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
             <p className="text-gray-500 font-medium">{emptyState}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Glossary;
