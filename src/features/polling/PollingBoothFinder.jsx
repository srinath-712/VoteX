import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { Search, Phone, ExternalLink, FileText } from 'lucide-react';

// Indian states and UTs list
const states = [
  "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", 
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const PollingBoothFinder = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', epic: '', state: '' });

  const t = (key) => getTranslation(`polling.${key}`, language);

  // In JavaScript, you can construct URL with basic standard query params for electoralsearch
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.epic) return;
    
    // Sample URL construction - electoralsearch has a specific payload, but a general fallback here
    const url = new URL('https://electoralsearch.eci.gov.in/');
    // Real implementation would likely send them to electoralsearch page and just inform them of what to enter
    // because ECI requires Captcha
    
    window.open(url.toString(), '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Form Card */}
      <div className="bg-white rounded-card shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900">
          <Search className="w-5 h-5 mr-2 text-primary" />
          {t('formTitle')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('nameLabel')}</label>
            <input 
              type="text" 
              className="w-full rounded-btn border-gray-300 focus:border-primary focus:ring-primary shadow-sm"
              placeholder={t('namePlaceholder')}
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('epicLabel')}</label>
            <input 
              type="text" 
              required
              className="w-full rounded-btn border-gray-300 focus:border-primary focus:ring-primary shadow-sm uppercase placeholder:normal-case"
              placeholder={t('epicPlaceholder')}
              value={formData.epic}
              onChange={e => setFormData({...formData, epic: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('stateLabel')}</label>
            <select 
              className="w-full rounded-btn border-gray-300 focus:border-primary focus:ring-primary shadow-sm"
              value={formData.state}
              onChange={e => setFormData({...formData, state: e.target.value})}
            >
              <option value="">{t('statePlaceholder')}</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full flex items-center justify-center py-3 px-4 bg-primary text-white rounded-btn font-medium hover:bg-blue-700 transition"
          >
            {t('submitBtn')} <ExternalLink className="w-4 h-4 ml-2" />
          </button>
        </form>
      </div>

      {/* Helpline Promo */}
      <div className="bg-amber-50 rounded-card p-4 flex items-center justify-between">
        <span className="text-amber-800 text-sm font-medium">{t('helplineText')}</span>
        <a href="tel:1950" className="flex items-center px-3 py-1.5 bg-amber-100 text-amber-900 rounded-btn font-semibold text-sm hover:bg-amber-200 transition">
          <Phone className="w-4 h-4 mr-1.5" />
          {t('helplineBtn')}
        </a>
      </div>

      {/* Alternate Docs Info Panel */}
      <div className="bg-gray-50 rounded-card p-6 border border-gray-200 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-gray-500" />
          {t('alternateDocsTitle')}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {t('alternateDocsIntro')}
        </p>
        <ul className="text-sm text-gray-700 space-y-2">
          {Array.isArray(t('docsList')) ? t('docsList').map((doc, idx) => (
             <li key={idx} className="flex items-center">
               <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
               {doc}
             </li>
          )) : (t('docsList')['en']||[]).map((doc, idx) => (
            <li key={idx} className="flex items-center">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
              {doc}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default PollingBoothFinder;
