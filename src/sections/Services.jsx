import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    FaReact, FaPython, FaNode, FaMobile, FaRobot, FaSearch, 
    FaChartLine, FaPalette, FaCube, FaDocker, FaGit, FaDatabase
} from 'react-icons/fa';
import { SiVite, SiVercel } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Web Development',
        desc: 'High-performance web platforms built for scale, speed, and conversion.',
        tag: 'Frontend · Backend · Full-Stack',
        icons: [FaReact, FaPython, FaNode, FaDocker, FaGit, SiVite, SiVercel],
    },
    {
        title: 'App Development',
        desc: 'Native & cross-platform mobile applications with pixel-perfect UX.',
        tag: 'iOS · Android · React Native',
        icons: [FaMobile, FaReact, FaNode, FaPython, FaDocker, FaGit, FaRobot],
    },
    {
        title: 'AI Fine-Tuning',
        desc: 'Domain-specific LLM fine-tuning for production-grade AI systems.',
        tag: 'GPT · LLaMA · Mistral',
        icons: [FaRobot, FaPython, FaDatabase, FaDocker, FaGit, FaNode],
    },
    {
        title: 'RAG Systems & Chatbots',
        desc: 'Retrieval-augmented generation pipelines with intelligent conversational agents.',
        tag: 'Vector DB · Embeddings · Agents',
        icons: [FaRobot, FaNode, FaDatabase, FaPython, FaDocker, FaGit],
    },
    {
        title: 'Automation Engineering',
        desc: 'End-to-end workflow automation that eliminates manual processes.',
        tag: 'Pipelines · ETL · Integration',
        icons: [FaPython, FaNode],
    },
    {
        title: 'SEO / GEO Optimization',
        desc: 'Data-driven search and generative engine optimization strategies.',
        tag: 'Technical SEO · AI Search · Analytics',
        icons: [FaSearch, FaChartLine],
    },
    {
        title: 'Digital Marketing',
        desc: 'Performance marketing campaigns with measurable ROI.',
        tag: 'PPC · Social · Growth',
        icons: [FaChartLine],
    },
    {
        title: 'Graphic Design',
        desc: 'Visual identity systems and brand design that commands attention.',
        tag: 'Branding · UI/UX · Visual',
        icons: [FaPalette],
    },
    {
        title: 'Blender / 3D Visualization',
        desc: '3D modeling, animation, and cinematic visual effects.',
        tag: 'Modeling · Animation · Render',
        icons: [FaCube],
    },
];

export default function Services() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef([]);
    const dotsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Heading
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

            // Each card zigzags in from its side
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                const isLeft = i % 2 === 0;

                gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 92%',
                        end: 'top 55%',
                        scrub: 0.8,
                    },
                }).fromTo(card,
                    {
                        x: isLeft ? -100 : 100,
                        y: 40,
                        opacity: 0,
                        scale: 0.94,
                    },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: 'none',
                    }
                );

                // Timeline dot pulse
                const dot = dotsRef.current[i];
                if (dot) {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            end: 'top 55%',
                            scrub: 0.8,
                        },
                    }).fromTo(dot,
                        { scale: 0, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 1, ease: 'none' }
                    );
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Hover
    const handleMouseEnter = (el) => {
        if (!el) return;
        gsap.to(el, { y: -6, scale: 1.02, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    };
    const handleMouseLeave = (el) => {
        if (!el) return;
        gsap.to(el, { y: 0, scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    };

    return (
        <section id="services" ref={sectionRef} style={{
            position: 'relative',
            padding: 'var(--section-pad) 0',
            background: 'var(--bg-primary)',
            overflow: 'hidden',
        }}>
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '0 clamp(24px, 5vw, 80px)',
            }}>
                {/* Heading */}
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

                {/* ── Timeline zigzag layout ── */}
                <div style={{ position: 'relative' }}>

                    {/* Center spine line */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: '50%',
                        width: '1px',
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(240,176,32,0.15) 5%, rgba(240,176,32,0.15) 95%, transparent 100%)',
                        zIndex: 1,
                    }} />

                    {/* Cards zigzag along the spine */}
                    {services.map((service, i) => {
                        const isLeft = i % 2 === 0;

                        return (
                            <div key={service.title} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                                position: 'relative',
                                marginBottom: '40px',
                            }}>
                                {/* Timeline dot on the center line */}
                                <div
                                    ref={el => dotsRef.current[i] = el}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        transform: 'translate(-50%, 0)',
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: '#F0B020',
                                        boxShadow: '0 0 12px rgba(240,176,32,0.4)',
                                        zIndex: 2,
                                        opacity: 0,
                                    }}
                                />

                                {/* Connector line from dot to card */}
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: isLeft ? 'calc(50% - 40px)' : '50%',
                                    width: '40px',
                                    height: '1px',
                                    background: 'rgba(240,176,32,0.12)',
                                    zIndex: 1,
                                }} />

                                {/* Card */}
                                <div
                                    ref={el => cardsRef.current[i] = el}
                                    data-cursor-hover
                                    onMouseEnter={() => handleMouseEnter(cardsRef.current[i])}
                                    onMouseLeave={() => handleMouseLeave(cardsRef.current[i])}
                                    style={{
                                        width: 'calc(50% - 60px)',
                                        padding: '28px 32px',
                                        background: 'rgba(12, 12, 20, 0.65)',
                                        backdropFilter: 'blur(16px)',
                                        WebkitBackdropFilter: 'blur(16px)',
                                        border: '1px solid rgba(240, 176, 32, 0.06)',
                                        borderRadius: '14px',
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
                                    {/* Top accent glow */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '2px',
                                        background: isLeft
                                            ? 'linear-gradient(90deg, rgba(240,176,32,0.5), transparent)'
                                            : 'linear-gradient(90deg, transparent, rgba(240,176,32,0.5))',
                                    }} />

                                    {/* Number */}
                                    <span style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.6rem',
                                        fontWeight: 600,
                                        color: 'rgba(240, 176, 32, 0.4)',
                                        letterSpacing: '0.15em',
                                    }}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>

                                    {/* Title */}
                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '1.15rem',
                                        fontWeight: 700,
                                        color: 'var(--text-primary)',
                                        lineHeight: 1.25,
                                        letterSpacing: '-0.02em',
                                        marginTop: '8px',
                                    }}>
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.82rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: 1.65,
                                        marginTop: '10px',
                                    }}>
                                        {service.desc}
                                    </p>

                                    {/* Tag */}
                                    <span style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.55rem',
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

                                    {/* Icons */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '12px',
                                        marginTop: '14px',
                                        paddingTop: '14px',
                                        borderTop: '1px solid rgba(240, 176, 32, 0.05)',
                                    }}>
                                        {service.icons?.map((IconComponent, idx) => (
                                            <IconComponent
                                                key={idx}
                                                style={{
                                                    fontSize: '18px',
                                                    color: '#888899',
                                                    opacity: 0.7,
                                                    transition: 'all 0.3s ease',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
