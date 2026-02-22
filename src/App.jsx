import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';

import Hero from './sections/Hero';
import Services from './sections/Services';
import AIShowcase from './sections/AIShowcase';
import CaseStudies from './sections/CaseStudies';
import Philosophy from './sections/Philosophy';
import Education from './sections/Education';
import Testimonials from './sections/Testimonials';
import Stats from './sections/Stats';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [loading, setLoading] = useState(true);

    const onPreloaderComplete = useCallback(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        if (loading) return;

        // Initialize Lenis smooth scroll — physics-based, buttery feel
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
        });

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Expose lenis globally for smooth nav scrolling
        window.__lenis = lenis;

        return () => {
            lenis.destroy();
            window.__lenis = null;
        };
    }, [loading]);

    return (
        <>
            <Preloader onComplete={onPreloaderComplete} />
            {!loading && (
                <>
                    <CustomCursor />
                    <ScrollProgress />
                    <Navbar />

                    {/* Noise texture overlay */}
                    <div className="noise-overlay" />

                    {/* Global ambient background */}
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: -1,
                        background: 'var(--bg-primary)',
                        pointerEvents: 'none',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '8%',
                            left: '3%',
                            width: '35vw',
                            height: '35vw',
                            maxWidth: '450px',
                            maxHeight: '450px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(240,176,32,0.04) 0%, transparent 60%)',
                            filter: 'blur(100px)',
                            animation: 'pulse-glow 14s ease-in-out infinite',
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '15%',
                            right: '8%',
                            width: '30vw',
                            height: '30vw',
                            maxWidth: '400px',
                            maxHeight: '400px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(232,48,48,0.03) 0%, transparent 60%)',
                            filter: 'blur(100px)',
                            animation: 'pulse-glow 18s ease-in-out infinite',
                            animationDelay: '6s',
                        }} />
                    </div>

                    <main>
                        <Hero />
                        <div className="section-divider" />
                        <Services />
                        <div className="section-divider" />
                        <AIShowcase />
                        <Education />
                        <div className="section-divider" />
                        <CaseStudies />
                        <Philosophy />
                        <Testimonials />
                        <Stats />
                        <Contact />
                    </main>
                    <Footer />
                </>
            )}
        </>
    );
}

export default App;
