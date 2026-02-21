import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Web Development',
        desc: 'High-performance web platforms built for scale, speed, and conversion.',
        icon: '⟨/⟩',
        tag: 'Frontend · Backend · Full-Stack',
    },
    {
        title: 'App Development',
        desc: 'Native & cross-platform mobile applications with pixel-perfect UX.',
        icon: '◉',
        tag: 'iOS · Android · React Native',
    },
    {
        title: 'AI Fine-Tuning',
        desc: 'Domain-specific LLM fine-tuning for production-grade AI systems.',
        icon: '◈',
        tag: 'GPT · LLaMA · Mistral',
    },
    {
        title: 'RAG Systems & Chatbots',
        desc: 'Retrieval-augmented generation pipelines with intelligent conversational agents.',
        icon: '⬡',
        tag: 'Vector DB · Embeddings · Agents',
    },
    {
        title: 'Automation Engineering',
        desc: 'End-to-end workflow automation that eliminates manual processes.',
        icon: '⟲',
        tag: 'Pipelines · ETL · Integration',
    },
    {
        title: 'SEO / GEO Optimization',
        desc: 'Data-driven search and generative engine optimization strategies.',
        icon: '◎',
        tag: 'Technical SEO · AI Search · Analytics',
    },
    {
        title: 'Digital Marketing',
        desc: 'Performance marketing campaigns with measurable ROI.',
        icon: '△',
        tag: 'PPC · Social · Growth',
    },
    {
        title: 'Graphic Design',
        desc: 'Visual identity systems and brand design that commands attention.',
        icon: '◇',
        tag: 'Branding · UI/UX · Visual',
    },
    {
        title: 'Blender / 3D Visualization',
        desc: '3D modeling, animation, and cinematic visual effects.',
        icon: '⬢',
        tag: 'Modeling · Animation · Render',
    },
];

function ServiceCard({ service, index }) {
    const cardRef = useRef(null);

    useEffect(() => {
        if (!cardRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(cardRef.current,
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0, opacity: 1, scale: 1,
                    duration: 0.8,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 90%',
                    },
                    delay: index * 0.08,
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.03)`;
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.opacity = '1';
            glow.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(240,176,32,0.15), transparent 60%)`;
        }
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
        const glow = card.querySelector('.card-glow');
        if (glow) glow.style.opacity = '0';
    };

    return (
        <div
            ref={cardRef}
            data-cursor-hover
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                padding: '36px 32px',
                background: 'rgba(12, 12, 20, 0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(240, 176, 32, 0.06)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease',
                cursor: 'none',
                opacity: 0,
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.2)';
                e.currentTarget.style.boxShadow = '0 8px 50px rgba(240,176,32,0.1), inset 0 1px 0 rgba(240,176,32,0.08)';
            }}
            onMouseOut={e => {
                e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.06)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Glow overlay */}
            <div className="card-glow" style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                transition: 'opacity 0.5s ease',
                borderRadius: '16px',
                pointerEvents: 'none',
            }} />

            {/* Top accent line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '32px',
                right: '32px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.2), transparent)',
            }} />

            {/* Icon */}
            <div style={{
                fontSize: '1.6rem',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(240, 176, 32, 0.06)',
                borderRadius: '12px',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(240,176,32,0.06)',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#F0B020',
            }}>
                {service.icon}
            </div>

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
                <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    color: 'rgba(240,176,32,0.5)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                }}>
                    {String(index + 1).padStart(2, '0')}
                </span>
                <h3 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginTop: '6px',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                }}>
                    {service.title}
                </h3>
                <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    marginTop: '10px',
                    lineHeight: 1.6,
                }}>
                    {service.desc}
                </p>
            </div>

            {/* Tag */}
            <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
                marginTop: 'auto',
                paddingTop: '16px',
                borderTop: '1px solid rgba(240,176,32,0.06)',
                position: 'relative',
                zIndex: 1,
            }}>
                {service.tag}
            </div>
        </div>
    );
}

export default function Services() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: 'expo.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 85%',
                    }
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
                {/* Heading */}
                <div ref={headingRef} style={{ marginBottom: '70px', opacity: 0 }}>
                    <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        color: 'rgba(240,176,32,0.6)',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                    }}>
                        What We Build
                    </span>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        marginTop: '14px',
                        letterSpacing: '-0.03em',
                    }}>
                        Services &{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #F0B020, #F06020)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>Capabilities</span>
                    </h2>
                    <p style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '1rem',
                        color: 'var(--text-secondary)',
                        marginTop: '16px',
                        maxWidth: '550px',
                        lineHeight: 1.7,
                    }}>
                        From concept to deployment — we engineer systems across the full digital spectrum.
                    </p>
                </div>

                {/* Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px',
                }}>
                    {services.map((service, i) => (
                        <ServiceCard key={service.title} service={service} index={i} />
                    ))}
                </div>
            </div>

            {/* Background glow */}
            <div style={{
                position: 'absolute',
                top: '40%',
                left: '15%',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(240,176,32,0.04) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
            }} />
        </section>
    );
}
