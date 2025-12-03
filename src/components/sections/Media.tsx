// src/components/sections/Media.tsx
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import LanguageFontWrapper from '../LanguageFontWrapper';
import {   Trophy,   Sun,   Target,   Handshake,   GraduationCap,   Bot } from 'lucide-react';

const Media: React.FC = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const newsItems = [
    {
      id: 1,
      category: 'announcement',
      date: '2025-01-15',
      titleKey: 'media.news.item1.title',
      excerptKey: 'media.news.item1.excerpt',
      image: <Target size={20} strokeWidth={1.5} />,
    },
    {
      id: 2,
      category: 'sustainability',
      date: '2025-01-10',
      titleKey: 'media.news.item2.title',
      excerptKey: 'media.news.item2.excerpt',
      image: <Sun size={20} strokeWidth={1.5} />,
    },
    {
      id: 3,
      category: 'award',
      date: '2024-12-20',
      titleKey: 'media.news.item3.title',
      excerptKey: 'media.news.item3.excerpt',
      image: <Trophy size={20} strokeWidth={1.5} />,
    },
    {
      id: 4,
      category: 'technology',
      date: '2024-12-15',
      titleKey: 'media.news.item4.title',
      excerptKey: 'media.news.item4.excerpt',
      image: <Bot size={20} strokeWidth={1.5} />,
    },
    {
      id: 5,
      category: 'community',
      date: '2024-12-01',
      titleKey: 'media.news.item5.title',
      excerptKey: 'media.news.item5.excerpt',
      image: <GraduationCap size={20} strokeWidth={1.5} />,
    },
    {
      id: 6,
      category: 'partnership',
      date: '2024-11-25',
      titleKey: 'media.news.item6.title',
      excerptKey: 'media.news.item6.excerpt',
      image: <Handshake size={20} strokeWidth={1.5} />,
    }
  ];

  const filters = [
    { value: 'all', label: t('media.filters.all') },
    { value: 'announcement', label: t('media.filters.announcements') },
    { value: 'sustainability', label: t('media.filters.sustainability') },
    { value: 'award', label: t('media.filters.awards') },
    { value: 'technology', label: t('media.filters.technology') },
    { value: 'community', label: t('media.filters.community') }
  ];

  const filteredNews = activeFilter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  useGSAP(() => {
    const elements = gsap.utils.toArray('.media-element');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elements.forEach((element: any) => {
      gsap.fromTo(element,
        { 
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%'
          }
        }
      );
    });
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    
    gsap.to('.news-card', {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        gsap.to('.news-card', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'expo.out'
        });
      }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = i18n.language === 'ar' ? 'ar-EG' : 'en-US';
    return date.toLocaleDateString(locale, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section ref={sectionRef} id="media" className="relative section-padding  bg-navy-950">
      <div className="container-premium">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="media-element text-center mb-16">
            <span className="inline-block px-6 py-2 bg-gold-500/10 text-gold-500 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              <LanguageFontWrapper>
                {t('media.badge')}
              </LanguageFontWrapper>
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <LanguageFontWrapper variant="secondary">
                <span className="gradient-text-gold">{t('media.title')}</span>
              </LanguageFontWrapper>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <LanguageFontWrapper>
                {t('media.subtitle')}
              </LanguageFontWrapper>
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="media-element flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                className={`
                  px-6 py-3 rounded-xl text-sm font-medium
                  transition-all duration-500 transform hover:scale-105
                  ${activeFilter === filter.value 
                    ? 'bg-linear-to-r from-gold-500 to-tiger-lily text-navy-950 shadow-lg' 
                    : 'glass-surface text-gray-300 hover:text-white border border-white/10 hover:border-gold-500/30'
                  }
                `}
              >
                <LanguageFontWrapper>
                  {filter.label}
                </LanguageFontWrapper>
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="news-card media-element group cursor-pointer"
              >
                <div className="h-full glass-surface-dark rounded-2xl p-8 border border-white/5 hover:border-gold-500/30 transition-all duration-700 hover:transform hover:scale-105">
                  {/* Category Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-4xl">{item.image}</span>
                    <span className="px-3 py-1 bg-gold-500/20 text-gold-500 text-xs rounded-full uppercase">
                      <LanguageFontWrapper>
                        {t(`media.categories.${item.category}`)}
                      </LanguageFontWrapper>
                    </span>
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-500 mb-3">
                    <LanguageFontWrapper>
                      {formatDate(item.date)}
                    </LanguageFontWrapper>
                  </p>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gold-500 transition-colors">
                    <LanguageFontWrapper>
                      {t(item.titleKey)}
                    </LanguageFontWrapper>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-400 mb-4">
                    <LanguageFontWrapper>
                      {t(item.excerptKey)}
                    </LanguageFontWrapper>
                  </p>

                  {/* Read More */}
                  <div className="flex items-center text-gold-500 text-sm font-medium">
                    <span>
                      <LanguageFontWrapper>
                        {t('media.readMore')}
                      </LanguageFontWrapper>
                    </span>
                    <svg className="w-4 h-4 ms-2 transform group-hover:translate-x-2 transition-transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Media;