import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = ['Design.', 'Build.', 'Automate.', 'Scale.'];

export default function Philosophy() {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stagger word reveals
            words.forEach((_, i) => {
                gsap.fromTo(`.phil-word-${i}`,
                    { y: 120, opacity: 0, skewY: 4 },
                    {
                        y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'expo.out',
                        scrollTrigger: {
                            trigger: `.phil-word-${i}`,
                            start: 'top 88%',
                            end: 'top 35%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            });

            // Line expand
            if (lineRef.current) {
                gsap.fromTo(lineRef.current,
                    { scaleX: 0 },
                    {
                        scaleX: 1, duration: 1.5, ease: 'expo.out',
                        scrollTrigger: {
                            trigger: lineRef.current,
                            start: 'top 80%',
                        }
                    }
                );
            }

            // Description text
            gsap.fromTo('.phil-desc',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: 'expo.out',
                    scrollTrigger: {
                        trigger: '.phil-desc',
                        start: 'top 85%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} style={{
            padding: 'var(--section-pad) 0',
            background: 'var(--bg-secondary)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Ambient glows */}
            <div style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(240,176,32,0.06) 0%, transparent 60%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
            }} />

            <div style={{
                maxWidth: 'var(--container-max)',
                margin: '0 auto',
                padding: '0 clamp(24px, 5vw, 80px)',
                textAlign: 'center',
            }}>
                <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    color: 'rgba(240,176,32,0.6)',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                }}>
                    Our Philosophy
                </span>

                <div style={{
                    marginTop: '70px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(12px, 2.5vw, 32px)',
                    alignItems: 'center',
                }}>
                    {words.map((word, i) => (
                        <span
                            key={word}
                            className={`phil-word-${i}`}
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                                fontWeight: 900,
                                letterSpacing: '-0.04em',
                                lineHeight: 0.95,
                                opacity: 0,
                                ...(i === words.length - 1 ? {
                                    background: 'linear-gradient(135deg, #F0B020, #F06020, #E83030)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    filter: 'drop-shadow(0 0 40px rgba(240,176,32,0.2))',
                                } : {
                                    color: 'var(--text-primary)',
                                }),
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </div>

                {/* Decorative line */}
                <div ref={lineRef} style={{
                    width: '120px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #F0B020, #F06020)',
                    margin: '60px auto',
                    transformOrigin: 'center',
                    transform: 'scaleX(0)',
                }} />

                <p className="phil-desc" style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                    color: 'var(--text-secondary)',
                    maxWidth: '520px',
                    margin: '0 auto',
                    lineHeight: 1.8,
                    opacity: 0,
                }}>
                    We don't just build software. We engineer systems that
                    push boundaries, eliminate inefficiencies, and create
                    unfair advantages for our clients.
                </p>
            </div>
        </section>
    );
}
