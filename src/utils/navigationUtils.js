```javascript
import { gsap } from 'gsap';
import { getElementPosition } from '../shared/domUtils';

export function handleSmoothScroll(event, targetSelector) {
  if (!targetSelector || typeof document === 'undefined') return;
  event?.preventDefault?.();

  const target = document.querySelector(targetSelector);
  if (!target) return;

  const targetY = getElementPosition(target).top;

  gsap.to(window, {
    duration: 1,
    scrollTo: { y: targetY, autoKill: true },
    ease: 'power3.out',
  });
}

export function getElementPosition(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
}
```