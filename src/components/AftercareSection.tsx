import React, { useState } from 'react';
import { Language } from '../types';
import { AFTERCARE_TIMELINE } from '../data/mockData';
import { 
  ShieldCheck, 
  Droplets, 
  Sparkles, 
  Sun, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

interface AftercareSectionProps {
  lang: Language;
}

export const AftercareSection: React.FC<AftercareSectionProps> = ({ lang }) => {
  const [activeStage, setActiveStage] = useState(0);

  const getStageIcon = (idx: number) => {
    switch (idx) {
      case 0: return <ShieldCheck className="w-5 h-5 text-red-500" />;
      case 1: return <Droplets className="w-5 h-5 text-red-500" />;
      case 2: return <Sparkles className="w-5 h-5 text-red-500" />;
      default: return <Sun className="w-5 h-5 text-red-500" />;
    }
  };

  const dosAndDonts = {
    dos: [
      { uk: 'Використовуйте тільки спеціальну загоювальну мазь (Doctor Pro / Бепантен)', en: 'Use dedicated tattoo aftercare ointment (Panthenol based)' },
      { uk: 'Мийте тату тільки теплими чистими руками з рідким антибактеріальним милом', en: 'Wash only with clean hands using mild antibacterial liquid soap' },
      { uk: 'Промокайте паперовими рушниками, не тріть звичайним текстильним', en: 'Pat dry with clean paper towels, never rub with cloth towels' },
      { uk: 'Завжди наносьте крем SPF 50+ на сонячному світлі після повного загоєння', en: 'Always apply SPF 50+ sunscreen outdoors after complete recovery' },
    ],
    donts: [
      { uk: 'Категорично заборонено сауни, басейни, відкриті водойми та гарячі ванни (14 днів)', en: 'No saunas, swimming pools, hot tubs or baths for 14 days' },
      { uk: 'Не здирайте лусочки та не чухайте шкіру під час лущення', en: 'Never scratch, pick, or peel flaking skin during regeneration' },
      { uk: 'Уникайте інтенсивних тренувань у спортзалі перші 3-4 дні', en: 'Avoid heavy gym workouts and excessive sweating for the first 3-4 days' },
      { uk: 'Не наносьте спиртові антисептики, перекис водню або звичайні лосьйони', en: 'Never use alcohol, hydrogen peroxide, or perfumed cosmetic lotions' },
    ]
  };

  return (
    <section id="aftercare" className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-white/10 relative">
      <div className="text-center space-y-4 mb-14">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-red-600"></span>
          <span className="text-xs uppercase tracking-[0.3em] text-red-500 font-semibold font-mono">
            {lang === 'uk' ? 'Гід по загоєнню' : 'Aftercare Manual'}
          </span>
          <span className="h-px w-10 bg-red-600"></span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-white leading-tight">
          {lang === 'uk' ? 'Правильний догляд за татуюванням' : 'Tattoo Aftercare & Recovery'}
        </h2>
        <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base">
          {lang === 'uk'
            ? '50% успіху та контрасту свіжого тату залежить від правильного догляду у перші тижні. Дотримуйтесь нашого протоколу.'
            : '50% of the long-term vibrancy and crispness depends on the initial healing routine. Follow our clinical protocol.'}
        </p>
      </div>

      {/* Interactive Timeline Tabs */}
      <div className="bg-[#121216] border border-white/10 p-6 sm:p-8 space-y-8 mb-12 shadow-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {AFTERCARE_TIMELINE.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStage(idx)}
              className={`p-4 border text-left transition-all cursor-pointer flex items-center space-x-3 ${
                activeStage === idx
                  ? 'border-red-500 bg-red-950/70 text-white shadow-md'
                  : 'border-white/10 bg-[#16161c] text-zinc-400 hover:text-white hover:border-white/30'
              }`}
            >
              <div className={`p-2 border ${activeStage === idx ? 'bg-black/60 text-white border-red-500/50' : 'bg-[#121216] text-zinc-400 border-white/10'}`}>
                {getStageIcon(idx)}
              </div>
              <div className="truncate">
                <span className={`text-[9px] uppercase font-bold block font-mono ${activeStage === idx ? 'text-red-400' : 'text-zinc-500'}`}>
                  {lang === 'uk' ? `Етап 0${idx + 1}` : `Stage 0${idx + 1}`}
                </span>
                <span className={`text-xs font-semibold block truncate ${activeStage === idx ? 'text-white' : 'text-zinc-300'}`}>
                  {lang === 'uk' ? step.stage.uk : step.stage.en}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Display */}
        <div className="bg-[#17171e] border border-white/10 p-6 sm:p-8 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center space-x-3">
            <span className="p-2.5 bg-[#121216] text-red-500 border border-white/10">
              {getStageIcon(activeStage)}
            </span>
            <div>
              <span className="text-[10px] text-red-400 uppercase tracking-widest font-semibold font-mono">
                {lang === 'uk' ? AFTERCARE_TIMELINE[activeStage].stage.uk : AFTERCARE_TIMELINE[activeStage].stage.en}
              </span>
              <h3 className="font-serif italic text-2xl font-bold text-white">
                {lang === 'uk' ? AFTERCARE_TIMELINE[activeStage].title.uk : AFTERCARE_TIMELINE[activeStage].title.en}
              </h3>
            </div>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed pt-2 font-sans">
            {lang === 'uk' ? AFTERCARE_TIMELINE[activeStage].desc.uk : AFTERCARE_TIMELINE[activeStage].desc.en}
          </p>
        </div>
      </div>

      {/* Do's and Don'ts comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* DO's */}
        <div className="bg-[#121216] border border-white/10 p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-white font-serif italic text-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{lang === 'uk' ? 'Що потрібно робити (Обов’язково)' : 'Recommended Best Practices'}</span>
          </div>
          <ul className="space-y-3 font-mono text-xs">
            {dosAndDonts.dos.map((item, i) => (
              <li key={i} className="flex items-start space-x-3 text-zinc-300">
                <span className="w-1.5 h-1.5 bg-emerald-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{lang === 'uk' ? item.uk : item.en}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DONT's */}
        <div className="bg-[#181113] border border-red-900/40 p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-red-400 font-serif italic text-xl">
            <XCircle className="w-5 h-5 text-red-500" />
            <span>{lang === 'uk' ? 'Категорично заборонено' : 'Strictly Prohibited During Healing'}</span>
          </div>
          <ul className="space-y-3 font-mono text-xs">
            {dosAndDonts.donts.map((item, i) => (
              <li key={i} className="flex items-start space-x-3 text-red-200/90">
                <span className="w-1.5 h-1.5 bg-red-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{lang === 'uk' ? item.uk : item.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
