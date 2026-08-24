import React, { useState } from 'react';
import { Language } from '../types';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  Instagram, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';

interface StudioLocationFaqProps {
  lang: Language;
}

export const StudioLocationFaq: React.FC<StudioLocationFaqProps> = ({ lang }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: { uk: 'Чи боляче бити тату і чи є у вас знеболення?', en: 'Does it hurt and do you offer numbing agents?' },
      a: {
        uk: 'Рівень відчуттів залежить від місця нанесення та індивідуального больового порогу. За запитом ми використовуємо професійний аплікаційний крем TKTX/J-Pro для повного комфорту.',
        en: 'Pain levels vary depending on anatomy and personal sensitivity. Upon request, we apply medical-grade secondary topical anesthetics.'
      }
    },
    {
      q: { uk: 'Як правильно підготуватися до сеансу?', en: 'How should I prepare before my tattoo session?' },
      a: {
        uk: 'Добре виспіться, обов’язково щільно поїжте за 1-2 години до візиту. Не вживайте алкоголь та кроворозріджувальні препарати за добу до сеансу. Одягніть зручний просторий одяг.',
        en: 'Get a good night’s sleep, eat a hearty meal 1-2 hours prior. Refrain from alcohol and blood-thinners for 24h. Wear comfortable loose clothing.'
      }
    },
    {
      q: { uk: 'Скільки коштує розробка індивідуального ескізу?', en: 'How much does custom design drafting cost?' },
      a: {
        uk: 'Розробка та анатомічна примірка авторського ескізу повністю БЕЗКОШТОВНІ при записі на сеанс у нашій студії.',
        en: 'Custom sketch drafting and anatomical stencil fitting are 100% complimentary when booking a session with us.'
      }
    },
    {
      q: { uk: 'Чи можна перекрити старе невдале тату або шрами?', en: 'Can you cover up old unwanted tattoos or surgical scars?' },
      a: {
        uk: 'Так! Наші майстри спеціалізуються на Cover-Up проектах. Шрами мають бути повністю загоєними (від 1 року). Ми безкоштовно оцінимо можливість перекриття на консультації.',
        en: 'Yes! We specialize in complex cover-up and scar camouflage projects. Scars must be fully matured (1+ year old).'
      }
    },
    {
      q: { uk: 'Чи є протипоказання до татуювання?', en: 'Are there medical contraindications to getting tattooed?' },
      a: {
        uk: 'Основні протипоказання: цукровий діабет у декомпенсованій формі, порушення згортання крові, гострі вірусні інфекції/температура, вагітність та період лактації.',
        en: 'Key contraindications include uncontrolled diabetes, blood clotting disorders, acute viral fever, pregnancy and active breastfeeding.'
      }
    }
  ];

  return (
    <section id="contacts" className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-white/10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Studio Location & Contacts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-red-600"></span>
              <span className="text-xs uppercase tracking-[0.3em] text-red-500 font-semibold font-mono">
                {lang === 'uk' ? 'Локація у серці столиці' : 'Atelier Location'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">
              {lang === 'uk' ? 'Контакти та студія' : 'Visit NOIR & NEEDLE'}
            </h2>
            <p className="text-xs text-zinc-400">
              {lang === 'uk' 
                ? 'Затишний арт-простір преміум-класу в історичному центрі Києва.'
                : 'A luxury bespoke tattoo atelier situated in central historic Kyiv.'}
            </p>
          </div>

          <div className="bg-[#121216] border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[#181820] border border-white/10 flex items-center justify-center text-red-500 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white text-sm block font-serif italic">
                  {lang === 'uk' ? 'вул. Велика Васильківська, 42, Київ' : '42 Velyka Vasylkivska St, Kyiv'}
                </strong>
                <span className="text-xs text-zinc-400 block mt-1">
                  {lang === 'uk' ? 'метро «Олімпійська» / «Площа Українських Героїв»' : 'Metro Olympiiska / Ukrainian Heroes Sq.'}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[#181820] border border-white/10 flex items-center justify-center text-red-500 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white text-sm block font-serif italic">
                  {lang === 'uk' ? 'Графік роботи:' : 'Working Hours:'}
                </strong>
                <span className="text-xs text-zinc-400 block mt-1 font-mono">
                  {lang === 'uk' ? 'Щодня: 10:00 — 21:00' : 'Mon - Sun: 10:00 AM — 9:00 PM'}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[#181820] border border-white/10 flex items-center justify-center text-red-500 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white text-sm block font-mono">+380 (44) 934-88-21</strong>
                <span className="text-xs text-zinc-400 block mt-1">
                  {lang === 'uk' ? 'Адміністрація та консультації' : 'Reception & Consultations'}
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://t.me/noir_needle_kyiv"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-3 bg-[#181820] hover:bg-red-700 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-200 flex items-center justify-center space-x-2 transition-all font-mono shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-white" />
                <span>Telegram</span>
              </a>

              <a
                href="https://instagram.com/noir.needle"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-3 bg-[#181820] hover:bg-red-700 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-200 flex items-center justify-center space-x-2 transition-all font-mono shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5 text-white" />
                <span>Instagram</span>
              </a>
            </div>

            {/* In-page Express Consultation Widget */}
            <div className="pt-4 border-t border-white/10">
              <div className="bg-[#17171e] border border-white/15 p-5 text-white space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] text-red-400 font-mono font-bold uppercase tracking-widest">
                    {lang === 'uk' ? 'ЕКСПРЕС-КОНСУЛЬТАЦІЯ' : 'DIRECT INQUIRY'}
                  </span>
                </div>
                <h4 className="font-serif italic text-lg font-bold text-white">
                  {lang === 'uk' ? 'Залишились сумніви або питання?' : 'Have Questions About Your Tattoo?'}
                </h4>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  {lang === 'uk' 
                    ? 'Напишіть нам у Telegram — арт-директор студії розрахує точну вартість та підбере майстра за 10 хвилин.'
                    : 'Chat with our lead artist in Telegram to get a free estimate and style advice.'}
                </p>
                <a
                  href="https://t.me/noir_needle_kyiv?text=Вітаю!%20Хочу%20проконсультуватися%20щодо%20нового%20татуювання."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-red-700 hover:bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg border border-red-500/50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'uk' ? 'Написати арт-директору' : 'Ask Lead Artist'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right FAQ Accordion */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-red-600"></span>
              <span className="text-xs uppercase tracking-[0.3em] text-red-500 font-semibold font-mono">
                {lang === 'uk' ? 'Часті запитання' : 'FAQ & Knowledge'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">
              {lang === 'uk' ? 'Відповіді на запитання' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`bg-[#121216] border transition-colors shadow-xl ${
                    isOpen ? 'border-red-500/60' : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between space-x-4 cursor-pointer"
                  >
                    <span className="font-serif italic font-medium text-base text-white">
                      {lang === 'uk' ? faq.q.uk : faq.q.en}
                    </span>
                    <span className="p-1 text-red-500 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/10 pt-4 animate-in fade-in duration-150 font-sans">
                      {lang === 'uk' ? faq.a.uk : faq.a.en}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
