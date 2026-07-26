import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects.js';
import { startProjectHref } from '../data/site.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';

const domainOf = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/**
 * One project as an index row: number, identity, summary, stack. Rows read as a
 * catalogue rather than a second card grid, which keeps this section visually
 * distinct from Services directly above it.
 */
function ProjectRow({ project, index }) {
  const isLive = Boolean(project.url);

  const inner = (
    <div
      className="grid grid-cols-1 items-baseline gap-x-6 gap-y-3
                 lg:grid-cols-12 lg:gap-y-0"
    >
      {/* Index */}
      <div className="lg:col-span-1">
        <span
          className="font-sans font-medium text-[11px] tabular-nums tracking-eyebrow text-ash-500
                     transition-colors duration-300 group-hover:text-ember-400"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Identity */}
      <div className="lg:col-span-3">
        <h3
          className="font-display text-xl font-semibold tracking-[-0.02em] text-ash-100
                     transition-colors duration-300 group-hover:text-ember-400 sm:text-[1.35rem]"
        >
          {project.name}
        </h3>
        <p className="mt-1.5 font-sans font-medium text-[10.5px] uppercase tracking-eyebrow text-ash-500">
          {project.category}
        </p>
      </div>

      {/* Summary */}
      <div className="lg:col-span-5">
        <p className="max-w-xl text-[15px] leading-relaxed text-ash-300">{project.description}</p>
      </div>

      {/* Destination */}
      <div className="lg:col-span-3">
        <div className="flex items-center gap-1.5 lg:justify-end">
          {isLive ? (
            <>
              <span
                className="font-sans font-medium text-[10.5px] text-ash-500 transition-colors duration-300
                           group-hover:text-ash-300"
              >
                {domainOf(project.url)}
              </span>
              <ArrowUpRight
                size={13}
                className="shrink-0 text-ash-500 transition-all duration-300
                           group-hover:-translate-y-0.5 group-hover:translate-x-0.5
                           group-hover:text-ember-400"
              />
            </>
          ) : (
            <span className="font-sans font-medium text-[10.5px] uppercase tracking-eyebrow text-ash-500">
              In-house build
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const className =
    'group relative block rounded-xl px-4 py-7 transition-colors duration-300 hover:bg-white/[0.025] sm:px-5 lg:py-8';

  return isLive ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

export default function Work() {
  const liveCount = projects.filter((p) => p.url).length;

  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-28 lg:py-32">
      {/* Hairline divider between sections. */}
      <div aria-hidden="true" className="hairline-top absolute inset-x-0 top-0 h-px" />

      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            eyebrow="Selected Work"
            title="Products shipped and running in production"
            lead="Commerce platforms, learning systems, AI tooling and forecasting engines — built end to end, then maintained as they grow."
          />

          <Reveal delay={0.14}>
            <div className="flex shrink-0 gap-10 lg:pb-2">
              <div>
                <p className="font-display text-3xl font-semibold tracking-tight text-ash-100">
                  {projects.length}
                </p>
                <p className="mt-1 font-sans font-medium text-[10.5px] uppercase tracking-eyebrow text-ash-500">
                  Projects
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold tracking-tight text-ash-100">
                  {liveCount}
                </p>
                <p className="mt-1 font-sans font-medium text-[10.5px] uppercase tracking-eyebrow text-ash-500">
                  Live sites
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Index */}
        <div className="mt-14 sm:mt-16">
          <div
            aria-hidden="true"
            className="hidden border-b border-white/[0.07] px-4 pb-3 font-sans font-medium text-[10px]
                       uppercase tracking-eyebrow text-ash-500 sm:px-5 lg:grid lg:grid-cols-12 lg:gap-x-6"
          >
            <span className="lg:col-span-1">No.</span>
            <span className="lg:col-span-3">Project</span>
            <span className="lg:col-span-5">Scope</span>
            <span className="text-right lg:col-span-3">Live</span>
          </div>

          <ul className="-mx-4 divide-y divide-white/[0.07] sm:-mx-5">
            {projects.map((project, i) => (
              <li key={project.name}>
                <Reveal delay={Math.min(i, 4) * 0.05}>
                  <ProjectRow project={project} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <div
            className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-white/[0.08]
                       bg-ink-700/60 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
          >
            <p className="text-[15px] leading-relaxed text-ash-300">
              Have a product that needs building — or one that needs rescuing?
            </p>
            <a href={startProjectHref} className="btn-primary shrink-0 group">
              Start a Project
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
