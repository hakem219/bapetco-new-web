// src/components/sections/About.tsx
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LanguageFontWrapper from '../LanguageFontWrapper';
import { Landmark, Lightbulb, Leaf,  TrendingUp,  Droplet, Users, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isRTL = i18n.language === 'ar';

  const highlights = [
    {
      title: t('about.highlights.heritage.title'),
      subtitle: t('about.highlights.heritage.subtitle'),
      description: t('about.highlights.heritage.description'),
      icon: <Landmark size={40} strokeWidth={1.5} />,
      gradient: 'from-[var(--color-navy-800)] to-[var(--color-navy-700)]'
    },
    {
      title: t('about.highlights.innovation.title'),
      subtitle: t('about.highlights.innovation.subtitle'),
      description: t('about.highlights.innovation.description'),
      icon: <Lightbulb size={40} strokeWidth={1.5} />,
      gradient: 'from-[var(--color-gold-500)] to-[var(--color-tiger-lily)]'
    },
    {
      title: t('about.highlights.sustainability.title'),
      subtitle: t('about.highlights.sustainability.subtitle'),
      description: t('about.highlights.sustainability.description'),
      icon: <Leaf size={40} strokeWidth={1.5} />,
      gradient: 'from-[var(--color-slate-800)] to-[var(--color-slate-700)]'
    }
  ];

  const impactStats = [
    { value: '40+', label: t('about.impact.experience'), icon: <TrendingUp size={48} strokeWidth={1.5} /> },
    { value: '150K+', label: t('about.impact.daily'), icon: <Droplet size={48} strokeWidth={1.5} /> },
    { value: '1,200+', label: t('about.impact.employees'), icon: <Users size={48} strokeWidth={1.5} /> },
    { value: '99.8%', label: t('about.impact.safety'), icon: <ShieldCheck size={48} strokeWidth={1.5} /> },
  ];

  useGSAP(() => {
    // Clear any existing animations
    gsap.killTweensOf('.about-element');
    
    const elements = gsap.utils.toArray('.about-element');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elements.forEach((element: any) => {
      gsap.set(element, { opacity: 1, clearProps: 'all' });
      
      gsap.fromTo(element,
        { 
          y: 100,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'expo.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
            refreshPriority: 1
          }
        }
      );
    });

    // Parallax effect for background elements - direction neutral
    gsap.to('.about-bg-element', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
        invalidateOnRefresh: true
      }
    });

    // Premium counter animation - direction neutral
    ScrollTrigger.create({
      trigger: '.impact-stats',
      start: 'top 80%',
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.set('.impact-stat', { opacity: 1, clearProps: 'all' });
        
        gsap.fromTo('.impact-stat',
          { 
            scale: 0,
            opacity: 0,
            rotateY: isRTL ? 180 : -180
          },
          { 
            scale: 1,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            clearProps: 'transform,opacity'
          }
        );
      }
    });

    // Refresh ScrollTrigger after setup
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [isRTL, t]); // Add dependencies to re-run when language changes

  return (
    <section ref={sectionRef} id="about" className="relative section-padding overflow-hidden" data-gsap-rtl>
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-navy-950 via-navy-900 to-slate-900" />
        
        {/* Decorative Elements */}
        <div className="about-bg-element absolute top-20 start-10 w-64 h-64 bg-gold-500 rounded-full opacity-[0.02] blur-3xl" />
        <div className="about-bg-element absolute bottom-20 end-10 w-96 h-96 bg-tiger-lily rounded-full opacity-[0.02] blur-3xl" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="container-premium relative z-10">
        <div ref={contentRef} className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="about-element text-center mb-20">
            <span className="inline-block px-6 py-2 bg-gold-500/10 text-gold-500 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              <LanguageFontWrapper>
                {t('about.top')}
              </LanguageFontWrapper>
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              <LanguageFontWrapper variant="secondary">
                <span className="block gradient-text-premium">{t('about.title.line1')}</span>
                <span className="block gradient-text-gold mt-2">{t('about.title.line2')}</span>
              </LanguageFontWrapper>
            </h2>
            <p className="text-xl text-gray-400 max-w-6xl mx-auto leading-relaxed">
              <LanguageFontWrapper>
                {t('about.intro')}
              </LanguageFontWrapper>
            </p>
          </div>

          {/* Premium Highlight Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="about-element group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full glass-surface-dark rounded-3xl p-10 border border-white/5 hover:border-gold-500/30 transition-all duration-700 hover:transform hover:scale-105 overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-linear-to-br ${highlight.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-5xl mb-6">{highlight.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-gold-500 font-semibold uppercase tracking-wider mb-4">
                      {highlight.subtitle}
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>

                  {/* Premium Hover Effect */}
                  <div className="absolute bottom-0 start-0 w-full h-1 bg-linear-to-r from-gold-500 to-tiger-lily transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                </div>
              </div>
            ))}
          </div>

          {/* Impact Section with Premium Design */}
          <div className="about-element">
            <div className="glass-surface-dark rounded-3xl p-12 md:p-16 border border-white/10">
              <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
                <LanguageFontWrapper>
                  <span className="gradient-text-gold">{t('about.impact.title')}</span>
                </LanguageFontWrapper>
              </h3>
              
              <div className="impact-stats grid grid-cols-2 md:grid-cols-4 gap-8">
                {impactStats.map((stat, index) => (
                  <div key={index} className="impact-stat text-center group">
                    <div className="relative inline-block mb-4">
                      <div className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
                        {stat.icon}
                      </div>
                      <div className="absolute inset-0 bg-gold-500 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold gradient-text-gold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;