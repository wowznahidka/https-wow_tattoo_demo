import React from 'react';
import { Language } from '../types';
import { 
  ShieldCheck, 
  Sparkles, 
  Wind, 
  FlaskConical 
} from 'lucide-react';

interface StudioStandardsProps {
  lang: Language;
}

export const StudioStandardsSection: React.FC<StudioStandardsProps> = ({ lang }) => {
  const standards = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
      title: { uk: 'Автоклавування медичного класу B', en: 'Medical Class-B Autoclave' },
      desc: {
        uk: 'Багаторазові тримачі проходять повний цикл триступеневої ультразвукової та вакуумної стерилізації під тиском 134°C.',
        en: 'Reusable grips undergo 3-stage ultrasonic cleansing and vacuum pressurized sterilization at 134°C.'
      }
    },
    {
      icon: <FlaskConical className="w-6 h-6 text-red-500" />,
      title: { uk: '100% Одноразові модулі Kwadron', en: '100% Single-Use Kwadron Needles' },
      desc: {
        uk: 'Стерильні картриджі Cheyenne та Kwadron з мембраною зворотного відтоку розпаковуються суворо перед вами.',
        en: 'Sterile Cheyenne & Kwadron safety membrane cartridges unpacked exclusively in your presence.'
      }
    },
    {
      icon: <Sparkles className="w-6 h-6 text-red-500" />,
      title: { uk: 'Сертифіковані веганські пігменти', en: 'Certified EU Vegan Pigments' },
      desc: {
        uk: 'Працюємо на пігментах Dynamic Black, World Famous та Eternal Ink, що відповідають найвищим стандартам REACH (EU).',
        en: 'Utilize Dynamic Black, World Famous, and Eternal Ink pigments compliant with strict EU REACH standards.'
      }
    },
    {
      icon: <Wind className="w-6 h-6 text-red-500" />,
      title: { uk: 'HEPA очищення повітря & Бар’єрний захист', en: 'HEPA Air Filtration & Barrier Wraps' },
      desc: {
        uk: 'Клінічні бактерицидні рециркулятори та одноразові плівки бар’єрного захисту на все обладнання та поверхні.',
        en: 'Hospital-grade germicidal UV-C air recirculators and complete disposable barrier wrapping on all gear.'
      }
    }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-white/10 relative">
      <div className="text-center space-y-4 mb-14">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-red-600"></span>
          <span className="text-xs uppercase tracking-[0.3em] text-red-500 font-semibold font-mono">
            {lang === 'uk' ? 'Безкомпромісна безпека' : 'Clinical Safety Standards'}
          </span>
          <span className="h-px w-10 bg-red-600"></span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-white leading-tight">
          {lang === 'uk' ? 'Стандарти гігієни та матеріалів' : 'Hygiene & Studio Guarantees'}
        </h2>
        <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base">
          {lang === 'uk'
            ? 'Ми дотримуємося суворих медичних протоколів стерилізації, забезпечуючи максимальну безпеку вашого здоров’я.'
            : 'We implement rigorous medical sterilization protocols to guarantee uncompromised health safety.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {standards.map((st, i) => (
          <div
            key={i}
            className="bg-[#121216] border border-white/10 p-6 space-y-4 hover:border-red-500/50 transition-colors shadow-xl"
          >
            <div className="w-12 h-12 bg-[#17171e] border border-white/10 flex items-center justify-center">
              {st.icon}
            </div>
            <h3 className="font-serif italic text-xl text-white leading-snug">
              {lang === 'uk' ? st.title.uk : st.title.en}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {lang === 'uk' ? st.desc.uk : st.desc.en}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
