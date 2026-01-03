import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Counter = ({ value, label, suffix = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    const { isRTL } = useLanguage();

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseInt(value.toString().replace(/\D/g, ''));
            const duration = 1200;
            const incrementTime = Math.max((duration / end) * 10, 10);

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= end) {
                    clearInterval(timer);
                    setCount(end);
                }
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            className="stat-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                textAlign: 'center',
                padding: '1.5rem',
                flex: '1 1 200px',
            }}
        >
            <motion.h3
                style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: '800',
                    marginBottom: '0.75rem',
                    fontFamily: 'Outfit, Inter, sans-serif',
                    background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(0, 245, 255, 0.4))',
                }}
            >
                {count}{suffix}
            </motion.h3>
            <p style={{
                fontSize: '0.9rem',
                opacity: 0.6,
                letterSpacing: isRTL ? '0' : '0.15em',
                textTransform: isRTL ? 'none' : 'uppercase',
                fontWeight: '500',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
            }}>
                {label}
            </p>
        </motion.div>
    );
};

const StatsCounter = () => {
    const { t } = useLanguage();

    return (
        <div className="stats-container" style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            flexWrap: 'wrap',
            gap: '2rem'
        }}>
            <Counter value="50" suffix="+" label={t('happyClients')} />
            <Counter value="100" suffix="+" label={t('projectsDone')} />
            <Counter value="5" suffix="+" label={t('yearsExperience')} />
            <Counter value="10" suffix="M+" label={t('viewsGenerated')} />
        </div>
    );
};

export default StatsCounter;
