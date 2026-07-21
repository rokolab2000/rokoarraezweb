import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = React.memo(() => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorTextRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorTextEl = cursorTextRef.current;
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

        // Hover events delegation (Direct DOM mutation to prevent React re-renders)
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactiveEl = target.closest('a, button, [data-hover], [data-view]');
            
            if (!interactiveEl) {
                cursor.classList.remove('is-hover', 'is-view');
                if (cursorTextEl) cursorTextEl.textContent = '';
                return;
            }

            if (interactiveEl.hasAttribute('data-view')) {
                cursor.classList.add('is-view');
                const text = interactiveEl.getAttribute('data-view') || 'VIEW';
                if (cursorTextEl) cursorTextEl.textContent = text;
            } else {
                cursor.classList.add('is-hover');
            }
        };

        const onMouseOut = () => {
            cursor.classList.remove('is-hover', 'is-view');
            if (cursorTextEl) cursorTextEl.textContent = '';
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
            <div className="cursor__inner">
                <span ref={cursorTextRef} className="cursor__text"></span>
            </div>
        </div>
    );
});

