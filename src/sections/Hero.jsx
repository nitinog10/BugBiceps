import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const subRef = useRef(null);
    const scrollIndicatorRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 3.5 });

            tl.fromTo(headingRef.current?.querySelectorAll('.word') || [],
                { y: 120, opacity: 0, rotateX: -40 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.08, ease: 'expo.out' }
            );

            tl.fromTo(subRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
                '-=0.6'
            );

            tl.fromTo(scrollIndicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6 },
                '-=0.3'
            );

            // Parallax on scroll
            gsap.to(headingRef.current, {
                y: -100,
                opacity: 0.3,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const words = ['Engineering', 'Powerful', 'Digital', 'Systems'];

    return (
        <section id="home" ref={sectionRef} style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '0 clamp(20px, 4vw, 60px)',
        }}>
            {/* Animated gradient mesh bg */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `
          radial-gradient(ellipse 80% 60% at 20% 40%, rgba(232,168,32,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 20%, rgba(212,43,43,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 70% 50% at 50% 80%, rgba(232,88,32,0.04) 0%, transparent 60%)
        `,
                animation: 'gradient-shift 12s ease-in-out infinite',
                backgroundSize: '200% 200%',
            }} />

            {/* Floating tech shapes */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: `${30 + i * 15}px`,
                        height: `${30 + i * 15}px`,
                        border: `1px solid rgba(232, 168, 32, ${0.04 + i * 0.01})`,
                        borderRadius: i % 2 === 0 ? '50%' : '4px',
                        top: `${15 + i * 14}%`,
                        left: `${10 + i * 15}%`,
                        animation: `float ${5 + i * 1.5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                        transform: `rotate(${i * 30}deg)`,
                    }} />
                ))}
            </div>

            {/* Logo watermark */}
            <img src="/logo.png" alt="" style={{
                position: 'absolute',
                width: 'clamp(300px, 40vw, 600px)',
                height: 'auto',
                opacity: 0.03,
                pointerEvents: 'none',
                filter: 'grayscale(100%)',
            }} />

            {/* Main heading */}
            <div ref={headingRef} style={{
                textAlign: 'center',
                zIndex: 2,
                perspective: '1000px',
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '0 clamp(12px, 2vw, 24px)',
                }}>
                    {words.map((word, i) => (
                        <span key={word} className="word" style={{
                            display: 'inline-block',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            color: i === 1 ? 'transparent' : 'var(--text-primary)',
                            background: i === 1 ? 'linear-gradient(135deg, #E8A820, #E85820)' : 'none',
                            WebkitBackgroundClip: i === 1 ? 'text' : 'unset',
                            WebkitTextFillColor: i === 1 ? 'transparent' : 'unset',
                            opacity: 0,
                        }}>
                            {word}
                        </span>
                    ))}
                </div>
            </div>

            {/* Subtitle */}
            <div ref={subRef} style={{
                marginTop: 'clamp(20px, 3vw, 40px)',
                zIndex: 2,
                opacity: 0,
                textAlign: 'center',
            }}>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.15em',
                    fontWeight: 400,
                }}>
                    Web &nbsp;•&nbsp; Apps &nbsp;•&nbsp; AI &nbsp;•&nbsp; Automation
                </p>
            </div>

            {/* Scroll indicator */}
            <div ref={scrollIndicatorRef} style={{
                position: 'absolute',
                bottom: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                opacity: 0,
                zIndex: 2,
            }}>
                <span style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    fontFamily: "'Inter', sans-serif",
                }}>Scroll</span>
                <div style={{
                    width: '1px',
                    height: '40px',
                    background: 'linear-gradient(to bottom, var(--gold), transparent)',
                    animation: 'scroll-down 1.5s ease-in-out infinite',
                }} />
            </div>
        </section>
    );
}
