// src/components/layout/Navbar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import LanguageFontWrapper from '../LanguageFontWrapper';
import logoImg from '../../assets/images/logo2.png';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  const isRTL = i18n.language === 'ar';
// 1. Add w-[200%] to baseClasses so the gradient is wide enough to slide
const baseClasses = "absolute inset-0 w-[200%] bg-linear-to-r from-gold-500/20 via-tiger-lily/20 to-gold-500/20 transition-transform duration-1000 ease-out";

// 2. Change 'full' to '1/2'. 
// Since width is 200%, moving 50% (1/2) equals 100% of the button width.
const rtlClasses = "translate-x-1/2 group-hover:-translate-x-1/2";
const ltrClasses = "-translate-x-1/2 group-hover:translate-x-1/2";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Premium entrance animation
  useGSAP(() => {
    if (!navRef.current) return;

    // Navbar reveal with premium easing
    gsap.fromTo(navRef.current,
      { 
        y: -120, 
        opacity: 0,
        backdropFilter: 'blur(0px)'
      },
      { 
        y: 0, 
        opacity: 1,
        backdropFilter: 'blur(12px)',
        duration: 1.2,
        ease: 'expo.out',
        delay: 0.2
      }
    );

    // Logo animation
    gsap.fromTo('.nav-logo',
      { 
        x: -30, 
        opacity: 0,
        scale: 0.8
      },
      { 
        x: 0, 
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'expo.out',
        delay: 0.5
      }
    );

    // Staggered menu items with elegant reveal
    gsap.fromTo(menuItemsRef.current,
      { 
        y: -20, 
        opacity: 0,
        rotateX: -10
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        delay: 0.7
      }
    );

    // Language button animation
    gsap.fromTo('.nav-lang-btn',
      { 
        scale: 0,
        opacity: 0
      },
      { 
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 1.2
      }
    );
  }, []);

  // Mobile menu animation
  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      const tl = gsap.timeline();
      
      tl.fromTo(mobileMenuRef.current,
        { 
          x: isRTL ? '-100%' : '100%',
          opacity: 0
        },
        { 
          x: 0,
          opacity: 1,
          duration: 0.6, 
          ease: 'expo.inOut' 
        }
      )
      .fromTo('.mobile-menu-logo',
        {
          scale: 0,
          rotate: -180
        },
        {
          scale: 1,
          rotate: 0,
          duration: 0.6,
          ease: 'expo.out'
        },
        '-=0.3'
      )
      .fromTo('.mobile-menu-item',
        { 
          x: isRTL ? -60 : 60, 
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'expo.out'
        },
        '-=0.3'
      );
    }
  }, [isMobileMenuOpen, isRTL]);

  const navItems = [
    { key: 'home', href: '#' },
    { key: 'about', href: '#about' },
    { key: 'operations', href: '#operations' },
    { key: 'sustainability', href: '#sustainability' },
    { key: 'media', href: '#media' },
    { key: 'contact', href: '#contact' }
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

const handleMouseEnter = (item: string, index: number) => {
  setHoveredItem(item);

  if (indicatorRef.current && menuItemsRef.current[index]) {
    const element = menuItemsRef.current[index];
    
    // 💡 FIX: Check and assign parentElement safely
    const parentElement = element.parentElement;
    if (!parentElement) return; 

    // Get the position and dimensions relative to the viewport/document
    const rect = element.getBoundingClientRect();
    const parentRect = parentElement.getBoundingClientRect(); // TypeScript error resolved here

    // Calculate the position relative to the indicator's parent (the 'relative' flex container)
    const positionRelativeToParent = rect.left - parentRect.left; 

    let newX = positionRelativeToParent;
    const newWidth = rect.width;
    
    if (isRTL) {
      // In RTL, we need to calculate the position relative to the right side 
      // and translate it into an LTR 'x' value for GSAP.
      const rightEdgeRelativeToParent = parentRect.right - rect.right;
      
      // Total parent width - right edge distance - item width
      newX = parentRect.width - rightEdgeRelativeToParent - newWidth;
    }

    // Animate the indicator
    gsap.to(indicatorRef.current, {
      x: newX,
      width: newWidth,
      opacity: 0,
      duration: 0.3,
      ease: 'expo.out'
    });
  }
};

  const handleMouseLeave = () => {
    setHoveredItem(null);
    
    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'expo.out'
      });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`
          fixed top-0 inset-x-0 z-20
          transition-all duration-700 ease-out
          ${isScrolled 
            ? 'bg-navy-950/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-b border-white/5' 
            : 'bg-navy-950/70 backdrop-blur-md'
          }
        `}
        style={{
          background: isScrolled 
            ? 'linear-gradient(180deg, rgba(10, 25, 41, 0.2) 0%, rgba(10, 25, 41, 0.6) 100%)'
            : 'linear-gradient(180deg, rgba(10, 25, 41, 0.9) 0%, rgba(10, 25, 41, 0.8) 100%)'
        }}
      >
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-navy-950/10 via-transparent to-navy-950/10 pointer-events-none" />
        
        <div className="relative max-w-[1920px] mx-auto px-[60px]">
          <div className="flex items-center justify-between h-24">
            {/* Logo with premium hover effect */}
            <div className="flex items-center">
              <a href="#" className="nav-logo relative group">
                <div className="absolute -inset-3 bg-linear-to-r from-gold-500 to-tiger-lily rounded-lg opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                <img 
                  src={logoImg} 
                  alt="BAPETCO" 
                  className="relative h-14 w-auto object-contain transition-all duration-500 group-hover:scale-105 filter brightness-100 contrast-100"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                  }}
                />
              </a>
            </div>

            {/* Desktop Navigation with premium spacing */}
            <div className="hidden lg:flex items-center">
              <div className="relative flex items-center gap-5">
                {/* Hover indicator background */}
                <div 
                  ref={indicatorRef}
                  className="absolute h-10 bg-linear-to-r from-gold-500/10 to-tiger-lily/10 rounded-lg opacity-0 pointer-events-none"
                  style={{ transition: 'none' }}
                />
                
                {navItems.map((item, index) => (
                  <div
                    key={item.key}
                    ref={el => { 
                      if (el) menuItemsRef.current[index] = el; 
                    }}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.key, index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a
                      href={item.href}
                      className="
                        relative px-5 py-2.5 text-[15px] font-medium 
                        text-gray-200/90 hover:text-white
                        transition-all duration-300 ease-out
                        block tracking-wide
                        group
                      "
                      style={{ 
                        fontWeight: 500,
                        letterSpacing: '0.02em'
                      }}
                    >
                      <LanguageFontWrapper>
                        {t(`nav.${item.key}`)}
                      </LanguageFontWrapper>
                      
                      {/* Premium underline effect */}
                      <div className="absolute bottom-0 inset-x-5 h-0.5">
                        <div className="h-full bg-linear-to-r from-gold-500 via-tiger-lily to-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center" />
                      </div>

                      {/* Subtle glow on hover */}
                      {hoveredItem === item.key && (
                        <div className="absolute inset-0 bg-linear-to-t from-gold-500/5 to-transparent rounded-lg pointer-events-none" />
                      )}
                    </a>
                  </div>
                ))}
              </div>
            </div>


           {/* Premium language toggle */}
             <div className="ms-12 nav-lang-btn hidden lg:flex items-center" >
                <button
                  onClick={toggleLanguage}
                  className="
                    relative px-6 py-2.5
                    bg-linear-to-r from-navy-800 to-navy-700
                    hover:from-navy-700 hover:to-navy-600
                    text-white/90 hover:text-white
                    rounded-lg font-medium text-sm
                    transition-all duration-500 ease-out
                    shadow-[0_4px_16px_rgba(0,0,0,0.2)]
                    hover:shadow-[0_6px_24px_rgba(212,175,55,0.2)]
                    border border-white/10
                    hover:border-gold-500/30
                    transform hover:-translate-y-0.5
                    group overflow-hidden
                  "
                >
               {/* Animated background gradient */}
                <div 
                     className={`
                     ${baseClasses} 
                     ${isRTL ? rtlClasses : ltrClasses} 
                     ${isRTL ? 'right-0 left-auto' : 'left-0 right-auto'} 
                     `} 
                />
                  <span className="relative flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    {i18n.language === 'en' ? 'العربية' : 'English'}
                  </span>
                </button>
            </div>


            {/* Mobile Menu Toggle - Premium Design */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative p-3 text-white hover:text-gold-500 transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-linear-to-r from-gold-500/10 to-tiger-lily/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
              <svg className="relative w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Premium progress bar */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold-500/20 to-transparent" />
      </nav>

      {/* Mobile Menu - Premium Design */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div 
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div
            ref={mobileMenuRef}
            className={`
              absolute top-0 bottom-0 w-full max-w-md
              bg-linear-to-b from-navy-950 to-navy-800
              backdrop-blur-xl
              border-s border-white/10
              shadow-[-10px_0_40px_rgba(0,0,0,0.5)]
              ${isRTL ? 'start-0' : 'end-0'}
            `}
          >
            <div className="p-8 h-full overflow-y-auto">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-12">
                <img 
                  src={logoImg} 
                  alt="BAPETCO" 
                  className="mobile-menu-logo h-12 w-auto object-contain filter brightness-110"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 text-gray-400 hover:text-white transition-colors duration-300 hover:bg-white/5 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className="
                      mobile-menu-item block px-5 py-4 
                      text-gray-200 hover:text-white 
                      bg-white/5 hover:bg-linear-to-r hover:from-gold-500/10 hover:to-tiger-lily/10
                      border border-white/5 hover:border-gold-500/20
                      rounded-xl transition-all duration-300
                      transform hover:translate-x-1
                      font-medium tracking-wide
                    "
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <LanguageFontWrapper>
                      {t(`nav.${item.key}`)}
                    </LanguageFontWrapper>
                  </a>
                ))}
              </div>

              {/* Mobile Language Toggle */}
              <div className="mt-12">
                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsMobileMenuOpen(false);
                  }}
                  className="
                    w-full px-6 py-4
                    bg-linear-to-r from-gold-500 to-tiger-lily
                    hover:from-tiger-lily hover:to-gold-500
                    text-navy-950 font-bold
                    rounded-xl
                    transition-all duration-500
                    shadow-[0_8px_24px_rgba(212,175,55,0.3)]
                    transform hover:scale-[1.02]
                  "
                >
                  {i18n.language === 'en' ? 'العربية' : 'English'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;