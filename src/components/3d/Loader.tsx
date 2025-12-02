// src/components/3d/Loader.tsx
import React, { useRef } from 'react';
import { useProgress } from '@react-three/drei';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader: React.FC = () => {
  const { active, progress, item } = useProgress();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (!active || !containerRef.current) return;

    // Entrance animation
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power4.out' }
    );

    // Progress bar animation
    gsap.to(progressBarRef.current, {
      width: `${progress}%`,
      duration: 0.3,
      ease: 'power4.out'
    });

    // Progress text counter
    gsap.to(progressTextRef.current, {
      innerHTML: Math.round(progress),
      duration: 0.3,
      ease: 'power4.out',
      snap: { innerHTML: 1 },
      onUpdate: function() {
        if (progressTextRef.current) {
          progressTextRef.current.innerHTML = `${Math.round(progress)}%`;
        }
      }
    });

    // Floating particles animation
    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        y: gsap.utils.random(-20, 20),
        x: gsap.utils.random(-20, 20),
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: i * 0.1
      });
    });

    // Exit animation when complete
    if (progress === 100) {
      const tl = gsap.timeline();
      
      tl.to(progressBarRef.current, {
        opacity: 0,
        scale: 1.2,
        duration: 0.5,
        ease: 'power4.in'
      })
      .to(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        ease: 'power4.in',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        }
      }, '-=0.3');
    }
  }, [active, progress]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-(--z-tooltip) flex items-center justify-center bg-void-950"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={el => { particlesRef.current[i] = el!; }}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full opacity-30"
            style={{
              left: `${gsap.utils.random(10, 90)}%`,
              top: `${gsap.utils.random(10, 90)}%`
            }}
          />
        ))}
      </div>

      {/* Loader content */}
      <div className="relative text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold holographic">BAPETCO</h1>
          <p className="text-gray-400 text-sm mt-2">Powering Egypt's Energy Future</p>
        </div>

        {/* Progress bar container */}
        <div className="w-64 h-1 bg-void-800 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-linear-to-r from-neon-cyan to-neon-gold rounded-full"
            style={{ width: '0%' }}
          />
        </div>

        {/* Progress text */}
        <div
          ref={progressTextRef}
          className="mt-4 text-2xl font-bold text-egyptian-gold-500"
        >
          0%
        </div>

        {/* Loading item */}
        {item && (
          <p className="mt-2 text-xs text-gray-500">
            Loading: {item}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;