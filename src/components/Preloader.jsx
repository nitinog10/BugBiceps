import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * First-load curtain. Counts up while the page settles, then lifts away and
 * hands off to the hero, which starts its own entrance on `onDone`.
 */
export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Nothing should scroll behind the curtain.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.body.style.overflow = prevOverflow;
      setGone(true);
      onDone?.();
    };

    if (reduce) {
      setCount(100);
      finish();
      return undefined;
    }

    let timeline;

    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish });
      timeline = tl;

      tl.from('[data-pre="mark"]', { scale: 0.82, opacity: 0, duration: 0.7, ease: 'power2.out' })
        .from('[data-pre="name"]', { y: 14, opacity: 0, duration: 0.5 }, '-=0.35')
        .from('[data-pre="tag"]', { y: 10, opacity: 0, duration: 0.5 }, '-=0.3')
        .to(
          counter,
          {
            value: 100,
            duration: 1.5,
            ease: 'power1.inOut',
            onUpdate: () => setCount(Math.round(counter.value)),
          },
          '-=0.5'
        )
        .to('[data-pre="bar"]', { scaleX: 1, duration: 1.5, ease: 'power1.inOut' }, '<')
        .to('[data-pre="inner"]', { y: -24, opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.15')
        .to(
          '[data-pre="curtain"]',
          { yPercent: -100, duration: 0.9, ease: 'power4.inOut' },
          '-=0.15'
        );
    }, rootRef);

    // Background tabs throttle requestAnimationFrame, which stalls the timeline
    // and would otherwise leave the site trapped behind the curtain. Jump to the
    // end if we are still here well past the intended runtime.
    const failSafe = setTimeout(() => {
      if (timeline) timeline.progress(1);
      finish();
    }, 5000);

    return () => {
      clearTimeout(failSafe);
      document.body.style.overflow = prevOverflow;
      ctx.revert();
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]" aria-hidden="true">
      <div data-pre="curtain" className="absolute inset-0 flex items-center justify-center bg-ink-900">
        {/* Ember bloom so the curtain is not a flat black rectangle. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 45% at 50% 45%, rgba(242,106,33,0.14) 0%, rgba(245,184,28,0.05) 45%, transparent 75%)',
          }}
        />

        <div data-pre="inner" className="relative flex w-full max-w-xs flex-col items-center px-6">
          <span data-pre="mark" className="logo-chip h-20 w-20">
            <img
              src="/logo.png"
              alt=""
              width="80"
              height="80"
              className="h-full w-full object-contain"
            />
          </span>

          <span
            data-pre="name"
            className="mt-6 font-display text-2xl font-bold tracking-tight"
          >
            <span className="text-flag">Bug</span>
            <span className="text-ember-400">Biceps</span>
          </span>

          <span
            data-pre="tag"
            className="mt-2.5 text-center font-sans text-[10.5px] font-medium uppercase tracking-eyebrow text-ash-500"
          >
            Engineering Digital Systems That Scale
          </span>

          {/* Progress */}
          <div className="mt-8 h-px w-full overflow-hidden bg-white/10">
            <div
              data-pre="bar"
              className="h-full w-full origin-left scale-x-0 bg-ember"
            />
          </div>

          <span className="mt-3 self-end font-sans text-[11px] font-medium tabular-nums text-ash-500">
            {String(count).padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
