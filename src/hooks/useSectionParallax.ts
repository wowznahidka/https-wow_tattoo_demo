import { useEffect, useState, RefObject } from 'react';

export interface ParallaxOffsets {
  /** Offset value for far background layers (e.g. typography watermark) */
  bgSlow: number;
  /** Offset value for mid background layers (e.g. floating tattoo textures) */
  bgMid: number;
  /** Normalized section progress from -1 (entering from below) to +1 (exiting above) */
  progress: number;
  /** Whether the section is currently near or inside the viewport */
  isVisible: boolean;
}

export function useSectionParallax(sectionRef: RefObject<HTMLElement | null>): ParallaxOffsets {
  const [offsets, setOffsets] = useState<ParallaxOffsets>({
    bgSlow: 0,
    bgMid: 0,
    progress: 0,
    isVisible: false,
  });

  useEffect(() => {
    let ticking = false;

    const calculateParallax = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      // Check if section is within or near viewport (-windowHeight to windowHeight * 2)
      const isNearViewport = rect.top < windowHeight * 1.3 && rect.bottom > -windowHeight * 0.3;

      if (isNearViewport) {
        // Center of element relative to center of viewport
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const delta = elementCenter - viewportCenter;

        // Normalized progress: 0 when centered, negative when scrolled past, positive when below
        const progress = Math.max(-1.5, Math.min(1.5, delta / (windowHeight + rect.height / 2)));

        // Multi-depth planes
        const bgSlow = -delta * 0.12; // Far background moves slowly
        const bgMid = -delta * 0.22;  // Mid background moves moderately

        setOffsets({
          bgSlow,
          bgMid,
          progress,
          isVisible: true,
        });
      } else {
        setOffsets(prev => prev.isVisible ? { ...prev, isVisible: false } : prev);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    calculateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionRef]);

  return offsets;
}
