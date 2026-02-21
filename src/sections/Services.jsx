import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Web Development',
        desc: 'High-performance web platforms built for scale, speed, and conversion.',
        tag: 'Frontend · Backend · Full-Stack',
    },
    {
        title: 'App Development',
        desc: 'Native & cross-platform mobile applications with pixel-perfect UX.',
        tag: 'iOS · Android · React Native',
    },
    {
        title: 'AI Fine-Tuning',
        desc: 'Domain-specific LLM fine-tuning for production-grade AI systems.',
        tag: 'GPT · LLaMA · Mistral',
    },
    {
        title: 'RAG Systems & Chatbots',
        desc: 'Retrieval-augmented generation pipelines with intelligent conversational agents.',
        tag: 'Vector DB · Embeddings · Agents',
    },
    {
        title: 'Automation Engineering',
        desc: 'End-to-end workflow automation that eliminates manual processes.',
        tag: 'Pipelines · ETL · Integration',
    },
    {
        title: 'SEO / GEO Optimization',
        desc: 'Data-driven search and generative engine optimization strategies.',
        tag: 'Technical SEO · AI Search · Analytics',
    },
    {
        title: 'Digital Marketing',
        desc: 'Performance marketing campaigns with measurable ROI.',
        tag: 'PPC · Social · Growth',
    },
    {
        title: 'Graphic Design',
        desc: 'Visual identity systems and brand design that commands attention.',
        tag: 'Branding · UI/UX · Visual',
    },
    {
        title: 'Blender / 3D Visualization',
        desc: '3D modeling, animation, and cinematic visual effects.',
        tag: 'Modeling · Animation · Render',
    },
];

export default function Services() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef([]);
    const glowLinesRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── Heading entrance ──
            gsap.fromTo(headingRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 85%',
                    },
                }
            );

            // ── Each card enters individually on scroll ──
            // Alternating slant: odd = from left, even = from right
            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                const isEven = i % 2 === 0;
                const xOffset = isEven ? -80 : 80;
                const rotation = isEven ? -3 : 3;

                gsap.fromTo(card,
                    {
                        x: xOffset,
                        y: 50,
                        opacity: 0,
                        rotate: rotation,
                        scale: 0.92,
                        filter: 'blur(3px)',
                    },
                    {
                        x: isEven ? -20 : 20,       // Final resting slant offset
                        y: 0,
                        opacity: 1,
                        rotate: isEven ? -1.5 : 1.5, // Subtle resting slant
                        scale: 1,
                        filter: 'blur(0px)',
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 88%',
                            end: 'top 50%',
                            toggleActions: 'play none none none',
                        },
                    }
                );

                // Activation glow line
                const line = glowLinesRef.current[i];
                if (line) {
                    gsap.fromTo(line,
                        { scaleX: 0, opacity: 0 },
                        {
                            scaleX: 1,
                            opacity: 1,
                            duration: 0.7,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 85%',
                            },
                            delay: 0.35,
                        }
                    );
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // ── Hover: lift + straighten ──
    const handleMouseEnter = (cardEl, i) => {
        if (!cardEl) return;
        gsap.to(cardEl, {
            y: -8,
            rotate: 0,            // Straighten on hover
            scale: 1.03,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
        });
    };

    const handleMouseLeave = (cardEl, i) => {
        if (!cardEl) return;
        const isEven = i % 2 === 0;
        gsap.to(cardEl, {
            y: 0,
            rotate: isEven ? -1.5 : 1.5,  // Back to resting slant
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto',
        });
    };

    return (
        <section id="services" ref={sectionRef} style={{
            position: 'relative',
            padding: 'var(--section-pad) 0',
            background: 'var(--bg-primary)',
            overflow: 'hidden',
        }}>
            <div style={{
                maxWidth: '720px',
                margin: '0 auto',
                padding: '0 clamp(24px, 5vw, 80px)',
            }}>
                {/* ── Section heading ── */}
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
                        What We Build
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.08,
                    }}>
                        Services &{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #F0B020, #F06020)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>Capabilities</span>
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        color: 'var(--text-secondary)',
                        marginTop: '14px',
                        maxWidth: '480px',
                        margin: '14px auto 0',
                        lineHeight: 1.7,
                    }}>
                        From concept to deployment — we engineer systems
                        across the full digital spectrum.
                    </p>
                </div>

                {/* ── Stacked mirror cards ── */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '28px',
                    alignItems: 'center',
                }}>
                    {services.map((service, i) => {
                        const isEven = i % 2 === 0;

                        return (
                            <div
                                key={service.title}
                                ref={el => cardsRef.current[i] = el}
                                data-cursor-hover
                                onMouseEnter={() => handleMouseEnter(cardsRef.current[i], i)}
                                onMouseLeave={() => handleMouseLeave(cardsRef.current[i], i)}
                                style={{
                                    width: '100%',
                                    maxWidth: '580px',
                                    padding: '32px 36px',
                                    background: 'rgba(12, 12, 20, 0.65)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(240, 176, 32, 0.06)',
                                    borderRadius: '16px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    opacity: 0,
                                    cursor: 'none',
                                    willChange: 'transform, filter, opacity',
                                    transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
                                    // Initial offset will be set by GSAP
                                    alignSelf: isEven ? 'flex-start' : 'flex-end',
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.18)';
                                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4), 0 0 20px rgba(240,176,32,0.06)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.06)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Activation glow line */}
                                <div
                                    ref={el => glowLinesRef.current[i] = el}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '2px',
                                        background: isEven
                                            ? 'linear-gradient(90deg, rgba(240,176,32,0.6), rgba(240,96,32,0.3), transparent)'
                                            : 'linear-gradient(90deg, transparent, rgba(240,96,32,0.3), rgba(240,176,32,0.6))',
                                        transformOrigin: isEven ? 'left center' : 'right center',
                                        transform: 'scaleX(0)',
                                        opacity: 0,
                                    }}
                                />

                                {/* Card content */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '24px',
                                }}>
                                    {/* Number badge */}
                                    <span style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                        color: 'rgba(240, 176, 32, 0.4)',
                                        letterSpacing: '0.1em',
                                        minWidth: '28px',
                                        paddingTop: '2px',
                                    }}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>

                                    <div style={{ flex: 1 }}>
                                        {/* Title */}
                                        <h3 style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: '1.2rem',
                                            fontWeight: 700,
                                            color: 'var(--text-primary)',
                                            lineHeight: 1.25,
                                            letterSpacing: '-0.02em',
                                        }}>
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p style={{
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '0.84rem',
                                            color: 'var(--text-secondary)',
                                            lineHeight: 1.65,
                                            marginTop: '10px',
                                        }}>
                                            {service.desc}
                                        </p>

                                        {/* Stack tag */}
                                        <span style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.56rem',
                                            fontWeight: 500,
                                            color: 'var(--text-muted)',
                                            letterSpacing: '0.06em',
                                            display: 'block',
                                            marginTop: '14px',
                                            paddingTop: '12px',
                                            borderTop: '1px solid rgba(240, 176, 32, 0.05)',
                                        }}>
                                            {service.tag}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Subtle center line — visual guide */}
            <div style={{
                position: 'absolute',
                top: '280px',
                bottom: '100px',
                left: '50%',
                width: '1px',
                background: 'linear-gradient(to bottom, transparent, rgba(240,176,32,0.06) 15%, rgba(240,176,32,0.06) 85%, transparent)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(240,176,32,0.03) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />
        </section>
    );
}
