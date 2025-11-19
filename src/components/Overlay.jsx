import React from 'react';
import { Scroll } from '@react-three/drei';
import { motion } from 'framer-motion';

const Section = ({ children, className, ...props }) => {
    return (
        <section className={`section-container ${className || ''}`} {...props}>
            {children}
        </section>
    );
};

const Overlay = () => {
    return (
        <Scroll html style={{ width: '100%', height: '100%' }}>
            <Section>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h1 className="hero-title">
                        YMZ <br /> MEDIA
                    </h1>
                    <p style={{ fontSize: '1.5rem', opacity: 0.8, letterSpacing: '0.1em' }}>
                        ALL-IN-ONE SOCIAL MEDIA & EDITING
                    </p>
                </motion.div>
            </Section>

            <Section style={{ alignItems: 'flex-start' }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    style={{ width: '100%' }}
                >
                    <h2 className="section-title">SERVICES</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Social Media Management</h3>
                            <p style={{ opacity: 0.7 }}>Full-service strategy, content creation, and community management to grow your brand.</p>
                        </div>
                        <div className="service-card">
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Video Editing</h3>
                            <p style={{ opacity: 0.7 }}>High-end post-production, motion graphics, and visual effects for impactful storytelling.</p>
                        </div>
                        <div className="service-card">
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Content Strategy</h3>
                            <p style={{ opacity: 0.7 }}>Data-driven insights to maximize engagement and reach across all platforms.</p>
                        </div>
                        <div className="service-card">
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Brand Identity</h3>
                            <p style={{ opacity: 0.7 }}>Cohesive visual language and tone of voice that resonates with your audience.</p>
                        </div>
                    </div>
                </motion.div>
            </Section>

            <Section style={{ alignItems: 'flex-end', textAlign: 'right' }}>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
                >
                    <h2 className="section-title">PORTFOLIO</h2>
                    <p style={{ fontSize: '1.5rem', opacity: 0.7, maxWidth: '600px', marginBottom: '2rem', marginLeft: 'auto' }}>
                        Selected works showcasing our expertise in visual storytelling.
                    </p>
                    <div className="portfolio-grid">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="portfolio-item">
                                <div className="portfolio-overlay">
                                    <span className="portfolio-title">Project Name {item}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Section>

            <Section>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="contact-container"
                >
                    <h2 className="section-title" style={{ marginBottom: '1rem' }}>LET'S CREATE TOGETHER</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.7, marginBottom: '2rem' }}>
                        Ready to elevate your brand? Drop us a line and let's discuss your next big project.
                    </p>
                    <a href="mailto:contact@ymzmedia.com" className="contact-btn">
                        Get in Touch
                    </a>

                    <div className="social-links">
                        <a href="#" className="social-link">Instagram</a>
                        <a href="#" className="social-link">LinkedIn</a>
                        <a href="#" className="social-link">Twitter</a>
                        <a href="#" className="social-link">YouTube</a>
                    </div>
                </motion.div>
            </Section>

            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                opacity: 0.5,
                fontSize: '0.9rem',
                marginTop: 'auto',
                width: '100%',
                position: 'absolute',
                bottom: 0
            }}>
                <p>&copy; {new Date().getFullYear()} YMZ Media. All rights reserved.</p>
            </footer>
        </Scroll>
    );
};

export default Overlay;
