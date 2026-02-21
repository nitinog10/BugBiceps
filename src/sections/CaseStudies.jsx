import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'Neural Commerce Engine',
        category: 'AI · E-Commerce',
        desc: 'AI-powered recommendation system processing 2M+ queries daily with sub-100ms latency.',
        gradient: 'linear-gradient(135deg, rgba(232,168,32,0.15), rgba(232,88,32,0.08))',
    },
    {
        title: 'FinBot Pro',
        category: 'LLM · Finance',
        desc: 'Fine-tuned financial advisor chatbot with RAG pipeline and real-time market analysis.',
        gradient: 'linear-gradient(135deg, rgba(212,43,43,0.15), rgba(232,168,32,0.08))',
    },
    {
        title: 'AutoScale Platform',
        category: 'Automation · SaaS',
        desc: 'End-to-end business automation platform reducing manual workflows by 94%.',
        gradient: 'linear-gradient(135deg, rgba(232,88,32,0.15), rgba(212,43,43,0.08))',
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
                padding: '0 clamp(20px, 4vw, 60px)',
            }}>
                <div className="case-heading" style={{ marginBottom: '60px', opacity: 0 }}>
                    <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '0.8rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gold)',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                    }}>Selected Work</span>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        marginTop: '12px',
                        letterSpacing: '-0.02em',
                    }}>
                        Case <span style={{
                            background: 'linear-gradient(135deg, #E8A820, #E85820)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>Studies</span>
                    </h2>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}>
                    {projects.map((project, i) => (
                        <div key={project.title} className="case-card" data-cursor-hover style={{
                            position: 'relative',
                            padding: 'clamp(40px, 5vw, 60px)',
                            background: project.gradient,
                            border: '1px solid rgba(232, 168, 32, 0.06)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            opacity: 0,
                            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease',
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(232, 168, 32, 0.2)';
                                e.currentTarget.style.transform = 'scale(1.01)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(232, 168, 32, 0.06)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                gap: '20px',
                            }}>
                                <div style={{ flex: 1, minWidth: '280px' }}>
                                    <span style={{
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontSize: '0.75rem',
                                        letterSpacing: '0.15em',
                                        color: 'var(--gold)',
                                        textTransform: 'uppercase',
                                        fontWeight: 500,
                                    }}>{project.category}</span>
                                    <h3 style={{
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                        fontWeight: 700,
                                        marginTop: '12px',
                                        letterSpacing: '-0.02em',
                                    }}>{project.title}</h3>
                                    <p style={{
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontSize: '1rem',
                                        color: 'var(--text-secondary)',
                                        marginTop: '16px',
                                        lineHeight: 1.6,
                                        maxWidth: '500px',
                                    }}>{project.desc}</p>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: 'var(--gold)',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    alignSelf: 'flex-end',
                                }}>
                                    View Project <span style={{ fontSize: '1.2rem' }}>→</span>
                                </div>
                            </div>

                            {/* Large number in background */}
                            <span style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '40px',
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: 'clamp(6rem, 12vw, 12rem)',
                                fontWeight: 700,
                                color: 'rgba(232, 168, 32, 0.03)',
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
