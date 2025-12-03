// src/components/sections/Operations.tsx
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Card from '../ui/Card';
import LanguageFontWrapper from '../LanguageFontWrapper';
import {   Search,   HardHat,   Factory,   Warehouse, WorkflowIcon ,   Rocket } from 'lucide-react';

const Operations: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const operationAreas = [
    { 
      title: t('operations.areas.exploration'), 
      icon: <Search size={32} strokeWidth={1.5} />,
      description: t('operations.areas.explorationDesc')
    },
    { 
      title: t('operations.areas.drilling'), 
      icon: <HardHat size={32} strokeWidth={1.5} />,
      description: t('operations.areas.drillingDesc')
    },
    { 
      title: t('operations.areas.production'), 
      icon: <Factory size={32} strokeWidth={1.5} />,
      description: t('operations.areas.productionDesc')
    },
    { 
      title: t('operations.areas.facilities'), 
      icon: <Warehouse size={32} strokeWidth={1.5} />,
      description: t('operations.areas.facilitiesDesc')
    },
    { 
      title: t('operations.areas.pipeline'), 
      icon: <WorkflowIcon size={32} strokeWidth={1.5} />,
      description: t('operations.areas.pipelineDesc')
    },
    { 
      title: t('operations.areas.technology'), 
      icon: <Rocket size={32} strokeWidth={1.5} />,
      description: t('operations.areas.technologyDesc')
    }
  ];

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.operations-card',
          { y: 50, opacity: 0, rotateY: -30 },
          { 
            y: 0, 
            opacity: 1, 
            rotateY: 0,
            duration: 0.8, 
            stagger: 0.1,
            ease: 'power4.out' 
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} id="operations" className="relative py-24 md:py-32 bg-void-900">
      <div className="container-fluid">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gold-500">
              <LanguageFontWrapper variant="secondary">
                <span className="holographic">{t('operations.title')}</span>
              </LanguageFontWrapper>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              <LanguageFontWrapper>
                {t('operations.description')}
              </LanguageFontWrapper>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operationAreas.map((area, index) => (
              <Card
                key={index}
                className="operations-card"
                hover="glow"
              >
                <div className="text-3xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold text-gold-500 mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-400 text-sm">{area.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Operations;