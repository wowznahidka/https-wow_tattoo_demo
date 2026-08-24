import React from 'react';

interface StudioLogoProps {
  variant?: 'full' | 'icon' | 'stamp' | 'monogram';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const StudioLogo: React.FC<StudioLogoProps> = ({ 
  variant = 'full', 
  size = 'md',
  className = '' 
}) => {
  if (variant === 'stamp') {
    return (
      <div 
        className={`relative inline-flex items-center justify-center p-2 rounded-full border-2 border-red-700 bg-black text-white select-none ${className}`}
        style={{
          boxShadow: '0 8px 30px rgba(185, 28, 28, 0.35), inset 0 0 15px rgba(185, 28, 28, 0.4)'
        }}
      >
        <div className="w-16 h-16 rounded-full border border-dashed border-white/50 flex flex-col items-center justify-center text-center p-1 relative">
          <span className="text-[7px] font-mono uppercase tracking-[0.25em] text-red-400 font-bold leading-tight">ATELIER</span>
          <span className="text-[12px] font-cinzel font-black tracking-wider text-white leading-none my-0.5">N&N</span>
          <span className="text-[6px] font-mono text-zinc-300 tracking-widest leading-tight">KYIV • 2014</span>
          {/* Outer rotating needle pointer accent */}
          <div className="absolute inset-0 rounded-full border-t-2 border-red-500 animate-spin" style={{ animationDuration: '14s' }} />
        </div>
      </div>
    );
  }

  if (variant === 'icon' || variant === 'monogram') {
    return (
      <div className={`relative inline-flex items-center justify-center bg-black border border-white/20 p-2.5 overflow-hidden group shadow-lg ${className}`}>
        {/* Subtle background photo texture */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-500"
          style={{
            backgroundImage: 'url(/tattoos/photo_1_19_07_2024_13_03_11.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Crossed needle & quill artistic vector monogram */}
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          className={`${size === 'lg' ? 'w-10 h-10' : size === 'sm' ? 'w-5 h-5' : 'w-7 h-7'} relative z-10 text-white stroke-current group-hover:text-red-400 transition-colors duration-300`}
        >
          {/* Diamond frame */}
          <polygon points="24,3 45,24 24,45 3,24" strokeWidth="1.5" strokeDasharray="1 1" className="stroke-white/40" />
          <polygon points="24,7 41,24 24,41 7,24" strokeWidth="1.2" className="stroke-red-600" />
          
          {/* Vertical Master Needle */}
          <line x1="24" y1="9" x2="24" y2="39" strokeWidth="2" strokeLinecap="round" className="stroke-white" />
          <circle cx="24" cy="11" r="2.5" className="fill-red-600 stroke-none" />
          <polygon points="24,39 22.5,33 25.5,33" className="fill-white stroke-none" />
          
          {/* Crossed Serif N ligature */}
          <path d="M16 18 L16 30 M16 20 L24 28 M32 18 L32 30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-white/90" />
          
          {/* Ink Drops */}
          <circle cx="16" cy="34" r="1" className="fill-red-500 stroke-none" />
          <circle cx="32" cy="14" r="1" className="fill-red-500 stroke-none" />
        </svg>
      </div>
    );
  }

  // Full Brand Lockup (Logo Icon + Typography + Heritage Tagline)
  return (
    <div className={`flex items-center space-x-3.5 group select-none ${className}`}>
      {/* Emblem Icon with Inked Photo Depth */}
      <div className="relative w-10 h-10 bg-black border border-black/30 flex items-center justify-center p-2 group-hover:border-red-700 transition-all duration-300 shadow-md">
        <div 
          className="absolute inset-0 opacity-30 mix-blend-luminosity group-hover:opacity-50 transition-opacity"
          style={{
            backgroundImage: 'url(/tattoos/photo_1_19_07_2024_13_03_11.jpg)',
            backgroundSize: 'cover'
          }}
        />
        <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 text-white stroke-current relative z-10">
          <polygon points="20,2 38,20 20,38 2,20" strokeWidth="1.2" className="stroke-red-600" />
          <line x1="20" y1="6" x2="20" y2="34" strokeWidth="1.8" strokeLinecap="round" className="stroke-white" />
          <path d="M14 15 L14 25 M14 17 L20 23 M26 15 L26 25" strokeWidth="1.8" strokeLinecap="round" className="stroke-white" />
          <circle cx="20" cy="7" r="1.5" className="fill-red-500 stroke-none" />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center space-x-1.5 leading-none">
          <span className="font-cinzel text-base sm:text-lg font-black tracking-[0.2em] text-white uppercase group-hover:text-red-400 transition-colors">
            NOIR <span className="text-red-600">&</span> NEEDLE
          </span>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-[8.5px] tracking-[0.35em] text-zinc-400 uppercase font-mono font-medium">
            ATELIER D'ART • KYIV
          </span>
          <span className="w-1 h-1 rounded-full bg-red-600"></span>
          <span className="text-[8px] font-mono text-red-500 uppercase font-bold tracking-widest">
            EST. 2014
          </span>
        </div>
      </div>
    </div>
  );
};
