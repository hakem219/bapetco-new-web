// src/components/layout/Footer.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageFontWrapper from '../LanguageFontWrapper';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative py-16 bg-void-950 border-t border-glass-border">
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
      <div className="container-premium relative z-10 container-fluid">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold holographic mb-4">{t('footer.company')}</h3>
            <LanguageFontWrapper>
              <p className="text-gray-400 text-sm">
                {t('footer.address')}<br />
                {t('footer.location')}
              </p>
            </LanguageFontWrapper>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-egyptian-gold-500 mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">{t('nav.about')}</a></li>
              <li><a href="#operations" className="text-gray-400 hover:text-white transition-colors">{t('nav.operations')}</a></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-lg font-semibold text-egyptian-gold-500 mb-4">
              {t('footer.more')}
            </h4>
            <ul className="space-y-2">
              <li><a href="#sustainability" className="text-gray-400 hover:text-white transition-colors">{t('nav.sustainability')}</a></li>
              <li><a href="#careers" className="text-gray-400 hover:text-white transition-colors">{t('nav.careers')}</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold text-egyptian-gold-500 mb-4">
              {t('footer.connect')}
            </h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>{t('footer.phone')}: +202 22917055</p>
              <p>{t('footer.email')}: info@bapetco.net</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-glass-border">
          <p className="text-center text-gray-500 text-sm">
            <LanguageFontWrapper>
              {t('footer.copyright')}
            </LanguageFontWrapper>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;