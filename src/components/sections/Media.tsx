// src/components/sections/Media.tsx
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LanguageFontWrapper from '../LanguageFontWrapper';

const Media: React.FC = () => {
  useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const newsItems = [
    {
      id: 1,
      category: 'announcement',
      date: '2025-01-15',
      title: 'BAPETCO Achieves Record Production Milestone',
      excerpt: 'Company surpasses 150,000 barrels per day for the first time in its history.',
      image: '🎯'
    },
    {
      id: 2,
      category: 'sustainability',
      date: '2025-01-10',
      title: 'New Solar Initiative Reduces Carbon Footprint by 30%',
      excerpt: 'Implementation of solar panels across production facilities marks significant environmental achievement.',
      image: '☀️'
    },
    {
      id: 3,
      category: 'award',
      date: '2024-12-20',
      title: 'BAPETCO Wins Excellence in Safety Award',
      excerpt: 'Recognition for maintaining 99.8% safety record throughout operations.',
      image: '🏆'
    },
    {
      id: 4,
      category: 'technology',
      date: '2024-12-15',
      title: 'AI-Powered Exploration Technology Deployed',
      excerpt: 'Advanced machine learning algorithms enhance resource discovery capabilities.',
      image: '🤖'
    },
    {
      id: 5,
      category: 'community',
      date: '2024-12-01',
      title: 'Education Initiative Supports 500+ Local Students',
      excerpt: 'Scholarship program expands to cover engineering and geology studies.',
      image: '📚'
    },
    {
      id: 6,
      category: 'partnership',
      date: '2024-11-25',
      title: 'Strategic Partnership with International Energy Leaders',
      excerpt: 'New collaboration to enhance technology transfer and operational excellence.',
      image: '🤝'
    }
  ];

  const filters = [
    { value: 'all', label: 'All News' },
    { value: 'announcement', label: 'Announcements' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'award', label: 'Awards' },
    { value: 'technology', label: 'Technology' },
    { value: 'community', label: 'Community' }
  ];

  const filteredNews = activeFilter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.media-title',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
        );

        gsap.fromTo('.filter-btn',
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            stagger: 0.05,
            delay: 0.3,
            ease: 'power4.out' 
          }
        );

        gsap.fromTo('.news-card',
          { 
            y: 50, 
            opacity: 0,
            scale: 0.95
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.8, 
            stagger: 0.1,
            delay: 0.5,
            ease: 'power4.out' 
          }
        );
      }
    });
  }, []);
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
       // Animate the transition
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
          ease: 'power4.out'
        });
      }
    });
  };

  return (
    <section ref={sectionRef} id="media" className="relative py-24 md:py-32 bg-void-900">
      <div className="container-fluid">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="media-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <LanguageFontWrapper variant="secondary">
                <span className="holographic">Media Center</span>
              </LanguageFontWrapper>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              <LanguageFontWrapper>
                Latest news, achievements, and insights from BAPETCO
              </LanguageFontWrapper>
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                className={`
                  filter-btn px-6 py-2 rounded-full text-sm font-medium
                  transition-all duration-300 transform hover:scale-105
                  ${activeFilter === filter.value 
                    ? 'bg-egyptian-gold-500 text-void-950' 
                    : 'glass-surface text-gray-300 hover:text-white'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredNews.map((item) => (
              <Card
                key={item.id}
                className="news-card group cursor-pointer"
                hover="lift"
              >
                {/* Category Badge */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{item.image}</span>
                  <span className="px-3 py-1 bg-egyptian-gold-500/20 text-egyptian-gold-500 text-xs rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Date */}
                <p className="text-xs text-gray-500 mb-2">
                  {new Date(item.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-400 mb-4">
                  {item.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center text-egyptian-gold-500 text-sm font-medium">
                  <span>Read More</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center">
            <Button variant="secondary" size="large">
              Load More News
            </Button>
          </div>

        </div> 
      </div>
    </section>
  );
};

export default Media;