import { ArrowRight } from 'lucide-react';
import { startProjectHref } from '../data/site.js';
import { services } from '../data/services.js';
import Reveal from './Reveal.jsx';

/**
 * Availability band. Copy sits outside the frame on the left; the studio reel
 * plays inside the box on the right. The clip is natively 736x414, so a 16:9
 * frame shows it complete with nothing cropped.
 */
export default function CTABand() {
  return (
    <section className="relative py-20 sm:py-24">
      {/* Ember bloom tying the band into the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(70% 55% at 72% 50%, rgba(242,106,33,0.16) 0%, rgba(245,184,28,0.05) 45%, transparent 78%)',
        }}
      />

      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy — outside the box */}
          <Reveal>
            <div>
              <span
                className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.12]
                           bg-ink-800/70 px-4 py-1.5 backdrop-blur-md"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-400" />
                </span>
                <span className="font-sans text-[10.5px] font-medium uppercase tracking-eyebrow text-ash-300">
                  Now onboarding
                </span>
              </span>

              <h2 className="mt-6 text-3xl font-semibold leading-[1.12] tracking-[-0.025em] sm:text-4xl lg:text-[2.7rem]">
                Open for clients <span className="gradient-text">along side globe</span>
              </h2>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-ash-300">
                We work with founders and teams across time zones — remote by default, delivered on
                your schedule. Web platforms, mobile apps, AI systems, automation, search visibility
                and 3D visual work, all handled in-house by the same engineers.
              </p>

              {/* A quick read of what we cover. */}
              <ul className="mt-7 flex flex-wrap gap-2">
                {services.map((service) => (
                  <li key={service.id} className="chip">
                    {service.title}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={startProjectHref} className="btn-primary group">
                  Start a Project
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </a>
                <a href="#contact" className="btn-ghost">
                  See Contact Details
                </a>
              </div>
            </div>
          </Reveal>

          {/* Reel — inside the box */}
          <Reveal delay={0.12}>
            <div
              className="overflow-hidden rounded-2xl border border-white/[0.10] bg-ink-800 p-1.5
                         shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)] sm:p-2"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink-900">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="BugBiceps studio reel"
                  className="h-full w-full object-cover"
                >
                  <source src="/hero-bg.mp4" type="video/mp4" />
                </video>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.07]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
