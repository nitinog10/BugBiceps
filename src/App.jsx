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

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
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

                    {/* Global ambient background */}
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: -1,
                        background: '#08080C',
                        pointerEvents: 'none',
                    }}>
                        {/* Persistent ambient gradient blobs */}
                        <div style={{
                            position: 'absolute',
                            top: '10%',
                            left: '5%',
                            width: '40vw',
                            height: '40vw',
                            maxWidth: '500px',
                            maxHeight: '500px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(240,176,32,0.06) 0%, transparent 60%)',
                            filter: 'blur(100px)',
                            animation: 'pulse-glow 12s ease-in-out infinite',
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '20%',
                            right: '10%',
                            width: '35vw',
                            height: '35vw',
                            maxWidth: '450px',
                            maxHeight: '450px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(232,48,48,0.04) 0%, transparent 60%)',
                            filter: 'blur(100px)',
                            animation: 'pulse-glow 15s ease-in-out infinite',
                            animationDelay: '5s',
                        }} />
                    </div>

                    <main>
                        <Hero />
                        {/* Section divider */}
                        <div style={{
                            width: '100%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.15), transparent)',
                        }} />
                        <Services />
                        <div style={{
                            width: '100%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.15), transparent)',
                        }} />
                        <AIShowcase />
                        <div style={{
                            width: '100%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(240,176,32,0.15), transparent)',
                        }} />
                        <CaseStudies />
                        <Philosophy />
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
