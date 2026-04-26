import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations';
import { Map, BookOpen, CheckSquare, GraduationCap, MoreHorizontal, Clock, MonitorPlay, MapPin, X } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const mainItems = [
  { to: '/journey',   icon: Map,          labelPath: 'app.nav.journey'   },
  { to: '/guide',     icon: BookOpen,     labelPath: 'app.nav.guide'     },
  { to: '/checklist', icon: CheckSquare,  labelPath: 'app.nav.checklist' },
  { to: '/learn',     icon: GraduationCap,labelPath: 'app.nav.learn'     },
];

const moreItems = [
  { to: '/timeline',  icon: Clock,        labelPath: 'app.nav.timeline'    },
  { to: '/simulator', icon: MonitorPlay,  labelPath: 'app.nav.simulator'   },
  { to: '/polling',   icon: MapPin,       labelPath: 'app.nav.pollingBooth'},
];

const BottomNav = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const getLabel = (path) => getTranslation(path, language);
  const isMoreActive = moreItems.some(item => location.pathname === item.to);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-black/[0.06] shadow-up pb-safe">
      <div className="flex justify-around items-center h-16 px-1">
        {mainItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200 ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 ${
                    isActive ? 'bg-indigo-50 shadow-[0_0_0_1.5px_rgba(99,102,241,0.2)]' : ''
                  }`}>
                    <Icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
                  </span>
                  <span className="text-[9px] font-semibold tracking-wider uppercase leading-none">
                    {getLabel(item.labelPath)}
                  </span>
                  {isActive && (
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* More dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className={`relative flex flex-col items-center justify-center gap-1 flex-1 h-full outline-none transition-all duration-200 ${
              isMoreActive ? 'text-primary' : 'text-gray-400 hover:text-gray-700'
            }`}>
              <span className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 ${isMoreActive ? 'bg-indigo-50' : ''}`}>
                <MoreHorizontal className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-semibold tracking-wider uppercase leading-none">
                {getLabel('app.nav.more')}
              </span>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="glass border border-black/[0.07] rounded-2xl shadow-card p-2 mb-3 w-52 animate-slide-up-fade origin-bottom-right"
              sideOffset={8}
              align="end"
            >
              <p className="px-3 py-1.5 text-2xs text-gray-400 font-semibold uppercase tracking-widest">More pages</p>
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <DropdownMenu.Item
                    key={item.to}
                    onSelect={() => navigate(item.to)}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl cursor-pointer outline-none transition-all duration-150 ${
                      isActive
                        ? 'bg-indigo-50 text-primary font-semibold'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className={`flex items-center justify-center w-7 h-7 rounded-lg ${
                      isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {getLabel(item.labelPath)}
                  </DropdownMenu.Item>
                );
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

      </div>
    </nav>
  );
};

export default BottomNav;
