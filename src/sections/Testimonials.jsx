import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaQuoteLeft } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: 'Vibhuti Upadhyay',
        role: 'Student',
        text: 'Bug Biceps helped me understand how Generative AI actually works behind the scenes. The sessions connected theory with real-world use cases and significantly improved my problem-solving approach.',
        stars: 5,
    },
    {
        name: 'Shashwat Singh',
        role: 'Student',
        text: 'I explored AI tools and agents that I had never worked with before. The learning was practical, hands-on, and genuinely expanded my understanding of modern AI workflows.',
        stars: 5,
    },
    {
        name: 'Shristi Sonekar',
        role: 'Beginner Programmer',
        text: 'As someone new to AI and coding, Bug Biceps made complex concepts simple and approachable. It gave me a clear entry point into the tech field.',
        stars: 5,
    },
    {
        name: 'Shivam Meena',
        role: 'Student',
        text: 'The learning experience exceeded my expectations. The sessions were engaging, clear, and focused on building real understanding instead of just theory.',
        stars: 5,
    },
    {
        name: 'Khushi Maitrayee',
        role: 'Engineering Student',
        text: 'The program helped me build skills useful for hackathons, internships, and placements. Some areas could go deeper, but overall it was a valuable learning experience.',
        stars: 4,
    },
    {
        name: 'Suraj Sahoo',
        role: 'Student',
        text: 'I gained a much clearer understanding of AI models and how they work internally. The explanations helped bridge the gap between curiosity and actual technical knowledge.',
        stars: 5,
    },
    {
        name: 'Jeshpreet Singh Mahun',
        role: 'First-Year Student',
        text: 'Bug Biceps pushed me beyond just using AI tools to actually building with them. It helped me understand core concepts in simple terms, stay consistent for 30 days, and complete a real project I\'m proud to showcase.',
        stars: 5,
    },
];

// Duplicate for seamless infinite scroll
const duplicated = [...testimonials, ...testimonials];

export default function Testimonials() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading reveal
            gsap.timeline({
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'top 88%',
                    end: 'top 55%',
                    scrub: 0.6,
                },
            }).fromTo(headingRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'none' }
            );
        }, sectionRef);

        // Marquee animation
        const track = trackRef.current;
        if (!track) return;

        const totalWidth = track.scrollWidth / 2;

        const tween = gsap.to(track, {
            x: -totalWidth,
            duration: 45,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
            },
        });

        // Pause on hover
        const handleEnter = () => gsap.to(tween, { timeScale: 0, duration: 0.5 });
        const handleLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });

        track.addEventListener('mouseenter', handleEnter);
        track.addEventListener('mouseleave', handleLeave);

        return () => {
            ctx.revert();
            tween.kill();
            track.removeEventListener('mouseenter', handleEnter);
            track.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    const renderStars = (count) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{
                color: i < count ? '#F0B020' : 'rgba(240,176,32,0.15)',
                fontSize: '0.75rem',
                marginRight: '2px',
            }}>★</span>
        ));
    };

    return (
        <section ref={sectionRef} style={{
            padding: 'var(--section-pad) 0',
            background: 'var(--bg-primary)',
            overflow: 'hidden',
            position: 'relative',
        }}>
            {/* Top line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.2), transparent)',
            }} />

            {/* Heading */}
            <div ref={headingRef} style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '0 clamp(24px, 5vw, 80px)',
                textAlign: 'center',
                marginBottom: '60px',
                opacity: 0,
            }}>
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    color: 'rgba(240, 176, 32, 0.55)',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: '16px',
                }}>
                    What Students Say
                </span>
                <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.08,
                    marginBottom: '18px',
                }}>
                    Voices from the{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, #F0B020, #F06020)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>Community</span>
                </h2>
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    color: 'var(--text-secondary)',
                    maxWidth: '550px',
                    margin: '0 auto',
                    lineHeight: 1.7,
                }}>
                    Real experiences from real learners building their careers with Bug Biceps.
                </p>
            </div>

            {/* Carousel Track */}
            <div style={{
                position: 'relative',
                width: '100%',
                maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}>
                <div
                    ref={trackRef}
                    style={{
                        display: 'flex',
                        gap: '24px',
                        width: 'max-content',
                        cursor: 'default',
                    }}
                >
                    {duplicated.map((t, i) => (
                        <div
                            key={`${t.name}-${i}`}
                            style={{
                                flexShrink: 0,
                                width: '340px',
                                padding: '32px 28px',
                                background: 'rgba(12, 12, 20, 0.6)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                border: '1px solid rgba(240, 176, 32, 0.06)',
                                borderRadius: '16px',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.18)';
                                e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.35), 0 0 20px rgba(240,176,32,0.06)';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(240, 176, 32, 0.06)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {/* Top accent */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '2px',
                                background: 'linear-gradient(90deg, rgba(240,176,32,0.4), transparent)',
                            }} />

                            {/* Quote icon */}
                            <FaQuoteLeft style={{
                                fontSize: '20px',
                                color: 'rgba(240, 176, 32, 0.15)',
                                marginBottom: '16px',
                            }} />

                            {/* Testimonial text */}
                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.88rem',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.75,
                                marginBottom: '20px',
                                minHeight: '90px',
                            }}>
                                "{t.text}"
                            </p>

                            {/* Stars */}
                            <div style={{ marginBottom: '16px' }}>
                                {renderStars(t.stars)}
                            </div>

                            {/* Divider */}
                            <div style={{
                                height: '1px',
                                background: 'rgba(240, 176, 32, 0.08)',
                                marginBottom: '16px',
                            }} />

                            {/* Author */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                            }}>
                                {/* Avatar placeholder - initials */}
                                <div style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(240,176,32,0.15), rgba(240,96,32,0.1))',
                                    border: '1px solid rgba(240,176,32,0.12)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: '#F0B020',
                                    letterSpacing: '0.02em',
                                    flexShrink: 0,
                                }}>
                                    {t.name.split(' ').map(n => n[0]).join('')}
                                </div>

                                <div>
                                    <p style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                        lineHeight: 1.3,
                                    }}>
                                        {t.name}
                                    </p>
                                    <p style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.62rem',
                                        color: 'var(--text-muted)',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        marginTop: '2px',
                                    }}>
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom line */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.2), transparent)',
            }} />
        </section>
    );
}
