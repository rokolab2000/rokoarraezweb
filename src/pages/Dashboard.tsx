import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

interface ProjectCard {
    title: string;
    description: string;
    route: string;
    type: 'creative' | 'premium' | 'standard';
    badge: string;
    num: string;
    tech: string;
}

export const Dashboard: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'creative' | 'premium' | 'standard'>('all');

    const projects: ProjectCard[] = [
        {
            title: 'Creative Portfolio',
            description: 'La experiencia inmersiva completa en React. Incluye preloader, cursor personalizado, fondo WebGL dinámico con Three.js, y animaciones de scroll con GSAP y Lenis.',
            route: '/creative',
            type: 'creative',
            badge: 'Creative (React)',
            num: '01 / 11',
            tech: 'GSAP / Lenis / Three.js'
        },
        {
            title: 'Roko Premium Edition V1',
            description: 'Variación con sistema de diseño premium, overlays con efectos de ruido personalizado (noise grid), menú flotante animado, split hero panel interactivo y tipografía Space Mono.',
            route: '/roko-portfolio-premium.html',
            type: 'premium',
            badge: 'Premium V1',
            num: '02 / 11',
            tech: 'Space Mono / Noise Grid'
        },
        {
            title: 'Roko Premium V2',
            description: 'Segunda evolución de la versión Premium. Cuenta con optimizaciones de rendimiento en los canvas de partículas, estilos alternativos de bordes interactivos y transiciones expo aceleradas.',
            route: '/roko-portfolio-premium-2.html',
            type: 'premium',
            badge: 'Premium V2',
            num: '03 / 11',
            tech: 'Particles / Glows'
        },
        {
            title: 'Roko Premium V3',
            description: 'Tercera versión Premium. Incorpora una estructura visual de grid de fondo más pronunciada, layouts fluidos con CSS clamp, y un selector interactivo para filtrar proyectos.',
            route: '/roko-portfolio-premium-3.html',
            type: 'premium',
            badge: 'Premium V3',
            num: '04 / 11',
            tech: 'Fluid Grid / Clamp'
        },
        {
            title: 'Roko Premium V4',
            description: 'La máxima iteración Premium con integración avanzada de los contratos de responsividad, ajustes finos de tipografía y visuales diseñados para altas resoluciones.',
            route: '/roko-portfolio-premium-4.html',
            type: 'premium',
            badge: 'Premium V4',
            num: '05 / 11',
            tech: 'Responsive Layout / HiDPI'
        },
        {
            title: 'Roko Standard V1',
            description: 'Diseño de portafolio minimalista estructurado, adaptado para cargas rápidas de red. Cuenta con layouts de rejilla y tipografía limpia en Space Mono.',
            route: '/roko-portfolio.html',
            type: 'standard',
            badge: 'Standard V1',
            num: '06 / 11',
            tech: 'Minimalist Grid / Mono'
        },
        {
            title: 'Roko Standard V2',
            description: 'Segunda variante estándar con pequeñas modificaciones en las animaciones de carga inicial (preloader) y ajustes en la interactividad de la lista de proyectos.',
            route: '/roko-portfolio-2.html',
            type: 'standard',
            badge: 'Standard V2',
            num: '07 / 11',
            tech: 'Preloader / Interactions'
        },
        {
            title: 'Roko Standard V3',
            description: 'Tercera variante estándar con optimizaciones en las consultas de medios (media queries) y comportamiento táctil mejorado para dispositivos móviles.',
            route: '/roko-portfolio-3.html',
            type: 'standard',
            badge: 'Standard V3',
            num: '08 / 11',
            tech: 'Mobile / Touch Support'
        },
        {
            title: 'Roko Standard V4',
            description: 'Variación con enfoque ultra-ligero y reducción de dependencias de scripts. Una versión muy optimizada a nivel de rendimiento y compatibilidad heredada.',
            route: '/roko-portfolio-4.html',
            type: 'standard',
            badge: 'Standard V4',
            num: '09 / 11',
            tech: 'Legacy / Ultra Light'
        },
        {
            title: 'Roko Standard V5',
            description: 'Quinta versión estándar. Introduce refinamientos específicos para la visualización del carrusel o listado de servicios prestados y el formulario de contacto.',
            route: '/roko-portfolio-5.html',
            type: 'standard',
            badge: 'Standard V5',
            num: '10 / 11',
            tech: 'Service Grid / Forms'
        },
        {
            title: 'Roko Standard V6',
            description: 'Última iteración de la línea estándar. Combina lo mejor de las optimizaciones ligeras con la interactividad y fluidez visual de los menús flotantes.',
            route: '/roko-portfolio-6.html',
            type: 'standard',
            badge: 'Standard V6',
            num: '11 / 11',
            tech: 'Optimized / Clean JS'
        }
    ];

    const filteredProjects = activeFilter === 'all' 
        ? projects 
        : projects.filter(p => p.type === activeFilter);

    const renderCardContent = (p: ProjectCard) => (
        <>
            <div className="card-header">
                <span className="badge">{p.badge}</span>
                <span className="screen-num">{p.num}</span>
            </div>
            <div className="card-body">
                <h2>{p.title}</h2>
                <p>{p.description}</p>
            </div>
            <div className="card-footer">
                <span className="view-link">
                    Abrir Prototipo
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </span>
                <div className="tech-tags">{p.tech}</div>
            </div>
        </>
    );

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-title">
                    <h1>ROKO</h1>
                    <p>Handoff Design & Prototype Explorer</p>
                </div>
                <div className="header-info">
                    Prototipos disponibles: <span>11 Versiones</span><br />
                    Handoff ID: <span>add971bd</span>
                </div>
            </header>

            {/* Filters */}
            <div className="filters">
                <button 
                    className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('all')}
                >
                    Todas las plantillas (11)
                </button>
                <button 
                    className={`filter-btn ${activeFilter === 'creative' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('creative')}
                >
                    Creative Portfolio (1)
                </button>
                <button 
                    className={`filter-btn ${activeFilter === 'premium' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('premium')}
                >
                    Premium Editions (4)
                </button>
                <button 
                    className={`filter-btn ${activeFilter === 'standard' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('standard')}
                >
                    Standard Editions (6)
                </button>
            </div>

            {/* Grid */}
            <div className="dashboard-grid">
                {filteredProjects.map((p, index) => {
                    if (p.type === 'creative') {
                        return (
                            <Link key={index} to={p.route} className={`card ${p.type}`}>
                                {renderCardContent(p)}
                            </Link>
                        );
                    }
                    return (
                        <a key={index} href={p.route} className={`card ${p.type}`}>
                            {renderCardContent(p)}
                        </a>
                    );
                })}
            </div>

            {/* Reference Screens section */}
            <div className="assets-section">
                <h2 className="section-title">Capturas de Pantalla de Referencia <span>(Exportes de Diseño Original)</span></h2>
                
                <div className="assets-grid">
                    <a href="/mqt1ljkv-screencapture-luisrokoarraez-base44-app-works-2026-06-25-01_08_07.png" target="_blank" rel="noreferrer" className="asset-card">
                        <div className="asset-img-container">
                            <img src="/mqt1ljkv-screencapture-luisrokoarraez-base44-app-works-2026-06-25-01_08_07.png" alt="Screencapture Luis Roko Arraez Base44 App Works" />
                        </div>
                        <div className="asset-details">
                            <h3>Captura Base 44</h3>
                            <p>Ref: Luis Roko Arraez - App Works (PNG)</p>
                        </div>
                    </a>
                    
                    <a href="/mqt1vg2l-screencapture-luisrokoarraez-base44-app-works-prism-visual-campaign-2026-06-25-01_14_38.png" target="_blank" rel="noreferrer" className="asset-card">
                        <div className="asset-img-container">
                            <img src="/mqt1vg2l-screencapture-luisrokoarraez-base44-app-works-prism-visual-campaign-2026-06-25-01_14_38.png" alt="Screencapture Luis Roko Arraez Base44 App Works Prism Visual Campaign" />
                        </div>
                        <div className="asset-details">
                            <h3>Campaña Visual Prism</h3>
                            <p>Ref: Prism Visual Campaign (PNG)</p>
                        </div>
                    </a>
                    
                    <a href="/mr2b62db-screencapture-luisrokoarraez-base44-app-works-prism-visual-campaign-2026-06-25-01_14_38.png" target="_blank" rel="noreferrer" className="asset-card">
                        <div className="asset-img-container">
                            <img src="/mr2b62db-screencapture-luisrokoarraez-base44-app-works-prism-visual-campaign-2026-06-25-01_14_38.png" alt="Screencapture Luis Roko Arraez Base44 App Works Prism Visual Campaign v2" />
                        </div>
                        <div className="asset-details">
                            <h3>Campaña Visual Prism V2</h3>
                            <p>Ref: Prism Visual Campaign Alt (PNG)</p>
                        </div>
                    </a>
                </div>
            </div>

            <footer>
                <p>Antigravity Pair-Programming Workspace &copy; 2026. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};
