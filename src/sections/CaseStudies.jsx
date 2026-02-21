import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    FaPython, FaReact, FaNode, FaDatabase, FaClock, FaRobot, FaLink
} from 'react-icons/fa';
import { SiPostgresql, SiVuedotjs, SiNextdotjs } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

// Tech icon mapping
const getTechIcon = (tech) => {
    const iconMap = {
        'PyTorch': FaPython,
        'FastAPI': FaPython,
        'Redis': FaDatabase,
        'React': FaReact,
        'LangChain': FaLink,
        'GPT-4': FaRobot,
        'Pinecone': FaDatabase,
        'Next.js': SiNextdotjs,
        'Node.js': FaNode,
        'Temporal': FaClock,
        'PostgreSQL': SiPostgresql,
        'Vue': SiVuedotjs,
    };
    return iconMap[tech] || null;
};

const projects = [
    {
        title: 'Neural Commerce Engine',
        category: 'AI · E-Commerce',
        desc: 'AI-powered recommendation system processing 2M+ queries daily with sub-100ms latency. Built with custom embeddings and real-time inference pipeline.',
        tech: ['PyTorch', 'FastAPI', 'Redis', 'React'],
        metric: '2M+ queries/day',
    },
    {
        title: 'FinBot Pro',
        category: 'LLM · Finance',
        desc: 'Fine-tuned financial advisor chatbot with RAG pipeline, real-time market analysis, and multi-modal document processing.',
        tech: ['LangChain', 'GPT-4', 'Pinecone', 'Next.js'],
        metric: '95% accuracy',
    },
    {
        title: 'AutoScale Platform',
        category: 'Automation · SaaS',
        desc: 'End-to-end business automation platform reducing manual workflows by 94%. Handles 50K+ daily task orchestrations.',
        tech: ['Node.js', 'Temporal', 'PostgreSQL', 'Vue'],
        metric: '94% reduction',
    },
];

export default function CaseStudies() {
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

            // Cards zigzag in from alternating sides
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

                // Timeline dot
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
        <section id="work" ref={sectionRef} style={{
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
                        Selected Work
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.08,
                    }}>
                        Case{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #F0B020, #F06020)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>Studies</span>
                    </h2>
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

                    {projects.map((project, i) => {
                        const isLeft = i % 2 === 0;

                        return (
                            <div key={project.title} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                                position: 'relative',
                                marginBottom: '48px',
                            }}>
                                {/* Timeline dot */}
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

                                {/* Connector line */}
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
                                        padding: '36px 36px',
                                        background: 'rgba(12, 12, 20, 0.65)',
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
                                    {/* Top accent */}
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

                                    {/* Category + Metric */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        marginBottom: '14px',
                                        flexWrap: 'wrap',
                                    }}>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.6rem',
                                            letterSpacing: '0.15em',
                                            color: 'rgba(240,176,32,0.6)',
                                            textTransform: 'uppercase',
                                            fontWeight: 500,
                                        }}>{project.category}</span>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.58rem',
                                            padding: '3px 10px',
                                            borderRadius: '50px',
                                            background: 'rgba(240,176,32,0.08)',
                                            border: '1px solid rgba(240,176,32,0.12)',
                                            color: '#F0B020',
                                            fontWeight: 500,
                                        }}>{project.metric}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '1.3rem',
                                        fontWeight: 800,
                                        color: 'var(--text-primary)',
                                        letterSpacing: '-0.02em',
                                        lineHeight: 1.2,
                                    }}>{project.title}</h3>

                                    {/* Description */}
                                    <p style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.84rem',
                                        color: 'var(--text-secondary)',
                                        marginTop: '12px',
                                        lineHeight: 1.65,
                                    }}>{project.desc}</p>

                                    {/* Tech stack */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '6px',
                                        marginTop: '18px',
                                        flexWrap: 'wrap',
                                        marginBottom: '12px',
                                    }}>
                                        {project.tech.map(t => (
                                            <span key={t} style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.55rem',
                                                letterSpacing: '0.05em',
                                                padding: '3px 10px',
                                                borderRadius: '50px',
                                                border: '1px solid rgba(240,176,32,0.08)',
                                                color: 'var(--text-muted)',
                                            }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Tech icons */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '10px',
                                        marginBottom: '12px',
                                        paddingBottom: '12px',
                                        borderBottom: '1px solid rgba(240, 176, 32, 0.05)',
                                    }}>
                                        {project.tech.map(t => {
                                            const IconComponent = getTechIcon(t);
                                            return IconComponent ? (
                                                <IconComponent
                                                    key={`icon-${t}`}
                                                    style={{
                                                        fontSize: '16px',
                                                        color: '#888899',
                                                        opacity: 0.7,
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                />
                                            ) : null;
                                        })}
                                    </div>

                                    {/* View link */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginTop: '20px',
                                        paddingTop: '16px',
                                        borderTop: '1px solid rgba(240,176,32,0.05)',
                                        color: 'var(--gold)',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.8rem',
                                        fontWeight: 500,
                                        transition: 'gap 0.3s ease',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.gap = '14px'}
                                        onMouseLeave={e => e.currentTarget.style.gap = '8px'}
                                    >
                                        View Project <span style={{ fontSize: '1rem' }}>→</span>
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
