import React from 'react';
import { Link } from 'react-router-dom';
import { blogData } from '../data/blogData';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const BlogPage = () => {
  const { language, isRTL, t } = useLanguage();

  return (
    <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <SEO
        title={t('blogTitle')}
        description={t('blogSubtitle')}
        keywords="ymz media blog, content strategy, video production, digital marketing"
        image="/site.webmanifest"
      />

      <h1 className="section-title" style={{ marginBottom: '1rem' }}>
        {t('blogTitle')}
      </h1>
      <p style={{ opacity: 0.7, marginBottom: '2.5rem', color: '#e2e8f0' }}>{t('blogSubtitle')}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {blogData.map((post) => (
          <article
            key={post.id}
            className="glass-card"
            style={{ padding: 0, overflow: 'hidden', textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}
          >
            <img
              src={post.thumbnail}
              alt={post.title[language]}
              loading="lazy"
              style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '1.2rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'rgba(226, 232, 240, 0.7)', marginBottom: '0.5rem' }}>
                {new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
              <h2 style={{ marginBottom: '0.8rem', lineHeight: 1.35 }}>{post.title[language]}</h2>
              <p style={{ color: '#e2e8f0', opacity: 0.92, marginBottom: '1rem', lineHeight: 1.75 }}>
                {post.excerpt[language]}
              </p>
              <Link to={`/blog/${post.id}`} style={{ color: '#00f5ff', fontWeight: 600 }}>
              {t('readArticle')}
            </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogPage;
