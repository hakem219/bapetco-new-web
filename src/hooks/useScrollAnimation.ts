// src/hooks/useScrollAnimation.ts
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

interface ScrollAnimationOptions {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  toggleActions?: string;
}

export const useScrollAnimation = (
  selector: string,
  animationConfig: AnimationConfig,
  options: ScrollAnimationOptions = {}
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = gsap.utils.toArray(selector);
    
    // Adjust animations for RTL
    const adjustedFrom = { ...animationConfig.from };
    const adjustedTo = { ...animationConfig.to };
    
    // Convert x values for RTL
    if (isRTL) {
      if (adjustedFrom.x) adjustedFrom.x = -adjustedFrom.x;
      if (adjustedTo.x) adjustedTo.x = -adjustedTo.x;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const animations = elements.map((element: any) => {
      return gsap.fromTo(element, adjustedFrom, {
        ...adjustedTo,
        scrollTrigger: {
          trigger: element,
          start: options.start || 'top 85%',
          end: options.end || 'bottom 20%',
          scrub: options.scrub || false,
          pin: options.pin || false,
          markers: options.markers || false,
          toggleActions: options.toggleActions || 'play none none reverse',
          invalidateOnRefresh: true,
        }
      });
    });

    // Refresh on language change
    ScrollTrigger.refresh();

    return () => {
      animations.forEach(animation => animation.kill());
    };
  }, [selector, animationConfig, options, isRTL]);

  return {
    containerRef,
    refresh: () => ScrollTrigger.refresh(),
  };
};

// Direction-aware animation presets
export const useDirectionalAnimation = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const fadeInStart = (element: string | HTMLElement, delay = 0) => {
    const direction = isRTL ? 50 : -50;
    
    return gsap.fromTo(element,
      { 
        opacity: 0, 
        x: direction,
        y: 30
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.2,
        delay,
        ease: 'expo.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        }
      }
    );
  };

  const fadeInEnd = (element: string | HTMLElement, delay = 0) => {
    const direction = isRTL ? -50 : 50;
    
    return gsap.fromTo(element,
      { 
        opacity: 0, 
        x: direction,
        y: 30
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.2,
        delay,
        ease: 'expo.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        }
      }
    );
  };

  return {
    fadeInStart,
    fadeInEnd,
    isRTL
  };
};