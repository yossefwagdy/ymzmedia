import React, { useEffect, useRef, useState, memo, useMemo, useCallback } from 'react';
import { Scroll } from '@react-three/drei';
import { motion } from 'framer-motion';
import StatsCounter from './StatsCounter';
import PartnerGrid from './PartnerGrid';
import { useLanguage } from '../context/LanguageContext';

// Local useInView hook for Card
const useInView = (threshold = 0.1) => {
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
            {children}
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

// Video Project Card - Opens in new tab
const VideoProjectCard = ({ title, videoUrl, category, color, delay, isRTL }) => {
    const handleClick = () => {
        window.open(videoUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
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

            {/* Facebook icon badge */}
            <div style={{
                position: 'absolute',
                top: '1rem',
                [isRTL ? 'left' : 'right']: '1rem',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(24, 119, 242, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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

    // Facebook Video Projects with colors
    const projects = [
        {
            title: isRTL ? 'اعلان رسمي لنادي الكهرباء' : 'ElKahraba Club Official Ad',
            category: t('videoProduction'),
            videoUrl: 'https://www.facebook.com/share/v/17mtwnaMqd/',
            color: '#00f5ff'
        },
        {
            title: isRTL ? 'اعلان لشركة Falcon Group' : 'Falcon Group Commercial',
            category: t('videoProduction'),
            videoUrl: 'https://www.facebook.com/share/r/1DNocGpcT4/',
            color: '#8b5cf6'
        },
        {
            title: isRTL ? 'اعلان لقاعات الدرة' : 'ElDurrah Halls Commercial',
            category: t('videoProduction'),
            videoUrl: 'https://www.facebook.com/share/v/17vaTJ8hmB/',
            color: '#ff00aa'
        },
        {
            title: isRTL ? 'اعلان رز الوفير' : 'AlWafir Rice Commercial',
            category: t('videoProduction'),
            videoUrl: 'https://www.facebook.com/share/v/1C4ndpJuxG/',
            color: '#ffd700'
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

    const clients = ['Falcon Group', 'ElDurrah Developments', 'Tanta Elnharda', 'ElTopic Media'];
    const partners = ['Google', 'YouTube', 'Google Ads', 'Meta', 'TikTok'];

    return (
        <Scroll html style={{ width: '100%', height: '100%' }}>
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
                <Card style={{ width: '100%', maxWidth: '1100px', padding: '3rem' }}>
                    <StatsCounter key={language} />
                </Card>
            </Section>

            {/* Portfolio Section with Video Projects */}
            <Section id="portfolio">
                <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
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
                        {isRTL ? 'اضغط على أي مشروع لمشاهدة الفيديو على فيسبوك' : 'Click on any project to watch the video on Facebook'}
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
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '1rem',
                    }}>
                        {clients.map((client, index) => (
                            <motion.div
                                key={client}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 245, 255, 0.5)' }}
                                style={{
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
                <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
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
                    <PartnerGrid items={partners} />
                </div>
            </Section>

            {/* Contact Section */}
            <Section id="contact">
                <Card style={{ maxWidth: '750px', textAlign: 'center', padding: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
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
                            href="mailto:contact@ymzmedia.com"
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
                            {['Instagram', 'LinkedIn', 'Twitter', 'YouTube'].map((social) => (
                                <motion.a
                                    key={social}
                                    href="#"
                                    whileHover={{ y: -3, color: '#00f5ff' }}
                                    style={{
                                        color: '#fff',
                                        opacity: 0.5,
                                        textDecoration: 'none',
                                        fontSize: '0.8rem',
                                        letterSpacing: '0.1em',
                                    }}
                                >
                                    {social.toUpperCase()}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </Card>
            </Section>

            {/* Footer */}
            <footer style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(5, 5, 16, 0.95) 30%)',
                padding: '6rem 10% 2rem',
                marginTop: '4rem',
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '3rem',
                    marginBottom: '4rem',
                }}>
                    {/* Brand Column */}
                    <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                        <h3 style={{
                            fontSize: '2rem',
                            fontWeight: '900',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            marginBottom: '1.5rem',
                        }}>
                            YMZ Media
                        </h3>
                        <p style={{
                            opacity: 0.6,
                            lineHeight: '1.8',
                            fontSize: '0.95rem',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                            marginBottom: '1.5rem',
                        }}>
                            {isRTL
                                ? 'نرتقي بالعلامات التجارية من خلال السرد المرئي الإبداعي. شريكك الموثوق في إنتاج الفيديو والتسويق الرقمي.'
                                : 'Elevating brands through creative visual storytelling. Your trusted partner in video production and digital marketing.'
                            }
                        </p>
                        <p style={{
                            opacity: 0.5,
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                        }}>
                            📞 01066517846
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                        <h4 style={{
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            marginBottom: '1.5rem',
                            color: '#00f5ff',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
                        }}>
                            {isRTL ? 'روابط سريعة' : 'Quick Links'}
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {[
                                { label: t('services'), id: 'services' },
                                { label: t('portfolio'), id: 'portfolio' },
                                { label: t('testimonials'), id: 'testimonials' },
                                { label: t('contact'), id: 'contact' },
                            ].map((link) => (
                                <li key={link.id} style={{ marginBottom: '0.8rem' }}>
                                    <a
                                        href={`#${link.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        style={{
                                            color: '#fff',
                                            opacity: 0.6,
                                            textDecoration: 'none',
                                            fontSize: '0.95rem',
                                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.opacity = '1';
                                            e.target.style.color = '#00f5ff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.opacity = '0.6';
                                            e.target.style.color = '#fff';
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                        <h4 style={{
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            marginBottom: '1.5rem',
                            color: '#8b5cf6',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
                        }}>
                            {isRTL ? 'تابعنا' : 'Follow Us'}
                        </h4>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap',
                            justifyContent: isRTL ? 'flex-end' : 'flex-start',
                        }}>
                            {[
                                { name: 'Facebook', color: '#1877f2', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                                { name: 'Instagram', color: '#e4405f', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                                { name: 'YouTube', color: '#ff0000', icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                                { name: 'TikTok', color: '#00f2ea', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href="#"
                                    title={social.name}
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '12px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = social.color + '30';
                                        e.currentTarget.style.borderColor = social.color;
                                        e.currentTarget.style.boxShadow = `0 0 20px ${social.color}40`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                    marginBottom: '2rem',
                }} />

                {/* Copyright */}
                <div style={{
                    textAlign: 'center',
                }}>
                    <p style={{
                        opacity: 0.4,
                        fontSize: '0.85rem',
                        fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                    }}>
                        &copy; {new Date().getFullYear()} YMZ Media. {t('allRights')}
                    </p>
                </div>
            </footer>
        </Scroll>
    );
};

export default Overlay;
