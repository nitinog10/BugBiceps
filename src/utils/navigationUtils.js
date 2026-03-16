import { gsap } from 'gsap';

export function handleSmoothScroll(event, targetSelector) {
  if (!targetSelector || typeof document === 'undefined') return;
  event?.preventDefault?.();

  const target = document.querySelector(targetSelector);
  if (!target) return;

  const targetY = target.getBoundingClientRect().top + window.scrollY;

  gsap.to(window, {
    duration: 1,
    scrollTo: { y: targetY, autoKill: true },
    ease: 'power3.out',
  });
}