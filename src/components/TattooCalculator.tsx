import React, { useState } from 'react';
import { Language, TattooStyle } from '../types';
import { 
  Calculator, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  CalendarCheck, 
  Info,
  Layers,
  Palette,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface TattooCalculatorProps {
  lang: Language;
  onBookWithEstimate: (estimateData: {
    sizeCm: number;
    style: TattooStyle;
    placement: string;
    complexity: string;
    estimatedPriceUah: number;
    estimatedHours: number;
  }) => void;
}

export const TattooCalculator: React.FC<TattooCalculatorProps> = ({ lang, onBookWithEstimate }) => {
  const [sizeCm, setSizeCm] = useState<number>(15);
  const [style, setStyle] = useState<TattooStyle>('blackwork');
  const [placement, setPlacement] = useState<string>('forearm');
  const [complexity, setComplexity] = useState<'simple' | 'detailed' | 'hyperrealism'>('detailed');
  const [colorMode, setColorMode] = useState<'black' | 'accent' | 'full'>('black');

  // Realistic transparent studio calculation formula
  const baseRate = 1800; // Disposable sterile cartridge setup & consultation
  const cmCost = sizeCm * 130;

  let styleMultiplier = 1.0;
  if (style === 'microrealism' || style === 'japanese') styleMultiplier = 1.35;
  if (style === 'coverup') styleMultiplier = 1.45;
  if (style === 'fineline') styleMultiplier = 1.1;

  let complexityMultiplier = 1.0;
  if (complexity === 'simple') complexityMultiplier = 0.85;
  if (complexity === 'detailed') complexityMultiplier = 1.25;
  if (complexity === 'hyperrealism') complexityMultiplier = 1.6;

  let colorMultiplier = 1.0;
  if (colorMode === 'accent') colorMultiplier = 1.15;
  if (colorMode === 'full') colorMultiplier = 1.35;

  const totalUah = Math.round((baseRate + cmCost) * styleMultiplier * complexityMultiplier * colorMultiplier);
  const totalUsd = Math.round(totalUah / 41.5);
  const estimatedHours = Math.max(1.5, Math.round((sizeCm / 4.2) * complexityMultiplier * 10) / 10);
  const sessionsCount = estimatedHours > 6 ? Math.ceil(estimatedHours / 5) : 1;

  // Real world size comparison
  const getSizeComparison = (cm: number) => {
    if (cm <= 5) return lang === 'uk' ? 'Мікро-розмір (монета / сірникова коробка)' : 'Micro scale (coin / matchbox)';
    if (cm <= 10) return lang === 'uk' ? 'Компактний формат (банківська картка)' : 'Compact format (credit card size)';
    if (cm <= 18) return lang === 'uk' ? 'Середній формат (сучасний смартфон)' : 'Medium format (smartphone scale)';
    if (cm <= 28) return lang === 'uk' ? 'Масштабний проект (половина передпліччя / планшет)' : 'Large project (half forearm / tablet)';
    return lang === 'uk' ? 'Монументальний проект (повний рукав / стегно / спина)' : 'Monumental project (full sleeve / backpiece)';
  };

  const placements = [
    { id: 'forearm', labelUk: 'Передпліччя', labelEn: 'Forearm', descUk: 'Ідеально для деталізації та графіки', descEn: 'Ideal for high detail & graphics' },
    { id: 'shoulder', labelUk: 'Плече / Дельта', labelEn: 'Shoulder', descUk: 'Анатомічний рельєф м’язів', descEn: 'Conforms to muscle curvature' },
    { id: 'chest', labelUk: 'Груди / Ключиці', labelEn: 'Chest / Collarbone', descUk: 'Симетричні або витончені написи', descEn: 'Symmetrical composition & fine lines' },
    { id: 'ribs', labelUk: 'Ребра / Торс', labelEn: 'Ribs & Flank', descUk: 'Прихована естетика та великі панно', descEn: 'Intimate placement & vertical flow' },
    { id: 'spine', labelUk: 'Хребет / Спина', labelEn: 'Spine & Backpiece', descUk: 'Монументальні полотна 1-of-1', descEn: 'Monumental 1-of-1 backpieces' },
    { id: 'thigh', labelUk: 'Стегно', labelEn: 'Thigh', descUk: 'Велика площа для реалізму та японії', descEn: 'Broad canvas for realism & irezumi' },
    { id: 'calf', labelUk: 'Литки / Гомілка', labelEn: 'Calf & Shin', descUk: 'Кругові та вертикальні сюжети', descEn: 'Wrap-around & vertical stories' },
    { id: 'wrist', labelUk: 'Кисть / Шия', labelEn: 'Hand & Neck', descUk: 'Акцентні ювелірні елементи', descEn: 'Accent high-visibility craft' },
  ];

  const currentPlacement = placements.find(p => p.id === placement) || placements[0];

  const handleBook = () => {
    onBookWithEstimate({
      sizeCm,
      style,
      placement: currentPlacement.labelUk,
      complexity,
      estimatedPriceUah: totalUah,
      estimatedHours
    });
  };

  return (
    <section id="calculator" className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-white/10 relative">
      <div className="text-center space-y-4 mb-16">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-red-600"></span>
          <span className="text-xs uppercase tracking-[0.3em] text-red-500 font-bold font-mono">
            {lang === 'uk' ? 'Прозоре ціноутворення • Кошторис ательє' : 'Transparent Atelier Pricing'}
          </span>
          <span className="h-px w-10 bg-red-600"></span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-white leading-tight">
          {lang === 'uk' ? 'Калькулятор вартості та сеансів' : 'Project Estimator & Timing'}
        </h2>
        <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
          {lang === 'uk'
            ? 'Оберіть розмір, художній стиль та зону нанесення. Отримайте прозорий кошторис за стандартами NOIR & NEEDLE без прихованих платежів.'
            : 'Select the size, style, and body zone to receive a transparent estimate based on NOIR & NEEDLE standards with zero hidden fees.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Configuration Panel */}
        <div className="lg:col-span-7 bg-[#121216] border border-white/10 p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* 1. Size Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <label className="text-xs font-bold text-zinc-200 uppercase tracking-widest flex items-center font-mono">
                <span className="w-5 h-5 bg-red-700 text-white inline-flex items-center justify-center text-xs mr-2.5 font-mono">1</span>
                {lang === 'uk' ? 'Орієнтовний розмір:' : 'Estimated Size:'}
              </label>
              <div className="text-right">
                <span className="text-2xl font-bold font-serif italic text-white">{sizeCm} см</span>
                <span className="text-[11px] text-zinc-400 block font-mono">({Math.round(sizeCm / 2.54)} inches)</span>
              </div>
            </div>

            <input
              type="range"
              min="3"
              max="45"
              step="1"
              value={sizeCm}
              onChange={(e) => setSizeCm(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-none appearance-none cursor-pointer accent-red-600"
            />

            <div className="flex justify-between text-[11px] text-zinc-400 font-mono uppercase tracking-wider font-semibold">
              <span>3 см (Міні)</span>
              <span>15 см (Середнє)</span>
              <span>30 см (Велике)</span>
              <span>45 см (Рукав)</span>
            </div>

            <div className="p-3.5 bg-[#17171e] border border-white/10 text-xs text-zinc-300 flex items-center space-x-2.5 font-mono">
              <Info className="w-4 h-4 text-red-500 shrink-0" />
              <span>{getSizeComparison(sizeCm)}</span>
            </div>
          </div>

          {/* 2. Style Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-200 uppercase tracking-widest flex items-center border-b border-white/10 pb-2 font-mono">
              <span className="w-5 h-5 bg-red-700 text-white inline-flex items-center justify-center text-xs mr-2.5 font-mono">2</span>
              {lang === 'uk' ? 'Художній стиль:' : 'Artistic Style:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'blackwork', name: 'Blackwork' },
                { id: 'fineline', name: 'Fine Line' },
                { id: 'microrealism', name: 'Realism' },
                { id: 'neotraditional', name: 'Neo-Trad' },
                { id: 'japanese', name: 'Japanese' },
                { id: 'ornamental', name: 'Ornamental' },
                { id: 'watercolor', name: 'Watercolor' },
                { id: 'coverup', name: 'Cover-Up' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStyle(s.id as TattooStyle)}
                  className={`p-3 border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-mono ${
                    style === s.id
                      ? 'border-red-500 bg-red-950/80 text-white shadow-md'
                      : 'border-white/10 bg-[#16161c] text-zinc-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Placement Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <label className="text-xs font-bold text-zinc-200 uppercase tracking-widest flex items-center font-mono">
                <span className="w-5 h-5 bg-red-700 text-white inline-flex items-center justify-center text-xs mr-2.5 font-mono">3</span>
                {lang === 'uk' ? 'Анатомічна зона нанесення:' : 'Anatomical Placement Zone:'}
              </label>
              <span className="text-[10px] text-red-400 font-mono font-bold uppercase">
                {lang === 'uk' ? currentPlacement.labelUk : currentPlacement.labelEn}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {placements.map((p) => {
                const isSelected = placement === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlacement(p.id)}
                    className={`p-3 border text-left transition-all cursor-pointer font-mono ${
                      isSelected
                        ? 'border-red-500 bg-red-950/70 text-white shadow-md'
                        : 'border-white/10 bg-[#16161c] text-zinc-300 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <div className="font-bold uppercase tracking-wider text-xs flex items-center justify-between">
                      <span>{lang === 'uk' ? p.labelUk : p.labelEn}</span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      {lang === 'uk' ? p.descUk : p.descEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Complexity & Palette */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-200 uppercase tracking-widest font-mono">
                {lang === 'uk' ? 'Деталізація:' : 'Detail Level:'}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'simple', labelUk: 'Базова', labelEn: 'Basic' },
                  { id: 'detailed', labelUk: 'Висока', labelEn: 'Detailed' },
                  { id: 'hyperrealism', labelUk: 'Ювелірна', labelEn: 'Jewelry' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setComplexity(c.id as 'simple' | 'detailed' | 'hyperrealism')}
                    className={`py-2 px-1 text-[10px] font-bold uppercase tracking-wider border font-mono transition-all cursor-pointer text-center ${
                      complexity === c.id
                        ? 'border-red-500 bg-red-950/70 text-white'
                        : 'border-white/10 bg-[#16161c] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {lang === 'uk' ? c.labelUk : c.labelEn}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-200 uppercase tracking-widest font-mono">
                {lang === 'uk' ? 'Палітра пігментів:' : 'Pigment Palette:'}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'black', labelUk: 'Black / Grey', labelEn: 'Monochrome' },
                  { id: 'accent', labelUk: 'З акцентом', labelEn: 'Accent' },
                  { id: 'full', labelUk: 'Повний колір', labelEn: 'Full Color' },
                ].map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setColorMode(col.id as 'black' | 'accent' | 'full')}
                    className={`py-2 px-1 text-[10px] font-bold uppercase tracking-wider border font-mono transition-all cursor-pointer text-center ${
                      colorMode === col.id
                        ? 'border-red-500 bg-red-950/70 text-white'
                        : 'border-white/10 bg-[#16161c] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {lang === 'uk' ? col.labelUk : col.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary & Booking Action Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#121216] border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-red-500 font-bold block">
                  {lang === 'uk' ? 'Орієнтовний кошторис' : 'Estimated Investment'}
                </span>
                <div className="text-4xl sm:text-5xl font-serif italic text-white mt-1">
                  ~{totalUah.toLocaleString()} <span className="text-xl sm:text-2xl font-sans not-italic font-normal text-zinc-400">₴</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-zinc-400">~${totalUsd} USD</span>
              </div>
            </div>

            {/* Timing & Session metrics */}
            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="p-3 bg-[#17171e] border border-white/10">
                <div className="flex items-center text-xs text-zinc-400 font-mono mb-1">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                  <span>{lang === 'uk' ? 'Тривалість' : 'Duration'}</span>
                </div>
                <div className="text-lg font-bold font-serif italic text-white">~{estimatedHours} {lang === 'uk' ? 'год' : 'hrs'}</div>
              </div>

              <div className="p-3 bg-[#17171e] border border-white/10">
                <div className="flex items-center text-xs text-zinc-400 font-mono mb-1">
                  <Layers className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                  <span>{lang === 'uk' ? 'Сеанси' : 'Sessions'}</span>
                </div>
                <div className="text-lg font-bold font-serif italic text-white">{sessionsCount} {sessionsCount > 1 ? (lang === 'uk' ? 'сеанси' : 'sessions') : (lang === 'uk' ? 'сеанс' : 'session')}</div>
              </div>
            </div>

            {/* What is included checklist */}
            <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs font-mono text-zinc-300">
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                {lang === 'uk' ? 'У вартість сеансу включено:' : 'Included in session cost:'}
              </p>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{lang === 'uk' ? 'Індивідуальна розробка 1-of-1 ескізу' : 'Bespoke 1-of-1 custom design drafting'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{lang === 'uk' ? 'Стерильний модуль Kwadron + автоклавування' : 'Sterile Kwadron needle modules & setup'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{lang === 'uk' ? 'Захисна загоювальна мембрана Suprasorb F' : 'Medical Suprasorb F healing membrane'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{lang === 'uk' ? 'Безкоштовна корекція протягом 45 днів' : 'Free touch-up within 45 days of healing'}</span>
              </div>
            </div>

            {/* Direct Booking Action Button */}
            <button
              onClick={handleBook}
              className="w-full py-3 px-5 bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-mono flex items-center justify-center space-x-2 shadow-lg border border-red-500/50"
            >
              <CalendarCheck className="w-4 h-4 text-white" />
              <span>{lang === 'uk' ? 'Зафіксувати кошторис та обрати дату' : 'Confirm Estimate & Book'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          <div className="p-4 bg-[#121216] border border-white/10 text-xs text-zinc-400 font-mono space-y-1.5">
            <div className="flex items-center text-zinc-200 font-bold gap-2">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>{lang === 'uk' ? 'Гарантія незмінності ціни' : 'Fixed Price Guarantee'}</span>
            </div>
            <p className="leading-relaxed">
              {lang === 'uk' 
                ? 'Фінальна вартість затверджується майстром на первинній безкоштовній консультації і не змінюється під час сеансу.'
                : 'The final price is agreed upon during your complimentary consultation and remains strictly fixed.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
