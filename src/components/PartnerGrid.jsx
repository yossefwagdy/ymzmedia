import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaYoutube, FaMeta, FaTiktok } from 'react-icons/fa6';
import { SiGoogleads } from 'react-icons/si';

const PartnerGrid = ({ items }) => {
    const getIcon = (item) => {
        switch (item) {
            case 'Google': return <FaGoogle />;
            case 'YouTube': return <FaYoutube />;
            case 'Google Ads': return <SiGoogleads />;
            case 'Meta': return <FaMeta />;
            case 'TikTok': return <FaTiktok />;
            default: return null;
        }
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem',
            alignItems: 'center',
            justifyItems: 'center'
        }}>
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{
                        scale: 1.05,
                        y: -5,
                        borderColor: 'rgba(0, 245, 255, 0.5)',
                    }}
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
                    }}
                >
                    {getIcon(item) || (
                        <span style={{
                            opacity: 0.5,
                            fontWeight: '600',
                            fontSize: '0.85rem',
                        }}>
                            {item}
                        </span>
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export default PartnerGrid;
