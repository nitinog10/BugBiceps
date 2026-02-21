import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animated particle/grid canvas background
function HeroCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h, particles, mouse = { x: 0, y: 0 };

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Grid
        const drawGrid = () => {
            const gap = 60;
            ctx.strokeStyle = 'rgba(240, 176, 32, 0.04)';
            ctx.lineWidth = 0.5;
            for (let x = 0; x < w; x += gap) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
            }
            for (let y = 0; y < h; y += gap) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
        };

        // Particles
        particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.5 + 0.2,
        }));

        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        let animId;
        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            drawGrid();

            // Draw connections near mouse
            particles.forEach((p, i) => {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(240, 176, 32, ${(1 - dist / 200) * 0.15})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }

                // Draw connections between particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const d = Math.hypot(p2.x - p.x, p2.y - p.y);
                    if (d < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(240, 176, 32, ${(1 - d / 120) * 0.08})`;
                        ctx.lineWidth = 0.3;
                        ctx.stroke();
                    }
                }

                // Update & draw particles
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(240, 176, 32, ${p.opacity})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <canvas ref={canvasRef} style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
        }} />
    );
}

export default function Hero() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const subRef = useRef(null);
    const badgeRef = useRef(null);
    const scrollIndicatorRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 3.5 });

            tl.fromTo(badgeRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
            );

            tl.fromTo(headingRef.current?.querySelectorAll('.hero-line') || [],
                { y: 100, opacity: 0, rotateX: -30 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out' },
                '-=0.4'
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

            gsap.to(headingRef.current, {
                y: -120,
                opacity: 0.2,
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
            background: '#08080C',
        }}>
            {/* Animated canvas bg */}
            <HeroCanvas />

            {/* Gradient blobs — VERY visible */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-5%',
                width: '50vw',
                height: '50vw',
                maxWidth: '700px',
                maxHeight: '700px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(240,176,32,0.18) 0%, rgba(240,96,32,0.06) 40%, transparent 70%)',
                filter: 'blur(80px)',
                animation: 'pulse-glow 8s ease-in-out infinite',
                pointerEvents: 'none',
                zIndex: 0,
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-5%',
                width: '45vw',
                height: '45vw',
                maxWidth: '600px',
                maxHeight: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(232,48,48,0.12) 0%, rgba(240,96,32,0.04) 40%, transparent 70%)',
                filter: 'blur(80px)',
                animation: 'pulse-glow 10s ease-in-out infinite',
                animationDelay: '4s',
                pointerEvents: 'none',
                zIndex: 0,
            }} />
            <div style={{
                position: 'absolute',
                top: '40%',
                right: '30%',
                width: '30vw',
                height: '30vw',
                maxWidth: '400px',
                maxHeight: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(240,176,32,0.08) 0%, transparent 60%)',
                filter: 'blur(60px)',
                animation: 'pulse-glow 6s ease-in-out infinite',
                animationDelay: '2s',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            {/* Logo watermark */}
            <img src="/logo.png" alt="" style={{
                position: 'absolute',
                width: 'clamp(250px, 30vw, 500px)',
                height: 'auto',
                opacity: 0.03,
                pointerEvents: 'none',
                filter: 'grayscale(50%)',
                zIndex: 1,
            }} />

            {/* Badge */}
            <div ref={badgeRef} style={{
                zIndex: 3,
                marginBottom: '32px',
                padding: '8px 20px',
                borderRadius: '50px',
                border: '1px solid rgba(240,176,32,0.2)',
                background: 'rgba(240,176,32,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }}>
                <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#F0B020',
                    boxShadow: '0 0 8px rgba(240,176,32,0.6)',
                    animation: 'pulse-glow 2s ease-in-out infinite',
                }} />
                <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: 'var(--gold)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                }}>
                    Digital Engineering Studio
                </span>
            </div>

            {/* Main heading — line by line */}
            <div ref={headingRef} style={{
                textAlign: 'center',
                zIndex: 3,
                perspective: '1000px',
            }}>
                <div className="hero-line" style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(1.8rem, 4.5vw, 4.2rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    color: 'var(--text-primary)',
                }}>
                    We Don't Build Websites.
                </div>
                <div className="hero-line" style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(1.8rem, 4.5vw, 4.2rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    marginTop: '4px',
                }}>
                    <span style={{
                        background: 'linear-gradient(135deg, #F0B020 0%, #F06020 50%, #E83030 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 30px rgba(240,176,32,0.3))',
                    }}>
                        We Engineer Empires.
                    </span>
                </div>
            </div>

            {/* Subtitle */}
            <div ref={subRef} style={{
                marginTop: 'clamp(24px, 3vw, 44px)',
                zIndex: 3,
                textAlign: 'center',
                maxWidth: '600px',
            }}>
                <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '12px',
                }}>
                    AI systems, scalable platforms, and automation engines — crafted by engineers who think in code, not templates.
                </p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '24px',
                    marginTop: '20px',
                    flexWrap: 'wrap',
                }}>
                    {['Web', 'Apps', 'AI', 'Automation'].map((item, i) => (
                        <span key={item} style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: i === 2 ? 'var(--gold)' : 'var(--text-muted)',
                        }}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* CTA buttons */}
            <div style={{
                marginTop: 'clamp(32px, 4vw, 50px)',
                zIndex: 3,
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                <button style={{
                    padding: '14px 36px',
                    background: 'linear-gradient(135deg, #F0B020, #F06020)',
                    color: '#08080C',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    borderRadius: '50px',
                    border: 'none',
                    letterSpacing: '0.02em',
                    boxShadow: '0 0 30px rgba(240,176,32,0.25)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'none',
                }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'scale(1.06)';
                        e.target.style.boxShadow = '0 0 50px rgba(240,176,32,0.45)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 0 30px rgba(240,176,32,0.25)';
                    }}
                >
                    Start a Project →
                </button>
                <button style={{
                    padding: '14px 36px',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderRadius: '50px',
                    border: '1px solid rgba(240,176,32,0.25)',
                    letterSpacing: '0.02em',
                    transition: 'all 0.3s ease',
                    cursor: 'none',
                }}
                    onMouseEnter={e => {
                        e.target.style.borderColor = 'rgba(240,176,32,0.5)';
                        e.target.style.background = 'rgba(240,176,32,0.06)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.borderColor = 'rgba(240,176,32,0.25)';
                        e.target.style.background = 'transparent';
                    }}
                >
                    View Our Work
                </button>
            </div>

            {/* Scroll indicator */}
            <div ref={scrollIndicatorRef} style={{
                position: 'absolute',
                bottom: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                zIndex: 3,
            }}>
                <span style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.25em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                }}>Scroll to explore</span>
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
