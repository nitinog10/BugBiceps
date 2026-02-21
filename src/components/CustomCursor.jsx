import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onMouseEnterInteractive = () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursor.style.background = 'rgba(232, 168, 32, 0.1)';
            cursor.style.border = '1px solid rgba(232, 168, 32, 0.5)';
            follower.style.opacity = '0';
        };

        const onMouseLeaveInteractive = () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'rgba(232, 168, 32, 0.8)';
            cursor.style.border = 'none';
            follower.style.opacity = '1';
        };

        const animate = () => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.08;
            followerY += (mouseY - followerY) * 0.08;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', onMouseMove);
        animate();

        const interactiveEls = document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', onMouseEnterInteractive);
            el.addEventListener('mouseleave', onMouseLeaveInteractive);
        });

        // Re-attach on DOM changes
        const observer = new MutationObserver(() => {
            const newEls = document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]');
            newEls.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnterInteractive);
                el.removeEventListener('mouseleave', onMouseLeaveInteractive);
                el.addEventListener('mouseenter', onMouseEnterInteractive);
                el.addEventListener('mouseleave', onMouseLeaveInteractive);
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
        };
    }, []);

    // Hide on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

    return (
        <>
            <div ref={cursorRef} style={{
                position: 'fixed',
                width: '10px',
                height: '10px',
                background: 'rgba(232, 168, 32, 0.8)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 99999,
                transform: 'translate(-50%, -50%)',
                transition: 'transform 0.2s ease, background 0.2s ease, border 0.2s ease',
                mixBlendMode: 'difference',
            }} />
            <div ref={followerRef} style={{
                position: 'fixed',
                width: '35px',
                height: '35px',
                border: '1px solid rgba(232, 168, 32, 0.3)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 99998,
                transform: 'translate(-50%, -50%)',
            }} />
        </>
    );
}
