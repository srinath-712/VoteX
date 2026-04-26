import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { Map, BookOpen, CheckSquare, Clock, MonitorPlay, GraduationCap, MapPin } from 'lucide-react';

const navItems = [
  { to: '/journey',   icon: Map,         labelPath: 'app.nav.journey',     desc: 'Your voting path' },
  { to: '/guide',     icon: BookOpen,    labelPath: 'app.nav.guide',       desc: 'How voting works' },
  { to: '/checklist', icon: CheckSquare, labelPath: 'app.nav.checklist',   desc: 'Pre-poll prep' },
  { to: '/timeline',  icon: Clock,       labelPath: 'app.nav.timeline',    desc: 'Election schedule' },
  { to: '/simulator', icon: MonitorPlay, labelPath: 'app.nav.simulator',   desc: 'Practice voting' },
  { to: '/learn',     icon: GraduationCap,labelPath:'app.nav.learn',       desc: 'Quiz & glossary' },
  { to: '/polling',   icon: MapPin,      labelPath: 'app.nav.pollingBooth',desc: 'Find your booth' },
];

const Sidebar = () => {
  const { language } = useLanguage();

  return (
    <aside className="hidden md:flex flex-col w-[220px] shrink-0 border-r border-black/[0.06] bg-white/40 backdrop-blur-sm h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto">
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="px-3 pt-1 pb-2 text-2xs text-gray-400 font-semibold uppercase tracking-widest">Navigation</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const label = getTranslation(item.labelPath, language);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-50 text-primary shadow-[0_0_0_1px_rgba(99,102,241,0.15)]'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-primary text-white shadow-glow' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom badge */}
      <div className="p-4 border-t border-black/[0.05]">
        <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100/60 p-3 text-center">
          <p className="text-xs font-semibold text-indigo-700">Every vote matters</p>
          <p className="text-2xs text-gray-500 mt-0.5">Make yours count 🗳️</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
