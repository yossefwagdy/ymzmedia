import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const SEO = ({
  title,
  description,
  keywords = '',
  image = '/og-image.jpg'
}) => {
  const location = useLocation();
  const { language } = useLanguage();

  const siteName = 'YMZ Media';
  const siteUrl =
    import.meta.env.VITE_SITE_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'https://example.com');

  const path = location.pathname || '/';
  const canonicalUrl = `${siteUrl}${path}`;

  const getAltHref = (lang) => {
    const url = new URL(canonicalUrl);
    url.searchParams.set('lang', lang);
    return url.toString();
  };

  const ogImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={getAltHref('en')} />
      <link rel="alternate" hrefLang="ar" href={getAltHref('ar')} />
      <link rel="alternate" hrefLang="x-default" href={getAltHref('en')} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={`${title} | ${siteName}`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content={language === 'ar' ? 'ar_AR' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ${siteName}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
};

export default SEO;
