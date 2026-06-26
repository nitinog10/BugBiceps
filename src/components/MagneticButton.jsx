```
import { useRef } from'react';
import { applyTransform } from '../utils/transformUtils';

export default function MagneticButton({ children, style = {}, onClick, className = '', id }) {
    const btnRef = useRef(null);

    const handleMouseMove = (e) => {
        applyTransform(btnRef, e, 0.25);
    };

    const handleMouseLeave = () => {
        applyTransform(btnRef, null, 0);
    };

    return (
        <button
            ref={btnRef}
            id={id}
            className={className}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                willChange: 'transform',
                ...style,
            }}
        >
            {children}
        </button>
    );
}
```