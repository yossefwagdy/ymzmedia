import React from 'react';
import { motion } from 'framer-motion';

const PartnerGrid = ({ title, items }) => {
    return (
        <div className="partner-section" style={{ width: '100%', marginBottom: '4rem' }}>
            <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '2rem',
                opacity: 0.8,
                textAlign: 'center',
                letterSpacing: '0.2em'
            }}>
                {title}
            </h3>
            <div className="partner-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '2rem',
                alignItems: 'center',
                justifyItems: 'center'
            }}>
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.1, filter: 'brightness(1.2)' }}
                        style={{
                            width: '100%',
                            height: '80px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            cursor: 'pointer'
                        }}
                    >
                        {/* Placeholder for Logo */}
                        <span style={{ opacity: 0.5, fontWeight: 'bold' }}>{item}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PartnerGrid;
