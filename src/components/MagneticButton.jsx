import { useRef } from 'react';

export default function MagneticButton({ children, style = {}, onClick, className = '', id }) {
    const btnRef = useRef(null);

    const handleMouseMove = (e) => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    };

    const handleMouseLeave = () => {
        if (btnRef.current) {
            btnRef.current.style.transform = 'translate(0, 0)';
        }
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
