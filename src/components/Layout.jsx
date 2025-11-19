import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <header className="header">
                <div className="container flex-center" style={{ justifyContent: 'space-between', height: '80px' }}>
                    <div className="logo">YMZ Media</div>
                    <nav className="nav">
                        <ul className="flex-center" style={{ gap: '2rem', listStyle: 'none' }}>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#portfolio">Portfolio</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
