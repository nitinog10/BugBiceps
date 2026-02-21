import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = ['Home', 'Services', 'Work', 'About', 'Contact'];

    return (
        <nav ref={navRef} className="navbar" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '0 clamp(20px, 4vw, 60px)',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            background: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(232, 168, 32, 0.08)' : '1px solid transparent',
        }}>
            {/* Logo */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="/logo.png" alt="BugBiceps" style={{ height: '42px', width: 'auto' }} />
                <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                }}>
                    <span style={{ color: '#D42B2B' }}>Bug</span>
                    <span style={{ color: '#E8A820' }}>Biceps</span>
                </span>
            </a>

            {/* Desktop Links */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '36px',
            }} className="nav-links-desktop">
                {links.map(link => (
                    <a key={link} href={`#${link.toLowerCase()}`} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.9rem',
                        fontWeight: 400,
                        color: 'var(--text-secondary)',
                        transition: 'color 0.3s ease',
                        position: 'relative',
                        letterSpacing: '0.02em',
                    }}
                        onMouseEnter={e => e.target.style.color = '#E8A820'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                    >
                        {link}
                    </a>
                ))}
                <button style={{
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #E8A820, #E85820)',
                    color: '#0A0A0F',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    borderRadius: '50px',
                    letterSpacing: '0.02em',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = '0 0 30px rgba(232, 168, 32, 0.4)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                    }}
                >
                    Build With BugBiceps
                </button>
            </div>

            {/* Mobile Hamburger */}
            <button
                className="mobile-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    display: 'none',
                    flexDirection: 'column',
                    gap: '5px',
                    padding: '8px',
                }}
            >
                <span style={{
                    width: '24px', height: '2px', background: 'var(--gold)',
                    transition: 'all 0.3s',
                    transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                }} />
                <span style={{
                    width: '24px', height: '2px', background: 'var(--gold)',
                    transition: 'all 0.3s',
                    opacity: menuOpen ? 0 : 1,
                }} />
                <span style={{
                    width: '24px', height: '2px', background: 'var(--gold)',
                    transition: 'all 0.3s',
                    transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                }} />
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
                <div style={{
                    position: 'fixed',
                    top: '80px',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(10, 10, 15, 0.95)',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '32px',
                    zIndex: 999,
                }}>
                    {links.map(link => (
                        <a key={link} href={`#${link.toLowerCase()}`}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                            }}
                        >
                            {link}
                        </a>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </nav>
    );
}
