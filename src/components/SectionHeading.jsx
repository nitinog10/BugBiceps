import Reveal from './Reveal.jsx';

/**
 * Shared section header: mono eyebrow ("01 — SERVICES"), display heading and
 * an optional lead paragraph. Keeps vertical rhythm identical across sections.
 */
export default function SectionHeading({ index, eyebrow, title, lead, align = 'left' }) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal>
        <p className="eyebrow">
          {index} <span className="mx-1 text-ash-500">—</span> {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.07}>
        <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-[-0.025em] sm:text-4xl lg:text-[2.85rem]">
          {title}
        </h2>
      </Reveal>

      {lead && (
        <Reveal delay={0.14}>
          <p className="mt-5 text-base leading-relaxed text-ash-300 sm:text-[17px]">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
