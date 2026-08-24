import React, { useState, useEffect } from 'react';
import { Language, PageTab } from '../types';
import { 
  Phone, 
  Clock, 
  CalendarCheck, 
  Send, 
  Globe, 
  ChevronRight,
  Menu,
  X,
  Layers,
  Sparkles,
  Film
} from 'lucide-react';
import { StudioLogo } from './StudioLogo';

interface NavbarProps {
  lang: Language;
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: (prefill?: any) => void;
  onOpenIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  lang, 
  currentTab,
  onSelectTab,
  onLanguageChange, 
  onOpenBooking,
  onOpenIntro
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTabs: { id: PageTab; labelUk: string; labelEn: string; badge?: string }[] = [
    { id: 'all', labelUk: 'Головна', labelEn: 'Atelier Home' },
    { id: 'gallery', labelUk: 'Галерея', labelEn: 'Portfolio', badge: '24+' },
    { id: 'flash', labelUk: 'Flash 1:1', labelEn: 'Flash Sets', badge: 'Exclusive' },
    { id: 'artists', labelUk: 'Майстри', labelEn: 'Masters' },
    { id: 'services', labelUk: 'Послуги & Калькулятор', labelEn: 'Prices & Calc' },
    { id: 'standards', labelUk: 'Стерильність', labelEn: 'Sterility' },
  ];

  const handleTabClick = (tabId: PageTab) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top micro announcement bar - sleek, dark, non-distracting */}
      <div className="bg-[#0c0c0f] border-b border-white/10 text-xs text-zinc-400 py-1.5 px-4 sm:px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-mono tracking-wider">
          <div className="flex items-center space-x-5">
            <span className="flex items-center text-zinc-300 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1.5 animate-pulse"></span>
              {lang === 'uk' ? 'Студія відкрита: Вт — Сб 11:00 — 20:00' : 'Studio Open: Tue — Sat 11:00 — 20:00'}
            </span>
            <span className="flex items-center text-zinc-400">
              <Clock className="w-3 h-3 mr-1 text-red-500" />
              {lang === 'uk' ? 'вул. Велика Васильківська, 42' : '42 Velyka Vasylkivska, Kyiv'}
            </span>
          </div>
          <div className="flex items-center space-x-4 uppercase font-semibold">
            {onOpenIntro && (
              <button
                onClick={onOpenIntro}
                className="text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                title={lang === 'uk' ? 'Відкрити кінематографічне арт-інтро' : 'Open Cinematic Art Reel'}
              >
                <Film className="w-2.5 h-2.5 text-red-500" />
                <span>{lang === 'uk' ? '🎬 Арт-Інтро' : '🎬 Intro Reel'}</span>
              </button>
            )}
            <span className="text-white/20">|</span>
            <a href="tel:+380449348821" className="text-zinc-300 hover:text-red-400 transition-colors flex items-center">
              <Phone className="w-2.5 h-2.5 mr-1 text-red-500" />
              +380 (44) 934-88-21
            </a>
            <span className="text-white/20">|</span>
            <a 
              href="https://t.me/noir_needle_kyiv" 
              target="_blank" 
              rel="noreferrer" 
              className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <Send className="w-2.5 h-2.5" />
              <span>Telegram Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation with page tab switcher */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-2' 
            : 'bg-[#09090b]/85 backdrop-blur-sm border-b border-white/10 py-2.5 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Official Studio Logo with quick home click */}
          <button 
            onClick={() => handleTabClick('all')} 
            className="flex items-center cursor-pointer text-left focus:outline-none"
          >
            <StudioLogo variant="full" />
          </button>

          {/* Desktop Tab Switcher (Modern Page Tabs) */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 bg-[#121216] rounded-none border border-white/10 font-mono text-xs uppercase tracking-wider">
            {navTabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-3 py-1.5 font-bold transition-all relative flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{lang === 'uk' ? tab.labelUk : tab.labelEn}</span>
                  {tab.badge && (
                    <span className={`text-[9px] px-1 py-0.2 rounded-none font-bold ${
                      isActive ? 'bg-red-700 text-white' : 'bg-red-950/80 text-red-400 border border-red-800/40'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons group */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Cinematic Intro Reel Button for quick re-immersion */}
            {onOpenIntro && (
              <button
                onClick={onOpenIntro}
                className="hidden xl:flex items-center space-x-1.5 px-3 py-2 border border-white/15 bg-[#121216] hover:border-red-500 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all font-mono cursor-pointer"
                title={lang === 'uk' ? 'Переглянути Арт-Інтро' : 'Watch Cinematic Reel'}
              >
                <Film className="w-3.5 h-3.5 text-red-500" />
                <span>{lang === 'uk' ? 'Інтро' : 'Reel'}</span>
              </button>
            )}

            {/* Telegram Direct Action Button */}
            <a
              href="https://t.me/noir_needle_kyiv"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-2 border border-white/15 bg-[#121216] hover:border-red-500 text-zinc-200 text-xs font-bold uppercase tracking-wider transition-all font-mono"
              title="Telegram Studio Direct"
            >
              <Send className="w-3 h-3 text-red-500" />
              <span>Direct</span>
            </a>

            {/* Language switch button */}
            <button
              onClick={() => onLanguageChange(lang === 'uk' ? 'en' : 'uk')}
              className="flex items-center space-x-1.5 px-3 py-2 border border-white/15 bg-[#121216] hover:border-red-500 text-zinc-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-mono"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-red-500" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Primary Hero Booking CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:flex items-center space-x-2 px-4 sm:px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white text-xs uppercase font-bold tracking-wider border border-red-500/50 transition-all duration-300 cursor-pointer shadow-lg font-mono"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-white" />
              <span>{lang === 'uk' ? 'Запис' : 'Book'}</span>
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 border border-white/15 text-white hover:text-red-400 bg-[#121216] cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown with page selection tabs in dark aesthetic */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e0e12] border-b border-white/15 px-5 pt-4 pb-6 mt-2 shadow-2xl animate-in slide-in-from-top-2">
            
            {/* Quick Intro Reel Trigger for Mobile */}
            {onOpenIntro && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenIntro();
                }}
                className="w-full mb-3 px-3.5 py-2.5 bg-red-950/40 border border-red-500/50 text-red-300 hover:text-white flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-red-500" />
                  <span>{lang === 'uk' ? '🎬 Переглянути Арт-Інтро' : '🎬 Watch Cinematic Intro'}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-red-400" />
              </button>
            )}

            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-3">
              {lang === 'uk' ? 'Розділи ательє:' : 'Studio Sections:'}
            </p>
            <div className="grid grid-cols-1 gap-2 mb-5">
              {navTabs.map((tab) => {
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-3.5 py-3 text-xs uppercase tracking-widest font-bold border transition-colors font-mono flex items-center justify-between text-left cursor-pointer ${
                      isActive 
                        ? 'bg-red-700 text-white border-red-500' 
                        : 'text-zinc-200 hover:text-white border-white/10 bg-[#14141a]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{lang === 'uk' ? tab.labelUk : tab.labelEn}</span>
                      {tab.badge && (
                        <span className={`text-[9px] px-1 py-0.2 font-bold ${
                          isActive ? 'bg-black text-white' : 'bg-red-950 text-red-400 border border-red-800/50'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-red-700 hover:bg-red-600 text-white font-bold text-xs tracking-wider uppercase transition-all font-mono shadow-md cursor-pointer border border-red-500/50"
            >
              <CalendarCheck className="w-4 h-4 text-white" />
              <span>{lang === 'uk' ? 'Онлайн-запис на сеанс' : 'Book Online Session'}</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};
