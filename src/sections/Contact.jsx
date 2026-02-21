import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.contact-item',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const inputStyle = {
        width: '100%',
        padding: '16px 0',
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid rgba(232, 168, 32, 0.15)',
        color: 'var(--text-primary)',
        fontFamily: "'Inter', sans-serif",
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    };

    const handleFocus = (e) => {
        e.target.style.borderBottom = '1px solid var(--gold)';
    };
    const handleBlur = (e) => {
        e.target.style.borderBottom = '1px solid rgba(232, 168, 32, 0.15)';
    };

    return (
        <section id="contact" ref={sectionRef} style={{
            padding: 'var(--section-pad) 0',
            background: 'var(--bg-secondary)',
            position: 'relative',
        }}>
            <div style={{
                maxWidth: '700px',
                margin: '0 auto',
                padding: '0 clamp(20px, 4vw, 60px)',
            }}>
                <div className="contact-item" style={{ textAlign: 'center', marginBottom: '60px', opacity: 0 }}>
                    <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.8rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gold)',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                    }}>
                        Start a Project
                    </span>
                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        marginTop: '12px',
                        letterSpacing: '-0.02em',
                    }}>
                        Let's Build{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #E8A820, #E85820)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>Together</span>
                    </h2>
                </div>

                <form onSubmit={e => e.preventDefault()} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '36px',
                }}>
                    <div className="contact-item" style={{ opacity: 0 }}>
                        <label style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '8px',
                            display: 'block',
                        }}>Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            style={inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className="contact-item" style={{ opacity: 0 }}>
                        <label style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '8px',
                            display: 'block',
                        }}>Email</label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            style={inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className="contact-item" style={{ opacity: 0 }}>
                        <label style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '8px',
                            display: 'block',
                        }}>Project Details</label>
                        <textarea
                            placeholder="Describe your project..."
                            rows={4}
                            style={{
                                ...inputStyle,
                                resize: 'vertical',
                                minHeight: '120px',
                            }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className="contact-item" style={{ opacity: 0, textAlign: 'center', marginTop: '12px' }}>
                        <MagneticButton style={{
                            padding: '16px 48px',
                            background: 'linear-gradient(135deg, #E8A820, #E85820)',
                            color: '#0A0A0F',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '1rem',
                            fontWeight: 600,
                            borderRadius: '50px',
                            letterSpacing: '0.02em',
                            boxShadow: '0 0 40px rgba(232, 168, 32, 0.2)',
                        }}>
                            Send Message
                        </MagneticButton>
                    </div>
                </form>
            </div>
        </section>
    );
}
