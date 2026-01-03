import React from 'react';
import { Scroll } from '@react-three/drei';
import { motion } from 'framer-motion';
import StatsCounter from './StatsCounter';
import PartnerGrid from './PartnerGrid';
import { useLanguage } from '../context/LanguageContext';

const Section = ({ children, className, id, ...props }) => {
    return (
        <section id={id} className={`section-container ${className || ''}`} {...props}>
            {children}
        </section>
    );
};

const Card = ({ children, className, delay = 0, style = {} }) => (
    <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={{
            y: -8,
            transition: { duration: 0.3 }
        }}
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
    </motion.div>
);

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

const PortfolioCard = ({ index, title, category, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ y: -10, scale: 1.02 }}
        style={{
            aspectRatio: '16/10',
            overflow: 'hidden',
            position: 'relative',
            background: 'linear-gradient(145deg, rgba(15, 15, 37, 0.9), rgba(5, 5, 16, 0.95))',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
        }}
    >
        <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, 
                rgba(0, 245, 255, 0.08) 0%, 
                rgba(139, 92, 246, 0.08) 50%, 
                rgba(255, 0, 170, 0.08) 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <span style={{
                fontSize: '4rem',
                opacity: 0.1,
                fontWeight: '900',
                fontFamily: 'Outfit, sans-serif',
            }}>
                {String(index).padStart(2, '0')}
            </span>
        </div>

        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '1.5rem',
            background: 'linear-gradient(to top, rgba(5, 5, 16, 0.95), transparent)',
        }}>
            <span style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                fontFamily: 'Outfit, sans-serif',
                display: 'block',
                marginBottom: '0.3rem',
            }}>
                {title}
            </span>
            <p style={{
                fontSize: '0.85rem',
                opacity: 0.6,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
            }}>
                <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#00f5ff',
                }} />
                {category}
            </p>
        </div>
    </motion.div>
);

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

    const projects = [
        { title: t('brandCampaign'), category: t('videoProduction') },
        { title: t('socialLaunch'), category: t('socialMedia') },
        { title: t('productReveal'), category: t('contentCreation') },
        { title: t('corporateFilm'), category: t('videoProduction') },
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

    // Updated client names as requested
    const clients = ['Falcon Group', 'ElDurrah Developments', 'Tanta Elnharda', 'ElTopic Media'];
    const partners = ['Google', 'YouTube', 'Google Ads', 'Meta', 'TikTok'];

    return (
        <Scroll html style={{ width: '100%', height: '100%' }}>
            {/* Hero Section */}
            <Section>
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    style={{ textAlign: 'center' }}
                >
                    <motion.h1
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
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                            opacity: 0.7,
                            letterSpacing: isRTL ? '0' : '0.2em',
                            textTransform: isRTL ? 'none' : 'uppercase',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
                        }}
                    >
                        {t('heroSubtitle')}
                    </motion.p>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        style={{ marginTop: '4rem' }}
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{
                                width: '28px',
                                height: '45px',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '14px',
                                margin: '0 auto',
                                display: 'flex',
                                justifyContent: 'center',
                                paddingTop: '8px',
                            }}
                        >
                            <motion.div
                                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                style={{
                                    width: '3px',
                                    height: '10px',
                                    background: 'linear-gradient(180deg, #00f5ff, transparent)',
                                    borderRadius: '2px',
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
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
                    <StatsCounter />
                </Card>
            </Section>

            {/* Portfolio Section */}
            <Section id="portfolio">
                <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="section-title"
                        style={{
                            marginBottom: '3rem',
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: '800',
                            textAlign: 'center',
                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
                        }}
                    >
                        {t('selectedWorks')}
                    </motion.h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1.5rem',
                    }}>
                        {projects.map((project, index) => (
                            <PortfolioCard
                                key={index}
                                index={index + 1}
                                title={project.title}
                                category={project.category}
                                delay={index * 0.1}
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

            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                opacity: 0.4,
                fontSize: '0.8rem',
                letterSpacing: isRTL ? '0' : '0.1em',
                fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit',
            }}>
                <p>&copy; {new Date().getFullYear()} YMZ Media. {t('allRights')}</p>
            </footer>
        </Scroll>
    );
};

export default Overlay;
