import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = ['Build.', 'Automate.', 'Scale.', 'Dominate.'];

export default function Philosophy() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            words.forEach((_, i) => {
                gsap.fromTo(`.phil-word-${i}`,
                    {
                        y: 100,
                        opacity: 0,
                        skewY: 5,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        skewY: 0,
                        duration: 1,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: `.phil-word-${i}`,
                            start: 'top 85%',
                            end: 'top 40%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            });
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
            {/* Decorative gradient */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(232,168,32,0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{
                maxWidth: 'var(--container-max)',
                margin: '0 auto',
                padding: '0 clamp(20px, 4vw, 60px)',
                textAlign: 'center',
            }}>
                <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8rem',
                    letterSpacing: '0.2em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                }}>
                    Our Philosophy
                </span>

                <div style={{
                    marginTop: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(16px, 3vw, 40px)',
                    alignItems: 'center',
                }}>
                    {words.map((word, i) => (
                        <span
                            key={word}
                            className={`phil-word-${i}`}
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 'clamp(3rem, 10vw, 8rem)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                lineHeight: 1,
                                opacity: 0,
                                background: i === words.length - 1
                                    ? 'linear-gradient(135deg, #E8A820, #E85820)'
                                    : 'none',
                                WebkitBackgroundClip: i === words.length - 1 ? 'text' : 'unset',
                                WebkitTextFillColor: i === words.length - 1 ? 'transparent' : 'unset',
                                color: i === words.length - 1 ? 'transparent' : 'var(--text-primary)',
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </div>

                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                    color: 'var(--text-secondary)',
                    maxWidth: '550px',
                    margin: '60px auto 0',
                    lineHeight: 1.7,
                }}>
                    We don't just build software. We engineer systems that
                    push boundaries, eliminate inefficiencies, and create
                    unfair advantages.
                </p>
            </div>
        </section>
    );
}
