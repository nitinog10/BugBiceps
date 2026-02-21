import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
    const [count, setCount] = useState(0);
    const preloaderRef = useRef(null);
    const logoRef = useRef(null);
    const counterRef = useRef(null);
    const barRef = useRef(null);
    const taglineRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Initial state — dark screen, then elements fade in
        tl.set(preloaderRef.current, { opacity: 1 });

        // Logo entrance with glow ring
        tl.fromTo(logoRef.current,
            { scale: 0.6, opacity: 0, filter: 'blur(30px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' }
        );

        // Tagline
        tl.fromTo(taglineRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
            '-=0.6'
        );

        // Counter animation
        const counter = { val: 0 };
        tl.to(counter, {
            val: 100,
            duration: 2.2,
            ease: 'power3.inOut',
            onUpdate: () => setCount(Math.round(counter.val)),
        }, '-=0.3');

        // Progress bar
        tl.to(barRef.current, {
            width: '100%',
            duration: 2.2,
            ease: 'power3.inOut',
        }, '<');

        // Exit sequence — cinematic
        tl.to(taglineRef.current, {
            opacity: 0,
            y: -15,
            duration: 0.3,
            ease: 'power2.in',
        }, '+=0.4');

        tl.to(logoRef.current, {
            scale: 40,
            opacity: 0,
            duration: 1,
            ease: 'expo.in',
        }, '-=0.1');

        tl.to(counterRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.3,
        }, '<');

        tl.to(preloaderRef.current, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.8,
            ease: 'expo.inOut',
            onComplete: () => onComplete && onComplete(),
        }, '-=0.4');

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div ref={preloaderRef} style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#060608',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            clipPath: 'inset(0 0 0 0)',
        }}>
            {/* Ambient glow behind logo */}
            <div style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(240,176,32,0.15) 0%, rgba(240,96,32,0.06) 40%, transparent 70%)',
                filter: 'blur(60px)',
                animation: 'pulse-glow 3s ease-in-out infinite',
                pointerEvents: 'none',
            }} />

            <img
                ref={logoRef}
                src="/logo.png"
                alt="BugBiceps"
                style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'contain',
                    opacity: 0,
                    position: 'relative',
                    zIndex: 2,
                    filter: 'drop-shadow(0 0 40px rgba(240,176,32,0.3))',
                }}
            />

            <span ref={taglineRef} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(240,176,32,0.5)',
                opacity: 0,
                position: 'relative',
                zIndex: 2,
            }}>
                Engineering Digital Systems
            </span>

            <div ref={counterRef} style={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 2,
            }}>
                <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #F0B020, #F06020)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                }}>
                    {count}
                </div>
                <div style={{
                    width: '120px',
                    height: '2px',
                    background: 'rgba(240,176,32,0.1)',
                    borderRadius: '1px',
                    overflow: 'hidden',
                    marginTop: '24px',
                    margin: '24px auto 0',
                }}>
                    <div ref={barRef} style={{
                        width: '0%',
                        height: '100%',
                        background: 'linear-gradient(90deg, #F0B020, #F06020)',
                        borderRadius: '1px',
                    }} />
                </div>
            </div>
        </div>
    );
}
