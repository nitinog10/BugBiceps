import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Animate nav entrance after preloader
    useEffect(() => {
        gsap.fromTo(navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 }
        );
    }, []);

    const links = [
        { label: 'Home', href: '#home' },
        { label: 'Services', href: '#services' },
        { label: 'Work', href: '#work' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ];

    const handleSmoothScroll = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    return (
        <nav ref={navRef} id="main-nav" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '0 clamp(24px, 5vw, 80px)',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            background: scrolled ? 'rgba(6, 6, 8, 0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(240, 176, 32, 0.06)' : '1px solid transparent',
            opacity: 0,
        }}>
            {/* Logo */}
            <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="/logo.png" alt="BugBiceps" style={{
                    height: '38px',
                    width: 'auto',
                    transition: 'opacity 0.3s ease',
                }} />
                <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                }}>
                    <span style={{ color: '#E83030' }}>Bug</span>
                    <span style={{ color: '#F0B020' }}>Biceps</span>
                </span>
            </a>

            {/* Desktop Links */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '40px',
            }} className="nav-links-desktop">
                {links.map(link => (
                    <a key={link.label} href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: '0.82rem',
                            fontWeight: 400,
                            color: 'var(--text-secondary)',
                            transition: 'color 0.3s ease',
                            position: 'relative',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                        }}
                        onMouseEnter={e => e.target.style.color = '#F0B020'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                    >
                        {link.label}
                    </a>
                ))}
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
                    <button id="nav-cta" style={{
                        padding: '10px 28px',
                        background: 'linear-gradient(135deg, #F0B020, #F06020)',
                        color: '#060608',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        borderRadius: '50px',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                        boxShadow: '0 0 20px rgba(240, 176, 32, 0.1)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'scale(1.06)';
                            e.target.style.boxShadow = '0 0 40px rgba(240, 176, 32, 0.3)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 0 20px rgba(240, 176, 32, 0.1)';
                        }}
                    >
                        Let's Talk
                    </button>
                </a>
            </div>

            {/* Mobile Hamburger */}
            <button
                id="mobile-menu-toggle"
                className="mobile-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                style={{
                    display: 'none',
                    flexDirection: 'column',
                    gap: '6px',
                    padding: '8px',
                    zIndex: 1001,
                }}
            >
                <span style={{
                    width: '24px', height: '2px',
                    background: 'var(--gold)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
                }} />
                <span style={{
                    width: '24px', height: '2px',
                    background: 'var(--gold)',
                    transition: 'all 0.3s',
                    opacity: menuOpen ? 0 : 1,
                    transform: menuOpen ? 'translateX(10px)' : 'none',
                }} />
                <span style={{
                    width: '24px', height: '2px',
                    background: 'var(--gold)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
                }} />
            </button>

            {/* Mobile Menu */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(6, 6, 8, 0.98)',
                backdropFilter: 'blur(30px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '40px',
                zIndex: 999,
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: menuOpen ? 1 : 0,
                pointerEvents: menuOpen ? 'auto' : 'none',
                clipPath: menuOpen ? 'inset(0)' : 'inset(0 0 100% 0)',
            }}>
                {links.map((link, i) => (
                    <a key={link.label} href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.02em',
                            transition: 'color 0.3s ease, transform 0.3s ease',
                            transform: menuOpen ? 'translateY(0)' : `translateY(${20 + i * 10}px)`,
                        }}
                        onMouseEnter={e => e.target.style.color = '#F0B020'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}
                    >
                        {link.label}
                    </a>
                ))}
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .nav-links-desktop { display: none !important; }
                    .mobile-menu-btn { display: flex !important; }
                }
            `}</style>
        </nav>
    );
}
