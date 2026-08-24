import React, { useState, useRef } from 'react';
import { Language, Artist } from '../types';
import { RESIDENT_ARTISTS } from '../data/mockData';
import { useSectionParallax } from '../hooks/useSectionParallax';
import { 
  Instagram, 
  Star, 
  X, 
  Calendar
} from 'lucide-react';

interface MastersSectionProps {
  lang: Language;
  onBookArtist: (artist: Artist) => void;
}

export const MastersSection: React.FC<MastersSectionProps> = ({ lang, onBookArtist }) => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { bgSlow, bgMid, progress } = useSectionParallax(sectionRef);

  return (
    <section 
      ref={sectionRef}
      id="artists" 
      className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-white/10 relative overflow-hidden"
    >
      {/* Editorial Parallax Background Typography (Far plane) */}
      <div 
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-12 left-1/2 -translate-x-1/2 w-full text-center whitespace-nowrap z-0 opacity-[0.035] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(-50%, ${bgSlow * 1.3}px, 0)`,
          willChange: 'transform'
        }}
      >
        <span className="text-[13vw] font-serif font-black italic tracking-widest block leading-none">
          RESIDENTS • MASTERS
        </span>
      </div>

      {/* Floating Ambient Parallax Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-10 -right-24 w-88 h-88 rounded-full bg-red-900/10 blur-3xl z-0 transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(0, ${bgMid * 1.4}px, 0)`,
          willChange: 'transform'
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-10 -left-24 w-96 h-96 rounded-full bg-black/40 blur-3xl z-0 transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(0, ${-bgMid * 1.2}px, 0)`,
          willChange: 'transform'
        }}
      />

      <div className="relative z-10 text-center space-y-4 mb-14">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-red-600"></span>
          <span className="text-xs uppercase tracking-[0.3em] text-red-500 font-semibold font-mono">
            {lang === 'uk' ? 'Команда резидентів' : 'Studio Masters'}
          </span>
          <span className="h-px w-10 bg-red-600"></span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-white leading-tight">
          {lang === 'uk' ? 'Топ-майстри ательє' : 'Resident Tattoo Artists'}
        </h2>
        <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base">
          {lang === 'uk'
            ? 'Кожен майстер має свій неповторний художній почерк, роки практики та міжнародні нагороди.'
            : 'Each artist brings a distinctive artistic vision, deep technical mastery, and convention awards.'}
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {RESIDENT_ARTISTS.map((artist, idx) => {
          const colOffset = idx === 1 ? bgSlow * 0.18 : -bgSlow * 0.1;

          return (
            <div
              key={artist.id}
              className="group bg-[#121216] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-red-500/60 hover:shadow-2xl transition-all duration-300 shadow-xl"
              style={{
                transform: `translate3d(0, ${colOffset}px, 0)`,
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
                willChange: 'transform'
              }}
            >
              <div>
                {/* Cover & Avatar Header with parallax inner image */}
                <div className="h-44 w-full relative overflow-hidden bg-black">
                  <img
                    src={artist.coverImage}
                    alt={artist.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 ease-out"
                    style={{
                      transform: `scale(1.1) translate3d(0, ${progress * 12}px, 0)`,
                      willChange: 'transform'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-white/15 px-2.5 py-1 flex items-center space-x-1 text-xs text-white font-mono font-bold shadow-sm z-10">
                    <Star className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    <span>{artist.rating}</span>
                  </div>
                </div>

                {/* Avatar Overlap */}
                <div className="px-6 -mt-14 relative z-10 flex items-end justify-between">
                  <div className="w-24 h-24 p-1 bg-[#121216] border border-white/20 shadow-md group-hover:border-red-500/60 transition-colors">
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <a
                    href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-[#181820] border border-white/10 text-zinc-300 hover:text-white hover:border-red-500 transition-colors text-xs flex items-center space-x-1 font-mono text-[11px]"
                  >
                    <Instagram className="w-3.5 h-3.5 text-red-500" />
                    <span>{artist.instagram}</span>
                  </a>
                </div>

                {/* Bio & Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif italic text-2xl text-white font-bold group-hover:text-red-400 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-[10px] text-red-400 font-semibold uppercase tracking-[0.25em] font-mono mt-0.5">
                      {lang === 'uk' ? artist.role : artist.roleEn}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {lang === 'uk' ? artist.bio.uk : artist.bio.en}
                  </p>

                  {/* Specialties tags */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold block font-mono">
                      {lang === 'uk' ? 'Спеціалізація:' : 'Specialties:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {artist.specialtyTitles.map((sp, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#181820] text-zinc-300 border border-white/10 font-mono">
                          {lang === 'uk' ? sp.uk : sp.en}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience & stats */}
                  <div className="grid grid-cols-2 gap-2 pt-3 text-xs border-t border-white/10 font-mono text-[11px]">
                    <div className="text-zinc-400">
                      <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">
                        {lang === 'uk' ? 'Досвід' : 'Experience'}
                      </span>
                      <strong className="text-white">{artist.experienceYears} {lang === 'uk' ? 'років' : 'years'}</strong>
                    </div>
                    <div className="text-zinc-400">
                      <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">
                        {lang === 'uk' ? 'Денний сеанс (6г)' : 'Day Session (6h)'}
                      </span>
                      <strong className="text-white font-bold">{artist.sessionRate.toLocaleString('uk-UA')} ₴</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 pb-6 pt-0 flex gap-2">
                <button
                  onClick={() => setSelectedArtist(artist)}
                  className="flex-1 py-2.5 px-3 border border-white/15 bg-[#181820] hover:border-white/40 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-mono"
                >
                  {lang === 'uk' ? 'Портфоліо' : 'View Works'}
                </button>

                <button
                  onClick={() => onBookArtist(artist)}
                  className="flex-1 py-2.5 px-3 bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md font-mono border border-red-500/50"
                >
                  <span>{lang === 'uk' ? 'Записатися' : 'Book Master'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Artist Portfolio Modal - Dark Atelier Noir Aesthetic */}
      {selectedArtist && (
        <div 
          onClick={() => setSelectedArtist(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121216] border border-white/20 text-[#f4f4f2] max-w-3xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl relative space-y-6"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
            }}
          >
            <button
              onClick={() => setSelectedArtist(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-red-700 text-zinc-300 hover:text-white border border-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <img
                src={selectedArtist.avatar}
                alt={selectedArtist.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover border border-white/20 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-white">
                    {selectedArtist.name}
                  </h3>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {lang === 'uk' ? '2 слоти цього тижня' : '2 slots available'}
                  </div>
                </div>
                <p className="text-xs text-red-400 font-semibold uppercase tracking-[0.25em] font-mono mt-0.5">
                  {lang === 'uk' ? selectedArtist.role : selectedArtist.roleEn}
                </p>
                <p className="text-[11px] text-zinc-400 font-mono mt-1">
                  Instagram: <span className="text-zinc-200">{selectedArtist.instagram}</span> • {selectedArtist.experienceYears} {lang === 'uk' ? 'років досвіду' : 'years experience'}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-white/5 p-4 border border-white/10 font-sans">
              {lang === 'uk' ? selectedArtist.bio.uk : selectedArtist.bio.en}
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest font-mono">
                  {lang === 'uk' ? 'Вибрані авторські роботи майстра:' : 'Featured Artist Works:'}
                </h4>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {selectedArtist.featuredWorks.length} {lang === 'uk' ? 'робіт' : 'works'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {selectedArtist.featuredWorks.map((img, i) => (
                  <div key={i} className="aspect-square relative overflow-hidden group border border-white/15 bg-black">
                    <img
                      src={img}
                      alt="Artist work"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="text-[10px] font-mono uppercase font-bold text-white px-2 py-1 bg-black/80 border border-white/20">
                        {lang === 'uk' ? 'Робота' : 'Artwork'} #{i + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-white/10 gap-3">
              <div className="text-xs text-zinc-400 font-mono text-[11px]">
                {lang === 'uk' ? 'Дні прийому: ' : 'Working Days: '}
                <strong className="text-white font-bold">{selectedArtist.availableDays.join(', ')}</strong>
                <span className="block text-[10px] text-zinc-400 mt-0.5">
                  {lang === 'uk' ? 'Денний сеанс (6г): ' : 'Day session (6h): '}
                  <strong className="text-red-400">{selectedArtist.sessionRate.toLocaleString('uk-UA')} ₴</strong>
                </span>
              </div>

              <button
                onClick={() => {
                  const art = selectedArtist;
                  setSelectedArtist(null);
                  onBookArtist(art);
                }}
                className="px-6 py-3.5 bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest font-mono transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'uk' ? 'Записатися до цього майстра' : 'Book With This Master'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
