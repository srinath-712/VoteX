import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { Map, BookOpen, CheckSquare, Clock, MonitorPlay, GraduationCap, MapPin } from 'lucide-react';

const Sidebar = () => {
  const { language } = useLanguage();

  const navItems = [
    { to: "/journey", icon: Map, labelPath: "app.nav.journey" },
    { to: "/guide", icon: BookOpen, labelPath: "app.nav.guide" },
    { to: "/checklist", icon: CheckSquare, labelPath: "app.nav.checklist" },
    { to: "/timeline", icon: Clock, labelPath: "app.nav.timeline" },
    { to: "/simulator", icon: MonitorPlay, labelPath: "app.nav.simulator" },
    { to: "/learn", icon: GraduationCap, labelPath: "app.nav.learn" },
    { to: "/polling", icon: MapPin, labelPath: "app.nav.pollingBooth" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)]">
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const labelMap = getTranslation(item.labelPath, language);
          const label = typeof labelMap === 'string' ? labelMap : labelMap[language] || labelMap['en'];

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-btn transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-primary'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
