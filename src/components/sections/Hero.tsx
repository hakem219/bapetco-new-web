// src/components/sections/Hero.tsx
import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import LanguageFontWrapper from '../LanguageFontWrapper';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  const stats = [
    { number: '40', suffix: '+', label: t('hero.stats.years') },
    { number: '150', suffix: 'K+', label: t('hero.stats.barrels') },
    { number: '1200', suffix: '+', label: t('hero.stats.employees') },
    { number: '99.8', suffix: '%', label: t('hero.stats.safety') },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' }
    });

    // Background animation
    tl.fromTo(bgRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2 }
    )
    // Title animation with split text effect
    .fromTo(titleRef.current?.querySelectorAll('.title-word') || [],
      { 
        y: 120, 
        opacity: 0,
        rotateX: -90
      },
      { 
        y: 0, 
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.1
      },
      '-=1.5'
    )
    // Subtitle animation
    .fromTo(subtitleRef.current,
      { 
        y: 60, 
        opacity: 0,
        filter: 'blur(10px)'
      },
      { 
        y: 0, 
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1
      },
      '-=0.8'
    )
    // Buttons animation
    .fromTo('.hero-btn',
      { 
        scale: 0,
        opacity: 0
      },
      { 
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      },
      '-=0.5'
    )
    // Stats animation
    .fromTo('.stat-item',
      { 
        y: 80,
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out'
      },
      '-=0.5'
    );

    // Animate stat numbers
    stats.forEach((stat, index) => {
      gsap.fromTo(`.stat-number-${index}`,
        { 
          textContent: 0,
          scale: 0.5
        },
        { 
          textContent: stat.number,
          scale: 1,
          duration: 2,
          delay: 1.5 + (index * 0.1),
          ease: 'expo.out',
          snap: { textContent: 1 }
        }
      );
    });

    // Floating particles
    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        y: gsap.utils.random(-100, 100),
        x: gsap.utils.random(-50, 50),
        duration: gsap.utils.random(10, 20),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2
      });
    });
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(bgRef.current, {
        x,
        y,
        duration: 1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-navy-950 via-navy-900 to-slate-900" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              ref={el => { if (el) particlesRef.current[i] = el; }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, transparent 70%)',
                left: `${gsap.utils.random(10, 90)}%`,
                top: `${gsap.utils.random(10, 90)}%`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>

        {/* Premium Glow Effects */}
        <div className="absolute top-1/4 -start-1/4 w-96 h-96 bg-gold-500 rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-1/4 -end-1/4 w-96 h-96 bg-tiger-lily rounded-full opacity-5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="container-premium relative z-10 pt-15">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title with Split Text */}
          <h1 ref={titleRef} className="mb-8 perspective-1000">
            <LanguageFontWrapper variant="secondary">
              <span className="block text-7xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight">
                <span className="title-word inline-block gradient-text-premium">{t('hero.title.line1').split(' ')[0]}</span>
                {' '}
                <span className="title-word inline-block gradient-text-premium">{t('hero.title.line1').split(' ')[1]}</span>
              </span>
              <span className="block text-7xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mt-4">
                <span className="title-word inline-block gradient-text-gold">{t('hero.title.line2').split(' ')[0]}</span>
                {' '}
                <span className="title-word inline-block gradient-text-gold">{t('hero.title.line2').split(' ')[1]}</span>
              </span>
            </LanguageFontWrapper>
          </h1>
          
          {/* Subtitle */}
          <p ref={subtitleRef} className="text-l md:text-l text-gray-300 max-w-5xl mx-auto mb-12 leading-relaxed">
            <LanguageFontWrapper>
              {t('hero.subtitle')}
            </LanguageFontWrapper>
          </p>

          
          {/* Premium Stats Bar */}
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-item relative group"
              >
                <div className="glass-surface-dark rounded-2xl p-6 border border-white/10 hover:border-gold-500/30 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    <span className={`stat-number-${index} gradient-text-gold`}>{stat.number}</span>
                    <span className="gradient-text-gold">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-gold-500 to-tiger-lily opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <div className="absolute bottom-12 start-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full p-1">
            <div className="w-1 h-2 bg-gold-500 rounded-full mx-auto animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;