import React, { useEffect, useRef, useState } from 'react';

interface StatsProps {
  language: string;
}

const StatsSection: React.FC<StatsProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = {
    en: [
      { number: "40+", label: "Years of Excellence", icon: "📅" },
      { number: "500M", label: "Barrels Produced", icon: "🛢️" },
      { number: "2000+", label: "Expert Professionals", icon: "👥" },
      { number: "5", label: "Major Fields", icon: "📍" }
    ],
    ar: [
      { number: "40+", label: "سنوات من التميز", icon: "📅" },
      { number: "500M", label: "برميل منتج", icon: "🛢️" },
      { number: "2000+", label: "خبير محترف", icon: "👥" },
      { number: "5", label: "حقول رئيسية", icon: "📍" }
    ]
  };

  const currentStats = stats[language as keyof typeof stats];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-linear-to-b from-white to-gray-50">
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentStats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-petroleum-900 mb-2">
                {stat.number}
              </div>
              <div className="text-lg text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;