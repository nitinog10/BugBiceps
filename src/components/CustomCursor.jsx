import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        let mouseX = -100, mouseY = -100;
        let cursorX = -100, cursorY = -100;
        let followerX = -100, followerY = -100;
        let isHovering = false;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onMouseEnterInteractive = () => {
            isHovering = true;
            cursor.style.transform = 'translate(-50%, -50%) scale(0)';
            follower.style.width = '50px';
            follower.style.height = '50px';
            follower.style.borderColor = 'rgba(240, 176, 32, 0.5)';
            follower.style.background = 'rgba(240, 176, 32, 0.05)';
        };

        const onMouseLeaveInteractive = () => {
            isHovering = false;
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.width = '32px';
            follower.style.height = '32px';
            follower.style.borderColor = 'rgba(240, 176, 32, 0.2)';
            follower.style.background = 'transparent';
        };

        const animate = () => {
            cursorX += (mouseX - cursorX) * 0.25;
            cursorY += (mouseY - cursorY) * 0.25;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', onMouseMove);
        animate();

        const attachListeners = () => {
            const interactiveEls = document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]');
            interactiveEls.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnterInteractive);
                el.removeEventListener('mouseleave', onMouseLeaveInteractive);
                el.addEventListener('mouseenter', onMouseEnterInteractive);
                el.addEventListener('mouseleave', onMouseLeaveInteractive);
            });
        };

        attachListeners();
        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
        };
    }, []);

    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

    return (
        <>
            <div ref={cursorRef} style={{
                position: 'fixed',
                width: '6px',
                height: '6px',
                background: '#F0B020',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 99999,
                transform: 'translate(-50%, -50%)',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }} />
            <div ref={followerRef} style={{
                position: 'fixed',
                width: '32px',
                height: '32px',
                border: '1px solid rgba(240, 176, 32, 0.2)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 99998,
                transform: 'translate(-50%, -50%)',
                transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, background 0.3s ease',
            }} />
        </>
    );
}
