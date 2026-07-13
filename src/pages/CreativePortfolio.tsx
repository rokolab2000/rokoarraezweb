import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from 'lenis';
import { ParticleBackground } from '../components/ParticleBackground';
import './CreativePortfolio.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, CustomEase);

interface Project {
    id: number;
    title: string;
    category: string;
    year: string;
    color: string;
}

export const CreativePortfolio: React.FC = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const preloaderProgressRef = useRef<HTMLDivElement>(null);
    const [progressCount, setProgressCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Hover Image Ref & Tracking
    const hoverImageRef = useRef<HTMLDivElement>(null);
    const hoverImageContentRef = useRef<HTMLDivElement>(null);
    const [hoverBg, setHoverBg] = useState('');
    const [hoverVisible, setHoverVisible] = useState(false);

    const projects: Project[] = [
        { id: 1, title: 'E-Commerce Platform', category: 'Development', year: '2024', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { id: 2, title: 'Brand Identity System', category: 'Design', year: '2024', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { id: 3, title: 'Interactive Dashboard', category: 'Development', year: '2023', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        { id: 4, title: 'Portfolio Showcase', category: 'Design & Dev', year: '2023', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
        { id: 5, title: 'Mobile Application', category: 'Development', year: '2023', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    ];

    useEffect(() => {
        // Create custom easing
        CustomEase.create("expo.out", "0.16, 1, 0.3, 1");
        CustomEase.create("expo.inOut", "0.87, 0, 0.13, 1");

        // 1. Preloader simulation
        const preloaderTl = gsap.to({ val: 0 }, {
            val: 100,
            duration: 2.2,
            ease: "power2.inOut",
            onUpdate: function() {
                const currentVal = Math.round(this.targets()[0].val);
                setProgressCount(currentVal);
                if (preloaderProgressRef.current) {
                    preloaderProgressRef.current.style.width = `${currentVal}%`;
                }
            },
            onComplete: () => {
                if (preloaderRef.current) {
                    gsap.to(preloaderRef.current, {
                        yPercent: -100,
                        duration: 1,
                        ease: "expo.inOut",
                        onComplete: () => {
                            setIsLoaded(true);
                            initScrollAnimations();
                        }
                    });
                }
            }
        });

        // 2. Lenis Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        const onScroll = () => {
            ScrollTrigger.update();
        };
        lenis.on('scroll', onScroll);

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // 3. Hover Image follows mouse loop
        let mouseX = 0, mouseY = 0;
        let imageX = 0, imageY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        let hoverFrameId: number;
        const updateHoverImagePosition = () => {
            hoverFrameId = requestAnimationFrame(updateHoverImagePosition);
            const ease = 0.1;
            imageX += (mouseX - 200 - imageX) * ease;
            imageY += (mouseY - 140 - imageY) * ease;

            if (hoverImageRef.current) {
                hoverImageRef.current.style.left = `${imageX}px`;
                hoverImageRef.current.style.top = `${imageY}px`;
            }
        };
        updateHoverImagePosition();

        // 4. Magnetic buttons handler
        const magneticElements = document.querySelectorAll('.magnetic');
        const cleanups: (() => void)[] = [];

        magneticElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const area = htmlEl.querySelector('.magnetic__area') as HTMLElement || htmlEl;

            const onMagnetMove = (e: MouseEvent) => {
                const rect = htmlEl.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distX = (e.clientX - centerX) * 0.3;
                const distY = (e.clientY - centerY) * 0.3;

                gsap.to(htmlEl, {
                    x: distX,
                    y: distY,
                    duration: 0.3,
                    ease: "power3.out"
                });
            };

            const onMagnetLeave = () => {
                gsap.to(htmlEl, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)"
                });
            };

            area.addEventListener('mousemove', onMagnetMove);
            area.addEventListener('mouseleave', onMagnetLeave);

            cleanups.push(() => {
                area.removeEventListener('mousemove', onMagnetMove);
                area.removeEventListener('mouseleave', onMagnetLeave);
            });
        });

        // 5. Scroll animations reveal
        const initScrollAnimations = () => {
            // WebGL BG Fade
            gsap.to('.webgl-bg', {
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            });

            // Hero Text reveal characters
            const chars = document.querySelectorAll('.hero__name .char');
            gsap.to(chars, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "expo.out",
                stagger: 0.03,
                delay: 0.2
            });

            // Hero subtitle
            gsap.to('.hero__subtitle', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "expo.out",
                delay: 0.8
            });

            // Hero scroll cue
            gsap.to('.hero__scroll', {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                delay: 1.2
            });

            // Header visible on scroll up
            const header = document.getElementById('header-nav');
            if (header) {
                ScrollTrigger.create({
                    start: "top -100",
                    onUpdate: (self) => {
                        if (self.direction === -1 || self.progress === 0) {
                            header.classList.add('is-visible');
                            gsap.to(header, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" });
                        } else {
                            gsap.to(header, { y: -20, opacity: 0, duration: 0.3, ease: "power3.in" });
                        }
                    }
                });
            }

            // Reveal texts trigger
            document.querySelectorAll('.reveal-text').forEach((el) => {
                const lines = el.querySelectorAll('.line');
                gsap.to(lines, {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "expo.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            });

            // Fade in elements
            document.querySelectorAll('.fade-in').forEach((el) => {
                gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });

            // Scale in elements
            document.querySelectorAll('.scale-in').forEach((el) => {
                gsap.to(el, {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            });

            // Service cards stagger
            gsap.utils.toArray('.service-card').forEach((card: any, i: number) => {
                gsap.to(card, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "expo.out",
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });

            // About image parallax scroll
            gsap.to('.about__image', {
                yPercent: -15,
                ease: "none",
                scrollTrigger: {
                    trigger: '.about',
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        };

        // Scroll back to top
        const backToTop = document.getElementById('back-to-top');
        const handleBackToTop = () => {
            lenis.scrollTo(0, { duration: 2 });
        };
        if (backToTop) {
            backToTop.addEventListener('click', handleBackToTop);
        }

        // Anchor navigation
        const anchors = document.querySelectorAll('a[href^="#"]');
        const handleAnchorClick = (e: Event) => {
            e.preventDefault();
            const anchor = e.currentTarget as HTMLAnchorElement;
            const targetId = anchor.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    lenis.scrollTo(target as HTMLElement, { offset: -100, duration: 1.5 });
                }
            }
        };
        anchors.forEach(a => a.addEventListener('click', handleAnchorClick));

        // Cleanup
        return () => {
            preloaderTl.kill();
            lenis.destroy();
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(hoverFrameId);
            cleanups.forEach(c => c());
            ScrollTrigger.getAll().forEach(t => t.kill());
            if (backToTop) {
                backToTop.removeEventListener('click', handleBackToTop);
            }
            anchors.forEach(a => a.removeEventListener('click', handleAnchorClick));
        };
    }, []);

    // Split text into characters helper
    const renderSplitCharacters = (text: string) => {
        return text.split('').map((char, index) => (
            <span key={index} className="char">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <div className={`creative-portfolio-page ${isLoaded ? 'is-loaded' : ''}`}>
            {/* Grain Overlay */}
            <div className="grain" />

            {/* WebGL Background */}
            <ParticleBackground />

            {/* Preloader */}
            <div ref={preloaderRef} className={`preloader ${isLoaded ? 'is-loaded' : ''}`}>
                <div className="preloader__counter">{progressCount}</div>
                <div className="preloader__bar">
                    <div ref={preloaderProgressRef} className="preloader__progress" />
                </div>
            </div>

            {/* Navigation Header */}
            <header className="header" id="header-nav">
                <a href="#" className="header__logo magnetic">
                    <span className="magnetic__area"></span>
                    Portfolio
                </a>
                <nav className="header__nav">
                    <a href="#about" className="header__link magnetic" data-cursor="hover">
                        <span className="magnetic__area"></span>
                        About
                    </a>
                    <a href="#projects" className="header__link magnetic" data-cursor="hover">
                        <span className="magnetic__area"></span>
                        Work
                    </a>
                    <a href="#contact" className="header__link magnetic" data-cursor="hover">
                        <span className="magnetic__area"></span>
                        Contact
                    </a>
                </nav>
            </header>

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <section className="hero" id="hero">
                    <div className="hero__content">
                        <div className="hero__title">
                            <h1 className="hero__name">
                                <span className="line">{renderSplitCharacters("Creative")}</span>
                                <span className="line">{renderSplitCharacters("Developer")}</span>
                            </h1>
                        </div>
                        <div className="hero__subtitle">
                            <div className="hero__line"></div>
                            <span className="hero__role">Design & Development</span>
                            <span className="hero__role">Based in Global</span>
                        </div>
                    </div>
                    <div className="hero__scroll">
                        <div className="hero__scroll-line"></div>
                        <span className="hero__scroll-text">Scroll</span>
                    </div>
                </section>

                {/* About Section */}
                <section className="about" id="about">
                    <div className="about__grid">
                        <div className="about__content">
                            <div className="about__label fade-in">About Me</div>
                            <h2 className="about__heading reveal-text">
                                <span className="line">Crafting digital</span>
                                <span className="line">experiences with</span>
                                <span className="line">precision & care</span>
                            </h2>
                            <div className="about__text fade-in">
                                <p>I'm a creative developer focused on creating immersive digital experiences that blend design aesthetics with technical innovation.</p>
                                <p>With expertise in modern web technologies, I bring ideas to life through clean code, thoughtful animation, and pixel-perfect attention to detail.</p>
                            </div>
                            <div className="about__skills fade-in">
                                <span className="skill-tag" data-cursor="hover">React</span>
                                <span className="skill-tag" data-cursor="hover">Next.js</span>
                                <span className="skill-tag" data-cursor="hover">TypeScript</span>
                                <span className="skill-tag" data-cursor="hover">GSAP</span>
                                <span className="skill-tag" data-cursor="hover">Three.js</span>
                                <span className="skill-tag" data-cursor="hover">WebGL</span>
                                <span className="skill-tag" data-cursor="hover">Framer Motion</span>
                                <span className="skill-tag" data-cursor="hover">Tailwind</span>
                            </div>
                        </div>
                        <div className="about__image scale-in" data-cursor="hover">
                            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
                                </svg>
                            </div>
                            <div className="about__image-overlay"></div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="projects" id="projects">
                    <div className="projects__header">
                        <h2 className="projects__title reveal-text">
                            <span className="line">Selected</span>
                            <span className="line">Work</span>
                        </h2>
                        <span className="projects__count fade-in">(01 — 05)</span>
                    </div>
                    <div className="projects__list">
                        {projects.map((p) => (
                            <article 
                                key={p.id}
                                className="project-item" 
                                data-cursor="view"
                                onMouseEnter={() => {
                                    setHoverBg(p.color);
                                    setHoverVisible(true);
                                }}
                                onMouseLeave={() => {
                                    setHoverVisible(false);
                                }}
                            >
                                <h3 className="project-item__title">{p.title}</h3>
                                <span className="project-item__category">{p.category}</span>
                                <span className="project-item__year">{p.year}</span>
                            </article>
                        ))}
                    </div>

                    {/* Hover Image Container */}
                    <div 
                        ref={hoverImageRef} 
                        className={`project-hover-image ${hoverVisible ? 'is-visible' : ''}`}
                    >
                        <div 
                            ref={hoverImageContentRef} 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                background: hoverBg 
                            }} 
                        />
                    </div>
                </section>

                {/* Services Section */}
                <section className="services" id="services">
                    <div className="services__grid">
                        <div className="service-card fade-in" data-cursor="hover">
                            <span className="service-card__number">01</span>
                            <h3 className="service-card__title">Web Development</h3>
                            <p className="service-card__description">Building performant, accessible websites and web applications with modern technologies and best practices.</p>
                        </div>
                        <div className="service-card fade-in" data-cursor="hover">
                            <span className="service-card__number">02</span>
                            <h3 className="service-card__title">Creative Direction</h3>
                            <p className="service-card__description">Guiding visual identity and user experience from concept to execution with a focus on innovation.</p>
                        </div>
                        <div className="service-card fade-in" data-cursor="hover">
                            <span className="service-card__number">03</span>
                            <h3 className="service-card__title">Motion Design</h3>
                            <p className="service-card__description">Crafting meaningful animations and interactions that enhance user engagement and brand storytelling.</p>
                        </div>
                    </div>
                </section>

                {/* Marquee Section */}
                <div className="marquee">
                    <div className="marquee__track">
                        <span className="marquee__item">Available for Projects</span>
                        <span className="marquee__divider">✦</span>
                        <span className="marquee__item">Let's Collaborate</span>
                        <span className="marquee__divider">✦</span>
                        <span className="marquee__item">Creative Development</span>
                        <span className="marquee__divider">✦</span>
                        <span className="marquee__item">Available for Projects</span>
                        <span className="marquee__divider">✦</span>
                        <span className="marquee__item">Let's Collaborate</span>
                        <span className="marquee__divider">✦</span>
                        <span className="marquee__item">Creative Development</span>
                        <span className="marquee__divider">✦</span>
                    </div>
                </div>

                {/* Contact Section */}
                <section className="contact" id="contact">
                    <div className="contact__content">
                        <div className="contact__label fade-in">Get in Touch</div>
                        <h2 className="contact__title reveal-text">
                            <span className="line">Let's work</span>
                            <span className="line">together</span>
                        </h2>
                        <a href="mailto:hello@example.com" className="contact__email fade-in" data-cursor="hover">
                            hello@example.com
                        </a>
                        <div className="contact__social fade-in">
                            <a href="#" className="social-link magnetic" data-cursor="hover">
                                <span className="magnetic__area"></span>
                                <span>Twitter</span>
                            </a>
                            <a href="#" className="social-link magnetic" data-cursor="hover">
                                <span className="magnetic__area"></span>
                                <span>LinkedIn</span>
                            </a>
                            <a href="#" className="social-link magnetic" data-cursor="hover">
                                <span className="magnetic__area"></span>
                                <span>GitHub</span>
                            </a>
                            <a href="#" className="social-link magnetic" data-cursor="hover">
                                <span className="magnetic__area"></span>
                                <span>Dribbble</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer__left">
                    © 2024 — All rights reserved
                </div>
                <div className="footer__right">
                    <button className="footer__back-top" id="back-to-top" data-cursor="hover">
                        Back to top
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                    </button>
                </div>
            </footer>
        </div>
    );
};
