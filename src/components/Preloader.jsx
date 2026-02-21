import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
    const [count, setCount] = useState(0);
    const preloaderRef = useRef(null);
    const logoRef = useRef(null);
    const counterRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Logo entrance
        tl.fromTo(logoRef.current,
            { scale: 0.5, opacity: 0, filter: 'blur(20px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }
        );

        // Counter animation
        const counter = { val: 0 };
        tl.to(counter, {
            val: 100,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => setCount(Math.round(counter.val)),
        }, '-=0.5');

        // Progress bar
        tl.to(barRef.current, {
            width: '100%',
            duration: 2,
            ease: 'power2.inOut',
        }, '<');

        // Exit
        tl.to(logoRef.current, {
            scale: 1.2,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.in',
        }, '+=0.3');

        tl.to(counterRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
        }, '<');

        tl.to(preloaderRef.current, {
            yPercent: -100,
            duration: 1,
            ease: 'expo.inOut',
            onComplete: () => onComplete && onComplete(),
        }, '-=0.2');

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div ref={preloaderRef} style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0A0A0F',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
        }}>
            <img
                ref={logoRef}
                src="/logo.png"
                alt="BugBiceps"
                style={{ width: '150px', height: '150px', objectFit: 'contain', opacity: 0 }}
            />
            <div ref={counterRef} style={{ textAlign: 'center' }}>
                <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #E8A820, #E85820)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.03em',
                }}>
                    {count}%
                </div>
                <div style={{
                    width: '200px',
                    height: '3px',
                    background: 'rgba(232,168,32,0.15)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    marginTop: '20px',
                }}>
                    <div ref={barRef} style={{
                        width: '0%',
                        height: '100%',
                        background: 'linear-gradient(90deg, #E8A820, #E85820)',
                        borderRadius: '2px',
                    }} />
                </div>
            </div>
        </div>
    );
}
