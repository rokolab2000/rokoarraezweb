import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorInnerRef = useRef<HTMLDivElement>(null);
    const [cursorText, setCursorText] = useState('');

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Add class to body to hide default cursor on desktop
        document.body.classList.add('has-custom-cursor');

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('mousemove', onMouseMove);

        // GSAP smooth lerping ticker
        const tickerFunc = () => {
            const dt = 1.0 - Math.pow(0.1, gsap.ticker.deltaRatio() / 10);
            cursorX += (mouseX - cursorX) * dt;
            cursorY += (mouseY - cursorY) * dt;

            gsap.set(cursor, {
                x: cursorX - cursor.offsetWidth / 2,
                y: cursorY - cursor.offsetHeight / 2
            });
        };

        gsap.ticker.add(tickerFunc);

        // Hover events delegation
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactiveEl = target.closest('a, button, [data-hover], [data-view]');
            
            if (!interactiveEl) {
                cursor.classList.remove('is-hover', 'is-view');
                setCursorText('');
                return;
            }

            if (interactiveEl.hasAttribute('data-view')) {
                cursor.classList.add('is-view');
                const text = interactiveEl.getAttribute('data-view') || 'VIEW';
                setCursorText(text);
            } else {
                cursor.classList.add('is-hover');
            }
        };

        const onMouseOut = () => {
            cursor.classList.remove('is-hover', 'is-view');
            setCursorText('');
        };

        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        return () => {
            document.body.classList.remove('has-custom-cursor');
            window.removeEventListener('mousemove', onMouseMove);
            gsap.ticker.remove(tickerFunc);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
        };
    }, []);

    return (
        <div ref={cursorRef} className="cursor">
            <div ref={cursorInnerRef} className="cursor__inner">
                <span className="cursor__text">{cursorText}</span>
            </div>
        </div>
    );
};
