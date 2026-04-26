import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';

import ChatButton from './features/chat/ChatButton';

// Lazy loaded pages
const JourneyPage = React.lazy(() => import('./pages/JourneyPage'));
const GuidePage = React.lazy(() => import('./pages/GuidePage'));
const ChecklistPage = React.lazy(() => import('./pages/ChecklistPage'));
const TimelinePage = React.lazy(() => import('./pages/TimelinePage'));
const SimulatorPage = React.lazy(() => import('./pages/SimulatorPage'));
const LearnPage = React.lazy(() => import('./pages/LearnPage'));
const PollingBoothPage = React.lazy(() => import('./pages/PollingBoothPage'));

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans text-gray-900">
        <Navbar />
        
        <div className="flex flex-1">
          <Sidebar />
          
          <main className="flex-1 min-h-0 overflow-y-auto pb-24 md:pb-10 scroll-smooth">
            <div className="max-w-[720px] mx-auto px-4 py-6 sm:px-6 lg:px-8">
              <Suspense fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin opacity-60" />
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Navigate to="/journey" replace />} />
                  <Route path="/journey"   element={<JourneyPage />} />
                  <Route path="/guide"     element={<GuidePage />} />
                  <Route path="/checklist" element={<ChecklistPage />} />
                  <Route path="/timeline"  element={<TimelinePage />} />
                  <Route path="/simulator" element={<SimulatorPage />} />
                  <Route path="/learn"     element={<LearnPage />} />
                  <Route path="/polling"   element={<PollingBoothPage />} />
                  <Route path="*"          element={<Navigate to="/journey" replace />} />
                </Routes>
              </Suspense>
            </div>
          </main>
        </div>
        
        <BottomNav />
        <ChatButton />
      </div>
    </HashRouter>
  );
}

export default App;
