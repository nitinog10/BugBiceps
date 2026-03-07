import { useEffect, useRef } from 'react';
import { useMousePosition, useInteractiveListeners } from '../utils/cursorUtils';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        const { mouseX, mouseY } = useMousePosition();
        let cursorX = -100, cursorY = -100;
        let followerX = -100, followerY = -100;

        const animate = () => {
            cursorX += (mouseX.current - cursorX) * 0.25;
            cursorY += (mouseY.current - cursorY) * 0.25;
            followerX += (mouseX.current - followerX) * 0.1;
            followerY += (mouseY.current - followerY) * 0.1;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;

            requestAnimationFrame(animate);
        };

        animate();

        const { attachListeners, observer } = useInteractiveListeners(cursor, follower);

        attachListeners();

        return () => {
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