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
    const maskRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── Heading entrance ──
            // Minimal slide-up, nothing dramatic
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

            // ── Masked container clip-path reveal ──
            // The entire card grid emerges with a vertical wipe
            gsap.fromTo(maskRef.current,
                { clipPath: 'inset(0 0 100% 0)' },
                {
                    clipPath: 'inset(0 0 0% 0)',
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: maskRef.current,
                        start: 'top 82%',
                    },
                }
            );

            // ── Staggered card entrance ──
            // Each card slides up within the mask — clean sequencing
            const cards = cardsRef.current.filter(Boolean);
            gsap.fromTo(cards,
                {
                    y: 80,
                    opacity: 0,
                    scale: 0.98,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: maskRef.current,
                        start: 'top 80%',
                    },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={sectionRef} style={{
            position: 'relative',
            padding: 'var(--section-pad) 0',
            background: 'var(--bg-primary)',
        }}>
            <div style={{
                maxWidth: 'var(--container-max)',
                margin: '0 auto',
                padding: '0 clamp(24px, 5vw, 80px)',
            }}>
                {/* ── Section heading ── */}
                <div ref={headingRef} style={{
                    marginBottom: '64px',
                    opacity: 0,
                }}>
                    <span style={{
                        fontFamily: "var(--font-mono)",
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
                        fontFamily: "var(--font-heading)",
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
                        fontFamily: "var(--font-body)",
                        fontSize: '0.95rem',
                        color: 'var(--text-secondary)',
                        marginTop: '14px',
                        maxWidth: '480px',
                        lineHeight: 1.7,
                    }}>
                        From concept to deployment — we engineer systems
                        across the full digital spectrum.
                    </p>
                </div>

                {/* ── Masked reveal container ── */}
                <div ref={maskRef} style={{
                    overflow: 'hidden',
                    clipPath: 'inset(0 0 100% 0)',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '1px',
                        background: 'rgba(240, 176, 32, 0.04)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid rgba(240, 176, 32, 0.04)',
                    }}>
                        {services.map((service, i) => (
                            <div
                                key={service.title}
                                ref={el => cardsRef.current[i] = el}
                                data-cursor-hover
                                style={{
                                    padding: '40px 36px',
                                    background: 'var(--bg-primary)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    opacity: 0,
                                    transition: 'background 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                    cursor: 'none',
                                    position: 'relative',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'var(--bg-secondary)';
                                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(240,176,32,0.12)';
                                    e.currentTarget.style.zIndex = '2';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'var(--bg-primary)';
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.zIndex = '1';
                                }}
                            >
                                {/* Index number */}
                                <span style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: '0.6rem',
                                    fontWeight: 500,
                                    color: 'rgba(240, 176, 32, 0.35)',
                                    letterSpacing: '0.15em',
                                }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                {/* Title */}
                                <h3 style={{
                                    fontFamily: "var(--font-heading)",
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
                                    fontFamily: "var(--font-body)",
                                    fontSize: '0.84rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.65,
                                    flex: 1,
                                }}>
                                    {service.desc}
                                </p>

                                {/* Stack tag */}
                                <span style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: '0.58rem',
                                    fontWeight: 500,
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.06em',
                                    paddingTop: '14px',
                                    borderTop: '1px solid rgba(240, 176, 32, 0.05)',
                                    marginTop: 'auto',
                                }}>
                                    {service.tag}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
