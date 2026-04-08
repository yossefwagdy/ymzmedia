import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogData } from '../data/blogData';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const BlogPostPage = () => {
  const { id } = useParams();
  const { language, isRTL, t } = useLanguage();
  const post = blogData.find((item) => item.id === id);

  if (!post) {
    return (
      <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Post not found.</h1>
        <Link to="/blog" style={{ color: '#00f5ff' }}>
          {t('blogTitle')}
        </Link>
      </section>
    );
  }

  return (
    <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <SEO
        title={post.title[language]}
        description={post.excerpt[language]}
        keywords="ymz media insights, media production blog, content marketing"
        image={post.thumbnail}
      />

      <article className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}>
        <img
          src={post.thumbnail}
          alt={post.title[language]}
          style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '14px', marginBottom: '1.2rem' }}
        />
        <p style={{ fontSize: '0.9rem', color: 'rgba(226, 232, 240, 0.7)', marginBottom: '0.7rem' }}>
          {new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <h1 style={{ marginBottom: '1rem', lineHeight: 1.3 }}>{post.title[language]}</h1>
        <div style={{ display: 'grid', gap: '0.25rem' }}>
          {post.content[language].map((paragraph) => (
            <p key={paragraph} style={{ color: '#e2e8f0', lineHeight: 2, marginBottom: '1rem', fontSize: '1.03rem' }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div
          style={{
            marginTop: '1.1rem',
            border: '1px solid rgba(0,245,255,0.25)',
            background: 'linear-gradient(145deg, rgba(0,245,255,0.1), rgba(139,92,246,0.1))',
            borderRadius: '14px',
            padding: '1rem'
          }}
        >
          <p style={{ color: '#e2e8f0', lineHeight: 1.85, marginBottom: '0.8rem', fontWeight: 500 }}>
            {post.cta?.[language]}
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-block',
              padding: '0.6rem 1rem',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
              color: '#050510',
              fontWeight: 700
            }}
          >
            {language === 'ar' ? 'تواصل مع YMZ Media' : 'Contact YMZ Media'}
          </Link>
        </div>
      </article>
    </section>
  );
};

export default BlogPostPage;
