// src/App.tsx
import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Operations from './components/sections/Operations';
import Sustainability from './components/sections/Sustainability';
import Media from './components/sections/Media';
import Contact from './components/sections/Contact';
import Scene from './components/3d/Scene';
import Loader from './components/3d/Loader';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Configure GSAP for premium performance
gsap.config({
  autoSleep: 60,
  force3D: true,
  nullTargetWarn: false,
});

// Set default ease for all animations
gsap.defaults({
  ease: 'expo.out',
  duration: 1.2,
});

function App() {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set initial direction
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    
    // Premium scroll setup
    ScrollTrigger.defaults({
      toggleActions: 'play pause resume reverse',
      markers: false,
    });

    // Loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Trigger entrance animations
      gsap.fromTo('body',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'expo.out' }
      );
    }, 2000);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [i18n.language]);

  // Smooth scroll behavior
  useGSAP(() => {
    // Add smooth scroll with GSAP
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onUpdate: (_self) => {
        // Optional: Add parallax effects or other scroll-based animations
      },
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Loading Screen */}
      {isLoading && <Loader />}

      {/* 3D Canvas Background */}
      <div className="canvas-container">
        <Canvas
          camera={{ 
            position: [0, 0, 5], 
            fov: 60,
            near: 0.1,
            far: 1000
          }}
          dpr={[1, 2]}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
          }}
        >
          <Suspense fallback={null}>
            <Scene />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="ui-overlay">
        <Navbar />
        
        {/* Main Content */}
        <main className="relative">
          <Hero />
          <About />
          <Operations />
          <Sustainability />
          <Media />
          <Contact />
        </main>
        
        <Footer />
      </div>

      {/* Premium Cursor Effect (Optional) */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <div 
          className="cursor-glow absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
            filter: 'blur(10px)',
            mixBlendMode: 'screen'
          }}
        />
      </div>
    </div>
  );
}

export default App;