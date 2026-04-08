import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const AboutPage = () => {
  const { t, language, isRTL } = useLanguage();
  const MotionSection = motion.section;
  const MotionDiv = motion.div;

  const aboutContent = {
    en: {
      missionTitle: 'Our Mission',
      missionText:
        'To help ambitious brands grow through cinematic visual storytelling, measurable content systems, and high-performing digital campaigns.',
      visionTitle: 'Our Vision',
      visionText:
        'To become the region\'s most trusted media growth partner by blending bold creativity with disciplined performance strategy.',
      statsTitle: 'What We Have Built So Far',
      stats: [
        { label: 'Years in Media', value: '7+' },
        { label: 'Campaigns Delivered', value: '320+' },
        { label: 'Monthly Views Generated', value: '18M+' },
        { label: 'Client Retention', value: '92%' }
      ]
    },
    ar: {
      missionTitle: 'مهمتنا',
      missionText:
        'مساعدة العلامات الطموحة على النمو من خلال السرد البصري السينمائي، وأنظمة محتوى قابلة للقياس، وحملات رقمية عالية الأداء.',
      visionTitle: 'رؤيتنا',
      visionText:
        'أن نكون الشريك الإعلامي الأكثر ثقة في المنطقة عبر مزج الإبداع الجريء مع استراتيجية أداء منضبطة.',
      statsTitle: 'ما أنجزناه حتى الآن',
      stats: [
        { label: 'سنوات في المجال', value: '+7' },
        { label: 'حملة منفذة', value: '+320' },
        { label: 'مشاهدات شهرية', value: '+18M' },
        { label: 'استمرارية العملاء', value: '92%' }
      ]
    }
  };

  const content = aboutContent[language] || aboutContent.en;

  return (
    <MotionSection
      className="container"
      style={{ paddingTop: '8rem', paddingBottom: '5rem', direction: isRTL ? 'rtl' : 'ltr' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <SEO
        title={t('aboutTitle')}
        description={t('aboutText')}
        keywords="about ymz media, creative studio, digital storytelling"
        image="/site.webmanifest"
      />

      <MotionDiv
        className="glass-card"
        style={{ maxWidth: '900px' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h1 className="section-title" style={{ marginBottom: '1.2rem', textAlign: isRTL ? 'right' : 'left' }}>
          {t('aboutTitle')}
        </h1>
        <p style={{ opacity: 0.82, lineHeight: 1.9, color: '#e2e8f0', textAlign: isRTL ? 'right' : 'left' }}>
          {t('aboutText')}
        </p>

        <div
          style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem'
          }}
        >
          <div
            className="service-card"
            style={{
              textAlign: isRTL ? 'right' : 'left',
              borderColor: 'rgba(0, 245, 255, 0.25)',
              background: 'linear-gradient(145deg, rgba(0,245,255,0.12), rgba(255,255,255,0.01))'
            }}
          >
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.7rem' }}>{content.missionTitle}</h3>
            <p style={{ color: '#e2e8f0', opacity: 0.9, lineHeight: 1.8 }}>{content.missionText}</p>
          </div>

          <div
            className="service-card"
            style={{
              textAlign: isRTL ? 'right' : 'left',
              borderColor: 'rgba(139, 92, 246, 0.25)',
              background: 'linear-gradient(145deg, rgba(139,92,246,0.12), rgba(255,255,255,0.01))'
            }}
          >
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.7rem' }}>{content.visionTitle}</h3>
            <p style={{ color: '#e2e8f0', opacity: 0.9, lineHeight: 1.8 }}>{content.visionText}</p>
          </div>
        </div>

        <div style={{ marginTop: '2.2rem' }}>
          <h2
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '1.35rem',
              marginBottom: '1rem',
              color: '#00f5ff',
              textAlign: isRTL ? 'right' : 'left'
            }}
          >
            {content.statsTitle}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.9rem'
            }}
          >
            {content.stats.map((item) => (
              <div
                key={item.label}
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '14px',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.02)',
                  textAlign: isRTL ? 'right' : 'left'
                }}
              >
                <p
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    marginBottom: '0.2rem',
                    color: '#00f5ff'
                  }}
                >
                  {item.value}
                </p>
                <p style={{ color: '#e2e8f0', opacity: 0.82, fontSize: '0.92rem' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionDiv>
    </MotionSection>
  );
};

export default AboutPage;
