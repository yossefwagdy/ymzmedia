import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const BackToTop = () => {
    const { isRTL, t } = useLanguage();

    const scrollToTop = () => {
        // Find the hero section and scroll to it
        const heroSection = document.querySelector('.section-container');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Also try standard scroll methods
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(0, 245, 255, 0.5)' }}
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
                background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.4), rgba(139, 92, 246, 0.4))',
                backdropFilter: 'blur(15px)',
                border: '2px solid rgba(0, 245, 255, 0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 25px rgba(0, 245, 255, 0.3)',
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
    );
};

export default BackToTop;
