import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AIShowcase() {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        const nodes = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 2,
        }));

        let animId;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[j].x - nodes[i].x;
                    const dy = nodes[j].y - nodes[i].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) {
                        const alpha = (1 - dist / 200) * 0.25;
                        ctx.strokeStyle = `rgba(240, 176, 32, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > canvas.offsetWidth) n.vx *= -1;
                if (n.y < 0 || n.y > canvas.offsetHeight) n.vy *= -1;

                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(240, 176, 32, 0.8)';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius + 6, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(240, 176, 32, 0.12)';
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };
        draw();

        const gsapCtx = gsap.context(() => {
            gsap.fromTo('.ai-text-item',
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'expo.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                    }
                }
            );
        }, sectionRef);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            gsapCtx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background: 'var(--bg-secondary)',
        }}>
            <canvas ref={canvasRef} style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
            }} />

            <div className="section-container" style={{
                position: 'relative',
                zIndex: 2,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '80px',
                alignItems: 'center',
                padding: 'var(--section-pad) clamp(20px, 4vw, 60px)',
                maxWidth: 'var(--container-max)',
                margin: '0 auto',
                width: '100%',
            }}>
                <div>
                    <span className="ai-text-item" style={{
                        display: 'block',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '0.8rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gold)',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        marginBottom: '16px',
                    }}>
                        AI Engineering
                    </span>
                    <h2 className="ai-text-item" style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                    }}>
                        Building the{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #F0B020, #E83030)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>Future</span>
                        {' '}with AI
                    </h2>
                    <p className="ai-text-item" style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '1.05rem',
                        color: 'var(--text-secondary)',
                        marginTop: '24px',
                        lineHeight: 1.7,
                        maxWidth: '500px',
                    }}>
                        From custom LLMs to production-grade RAG systems, we engineer AI solutions
                        that don't just work — they dominate. Every system is built for performance,
                        accuracy, and scale.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                }}>
                    {[
                        { label: 'LLM Fine-Tuning', value: 'Custom Models' },
                        { label: 'RAG Systems', value: 'Production-Grade' },
                        { label: 'AI Chatbots', value: 'Multi-Platform' },
                        { label: 'Automation', value: 'End-to-End' },
                    ].map((item) => (
                        <div key={item.label} className="ai-text-item" style={{
                            padding: '28px 24px',
                            background: 'linear-gradient(145deg, rgba(20,20,32,0.85), rgba(14,14,22,0.9))',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(240, 176, 32, 0.15)',
                            borderRadius: '16px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.35)';
                                e.currentTarget.style.boxShadow = '0 4px 30px rgba(240,176,32,0.1)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.15)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                            }}
                        >
                            <p style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: '0.75rem',
                                color: 'var(--gold)',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                fontWeight: 500,
                            }}>{item.label}</p>
                            <p style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                marginTop: '8px',
                            }}>{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .section-container { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
        </section>
    );
}
