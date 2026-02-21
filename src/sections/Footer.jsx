export default function Footer() {
    return (
        <footer style={{
            padding: '60px 0 40px',
            background: 'var(--bg-primary)',
            borderTop: '1px solid rgba(232, 168, 32, 0.06)',
        }}>
            <div style={{
                maxWidth: 'var(--container-max)',
                margin: '0 auto',
                padding: '0 clamp(20px, 4vw, 60px)',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '40px',
                    marginBottom: '60px',
                }}>
                    {/* Brand */}
                    <div style={{ maxWidth: '300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <img src="/logo.png" alt="BugBiceps" style={{ height: '36px', width: 'auto' }} />
                            <span style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '1.2rem',
                                fontWeight: 700,
                            }}>
                                <span style={{ color: '#D42B2B' }}>Bug</span>
                                <span style={{ color: '#E8A820' }}>Biceps</span>
                            </span>
                        </div>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
                        }}>
                            Engineering powerful digital systems. Web, Apps, AI, and Automation — built with precision.
                        </p>
                    </div>

                    {/* Links */}
                    <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
                        <div>
                            <h4 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: 'var(--gold)',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                marginBottom: '16px',
                            }}>Navigation</h4>
                            {['Home', 'Services', 'Work', 'About', 'Contact'].map(link => (
                                <a key={link} href={`#${link.toLowerCase()}`} style={{
                                    display: 'block',
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '10px',
                                    transition: 'color 0.3s ease',
                                }}
                                    onMouseEnter={e => e.target.style.color = '#E8A820'}
                                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    {link}
                                </a>
                            ))}
                        </div>

                        <div>
                            <h4 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: 'var(--gold)',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                marginBottom: '16px',
                            }}>Services</h4>
                            {['AI Engineering', 'Web Development', 'App Development', 'Automation'].map(link => (
                                <span key={link} style={{
                                    display: 'block',
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '10px',
                                }}>
                                    {link}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid rgba(232, 168, 32, 0.06)',
                    paddingTop: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                }}>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                    }}>
                        © 2026 BugBiceps. All rights reserved.
                    </p>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                    }}>
                        Engineered with precision.
                    </p>
                </div>
            </div>
        </footer>
    );
}
