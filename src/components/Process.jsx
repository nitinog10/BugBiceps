import { processSteps } from '../data/process.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';

export default function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 py-24 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="hairline-top absolute inset-x-0 top-0 h-px" />

      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow="Process"
          title="How an engagement runs"
          lead="Four stages, no surprises. You always know what is being built, why, and what ships next."
        />

        <ol className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.08}>
              <li className="group relative pt-6">
                {/* Track: amber leader segment fading into a hairline. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-white/[0.09]"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-px w-10 bg-ember transition-all duration-500 group-hover:w-20"
                />

                <p className="font-sans font-medium text-[11px] tracking-eyebrow text-ember-400">{item.step}</p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ash-100">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash-300">{item.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
