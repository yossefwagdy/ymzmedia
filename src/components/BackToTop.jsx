import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { isRTL, t } = useLanguage();

    useEffect(() => {
        const checkScroll = () => {
            // Check if user has scrolled
            const scrolled = window.scrollY > 300 || document.documentElement.scrollTop > 300;
            setIsVisible(scrolled);
        };

        // Check on mount
        checkScroll();

        // Listen to scroll events
        window.addEventListener('scroll', checkScroll, { passive: true });

        // Also check periodically in case scroll events are not firing
        const interval = setInterval(checkScroll, 500);

        return () => {
            window.removeEventListener('scroll', checkScroll);
            clearInterval(interval);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToTop}
                    title={t('backToTop')}
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        [isRTL ? 'left' : 'right']: '2rem',
                        width: '55px',
                        height: '55px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.3), rgba(139, 92, 246, 0.3))',
                        backdropFilter: 'blur(15px)',
                        border: '2px solid rgba(0, 245, 255, 0.4)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 245, 255, 0.2)',
                    }}
                    aria-label={t('backToTop')}
                >
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00f5ff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
