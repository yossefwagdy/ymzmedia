import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const ServicesPage = () => {
  const { language, isRTL, t } = useLanguage();
  const MotionSection = motion.section;
  const MotionDiv = motion.div;

  return (
    <MotionSection
      className="container"
      style={{ paddingTop: '8rem', paddingBottom: '5rem' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <SEO
        title={t('navServices')}
        description={t('servicesSubtitle')}
        keywords="media services, social media management, video editing, content creation, brand strategy"
        image="/site.webmanifest"
      />

      <h1
        className="section-title"
        style={{
          fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
          marginBottom: '1rem'
        }}
      >
        {t('navServices')}
      </h1>
      <p style={{ opacity: 0.7, marginBottom: '2.5rem', maxWidth: '55ch' }}>{t('servicesSubtitle')}</p>

      <MotionDiv
        className="services-grid"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {servicesData.map((service, index) => (
          <Link
            key={service.id}
            to={`/services/${service.id}`}
            className="service-card"
            style={{
              display: 'block',
              textDecoration: 'none',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              animation: `fadeInUp 0.45s ease ${index * 0.08}s both`
            }}
          >
            <div
              style={{
                height: '160px',
                borderRadius: '14px',
                marginBottom: '1rem',
                background:
                  'radial-gradient(circle at 20% 20%, rgba(0,245,255,0.24), transparent 55%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.24), transparent 55%), rgba(5,5,16,0.95)',
                border: '1px solid rgba(0, 245, 255, 0.2)',
                display: 'grid',
                placeItems: 'center',
                color: 'rgba(255, 255, 255, 0.85)',
                fontWeight: 600
              }}
            >
              {service.mediaPlaceholder}
            </div>
            <h3 style={{ marginBottom: '0.7rem' }}>{service.title[language]}</h3>
            <p style={{ color: 'rgba(255,255,255,0.72)' }}>{service.description[language]}</p>
          </Link>
        ))}
      </MotionDiv>
    </MotionSection>
  );
};

export default ServicesPage;
