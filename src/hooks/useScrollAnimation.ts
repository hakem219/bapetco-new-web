// src/hooks/useScrollAnimation.ts
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

interface ScrollAnimationOptions {
  trigger?: string | Element | null;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

interface AnimationConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  stagger?: number | gsap.StaggerVars;
  delay?: number;
}

export const useScrollAnimation = (
  selector: string,
  animationConfig: AnimationConfig,
  options: ScrollAnimationOptions = {}
) => {
  const containerRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (!elements.length) return;

    // Set initial state
    gsap.set(elements, animationConfig.from);

    // Create the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger || containerRef.current,
        start: options.start || 'top 80%',
        end: options.end || 'bottom 20%',
        scrub: options.scrub || false,
        pin: options.pin || false,
        markers: options.markers || false,
        onEnter: () => {
          gsap.to(elements, {
            ...animationConfig.to,
            stagger: animationConfig.stagger || 0.1,
            delay: animationConfig.delay || 0,
            ease: animationConfig.to.ease || 'power4.out'
          });
          options.onEnter?.();
        },
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
      }
    });

    animationRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [selector, animationConfig, options]);

  const refresh = () => {
    ScrollTrigger.refresh();
  };

  const kill = () => {
    if (animationRef.current) {
      animationRef.current.kill();
    }
  };

  return {
    containerRef,
    refresh,
    kill
  };
};

// Preset animations
export const scrollAnimationPresets = {
  fadeInUp: {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1 }
  },
  fadeInLeft: {
    from: { x: -50, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8 }
  },
  fadeInRight: {
    from: { x: 50, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8 }
  },
  scaleIn: {
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.6 }
  },
  rotateIn: {
    from: { rotateY: -90, opacity: 0 },
    to: { rotateY: 0, opacity: 1, duration: 1 }
  },
  slideInStagger: {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
  }
};

// Utility function for parallax scrolling
export const useParallaxScroll = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, [speed]);

  return elementRef;
};

// Utility function for text split animation
export const useTextSplitAnimation = (
  delay: number = 0,
  staggerAmount: number = 0.05
) => {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const text = textRef.current;
    const originalText = text.innerText;
    
    // Split text into spans
    const words = originalText.split(' ');
    text.innerHTML = words
      .map(word => `<span class="word-split">${word}</span>`)
      .join(' ');

    const splitWords = text.querySelectorAll('.word-split');

    gsap.fromTo(splitWords,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: staggerAmount,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 90%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      text.innerText = originalText;
    };
  }, [delay, staggerAmount]);

  return textRef;
};

export default useScrollAnimation;