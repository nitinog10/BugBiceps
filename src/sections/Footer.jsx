import { FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            padding: '80px 0 40px',
            background: 'var(--bg-primary)',
            borderTop: '1px solid rgba(240, 176, 32, 0.06)',
        }}>
            <div style={{
                maxWidth: 'var(--container-max)',
                margin: '0 auto',
                padding: '0 clamp(24px, 5vw, 80px)',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '50px',
                    marginBottom: '70px',
                }}>
                    {/* Brand */}
                    <div style={{ maxWidth: '320px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '20px',
                        }}>
                            <img src="/logo.png" alt="BugBiceps" style={{
                                height: '34px',
                                width: 'auto',
                            }} />
                            <span style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '1.15rem',
                                fontWeight: 800,
                            }}>
                                <span style={{ color: '#E83030' }}>Bug</span>
                                <span style={{ color: '#F0B020' }}>Biceps</span>
                            </span>
                        </div>
                        <p style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                        }}>
                            Engineering digital systems that scale. Web, Mobile, AI, and Automation — built with precision and purpose.
                        </p>

                        {/* Status badge */}
                        <div style={{
                            marginTop: '24px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 16px',
                            borderRadius: '50px',
                            border: '1px solid rgba(240,176,32,0.1)',
                            background: 'rgba(240,176,32,0.03)',
                        }}>
                            <div style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#4ADE80',
                                boxShadow: '0 0 8px rgba(74,222,128,0.4)',
                                animation: 'breathe 2s ease-in-out infinite',
                            }} />
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.6rem',
                                color: 'var(--text-muted)',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                fontWeight: 500,
                            }}>Available for projects</span>
                        </div>
                    </div>

                    {/* Links */}
                    <div style={{ display: 'flex', gap: '70px', flexWrap: 'wrap' }}>
                        <div>
                            <h4 style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                color: 'rgba(240,176,32,0.6)',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                marginBottom: '20px',
                            }}>Navigation</h4>
                            {['Home', 'Services', 'Work', 'About', 'Contact'].map(link => (
                                <a key={link} href={`#${link.toLowerCase()}`} style={{
                                    display: 'block',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '12px',
                                    transition: 'color 0.3s ease',
                                }}
                                    onMouseEnter={e => e.target.style.color = '#F0B020'}
                                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    {link}
                                </a>
                            ))}
                        </div>

                        <div>
                            <h4 style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                color: 'rgba(240,176,32,0.6)',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                marginBottom: '20px',
                            }}>Services</h4>
                            {['AI Engineering', 'Web Development', 'App Development', 'Automation', 'SEO / GEO'].map(link => (
                                <span key={link} style={{
                                    display: 'block',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.85rem',
                                    color: 'var(--text-muted)',
                                    marginBottom: '12px',
                                }}>
                                    {link}
                                </span>
                            ))}
                        </div>

                        <div>
                            <h4 style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                color: 'rgba(240,176,32,0.6)',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                marginBottom: '20px',
                            }}>Connect</h4>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px',
                            }}>
                                {/* Email */}
                                <a href="mailto:bugbiceps@gmail.com" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s ease',
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = '#F0B020';
                                        e.currentTarget.querySelector('svg').style.color = '#F0B020';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                        e.currentTarget.querySelector('svg').style.color = 'rgba(240,176,32,0.7)';
                                    }}
                                >
                                    <FaEnvelope style={{
                                        fontSize: '14px',
                                        color: 'rgba(240,176,32,0.7)',
                                        transition: 'color 0.3s ease',
                                    }} />
                                    bugbiceps@gmail.com
                                </a>

                                {/* Phone */}
                                <a href="tel:+919617214679" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s ease',
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = '#F0B020';
                                        e.currentTarget.querySelector('svg').style.color = '#F0B020';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                        e.currentTarget.querySelector('svg').style.color = 'rgba(240,176,32,0.7)';
                                    }}
                                >
                                    <FaPhone style={{
                                        fontSize: '14px',
                                        color: 'rgba(240,176,32,0.7)',
                                        transition: 'color 0.3s ease',
                                    }} />
                                    +91 9617214679
                                </a>

                                {/* LinkedIn */}
                                <a href="https://www.linkedin.com/company/bugbiceps/" target="_blank" rel="noopener noreferrer" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s ease',
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = '#F0B020';
                                        e.currentTarget.querySelector('svg').style.color = '#F0B020';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                        e.currentTarget.querySelector('svg').style.color = 'rgba(240,176,32,0.7)';
                                    }}
                                >
                                    <FaLinkedin style={{
                                        fontSize: '14px',
                                        color: 'rgba(240,176,32,0.7)',
                                        transition: 'color 0.3s ease',
                                    }} />
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid rgba(240, 176, 32, 0.06)',
                    paddingTop: '28px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                }}>
                    <p style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.05em',
                    }}>
                        © {currentYear} BugBiceps. All rights reserved.
                    </p>
                    <p style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.05em',
                    }}>
                        Engineered with precision ◆
                    </p>
                </div>
            </div>
        </footer>
    );
}
