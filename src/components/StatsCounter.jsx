import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Counter = ({ value, label, suffix = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseInt(value.toString().replace(/\D/g, ''));
            const duration = 1000; // Faster animation (1s)
            const incrementTime = (duration / end) * 10;

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="stat-item" style={{ textAlign: 'center', padding: '1rem' }}>
            <h3 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                {count}{suffix}
            </h3>
            <p style={{ fontSize: '1rem', opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {label}
            </p>
        </div>
    );
};

const StatsCounter = () => {
    return (
        <div className="stats-container" style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            flexWrap: 'wrap',
            gap: '2rem'
        }}>
            <Counter value="50" suffix="+" label="Happy Clients" />
            <Counter value="100" suffix="+" label="Projects Done" />
            <Counter value="5" suffix="+" label="Years Experience" />
            <Counter value="10" suffix="M+" label="Views Generated" />
        </div>
    );
};

export default StatsCounter;
