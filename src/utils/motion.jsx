/**
 * Lightweight CSS-only animation components
 * Replaces framer-motion to reduce bundle size
 */
import React, { useEffect, useRef, useState, memo, forwardRef } from 'react';

// CSS animation keyframes (injected once)
const injectStyles = () => {
    if (typeof document === 'undefined') return;
    if (document.getElementById('motion-styles')) return;

    const style = document.createElement('style');
    style.id = 'motion-styles';
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
        }
        @keyframes scrollDot {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(10px); opacity: 0.3; }
        }
        .motion-hover:hover {
            transform: translateY(-8px) !important;
        }
        .motion-hover-sm:hover {
            transform: translateY(-5px) !important;
        }
        .motion-scale:hover {
            transform: scale(1.02) !important;
        }
    `;
    document.head.appendChild(style);
};

// Hook for intersection observer based animations
export const useInView = (threshold = 0.1) => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin: '50px' }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isInView];
};

// Motion div replacement
export const MotionDiv = memo(forwardRef(({
    children,
    initial = {},
    whileInView = {},
    animate = {},
    transition = {},
    whileHover = {},
    onClick,
    style = {},
    className = '',
    ...props
}, forwardedRef) => {
    const [internalRef, isInView] = useInView(0.1);
    const ref = forwardedRef || internalRef;

    useEffect(() => {
        injectStyles();
    }, []);

    const delay = transition.delay || 0;
    const duration = transition.duration || 0.6;

    // Determine animation type from initial state
    let animationName = 'fadeInUp';
    if (initial.x && initial.x < 0) animationName = 'fadeInLeft';
    if (initial.x && initial.x > 0) animationName = 'fadeInRight';

    // Check for continuous animations
    const hasBounce = animate.y && Array.isArray(animate.y);

    const hoverClass = whileHover?.y ?
        (Math.abs(whileHover.y) > 5 ? 'motion-hover' : 'motion-hover-sm') :
        (whileHover?.scale ? 'motion-scale' : '');

    return (
        <div
            ref={ref}
            onClick={onClick}
            className={`${className} ${hoverClass}`}
            style={{
                ...style,
                opacity: isInView ? 1 : 0,
                animation: isInView ?
                    (hasBounce ? `bounce 1.5s ease-in-out infinite` : `${animationName} ${duration}s ease ${delay}s both`) :
                    'none',
                transition: `all ${duration}s ease ${delay}s`,
            }}
            {...props}
        >
            {children}
        </div>
    );
}));

// Motion h1, h2, p, a replacements
export const MotionH1 = memo(({ children, style = {}, className = '', ...props }) => {
    const [ref, isInView] = useInView(0.1);

    return (
        <h1
            ref={ref}
            className={className}
            style={{
                ...style,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
            {...props}
        >
            {children}
        </h1>
    );
});

export const MotionH2 = memo(({ children, style = {}, className = '', initial = {}, ...props }) => {
    const [ref, isInView] = useInView(0.1);
    const isFromLeft = initial.x && initial.x < 0;
    const isFromRight = initial.x && initial.x > 0;

    return (
        <h2
            ref={ref}
            className={className}
            style={{
                ...style,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateX(0)' :
                    (isFromLeft ? 'translateX(-50px)' : isFromRight ? 'translateX(50px)' : 'translateY(30px)'),
                transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
            {...props}
        >
            {children}
        </h2>
    );
});

export const MotionP = memo(({ children, style = {}, className = '', transition = {}, ...props }) => {
    const [ref, isInView] = useInView(0.1);
    const delay = transition.delay || 0;

    return (
        <p
            ref={ref}
            className={className}
            style={{
                ...style,
                opacity: isInView ? (style.opacity || 1) : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
            }}
            {...props}
        >
            {children}
        </p>
    );
});

export const MotionA = memo(({ children, href, style = {}, className = '', whileHover = {}, ...props }) => {
    return (
        <a
            href={href}
            className={`${className} motion-hover-sm`}
            style={{
                ...style,
                transition: 'all 0.3s ease',
            }}
            {...props}
        >
            {children}
        </a>
    );
});

// Scroll indicator component
export const ScrollIndicator = memo(() => {
    useEffect(() => {
        injectStyles();
    }, []);

    return (
        <div style={{ marginTop: '4rem' }}>
            <div
                style={{
                    width: '28px',
                    height: '45px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '14px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '8px',
                    animation: 'bounce 1.5s ease-in-out infinite',
                }}
            >
                <div
                    style={{
                        width: '3px',
                        height: '10px',
                        background: 'linear-gradient(180deg, #00f5ff, transparent)',
                        borderRadius: '2px',
                        animation: 'scrollDot 1.5s ease-in-out infinite',
                    }}
                />
            </div>
        </div>
    );
});

// Export all as motion object for easy migration
export const motion = {
    div: MotionDiv,
    h1: MotionH1,
    h2: MotionH2,
    p: MotionP,
    a: MotionA,
};

export default motion;
