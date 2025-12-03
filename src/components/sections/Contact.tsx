// src/components/sections/Contact.tsx
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LanguageFontWrapper from '../LanguageFontWrapper';
import Button from '../ui/Button';
import {   MapPin,   Phone,   Mail,   Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useTranslation();
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
      icon: <MapPin size={24} strokeWidth={1.5} />,
      title: t('contact.info.address.title'),
      content: [t('contact.info.address.line1'), t('contact.info.address.line2')]
    },
    {
      icon: <Phone size={24} strokeWidth={1.5} />,
      title: t('contact.info.phone.title'),
      content: ['+202 22917055', '+202 22917056']
    },
    {
      icon: <Mail size={24} strokeWidth={1.5} />,
      title: t('contact.info.email.title'),
      content: ['info@bapetco.net', 'careers@bapetco.net']
    },
    {
      icon: <Clock size={24} strokeWidth={1.5} />,
      title: t('contact.info.hours.title'),
      content: [t('contact.info.hours.days'), t('contact.info.hours.time')]
    }
  ];

  const departments = [
    { value: '', label: t('contact.form.departments.select') },
    { value: 'general', label: t('contact.form.departments.general') },
    { value: 'operations', label: t('contact.form.departments.operations') },
    { value: 'hr', label: t('contact.form.departments.hr') },
    { value: 'media', label: t('contact.form.departments.media') },
    { value: 'sustainability', label: t('contact.form.departments.sustainability') },
    { value: 'procurement', label: t('contact.form.departments.procurement') }
  ];

  useGSAP(() => {
    const elements = gsap.utils.toArray('.contact-element');
    
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    gsap.to(formRef.current, {
      opacity: 0.5,
      scale: 0.98,
      duration: 0.2,
      onComplete: () => {
        gsap.to(formRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'expo.out'
        });
        console.log('Form submitted:', formData);
      }
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="relative section-padding">
      <div className="container-premium">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="contact-element text-center mb-20">
            <span className="inline-block px-6 py-2 bg-gold-500/10 text-gold-500 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              <LanguageFontWrapper>
                {t('contact.badge')}
              </LanguageFontWrapper>
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <LanguageFontWrapper variant="secondary">
                <span className="gradient-text-gold">{t('contact.title')}</span>
              </LanguageFontWrapper>
            </h2>
            <p className="text-xl text-gray-300 max-w-5xl mx-auto">
              <LanguageFontWrapper>
                {t('contact.subtitle')}
              </LanguageFontWrapper>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="contact-element">
              <div className="glass-surface-dark rounded-3xl p-10 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-8">
                  <LanguageFontWrapper>
                    {t('contact.form.title')}
                  </LanguageFontWrapper>
                </h3>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <LanguageFontWrapper>
                          {t('contact.form.name')} *
                        </LanguageFontWrapper>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none transition-all duration-300"
                        placeholder={t('contact.form.namePlaceholder')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <LanguageFontWrapper>
                          {t('contact.form.email')} *
                        </LanguageFontWrapper>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none transition-all duration-300"
                        placeholder={t('contact.form.emailPlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <LanguageFontWrapper>
                          {t('contact.form.phone')}
                        </LanguageFontWrapper>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none transition-all duration-300"
                        placeholder={t('contact.form.phonePlaceholder')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <LanguageFontWrapper>
                          {t('contact.form.department')}
                        </LanguageFontWrapper>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none transition-all duration-300"
                      >
                        {departments.map((dept) => (
                          <option key={dept.value} value={dept.value} className="bg-navy-900">
                            {dept.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <LanguageFontWrapper>
                        {t('contact.form.message')} *
                      </LanguageFontWrapper>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none transition-all duration-300 resize-none"
                      placeholder={t('contact.form.messagePlaceholder')}
                    />
                  </div>

                  <Button variant="primary" size="large" className="w-full">
                    <LanguageFontWrapper>
                      {t('contact.form.submit')}
                    </LanguageFontWrapper>
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="contact-element"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="glass-surface-dark rounded-2xl p-6 border border-white/5 hover:border-gold-500/30 transition-all duration-700 hover:transform hover:scale-105">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{info.icon}</div>
                        <div>
                          <h4 className="text-sm font-bold text-gold-500 mb-2">
                            <LanguageFontWrapper>
                              {info.title}
                            </LanguageFontWrapper>
                          </h4>
                          {info.content.map((line, i) => (
                            <p key={i} className="text-sm text-gray-300">
                              <LanguageFontWrapper>
                                {line}
                              </LanguageFontWrapper>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="contact-element">
                <div className="glass-surface-dark rounded-3xl h-80 relative overflow-hidden border border-white/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-4">🗺️</div>
                      <p className="text-gray-400 mb-6">
                        <LanguageFontWrapper>
                          {t('contact.map.title')}
                        </LanguageFontWrapper>
                      </p>
                      <Button variant="ghost" size="small">
                        <LanguageFontWrapper>
                          {t('contact.map.button')}
                        </LanguageFontWrapper>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;