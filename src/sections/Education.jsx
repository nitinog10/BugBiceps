import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaGraduationCap, FaLightbulb, FaUsers, FaRocket, FaCompass, FaCode
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const focusPoints = [
    {
        icon: FaCode,
        title: 'AI & Real Tech',
        desc: 'Learn industry-relevant AI, development, and systems design through hands-on experience.'
    },
    {
        icon: FaRocket,
        title: 'Real Projects, Real Impact',
        desc: 'Build products used in startups and enterprises. Your work matters from day one.'
    },
    {
        icon: FaUsers,
        title: 'Learn from Builders',
        desc: 'Mentorship from people shipping code, not just theory. Practical guidance from experienced professionals.'
    },
    {
        icon: FaCompass,
        title: 'Career Clarity',
        desc: 'Structured roadmaps that match your ambitions. Know where you are, where you are going, and how to get there.'
    },
    {
        icon: FaLightbulb,
        title: 'Fundamentals First',
        desc: 'Master problem-solving, consistency, and core concepts that never go out of date.'
    },
    {
        icon: FaGraduationCap,
        title: 'Prepared for Tomorrow',
        desc: 'Train for stable tech careers, startups, or whatever the future brings.'
    },
];

export default function Education() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
            gsap.timeline({
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'top 88%',
                    end: 'top 55%',
                    scrub: 0.6,
                },
            }).fromTo(headingRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'none' }
            );

            // Cards stagger in
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 92%',
                        end: 'top 55%',
                        scrub: 0.8,
                    },
                }).fromTo(card,
                    {
                        y: 50,
                        opacity: 0,
                        scale: 0.96,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: 'none',
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Hover animation
    const handleMouseEnter = (el) => {
        if (!el) return;
        gsap.to(el, { y: -8, scale: 1.03, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    };
    const handleMouseLeave = (el) => {
        if (!el) return;
        gsap.to(el, { y: 0, scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    };

    return (
        <section id="education" ref={sectionRef} style={{
            padding: 'var(--section-pad) 0',
            background: 'var(--bg-primary)',
            overflow: 'hidden',
            position: 'relative',
        }}>
            {/* Top decorative line */}
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
                {/* Heading Section */}
                <div ref={headingRef} style={{
                    marginBottom: '80px',
                    textAlign: 'center',
                    opacity: 0,
                }}>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        color: 'rgba(240, 176, 32, 0.55)',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        display: 'block',
                        marginBottom: '16px',
                    }}>
                        Our Mission
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.08,
                        marginBottom: '24px',
                    }}>
                        Education & <span style={{
                            background: 'linear-gradient(135deg, #F0B020, #F06020)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>Career Stability</span>
                    </h2>

                    {/* Vision Statement */}
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.8,
                        maxWidth: '700px',
                        margin: '0 auto',
                        letterSpacing: '-0.01em',
                    }}>
                        Bug Biceps is not just a company—it's a <span style={{ color: '#F0B020', fontWeight: 600 }}>career-building ecosystem</span>. We empower students to become confident, skilled, and genuinely stable tech professionals through structured learning, real-world mentorship, and hands-on project exposure.
                    </p>
                </div>

                {/* Core Focus Points Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '28px',
                    marginBottom: '80px',
                }}>
                    {focusPoints.map((point, i) => {
                        const IconComponent = point.icon;
                        return (
                            <div
                                key={point.title}
                                ref={el => cardsRef.current[i] = el}
                                data-cursor-hover
                                onMouseEnter={() => handleMouseEnter(cardsRef.current[i])}
                                onMouseLeave={() => handleMouseLeave(cardsRef.current[i])}
                                style={{
                                    padding: '40px 32px',
                                    background: 'rgba(12, 12, 20, 0.6)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(240, 176, 32, 0.06)',
                                    borderRadius: '16px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    opacity: 0,
                                    cursor: 'none',
                                    willChange: 'transform, opacity',
                                    transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.18)';
                                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.35), 0 0 20px rgba(240,176,32,0.06)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.06)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Top accent line */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: 'linear-gradient(90deg, rgba(240,176,32,0.5), transparent)',
                                }} />

                                {/* Icon */}
                                <div style={{
                                    marginBottom: '20px',
                                }}>
                                    <IconComponent
                                        style={{
                                            fontSize: '36px',
                                            background: 'linear-gradient(135deg, #F0B020, #F06020)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            opacity: 0.9,
                                        }}
                                    />
                                </div>

                                {/* Title */}
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.15rem',
                                    fontWeight: 700,
                                    color: 'var(--text-primary)',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.3,
                                    marginBottom: '12px',
                                }}>
                                    {point.title}
                                </h3>

                                {/* Description */}
                                <p style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.65,
                                    marginBottom: '16px',
                                }}>
                                    {point.desc}
                                </p>

                                {/* Bottom accent */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '1px',
                                    background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.1))',
                                }} />
                            </div>
                        );
                    })}
                </div>

                {/* Difference Statement */}
                <div style={{
                    padding: '48px 40px',
                    background: 'linear-gradient(135deg, rgba(240,176,32,0.06), rgba(240,100,32,0.03))',
                    border: '1px solid rgba(240, 176, 32, 0.12)',
                    borderRadius: '16px',
                    textAlign: 'center',
                    marginBottom: '60px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Background glow */}
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(240,176,32,0.08), transparent)',
                        pointerEvents: 'none',
                    }} />

                    <p style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.6,
                        maxWidth: '700px',
                        margin: '0 auto',
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        We're different because we don't sell <span style={{ color: '#F0B020' }}>shortcuts or promises</span>. 
                        We build <span style={{ color: '#F0B020' }}>real skills, real mindsets, and real experience</span>—
                        the foundation for a stable tech career that lasts.
                    </p>
                </div>

                {/* CTA Section */}
                <div style={{
                    textAlign: 'center',
                    paddingBottom: '40px',
                }}>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '28px',
                        lineHeight: 1.7,
                        maxWidth: '600px',
                        margin: '0 auto 28px auto',
                    }}>
                        Ready to build skills that last? Join a community of learners, builders, and innovators committed to real growth.
                    </p>

                    <a
                        href="#contact"
                        style={{
                            display: 'inline-block',
                            padding: '14px 36px',
                            background: 'linear-gradient(135deg, #F0B020, #F06020)',
                            color: '#0c0c14',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            borderRadius: '50px',
                            textDecoration: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            letterSpacing: '0.5px',
                            boxShadow: '0 8px 24px rgba(240,176,32,0.25)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(240,176,32,0.35)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(240,176,32,0.25)';
                        }}
                    >
                        Build Skills That Last →
                    </a>
                </div>
            </div>

            {/* Bottom decorative line */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.2), transparent)',
            }} />
        </section>
    );
}
