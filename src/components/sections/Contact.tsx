// src/components/sections/Contact.tsx
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LanguageFontWrapper from '../LanguageFontWrapper';

const Contact: React.FC = () => {
  useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      content: ['127 Abdel Aziz Fahmy Street', 'Heliopolis, Cairo, Egypt']
    },
    {
      icon: '📞',
      title: 'Phone',
      content: ['+202 22917055', '+202 22917056']
    },
    {
      icon: '✉️',
      title: 'Email',
      content: ['info@bapetco.net', 'careers@bapetco.net']
    },
    {
      icon: '🕐',
      title: 'Business Hours',
      content: ['Sunday - Thursday', '8:00 AM - 5:00 PM']
    }
  ];

  const departments = [
    { value: '', label: 'Select Department' },
    { value: 'general', label: 'General Inquiries' },
    { value: 'operations', label: 'Operations' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'media', label: 'Media Relations' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'procurement', label: 'Procurement' }
  ];

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.contact-title',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
        );

        gsap.fromTo('.contact-info-card',
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
            delay: 0.3,
            ease: 'power4.out' 
          }
        );

        gsap.fromTo('.form-element',
          { 
            x: -30, 
            opacity: 0
          },
          { 
            x: 0, 
            opacity: 1,
            duration: 0.6, 
            stagger: 0.08,
            delay: 0.5,
            ease: 'power4.out' 
          }
        );

        gsap.fromTo('.map-placeholder',
          { 
            opacity: 0,
            scale: 0.9
          },
          { 
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.8,
            ease: 'power4.out' 
          }
        );
      }
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate form submission
    gsap.to(formRef.current, {
      opacity: 0.5,
      scale: 0.98,
      duration: 0.2,
      onComplete: () => {
        gsap.to(formRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power4.out'
        });
        // Handle form submission logic here
        console.log('Form submitted:', formData);
      }
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-32 bg-void-900">
      <div className="container-fluid">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="contact-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <LanguageFontWrapper variant="secondary">
                <span className="holographic">Get in Touch</span>
              </LanguageFontWrapper>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              <LanguageFontWrapper>
                Connect with us for inquiries, partnerships, or career opportunities
              </LanguageFontWrapper>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-surface-dark rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                <LanguageFontWrapper>
                  Send us a Message
                </LanguageFontWrapper>
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-element">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-element">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-element">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none transition-colors"
                      placeholder="+20 123 456 7890"
                    />
                  </div>

                  <div className="form-element">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Department
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none transition-colors"
                    >
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value} className="bg-void-900">
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-element">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button variant="primary" size="large" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="contact-info-card"
                    hover="glow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{info.icon}</div>
                      <div>
                        <h4 className="text-sm font-bold text-egyptian-gold-500 mb-2">
                          {info.title}
                        </h4>
                        {info.content.map((line, i) => (
                          <p key={i} className="text-sm text-gray-300">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="map-placeholder glass-surface rounded-2xl h-64 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🗺️</div>
                    <p className="text-gray-400">Interactive Map</p>
                    <Button variant="ghost" size="small" className="mt-4">
                      View on Google Maps
                    </Button>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <Card hover="none">
                <h4 className="text-lg font-bold text-white mb-4">
                  Follow Us
                </h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-glass-white hover:bg-egyptian-gold-500 flex items-center justify-center transition-colors group"
                  >
                    <svg className="w-5 h-5 text-white group-hover:text-void-950" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-glass-white hover:bg-egyptian-gold-500 flex items-center justify-center transition-colors group"
                  >
                    <svg className="w-5 h-5 text-white group-hover:text-void-950" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-glass-white hover:bg-egyptian-gold-500 flex items-center justify-center transition-colors group"
                  >
                    <svg className="w-5 h-5 text-white group-hover:text-void-950" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;