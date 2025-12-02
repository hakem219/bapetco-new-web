// src/components/sections/Sustainability.tsx
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Card from '../ui/Card';
import LanguageFontWrapper from '../LanguageFontWrapper';

const Sustainability: React.FC = () => {
  useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const initiatives = [
    {
      icon: '🌍',
      title: 'Environmental Management',
      description: 'Comprehensive environmental protection programs across all operations',
      metric: '30%',
      metricLabel: 'Emissions Reduced'
    },
    {
      icon: '💧',
      title: 'Water Conservation',
      description: 'Advanced water recycling and conservation technologies',
      metric: '45%',
      metricLabel: 'Water Recycled'
    },
    {
      icon: '⚡',
      title: 'Renewable Energy',
      description: 'Integration of solar and wind energy in our facilities',
      metric: '25%',
      metricLabel: 'Clean Energy'
    },
    {
      icon: '🌱',
      title: 'Biodiversity Protection',
      description: 'Preserving local ecosystems and wildlife habitats',
      metric: '100+',
      metricLabel: 'Species Protected'
    },
    {
      icon: '👥',
      title: 'Community Investment',
      description: 'Supporting local communities through education and development',
      metric: '$5M+',
      metricLabel: 'Annual Investment'
    },
    {
      icon: '🏆',
      title: 'HSE Excellence',
      description: 'World-class health, safety, and environmental standards',
      metric: '99.8%',
      metricLabel: 'Safety Record'
    }
  ];

  

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        // Title animation
        gsap.fromTo('.sustainability-title',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
        );

        // Cards stagger animation
        gsap.fromTo('.sustainability-card',
          { 
            y: 60, 
            opacity: 0,
            scale: 0.9
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.8, 
            stagger: {
              amount: 1,
              grid: [2, 3],
              from: 'start'
            },
            ease: 'power4.out' 
          }
        );

       
        // Metric numbers animation
        gsap.fromTo('.metric-number',
          {
            textContent: 0,
            scale: 0.5
          },
          {
            textContent: 100,
            scale: 1,
            duration: 2,
            delay: 0.8,
            ease: 'power4.out',
            snap: { textContent: 1 }
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} id="sustainability" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-neon-cyan rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-egyptian-gold-500 rounded-full filter blur-3xl" />
      </div>

      <div className="container-fluid relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="sustainability-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <LanguageFontWrapper variant="secondary">
                <span className="text-white">Commitment to</span>
                <span className="block text-neon-cyan">Sustainability</span>
              </LanguageFontWrapper>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              <LanguageFontWrapper>
                Leading the energy transition with responsible operations aligned with Egypt's Vision 2030
              </LanguageFontWrapper>
            </p>
          </div>

          {/* Initiative Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {initiatives.map((initiative, index) => (
              <Card
                key={index}
                className="sustainability-card group"
                hover="glow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{initiative.icon}</div>
                  <div className="text-right">
                    <div className="metric-number text-2xl font-bold text-neon-cyan">
                      {initiative.metric}
                    </div>
                    <div className="text-xs text-gray-500">{initiative.metricLabel}</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-egyptian-gold-500 mb-2">
                  {initiative.title}
                </h3>
                <p className="text-sm text-gray-300">
                  {initiative.description}
                </p>
              </Card>
            ))}
          </div>


          {/* Certifications */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-400 mb-6">Certified by International Standards</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="glass-surface px-6 py-3 rounded-lg">
                <span className="text-egyptian-gold-500 font-bold">ISO 14001</span>
              </div>
              <div className="glass-surface px-6 py-3 rounded-lg">
                <span className="text-egyptian-gold-500 font-bold">ISO 45001</span>
              </div>
              <div className="glass-surface px-6 py-3 rounded-lg">
                <span className="text-egyptian-gold-500 font-bold">ISO 9001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;