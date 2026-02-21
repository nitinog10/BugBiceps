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

        // Lenis smooth scroll
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
                    <main>
                        <Hero />
                        <Services />
                        <AIShowcase />
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
