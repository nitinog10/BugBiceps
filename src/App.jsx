import { useCallback, useState } from 'react';
import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Work from './components/Work.jsx';
import Process from './components/Process.jsx';
import CTABand from './components/CTABand.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  // The hero holds its entrance until the loading curtain has lifted.
  const [ready, setReady] = useState(false);
  const handleDone = useCallback(() => setReady(true), []);

  return (
    <div className="min-h-screen bg-ink-900">
      <Preloader onDone={handleDone} />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Services />
        <Work />
        <Process />
        <CTABand />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
