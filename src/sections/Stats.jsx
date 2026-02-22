import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 20, suffix: '+', label: 'Projects Delivered', sub: 'Across 12 industries' },
    { value: 10, suffix: '+', label: 'AI Systems Deployed', sub: 'Production-grade models' },
    { value: 100, suffix: 'K+', label: 'Lines of Code Generated', sub: 'Clean, maintainable code' },
    { value: 99, suffix: '%', label: 'Client Satisfaction', sub: 'Long-term partnerships' },
];

export default function Stats() {
    const sectionRef = useRef(null);
    const numberRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate each stat card entrance
            gsap.fromTo('.stat-card',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'expo.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            );

            // Counter animations
            stats.forEach((stat, i) => {
                const el = numberRefs.current[i];
                if (!el) return;

                const counter = { val: 0 };
                gsap.to(counter, {
                    val: stat.value,
                    duration: 2.5,
                    ease: 'power3.out',
                    onUpdate: () => {
                        el.textContent = Math.round(counter.val) + stat.suffix;
                    },
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        once: true,
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} style={{
            padding: 'var(--section-pad) 0',
            background: 'var(--bg-primary)',
            position: 'relative',
        }}>
            {/* Top line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.2), transparent)',
            }} />

            <div style={{
                maxWidth: 'var(--container-max)',
                margin: '0 auto',
                padding: '0 clamp(24px, 5vw, 80px)',
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '20px',
                }}>
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="stat-card" style={{
                            padding: '48px 32px',
                            position: 'relative',
                            textAlign: 'center',
                            background: 'rgba(12, 12, 20, 0.5)',
                            border: '1px solid rgba(240,176,32,0.05)',
                            borderRadius: '16px',
                            transition: 'border-color 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            opacity: 0,
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(240,176,32,0.15)';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(240,176,32,0.05)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <span
                                ref={el => numberRefs.current[i] = el}
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: 'clamp(2.8rem, 5vw, 4rem)',
                                    fontWeight: 800,
                                    background: 'linear-gradient(135deg, #F0B020, #F06020)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    display: 'block',
                                    letterSpacing: '-0.03em',
                                }}
                            >
                                0{stat.suffix}
                            </span>
                            <span style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                marginTop: '14px',
                                display: 'block',
                                letterSpacing: '-0.01em',
                            }}>
                                {stat.label}
                            </span>
                            <span style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: '0.78rem',
                                color: 'var(--text-muted)',
                                marginTop: '6px',
                                display: 'block',
                            }}>
                                {stat.sub}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 600px) {
                    .stat-card {
                        padding: 28px 20px !important;
                    }
                }
            `}</style>

            {/* Bottom line */}
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
