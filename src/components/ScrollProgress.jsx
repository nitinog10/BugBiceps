import { useEffect, useState } from 'react';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            zIndex: 9998,
            background: 'transparent',
        }}>
            <div style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #E83030, #F0B020, #F06020)',
                transition: 'width 0.08s linear',
                boxShadow: '0 0 12px rgba(240, 176, 32, 0.4)',
            }} />
        </div>
    );
}
