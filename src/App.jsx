import React, { useState, useEffect, lazy, Suspense, memo } from 'react';
import { useLanguage } from './context/LanguageContext';

// Lazy load ALL heavy components
const Layout = lazy(() => import('./components/Layout'));
const BackToTop = lazy(() => import('./components/BackToTop'));

// Super lazy load 3D - only after everything else is ready
const Canvas = lazy(() =>
  import('@react-three/fiber').then(mod => ({ default: mod.Canvas }))
);
const Experience = lazy(() => import('./3d/ExperienceScene'));

// Lightweight loading screen - pure CSS, no libraries
const LoadingScreen = memo(() => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #030308 0%, #0a0a1a 50%, #050510 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}
  >
    <div
      style={{
        fontSize: 'clamp(2rem, 5vw, 4rem)',
        fontWeight: '900',
        fontFamily: 'Outfit, Inter, sans-serif',
        background: 'linear-gradient(135deg, #00f5ff, #8b5cf6, #ff00aa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '2rem',
      }}
    >
      YMZ MEDIA
    </div>
    <div style={{
      width: '200px',
      height: '3px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
    }}>
      <div
        style={{
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, #00f5ff, #8b5cf6, transparent)',
          borderRadius: '10px',
          animation: 'loading 1s ease-in-out infinite',
        }}
      />
    </div>
    <style>{`
      @keyframes loading {
        0% { transform: translateX(-200%); }
        100% { transform: translateX(200%); }
      }
    `}</style>
  </div>
));

// Canvas loader - shows while 3D loads
const CanvasLoader = memo(() => (
  <div style={{
    position: 'fixed',
    inset: 0,
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    pointerEvents: 'none',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(0, 245, 255, 0.2)',
      borderTopColor: '#00f5ff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
));

// Layout fallback
const LayoutFallback = memo(() => (
  <div style={{
    minHeight: '100vh',
    background: '#050510',
  }} />
));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const { isRTL } = useLanguage();

  useEffect(() => {
    // Fast initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Defer 3D canvas loading significantly
  useEffect(() => {
    if (!isLoading) {
      // Use requestIdleCallback for non-critical 3D loading
      const loadCanvas = () => {
        setShowCanvas(true);
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadCanvas, { timeout: 2000 });
      } else {
        setTimeout(loadCanvas, 500);
      }
    }
  }, [isLoading]);

  // Update document direction
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = isRTL ? 'ar' : 'en';
  }, [isRTL]);

  return (
    <>
      {isLoading && <LoadingScreen />}

      <Suspense fallback={<LayoutFallback />}>
        <Layout>
          <div
            className="canvas-container"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          >
            {showCanvas && (
              <Suspense fallback={<CanvasLoader />}>
                <Canvas
                  gl={{
                    antialias: false, // Disable for better performance
                    powerPreference: 'high-performance',
                    alpha: false,
                  }}
                  dpr={[1, 1.5]} // Limit device pixel ratio
                  performance={{ min: 0.5 }} // Allow frame rate drops
                >
                  <Experience />
                </Canvas>
              </Suspense>
            )}
          </div>
        </Layout>
      </Suspense>

      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </>
  );
}

export default App;
