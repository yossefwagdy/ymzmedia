import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(135deg, #030308 0%, #0a0a1a 50%, #050510 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}
        >
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    fontWeight: '900',
                    fontFamily: 'Outfit, Inter, sans-serif',
                    background: 'linear-gradient(135deg, #00f5ff, #8b5cf6, #ff00aa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '2rem',
                }}
            >
                YMZ MEDIA
            </motion.div>

            {/* Loading bar */}
            <div style={{
                width: '200px',
                height: '3px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                overflow: 'hidden',
            }}>
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, #00f5ff, #8b5cf6, transparent)',
                        borderRadius: '10px',
                    }}
                />
            </div>

            {/* Loading text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.3 }}
                style={{
                    marginTop: '1.5rem',
                    fontSize: '0.85rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.5)',
                }}
            >
                Loading Experience
            </motion.p>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100,
                    }}
                    animate={{
                        opacity: [0, 0.5, 0],
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 400 - 200,
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                    style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: i % 2 === 0 ? '#00f5ff' : '#8b5cf6',
                    }}
                />
            ))}
        </motion.div>
    );
};

export default LoadingScreen;
