import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import {
  BrandStrategyServiceLanding,
  ContentCreationServiceLanding,
  SocialMediaServiceLanding,
  VideoProductionServiceLanding
} from './ServiceLandingPages';

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const { language, isRTL, t } = useLanguage();
  const service = servicesData.find((item) => item.id === id);

  if (id === 'video-production-editing') {
    return <VideoProductionServiceLanding />;
  }

  if (id === 'social-media-management') {
    return <SocialMediaServiceLanding />;
  }

  if (id === 'content-creation') {
    return <ContentCreationServiceLanding />;
  }

  if (id === 'brand-strategy') {
    return <BrandStrategyServiceLanding />;
  }

  if (!service) {
    return (
      <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>{t('serviceNotFound')}</h1>
        <Link to="/services" style={{ color: '#00f5ff' }}>
          {t('browseServices')}
        </Link>
      </section>
    );
  }

  return (
    <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div
        className="glass-card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              marginBottom: '1rem',
              lineHeight: 1.15
            }}
          >
            {service.title[language]}
          </h1>
          <p style={{ opacity: 0.78, lineHeight: 1.8, marginBottom: '1.5rem' }}>
            {service.description[language]}
          </p>

          <h2
            style={{
              fontSize: '1.2rem',
              color: '#00f5ff',
              marginBottom: '0.8rem',
              fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif'
            }}
          >
            {t('serviceBenefits')}
          </h2>
          <ul style={{ paddingInlineStart: '1.2rem' }}>
            {service.benefits[language].map((benefit) => (
              <li key={benefit} style={{ marginBottom: '0.6rem', opacity: 0.86 }}>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p style={{ marginBottom: '0.8rem', color: '#8b5cf6', fontWeight: 600 }}>{t('mediaPreview')}</p>
          <div
            style={{
              minHeight: '280px',
              borderRadius: '18px',
              border: '1px solid rgba(255,255,255,0.12)',
              background:
                service.mediaType === 'video'
                  ? 'linear-gradient(145deg, rgba(255,0,170,0.18), rgba(5,5,16,0.95))'
                  : 'linear-gradient(145deg, rgba(0,245,255,0.18), rgba(5,5,16,0.95))',
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center',
              padding: '1.5rem',
              fontWeight: 600
            }}
          >
            {service.mediaType === 'video' ? 'Video Placeholder' : 'Image Placeholder'}
            <br />
            <span style={{ opacity: 0.7, fontWeight: 400 }}>{service.mediaPlaceholder}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsPage;
