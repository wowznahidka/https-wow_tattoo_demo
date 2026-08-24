import React from 'react';
import { Language, ServiceItem } from '../types';
import { SERVICES } from '../data/mockData';
import { 
  Layers, 
  Sparkles, 
  Flame, 
  HelpCircle, 
  Zap, 
  RefreshCw, 
  ArrowRight,
  Clock
} from 'lucide-react';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onSelectService }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-red-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-red-500" />;
      case 'Layers': return <Layers className="w-5 h-5 text-red-500" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5 text-red-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-red-500" />;
      default: return <RefreshCw className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-white/10 relative">
      <div className="text-center space-y-4 mb-14">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-red-600"></span>
          <span className="text-xs uppercase tracking-[0.3em] text-red-500 font-semibold font-mono">
            {lang === 'uk' ? 'Послуги ательє' : 'Studio Services'}
          </span>
          <span className="h-px w-10 bg-red-600"></span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-white leading-tight">
          {lang === 'uk' ? 'Повний спектр послуг' : 'Services & Pricing'}
        </h2>
        <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base">
          {lang === 'uk'
            ? 'Від первинної безкоштовної консультації та підбору ескізу до складних багатосесійних проектів і пірсингу.'
            : 'From initial free consultations to complex multi-session cover-ups and titanium piercing.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((srv) => (
          <div
            key={srv.id}
            className={`bg-[#121216] border p-6 flex flex-col justify-between transition-all duration-300 shadow-xl ${
              srv.popular 
                ? 'border-red-500/80 relative ring-1 ring-red-500/30' 
                : 'border-white/10 hover:border-white/30'
            }`}
          >
            {srv.popular && (
              <span className="absolute -top-3 right-6 bg-red-700 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 font-mono">
                {lang === 'uk' ? 'Популярне' : 'Popular'}
              </span>
            )}

            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#181820] border border-white/10 flex items-center justify-center">
                {getIcon(srv.iconName)}
              </div>

              <div>
                <h3 className="font-serif italic text-2xl text-white font-bold">
                  {lang === 'uk' ? srv.title.uk : srv.title.en}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2 font-sans">
                  {lang === 'uk' ? srv.description.uk : srv.description.en}
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs text-zinc-400 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                <span>{lang === 'uk' ? `Тривалість: ${srv.duration.uk}` : `Duration: ${srv.duration.en}`}</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold block font-mono">
                  {lang === 'uk' ? 'Вартість' : 'Price'}
                </span>
                <span className="text-2xl font-serif italic text-white font-bold">
                  {srv.priceFromUah === 0 
                    ? (lang === 'uk' ? 'Безкоштовно' : 'Free')
                    : `${lang === 'uk' ? 'від ' : 'from '}${srv.priceFromUah.toLocaleString('uk-UA')} ₴`}
                </span>
              </div>

              <button
                onClick={() => onSelectService(srv)}
                className="p-3 bg-[#181820] border border-white/15 text-zinc-200 hover:text-white hover:border-red-500 hover:bg-red-700 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-mono"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
