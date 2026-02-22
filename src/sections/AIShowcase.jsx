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

        const nodes = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2.5 + 1.5,
            pulsePhase: Math.random() * Math.PI * 2,
        }));

        let animId;
        let time = 0;
        const draw = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[j].x - nodes[i].x;
                    const dy = nodes[j].y - nodes[i].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) {
                        const alpha = (1 - dist / 180) * 0.2;
                        ctx.strokeStyle = `rgba(240, 176, 32, ${alpha})`;
                        ctx.lineWidth = 0.6;
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

                const pulse = Math.sin(time * 2 + n.pulsePhase) * 0.5 + 0.5;
                const r = n.radius * (0.8 + pulse * 0.4);

                ctx.beginPath();
                ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(240, 176, 32, ${0.5 + pulse * 0.3})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(240, 176, 32, ${0.04 + pulse * 0.04})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };
        draw();

        const gsapCtx = gsap.context(() => {
            gsap.fromTo('.ai-reveal',
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'expo.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 65%',
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

    const capabilities = [
        { label: 'LLM Fine-Tuning', value: 'Custom Models', detail: 'GPT, LLaMA, Mistral' },
        { label: 'RAG Systems', value: 'Production-Grade', detail: 'Vector DB + Embeddings' },
        { label: 'AI Chatbots', value: 'Multi-Platform', detail: 'Web, Slack, WhatsApp' },
        { label: 'Automation', value: 'End-to-End', detail: 'No-code → Pro-code' },
    ];

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

            <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '80px',
                alignItems: 'center',
                padding: 'var(--section-pad) clamp(24px, 5vw, 80px)',
                maxWidth: 'var(--container-max)',
                margin: '0 auto',
                width: '100%',
            }} className="ai-grid">
                <div>
                    <span className="ai-reveal" style={{
                        display: 'block',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        color: 'rgba(240,176,32,0.6)',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        marginBottom: '16px',
                        opacity: 0,
                    }}>
                        AI Engineering
                    </span>
                    <h2 className="ai-reveal" style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                        fontWeight: 800,
                        lineHeight: 1.05,
                        letterSpacing: '-0.03em',
                        opacity: 0,
                    }}>
                        Building the{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #F0B020, #E83030)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>Future</span>
                        <br />with AI
                    </h2>
                    <p className="ai-reveal" style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '1rem',
                        color: 'var(--text-secondary)',
                        marginTop: '24px',
                        lineHeight: 1.8,
                        maxWidth: '480px',
                        opacity: 0,
                    }}>
                        From custom LLMs to production-grade RAG systems, we engineer AI solutions
                        that don't just work — they dominate. Every system is built for performance,
                        accuracy, and scale.
                    </p>

                    {/* Tech badges */}
                    <div className="ai-reveal" style={{
                        marginTop: '32px',
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                        opacity: 0,
                    }}>
                        {['PyTorch', 'LangChain', 'Pinecone', 'OpenAI', 'HuggingFace'].map(tech => (
                            <span key={tech} style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.6rem',
                                letterSpacing: '0.08em',
                                padding: '5px 14px',
                                borderRadius: '50px',
                                border: '1px solid rgba(240,176,32,0.1)',
                                background: 'rgba(240,176,32,0.04)',
                                color: 'var(--text-muted)',
                            }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="ai-capabilities-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                }}>
                    {capabilities.map((item) => (
                        <div key={item.label} className="ai-reveal" style={{
                            padding: '28px 24px',
                            background: 'rgba(12, 12, 20, 0.8)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(240, 176, 32, 0.08)',
                            borderRadius: '14px',
                            transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            opacity: 0,
                            cursor: 'none',
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.25)';
                                e.currentTarget.style.boxShadow = '0 4px 30px rgba(240,176,32,0.08)';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.08)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <p style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.6rem',
                                color: 'rgba(240,176,32,0.6)',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                fontWeight: 500,
                            }}>{item.label}</p>
                            <p style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                marginTop: '8px',
                                letterSpacing: '-0.01em',
                            }}>{item.value}</p>
                            <p style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                marginTop: '6px',
                            }}>{item.detail}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .ai-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
                    .ai-capabilities-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
}
