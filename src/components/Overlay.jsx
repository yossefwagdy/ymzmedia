import React, { useEffect, useRef, useState, memo, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StatsCounter from './StatsCounter';
import PartnerGrid from './PartnerGrid';
import { useLanguage } from '../context/LanguageContext';
import { certificatesData } from '../data/certificatesData';

// Local useInView hook for Card
const useInView = (threshold = 0.1) => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        // Bypass for mobile to prevent scroll lag
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setIsInView(true);
            return;
        }

        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);
    return [ref, isInView];
};

const Section = memo(({ children, className, id, ...props }) => {
    return (
        <section id={id} className={`section-container ${className || ''}`} {...props}>
            <motion.div
                style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
            >
                {children}
            </motion.div>
        </section>
    );
});

// CSS-only animated card - no framer-motion
const Card = memo(({ children, className, delay = 0, style = {} }) => {
    const [ref, isInView] = useInView(0.1);

    return (
        <div
            ref={ref}
            className={`glass-card ${className || ''}`}
            style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
                ...style,
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            }} />
            {children}
        </div>
    );
});

const ServiceCard = ({ title, description, color, icon, delay, isRTL }) => (
    <Card delay={delay}>
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: `linear-gradient(135deg, ${color}20, ${color}05)`,
            border: `1px solid ${color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            fontSize: '1.8rem',
        }}>
            {icon}
        </div>
        <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            fontWeight: '700',
            background: `linear-gradient(135deg, ${color}, ${color}aa)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
        }}>
            {title}
        </h3>
        <p style={{
            opacity: 0.7,
            lineHeight: '1.8',
            fontSize: '1rem',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
        }}>
            {description}
        </p>
    </Card>
);

// Video Project Card - Opens in modal
const VideoProjectCard = ({ title, videoUrl, category, color, delay, isRTL, onSelect }) => {
    const handleClick = () => {
        if (onSelect) {
            onSelect(videoUrl);
        } else {
            window.open(videoUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "2000px" }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={handleClick}
            style={{
                aspectRatio: '16/10',
                overflow: 'hidden',
                position: 'relative',
                background: `linear-gradient(145deg, ${color}15, rgba(5, 5, 16, 0.95))`,
                borderRadius: '20px',
                border: `1px solid ${color}30`,
                cursor: 'pointer',
            }}
        >
            {/* Background gradient */}
            <div style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, 
                    ${color}20 0%, 
                    rgba(139, 92, 246, 0.1) 50%, 
                    rgba(5, 5, 16, 0.8) 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Play button */}
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${color}50, ${color}30)`,
                        border: `2px solid ${color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                        boxShadow: `0 0 30px ${color}40`,
                    }}
                >
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="#fff"
                        style={{ marginLeft: '4px' }}
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </motion.div>
            </div>

            {/* YouTube icon badge */}
            <div style={{
                position: 'absolute',
                top: '1rem',
                [isRTL ? 'left' : 'right']: '1rem',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 0, 0, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                    <path d="M21.582 6.186a2.63 2.63 0 0 0-1.854-1.868C18.093 3.88 12 3.88 12 3.88s-6.094 0-7.728.438A2.63 2.63 0 0 0 2.418 6.186C2 7.828 2 12 2 12s0 4.172.418 5.814a2.63 2.63 0 0 0 1.854 1.868c1.634.438 7.728.438 7.728.438s6.094 0 7.728-.438a2.63 2.63 0 0 0 1.854-1.868C22 16.172 22 12 22 12s0-4.172-.418-5.814zM9.995 15.424V8.576L15.938 12l-5.943 3.424z" />
                </svg>
            </div>

            {/* Content overlay */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '1.5rem',
                background: 'linear-gradient(to top, rgba(5, 5, 16, 0.98), rgba(5, 5, 16, 0.7) 60%, transparent)',
            }}>
                <span style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#fff',
                }}>
                    {title}
                </span>
                <p style={{
                    fontSize: '0.85rem',
                    opacity: 0.6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                }}>
                    <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: color,
                    }} />
                    {category}
                </p>
                <p style={{
                    fontSize: '0.75rem',
                    opacity: 0.5,
                    marginTop: '0.5rem',
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                }}>
                    {isRTL ? 'اضغط لمشاهدة الفيديو' : 'Click to watch video'}
                </p>
            </div>
        </motion.div>
    );
};

const TestimonialCard = ({ name, role, company, content, delay, isRTL }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "2000px" }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ y: -5 }}
        style={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01))',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative',
            textAlign: isRTL ? 'right' : 'left',
        }}
    >
        <div style={{
            fontSize: '3rem',
            opacity: 0.1,
            position: 'absolute',
            top: '1rem',
            [isRTL ? 'left' : 'right']: '1.5rem',
            fontFamily: 'serif',
        }}>
            "
        </div>

        <p style={{
            fontSize: '1.05rem',
            lineHeight: '1.8',
            opacity: 0.8,
            marginBottom: '1.5rem',
            fontStyle: 'italic',
            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
        }}>
            "{content}"
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <div style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1rem',
            }}>
                {name.charAt(0)}
            </div>
            <div>
                <p style={{ fontWeight: '600', marginBottom: '0.2rem', fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>{name}</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.6, fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit' }}>
                    {role} @ {company}
                </p>
            </div>
        </div>
    </motion.div>
);

const Overlay = () => {
    const { language, isRTL, t } = useLanguage();
    const [selectedVideo, setSelectedVideo] = useState(null);

    const services = [
        {
            title: t('socialMedia'),
            description: t('socialMediaDesc'),
            color: "#00f5ff",
            icon: "📱"
        },
        {
            title: t('videoEditing'),
            description: t('videoEditingDesc'),
            color: "#8b5cf6",
            icon: "🎬"
        },
        {
            title: t('contentCreation'),
            description: t('contentCreationDesc'),
            color: "#ff00aa",
            icon: "✨"
        },
        {
            title: t('brandStrategy'),
            description: t('brandStrategyDesc'),
            color: "#10b981",
            icon: "🚀"
        }
    ];

    // YouTube Video Projects with colors
    const projects = [
        {
            title: isRTL ? 'اعلان رز الوفير' : 'Al Wafir Rice Commercial',
            category: t('videoProduction'),
            videoUrl: 'https://www.youtube.com/watch?v=86ilY-vrTXU',
            color: '#ffd700'
        },
        {
            title: isRTL ? 'اعلان مستشفي 57357' : '57357 Hospital Commercial',
            category: t('videoProduction'),
            videoUrl: 'https://www.youtube.com/watch?v=nkKmPEnM_lk',
            color: '#ff00aa'
        },
        {
            title: isRTL ? 'مسلسل الكينج' : 'El King Series',
            category: t('videoProduction'),
            videoUrl: 'https://www.youtube.com/watch?v=LH8kruvVWhk',
            color: '#8b5cf6'
        },
        {
            title: isRTL ? 'اعلان فالكون جروب' : 'Falcon Group Commercial',
            category: t('videoProduction'),
            videoUrl: 'https://www.youtube.com/watch?v=l5mkttzhk_w',
            color: '#00f5ff'
        },
        {
            title: isRTL ? 'معلم تاريخ' : 'History Teacher',
            category: t('videoProduction'),
            videoUrl: 'https://www.youtube.com/watch?v=Y-CHJSjxHXU',
            color: '#10b981'
        },
        {
            title: isRTL ? 'سابق زمانك' : 'Sabe2 Zamanak',
            category: t('videoProduction'),
            videoUrl: 'https://www.youtube.com/watch?v=UGsjnnFrbE4',
            color: '#ff4500'
        },
        {
            title: isRTL ? 'قاعة افراح' : 'Wedding Hall Commercial',
            category: t('videoProduction'),
            videoUrl: 'https://www.youtube.com/watch?v=JjDPjF3VHt0',
            color: '#1e90ff'
        },
    ];

    const testimonials = [
        {
            name: t('testimonial1Name'),
            role: t('testimonial1Role'),
            company: t('testimonial1Company'),
            content: t('testimonial1Content')
        },
        {
            name: t('testimonial2Name'),
            role: t('testimonial2Role'),
            company: t('testimonial2Company'),
            content: t('testimonial2Content')
        },
        {
            name: t('testimonial3Name'),
            role: t('testimonial3Role'),
            company: t('testimonial3Company'),
            content: t('testimonial3Content')
        },
    ];

    const featuredCertificates = certificatesData.slice(0, 4);

    const clients = ['Falcon Group', 'ElDurrah Developments', 'Tanta Elnharda', 'ElTopic Media'];
    const partners = ['Google', 'YouTube', 'Google Ads', 'Meta', 'TikTok'];

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {/* Hero Section */}
            <Section>
                <div style={{ textAlign: 'center' }}>
                    <h1
                        className="hero-title"
                        style={{
                            fontSize: 'clamp(4rem, 12vw, 9rem)',
                            fontWeight: '900',
                            lineHeight: '0.85',
                            marginBottom: '1.5rem',
                            fontFamily: 'Outfit, Inter, sans-serif',
                        }}
                    >
                        YMZ <br /> MEDIA
                    </h1>

                    <p
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                            opacity: 0.7,
                            letterSpacing: isRTL ? '0' : '0.2em',
                            textTransform: isRTL ? 'none' : 'uppercase',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                        }}
                    >
                        {t('heroSubtitle')}
                    </p>

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
                                animation: 'bounce 1.5s infinite',
                            }}
                        >
                            <div
                                style={{
                                    width: '3px',
                                    height: '10px',
                                    background: 'linear-gradient(180deg, #00f5ff, transparent)',
                                    borderRadius: '2px',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* Services Section */}
            <Section id="services">
                <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "2000px" }}
                        className="section-title"
                        style={{
                            marginBottom: '3rem',
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: '800',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
                            textAlign: isRTL ? 'right' : 'left',
                        }}
                    >
                        {t('ourExpertise')}
                    </motion.h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} delay={0.1 + index * 0.1} isRTL={isRTL} />
                        ))}
                    </div>
                </div>
            </Section>

            {/* Statistics Section */}
            <Section style={{ minHeight: 'auto', padding: '4rem 10%' }}>
                <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: '100%', maxWidth: '1100px', padding: '3rem', margin: '0 auto' }}>
                        <StatsCounter key={language} />
                    </Card>
                </div>
            </Section>

            {/* Portfolio Section with Video Projects */}
            <Section id="portfolio">
                <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "2000px" }}
                        className="section-title"
                        style={{
                            marginBottom: '1rem',
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: '800',
                            textAlign: 'center',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
                        }}
                    >
                        {t('selectedWorks')}
                    </motion.h2>
                    <p style={{
                        textAlign: 'center',
                        opacity: 0.6,
                        marginBottom: '3rem',
                        fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                    }}>
                        {isRTL ? 'اضغط على أي مشروع لمشاهدة الفيديو على يوتيوب' : 'Click on any project to watch the video on YouTube'}
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1.5rem',
                    }}>
                        {projects.map((project, index) => (
                            <VideoProjectCard
                                key={index}
                                {...project}
                                delay={index * 0.1}
                                isRTL={isRTL}
                                onSelect={(url) => setSelectedVideo(url)}
                            />
                        ))}
                    </div>
                </div>
            </Section>

            {/* Testimonials Section */}
            <Section id="testimonials" style={{ minHeight: 'auto', padding: '6rem 10%' }}>
                <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "2000px" }}
                        className="section-title"
                        style={{
                            marginBottom: '1rem',
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: '800',
                            textAlign: 'center',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
                        }}
                    >
                        {t('clientTestimonials')}
                    </motion.h2>
                    <p style={{
                        textAlign: 'center',
                        opacity: 0.6,
                        marginBottom: '3rem',
                        fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                    }}>
                        {t('whatClientsSay')}
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '1.5rem',
                    }}>
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                {...testimonial}
                                delay={index * 0.15}
                                isRTL={isRTL}
                            />
                        ))}
                    </div>
                </div>
            </Section>

            {/* Featured Clients Section */}
            <Section style={{ minHeight: 'auto', padding: '4rem 10%' }}>
                <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "2000px" }}
                        className="section-title"
                        style={{
                            marginBottom: '2.5rem',
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                            fontWeight: '800',
                            textAlign: 'center',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
                        }}
                    >
                        {t('trustedBy')}
                    </motion.h2>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem',
                        width: '100%',
                    }}>
                        {clients.map((client, index) => (
                            <motion.div
                                key={client}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "2000px" }}
                                transition={{ delay: index * 0.08 }}
                                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 245, 255, 0.5)' }}
                                style={{
                                    minWidth: '180px',
                                    padding: '1.5rem 1rem',
                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                                    borderRadius: '14px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    opacity: 0.8,
                                    transition: 'all 0.3s ease',
                                    fontSize: '0.95rem',
                                }}
                            >
                                {client}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Partners Section */}
            <Section style={{ minHeight: 'auto', padding: '4rem 10%' }}>
                <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "2000px" }}
                        className="section-title"
                        style={{
                            marginBottom: '2.5rem',
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                            fontWeight: '800',
                            textAlign: 'center',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
                        }}
                    >
                        {t('ourPartners')}
                    </motion.h2>
                    <div style={{ width: '100%', margin: '0 auto' }}>
                        <PartnerGrid items={partners} />
                    </div>
                </div>
            </Section>

            {/* Certifications Section */}
            <Section style={{ minHeight: 'auto', padding: '4rem 10%' }}>
                <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "2000px" }}
                        className="section-title"
                        style={{
                            marginBottom: '1rem',
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: '800',
                            textAlign: 'center',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
                        }}
                    >
                        {t('homeCertificatesTitle')}
                    </motion.h2>

                    <p style={{
                        textAlign: 'center',
                        opacity: 0.7,
                        marginBottom: '2.5rem',
                        maxWidth: '900px',
                        marginInline: 'auto',
                        lineHeight: 1.8,
                        fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                    }}>
                        {t('homeCertificatesSubtitle')}
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        {featuredCertificates.map((certificate, index) => (
                            <motion.div
                                key={certificate.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
                                viewport={{ once: true, amount: 0.2 }}
                                style={{
                                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01))',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '18px',
                                    padding: '1.2rem',
                                    textAlign: isRTL ? 'right' : 'left'
                                }}
                            >
                                <p style={{
                                    marginBottom: '0.5rem',
                                    fontSize: '0.78rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.07em',
                                    color: certificate.platform === 'google' ? '#00f5ff' : '#ff5c7f',
                                    fontWeight: 700
                                }}>
                                    {certificate.provider}
                                </p>

                                <h3 style={{
                                    fontSize: '1rem',
                                    lineHeight: 1.6,
                                    margin: 0,
                                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif'
                                }}>
                                    {certificate.title[language]}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
                            <Link
                                to="/certificates"
                                style={{
                                    display: 'inline-block',
                                    padding: '0.9rem 1.6rem',
                                    borderRadius: '999px',
                                    border: '1px solid rgba(0, 245, 255, 0.35)',
                                    background: 'linear-gradient(135deg, rgba(0,245,255,0.16), rgba(139,92,246,0.16))',
                                    color: '#e6faff',
                                    textDecoration: 'none',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    letterSpacing: isRTL ? '0' : '0.06em',
                                    textTransform: isRTL ? 'none' : 'uppercase',
                                    fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                                }}
                            >
                                {t('viewAllCertificates')}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* Contact Section */}
            <Section id="contact">
                <Card style={{ width: '100%', maxWidth: '750px', textAlign: 'center', padding: '4rem', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "2000px" }}
                    >
                        <h2 className="section-title" style={{
                            marginBottom: '1.5rem',
                            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                            textAlign: 'center',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
                        }}>
                            {t('letsWork')}
                        </h2>
                        <p style={{
                            fontSize: '1.05rem',
                            opacity: 0.7,
                            marginBottom: '2.5rem',
                            lineHeight: '1.7',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                        }}>
                            {t('contactDesc')}
                        </p>

                        <motion.a
                            href="https://fb.com/ymzmedia"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: 'inline-block',
                                padding: '1.1rem 2.5rem',
                                background: 'linear-gradient(135deg, #ffffff, #e0e0e0)',
                                color: '#050510',
                                borderRadius: '50px',
                                fontSize: '0.95rem',
                                fontWeight: '700',
                                textDecoration: 'none',
                                marginBottom: '2rem',
                                textTransform: isRTL ? 'none' : 'uppercase',
                                letterSpacing: isRTL ? '0' : '0.1em',
                                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                            }}
                        >
                            {t('contactUs')}
                        </motion.a>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            flexWrap: 'wrap',
                            marginTop: '1rem',
                        }}>
                            {[
                                { name: 'Instagram', url: 'https://instagram.com/ymz.media' },
                                { name: 'LinkedIn', url: 'https://www.linkedin.com/company/ymz-media/' },
                                { name: 'TikTok', url: 'https://tiktok.com/ymzmediaeg' },
                                { name: 'Facebook', url: 'https://www.facebook.com/ymzmedia' },
                            ].map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, color: '#00f5ff' }}
                                    style={{
                                        color: '#fff',
                                        opacity: 0.5,
                                        textDecoration: 'none',
                                        fontSize: '0.8rem',
                                        letterSpacing: '0.1em',
                                    }}
                                >
                                    {social.name.toUpperCase()}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </Card>
            </Section>

            {/* Video Modal Portal */}
            {selectedVideo && createPortal(
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    zIndex: 999999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }} onClick={() => setSelectedVideo(null)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{
                            width: '100%',
                            maxWidth: '1000px',
                            aspectRatio: '16/9',
                            backgroundColor: '#000',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedVideo(null)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                border: 'none',
                                color: '#fff',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                transition: 'background 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                        >
                            &times;
                        </button>
                        <iframe
                            width="100%"
                            height="100%"
                            src={selectedVideo.replace('watch?v=', 'embed/')}
                            title="YouTube Video Player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </motion.div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default Overlay;
