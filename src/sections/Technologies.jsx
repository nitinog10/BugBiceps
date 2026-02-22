import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    FaPython, FaReact, FaNode, FaDatabase, FaCode, FaRocket,
    FaAws, FaDocker, FaGit, FaFire, FaCog, FaVuejs
} from 'react-icons/fa';
import { SiMongodb, SiPostgresql, SiTailwindcss, SiGraphql } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

export default function Technologies() {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Left side - slide from left
            gsap.fromTo(leftRef.current,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );

            // Right side - slide from right
            gsap.fromTo(rightRef.current,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );

            // Floating animation for tech items
            const techItems = sectionRef.current?.querySelectorAll('.tech-card');
            techItems?.forEach((item, i) => {
                gsap.to(item, {
                    y: -20,
                    duration: 3 + (i % 2) * 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: (i * 0.1) % 1.5,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const leftTechs = [
        { icon: FaPython, name: 'Python' },
        { icon: FaReact, name: 'React' },
        { icon: FaNode, name: 'Node.js' },
        { icon: SiMongodb, name: 'MongoDB' },
        { icon: FaDocker, name: 'Docker' },
        { icon: FaAws, name: 'AWS' },
    ];

    const rightTechs = [
        { icon: SiPostgresql, name: 'PostgreSQL' },
        { icon: FaVuejs, name: 'Vue.js' },
        { icon: SiTailwindcss, name: 'Tailwind' },
        { icon: SiGraphql, name: 'GraphQL' },
        { icon: FaGit, name: 'Git' },
        { icon: FaFire, name: 'Firebase' },
    ];

    const TechGrid = ({ techs, ref }) => (
        <div ref={ref} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '24px',
            width: '100%',
        }}>
            {techs.map((tech, i) => {
                const Icon = tech.icon;
                return (
                    <div
                        key={i}
                        className="tech-card"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '20px',
                            borderRadius: '12px',
                            background: 'rgba(240,176,32,0.05)',
                            border: '1px solid rgba(240,176,32,0.1)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                                background: 'rgba(240,176,32,0.1)',
                                border: '1px solid rgba(240,176,32,0.3)',
                                y: -10,
                                duration: 0.3,
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                background: 'rgba(240,176,32,0.05)',
                                border: '1px solid rgba(240,176,32,0.1)',
                                y: 0,
                                duration: 0.3,
                            });
                        }}
                    >
                        <div style={{
                            fontSize: '42px',
                            color: '#F0B020',
                            filter: 'drop-shadow(0 0 15px rgba(240,176,32,0.3))',
                        }}>
                            <Icon />
                        </div>
                        <span style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)',
                            fontWeight: 500,
                            textAlign: 'center',
                        }}>
                            {tech.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );

    return (
        <section ref={sectionRef} style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
            background: 'var(--bg-primary)',
            overflow: 'hidden',
        }}>
            {/* Gradient blobs */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(232,48,48,0.08) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-15%',
                left: '-8%',
                width: '450px',
                height: '450px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(240,176,32,0.08) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            {/* Section title */}
            <div style={{
                textAlign: 'center',
                marginBottom: 'clamp(40px, 6vw, 80px)',
                position: 'relative',
                zIndex: 2,
            }}>
                <h2 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                }}>
                    Technologies We Work With
                </h2>
                <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                }}>
                    Our team leverages modern tools and frameworks to build scalable, efficient, and innovative solutions.
                </p>
            </div>

            {/* Tech grids container */}
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(40px, 5vw, 80px)',
                position: 'relative',
                zIndex: 2,
            }}>
                <TechGrid techs={leftTechs} ref={leftRef} />
                <TechGrid techs={rightTechs} ref={rightRef} />
            </div>

            {/* Responsive: Stack on mobile */}
            <style>{`
                @media (max-width: 768px) {
                    .tech-grid-container {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}
