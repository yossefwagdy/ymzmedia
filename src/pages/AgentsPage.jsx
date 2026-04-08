import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const AgentsPage = () => {
  const { t, language, isRTL } = useLanguage();

  const agents = [
    {
      name: language === 'ar' ? 'ليان طارق' : 'Layan Tarek',
      role: language === 'ar' ? 'مديرة استراتيجية المحتوى' : 'Content Strategy Lead',
      photo:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
      socials: {
        linkedin: '#',
        instagram: '#'
      }
    },
    {
      name: language === 'ar' ? 'عمر شريف' : 'Omar Sherif',
      role: language === 'ar' ? 'مخرج فيديو أول' : 'Senior Video Director',
      photo:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      socials: {
        linkedin: '#',
        instagram: '#'
      }
    },
    {
      name: language === 'ar' ? 'سارة نادر' : 'Sara Nader',
      role: language === 'ar' ? 'متخصصة أداء رقمي' : 'Performance Marketing Specialist',
      photo:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
      socials: {
        linkedin: '#',
        instagram: '#'
      }
    },
    {
      name: language === 'ar' ? 'يوسف عادل' : 'Youssef Adel',
      role: language === 'ar' ? 'مصمم موشن جرافيك' : 'Motion Graphics Designer',
      photo:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      socials: {
        linkedin: '#',
        instagram: '#'
      }
    }
  ];

  return (
    <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem', direction: isRTL ? 'rtl' : 'ltr' }}>
      <SEO
        title={t('agentsTitle')}
        description={t('agentsText')}
        keywords="team, media agency experts, creative team"
        image="/site.webmanifest"
      />

      <h1 className="section-title" style={{ marginBottom: '1rem', textAlign: isRTL ? 'right' : 'left' }}>
        {t('agentsTitle')}
      </h1>
      <p style={{ opacity: 0.9, marginBottom: '2rem', maxWidth: '60ch', color: '#e2e8f0', textAlign: isRTL ? 'right' : 'left' }}>
        {t('agentsText')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {agents.map((agent, index) => (
          <motion.article
            key={agent.name}
            className="service-card"
            style={{ minHeight: '260px', padding: '1rem', textAlign: isRTL ? 'right' : 'left' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              src={agent.photo}
              alt={agent.name}
              loading="lazy"
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '0.9rem',
                border: '1px solid rgba(255,255,255,0.14)'
              }}
            />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{agent.name}</h3>
            <p style={{ color: '#e2e8f0', opacity: 0.86, marginBottom: '0.8rem' }}>{agent.role}</p>

            <div style={{ display: 'flex', gap: '0.7rem', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              <a
                href={agent.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#00f5ff', fontSize: '0.88rem', fontWeight: 600 }}
              >
                LinkedIn
              </a>
              <a
                href={agent.socials.instagram}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#8b5cf6', fontSize: '0.88rem', fontWeight: 600 }}
              >
                Instagram
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default AgentsPage;
