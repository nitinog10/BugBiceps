import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.case-heading',
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: 'expo.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            );

            gsap.fromTo('.case-card',
                { y: 80, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'expo.out',
                    scrollTrigger: { trigger: '.case-card', start: 'top 85%' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="work" ref={sectionRef} style={{
            padding: 'var(--section-pad) 0',
            background: 'var(--bg-primary)',
        }}>
            <div style={{
                maxWidth: 'var(--container-max)',
                margin: '0 auto',
                padding: '0 clamp(24px, 5vw, 80px)',
            }}>
                <div className="case-heading" style={{ marginBottom: '70px', opacity: 0 }}>
                    <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        color: 'rgba(240,176,32,0.6)',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                    }}>Selected Work</span>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                        fontWeight: 800,
                        marginTop: '14px',
                        letterSpacing: '-0.03em',
                    }}>
                        Case{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #F0B020, #F06020)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>Studies</span>
                    </h2>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    {projects.map((project, i) => (
                        <div key={project.title} className="case-card" data-cursor-hover style={{
                            position: 'relative',
                            padding: 'clamp(40px, 5vw, 64px)',
                            background: 'rgba(12, 12, 20, 0.6)',
                            border: '1px solid rgba(240, 176, 32, 0.06)',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            opacity: 0,
                            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease',
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.15)';
                                e.currentTarget.style.transform = 'scale(1.01)';
                                e.currentTarget.style.boxShadow = '0 8px 50px rgba(240,176,32,0.06)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.06)';
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Top accent */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: '64px',
                                right: '64px',
                                height: '1px',
                                background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.15), transparent)',
                            }} />

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                gap: '24px',
                            }}>
                                <div style={{ flex: 1, minWidth: '280px' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        marginBottom: '16px',
                                    }}>
                                        <span style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: '0.6rem',
                                            letterSpacing: '0.15em',
                                            color: 'rgba(240,176,32,0.6)',
                                            textTransform: 'uppercase',
                                            fontWeight: 500,
                                        }}>{project.category}</span>
                                        <span style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: '0.6rem',
                                            padding: '3px 10px',
                                            borderRadius: '50px',
                                            background: 'rgba(240,176,32,0.08)',
                                            border: '1px solid rgba(240,176,32,0.12)',
                                            color: '#F0B020',
                                            fontWeight: 500,
                                        }}>{project.metric}</span>
                                    </div>
                                    <h3 style={{
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                        fontWeight: 800,
                                        letterSpacing: '-0.03em',
                                    }}>{project.title}</h3>
                                    <p style={{
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontSize: '0.95rem',
                                        color: 'var(--text-secondary)',
                                        marginTop: '16px',
                                        lineHeight: 1.7,
                                        maxWidth: '520px',
                                    }}>{project.desc}</p>

                                    {/* Tech stack */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '8px',
                                        marginTop: '24px',
                                        flexWrap: 'wrap',
                                    }}>
                                        {project.tech.map(t => (
                                            <span key={t} style={{
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.58rem',
                                                letterSpacing: '0.05em',
                                                padding: '4px 12px',
                                                borderRadius: '50px',
                                                border: '1px solid rgba(240,176,32,0.08)',
                                                color: 'var(--text-muted)',
                                            }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: 'var(--gold)',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    alignSelf: 'flex-end',
                                    transition: 'gap 0.3s ease',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.gap = '14px'}
                                    onMouseLeave={e => e.currentTarget.style.gap = '8px'}
                                >
                                    View Project <span style={{ fontSize: '1.1rem' }}>→</span>
                                </div>
                            </div>

                            {/* Large background number */}
                            <span style={{
                                position: 'absolute',
                                top: '-30px',
                                right: '40px',
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: 'clamp(7rem, 14vw, 14rem)',
                                fontWeight: 900,
                                color: 'rgba(240, 176, 32, 0.02)',
                                lineHeight: 1,
                                pointerEvents: 'none',
                            }}>
                                {String(i + 1).padStart(2, '0')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
