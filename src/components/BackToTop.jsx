import React, { memo, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const BackToTop = memo(() => {
    const { isRTL, t } = useLanguage();
    const [visible, setVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Show button after initial render
        const timer = setTimeout(() => setVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const scrollToTop = () => {
        const heroSection = document.querySelector('.section-container');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            title={t('backToTop')}
            aria-label={t('backToTop')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                boxShadow: isHovered
                    ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 245, 255, 0.5)'
                    : '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 25px rgba(0, 245, 255, 0.3)',
                opacity: visible ? 1 : 0,
                transform: isHovered ? 'scale(1.1)' : (visible ? 'scale(1)' : 'scale(0.8)'),
                transition: 'all 0.3s ease',
            }}
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
        </button>
    );
});

export default BackToTop;
