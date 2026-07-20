```javascript
import { useEffect, useRef } from'react';
import { getInteractiveTargets } from './domUtils';

export function useMousePosition() {
  const mouseX = useRef(-100);
  const mouseY = useRef(-100);

  useEffect(() => {
    const handleMove = (event) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return { mouseX, mouseY };
}

export function useInteractiveListeners(cursor, follower) {
  const observer = useRef(null);

  const attachListeners = () => {
    const targets = getInteractiveTargets();

    targets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
  };

  const detachListeners = () => {
    const targets = getInteractiveTargets();

    targets.forEach((el) => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    });
  };

  const onEnter = () => {
    if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
    if (follower) follower.style.transform = 'translate(-50%, -50%) scale(2)';
  };

  const onLeave = () => {
    if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    if (follower) follower.style.transform = 'translate(-50%, -50%) scale(1)';
  };

  useEffect(() => {
    observer.current = new MutationObserver(() => {
      detachListeners();
      attachListeners();
    });

    observer.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return { attachListeners };
}
```

```javascript
// File: src/utils/domUtils.js

export function getInteractiveTargets() {
  return document.querySelectorAll('a, button, .cursor-pointer');
}
```