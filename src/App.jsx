import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useLanguage } from './context/LanguageContext';
import Layout from './components/Layout';
import BackToTop from './components/BackToTop';

// Lazy load heavy 3D components
const Canvas = lazy(() => import('@react-three/fiber').then(mod => ({ default: mod.Canvas })));
const Experience = lazy(() => import('./3d/ExperienceScene'));

// Lightweight loading fallback
const CanvasLoader = () => (
  <div style={{
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(135deg, #030308 0%, #0a0a1a 50%, #050510 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
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
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const { isRTL } = useLanguage();

  useEffect(() => {
    // Reduce initial loading delay for faster LCP
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Reduced from 2500ms to 800ms
    return () => clearTimeout(timer);
  }, []);

  // Defer 3D canvas loading until after main content is visible
  useEffect(() => {
    if (!isLoading) {
      // Wait for next frame before loading heavy 3D content
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShowCanvas(true);
        });
      });
    }
  }, [isLoading]);

  // Update document direction based on language
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = isRTL ? 'ar' : 'en';
  }, [isRTL]);

  return (
    <>
      {/* Simple CSS-only loading screen for better LCP */}
      {isLoading && (
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
            transition: 'opacity 0.3s ease',
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
      )}

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
              <Canvas>
                <Experience />
              </Canvas>
            </Suspense>
          )}
        </div>
      </Layout>
      <BackToTop />
    </>
  );
}

export default App;
