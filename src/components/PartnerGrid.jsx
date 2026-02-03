import React, { memo } from 'react';
import { useInView } from '../utils/motion';

// Simple inline SVG icons to avoid react-icons bundle bloat
const icons = {
    Google: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    ),
    YouTube: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#ff0000">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    ),
    'Google Ads': (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12.25 0a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm-8.5 7.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm17 0a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM12.25 15a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
        </svg>
    ),
    Meta: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#0081FB">
            <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
    ),
    TikTok: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
    ),
};

const PartnerItem = memo(({ item, index }) => {
    const [ref, isInView] = useInView(0.1);

    return (
        <div
            ref={ref}
            style={{
                width: '100%',
                height: '70px',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                fontSize: '1.8rem',
                color: '#fff',
                transition: 'all 0.3s ease',
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${index * 0.08}s`,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
        >
            {icons[item] || (
                <span style={{
                    opacity: 0.5,
                    fontWeight: '600',
                    fontSize: '0.85rem',
                }}>
                    {item}
                </span>
            )}
        </div>
    );
});

const PartnerGrid = memo(({ items }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem',
            alignItems: 'center',
            justifyItems: 'center'
        }}>
            {items.map((item, index) => (
                <PartnerItem key={index} item={item} index={index} />
            ))}
        </div>
    );
});

export default PartnerGrid;
