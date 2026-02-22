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
            padding: 'clamp(60px, 8vw, 100px) 0',
            background: 'var(--bg-secondary)',
            position: 'relative',
        }}>
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '0 clamp(24px, 5vw, 80px)',
            }}>
                {/* Compact heading */}
                <div className="contact-reveal" style={{
                    marginBottom: '48px',
                    opacity: 0,
                }}>
                    <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.65rem',
                        letterSpacing: '0.2em',
                        color: 'rgba(240,176,32,0.6)',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        display: 'block',
                        marginBottom: '12px',
                    }}>
                        Start a Project
                    </span>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                    }}>
                        Let's Build{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #F0B020, #F06020)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>Together</span>
                    </h2>
                </div>

                {/* Two-column layout: Form left, Contact info right */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '60px',
                    alignItems: 'start',
                }}>
                    {/* LEFT — Form */}
                    <form id="contact-form" onSubmit={e => e.preventDefault()} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '28px',
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
                                rows={3}
                                style={{
                                    ...inputBaseStyle,
                                    resize: 'vertical',
                                    minHeight: '80px',
                                    lineHeight: 1.7,
                                }}
                                onFocus={(e) => handleFocus(e, 'project')}
                                onBlur={handleBlur}
                            />
                        </div>

                        <div className="contact-reveal" style={{ opacity: 0, marginTop: '8px' }}>
                            <MagneticButton
                                id="contact-submit"
                                style={{
                                    padding: '14px 44px',
                                    background: 'linear-gradient(135deg, #F0B020, #F06020)',
                                    color: '#060608',
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: '0.88rem',
                                    fontWeight: 700,
                                    borderRadius: '50px',
                                    letterSpacing: '0.02em',
                                    boxShadow: '0 0 30px rgba(240, 176, 32, 0.15)',
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

                    {/* RIGHT — Contact Info */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}>
                        <p className="contact-reveal" style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: '0.95rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.75,
                            marginBottom: '8px',
                            opacity: 0,
                        }}>
                            Have a project in mind? Reach out directly and let's discuss how we can bring your vision to life.
                        </p>

                        {/* Email */}
                        <a
                            href="mailto:bugbiceps@gmail.com"
                            className="contact-reveal"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                padding: '16px 20px',
                                background: 'rgba(12, 12, 20, 0.5)',
                                border: '1px solid rgba(240,176,32,0.06)',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                transition: 'border-color 0.3s ease, transform 0.3s ease',
                                opacity: 0,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(240,176,32,0.2)';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(240,176,32,0.06)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <FaEnvelope style={{
                                fontSize: '18px',
                                color: '#F0B020',
                                flexShrink: 0,
                            }} />
                            <div>
                                <span style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.58rem',
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    display: 'block',
                                    marginBottom: '4px',
                                }}>Email</span>
                                <span style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.9rem',
                                    color: 'var(--text-primary)',
                                    fontWeight: 500,
                                }}>bugbiceps@gmail.com</span>
                            </div>
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:+919617214679"
                            className="contact-reveal"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                padding: '16px 20px',
                                background: 'rgba(12, 12, 20, 0.5)',
                                border: '1px solid rgba(240,176,32,0.06)',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                transition: 'border-color 0.3s ease, transform 0.3s ease',
                                opacity: 0,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(240,176,32,0.2)';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(240,176,32,0.06)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <FaPhone style={{
                                fontSize: '18px',
                                color: '#F0B020',
                                flexShrink: 0,
                            }} />
                            <div>
                                <span style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.58rem',
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    display: 'block',
                                    marginBottom: '4px',
                                }}>Phone</span>
                                <span style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.9rem',
                                    color: 'var(--text-primary)',
                                    fontWeight: 500,
                                }}>+91 9617214679</span>
                            </div>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/company/bugbiceps/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-reveal"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                padding: '16px 20px',
                                background: 'rgba(12, 12, 20, 0.5)',
                                border: '1px solid rgba(240,176,32,0.06)',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                transition: 'border-color 0.3s ease, transform 0.3s ease',
                                opacity: 0,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(240,176,32,0.2)';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(240,176,32,0.06)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <FaLinkedin style={{
                                fontSize: '18px',
                                color: '#F0B020',
                                flexShrink: 0,
                            }} />
                            <div>
                                <span style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.58rem',
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    display: 'block',
                                    marginBottom: '4px',
                                }}>LinkedIn</span>
                                <span style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.9rem',
                                    color: 'var(--text-primary)',
                                    fontWeight: 500,
                                }}>Bug Biceps</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
