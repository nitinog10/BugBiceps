```jsx
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, MotionTag } from '../utils/motion';

/**
 * Scroll-triggered fade + rise. Collapses to a plain fade when the visitor
 * has asked for reduced motion.
 */
export default function Reveal({ children, delay = 0, y = 16, className = '', as = 'div' }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionTag
      as={as}
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px 0px -80px 0px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
```

```js
// File: src/utils/motion.js

export const EASE = [0.22, 1, 0.36, 1];

export const MotionTag = ({ as = 'div',...props }) => {
  const Tag = motion[as]?? motion.div;
  return <Tag {...props} />;
};
```