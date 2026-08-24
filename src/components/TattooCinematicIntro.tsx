import React, { useState, useEffect, useCallback } from 'react';
import { Language, PageTab } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  CalendarCheck, 
  ShieldCheck,
  X,
  Image,
  Flame,
  ChevronRight,
  Users,
  Film
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TattooCinematicIntroProps {
  lang: Language;
  onEnterStudio: (targetTab?: PageTab) => void;
  onQuickBook: () => void;
}

export const TattooCinematicIntro: React.FC<TattooCinematicIntroProps> = ({
  lang,
  onEnterStudio,
  onQuickBook
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      img: '/tattoos/photo_1_19_07_2024_13_03_11.jpg',
      tagUk: 'Blackwork & Анатомія',
      tagEn: 'Blackwork & Anatomy',
      quoteUk: '«Твоє тіло — це полотно. Ми створюємо вічність.»',
      quoteEn: '“Your body is a canvas. We forge eternity.”',
      authorUk: 'Олексій "Obsidian" • Засновник',
      authorEn: 'Oleksiy "Obsidian" • Founder',
      targetTab: 'gallery' as PageTab
    },
    {
      img: '/tattoos/photo_2_19_07_2024_13_08_08.jpg',
      tagUk: 'Мікро-Файнлайн',
      tagEn: 'Micro Fine Line',
      quoteUk: '«Тонкість лінії, що витримує перевірку часом.»',
      quoteEn: '“The delicacy of a line that stands the test of time.”',
      authorUk: 'Марія "Vesper" • Резидент студії',
      authorEn: 'Mariia "Vesper" • Resident',
      targetTab: 'artists' as PageTab
    },
    {
      img: '/tattoos/photo_3_19_07_2024_13_08_38.jpg',
      tagUk: 'Нео-Японський Irezumi',
      tagEn: 'Neo-Japanese Irezumi',
      quoteUk: '«Символізм самураїв та міфологія Сходу у кожному штриху.»',
      quoteEn: '“Samurai symbolism and Eastern mythology in every stroke.”',
      authorUk: 'Ярослав "Kitsune" • Спеціаліст Irezumi',
      authorEn: 'Yaroslav "Kitsune" • Irezumi Master',
      targetTab: 'flash' as PageTab
    },
    {
      img: '/tattoos/photo_5_19_07_2024_13_10_04.jpg',
      tagUk: 'Гіперреалізм & Світлотінь',
      tagEn: 'Hyperrealism & Chiaroscuro',
      quoteUk: '«Глибина тіней та деталізація музейного рівня.»',
      quoteEn: '“Depth of shadows matching museum-grade fine art.”',
      authorUk: 'Богдан "Vanguard" • Реаліст',
      authorEn: 'Bohdan "Vanguard" • Realist',
      targetTab: 'services' as PageTab
    }
  ];

  // Next / Prev handlers
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Keyboard navigation: ESC to enter studio, Arrows to change slide
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEnterStudio('all');
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, onEnterStudio]);

  // Auto slide loop unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  const current = slides[currentSlide];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 h-[100dvh] max-h-[100dvh] w-full bg-[#060607] text-[#f4f4f2] flex flex-col justify-between overflow-hidden select-none font-sans"
    >
      {/* Background Slideshow with smooth fade */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.img}
              alt="Tattoo artwork"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-125 saturate-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-black/85" />
          </div>
        ))}
      </div>

      {/* Top Sleek Compact Bar with Direct Sync to Site */}
      <header className="relative z-20 px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-black/50">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 bg-red-700 border border-white/20 flex items-center justify-center shadow-md">
            <span className="font-serif font-black text-white text-xs">N</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase font-serif">
                NOIR & NEEDLE<span className="text-red-500">.</span>
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            </div>
            <span className="text-[9px] tracking-[0.2em] text-zinc-400 uppercase block font-mono">
              KYIV BESPOKE TATTOO ATELIER
            </span>
          </div>
        </div>

        {/* Quick Menu Connection Hub */}
        <div className="flex items-center space-x-2 sm:space-x-3 font-mono text-xs">
          
          {/* Direct Menu Sections Jump */}
          <div className="hidden md:flex items-center space-x-1 p-0.5 bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-wider">
            <button
              onClick={() => onEnterStudio('gallery')}
              className="px-2.5 py-1 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {lang === 'uk' ? 'Галерея' : 'Gallery'}
            </button>
            <button
              onClick={() => onEnterStudio('flash')}
              className="px-2.5 py-1 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Flash 1:1
            </button>
            <button
              onClick={() => onEnterStudio('artists')}
              className="px-2.5 py-1 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {lang === 'uk' ? 'Майстри' : 'Artists'}
            </button>
            <button
              onClick={() => onEnterStudio('services')}
              className="px-2.5 py-1 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {lang === 'uk' ? 'Ціни' : 'Prices'}
            </button>
          </div>

          {/* Quick Enter Atelier */}
          <button
            type="button"
            onClick={() => onEnterStudio('all')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-700 hover:bg-red-600 border border-red-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-95"
          >
            <span>{lang === 'uk' ? 'Увійти в студію' : 'Enter Studio'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Direct Close (X) icon */}
          <button
            type="button"
            onClick={() => onEnterStudio('all')}
            className="p-1.5 bg-white/5 hover:bg-white/20 border border-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title={lang === 'uk' ? 'Закрити інтро (Esc)' : 'Close intro (Esc)'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Center Area - Perfectly Framed within 100vh */}
      <main className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 w-full flex flex-col justify-center items-center text-center my-auto py-2">
        
        {/* Style Badge & Slide Counter */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-950/90 border border-red-500/50 text-red-300 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] shadow-sm">
            <Flame className="w-3 h-3 text-red-500" />
            <span>{lang === 'uk' ? current.tagUk : current.tagEn}</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 bg-black/60 border border-white/10">
            0{currentSlide + 1} / 0{slides.length}
          </span>
        </div>

        {/* Master quote */}
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif italic text-white leading-snug sm:leading-tight mb-2 sm:mb-3 tracking-wide max-w-3xl drop-shadow-xl line-clamp-2 sm:line-clamp-none">
          {lang === 'uk' ? current.quoteUk : current.quoteEn}
        </h1>

        {/* Master Signature */}
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3 sm:mb-5">
          <span className="w-4 sm:w-8 h-px bg-red-700/80" />
          <span className="text-zinc-300 font-semibold">{lang === 'uk' ? current.authorUk : current.authorEn}</span>
          <span className="w-4 sm:w-8 h-px bg-red-700/80" />
        </div>

        {/* Slide navigation pills */}
        <div className="flex items-center gap-1.5 mb-4 sm:mb-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-red-600' : 'w-2.5 bg-white/25 hover:bg-white/50'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Streamlined Quick Action Hub - Synchronized with Menu Sections */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-2.5 text-left">
          
          {/* Card 1: Fast Booking */}
          <button
            type="button"
            onClick={onQuickBook}
            className="group p-2.5 sm:p-3 border border-red-500/70 bg-red-950/40 hover:bg-red-900/60 text-left flex items-center justify-between cursor-pointer transition-all font-mono hover:scale-[1.02] active:scale-95 shadow-md col-span-2 sm:col-span-1"
          >
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-red-400 font-bold block">
                01. {lang === 'uk' ? 'Запис' : 'Booking'}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide truncate">
                {lang === 'uk' ? 'Забронювати' : 'Book Session'}
              </p>
            </div>
            <CalendarCheck className="w-4 h-4 text-red-400 shrink-0 ml-2 group-hover:scale-110 transition-transform" />
          </button>

          {/* Card 2: Gallery Works 24+ (Links to Gallery Menu Tab) */}
          <button
            type="button"
            onClick={() => onEnterStudio('gallery')}
            className="group p-2.5 sm:p-3 border border-white/20 bg-black/60 hover:bg-white/10 text-left flex items-center justify-between cursor-pointer transition-all font-mono hover:scale-[1.02] active:scale-95"
          >
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block">
                02. {lang === 'uk' ? 'Галерея' : 'Gallery'}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide truncate">
                {lang === 'uk' ? '24+ Робіт' : '24+ Works'}
              </p>
            </div>
            <Image className="w-4 h-4 text-zinc-300 shrink-0 ml-2 group-hover:text-red-400 transition-colors" />
          </button>

          {/* Card 3: Flash Shop 1 of 1 (Links to Flash Menu Tab) */}
          <button
            type="button"
            onClick={() => onEnterStudio('flash')}
            className="group p-2.5 sm:p-3 border border-white/20 bg-black/60 hover:bg-white/10 text-left flex items-center justify-between cursor-pointer transition-all font-mono hover:scale-[1.02] active:scale-95"
          >
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block">
                03. Flash 1:1
              </span>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide truncate">
                {lang === 'uk' ? 'Flash-ескізи' : 'Flash Sets'}
              </p>
            </div>
            <Sparkles className="w-4 h-4 text-zinc-300 shrink-0 ml-2 group-hover:text-red-400 transition-colors" />
          </button>

          {/* Card 4: Resident Masters (Links to Artists Menu Tab) */}
          <button
            type="button"
            onClick={() => onEnterStudio('artists')}
            className="group p-2.5 sm:p-3 border border-white/20 bg-black/60 hover:bg-white/10 text-left flex items-center justify-between cursor-pointer transition-all font-mono hover:scale-[1.02] active:scale-95"
          >
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block">
                04. {lang === 'uk' ? 'Майстри' : 'Artists'}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide truncate">
                {lang === 'uk' ? '6 Резидентів' : '6 Masters'}
              </p>
            </div>
            <Users className="w-4 h-4 text-zinc-300 shrink-0 ml-2 group-hover:text-red-400 transition-colors" />
          </button>

          {/* Card 5: Cost Estimator (Links to Services Menu Tab) */}
          <button
            type="button"
            onClick={() => onEnterStudio('services')}
            className="group p-2.5 sm:p-3 border border-white/20 bg-black/60 hover:bg-white/10 text-left flex items-center justify-between cursor-pointer transition-all font-mono hover:scale-[1.02] active:scale-95"
          >
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block">
                05. {lang === 'uk' ? 'Прайс' : 'Price'}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide truncate">
                {lang === 'uk' ? 'Калькулятор' : 'Calculator'}
              </p>
            </div>
            <Calculator className="w-4 h-4 text-zinc-300 shrink-0 ml-2 group-hover:text-red-400 transition-colors" />
          </button>

        </div>
      </main>

      {/* Bottom Compact Footer Bar */}
      <footer className="relative z-20 px-4 sm:px-8 py-2 sm:py-2.5 flex items-center justify-between border-t border-white/10 backdrop-blur-md bg-black/70 text-[10px] sm:text-[11px] text-zinc-400 font-mono">
        <div className="flex items-center space-x-3 truncate">
          <span className="flex items-center text-zinc-300">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500 mr-1 shrink-0" />
            <span className="truncate">{lang === 'uk' ? 'Стерильність Class B (Автоклав)' : 'Class B Medical Sterility'}</span>
          </span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span className="hidden sm:inline text-zinc-400">
            {lang === 'uk' ? 'Київ, вул. Велика Васильківська, 42' : 'Kyiv, Velyka Vasylkivska 42'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onEnterStudio('all')}
          className="flex items-center space-x-1 text-white hover:text-red-400 font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ml-2"
        >
          <span>{lang === 'uk' ? 'Перейти до студії' : 'Enter Atelier'}</span>
          <ChevronRight className="w-3.5 h-3.5 text-red-500" />
        </button>
      </footer>
    </motion.div>
  );
};
