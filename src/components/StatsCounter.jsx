import React, { useEffect, useState, useRef, memo } from 'react';
import { useInView } from '../utils/motion';
import { useLanguage } from '../context/LanguageContext';

const Counter = memo(({ value, label, suffix = '' }) => {
    const [ref, isInViewState] = useInView(0.1);
    const [count, setCount] = useState(0);
    const { isRTL } = useLanguage();

    useEffect(() => {
        if (isInViewState) {
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
    }, [isInViewState, value]);

    return (
        <div
            ref={ref}
            className="stat-item"
            style={{
                textAlign: 'center',
                padding: '1.5rem',
                flex: '1 1 200px',
                opacity: isInViewState ? 1 : 0,
                transform: isInViewState ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
        >
            <h3
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
            </h3>
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
        </div>
    );
});

const StatsCounter = memo(() => {
    const { language, isRTL, t } = useLanguage();

    const stats = [
        { value: "50", suffix: "+", labelKey: 'happyClients' },
        { value: "100", suffix: "+", labelKey: 'projectsDone' },
        { value: "5", suffix: "+", labelKey: 'yearsExperience' },
        { value: "10", suffix: "M+", labelKey: 'viewsGenerated' },
    ];

    return (
        <div
            key={language}
            className="stats-container"
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%',
                maxWidth: '1100px',
                margin: '0 auto',
                flexWrap: 'wrap',
                gap: '2rem',
                direction: isRTL ? 'rtl' : 'ltr',
            }}
        >
            {stats.map((stat, index) => (
                <Counter
                    key={`${language}-${index}`}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={t(stat.labelKey)}
                />
            ))}
        </div>
    );
});

export default StatsCounter;
