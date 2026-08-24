import React, { useState } from 'react';
import { Language } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  CalendarCheck, 
  ArrowRight
} from 'lucide-react';

interface StudioProcessSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

interface Step {
  stepNumber: string;
  tagUk: string;
  tagEn: string;
  titleUk: string;
  titleEn: string;
  descUk: string;
  descEn: string;
  detailsUk: string[];
  detailsEn: string[];
  durationUk: string;
  durationEn: string;
  image: string;
  quoteUk: string;
  quoteEn: string;
  author: string;
}

const STEPS: Step[] = [
  {
    stepNumber: '01',
    tagUk: 'Етап перший • Консультація',
    tagEn: 'Phase 01 • Consultation',
    titleUk: 'Анатомічний аналіз & Вибір стилістики',
    titleEn: 'Anatomical Analysis & Style Selection',
    descUk: 'Особиста або онлайн-зустріч з майстром. Ми аналізуємо динаміку м’язів, тип та відтінок шкіри, щоб татуювання виглядало гармонійно в русі та не спотворювалося з роками.',
    descEn: 'In-person or digital consult with the artist. We evaluate muscle dynamics, skin tone, and body contours so the piece flows naturally and maintains longevity.',
    detailsUk: [
      'Безкоштовна 20-хвилинна консультація',
      'Підбір профільного майстра-резидента',
      'Прозорий розрахунок вартості та кількості сеансів'
    ],
    detailsEn: [
      'Complimentary 20-min consult',
      'Matching with the right resident specialist',
      'Transparent pricing and session count estimate'
    ],
    durationUk: '20 — 30 хв',
    durationEn: '20 — 30 min',
    image: '/tattoos/photo_1_19_07_2024_13_03_11.jpg',
    quoteUk: '«Татуювання має жити разом з тілом, а не виглядати як наклейка.»',
    quoteEn: '“A tattoo must breathe with the body, not sit like a flat sticker.”',
    author: 'NOIR & NEEDLE Consultation Guild'
  },
  {
    stepNumber: '02',
    tagUk: 'Етап другий • Ескіз',
    tagEn: 'Phase 02 • Custom Artwork',
    titleUk: 'Розробка кастомного 1-of-1 дизайну',
    titleEn: 'Bespoke 1-of-1 Concept Drafting',
    descUk: 'Ми ніколи не копіюємо чужі роботи з Pinterest. Майстер малює унікальний арт з урахуванням ваших сенсів, геометрії тіла та світлотіней під час руху.',
    descEn: 'We strictly never duplicate Pinterest templates. Your resident master creates an authentic piece honoring your concept and natural body architecture.',
    detailsUk: [
      'Цифровий або Freehand ескіз безпосередньо по тілу',
      'До двох кіл безкоштовних правок деталей',
      'Візуалізація на фото вашого тіла перед сеансом'
    ],
    detailsEn: [
      'Digital mockup or bespoke on-skin Freehand',
      'Up to two free revision rounds on details',
      'Photo-realistic body placement preview'
    ],
    durationUk: '1 — 3 дні підготовки',
    durationEn: '1 — 3 days preparation',
    image: '/tattoos/photo_2_19_07_2024_13_08_08.jpg',
    quoteUk: '«Кожен штрих вивіряється під вашу анатомічну лінію.»',
    quoteEn: '“Every stroke is calculated along your anatomical curves.”',
    author: 'Олексій "Obsidian" • Resident Lead'
  },
  {
    stepNumber: '03',
    tagUk: 'Етап третій • Стерильність',
    tagEn: 'Phase 03 • Medical Sterility',
    titleUk: 'Клінічна дезінфекція & Стерильний сет',
    titleEn: 'Clinical Sanitization & Sterile Setup',
    descUk: 'Священне правило NOIR & NEEDLE. Повний бар’єрний захист поверхонь, ультразвукова очистка тримачів, автоклав класу B та одноразові картриджі Kwadron.',
    descEn: 'The absolute core of NOIR & NEEDLE. Disposable barrier films, Class-B autoclave cycles, and genuine Kwadron safety-membrane needles.',
    detailsUk: [
      'Розпакування одноразових голок суворо у вашій присутності',
      'Сертифіковані веганські пігменти Dynamic & World Famous',
      'Медична обробка робочого місця за стандартами МОЗ'
    ],
    detailsEn: [
      'Single-use modules unsealed strictly before you',
      'EU REACH certified vegan pigments',
      'Hospital-grade sanitization protocols'
    ],
    durationUk: '15 хв перед сеансом',
    durationEn: '15 min pre-session prep',
    image: '/tattoos/photo_4_19_07_2024_13_09_40.jpg',
    quoteUk: '«Безпека вашого здоров’я — абсолютний пріоритет №1.»',
    quoteEn: '“Your health and safety is our unconditional priority #1.”',
    author: 'NOIR & NEEDLE Medical Protocol'
  },
  {
    stepNumber: '04',
    tagUk: 'Етап четвертий • Сеанс',
    tagEn: 'Phase 04 • The Inking Session',
    titleUk: 'Ювелірне нанесення & Комфорт клієнта',
    titleEn: 'Precision Craft & Ergonomic Comfort',
    descUk: 'Сеанс проходить у просторих ізольованих кабінетах на ергономічних кушетках. Майстер контролює глибину проникнення голки для чітких ліній без розпливання.',
    descEn: 'Conducted in isolated suites on orthopedic beds. The master ensures millimeter-precise pigment depth to prevent blowouts and preserve crispness.',
    detailsUk: [
      'Безшумні роторні машинки Bishop / FK Irons',
      'Регулярні паузи на чай, каву та відпочинок',
      'Аплікаційна анестезія (за індивідуальною згодою)'
    ],
    detailsEn: [
      'Silent brushless Bishop / FK Irons machines',
      'Comfort breaks with artisan espresso & tea',
      'Secondary soothing numbing (upon client consent)'
    ],
    durationUk: 'Від 2 до 6 год на сеанс',
    durationEn: 'From 2 to 6 hours per session',
    image: '/tattoos/photo_5_19_07_2024_13_10_04.jpg',
    quoteUk: '«Мікро-рухи та легка рука — секрет мінімального стресу для шкіри.»',
    quoteEn: '“Micro-precision and gentle hand pressure minimize skin trauma.”',
    author: 'Марія "Vesper" • Lead Fine-Line'
  },
  {
    stepNumber: '05',
    tagUk: 'Етап п’ятий • Турбота',
    tagEn: 'Phase 05 • Healing & Guarantee',
    titleUk: 'Захисна мембрана Suprasorb F & Гарантія',
    titleEn: 'Suprasorb F Second-Skin & Lifetime Guarantee',
    descUk: 'Після сеансу наноситься "друга шкіра" — повітропроникна плівка Suprasorb F, яка позбавляє потреби постійно мазати та мити тату перші 5 днів. Ви отримуєте фірмовий care-box та право на безкоштовну корекцію.',
    descEn: 'We apply a medical breathable Suprasorb F membrane, eliminating the need to wash and re-wrap for the first 5 days. You receive our curated care-kit and a 45-day touch-up guarantee.',
    detailsUk: [
      'Комфортне загоєння без кірочок та спотворень',
      'Фірмовий набір для догляду з інструкцією',
      'Безкоштовна корекція протягом 45 днів з моменту нанесення'
    ],
    detailsEn: [
      'Effortless scab-free healing with Suprasorb F',
      'Signature aftercare kit with printed step-by-step manual',
      'Complimentary touch-up within 45 days of completion'
    ],
    durationUk: '5 днів активного загоєння',
    durationEn: '5 days active care',
    image: '/tattoos/photo_6_19_07_2024_13_10_46.jpg',
    quoteUk: '«Ми супроводжуємо вас до повного відновлення шкіри та ідеального результату.»',
    quoteEn: '“We stay in touch with you until full skin recovery and perfect ink settlement.”',
    author: 'NOIR & NEEDLE Care Team'
  }
];

export const StudioProcessSection: React.FC<StudioProcessSectionProps> = ({ lang, onOpenBooking }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = STEPS[activeStepIndex];

  return (
    <section id="process" className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-white/10 relative">
      
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-red-600"></span>
          <span className="text-xs uppercase tracking-[0.3em] text-red-500 font-bold font-mono">
            {lang === 'uk' ? 'Стандарти та ремесло' : 'Craft & Standards'}
          </span>
          <span className="h-px w-10 bg-red-600"></span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-white leading-tight">
          {lang === 'uk' ? 'Як народжується ваше татуювання' : 'How Your Tattoo Comes to Life'}
        </h2>
        <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
          {lang === 'uk'
            ? 'Повний шлях створення татуювання в ательє NOIR & NEEDLE: від першої ідеї до повного загоєння з медичною безпекою.'
            : 'The complete journey at NOIR & NEEDLE atelier: from initial anatomy draft to flawless second-skin healing.'}
        </p>
      </div>

      {/* Step Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
        {STEPS.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={step.stepNumber}
              type="button"
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3.5 sm:p-4 text-left border transition-all cursor-pointer font-mono ${
                isActive
                  ? 'bg-red-950/80 text-white border-red-500 shadow-md scale-[1.02]'
                  : 'bg-[#121216] text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-red-400' : 'text-zinc-500'}`}>
                  {step.stepNumber}. {lang === 'uk' ? 'Етап' : 'Step'}
                </span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
              </div>
              <p className={`text-xs font-bold font-sans line-clamp-1 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                {lang === 'uk' 
                  ? ['Консультація', 'Ескіз 1-of-1', 'Стерильність', 'Сеанс', 'Загоєння'][idx] 
                  : ['Consultation', '1-of-1 Sketch', 'Sterility', 'Inking', 'Aftercare'][idx]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Showcase */}
      <div className="bg-[#121216] border border-white/15 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Image with Aesthetic Noir Grade */}
        <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[460px] bg-black overflow-hidden flex items-center justify-center group">
          <img
            src={activeStep.image}
            alt={lang === 'uk' ? activeStep.titleUk : activeStep.titleEn}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.8] contrast-110 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
          
          {/* Floating Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-black/85 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-widest">
              {lang === 'uk' ? activeStep.tagUk : activeStep.tagEn}
            </span>
          </div>

          {/* Bottom Quote inside Image */}
          <div className="absolute bottom-4 left-4 right-4 z-10 text-white font-mono">
            <p className="text-xs sm:text-sm font-serif italic text-zinc-200 leading-snug mb-1">
              {lang === 'uk' ? activeStep.quoteUk : activeStep.quoteEn}
            </p>
            <span className="text-[10px] uppercase text-red-400 font-bold tracking-wider block">
              — {activeStep.author}
            </span>
          </div>
        </div>

        {/* Right Column: Exhaustive Details & Commitments */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-red-400 font-bold">
                {lang === 'uk' ? `Крок ${activeStep.stepNumber} з 05` : `Step ${activeStep.stepNumber} of 05`}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 bg-[#181820] px-2.5 py-1 border border-white/10 font-semibold">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                {lang === 'uk' ? activeStep.durationUk : activeStep.durationEn}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-white leading-tight">
              {lang === 'uk' ? activeStep.titleUk : activeStep.titleEn}
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
              {lang === 'uk' ? activeStep.descUk : activeStep.descEn}
            </p>

            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
                {lang === 'uk' ? 'Що входить до цього етапу:' : 'Key deliverables included:'}
              </h4>
              <div className="space-y-2">
                {(lang === 'uk' ? activeStep.detailsUk : activeStep.detailsEn).map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-400 font-mono text-center sm:text-left">
              {lang === 'uk' ? 'Є питання щодо підготовки до сеансу?' : 'Questions about preparing for your session?'}
              <span className="block text-white font-bold mt-0.5">
                {lang === 'uk' ? 'Консультація з майстром — безкоштовна.' : 'Consultation is always complimentary.'}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveStepIndex((prev) => (prev + 1) % STEPS.length)}
                className="px-4 py-3 bg-[#181820] hover:bg-[#22222c] border border-white/15 text-zinc-200 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {lang === 'uk' ? 'Наступний крок →' : 'Next Step →'}
              </button>

              <button
                type="button"
                onClick={onOpenBooking}
                className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md grow sm:grow-0 border border-red-500/50"
              >
                <CalendarCheck className="w-4 h-4 text-white" />
                <span>{lang === 'uk' ? 'Записатися' : 'Book Now'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
