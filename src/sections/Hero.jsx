import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────
// SPOTLIGHT LOGO — Cinematic cursor-following reveal effect
// Two layers:
//   1. Base logo: ultra-low opacity, dark/muted (always visible)
//   2. Bright logo: full brightness, masked by a radial gradient
//      that follows the cursor with lerp interpolation
// ─────────────────────────────────────────────────────────
function SpotlightLogo() {
    const containerRef = useRef(null);
    const brightRef = useRef(null);
    const glowRef = useRef(null);

    // Lerp state — not React state to avoid re-renders at 60fps
    const mouse = useRef({ x: 0.5, y: 0.5 }); // normalized [0..1]
    const lerped = useRef({ x: 0.5, y: 0.5 });
    const velocity = useRef({ x: 0, y: 0 });
    const prevLerped = useRef({ x: 0.5, y: 0.5 });
    const isInside = useRef(false);
    const spotlightOpacity = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        const brightMask = brightRef.current;
        const glow = glowRef.current;
        if (!container || !brightMask || !glow) return;

        const LERP_SPEED = 0.16;       // Snappier tracking
        const SPOTLIGHT_RADIUS = 280;   // px — soft circle radius
        const GLOW_SIZE = 350;          // px — outer glow ring

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouse.current.x = (e.clientX - rect.left) / rect.width;
            mouse.current.y = (e.clientY - rect.top) / rect.height;
        };

        const handleMouseEnter = () => {
            isInside.current = true;
        };

        const handleMouseLeave = () => {
            isInside.current = false;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        let animId;
        const animate = () => {
            // Lerp position
            lerped.current.x += (mouse.current.x - lerped.current.x) * LERP_SPEED;
            lerped.current.y += (mouse.current.y - lerped.current.y) * LERP_SPEED;

            // Smooth spotlight opacity transition
            const targetOpacity = isInside.current ? 1 : 0;
            spotlightOpacity.current += (targetOpacity - spotlightOpacity.current) * 0.06;

            // Pixel positions
            const rect = container.getBoundingClientRect();
            const px = lerped.current.x * rect.width;
            const py = lerped.current.y * rect.height;

            // Update bright logo mask — radial gradient following cursor
            brightMask.style.maskImage = `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${px}px ${py}px, rgba(0,0,0,${spotlightOpacity.current}) 0%, rgba(0,0,0,${spotlightOpacity.current * 0.4}) 50%, transparent 80%)`;
            brightMask.style.webkitMaskImage = brightMask.style.maskImage;

            // Update glow element
            glow.style.left = `${px}px`;
            glow.style.top = `${py}px`;
            glow.style.opacity = spotlightOpacity.current * 0.55;

            animId = requestAnimationFrame(animate);
        };

        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const logoSize = 'clamp(350px, 50vw, 700px)';

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                pointerEvents: 'auto',
            }}
        >
            {/* Layer 1 — Base muted logo (always visible, ultra dim) */}
            <img
                src="/logo.png"
                alt=""
                draggable={false}
                style={{
                    position: 'absolute',
                    width: logoSize,
                    height: 'auto',
                    opacity: 0.02,
                    filter: 'grayscale(100%) brightness(0.4)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            />

            {/* Layer 2 — Revealed Logo Container (Masked) */}
            <div
                ref={brightRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    willChange: 'mask-image, -webkit-mask-image',
                }}
            >
                <img
                    src="/logo.png"
                    alt=""
                    draggable={false}
                    style={{
                        width: logoSize,
                        height: 'auto',
                        opacity: 0.35,
                        filter: 'brightness(1.1) saturate(1.2)',
                    }}
                />
            </div>

            {/* Glow orb — follows cursor, creates ambient light feel */}
            <div
                ref={glowRef}
                style={{
                    position: 'absolute',
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(240,176,32,0.12) 0%, rgba(240,96,32,0.05) 40%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    filter: 'blur(30px)',
                    opacity: 0,
                    willChange: 'left, top, opacity, width, height',
                }}
            />
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// INTERACTIVE DOT GRID CANVAS
// ─────────────────────────────────────────────────────────
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

        // Subtle dot grid that reacts to mouse
        const drawGrid = () => {
            const gap = 80;
            for (let x = gap; x < w; x += gap) {
                for (let y = gap; y < h; y += gap) {
                    const dx = mouse.x - x;
                    const dy = mouse.y - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const scale = dist < 200 ? 1 + (1 - dist / 200) * 2 : 1;
                    const alpha = dist < 200 ? 0.03 + (1 - dist / 200) * 0.08 : 0.03;
                    ctx.fillStyle = `rgba(240, 176, 32, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(x, y, scale, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        // Floating particles
        particles = Array.from({ length: 25 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 1.2 + 0.4,
            speedX: (Math.random() - 0.5) * 0.15,
            speedY: (Math.random() - 0.5) * 0.15,
            opacity: Math.random() * 0.3 + 0.05,
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
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(240, 176, 32, ${(1 - dist / 160) * 0.08})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const d = Math.hypot(p2.x - p.x, p2.y - p.y);
                    if (d < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(240, 176, 32, ${(1 - d / 100) * 0.04})`;
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
            zIndex: 0,
        }} />
    );
}

// ─────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────
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

            // Heading — line reveal with 3D
            tl.fromTo(headingRef.current?.querySelectorAll('.hero-line') || [],
                { y: 120, opacity: 0, rotateX: -20 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out' },
                '-=0.4'
            );

            // Subtitle
            tl.fromTo(subRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
                '-=0.8'
            );

            // CTA
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

            // Parallax out on scroll
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
            {/* Canvas grid layer */}
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
                background: 'radial-gradient(circle, rgba(240,176,32,0.10) 0%, rgba(240,96,32,0.03) 40%, transparent 70%)',
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
                background: 'radial-gradient(circle, rgba(232,48,48,0.06) 0%, rgba(240,96,32,0.02) 40%, transparent 70%)',
                filter: 'blur(80px)',
                animation: 'pulse-glow 12s ease-in-out infinite',
                animationDelay: '5s',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            {/* ★ SPOTLIGHT LOGO — Cinematic cursor interaction ★ */}
            <SpotlightLogo />

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
                        We Flex Code Until Bugs Break
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
                    Web • Mobile • AI Systems • Automation • SEO • Graphic & 3D
                </p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '24px',
                    flexWrap: 'wrap',
                }}>
                    {services.map((item) => (
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
