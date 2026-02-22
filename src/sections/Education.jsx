import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaGraduationCap, FaLightbulb, FaUsers, FaRocket, FaCompass, FaCode
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const focusPoints = [
    { icon: FaCode, title: 'AI & Real Tech', desc: 'Industry-relevant AI, development, and systems design.' },
    { icon: FaRocket, title: 'Real Projects', desc: 'Build products used in startups from day one.' },
    { icon: FaUsers, title: 'Learn from Builders', desc: 'Mentorship from people shipping code, not just theory.' },
    { icon: FaCompass, title: 'Career Clarity', desc: 'Structured roadmaps that match your ambitions.' },
    { icon: FaLightbulb, title: 'Fundamentals First', desc: 'Problem-solving and core concepts that never expire.' },
    { icon: FaGraduationCap, title: 'Prepared for Tomorrow', desc: 'Train for careers, startups, or whatever comes next.' },
];

export default function Education() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.edu-reveal',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'expo.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="education" ref={sectionRef} style={{
            padding: 'clamp(60px, 8vw, 100px) 0',
            background: 'var(--bg-primary)',
            overflow: 'hidden',
            position: 'relative',
        }}>
            {/* Top line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.2), transparent)',
            }} />

            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '0 clamp(24px, 5vw, 80px)',
            }}>
                {/* Two-column layout */}
                <div className="edu-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '60px',
                    alignItems: 'start',
                }}>
                    {/* LEFT — Heading + Vision + CTA */}
                    <div>
                        <div className="edu-reveal" style={{ opacity: 0, marginBottom: '20px' }}>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.65rem',
                                letterSpacing: '0.2em',
                                color: 'rgba(240, 176, 32, 0.55)',
                                textTransform: 'uppercase',
                                fontWeight: 500,
                                display: 'block',
                                marginBottom: '12px',
                            }}>
                                Our Mission
                            </span>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                                fontWeight: 800,
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.03em',
                                lineHeight: 1.08,
                            }}>
                                Education &{' '}
                                <span style={{
                                    background: 'linear-gradient(135deg, #F0B020, #F06020)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>Career Stability</span>
                            </h2>
                        </div>

                        <p className="edu-reveal" style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.75,
                            marginBottom: '24px',
                            opacity: 0,
                        }}>
                            Bug Biceps is not just a company—it's a <span style={{ color: '#F0B020', fontWeight: 600 }}>career-building ecosystem</span>. We empower students to become confident, skilled, and stable tech professionals through structured learning and hands-on exposure.
                        </p>

                        {/* Difference statement */}
                        <div className="edu-reveal" style={{
                            padding: '20px 24px',
                            background: 'linear-gradient(135deg, rgba(240,176,32,0.06), rgba(240,100,32,0.03))',
                            border: '1px solid rgba(240, 176, 32, 0.12)',
                            borderRadius: '12px',
                            marginBottom: '28px',
                            opacity: 0,
                        }}>
                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.82rem',
                                color: 'var(--text-primary)',
                                lineHeight: 1.65,
                                fontWeight: 500,
                            }}>
                                We don't sell <span style={{ color: '#F0B020' }}>shortcuts</span>. We build{' '}
                                <span style={{ color: '#F0B020' }}>real skills, real mindsets, and real experience</span>—the foundation for a career that lasts.
                            </p>
                        </div>

                        <div className="edu-reveal" style={{ opacity: 0 }}>
                            <a
                                href="#contact"
                                style={{
                                    display: 'inline-block',
                                    padding: '12px 32px',
                                    background: 'linear-gradient(135deg, #F0B020, #F06020)',
                                    color: '#0c0c14',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    borderRadius: '50px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    letterSpacing: '0.5px',
                                    boxShadow: '0 8px 24px rgba(240,176,32,0.2)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(240,176,32,0.35)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(240,176,32,0.2)';
                                }}
                            >
                                Build Skills That Last →
                            </a>
                        </div>
                    </div>

                    {/* RIGHT — Focus Points as compact cards */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}>
                        {focusPoints.map((point) => {
                            const IconComponent = point.icon;
                            return (
                                <div
                                    key={point.title}
                                    className="edu-reveal"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '14px',
                                        padding: '16px 20px',
                                        background: 'rgba(12, 12, 20, 0.5)',
                                        border: '1px solid rgba(240, 176, 32, 0.06)',
                                        borderRadius: '12px',
                                        transition: 'border-color 0.3s ease, transform 0.3s ease',
                                        opacity: 0,
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.2)';
                                        e.currentTarget.style.transform = 'translateX(4px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.06)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    <IconComponent style={{
                                        fontSize: '20px',
                                        color: '#F0B020',
                                        flexShrink: 0,
                                        marginTop: '2px',
                                    }} />
                                    <div>
                                        <h3 style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: '0.9rem',
                                            fontWeight: 700,
                                            color: 'var(--text-primary)',
                                            lineHeight: 1.3,
                                            marginBottom: '4px',
                                        }}>
                                            {point.title}
                                        </h3>
                                        <p style={{
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '0.78rem',
                                            color: 'var(--text-secondary)',
                                            lineHeight: 1.55,
                                        }}>
                                            {point.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom line */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.2), transparent)',
            }} />

            <style>{`
                @media (max-width: 600px) {
                    .edu-grid {
                        grid-template-columns: 1fr !important;
                        gap: 36px !important;
                    }
                }
            `}</style>
        </section>
    );
}
