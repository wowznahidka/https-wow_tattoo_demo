import React, { useState, useEffect } from 'react';
import { Language, TattooStyle } from '../types';
import { 
  Sparkles, 
  CalendarCheck, 
  Calculator, 
  ArrowRight, 
  ShieldCheck,
  Star,
  Users,
  Eye,
  Check,
  Flame,
  Layers,
  Clock,
  Compass,
  Film
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  lang: Language;
  onOpenBooking: (prefill?: any) => void;
  onOpenIntro?: () => void;
}

interface HeroPhotoItem {
  id: string;
  img: string;
  style: TattooStyle;
  styleLabelUk: string;
  styleLabelEn: string;
  titleUk: string;
  titleEn: string;
  artistName: string;
  placementUk: string;
  placementEn: string;
  duration: string;
}

const HERO_FEATURED_WORKS: HeroPhotoItem[] = [
  {
    id: 'hero-1',
    img: '/tattoos/photo_1_19_07_2024_13_03_11.jpg',
    style: 'blackwork',
    styleLabelUk: 'Blackwork & Geometry',
    styleLabelEn: 'Blackwork & Geometry',
    titleUk: 'Монументальний чорний рукав',
    titleEn: 'Monumental Black Sleeve',
    artistName: 'Олексій "Obsidian"',
    placementUk: 'Повний рукав',
    placementEn: 'Full Sleeve',
    duration: '2 сеанси'
  },
  {
    id: 'hero-2',
    img: '/tattoos/photo_2_19_07_2024_13_08_08.jpg',
    style: 'fineline',
    styleLabelUk: 'Fine Line & Ботаніка',
    styleLabelEn: 'Fine Line & Botanical',
    titleUk: 'Невагома півонія 1RL',
    titleEn: 'Delicate Single-Needle Peony',
    artistName: 'Марія "Vesper"',
    placementUk: 'Передпліччя',
    placementEn: 'Forearm',
    duration: '2.5 год.'
  },
  {
    id: 'hero-3',
    img: '/tattoos/photo_3_19_07_2024_13_08_38.jpg',
    style: 'japanese',
    styleLabelUk: 'Neo-Japanese Irezumi',
    styleLabelEn: 'Neo-Japanese Irezumi',
    titleUk: 'Маска Ханья та хвилі',
    titleEn: 'Hannya Mask & Waves',
    artistName: 'Ярослав "Kitsune"',
    placementUk: 'Стегно',
    placementEn: 'Thigh',
    duration: '4 год.'
  },
  {
    id: 'hero-4',
    img: '/tattoos/photo_5_19_07_2024_13_10_04.jpg',
    style: 'microrealism',
    styleLabelUk: 'Мікрореалізм & Тіні',
    styleLabelEn: 'Micro-Realism & Shadows',
    titleUk: 'Антична скульптура',
    titleEn: 'Antique Sculpture Study',
    artistName: 'Богдан "Vanguard"',
    placementUk: 'Плече',
    placementEn: 'Shoulder',
    duration: '3.5 год.'
  },
  {
    id: 'hero-5',
    img: '/tattoos/photo_7_19_07_2024_13_22_47.jpg',
    style: 'blackwork',
    styleLabelUk: 'Dark Blackwork',
    styleLabelEn: 'Dark Blackwork',
    titleUk: 'Крук серед темних тернів',
    titleEn: 'Raven in Dark Thorns',
    artistName: 'Олексій "Obsidian"',
    placementUk: 'Ребра',
    placementEn: 'Ribs',
    duration: '4 год.'
  },
  {
    id: 'hero-6',
    img: '/tattoos/photo_8_19_07_2024_13_25_29.jpg',
    style: 'fineline',
    styleLabelUk: 'Fine Line Мікроарт',
    styleLabelEn: 'Fine Line Micro Art',
    titleUk: 'Анатомічний кинджал зі змією',
    titleEn: 'Anatomical Dagger & Serpent',
    artistName: 'Марія "Vesper"',
    placementUk: 'Гомілка',
    placementEn: 'Calf',
    duration: '3 год.'
  },
  {
    id: 'hero-7',
    img: '/tattoos/photo_9_19_07_2024_14_40_10.jpg',
    style: 'japanese',
    styleLabelUk: 'Japanese Folklore',
    styleLabelEn: 'Japanese Folklore',
    titleUk: 'Лисиця Кіцуне в тумані',
    titleEn: 'Kitsune Spirit in Mist',
    artistName: 'Ярослав "Kitsune"',
    placementUk: 'Спина',
    placementEn: 'Back',
    duration: '5 год.'
  },
  {
    id: 'hero-8',
    img: '/tattoos/photo_12_19_07_2024_14_40_10.jpg',
    style: 'ornamental',
    styleLabelUk: 'Орнаментал вздовж хребта',
    styleLabelEn: 'Spine Ornamental Geometry',
    titleUk: 'Сакральна геометрія хребта',
    titleEn: 'Sacred Spine Geometry',
    artistName: 'Олексій "Obsidian"',
    placementUk: 'Хребет',
    placementEn: 'Spine',
    duration: '4.5 год.'
  }
];

const STYLE_CHIPS: { id: string; labelUk: string; labelEn: string }[] = [
  { id: 'all', labelUk: 'Усі стилі', labelEn: 'All Styles' },
  { id: 'blackwork', labelUk: 'Blackwork', labelEn: 'Blackwork' },
  { id: 'fineline', labelUk: 'Fine Line', labelEn: 'Fine Line' },
  { id: 'microrealism', labelUk: 'Реалізм', labelEn: 'Realism' },
  { id: 'japanese', labelUk: 'Японія', labelEn: 'Japanese' }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, onOpenBooking, onOpenIntro }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  const filteredWorks = selectedFilter === 'all' 
    ? HERO_FEATURED_WORKS 
    : HERO_FEATURED_WORKS.filter(w => w.style === selectedFilter);

  const activeWork = filteredWorks[activePhotoIndex % filteredWorks.length] || HERO_FEATURED_WORKS[0];

  // Auto cycle spotlight every 4.5s unless hovered
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % filteredWorks.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isAutoCycling, filteredWorks.length]);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-4 sm:pt-6 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/10">
      
      {/* Background Subtle Ink Mist & Guide Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/5 w-[500px] h-[350px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-10 right-1/4 w-[400px] h-[300px] bg-zinc-800/20 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-8 md:left-20 w-px h-full bg-white/[0.03]" />
        <div className="absolute top-0 right-8 md:right-20 w-px h-full bg-white/[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Top SEO & Live Atelier Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 pb-3.5 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-950/60 border border-red-500/40 text-red-300 font-bold uppercase tracking-wider text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {lang === 'uk' ? 'Студія у центрі Києва • вул. Велика Васильківська, 42' : 'Kyiv Atelier • 42 Velyka Vasylkivska'}
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 text-zinc-400 text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <strong className="text-white font-bold">4.98</strong>
              <span>(2 400+ {lang === 'uk' ? 'загоєних робіт' : 'healed works'})</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
            <Clock className="w-3 h-3 text-red-500" />
            <span>{lang === 'uk' ? 'Вт — Сб 11:00 — 20:00' : 'Tue — Sat 11:00 — 20:00'}</span>
          </div>
        </div>

        {/* Main Hero Grid: Left Content (Organic, Non-AI) + Right Motion Visual Reel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (5 Cols): Punchy Human Text, SEO, Compact CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Semantic SEO Tag */}
            <p className="text-red-400 font-mono text-[11px] font-bold uppercase tracking-[0.22em] mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'uk' ? 'Ательє авторського татуювання' : 'Bespoke Tattoo Atelier Kyiv'}</span>
            </p>

            {/* Main Punchy Display Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-[1.08] mb-4">
              {lang === 'uk' ? (
                <>
                  Створюємо тату, <br className="hidden sm:inline" />
                  <span className="italic font-normal text-zinc-200">якими пишаються</span> <br />
                  все життя.
                </>
              ) : (
                <>
                  Crafting ink <br className="hidden sm:inline" />
                  <span className="italic font-normal text-zinc-200">you wear with pride</span> <br />
                  for a lifetime.
                </>
              )}
            </h1>

            {/* Organic, Real Human Description (Concise & Focused) */}
            <p className="text-zinc-300 text-sm sm:text-[15px] leading-relaxed mb-6 font-normal">
              {lang === 'uk'
                ? 'Ніяких шаблонів з Pinterest. Тільки індивідуальна розробка ескізу під твою анатомію, медична стерилізація Class B та майстри вузьких художніх стилів.'
                : 'No generic Pinterest clones. Pure bespoke anatomy-fitted custom art, certified Class B medical sterilization, and dedicated master specialists.'}
            </p>

            {/* Key Trust Micro-Bullets */}
            <div className="grid grid-cols-2 gap-2 mb-6 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{lang === 'uk' ? 'Ескізи 1-of-1' : '1-of-1 Custom Art'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{lang === 'uk' ? '100% Стерильно' : 'Class B Autoclave'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{lang === 'uk' ? '6 Топ-резидентів' : '6 Master Artists'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{lang === 'uk' ? 'Прозора вартість' : 'Fixed Clear Pricing'}</span>
              </div>
            </div>

            {/* Ergonomic Compact CTA Action Hub (No Bloated Big Buttons) */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
              
              {/* 1. Primary Compact Booking Button */}
              <button
                onClick={() => onOpenBooking()}
                className="px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-lg cursor-pointer border border-red-500/50 group"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-white" />
                <span>{lang === 'uk' ? 'Запис на сеанс' : 'Book Session'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* 2. Compact Secondary Gallery Button */}
              <a
                href="#gallery"
                className="px-4 py-2.5 bg-[#14141a] hover:bg-[#1c1c24] text-zinc-200 hover:text-white border border-white/15 hover:border-white/35 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-red-400" />
                <span>{lang === 'uk' ? 'Галерея (24+)' : 'Gallery (24+)'}</span>
              </a>

              {/* 3. Compact Calculator Quick Trigger */}
              <a
                href="#calculator"
                className="px-3.5 py-2.5 bg-transparent hover:bg-white/5 text-zinc-400 hover:text-red-400 border border-white/10 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                title={lang === 'uk' ? 'Розрахувати вартість тату онлайн' : 'Calculate tattoo cost'}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'uk' ? 'Калькулятор' : 'Calculator'}</span>
              </a>

              {/* 4. Cinematic Intro Quick Re-immersion */}
              {onOpenIntro && (
                <button
                  type="button"
                  onClick={onOpenIntro}
                  className="px-3.5 py-2.5 bg-transparent hover:bg-red-950/40 text-zinc-400 hover:text-white border border-white/10 hover:border-red-500/40 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                  title={lang === 'uk' ? 'Переглянути арт-інтро' : 'Watch Cinematic Intro'}
                >
                  <Film className="w-3.5 h-3.5 text-red-500" />
                  <span>{lang === 'uk' ? 'Інтро' : 'Intro'}</span>
                </button>
              )}
            </div>

            {/* Quick Micro-Consult Callout */}
            <div className="p-3 bg-[#111116] border border-white/10 text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span className="truncate mr-2">
                {lang === 'uk' ? 'Є власна ідея або фото?' : 'Have your own sketch or idea?'}
              </span>
              <button
                onClick={() => onOpenBooking({ serviceTitle: 'Безкоштовна консультація & Оцінка ескізу' })}
                className="text-red-400 hover:text-red-300 font-bold uppercase tracking-wider shrink-0 underline decoration-red-500/50 underline-offset-2 cursor-pointer"
              >
                {lang === 'uk' ? 'Оцінити безкоштовно →' : 'Get Free Estimate →'}
              </button>
            </div>

          </div>

          {/* Right Column (7 Cols): Motion Visual Showcase (Людина купує очима) */}
          <div 
            className="lg:col-span-7 relative"
            onMouseEnter={() => setIsAutoCycling(false)}
            onMouseLeave={() => setIsAutoCycling(true)}
          >
            
            {/* Style Filter Chips to Dynamically Explore Real Tattoos */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
                {STYLE_CHIPS.map((chip) => {
                  const isActive = selectedFilter === chip.id;
                  return (
                    <button
                      key={chip.id}
                      onClick={() => {
                        setSelectedFilter(chip.id);
                        setActivePhotoIndex(0);
                      }}
                      className={`px-2.5 py-1 text-[10px] font-mono uppercase font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap border ${
                        isActive
                          ? 'bg-white text-black border-white shadow-sm'
                          : 'bg-[#121216] text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {lang === 'uk' ? chip.labelUk : chip.labelEn}
                    </button>
                  );
                })}
              </div>

              <span className="text-[10px] font-mono text-zinc-500 uppercase shrink-0 hidden sm:inline">
                {activePhotoIndex + 1} / {filteredWorks.length}
              </span>
            </div>

            {/* Featured Visual Motion Card with Dynamic Crossfade */}
            <div className="relative bg-[#111116] border border-white/20 overflow-hidden shadow-2xl group">
              
              {/* Large Spotlight Image Frame */}
              <div className="relative h-[290px] sm:h-[360px] md:h-[400px] w-full overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeWork.id}
                    src={activeWork.img}
                    alt={activeWork.titleUk}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="w-full h-full object-cover object-center contrast-110 brightness-95"
                  />
                </AnimatePresence>

                {/* Dark Gradient Overlay for legible typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

                {/* Top Badge: Style & Master */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono uppercase font-bold tracking-wider">
                    {lang === 'uk' ? activeWork.styleLabelUk : activeWork.styleLabelEn}
                  </span>
                  <span className="px-2 py-1 bg-red-700/90 text-white text-[9px] font-mono uppercase font-bold tracking-widest">
                    1-of-1
                  </span>
                </div>

                {/* Bottom Overlay Info Strip */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-white font-serif italic text-lg sm:text-xl font-bold leading-tight mb-1">
                      {lang === 'uk' ? activeWork.titleUk : activeWork.titleEn}
                    </p>
                    <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-[11px] font-mono text-zinc-300">
                      <span className="text-red-400 font-bold">{activeWork.artistName}</span>
                      <span className="text-zinc-600">•</span>
                      <span>{lang === 'uk' ? activeWork.placementUk : activeWork.placementEn}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400">{activeWork.duration}</span>
                    </div>
                  </div>

                  {/* Quick Action to Book Similar */}
                  <button
                    onClick={() => onOpenBooking({
                      artistName: activeWork.artistName,
                      serviceTitle: `Схоже на: ${activeWork.titleUk}`,
                      placement: activeWork.placementUk,
                      conceptDescription: `Орієнтир: стиль ${activeWork.style}, робота майстра ${activeWork.artistName}`
                    })}
                    className="px-3.5 py-2 bg-red-700 hover:bg-red-600 text-white text-[11px] font-mono uppercase font-bold tracking-wider shrink-0 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer border border-red-500/50"
                  >
                    <span>{lang === 'uk' ? 'Хочу схоже' : 'Book Similar'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Bottom Interactive Thumbnail Filmstrip */}
              <div className="p-2 sm:p-2.5 bg-[#0c0c10] border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
                {filteredWorks.map((work, index) => {
                  const isSelected = activeWork.id === work.id;
                  return (
                    <button
                      key={work.id}
                      onClick={() => setActivePhotoIndex(index)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 border transition-all cursor-pointer overflow-hidden ${
                        isSelected 
                          ? 'border-red-500 ring-2 ring-red-500/40 opacity-100 scale-95' 
                          : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                      }`}
                      title={work.titleUk}
                    >
                      <img
                        src={work.img}
                        alt={work.titleUk}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-25"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-red-600/10 pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

        {/* Minimalist Live Studio Metrics Strip (Compact, High-Contrast) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-8 sm:mt-10 pt-6 border-t border-white/10 font-mono">
          <div className="p-3 sm:p-3.5 bg-[#111116] border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{lang === 'uk' ? 'Досвід' : 'Experience'}</p>
              <p className="text-base sm:text-lg font-bold text-white">10+ {lang === 'uk' ? 'років' : 'years'}</p>
            </div>
            <span className="text-[10px] text-red-400 font-bold">EST. 2014</span>
          </div>

          <div className="p-3 sm:p-3.5 bg-[#111116] border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{lang === 'uk' ? 'Загоєних робіт' : 'Healed Works'}</p>
              <p className="text-base sm:text-lg font-bold text-white">2 400+</p>
            </div>
            <span className="text-[10px] text-zinc-400">★ 4.98</span>
          </div>

          <div className="p-3 sm:p-3.5 bg-[#111116] border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{lang === 'uk' ? 'Резиденти' : 'Masters'}</p>
              <p className="text-base sm:text-lg font-bold text-white">6 {lang === 'uk' ? 'майстрів' : 'artists'}</p>
            </div>
            <span className="text-[10px] text-red-400">1-of-1</span>
          </div>

          <div className="p-3 sm:p-3.5 bg-[#111116] border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{lang === 'uk' ? 'Стерильність' : 'Sterility'}</p>
              <p className="text-base sm:text-lg font-bold text-white">Class B</p>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">100% Safe</span>
          </div>
        </div>

      </div>
    </section>
  );
};
