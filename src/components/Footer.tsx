import React from 'react';
import { Language } from '../types';
import { Instagram, Send, Phone, MapPin, Heart, CalendarCheck } from 'lucide-react';
import { StudioLogo } from './StudioLogo';

interface FooterProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenBooking }) => {
  return (
    <footer className="bg-[#09090c] border-t border-white/10 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Col 1: Brand with Official Studio Logo */}
          <div className="lg:col-span-2 space-y-5">
            <StudioLogo variant="full" />

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm font-sans">
              {lang === 'uk'
                ? 'Преміальне тату-ательє у центрі Києва. Створюємо вишукані татуювання з безкомпромісною увагою до анатомії тіла, авторського стилю та медичної безпеки Class B.'
                : 'Luxury bespoke tattoo atelier in central Kyiv. Crafting museum-grade ink with anatomical precision and clinical Class B safety.'}
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com/noir.needle"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#14141a] border border-white/15 text-zinc-200 hover:text-red-400 hover:border-red-500 transition-colors shadow-sm"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/noir_needle_kyiv"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#14141a] border border-white/15 text-zinc-200 hover:text-red-400 hover:border-red-500 transition-colors shadow-sm"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenBooking}
                className="px-4 py-2.5 bg-red-700 hover:bg-red-600 text-white font-mono uppercase tracking-widest text-[11px] font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer border border-red-500/50"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>{lang === 'uk' ? 'Швидкий запис' : 'Book'}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">
              {lang === 'uk' ? 'Навігація' : 'Explore'}
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a href="#gallery" className="hover:text-red-400 transition-colors">
                  {lang === 'uk' ? 'Галерея робіт' : 'Portfolio Gallery'}
                </a>
              </li>
              <li>
                <a href="#flash" className="hover:text-red-400 transition-colors">
                  {lang === 'uk' ? 'Flash-ескізи (1 of 1)' : 'Flash Shop'}
                </a>
              </li>
              <li>
                <a href="#artists" className="hover:text-red-400 transition-colors">
                  {lang === 'uk' ? 'Майстри-резиденти' : 'Resident Masters'}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-red-400 transition-colors">
                  {lang === 'uk' ? 'Калькулятор вартості' : 'Cost Estimator'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio & Art Standards */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">
              {lang === 'uk' ? 'Ательє & Стандарти' : 'Standards & Media'}
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a href="#process" className="hover:text-red-400 transition-colors">
                  {lang === 'uk' ? 'Як народжується тату' : 'Process & Craft'}
                </a>
              </li>
              <li>
                <a href="#standards" className="hover:text-red-400 transition-colors">
                  {lang === 'uk' ? 'Стерильність Class B' : 'Medical Hygiene'}
                </a>
              </li>
              <li>
                <a href="#aftercare" className="hover:text-red-400 transition-colors">
                  {lang === 'uk' ? 'Правила догляду' : 'Aftercare Protocol'}
                </a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-red-400 transition-colors">
                  {lang === 'uk' ? 'Часті запитання (FAQ)' : 'Studio FAQ'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Address */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">
              {lang === 'uk' ? 'Контакти та локація' : 'Studio Location'}
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-zinc-300">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  {lang === 'uk' ? 'вул. Велика Васильківська, 42, Київ' : '42 Velyka Vasylkivska St, Kyiv'}
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href="tel:+380449348821" className="hover:text-red-400 font-bold">
                  +380 (44) 934-88-21
                </a>
              </li>
              <li className="pt-2 text-[11px] text-zinc-400">
                {lang === 'uk' ? 'Графік: Щодня 10:00 — 21:00' : 'Hours: Mon — Sun 10:00 — 21:00'}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-400 font-mono">
          <p>© 2014—2026 NOIR & NEEDLE Tattoo Atelier. All Rights Reserved.</p>
          <p className="mt-4 sm:mt-0 flex items-center gap-1.5">
            <span>Crafted with passion in Kyiv</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
