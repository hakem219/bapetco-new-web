// src/components/sections/Sustainability.tsx
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LanguageFontWrapper from '../LanguageFontWrapper';
import {   Globe,   Droplet,   Zap,   TreePine,   Handshake,   Trophy } from 'lucide-react';

const Sustainability: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const initiatives = [
    {
      icon: <Globe size={32} strokeWidth={1.5} />,
      title: t('sustainability.initiatives.environment.title'),
      description: t('sustainability.initiatives.environment.description'),
      metric: t('sustainability.initiatives.environment.metric'),
      metricLabel: t('sustainability.initiatives.environment.metricLabel')
    },
    {
      icon: <Droplet size={32} strokeWidth={1.5} />,
      title: t('sustainability.initiatives.water.title'),
      description: t('sustainability.initiatives.water.description'),
      metric: t('sustainability.initiatives.water.metric'),
      metricLabel: t('sustainability.initiatives.water.metricLabel')
    },
    {
      icon: <Zap size={32} strokeWidth={1.5} />,
      title: t('sustainability.initiatives.renewable.title'),
      description: t('sustainability.initiatives.renewable.description'),
      metric: t('sustainability.initiatives.renewable.metric'),
      metricLabel: t('sustainability.initiatives.renewable.metricLabel')
    },
    {
      icon: <TreePine size={32} strokeWidth={1.5} />,
      title: t('sustainability.initiatives.biodiversity.title'),
      description: t('sustainability.initiatives.biodiversity.description'),
      metric: t('sustainability.initiatives.biodiversity.metric'),
      metricLabel: t('sustainability.initiatives.biodiversity.metricLabel')
    },
    {
      icon: <Handshake size={32} strokeWidth={1.5} />,
      title: t('sustainability.initiatives.community.title'),
      description: t('sustainability.initiatives.community.description'),
      metric: t('sustainability.initiatives.community.metric'),
      metricLabel: t('sustainability.initiatives.community.metricLabel')
    },
    {
      icon: <Trophy size={32} strokeWidth={1.5} />,
      title: t('sustainability.initiatives.hse.title'),
      description: t('sustainability.initiatives.hse.description'),
      metric: t('sustainability.initiatives.hse.metric'),
      metricLabel: t('sustainability.initiatives.hse.metricLabel')
    }
  ];


  useGSAP(() => {
    const elements = gsap.utils.toArray('.sustainability-element');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elements.forEach((element: any) => {
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
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Timeline animation
    gsap.fromTo('.vision-point',
      {
        x: -50,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="sustainability" className="relative section-padding overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-navy-950 via-navy-900 to-slate-900" />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 -start-1/4 w-96 h-96 bg-gold-500 rounded-full opacity-[0.02] blur-3xl" />
        <div className="absolute bottom-1/4 -end-1/4 w-96 h-96 bg-tiger-lily rounded-full opacity-[0.02] blur-3xl" />
      </div>

      <div className="container-premium relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="sustainability-element text-center mb-20">
            <span className="inline-block px-6 py-2 bg-gold-500/10 text-gold-500 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              <LanguageFontWrapper>
                {t('sustainability.badge')}
              </LanguageFontWrapper>
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <LanguageFontWrapper variant="secondary">
                <span className="block gradient-text-premium">{t('sustainability.title.line1')}</span>
                <span className="block gradient-text-gold mt-2">{t('sustainability.title.line2')}</span>
              </LanguageFontWrapper>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              <LanguageFontWrapper>
                {t('sustainability.subtitle')}
              </LanguageFontWrapper>
            </p>
          </div>

          {/* Initiative Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className="sustainability-element group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full glass-surface-dark rounded-3xl p-10 border border-white/5 hover:border-gold-500/30 transition-all duration-700 hover:transform hover:scale-105 overflow-hidden">
                  {/* Content */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl">{initiative.icon}</div>
                    <div className="text-end">
                      <div className="text-2xl font-bold gradient-text-gold">
                        <LanguageFontWrapper>
                          {initiative.metric}
                        </LanguageFontWrapper>
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        <LanguageFontWrapper>
                          {initiative.metricLabel}
                        </LanguageFontWrapper>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    <LanguageFontWrapper>
                      {initiative.title}
                    </LanguageFontWrapper>
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    <LanguageFontWrapper>
                      {initiative.description}
                    </LanguageFontWrapper>
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute bottom-0 start-0 w-full h-1 bg-linear-to-r from-gold-500 to-tiger-lily transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                </div>
              </div>
            ))}
          </div>


          {/* Certifications */}
          <div className="sustainability-element mt-20 text-center">
            <p className="text-sm text-gray-400 mb-8 uppercase tracking-wider">
              <LanguageFontWrapper>
                {t('sustainability.certifications')}
              </LanguageFontWrapper>
            </p>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <div className="glass-surface px-8 py-4 rounded-xl">
                <span className="text-gold-500 font-bold text-lg">ISO 14001</span>
              </div>
              <div className="glass-surface px-8 py-4 rounded-xl">
                <span className="text-gold-500 font-bold text-lg">ISO 45001</span>
              </div>
              <div className="glass-surface px-8 py-4 rounded-xl">
                <span className="text-gold-500 font-bold text-lg">ISO 9001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;