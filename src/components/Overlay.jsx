import React from 'react';
import { Scroll } from '@react-three/drei';
import { motion } from 'framer-motion';
import StatsCounter from './StatsCounter';
import PartnerGrid from './PartnerGrid';

const Section = ({ children, className, ...props }) => {
    return (
        <section className={`section-container ${className || ''}`} {...props}>
            {children}
        </section>
    );
};

const Card = ({ children, className, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay }}
        className={`glass-card ${className || ''}`}
        style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
    >
        {children}
    </motion.div>
);

const Overlay = () => {
    return (
        <Scroll html style={{ width: '100%', height: '100%' }}>
            {/* Hero Section */}
            <Section>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ textAlign: 'center' }}
                >
                    <h1 className="hero-title" style={{
                        fontSize: '6rem',
                        fontWeight: '900',
                        lineHeight: '0.9',
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, #fff, #aaa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        YMZ <br /> MEDIA
                    </h1>
                    <p style={{ fontSize: '1.5rem', opacity: 0.8, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                        Elevating Brands Through Visual Storytelling
                    </p>
                </motion.div>
            </Section>

            {/* Services Section */}
            <Section style={{ alignItems: 'flex-start' }}>
                <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="section-title"
                        style={{ marginBottom: '3rem', fontSize: '3rem', fontWeight: 'bold' }}
                    >
                        OUR EXPERTISE
                    </motion.h2>
                    <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <Card delay={0.1}>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#06b6d4' }}>Social Media</h3>
                            <p style={{ opacity: 0.7, lineHeight: '1.6' }}>Strategic management and growth hacking to build your digital community and engagement.</p>
                        </Card>
                        <Card delay={0.2}>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#8b5cf6' }}>Video Editing</h3>
                            <p style={{ opacity: 0.7, lineHeight: '1.6' }}>Cinematic post-production, motion graphics, and VFX that captivate audiences.</p>
                        </Card>
                        <Card delay={0.3}>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#ec4899' }}>Content Creation</h3>
                            <p style={{ opacity: 0.7, lineHeight: '1.6' }}>High-quality visuals and storytelling tailored to your brand's unique voice.</p>
                        </Card>
                        <Card delay={0.4}>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#10b981' }}>Brand Strategy</h3>
                            <p style={{ opacity: 0.7, lineHeight: '1.6' }}>Comprehensive roadmaps to position your brand as a market leader.</p>
                        </Card>
                    </div>
                </div>
            </Section>

            {/* Statistics Section (New) */}
            <Section style={{ height: 'auto', padding: '4rem 0' }}>
                <Card className="stats-section" style={{ width: '100%', maxWidth: '1200px', padding: '3rem' }}>
                    <StatsCounter />
                </Card>
            </Section>

            {/* Portfolio Section */}
            <Section style={{ alignItems: 'flex-end', textAlign: 'right' }}>
                <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <motion.h2
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="section-title"
                        style={{ marginBottom: '1rem', fontSize: '3rem', fontWeight: 'bold' }}
                    >
                        SELECTED WORKS
                    </motion.h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.7, maxWidth: '600px', marginBottom: '3rem' }}>
                        A curation of our most impactful projects across various industries.
                    </p>
                    <div className="portfolio-grid" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {[1, 2, 3, 4].map((item) => (
                            <Card key={item} delay={item * 0.1} className="portfolio-item" style={{ height: '300px', padding: 0, overflow: 'hidden', position: 'relative' }}>
                                <div style={{ width: '100%', height: '100%', background: `linear-gradient(45deg, #111, #222)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '5rem', opacity: 0.1, fontWeight: 'bold' }}>{item}</span>
                                </div>
                                <div className="portfolio-overlay" style={{
                                    position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                                }}>
                                    <span className="portfolio-title" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Project Name {item}</span>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Video Production</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Partners & Clients Section (New) */}
            <Section style={{ height: 'auto', padding: '4rem 0' }}>
                <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                    <PartnerGrid title="TRUSTED BY" items={['Client A', 'Client B', 'Client C', 'Client D', 'Client E']} />
                    <PartnerGrid title="OUR PARTNERS" items={['Partner X', 'Partner Y', 'Partner Z']} />
                </div>
            </Section>

            {/* Contact Section */}
            <Section>
                <Card className="contact-container" style={{ maxWidth: '800px', textAlign: 'center', padding: '4rem' }}>
                    <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>READY TO START?</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.7, marginBottom: '3rem', lineHeight: '1.6' }}>
                        Let's collaborate to bring your vision to life. Whether it's a new campaign or a full rebrand, we're here to help.
                    </p>
                    <a href="mailto:contact@ymzmedia.com" className="contact-btn" style={{
                        display: 'inline-block',
                        padding: '1rem 3rem',
                        background: '#fff',
                        color: '#000',
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        marginBottom: '3rem',
                        transition: 'transform 0.3s ease'
                    }}>
                        Get in Touch
                    </a>

                    <div className="social-links" style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                        {['Instagram', 'LinkedIn', 'Twitter', 'YouTube'].map((social) => (
                            <a key={social} href="#" className="social-link" style={{ color: '#fff', opacity: 0.6, textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                                {social.toUpperCase()}
                            </a>
                        ))}
                    </div>
                </Card>
            </Section>

            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                opacity: 0.4,
                fontSize: '0.8rem',
                marginTop: 'auto',
                width: '100%',
                letterSpacing: '0.1em'
            }}>
                <p>&copy; {new Date().getFullYear()} YMZ Media. All rights reserved.</p>
            </footer>
        </Scroll>
    );
};

export default Overlay;
