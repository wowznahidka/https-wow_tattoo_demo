import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = (window.scrollY / totalHeight) * 100;
            setProgress(Math.min(100, Math.max(0, currentProgress)));
          } else {
            setProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      id="scroll-progress-container"
      className="fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none bg-black/5 backdrop-blur-[1px]"
      aria-hidden="true"
    >
      <div
        id="scroll-progress-indicator"
        className="h-full bg-gradient-to-r from-red-800 via-red-600 to-red-500 transition-all duration-75 ease-out relative"
        style={{
          width: `${progress}%`,
        }}
      >
        {/* Subtle red indicator at the leading edge */}
        {progress > 0 && progress < 100 && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-600 shadow-[0_0_6px_#dc2626]" />
        )}
      </div>
    </div>
  );
};
