import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 150, suffix: '+', label: 'Projects Delivered' },
    { value: 40, suffix: '+', label: 'AI Systems Built' },
    { value: 200, suffix: '+', label: 'Automations Deployed' },
    { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

export default function Stats() {
    const sectionRef = useRef(null);
    const numberRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            stats.forEach((stat, i) => {
                const el = numberRefs.current[i];
                if (!el) return;

                const counter = { val: 0 };
                gsap.to(counter, {
                    val: stat.value,
                    duration: 2,
                    ease: 'power2.out',
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
            {/* Top border */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.3), transparent)',
            }} />

            <div style={{
                maxWidth: 'var(--container-max)',
                margin: '0 auto',
                padding: '0 clamp(20px, 4vw, 60px)',
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '40px',
                    textAlign: 'center',
                }}>
                    {stats.map((stat, i) => (
                        <div key={stat.label} style={{
                            padding: '40px 20px',
                            position: 'relative',
                        }}>
                            {/* Subtle card background */}
                            <div style={{
                                position: 'absolute',
                                inset: '10px',
                                borderRadius: '20px',
                                background: 'rgba(240,176,32,0.03)',
                                border: '1px solid rgba(240,176,32,0.06)',
                            }} />
                            <span
                                ref={el => numberRefs.current[i] = el}
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #F0B020, #F06020)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    display: 'block',
                                    position: 'relative',
                                }}
                            >
                                0{stat.suffix}
                            </span>
                            <span style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                marginTop: '12px',
                                display: 'block',
                                letterSpacing: '0.05em',
                                position: 'relative',
                            }}>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom border */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.3), transparent)',
            }} />
        </section>
    );
}
