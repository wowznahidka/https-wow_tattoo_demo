import React, { useEffect, useState } from 'react';

// List of real high-resolution tattoo artworks from our studio
const BG_TATTOO_SKETCHES = [
  { url: '/tattoos/photo_1_19_07_2024_13_03_11.jpg', alt: 'Blackwork Geometry', style: 'top-[8%] left-[2%] w-[420px] h-[580px] -rotate-6' },
  { url: '/tattoos/photo_3_19_07_2024_13_08_38.jpg', alt: 'Japanese Dragon', style: 'top-[18%] right-[1%] w-[460px] h-[640px] rotate-3' },
  { url: '/tattoos/photo_5_19_07_2024_13_10_04.jpg', alt: 'Realism Portrait', style: 'top-[36%] left-[4%] w-[400px] h-[560px] rotate-12' },
  { url: '/tattoos/photo_7_19_07_2024_13_22_47.jpg', alt: 'Fine Line Floral', style: 'top-[50%] right-[3%] w-[380px] h-[520px] -rotate-3' },
  { url: '/tattoos/photo_9_19_07_2024_14_40_10.jpg', alt: 'Ornamental Sleeve', style: 'top-[68%] left-[2%] w-[440px] h-[600px] rotate-6' },
  { url: '/tattoos/photo_11_19_07_2024_14_40_10.jpg', alt: 'Micro Realism', style: 'top-[84%] right-[2%] w-[420px] h-[580px] -rotate-6' },
];

export const StudioAtmosphericBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic chromatic shifts based on scroll position
  const shift = (scrollY * 0.05) % 360;
  const meshY1 = 12 + Math.sin(scrollY * 0.001) * 15;
  const meshY2 = 60 + Math.cos(scrollY * 0.0012) * 20;

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none"
    >
      {/* 1. Base Studio Dark Noir Canvas */}
      <div className="absolute inset-0 bg-[#09090b]" />

      {/* 2. Authentic Floating Studio Tattoo Artworks with Parallax & Soft Dark Blending */}
      <div className="absolute inset-0 w-full h-[6000px] pointer-events-none opacity-25">
        {BG_TATTOO_SKETCHES.map((item, idx) => {
          // Individual parallax speed for realistic depth
          const speed = 0.08 + (idx % 3) * 0.04;
          const translateY = -scrollY * speed;
          
          return (
            <div
              key={idx}
              className={`absolute ${item.style} transition-transform duration-300 ease-out will-change-transform`}
              style={{
                transform: `translate3d(0, ${translateY}px, 0)`
              }}
            >
              <div className="relative w-full h-full p-2 bg-black/60 backdrop-blur-xs border border-white/10 shadow-2xl overflow-hidden group">
                <img
                  src={item.url}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-150 brightness-75 opacity-40 mix-blend-screen transition-opacity duration-700"
                  loading="lazy"
                />
                {/* Soft gradient wash over background sketches */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/80 via-transparent to-[#09090b]/80" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Iridescent Deep Ink & Velvet Crimson Atmospheric Shimmer */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 1100px 900px at 15% ${meshY1}%, rgba(185, 28, 28, 0.08), transparent 75%),
            radial-gradient(ellipse 1200px 1000px at 85% ${meshY2}%, rgba(220, 38, 38, 0.05), transparent 80%),
            radial-gradient(circle 800px at 50% ${45 + Math.sin(scrollY * 0.0008) * 25}%, rgba(185, 28, 28, 0.06), transparent 70%)
          `,
          willChange: 'background'
        }}
      />

      {/* 4. Fine Grain Texture */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 0.8px, transparent 0.8px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: `0px ${scrollY * 0.12}px`
        }}
      />

      {/* 5. Architectural Noir Editorial Ruler Guidelines */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-6 sm:left-12 lg:left-24 w-px h-full bg-gradient-to-b from-white/0 via-white/[0.06] to-white/0" 
          style={{ transform: `translate3d(0, ${-scrollY * 0.04}px, 0)` }}
        />
        <div 
          className="absolute top-0 right-6 sm:right-12 lg:right-24 w-px h-full bg-gradient-to-b from-white/0 via-white/[0.06] to-white/0" 
          style={{ transform: `translate3d(0, ${-scrollY * 0.04}px, 0)` }}
        />
        <div 
          className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-red-600/[0.04] to-transparent hidden lg:block"
        />
      </div>

      {/* 6. Ambient Edge Vignettes */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-red-950/20 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 -right-32 w-[650px] h-[650px] bg-black/40 rounded-full blur-[160px]" />
    </div>
  );
};
