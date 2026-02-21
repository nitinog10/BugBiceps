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

            gsap.fromTo('.stat-item',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'expo.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
                }
            );
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
                background: 'linear-gradient(90deg, transparent, rgba(232,168,32,0.2), transparent)',
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
                        <div key={stat.label} className="stat-item" style={{
                            padding: '40px 20px',
                            opacity: 0,
                        }}>
                            <span
                                ref={el => numberRefs.current[i] = el}
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #E8A820, #E85820)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    display: 'block',
                                }}
                            >
                                0{stat.suffix}
                            </span>
                            <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                marginTop: '12px',
                                display: 'block',
                                letterSpacing: '0.05em',
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
                background: 'linear-gradient(90deg, transparent, rgba(232,168,32,0.2), transparent)',
            }} />
        </section>
    );
}
