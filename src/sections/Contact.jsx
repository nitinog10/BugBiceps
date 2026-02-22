import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef(null);
    const [focusedField, setFocusedField] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.contact-reveal',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const inputBaseStyle = {
        width: '100%',
        padding: '18px 0',
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid rgba(240, 176, 32, 0.1)',
        color: 'var(--text-primary)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        letterSpacing: '0.01em',
    };

    const labelStyle = {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '8px',
        display: 'block',
        fontWeight: 500,
        transition: 'color 0.3s ease',
    };

    const handleFocus = (e, field) => {
        e.target.style.borderBottom = '1px solid #F0B020';
        setFocusedField(field);
    };

    const handleBlur = (e) => {
        e.target.style.borderBottom = '1px solid rgba(240, 176, 32, 0.1)';
        setFocusedField(null);
    };

    return (
        <section id="contact" ref={sectionRef} style={{
            padding: 'var(--section-pad) 0',
            background: 'var(--bg-secondary)',
            position: 'relative',
        }}>
            <div style={{
                maxWidth: '680px',
                margin: '0 auto',
                padding: '0 clamp(24px, 5vw, 80px)',
            }}>
                <div className="contact-reveal" style={{
                    textAlign: 'center',
                    marginBottom: '70px',
                    opacity: 0,
                }}>
                    <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        color: 'rgba(240,176,32,0.6)',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                    }}>
                        Start a Project
                    </span>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                        fontWeight: 800,
                        marginTop: '14px',
                        letterSpacing: '-0.03em',
                    }}>
                        Let's Build{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #F0B020, #F06020)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>Together</span>
                    </h2>
                    <p style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '0.95rem',
                        color: 'var(--text-secondary)',
                        marginTop: '16px',
                        lineHeight: 1.7,
                    }}>
                        Have a project in mind? Let's discuss how we can bring your vision to life.
                    </p>
                </div>

                <form id="contact-form" onSubmit={e => e.preventDefault()} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px',
                }}>
                    <div className="contact-reveal" style={{ opacity: 0 }}>
                        <label style={{
                            ...labelStyle,
                            color: focusedField === 'name' ? '#F0B020' : 'var(--text-muted)',
                        }}>Name</label>
                        <input
                            id="contact-name"
                            type="text"
                            placeholder="Your name"
                            style={inputBaseStyle}
                            onFocus={(e) => handleFocus(e, 'name')}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className="contact-reveal" style={{ opacity: 0 }}>
                        <label style={{
                            ...labelStyle,
                            color: focusedField === 'email' ? '#F0B020' : 'var(--text-muted)',
                        }}>Email</label>
                        <input
                            id="contact-email"
                            type="email"
                            placeholder="your@email.com"
                            style={inputBaseStyle}
                            onFocus={(e) => handleFocus(e, 'email')}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className="contact-reveal" style={{ opacity: 0 }}>
                        <label style={{
                            ...labelStyle,
                            color: focusedField === 'project' ? '#F0B020' : 'var(--text-muted)',
                        }}>Project Details</label>
                        <textarea
                            id="contact-message"
                            placeholder="Describe your project..."
                            rows={4}
                            style={{
                                ...inputBaseStyle,
                                resize: 'vertical',
                                minHeight: '120px',
                                lineHeight: 1.7,
                            }}
                            onFocus={(e) => handleFocus(e, 'project')}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className="contact-reveal" style={{
                        opacity: 0,
                        textAlign: 'center',
                        marginTop: '16px',
                    }}>
                        <MagneticButton
                            id="contact-submit"
                            style={{
                                padding: '18px 56px',
                                background: 'linear-gradient(135deg, #F0B020, #F06020)',
                                color: '#060608',
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                borderRadius: '50px',
                                letterSpacing: '0.02em',
                                boxShadow: '0 0 40px rgba(240, 176, 32, 0.15)',
                                transition: 'box-shadow 0.4s ease',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <span style={{ position: 'relative', zIndex: 1 }}>
                                Send Message →
                            </span>
                        </MagneticButton>
                    </div>
                </form>

                {/* Contact Info Section */}
                <div style={{
                    marginTop: '80px',
                    paddingTop: '60px',
                    borderTop: '1px solid rgba(240, 176, 32, 0.1)',
                    textAlign: 'center',
                }}>
                    <p style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '32px',
                        letterSpacing: '0.01em',
                    }}>
                        Or reach out directly
                    </p>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '48px',
                        flexWrap: 'wrap',
                    }}>
                        {/* Email */}
                        <div className="contact-reveal" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            opacity: 0,
                        }}>
                            <FaEnvelope style={{
                                fontSize: '20px',
                                background: 'linear-gradient(135deg, #F0B020, #F06020)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }} />
                            <a
                                href="mailto:bugbiceps@gmail.com"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.95rem',
                                    color: 'var(--text-primary)',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s ease',
                                    fontWeight: 500,
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#F0B020'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            >
                                bugbiceps@gmail.com
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="contact-reveal" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            opacity: 0,
                        }}>
                            <FaPhone style={{
                                fontSize: '20px',
                                background: 'linear-gradient(135deg, #F0B020, #F06020)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }} />
                            <a
                                href="tel:+919617214679"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.95rem',
                                    color: 'var(--text-primary)',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s ease',
                                    fontWeight: 500,
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#F0B020'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            >
                                +91 9617214679
                            </a>
                        </div>

                        {/* LinkedIn */}
                        <div className="contact-reveal" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            opacity: 0,
                        }}>
                            <FaLinkedin style={{
                                fontSize: '20px',
                                background: 'linear-gradient(135deg, #F0B020, #F06020)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }} />
                            <a
                                href="https://www.linkedin.com/company/bugbiceps/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.95rem',
                                    color: 'var(--text-primary)',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s ease',
                                    fontWeight: 500,
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#F0B020'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
