import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import ChatButton from './features/chat/ChatButton';

// Lazy-loaded pages
const HomePage      = React.lazy(() => import('./pages/HomePage'));
const JourneyPage   = React.lazy(() => import('./pages/JourneyPage'));
const GuidePage     = React.lazy(() => import('./pages/GuidePage'));
const ChecklistPage = React.lazy(() => import('./pages/ChecklistPage'));
const TimelinePage  = React.lazy(() => import('./pages/TimelinePage'));
const SimulatorPage = React.lazy(() => import('./pages/SimulatorPage'));
const LearnPage     = React.lazy(() => import('./pages/LearnPage'));
const PollingBoothPage = React.lazy(() => import('./pages/PollingBoothPage'));
const SettingsPage  = React.lazy(() => import('./pages/SettingsPage'));

// Pages that get the full sidebar layout
const APP_PATHS = ['/journey', '/guide', '/checklist', '/timeline', '/simulator', '/learn', '/polling', '/settings'];

const Spinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin opacity-60" />
  </div>
);

// Inner layout — switches between full-page (home) and app shell (everything else)
const AppShell = () => {
  const location = useLocation();
  const isAppPage = APP_PATHS.some(p => location.pathname.startsWith(p));

  if (!isAppPage) {
    // Landing page: no sidebar, no bottom nav, full width
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar home />
        <main className="flex-1">
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/"        element={<HomePage />} />
              <Route path="*"        element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    );
  }

  // App shell: sidebar + bottom nav + chat button
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-h-0 overflow-y-auto pb-24 md:pb-10 scroll-smooth">
          <div className="max-w-[720px] mx-auto px-4 py-6 sm:px-6">
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/journey"   element={<JourneyPage />} />
                <Route path="/guide"     element={<GuidePage />} />
                <Route path="/checklist" element={<ChecklistPage />} />
                <Route path="/timeline"  element={<TimelinePage />} />
                <Route path="/simulator" element={<SimulatorPage />} />
                <Route path="/learn"     element={<LearnPage />} />
                <Route path="/polling"   element={<PollingBoothPage />} />
                <Route path="/settings"  element={<SettingsPage />} />
                <Route path="*"          element={<Navigate to="/journey" replace />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
      <BottomNav />
      <ChatButton />
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}

export default App;
