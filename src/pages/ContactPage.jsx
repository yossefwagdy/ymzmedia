import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const ContactPage = () => {
  const { t, language, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const labels = {
    en: {
      formTitle: 'Send Us Your Brief',
      name: 'Name',
      email: 'Email',
      service: 'Service Needed',
      message: 'Message',
      submit: 'Send Message',
      selectService: 'Select a service',
      services: ['Social Media Management', 'Video Production', 'Content Creation', 'Brand Strategy'],
      locationTitle: 'Our Location',
      locationText: 'Nasr City, Cairo, Egypt',
      socialTitle: 'Follow Us',
      success: 'Success! Message Sent. Our team will reach out shortly.'
    },
    ar: {
      formTitle: 'أرسل لنا متطلباتك',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      service: 'الخدمة المطلوبة',
      message: 'الرسالة',
      submit: 'إرسال الرسالة',
      selectService: 'اختر خدمة',
      services: ['إدارة السوشيال ميديا', 'إنتاج الفيديو', 'صناعة المحتوى', 'استراتيجية العلامة'],
      locationTitle: 'موقعنا',
      locationText: 'مدينة نصر، القاهرة، مصر',
      socialTitle: 'تابعنا',
      success: 'تم الإرسال بنجاح! وصلتنا رسالتك وسيتواصل فريقنا قريبًا.'
    }
  };

  const content = labels[language] || labels.en;

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = true;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = true;
    if (!formData.service) nextErrors.service = true;
    if (!formData.message.trim() || formData.message.trim().length < 12) nextErrors.message = true;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError('');

    const formPayload = {
      // Paste your Web3Forms key below.
      access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
      subject:
        language === 'ar'
          ? 'طلب جديد من موقع YMZ Media'
          : 'New YMZ Media Website Inquiry',
      from_name: formData.name,
      email: formData.email,
      service_needed: formData.service,
      message: formData.message,
      to_email: 'yossefwagdybusiness@gmail.com'
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formPayload)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', service: '', message: '' });
        setErrors({});
      } else {
        setSubmitError(
          language === 'ar'
            ? 'تعذر إرسال الرسالة الآن. يرجى المحاولة مرة أخرى.'
            : 'Unable to send your message right now. Please try again.'
        );
      }
    } catch {
      setSubmitError(
        language === 'ar'
          ? 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.'
          : 'A network error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem', direction: isRTL ? 'rtl' : 'ltr' }}>
      <SEO
        title={t('contactTitle')}
        description={t('contactText')}
        keywords="contact ymz media, media production quote, digital campaign strategy"
        image="/site.webmanifest"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          alignItems: 'start'
        }}
      >
        <div className="glass-card" style={{ maxWidth: '100%', textAlign: isRTL ? 'right' : 'left' }}>
          <h1 className="section-title" style={{ marginBottom: '1rem' }}>
            {t('contactTitle')}
          </h1>
          <p style={{ color: '#e2e8f0', marginBottom: '1.6rem', lineHeight: 1.8 }}>{t('contactText')}</p>

          <h2 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: '#00f5ff' }}>{content.formTitle}</h2>

          <form onSubmit={onSubmit} noValidate>
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE" />
              <input
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder={content.name}
                style={{
                  borderRadius: '12px',
                  border: `1px solid ${errors.name ? '#ff3b5c' : 'rgba(255,255,255,0.2)'}`,
                  background: 'rgba(255,255,255,0.03)',
                  color: '#e2e8f0',
                  padding: '0.85rem 0.95rem',
                  outline: 'none'
                }}
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                placeholder={content.email}
                style={{
                  borderRadius: '12px',
                  border: `1px solid ${errors.email ? '#ff3b5c' : 'rgba(255,255,255,0.2)'}`,
                  background: 'rgba(255,255,255,0.03)',
                  color: '#e2e8f0',
                  padding: '0.85rem 0.95rem',
                  outline: 'none'
                }}
              />

              <select
                name="service"
                value={formData.service}
                onChange={onChange}
                style={{
                  borderRadius: '12px',
                  border: `1px solid ${errors.service ? '#ff3b5c' : 'rgba(255,255,255,0.2)'}`,
                  background: 'rgba(255,255,255,0.03)',
                  color: '#e2e8f0',
                  padding: '0.85rem 0.95rem',
                  outline: 'none'
                }}
              >
                <option value="">{content.selectService}</option>
                {content.services.map((serviceName) => (
                  <option key={serviceName} value={serviceName}>
                    {serviceName}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={onChange}
                placeholder={content.message}
                rows={5}
                style={{
                  borderRadius: '12px',
                  border: `1px solid ${errors.message ? '#ff3b5c' : 'rgba(255,255,255,0.2)'}`,
                  background: 'rgba(255,255,255,0.03)',
                  color: '#e2e8f0',
                  padding: '0.85rem 0.95rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  display: 'inline-block',
                  padding: '0.85rem 1.3rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
                  color: '#050510',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  justifySelf: isRTL ? 'start' : 'end',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? (language === 'ar' ? 'جارٍ الإرسال...' : 'Sending...') : content.submit}
              </button>
            </div>
          </form>

          {submitted && (
            <div
              style={{
                marginTop: '1rem',
                border: '1px solid rgba(0,245,255,0.35)',
                borderRadius: '12px',
                background: 'linear-gradient(145deg, rgba(0,245,255,0.15), rgba(139,92,246,0.15))',
                padding: '0.9rem 1rem'
              }}
            >
              <p style={{ color: '#e2e8f0', fontWeight: 700, lineHeight: 1.7 }}>{content.success}</p>
            </div>
          )}

          {submitError && (
            <p style={{ marginTop: '0.9rem', color: '#ff7c91', fontWeight: 600, lineHeight: 1.7 }}>
              {submitError}
            </p>
          )}
        </div>

        <div className="glass-card" style={{ maxWidth: '100%', textAlign: isRTL ? 'right' : 'left' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '0.6rem', color: '#8b5cf6' }}>{content.locationTitle}</h2>
          <p style={{ color: '#e2e8f0', lineHeight: 1.8, marginBottom: '1.2rem' }}>{content.locationText}</p>

          <iframe
            title="YMZ Media Location"
            src="https://maps.google.com/maps?q=Nasr%20City%20Cairo&t=&z=12&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            style={{
              width: '100%',
              height: '220px',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '14px',
              marginBottom: '1.2rem'
            }}
          />

          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.6rem', color: '#00f5ff' }}>{content.socialTitle}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
            {[
              { label: 'Instagram', url: 'https://instagram.com/ymz.media' },
              { label: 'LinkedIn', url: 'https://www.linkedin.com/company/ymz-media/' },
              { label: 'TikTok', url: 'https://tiktok.com/ymzmediaeg' },
              { label: 'Facebook', url: 'https://www.facebook.com/ymzmedia' }
            ].map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: '999px',
                  padding: '0.45rem 0.8rem',
                  color: '#e2e8f0',
                  fontSize: '0.88rem'
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
