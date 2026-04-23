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
      <div className="min-h-screen bg-background flex flex-col font-sans text-gray-900">
        <Navbar />
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          
          <main className="flex-1 w-full max-w-[720px] mx-auto overflow-y-auto pb-24 md:pb-8 scroll-smooth">
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Navigate to="/journey" replace />} />
                <Route path="/journey" element={<JourneyPage />} />
                <Route path="/guide" element={<GuidePage />} />
                <Route path="/checklist" element={<ChecklistPage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/simulator" element={<SimulatorPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/polling" element={<PollingBoothPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
        
        <BottomNav />
        <ChatButton />
      </div>
    </HashRouter>
  );
}

export default App;
