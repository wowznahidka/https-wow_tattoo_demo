import React, { useState, useEffect, useRef } from 'react';
import { Language, TattooStyle, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/mockData';
import { useSectionParallax } from '../hooks/useSectionParallax';
import { 
  Heart, 
  Clock, 
  X, 
  CalendarCheck, 
  Upload,
  Search,
  CheckCircle2,
  Tag,
  Plus,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';

interface GallerySectionProps {
  lang: Language;
  onBookSimilar: (item: GalleryItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang, onBookSimilar }) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});
  const [customItems, setCustomItems] = useState<GalleryItem[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoStyle, setNewPhotoStyle] = useState<TattooStyle>('blackwork');
  const [newPhotoPlacement, setNewPhotoPlacement] = useState('');
  const [newPhotoArtist, setNewPhotoArtist] = useState('Олексій "Obsidian"');
  const [newPhotoUrls, setNewPhotoUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { bgSlow, bgMid, progress } = useSectionParallax(sectionRef);

  // Load saved favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('noir_ink_favorites');
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const likedMap: Record<string, boolean> = {};
        ids.forEach(id => { likedMap[id] = true; });
        setUserLiked(likedMap);
      }
    } catch {}
  }, []);

  const filterStyles = [
    { id: 'all', labelUk: 'Усі роботи (24+)', labelEn: 'All Works (24+)' },
    { id: 'saved', labelUk: '❤️ Збережені', labelEn: '❤️ Saved Favorites' },
    { id: 'blackwork', labelUk: 'Blackwork', labelEn: 'Blackwork' },
    { id: 'fineline', labelUk: 'Fine Line', labelEn: 'Fine Line' },
    { id: 'microrealism', labelUk: 'Реалізм', labelEn: 'Realism' },
    { id: 'japanese', labelUk: 'Japanese', labelEn: 'Japanese' },
    { id: 'ornamental', labelUk: 'Ornamental', labelEn: 'Ornamental' },
    { id: 'watercolor', labelUk: 'Watercolor', labelEn: 'Watercolor' },
    { id: 'coverup', labelUk: 'Cover-Up', labelEn: 'Cover-Up' },
  ];

  const allItems = [...customItems, ...GALLERY_ITEMS];

  const filteredItems = allItems.filter((item) => {
    if (selectedStyle === 'saved') {
      return userLiked[item.id] === true;
    }
    const matchesStyle = selectedStyle === 'all' || item.style === selectedStyle;
    const matchesSearch = searchQuery.trim() === '' || 
      item.title.uk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.placement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStyle && matchesSearch;
  });

  const toggleLike = (e: React.MouseEvent, id: string, initialLikes: number) => {
    e.stopPropagation();
    const isLiked = userLiked[id];
    const newLikedState = !isLiked;
    
    setUserLiked(prev => {
      const next = { ...prev, [id]: newLikedState };
      try {
        const savedIds = Object.keys(next).filter(k => next[k]);
        localStorage.setItem('noir_ink_favorites', JSON.stringify(savedIds));
      } catch {}
      return next;
    });

    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] ?? initialLikes) + (newLikedState ? 1 : -1)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const urls: string[] = [];
    Array.from(files).forEach((file: File) => {
      const url = URL.createObjectURL(file);
      urls.push(url);
    });
    setNewPhotoUrls(prev => [...prev, ...urls]);
  };

  const handleSaveUploadedPhotos = () => {
    if (newPhotoUrls.length === 0) return;

    const newItems: GalleryItem[] = newPhotoUrls.map((url, idx) => ({
      id: `custom-gal-${Date.now()}-${idx}`,
      title: { 
        uk: newPhotoTitle.trim() || `Авторська робота #${customItems.length + idx + 1}`, 
        en: newPhotoTitle.trim() || `Custom Tattoo Piece #${customItems.length + idx + 1}` 
      },
      style: newPhotoStyle,
      placement: newPhotoPlacement.trim() || 'Передпліччя',
      placementEn: newPhotoPlacement.trim() || 'Forearm',
      artistId: 'art-1',
      artistName: newPhotoArtist,
      imageUrl: url,
      durationHours: 4,
      sessionsCount: 1,
      description: {
        uk: 'Авторське татуювання виконане в студії NOIR. Індивідуальний ескіз під анатомію клієнта.',
        en: 'Custom tattoo artwork crafted at NOIR studio tailored to the client’s anatomy.'
      },
      tags: [newPhotoStyle, 'custom', 'noir studio'],
      likes: Math.floor(Math.random() * 200) + 150
    }));

    setCustomItems(prev => [...newItems, ...prev]);
    setNewPhotoUrls([]);
    setNewPhotoTitle('');
    setNewPhotoPlacement('');
    setIsUploadOpen(false);
  };

  return (
    <section 
      ref={sectionRef} 
      id="gallery" 
      className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-black/10 relative overflow-hidden"
    >
      {/* Editorial Parallax Background Typography (Far plane) */}
      <div 
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-10 left-1/2 -translate-x-1/2 w-full text-center whitespace-nowrap z-0 opacity-[0.035] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(-50%, ${bgSlow * 1.2}px, 0)`,
          willChange: 'transform'
        }}
      >
        <span className="text-[14vw] font-serif font-black italic tracking-widest block leading-none">
          ATELIER • NOIR
        </span>
      </div>

      {/* Floating Ambient Parallax Vignettes */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-red-900/5 blur-3xl z-0 transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(0, ${bgMid * 1.5}px, 0)`,
          willChange: 'transform'
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-black/5 blur-3xl z-0 transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(0, ${-bgMid * 1.2}px, 0)`,
          willChange: 'transform'
        }}
      />

      <div className="relative z-10 text-center space-y-4 mb-12">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-red-700"></span>
          <span className="text-xs uppercase tracking-[0.3em] text-red-700 font-semibold font-mono">
            {lang === 'uk' ? 'Портфоліо резидентів' : 'Resident Portfolio'}
          </span>
          <span className="h-px w-10 bg-red-700"></span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-zinc-950 leading-tight">
          {lang === 'uk' ? 'Галерея авторських робіт' : 'Curated Tattoo Gallery'}
        </h2>
        <p className="max-w-2xl mx-auto text-zinc-600 text-sm sm:text-base">
          {lang === 'uk'
            ? '24+ автентичні студійні роботи. Кожен проект створюється в єдиному екземплярі під анатомію клієнта.'
            : '24+ authentic studio pieces. Each project is custom tailored to harmonize with personal anatomy.'}
        </p>
      </div>

      {/* Action Strip: Search & Upload */}
      <div className="relative z-10 max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'uk' ? 'Шукати за стилем, майстром, місцем або тегом...' : 'Search by style, artist, placement, or tag...'}
            className="w-full pl-11 pr-10 py-3 bg-[#121216] border border-white/15 text-xs font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500 transition-colors shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="w-full sm:w-auto px-5 py-3 bg-[#16161c] border border-white/15 text-zinc-200 hover:text-red-400 hover:border-red-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer font-mono shadow-xs shrink-0"
        >
          <Upload className="w-3.5 h-3.5 text-red-500" />
          <span>{lang === 'uk' ? '+ Додати своє фото' : '+ Upload Reference'}</span>
        </button>
      </div>

      {/* Style Filter Chips */}
      <div className="relative z-10 flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mb-12">
        {filterStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 text-xs uppercase font-bold tracking-widest transition-all cursor-pointer border font-mono ${
              selectedStyle === style.id
                ? 'bg-red-700 text-white border-red-500 shadow-md'
                : 'bg-[#121216] border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
            }`}
          >
            {lang === 'uk' ? style.labelUk : style.labelEn}
          </button>
        ))}
      </div>

      {/* Gallery Grid with Parallax Depth & Smooth Transitions */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => {
          const currentLikes = likes[item.id] ?? item.likes;
          const isLiked = userLiked[item.id];
          const colOffset = (index % 4 === 1 || index % 4 === 2) ? bgSlow * 0.15 : -bgSlow * 0.1;

          return (
            <div
              key={item.id}
              onClick={() => {
                setZoomLevel(1);
                setActiveModalItem(item);
              }}
              className="group relative bg-[#121216] border border-white/10 overflow-hidden cursor-pointer hover:border-red-500/60 transition-all duration-300 shadow-xl"
              style={{
                transform: `translate3d(0, ${colOffset}px, 0)`,
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
                willChange: 'transform'
              }}
            >
              {/* Image with Parallax inner translation & zoom on hover */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-zinc-900 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title.uk}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  style={{
                    transform: `scale(1.08) translate3d(0, ${progress * 10}px, 0)`,
                    willChange: 'transform'
                  }}
                />

                {/* Cover-up badge */}
                {item.beforeImageUrl && (
                  <div className="absolute top-3 left-3 bg-red-700 text-white text-[9px] font-bold uppercase px-2.5 py-1 tracking-widest font-mono">
                    Cover-Up
                  </div>
                )}

                {/* Like button top right */}
                <button
                  onClick={(e) => toggleLike(e, item.id, item.likes)}
                  className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md text-zinc-200 hover:text-red-400 border border-white/20 transition-colors cursor-pointer z-20"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
                </button>

                {/* Gradient bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Bottom card info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1.5 z-10">
                  <span className="text-[10px] text-red-400 font-semibold uppercase tracking-[0.25em] block font-mono">
                    {item.artistName}
                  </span>
                  <h3 className="font-serif italic text-lg text-white leading-snug group-hover:text-red-100 transition-colors">
                    {lang === 'uk' ? item.title.uk : item.title.en}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-zinc-300 pt-2 border-t border-white/10 font-mono">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Tag className="w-3 h-3 text-red-400" />
                      {lang === 'uk' ? item.placement : item.placementEn}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {item.durationHours} {lang === 'uk' ? 'год' : 'hrs'} • {currentLikes} ❤️
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white border border-black/10 p-8 max-w-xl mx-auto my-8">
          <p className="text-zinc-600 font-mono text-xs uppercase tracking-wider mb-2">
            {lang === 'uk' ? 'Нічого не знайдено' : 'No works found'}
          </p>
          <p className="text-sm text-zinc-800 mb-4 font-sans">
            {lang === 'uk'
              ? 'Спробуйте змінити фільтр стилю або очистити пошуковий запит.'
              : 'Try clearing your search query or selecting a different style.'}
          </p>
          <button
            onClick={() => {
              setSelectedStyle('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-black text-white text-xs font-mono uppercase font-bold hover:bg-red-700 transition-colors"
          >
            {lang === 'uk' ? 'Скинути фільтри' : 'Reset Filters'}
          </button>
        </div>
      )}

      {/* Modal Lightbox View */}
      {activeModalItem && (
        <div 
          onClick={() => setActiveModalItem(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111113] border border-white/20 text-[#f4f4f2] max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl relative"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
            }}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-30 p-2 bg-white/10 hover:bg-red-700 text-zinc-300 hover:text-white border border-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image View with Zoom Controls */}
            <div className="md:col-span-7 bg-black p-4 sm:p-6 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[460px] overflow-hidden">
              {/* Zoom Toolbar */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/75 backdrop-blur-md p-1 border border-white/20">
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.min(prev + 0.3, 2.5))}
                  className="p-1.5 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.max(prev - 0.3, 1))}
                  className="p-1.5 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono px-1 text-zinc-400">
                  {Math.round(zoomLevel * 100)}%
                </span>
              </div>

              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  src={activeModalItem.imageUrl}
                  alt={activeModalItem.title.uk}
                  referrerPolicy="no-referrer"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transition: 'transform 0.25s ease-out',
                    cursor: zoomLevel > 1 ? 'move' : 'default'
                  }}
                  className="max-h-[460px] w-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Right Details */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-red-400 font-semibold uppercase tracking-[0.25em] block font-mono">
                    {activeModalItem.artistName}
                  </span>
                  <h3 className="font-serif italic text-2xl font-bold text-white mt-1">
                    {lang === 'uk' ? activeModalItem.title.uk : activeModalItem.title.en}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs font-mono text-zinc-300">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">{lang === 'uk' ? 'Стиль' : 'Style'}</span>
                    <strong className="text-white uppercase">{activeModalItem.style}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">{lang === 'uk' ? 'Місце' : 'Placement'}</span>
                    <strong className="text-white">{lang === 'uk' ? activeModalItem.placement : activeModalItem.placementEn}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">{lang === 'uk' ? 'Тривалість' : 'Duration'}</span>
                    <strong className="text-white">{activeModalItem.durationHours} {lang === 'uk' ? 'годин' : 'hours'}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">{lang === 'uk' ? 'Сеанси' : 'Sessions'}</span>
                    <strong className="text-white">{activeModalItem.sessionsCount} {lang === 'uk' ? 'сеанс' : 'session'}</strong>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {lang === 'uk' ? activeModalItem.description.uk : activeModalItem.description.en}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {activeModalItem.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-zinc-400">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    const item = activeModalItem;
                    setActiveModalItem(null);
                    onBookSimilar(item);
                  }}
                  className="w-full py-3.5 bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest font-mono transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>{lang === 'uk' ? 'Замовити схожий ескіз' : 'Book Similar Concept'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Custom Reference Modal in Dark Theme */}
      {isUploadOpen && (
        <div 
          onClick={() => setIsUploadOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121216] border border-white/20 text-white max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative"
          >
            <button
              onClick={() => setIsUploadOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-white/10 pb-3">
              <span className="text-xs uppercase tracking-widest text-red-400 font-bold font-mono">
                {lang === 'uk' ? 'Кастомне портфоліо' : 'Custom Upload'}
              </span>
              <h3 className="text-2xl font-serif italic font-bold text-white">
                {lang === 'uk' ? 'Додати власне тату чи референс' : 'Upload Tattoo Reference'}
              </h3>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-300 uppercase font-bold mb-1.5">
                  {lang === 'uk' ? 'Назва або концепт:' : 'Title / Concept:'}
                </label>
                <input
                  type="text"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  placeholder={lang === 'uk' ? 'Напр. Рукав Самурай' : 'e.g. Samurai Sleeve'}
                  className="w-full p-2.5 border border-white/15 bg-[#16161c] text-white focus:border-red-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 uppercase font-bold mb-1.5">
                    {lang === 'uk' ? 'Стиль:' : 'Style:'}
                  </label>
                  <select
                    value={newPhotoStyle}
                    onChange={(e) => setNewPhotoStyle(e.target.value as TattooStyle)}
                    className="w-full p-2.5 border border-white/15 bg-[#16161c] text-white outline-none"
                  >
                    <option value="blackwork">Blackwork</option>
                    <option value="fineline">Fine Line</option>
                    <option value="microrealism">Реалізм</option>
                    <option value="japanese">Japanese</option>
                    <option value="ornamental">Ornamental</option>
                    <option value="coverup">Cover-Up</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 uppercase font-bold mb-1.5">
                    {lang === 'uk' ? 'Місце:' : 'Placement:'}
                  </label>
                  <input
                    type="text"
                    value={newPhotoPlacement}
                    onChange={(e) => setNewPhotoPlacement(e.target.value)}
                    placeholder={lang === 'uk' ? 'Передпліччя' : 'Forearm'}
                    className="w-full p-2.5 border border-white/15 bg-[#16161c] text-white focus:border-red-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 uppercase font-bold mb-1.5">
                  {lang === 'uk' ? 'Фото файли:' : 'Image Files:'}
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="w-full p-2 border border-dashed border-white/25 bg-[#16161c] text-zinc-300 cursor-pointer"
                />
                {newPhotoUrls.length > 0 && (
                  <p className="text-red-400 font-bold mt-1">
                    ✓ {lang === 'uk' ? `Вибрано ${newPhotoUrls.length} фото` : `Selected ${newPhotoUrls.length} photos`}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2.5 border border-white/20 text-zinc-300 hover:bg-white/5"
                >
                  {lang === 'uk' ? 'Скасувати' : 'Cancel'}
                </button>
                <button
                  type="button"
                  disabled={newPhotoUrls.length === 0}
                  onClick={handleSaveUploadedPhotos}
                  className="px-6 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold uppercase tracking-wider transition-colors"
                >
                  {lang === 'uk' ? 'Зберегти у галерею' : 'Save to Gallery'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
