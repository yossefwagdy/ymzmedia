import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLanguage } from './context/LanguageContext';
import Layout from './components/Layout';
import Experience from './3d/ExperienceScene';
import LoadingScreen from './components/LoadingScreen';
import BackToTop from './components/BackToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isRTL } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Update document direction based on language
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = isRTL ? 'ar' : 'en';
  }, [isRTL]);

  return (
    <>
      {isLoading && <LoadingScreen />}
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
          <Canvas>
            <Experience />
          </Canvas>
        </div>
      </Layout>
      <BackToTop />
    </>
  );
}

export default App;
