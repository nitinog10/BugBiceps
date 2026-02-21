import { useRef } from 'react';

export default function MagneticButton({ children, style = {}, onClick, className = '' }) {
    const btnRef = useRef(null);

    const handleMouseMove = (e) => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = () => {
        if (btnRef.current) {
            btnRef.current.style.transform = 'translate(0, 0)';
        }
    };

    return (
        <button
            ref={btnRef}
            className={className}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
                ...style,
            }}
        >
            {children}
        </button>
    );
}
