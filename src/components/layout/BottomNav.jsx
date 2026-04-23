import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { Map, BookOpen, CheckSquare, GraduationCap, Menu, X, Clock, MonitorPlay, MapPin } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const BottomNav = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const getLabel = (path) => {
    const map = getTranslation(path, language);
    return typeof map === 'string' ? map : map[language] || map['en'];
  };

  const mainItems = [
    { to: "/journey", icon: Map, labelPath: "app.nav.journey" },
    { to: "/guide", icon: BookOpen, labelPath: "app.nav.guide" },
    { to: "/checklist", icon: CheckSquare, labelPath: "app.nav.checklist" },
    { to: "/learn", icon: GraduationCap, labelPath: "app.nav.learn" },
  ];

  const moreItems = [
    { to: "/timeline", icon: Clock, labelPath: "app.nav.timeline" },
    { to: "/simulator", icon: MonitorPlay, labelPath: "app.nav.simulator" },
    { to: "/polling", icon: MapPin, labelPath: "app.nav.pollingBooth" },
  ];

  const isMoreActive = moreItems.some(item => location.pathname === item.to);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {mainItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] uppercase font-semibold tracking-wider">
                {getLabel(item.labelPath)}
              </span>
            </NavLink>
          );
        })}

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className={`flex flex-col items-center justify-center w-full h-full space-y-1 outline-none ${isMoreActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}`}>
               <Menu className="w-6 h-6" />
               <span className="text-[10px] uppercase font-semibold tracking-wider">{getLabel('app.nav.more')}</span>
            </button>
          </DropdownMenu.Trigger>
          
          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              className="bg-white rounded-card shadow-lg border border-gray-100 p-2 mb-2 w-48 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95"
              sideOffset={5}
              align="end"
            >
              {moreItems.map((item) => {
                 const Icon = item.icon;
                 return (
                   <DropdownMenu.Item
                     key={item.to}
                     onSelect={() => navigate(item.to)}
                     className={`flex items-center px-3 py-3 text-sm rounded-btn cursor-pointer outline-none ${
                        location.pathname === item.to ? 'bg-blue-50 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50'
                     }`}
                   >
                     <Icon className="w-5 h-5 mr-3" />
                     {getLabel(item.labelPath)}
                   </DropdownMenu.Item>
                 )
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

      </div>
    </nav>
  );
};

export default BottomNav;
