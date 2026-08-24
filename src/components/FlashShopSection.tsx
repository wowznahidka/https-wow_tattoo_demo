import React from 'react';
import { Language, FlashDesign } from '../types';
import { FLASH_DESIGNS } from '../data/mockData';
import { 
  Sparkles, 
  CalendarCheck, 
  Lock
} from 'lucide-react';

interface FlashShopProps {
  lang: Language;
  onReserveFlash: (flash: FlashDesign) => void;
}

export const FlashShopSection: React.FC<FlashShopProps> = ({ lang, onReserveFlash }) => {
  return (
    <section id="flash" className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-white/10 relative">
      <div className="text-center space-y-4 mb-14">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-red-600"></span>
          <span className="text-xs uppercase tracking-[0.3em] text-red-500 font-semibold font-mono">
            {lang === 'uk' ? 'Унікальні ескізи (1 of 1)' : 'Exclusive 1-of-1 Flash'}
          </span>
          <span className="h-px w-10 bg-red-600"></span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-white leading-tight">
          {lang === 'uk' ? 'Каталог вільних Flash-сетів' : 'Available Flash Art'}
        </h2>
        <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base">
          {lang === 'uk'
            ? 'Авторські готові концепти від наших резидентів. Кожен ескіз б’ється лише один раз і закріплюється за вами.'
            : 'Exclusive ready-to-ink flash designs. Each artwork is inked strictly once and reserved solely for you.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FLASH_DESIGNS.map((flash) => (
          <div
            key={flash.id}
            className={`group bg-[#121216] border p-6 flex flex-col justify-between transition-all duration-300 shadow-xl ${
              flash.isReserved
                ? 'border-white/5 opacity-50'
                : 'border-white/10 hover:border-red-500/60 hover:shadow-2xl'
            }`}
          >
            <div>
              {/* Image box */}
              <div className="aspect-[4/3] w-full bg-[#181820] border border-white/10 p-5 mb-5 relative overflow-hidden flex items-center justify-center">
                <img
                  src={flash.imageUrl}
                  alt={flash.title.uk}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  {flash.isReserved ? (
                    <span className="px-2.5 py-1 bg-black/80 text-zinc-500 text-[9px] font-bold uppercase tracking-widest flex items-center space-x-1 border border-white/10 font-mono">
                      <Lock className="w-3 h-3 mr-1" />
                      <span>{lang === 'uk' ? 'Заброньовано' : 'Reserved'}</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-red-700 text-white text-[9px] font-bold uppercase tracking-widest flex items-center space-x-1 font-mono">
                      <Sparkles className="w-3 h-3 mr-1" />
                      <span>{lang === 'uk' ? 'Вільний' : 'Available'}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Artist */}
              <div className="space-y-1">
                <span className="text-[10px] text-red-400 font-semibold uppercase tracking-[0.25em] font-mono block">
                  {flash.artistName}
                </span>
                <h3 className="font-serif italic text-xl text-white font-bold">
                  {lang === 'uk' ? flash.title.uk : flash.title.en}
                </h3>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 my-5 font-mono text-[11px]">
                <div className="p-3 bg-[#17171f] border border-white/10">
                  <span className="text-zinc-500 block text-[9px] uppercase tracking-wider font-semibold font-mono">
                    {lang === 'uk' ? 'Розмір' : 'Rec. Size'}
                  </span>
                  <span className="text-white font-medium">{flash.recommendedSizeCm}</span>
                </div>
                <div className="p-3 bg-[#17171f] border border-white/10">
                  <span className="text-zinc-500 block text-[9px] uppercase tracking-wider font-semibold font-mono">
                    {lang === 'uk' ? 'Тривалість' : 'Est. Time'}
                  </span>
                  <span className="text-white font-medium">~{flash.estimatedHours} {lang === 'uk' ? 'год.' : 'hrs'}</span>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-2xl font-serif italic text-white font-bold block">
                  {flash.priceUah.toLocaleString('uk-UA')} ₴
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  (~${flash.priceUsd})
                </span>
              </div>

              <button
                disabled={flash.isReserved}
                onClick={() => onReserveFlash(flash)}
                className={`px-4 py-2.5 text-xs uppercase font-bold tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer font-mono shadow-md ${
                  flash.isReserved
                    ? 'bg-[#181820] border border-white/10 text-zinc-600 cursor-not-allowed'
                    : 'bg-red-700 hover:bg-red-600 text-white border border-red-500/50'
                }`}
              >
                <CalendarCheck className="w-3.5 h-3.5 text-white" />
                <span>{lang === 'uk' ? 'Забронювати' : 'Claim Flash'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
