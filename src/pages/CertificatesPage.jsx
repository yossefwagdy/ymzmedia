import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { certificatesData } from '../data/certificatesData';
import { useLanguage } from '../context/LanguageContext';

const CertificatesPage = () => {
  const { language, isRTL, t } = useLanguage();

  return (
    <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem', direction: isRTL ? 'rtl' : 'ltr' }}>
      <SEO
        title={t('navCertificates')}
        description={t('certificatesSubtitle')}
        keywords="YMZ certifications, Google certificates, YouTube certifications"
        image="/site.webmanifest"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h1 className="section-title" style={{ marginBottom: '1rem', textAlign: isRTL ? 'right' : 'left' }}>
          {t('navCertificates')}
        </h1>
        <p style={{ color: '#e2e8f0', opacity: 0.9, marginBottom: '2rem', lineHeight: 1.8, textAlign: isRTL ? 'right' : 'left' }}>
          {t('certificatesSubtitle')}
        </p>
      </motion.div>

      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem'
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08
            }
          }
        }}
      >
        {certificatesData.map((certificate) => {
          const isGoogle = certificate.platform === 'google';

          return (
            <motion.article
              key={certificate.id}
              className="service-card"
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                minHeight: '220px',
                border: `1px solid ${isGoogle ? 'rgba(0,245,255,0.3)' : 'rgba(255,0,60,0.28)'}`,
                background: isGoogle
                  ? 'linear-gradient(145deg, rgba(0,245,255,0.12), rgba(255,255,255,0.01))'
                  : 'linear-gradient(145deg, rgba(255,0,60,0.12), rgba(255,255,255,0.01))',
                textAlign: isRTL ? 'right' : 'left'
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  marginBottom: '0.85rem',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 800,
                  letterSpacing: '0.03em',
                  background: isGoogle
                    ? 'linear-gradient(135deg, rgba(0,245,255,0.25), rgba(139,92,246,0.25))'
                    : 'linear-gradient(135deg, rgba(255,0,60,0.25), rgba(255,0,170,0.25))',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#ffffff'
                }}
              >
                {isGoogle ? 'G' : 'YT'}
              </div>

              <h2 style={{ fontSize: '1.15rem', lineHeight: 1.45, marginBottom: '0.65rem' }}>
                {certificate.title[language]}
              </h2>

              <p style={{ color: '#e2e8f0', opacity: 0.9, lineHeight: 1.8, fontSize: '0.97rem', marginBottom: '0.9rem' }}>
                {certificate.description[language]}
              </p>

              <p
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: isGoogle ? '#00f5ff' : '#ff5c7f',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                {certificate.provider}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export default CertificatesPage;
