import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    { title: 'Website Development', desc: 'High-performance web platforms engineered for scale.', icon: '🌐' },
    { title: 'App Development', desc: 'Native & cross-platform mobile applications.', icon: '📱' },
    { title: 'LLM Fine-Tuning', desc: 'Custom large language models for your domain.', icon: '🧠' },
    { title: 'SLM Development', desc: 'Small language models optimized for edge deployment.', icon: '⚡' },
    { title: 'RAG Systems', desc: 'Retrieval-augmented generation for accurate AI.', icon: '🔍' },
    { title: 'AI Chatbots', desc: 'Intelligent conversational agents for any platform.', icon: '🤖' },
    { title: 'Automation Systems', desc: 'End-to-end workflow automation at scale.', icon: '⚙️' },
    { title: 'SEO', desc: 'Data-driven search engine optimization strategies.', icon: '📈' },
    { title: 'GEO Optimization', desc: 'Generative Engine Optimization for AI search.', icon: '🎯' },
    { title: 'Digital Marketing', desc: 'Performance marketing with measurable ROI.', icon: '📊' },
    { title: 'Graphic Design', desc: 'Visual identity and brand design systems.', icon: '🎨' },
    { title: 'Blender / 3D Visuals', desc: '3D modeling, animation, and visual effects.', icon: '💎' },
];

function ServiceCard({ service, index }) {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
        card.querySelector('.card-glow').style.opacity = '1';
        card.querySelector('.card-glow').style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(232,168,32,0.12), transparent 60%)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
        card.querySelector('.card-glow').style.opacity = '0';
    };

    return (
        <div
            ref={cardRef}
            data-cursor-hover
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                flexShrink: 0,
                width: '340px',
                height: '380px',
                padding: '40px 32px',
                background: 'rgba(22, 22, 34, 0.5)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(232, 168, 32, 0.08)',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                cursor: 'none',
            }}
        >
            <div className="card-glow" style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                transition: 'opacity 0.4s ease',
                borderRadius: '20px',
                pointerEvents: 'none',
            }} />

            {/* Top accent line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '32px',
                right: '32px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(232,168,32,0.3), transparent)',
            }} />

            <div style={{
                fontSize: '2.5rem',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(232, 168, 32, 0.08)',
                borderRadius: '14px',
                position: 'relative',
                zIndex: 1,
            }}>
                {service.icon}
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--gold)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                }}>
                    {String(index + 1).padStart(2, '0')}
                </span>
                <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginTop: '8px',
                    lineHeight: 1.2,
                }}>
                    {service.title}
                </h3>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    marginTop: '12px',
                    lineHeight: 1.6,
                }}>
                    {service.desc}
                </p>
            </div>

            {/* Bottom arrow */}
            <div style={{
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--gold)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 500,
                position: 'relative',
                zIndex: 1,
            }}>
                Learn more
                <span style={{ fontSize: '1.1rem', transition: 'transform 0.3s ease' }}>→</span>
            </div>
        </div>
    );
}

export default function Services() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
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

            // Horizontal scroll
            const track = trackRef.current;
            if (!track) return;
            const totalScroll = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: -totalScroll,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: () => `+=${totalScroll}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={sectionRef} style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--bg-primary)',
        }}>
            <div style={{
                padding: '80px clamp(20px, 4vw, 60px) 40px',
            }}>
                <div ref={headingRef} style={{ opacity: 0 }}>
                    <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.8rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gold)',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                    }}>
                        What We Build
                    </span>
                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginTop: '12px',
                        letterSpacing: '-0.02em',
                    }}>
                        Services & <span style={{
                            background: 'linear-gradient(135deg, #E8A820, #E85820)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>Capabilities</span>
                    </h2>
                </div>
            </div>

            <div ref={trackRef} style={{
                display: 'flex',
                gap: '28px',
                padding: '20px clamp(20px, 4vw, 60px) 80px',
                width: 'max-content',
            }}>
                {services.map((service, i) => (
                    <ServiceCard key={service.title} service={service} index={i} />
                ))}
            </div>
        </section>
    );
}
