import React from 'react';
import Overlay from '../components/Overlay';
import BackToTop from '../components/BackToTop';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
  const { language } = useLanguage();

  return (
    <div className="home-page" style={{ minHeight: '100vh', width: '100%', position: 'relative', overflowY: 'auto' }}>
      <SEO
        title={language === 'ar' ? 'الرئيسية' : 'Home'}
        description={
          language === 'ar'
            ? 'نرتقي بالعلامات التجارية عبر إنتاج بصري إبداعي واستراتيجية نمو رقمية.'
            : 'We elevate brands through cinematic visual production and digital growth strategy.'
        }
        keywords="YMZ Media, video production, social media, content creation"
        image="/site.webmanifest"
      />
      <div className="home-page-content" style={{ position: 'relative', zIndex: 2 }}>
        <Overlay />
      </div>
      <BackToTop />
    </div>
  );
};

export default HomePage;
