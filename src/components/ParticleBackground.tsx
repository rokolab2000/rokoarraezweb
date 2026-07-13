import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ParticleBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Clear any previous canvas
        container.innerHTML = '';

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Create gradient mesh
        const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) }
            },
            vertexShader: `
                varying vec2 vUv;
                uniform float uTime;
                
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    pos.z += sin(pos.x * 2.0 + uTime * 0.5) * 0.1;
                    pos.z += sin(pos.y * 3.0 + uTime * 0.3) * 0.1;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec2 uMouse;
                varying vec2 vUv;
                
                void main() {
                    vec2 uv = vUv;
                    
                    // Create subtle gradient
                    float gradient = smoothstep(0.0, 1.0, uv.y);
                    
                    // Add noise-like movement
                    float noise = sin(uv.x * 10.0 + uTime * 0.2) * sin(uv.y * 10.0 + uTime * 0.3) * 0.02;
                    
                    // Mouse influence
                    float dist = distance(uv, uMouse);
                    float mouseInfluence = smoothstep(0.5, 0.0, dist) * 0.03;
                    
                    // Final color
                    vec3 color1 = vec3(0.02, 0.02, 0.02);
                    vec3 color2 = vec3(0.05, 0.05, 0.08);
                    vec3 color = mix(color1, color2, gradient + noise + mouseInfluence);
                    
                    gl_FragColor = vec4(color, 1.0);
                }
            `,
            transparent: true
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        camera.position.z = 3;

        // Mouse tracking for WebGL
        let targetMouseX = 0.5;
        let targetMouseY = 0.5;

        const onMouseMove = (e: MouseEvent) => {
            targetMouseX = e.clientX / window.innerWidth;
            targetMouseY = 1.0 - (e.clientY / window.innerHeight);
        };

        window.addEventListener('mousemove', onMouseMove);

        let animationFrameId: number;

        // Animation loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            material.uniforms.uTime.value += 0.01;

            // Smooth mouse following
            material.uniforms.uMouse.value.x += (targetMouseX - material.uniforms.uMouse.value.x) * 0.05;
            material.uniforms.uMouse.value.y += (targetMouseY - material.uniforms.uMouse.value.y) * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animationFrameId);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} className="webgl-bg" style={{ position: 'fixed', inset: 0, zIndex: -1 }} />;
};
