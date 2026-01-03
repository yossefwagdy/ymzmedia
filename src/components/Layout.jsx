import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Layout = ({ children }) => {
    const { language, isRTL, t, toggleLanguage } = useLanguage();

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            // Use scrollIntoView which works better with various scroll containers
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
            <motion.header
                className="header"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: 'linear-gradient(180deg, rgba(5, 5, 16, 0.9) 0%, rgba(5, 5, 16, 0.7) 70%, transparent 100%)',
                    backdropFilter: 'blur(10px)',
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
                    <motion.a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="logo"
                        whileHover={{ scale: 1.05 }}
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
                        }}
                    >
                        YMZ Media
                    </motion.a>

                    <nav className="nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <ul className="flex-center" style={{
                            gap: '1.5rem',
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                        }}>
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                    <motion.a
                                        href={`#${item.id}`}
                                        onClick={(e) => scrollToSection(e, item.id)}
                                        whileHover={{ color: '#00f5ff' }}
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
                                    >
                                        {item.label}
                                    </motion.a>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Language Toggle Button */}
                        <motion.button
                            onClick={toggleLanguage}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
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
                        >
                            {language === 'en' ? 'العربية' : 'English'}
                        </motion.button>
                    </nav>
                </div>
            </motion.header>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
