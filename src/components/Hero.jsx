import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { site, startProjectHref } from '../data/site.js';

const SLIDES = ['/bg3.jpg'];
const SLIDE_MS = 6500;

// Headline split into words so each can be masked and pushed up individually.
const HEADLINE = [
  { text: 'Beyond' },
  { text: 'Boundaries' },
  { text: 'Built', break: true },
  { text: 'to' },
  { text: 'Scale', accent: true },
];

export default function Hero({ ready = true }) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);
  const [slide, setSlide] = useState(0);

  // Auto-advancing crossfade. Held still for anyone who asked for less motion.
  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(() => setSlide((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Hide the copy before first paint so nothing flashes behind the curtain.
  useLayoutEffect(() => {
    if (reduceMotion) return undefined;
    const ctx = gsap.context(() => {
      gsap.set('[data-hero="word"]', { yPercent: 115 });
      gsap.set(
        '[data-hero="pill"], [data-hero="motto"], [data-hero="lead"], [data-hero="cta"]',
        { y: 18, opacity: 0 }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  // Entrance, once the curtain has lifted.
  useLayoutEffect(() => {
    if (!ready || reduceMotion) return undefined;
    let timeline;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline = tl;

      tl.to('[data-hero="pill"]', { y: 0, opacity: 1, duration: 0.6 })
        .to(
          '[data-hero="word"]',
          { yPercent: 0, duration: 1, stagger: 0.08, ease: 'power4.out' },
          '-=0.35'
        )
        .to('[data-hero="motto"]', { y: 0, opacity: 1, duration: 0.6 }, '-=0.65')
        .to('[data-hero="lead"]', { y: 0, opacity: 1, duration: 0.6 }, '-=0.45')
        .to('[data-hero="cta"]', { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
    }, rootRef);

    // A throttled tab can stall the timeline mid-flight; never leave the copy
    // stuck invisible.
    const failSafe = setTimeout(() => timeline?.progress(1), 5000);

    return () => {
      clearTimeout(failSafe);
      ctx.revert();
    };
  }, [ready, reduceMotion]);

  return (
    <section
      ref={rootRef}
      id="top"
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden pb-28 pt-32"
    >
      {/* Slider: crossfade plus a slow push-in on whichever frame is showing. */}
      <div aria-hidden="true" className="absolute inset-0 -z-30 overflow-hidden bg-ink-900">
        {SLIDES.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${src}')` }}
            initial={false}
            animate={{
              opacity: i === slide ? 1 : 0,
              scale: reduceMotion ? 1 : i === slide ? 1.07 : 1,
            }}
            transition={{
              opacity: { duration: 1.7, ease: 'easeInOut' },
              scale: { duration: SLIDE_MS / 1000 + 1.7, ease: 'linear' },
            }}
          />
        ))}
      </div>

      {/* Vertical scrim — solid under the navbar, solid into the next section. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(to bottom, #0B0F12 0%, rgba(11,15,18,0.62) 20%, rgba(11,15,18,0.30) 48%, rgba(11,15,18,0.80) 84%, #0B0F12 100%)',
        }}
      />

      {/* Copy sits left, so the left third is washed down hard while the sun and
          ridgeline stay clear on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hidden md:block"
        style={{
          background:
            'linear-gradient(to right, rgba(11,15,18,0.95) 0%, rgba(11,15,18,0.88) 26%, rgba(11,15,18,0.60) 48%, rgba(11,15,18,0.20) 72%, transparent 90%)',
        }}
      />

      {/* Narrow screens put the copy over the middle of the frame. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-ink-900/70 md:hidden" />

      <div className="container-page relative z-10">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div data-hero="pill">
            <span
              className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.12]
                         bg-ink-800/70 px-4 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-400" />
              </span>
              <span className="font-sans text-[10.5px] font-medium uppercase tracking-eyebrow text-ash-300">
                {site.tagline}
              </span>
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mt-8 font-display text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.032em]
                       text-ash-100 [text-shadow:0_2px_30px_rgba(11,15,18,0.7)]
                       sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.6rem]"
          >
            {HEADLINE.map((word) => (
              <span key={word.text}>
                {word.break && <br className="hidden sm:block" />}
                <span className="inline-flex overflow-hidden pb-[0.08em] align-bottom">
                  <span
                    data-hero="word"
                    className={`inline-block ${word.accent ? 'gradient-text' : ''}`}
                  >
                    {word.text}
                  </span>
                </span>{' '}
              </span>
            ))}
          </h1>

          {/* Motto + value proposition */}
          <div className="mt-7 max-w-xl">
            <p
              data-hero="motto"
              className="font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-ember-400"
            >
              {site.motto}
            </p>
            <p
              data-hero="lead"
              className="mt-4 text-base leading-relaxed text-ash-300 sm:text-lg"
            >
              We design, build and maintain the systems businesses actually run on: web platforms,
              mobile apps, AI pipelines and automation that stay fast and stable long after launch.
            </p>
          </div>

          {/* Calls to action */}
          <div
            data-hero="cta"
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a href={startProjectHref} className="btn-primary group">
              Start a Project
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
            <a href="#work" className="btn-ghost">
              View Our Work
            </a>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 z-10 hidden flex-col items-center gap-3 lg:flex"
      >
        <span className="font-sans text-[10px] font-medium uppercase tracking-eyebrow text-ash-500">
          Scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/10">
          <span className="animate-scroll-hint absolute inset-0 block bg-gradient-to-b from-ember-400 to-ember-500" />
        </span>
      </div>
    </section>
  );
}
