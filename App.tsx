
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import type { MomentumMap } from './services/geminiService';

// Lazy load all page components from the new `pages` directory.
const HomePage = lazy(() => import('./pages/HomePage'));
const MapsPage = lazy(() => import('./pages/MapsPage'));
const NewTaskPage = lazy(() => import('./pages/NewTaskPage'));
const GeneratedMapPage = lazy(() => import('./pages/GeneratedMapPage'));


// Feature flag to toggle between URL-based routing and legacy state-based routing.
// Defaulting to false as per instructions to keep legacy routing active until QA sign-off.
const useUrlRouting = false;

// A simple, unstyled fallback component to show while lazy-loaded components are fetched.
const LoadingFallback = () => (
    <div className="w-full flex justify-center items-center py-40">
        <div className="text-center">
            <p className="text-lg text-text-on-light-muted">Loading...</p>
        </div>
    </div>
);

export interface GeneratedMapData {
  goal: string;
  map: MomentumMap;
}

const App: React.FC = () => {
  // --- Legacy State-based Routing ---
  const [currentPage, setCurrentPage] = useState('home');

  // --- New URL-based Routing ---
  const [path, setPath] = useState(window.location.pathname);

  // --- State for the AI-generated map ---
  const [generatedMapData, setGeneratedMapData] = useState<GeneratedMapData | null>(null);

  // Effect to handle browser back/forward navigation events for URL routing
  useEffect(() => {
    if (!useUrlRouting) return;

    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []); // Run only once on mount

  // Unified navigation function that handles both routing methods
  const navigate = (page: string) => {
    if (useUrlRouting) {
      const newPath = page === 'home' ? '/' : `/${page}`;
      // Prevent pushing the same path multiple times to history
      if (window.location.pathname !== newPath) {
        window.history.pushState({ page: newPath }, '', newPath);
      }
      setPath(newPath); // Update state to trigger re-render
    } else {
      setCurrentPage(page);
    }
  };
  
  const renderContent = () => {
    if (useUrlRouting) {
      // New routing logic based on URL path
      switch (path) {
        case '/':
        case '/home':
          return (
            <ErrorBoundary>
              <HomePage navigate={navigate} />
            </ErrorBoundary>
          );
        case '/maps':
          return (
            <ErrorBoundary>
              <MapsPage />
            </ErrorBoundary>
          );
        case '/newTask':
          return (
            <ErrorBoundary>
              <NewTaskPage setGeneratedMapData={setGeneratedMapData} navigate={navigate} />
            </ErrorBoundary>
          );
        case '/generated-map':
            return (
                <ErrorBoundary>
                    <GeneratedMapPage generatedMapData={generatedMapData} navigate={navigate} />
                </ErrorBoundary>
            );
        default:
          // Fallback for any unknown routes, renders the home page
          return (
            <ErrorBoundary>
              <HomePage navigate={navigate} />
            </ErrorBoundary>
          );
      }
    } else {
      // Legacy rendering logic based on component state
      switch (currentPage) {
        case 'home':
          return <HomePage navigate={navigate} />;
        case 'maps':
          return <MapsPage />;
        case 'newTask':
          return <NewTaskPage setGeneratedMapData={setGeneratedMapData} navigate={navigate} />;
        case 'generated-map':
            return <GeneratedMapPage generatedMapData={generatedMapData} navigate={navigate} />;
        default:
          return <HomePage navigate={navigate} />;
      }
    }
  };

  return (
    <div className="min-h-screen w-full">
      <Header navigate={navigate} />
      <main className="flex items-center justify-center py-8 sm:py-12 md:py-16">
        <Suspense fallback={<LoadingFallback />}>
          {renderContent()}
        </Suspense>
      </main>
    </div>
  );
};

export default App;
