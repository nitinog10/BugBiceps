import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Interactive grid + particles canvas
function HeroCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h, particles, mouse = { x: -1000, y: -1000 };

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Subtle dot grid
        const drawGrid = () => {
            const gap = 80;
            ctx.fillStyle = 'rgba(240, 176, 32, 0.04)';
            for (let x = gap; x < w; x += gap) {
                for (let y = gap; y < h; y += gap) {
                    const dx = mouse.x - x;
                    const dy = mouse.y - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const scale = dist < 200 ? 1 + (1 - dist / 200) * 2 : 1;
                    const alpha = dist < 200 ? 0.04 + (1 - dist / 200) * 0.12 : 0.04;
                    ctx.fillStyle = `rgba(240, 176, 32, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(x, y, scale, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        // Floating particles
        particles = Array.from({ length: 35 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.4 + 0.1,
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

            particles.forEach((p, i) => {
                // Connections near mouse
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(240, 176, 32, ${(1 - dist / 180) * 0.12})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }

                // Inter-particle connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const d = Math.hypot(p2.x - p.x, p2.y - p.y);
                    if (d < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(240, 176, 32, ${(1 - d / 100) * 0.06})`;
                        ctx.lineWidth = 0.3;
                        ctx.stroke();
                    }
                }

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
    const ctaRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 3.8 });

            // Badge
            tl.fromTo(badgeRef.current,
                { y: 30, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' }
            );

            // Heading — line reveal
            tl.fromTo(headingRef.current?.querySelectorAll('.hero-line') || [],
                { y: 120, opacity: 0, rotateX: -20 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out' },
                '-=0.4'
            );

            // Subtitle area
            tl.fromTo(subRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
                '-=0.8'
            );

            // CTA buttons
            tl.fromTo(ctaRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
                '-=0.5'
            );

            // Scroll indicator
            tl.fromTo(scrollIndicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6 },
                '-=0.3'
            );

            // Parallax on scroll
            gsap.to(headingRef.current, {
                y: -150,
                opacity: 0,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const services = ['Web', 'Mobile', 'AI Systems', 'Automation', 'SEO', 'Graphic & 3D'];

    return (
        <section id="home" ref={sectionRef} style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '0 clamp(24px, 5vw, 80px)',
            background: 'var(--bg-primary)',
        }}>
            <HeroCanvas />

            {/* Gradient blobs */}
            <div style={{
                position: 'absolute',
                top: '-15%',
                left: '-8%',
                width: '50vw',
                height: '50vw',
                maxWidth: '700px',
                maxHeight: '700px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(240,176,32,0.12) 0%, rgba(240,96,32,0.04) 40%, transparent 70%)',
                filter: 'blur(80px)',
                animation: 'pulse-glow 10s ease-in-out infinite',
                pointerEvents: 'none',
                zIndex: 0,
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-15%',
                right: '-8%',
                width: '45vw',
                height: '45vw',
                maxWidth: '600px',
                maxHeight: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(232,48,48,0.08) 0%, rgba(240,96,32,0.03) 40%, transparent 70%)',
                filter: 'blur(80px)',
                animation: 'pulse-glow 12s ease-in-out infinite',
                animationDelay: '5s',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            {/* Logo watermark */}
            <img src="/logo.png" alt="" style={{
                position: 'absolute',
                width: 'clamp(300px, 35vw, 600px)',
                height: 'auto',
                opacity: 0.02,
                pointerEvents: 'none',
                filter: 'grayscale(100%)',
                zIndex: 1,
            }} />

            {/* Badge */}
            <div ref={badgeRef} style={{
                zIndex: 3,
                marginBottom: '36px',
                padding: '8px 22px',
                borderRadius: '50px',
                border: '1px solid rgba(240,176,32,0.15)',
                background: 'rgba(240,176,32,0.04)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                opacity: 0,
            }}>
                <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#F0B020',
                    boxShadow: '0 0 10px rgba(240,176,32,0.6)',
                    animation: 'breathe 2s ease-in-out infinite',
                }} />
                <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: 'rgba(240,176,32,0.7)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                }}>
                    Digital Engineering Studio
                </span>
            </div>

            {/* Main heading */}
            <div ref={headingRef} style={{
                textAlign: 'center',
                zIndex: 3,
                perspective: '1200px',
            }}>
                <div className="hero-line" style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    color: 'var(--text-primary)',
                    opacity: 0,
                }}>
                    Engineering Digital
                </div>
                <div className="hero-line" style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    marginTop: '4px',
                    opacity: 0,
                }}>
                    <span style={{
                        background: 'linear-gradient(135deg, #F0B020 0%, #F06020 50%, #E83030 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 40px rgba(240,176,32,0.25))',
                    }}>
                        Systems That Scale
                    </span>
                </div>
            </div>

            {/* Subtitle + service tags */}
            <div ref={subRef} style={{
                marginTop: 'clamp(28px, 3vw, 48px)',
                zIndex: 3,
                textAlign: 'center',
                maxWidth: '650px',
                opacity: 0,
            }}>
                <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                }}>
                    AI systems, scalable platforms, and automation engines — crafted by
                    engineers who think in architecture, not templates.
                </p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '28px',
                    flexWrap: 'wrap',
                }}>
                    {services.map((item, i) => (
                        <span key={item} style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.68rem',
                            fontWeight: 500,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            padding: '4px 14px',
                            borderRadius: '50px',
                            border: '1px solid rgba(240,176,32,0.08)',
                            background: 'rgba(240,176,32,0.03)',
                            transition: 'all 0.3s ease',
                        }}
                            onMouseEnter={e => {
                                e.target.style.borderColor = 'rgba(240,176,32,0.25)';
                                e.target.style.color = '#F0B020';
                                e.target.style.background = 'rgba(240,176,32,0.06)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.borderColor = 'rgba(240,176,32,0.08)';
                                e.target.style.color = 'var(--text-muted)';
                                e.target.style.background = 'rgba(240,176,32,0.03)';
                            }}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div ref={ctaRef} style={{
                marginTop: 'clamp(36px, 4vw, 56px)',
                zIndex: 3,
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                opacity: 0,
            }}>
                <a href="#contact">
                    <button id="hero-cta-primary" style={{
                        padding: '16px 40px',
                        background: 'linear-gradient(135deg, #F0B020, #F06020)',
                        color: '#060608',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        borderRadius: '50px',
                        border: 'none',
                        letterSpacing: '0.02em',
                        boxShadow: '0 0 30px rgba(240,176,32,0.2)',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        cursor: 'none',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'scale(1.06)';
                            e.target.style.boxShadow = '0 0 60px rgba(240,176,32,0.4)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 0 30px rgba(240,176,32,0.2)';
                        }}
                    >
                        Start a Project →
                    </button>
                </a>
                <a href="#work">
                    <button id="hero-cta-secondary" style={{
                        padding: '16px 40px',
                        background: 'transparent',
                        color: 'var(--text-primary)',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        borderRadius: '50px',
                        border: '1px solid rgba(240,176,32,0.2)',
                        letterSpacing: '0.02em',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        cursor: 'none',
                    }}
                        onMouseEnter={e => {
                            e.target.style.borderColor = 'rgba(240,176,32,0.5)';
                            e.target.style.background = 'rgba(240,176,32,0.05)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.borderColor = 'rgba(240,176,32,0.2)';
                            e.target.style.background = 'transparent';
                        }}
                    >
                        View Our Work
                    </button>
                </a>
            </div>

            {/* Scroll indicator */}
            <div ref={scrollIndicatorRef} style={{
                position: 'absolute',
                bottom: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                zIndex: 3,
                opacity: 0,
            }}>
                <span style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.3em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 500,
                }}>scroll</span>
                <div style={{
                    width: '1px',
                    height: '40px',
                    background: 'linear-gradient(to bottom, rgba(240,176,32,0.4), transparent)',
                    animation: 'scroll-down 2s ease-in-out infinite',
                }} />
            </div>
        </section>
    );
}
