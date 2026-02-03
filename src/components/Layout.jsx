import React, { memo, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Layout = memo(({ children }) => {
    const { language, isRTL, t, toggleLanguage } = useLanguage();
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        // Animate header on mount
        const timer = setTimeout(() => setHeaderVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const navItems = [
        { label: t('services'), id: 'services' },
        { label: t('portfolio'), id: 'portfolio' },
        { label: t('testimonials'), id: 'testimonials' },
        { label: t('contact'), id: 'contact' },
    ];

    return (
        <div className="layout" dir={isRTL ? 'rtl' : 'ltr'}>
            <header
                className="header"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: 'linear-gradient(180deg, rgba(5, 5, 16, 0.9) 0%, rgba(5, 5, 16, 0.7) 70%, transparent 100%)',
                    backdropFilter: 'blur(10px)',
                    transform: headerVisible ? 'translateY(0)' : 'translateY(-100px)',
                    opacity: headerVisible ? 1 : 0,
                    transition: 'transform 0.8s ease, opacity 0.8s ease',
                }}
            >
                <div className="container flex-center" style={{
                    justifyContent: 'space-between',
                    height: '80px',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 2rem',
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                }}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="logo"
                        style={{
                            fontFamily: 'Outfit, Inter, sans-serif',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        YMZ Media
                    </a>

                    <nav className="nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <ul className="flex-center" style={{
                            gap: '1.5rem',
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                        }}>
                            {navItems.map((item, index) => (
                                <li
                                    key={item.id}
                                    style={{
                                        opacity: headerVisible ? 1 : 0,
                                        transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
                                        transition: `opacity 0.4s ease ${0.3 + index * 0.1}s, transform 0.4s ease ${0.3 + index * 0.1}s`,
                                    }}
                                >
                                    <a
                                        href={`#${item.id}`}
                                        onClick={(e) => scrollToSection(e, item.id)}
                                        style={{
                                            fontSize: '0.85rem',
                                            fontWeight: '500',
                                            letterSpacing: isRTL ? '0' : '0.08em',
                                            textTransform: isRTL ? 'none' : 'uppercase',
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            transition: 'color 0.3s ease',
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#00f5ff'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Language Toggle Button */}
                        <button
                            onClick={toggleLanguage}
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(139, 92, 246, 0.15))',
                                border: '1px solid rgba(0, 245, 255, 0.3)',
                                borderRadius: '20px',
                                color: '#00f5ff',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontFamily: language === 'ar' ? 'Inter, sans-serif' : 'Tajawal, sans-serif',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {language === 'en' ? 'العربية' : 'English'}
                        </button>
                    </nav>
                </div>
            </header>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
});

export default Layout;
