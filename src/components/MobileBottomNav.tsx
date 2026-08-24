import React from 'react';
import { Language, PageTab } from '../types';
import { 
  Home, 
  Image, 
  Sparkles, 
  Users, 
  Calculator, 
  CalendarCheck,
  ShieldCheck
} from 'lucide-react';

interface MobileBottomNavProps {
  lang: Language;
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onOpenBooking: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  lang,
  currentTab,
  onSelectTab,
  onOpenBooking,
}) => {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d0d0d]/95 backdrop-blur-xl border-t border-white/15 px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-[0_-8px_25px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between max-w-md mx-auto">
        
        {/* 1. Home / All */}
        <button
          onClick={() => {
            onSelectTab('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            currentTab === 'all' ? 'text-red-500 font-bold scale-105' : 'text-zinc-400 hover:text-zinc-200'
          }`}
          aria-label="Home"
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-mono tracking-tighter uppercase mt-0.5">
            {lang === 'uk' ? 'Студія' : 'Home'}
          </span>
          {currentTab === 'all' && (
            <span className="w-1 h-1 rounded-full bg-red-500 mt-0.5" />
          )}
        </button>

        {/* 2. Gallery 24+ */}
        <button
          onClick={() => {
            onSelectTab('gallery');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            currentTab === 'gallery' ? 'text-red-500 font-bold scale-105' : 'text-zinc-400 hover:text-zinc-200'
          }`}
          aria-label="Gallery"
        >
          <Image className="w-4 h-4" />
          <span className="text-[9px] font-mono tracking-tighter uppercase mt-0.5">
            {lang === 'uk' ? 'Галерея' : 'Works'}
          </span>
          {currentTab === 'gallery' && (
            <span className="w-1 h-1 rounded-full bg-red-500 mt-0.5" />
          )}
        </button>

        {/* 3. Flash 1-of-1 */}
        <button
          onClick={() => {
            onSelectTab('flash');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
            currentTab === 'flash' ? 'text-red-500 font-bold scale-105' : 'text-zinc-400 hover:text-zinc-200'
          }`}
          aria-label="Flash 1 of 1"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[9px] font-mono tracking-tighter uppercase mt-0.5">
            Flash 1:1
          </span>
          {currentTab === 'flash' && (
            <span className="w-1 h-1 rounded-full bg-red-500 mt-0.5" />
          )}
        </button>

        {/* 4. Resident Masters */}
        <button
          onClick={() => {
            onSelectTab('artists');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            currentTab === 'artists' ? 'text-red-500 font-bold scale-105' : 'text-zinc-400 hover:text-zinc-200'
          }`}
          aria-label="Artists"
        >
          <Users className="w-4 h-4" />
          <span className="text-[9px] font-mono tracking-tighter uppercase mt-0.5">
            {lang === 'uk' ? 'Майстри' : 'Artists'}
          </span>
          {currentTab === 'artists' && (
            <span className="w-1 h-1 rounded-full bg-red-500 mt-0.5" />
          )}
        </button>

        {/* 5. Cost Calculator */}
        <button
          onClick={() => {
            onSelectTab('services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            currentTab === 'services' ? 'text-red-500 font-bold scale-105' : 'text-zinc-400 hover:text-zinc-200'
          }`}
          aria-label="Calculator and Price"
        >
          <Calculator className="w-4 h-4" />
          <span className="text-[9px] font-mono tracking-tighter uppercase mt-0.5">
            {lang === 'uk' ? 'Ціни' : 'Prices'}
          </span>
          {currentTab === 'services' && (
            <span className="w-1 h-1 rounded-full bg-red-500 mt-0.5" />
          )}
        </button>

        {/* 6. Direct Book Floating Trigger */}
        <button
          onClick={onOpenBooking}
          className="ml-1 px-3 py-2 bg-red-700 hover:bg-red-600 text-white rounded font-mono uppercase tracking-widest text-[10px] font-bold flex items-center gap-1 shadow-lg cursor-pointer active:scale-95 transition-transform"
          aria-label="Book appointment"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>{lang === 'uk' ? 'Запис' : 'Book'}</span>
        </button>

      </div>
    </nav>
  );
};
