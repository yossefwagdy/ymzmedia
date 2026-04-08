import React, { memo, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Footer from './Footer';
import ParticlesBackground from './ParticlesBackground';

const Layout = memo(() => {
    const { t, isRTL, toggleLanguage } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { to: '/', label: t('navHome') },
        { to: '/services', label: t('navServices') },
        { to: '/blog', label: t('navBlog') },
        { to: '/about', label: t('navAbout') },
        { to: '/agents', label: t('navAgents') },
        { to: '/certificates', label: t('navCertificates') },
        { to: '/contact', label: t('navContact') }
    ];

    return (
        <div className="layout" dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', isolation: 'isolate' }}>
            <ParticlesBackground />
            <header
                className="header"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background:
                        'linear-gradient(180deg, rgba(5, 5, 16, 0.94) 0%, rgba(5, 5, 16, 0.78) 65%, transparent 100%)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div
                    className="container flex-center"
                    style={{
                        justifyContent: 'space-between',
                        height: '80px',
                        maxWidth: '1400px',
                        margin: '0 auto',
                        padding: '0 2rem',
                        flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}
                >
                    <NavLink to="/" className="logo" style={{ textDecoration: 'none' }}>
                        YMZ Media
                    </NavLink>

                    <nav className="nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <ul
                            className="flex-center"
                            style={{
                                gap: '1.5rem',
                                listStyle: 'none',
                                margin: 0,
                                padding: 0,
                                flexDirection: isRTL ? 'row-reverse' : 'row'
                            }}
                        >
                            {navItems.map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        style={({ isActive }) => ({
                                            fontSize: '0.85rem',
                                            fontWeight: '500',
                                            letterSpacing: isRTL ? '0' : '0.08em',
                                            textTransform: isRTL ? 'none' : 'uppercase',
                                            color: isActive ? '#00f5ff' : 'rgba(255, 255, 255, 0.8)',
                                            transition: 'color 0.3s ease',
                                            textDecoration: 'none',
                                            fontFamily: isRTL ? 'Tajawal, sans-serif' : 'inherit'
                                        })}
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button
                                onClick={toggleLanguage}
                                className="lang-toggle-btn"
                                style={{
                                    padding: '0.4rem 0.8rem',
                                    background:
                                        'linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(139, 92, 246, 0.15))',
                                    border: '1px solid rgba(0, 245, 255, 0.3)',
                                    borderRadius: '20px',
                                    color: '#00f5ff',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                {t('langSwitch')}
                            </button>

                            <button
                                className="mobile-menu-btn"
                                onClick={() => setIsMobileMenuOpen((value) => !value)}
                                aria-label="Toggle menu"
                                style={{
                                    display: 'none',
                                    color: '#fff',
                                    fontSize: '1.5rem',
                                    zIndex: 1001
                                }}
                            >
                                ≡
                            </button>
                        </div>
                    </nav>
                </div>

                <div
                    className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        zIndex: 999,
                        opacity: isMobileMenuOpen ? 1 : 0,
                        pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
                        transition: 'opacity 0.3s ease',
                        display: 'none'
                    }}
                />

                <div
                    className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}
                    style={{
                        position: 'fixed',
                        top: 0,
                        [isRTL ? 'left' : 'right']: 0,
                        width: '75vw',
                        maxWidth: '300px',
                        height: '100vh',
                        background: 'linear-gradient(180deg, rgba(15, 15, 25, 0.98), rgba(10, 10, 20, 0.95))',
                        borderLeft: !isRTL ? '1px solid rgba(255,255,255,0.1)' : 'none',
                        borderRight: isRTL ? '1px solid rgba(255,255,255,0.1)' : 'none',
                        zIndex: 1000,
                        transform: isMobileMenuOpen ? 'translateX(0)' : `translateX(${isRTL ? '-100%' : '100%'})`,
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        padding: '6rem 2rem 2rem 2rem',
                        display: 'none',
                        flexDirection: 'column',
                        gap: '2rem'
                    }}
                >
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '1.5rem',
                            [isRTL ? 'left' : 'right']: '1.5rem',
                            color: '#fff',
                            fontSize: '2rem',
                            lineHeight: 1
                        }}
                    >
                        &times;
                    </button>

                    <ul
                        style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        {navItems.map((item) => (
                            <li key={`mobile-${item.to}`}>
                                <NavLink
                                    to={item.to}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        fontSize: '1.2rem',
                                        fontWeight: '600',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        display: 'block',
                                        padding: '0.5rem 0',
                                        borderBottom: '1px solid rgba(255,255,255,0.05)'
                                    }}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </header>

            <main className="main-content" style={{ flex: 1, position: 'relative' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
});

export default Layout;
