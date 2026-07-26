import { services } from '../data/services.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <article
      className="surface group flex h-full gap-4 p-4 transition-all duration-300
                 hover:-translate-y-0.5 hover:border-ember-400/25 hover:shadow-glow sm:gap-6 sm:p-5"
    >
      {/* Uniform portrait frame for every service, matched to the footage's own
          2:3 shape. object-contain means the full frame is always visible — the
          clips are 9:16 and 2:3, so cropping them to landscape would cut away
          most of the picture. */}
      <div
        className="relative w-[124px] shrink-0 self-start overflow-hidden rounded-xl
                   bg-ink-900 ring-1 ring-white/[0.07] sm:w-[152px] lg:w-[168px]"
      >
        <div className="aspect-[2/3] w-full">
          <video
            src={service.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${service.title} showreel`}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Seats the footage in its frame rather than letting it float. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.06]"
        />
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col py-1">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08]
                     bg-ink-800 text-ember-400 transition-colors duration-300 group-hover:border-ember-400/30"
        >
          <Icon size={18} aria-hidden="true" />
        </span>

        <h3
          className="mt-4 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em]
                     text-ash-100 sm:text-lg"
        >
          {service.title}
        </h3>

        <p className="mt-2.5 text-[13.5px] leading-relaxed text-ash-300 sm:text-sm">
          {service.description}
        </p>

        {/* Stack shown as brand marks rather than names. */}
        <ul className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {service.stack.map(({ name, Icon }) => (
            <li key={name}>
              <span
                title={name}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07]
                           bg-white/[0.035] text-ash-300 transition-colors duration-300
                           group-hover:border-white/[0.12] group-hover:text-ash-100"
              >
                <Icon size={15} aria-hidden="true" />
                <span className="sr-only">{name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-28 lg:py-32">
      {/* Hairline divider between sections. */}
      <div aria-hidden="true" className="hairline-top absolute inset-x-0 top-0 h-px" />

      <div className="container-page">
        <SectionHeading
          index="01"
          eyebrow="Services"
          title="Six disciplines, one engineering standard"
          lead="From the first architectural decision to the last performance budget, every engagement is delivered by the same team against the same bar."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 2) * 0.08} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
