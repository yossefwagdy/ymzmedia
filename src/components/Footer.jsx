import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t, isRTL } = useLanguage();

  const links = [
    { to: '/', label: t('navHome') },
    { to: '/services', label: t('navServices') },
    { to: '/blog', label: t('navBlog') },
    { to: '/about', label: t('navAbout') },
    { to: '/agents', label: t('navAgents') },
    { to: '/contact', label: t('navContact') }
  ];

  return (
    <footer
      style={{
        marginTop: '4rem',
        background:
          'linear-gradient(180deg, rgba(5, 5, 16, 0.4) 0%, rgba(5, 5, 16, 0.96) 40%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div
        className="container"
        style={{
          paddingTop: '3rem',
          paddingBottom: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          textAlign: isRTL ? 'right' : 'left'
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '1.8rem',
              marginBottom: '1rem',
              fontFamily: 'Outfit, Inter, sans-serif',
              background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            YMZ Media
          </h3>
          <p style={{ opacity: 0.7, maxWidth: '36ch' }}>{t('footerTagline')}</p>
        </div>

        <div>
          <h4 style={{ color: '#00f5ff', marginBottom: '0.9rem' }}>{t('quickLinks')}</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {links.map((item) => (
              <li key={item.to} style={{ marginBottom: '0.5rem' }}>
                <Link to={item.to} style={{ opacity: 0.8 }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#8b5cf6', marginBottom: '0.9rem' }}>{t('followUs')}</h4>
          <a
            href="https://instagram.com/ymz.media"
            target="_blank"
            rel="noopener noreferrer"
            style={{ opacity: 0.7, marginBottom: '0.5rem', display: 'block' }}
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/ymz-media/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ opacity: 0.7, marginBottom: '0.5rem', display: 'block' }}
          >
            LinkedIn
          </a>
          <a
            href="https://tiktok.com/ymzmediaeg"
            target="_blank"
            rel="noopener noreferrer"
            style={{ opacity: 0.7, marginBottom: '0.5rem', display: 'block' }}
          >
            TikTok
          </a>
          <a
            href="https://www.facebook.com/ymzmedia"
            target="_blank"
            rel="noopener noreferrer"
            style={{ opacity: 0.7, display: 'block' }}
          >
            Facebook
          </a>
        </div>
      </div>

      <div
        className="container"
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1rem',
          paddingBottom: '1.4rem',
          textAlign: 'center',
          opacity: 0.6,
          fontSize: '0.9rem'
        }}
      >
        © {new Date().getFullYear()} YMZ Media. {t('allRights')}
      </div>
    </footer>
  );
};

export default Footer;
