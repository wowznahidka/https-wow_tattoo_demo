import React, { useState, useEffect } from 'react';
import { Language, TattooStyle } from '../types';
import { RESIDENT_ARTISTS } from '../data/mockData';
import { 
  X, 
  CalendarCheck, 
  CheckCircle2, 
  Upload, 
  Clock, 
  Sparkles, 
  Loader2,
  Calendar,
  User,
  Phone,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Send,
  HelpCircle,
  Flame,
  Check,
  Camera,
  MapPin,
  FileCheck,
  Zap,
  Heart,
  Droplets,
  Share2,
  Copy,
  ExternalLink,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface BookingPrefillData {
  artistName?: string;
  serviceTitle?: string;
  flashId?: string;
  flashTitle?: string;
  flashImageUrl?: string;
  sketchUrl?: string;
  placement?: string;
  sizeCm?: number;
  estimatedPriceUah?: number;
  conceptTitle?: string;
  conceptDescription?: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  prefill?: BookingPrefillData | null;
}

type BookingIntent = 'custom' | 'flash' | 'coverup' | 'consultation';

const INTENT_OPTIONS: { 
  id: BookingIntent; 
  titleUk: string; 
  titleEn: string; 
  descUk: string; 
  descEn: string; 
  badgeUk: string; 
  badgeEn: string;
  depositUk: string;
  depositEn: string;
}[] = [
  {
    id: 'custom',
    titleUk: 'Індивідуальний ескіз (1-of-1)',
    titleEn: 'Bespoke Custom Sketch (1-of-1)',
    descUk: 'Розробка унікального дизайну з нуля під вашу анатомію',
    descEn: 'Original custom design tailored to your body anatomy',
    badgeUk: 'Арт-проєкт',
    badgeEn: 'Art Project',
    depositUk: 'Депозит 1 000 ₴ (входить у вартість)',
    depositEn: '1,000 ₴ deposit (credited to total)'
  },
  {
    id: 'flash',
    titleUk: 'Авторський Flash-сет (Exclusive)',
    titleEn: 'Master Flash Set (Exclusive)',
    descUk: 'Готовий концепт резидента, який наноситься тільки один раз',
    descEn: 'One-time exclusive original piece by our resident',
    badgeUk: 'Ексклюзив',
    badgeEn: 'Exclusive',
    depositUk: 'Бронь ескізу 1 000 ₴',
    depositEn: '1,000 ₴ sketch lock'
  },
  {
    id: 'coverup',
    titleUk: 'Перекриття (Cover-Up / Rework)',
    titleEn: 'Cover-Up / Scar Rework',
    descUk: 'Маскування старого тату або шраму темним пігментом',
    descEn: 'Masking older tattoo or mature scar with dark ink',
    badgeUk: 'Експертиза',
    badgeEn: 'Expert Care',
    depositUk: 'Потрібна попередня оцінка фото',
    depositEn: 'Photo pre-review required'
  },
  {
    id: 'consultation',
    titleUk: 'Офлайн-консультація в студії (0 ₴)',
    titleEn: 'Free In-Studio Consultation (0 ₴)',
    descUk: 'Безкоштовна 30-хв примірка ескізу та жива зустріч з майстром',
    descEn: 'Free 30-min stencil fitting and master consultation',
    badgeUk: 'Безкоштовно',
    badgeEn: 'Free 0 ₴',
    depositUk: 'Без передоплати',
    depositEn: 'No pre-payment'
  }
];

interface BodyZoneInfo {
  id: string;
  uk: string;
  en: string;
  timeUk: string;
  timeEn: string;
  painLevel: number; // 1 to 5
  healingDays: string;
  tipUk: string;
  tipEn: string;
}

const BODY_ZONES: BodyZoneInfo[] = [
  { 
    id: 'forearm', 
    uk: 'Передпліччя', 
    en: 'Forearm', 
    timeUk: '2–3 год', 
    timeEn: '2–3 hrs', 
    painLevel: 2, 
    healingDays: '5–7 днів',
    tipUk: 'Найбільш комфортна зона для першого татуювання',
    tipEn: 'Most comfortable spot for a first tattoo'
  },
  { 
    id: 'shoulder', 
    uk: 'Плече / Біцепс', 
    en: 'Shoulder / Bicep', 
    timeUk: '3–4 год', 
    timeEn: '3–4 hrs', 
    painLevel: 2, 
    healingDays: '5–7 днів',
    tipUk: 'Чудова динаміка ліній та стійкість до розтягувань',
    tipEn: 'Great muscle flow and minimal deformation'
  },
  { 
    id: 'ribs', 
    uk: 'Ребра / Груди', 
    en: 'Ribs / Chest', 
    timeUk: '3–5 год', 
    timeEn: '3–5 hrs', 
    painLevel: 5, 
    healingDays: '7–10 днів',
    tipUk: 'Інтенсивна зона, рекомендуємо сеанс із паузами або анестетиком',
    tipEn: 'Intense zone, session with calm pacing recommended'
  },
  { 
    id: 'back', 
    uk: 'Спина / Хребет', 
    en: 'Back / Spine', 
    timeUk: '4–6 год', 
    timeEn: '4–6 hrs', 
    painLevel: 4, 
    healingDays: '7–10 днів',
    tipUk: 'Ідеальне полотно для масштабних графічних композицій',
    tipEn: 'Ideal canvas for large-scale dark compositions'
  },
  { 
    id: 'thigh', 
    uk: 'Стегно', 
    en: 'Thigh', 
    timeUk: '3–5 год', 
    timeEn: '3–5 hrs', 
    painLevel: 2, 
    healingDays: '6–8 днів',
    tipUk: 'Великий радіус та мінімальна чутливість шкіри',
    tipEn: 'Large surface area and very comfortable skin'
  },
  { 
    id: 'calf', 
    uk: 'Гомілка / Литки', 
    en: 'Calf / Shin', 
    timeUk: '3–4 год', 
    timeEn: '3–4 hrs', 
    painLevel: 3, 
    healingDays: '6–8 днів',
    tipUk: 'Чудово підходить для вертикальних ескізів та орнаментів',
    tipEn: 'Great for vertical compositions & ornaments'
  },
  { 
    id: 'collarbone', 
    uk: 'Ключиця / Шия', 
    en: 'Collarbone / Neck', 
    timeUk: '1.5–3 год', 
    timeEn: '1.5–3 hrs', 
    painLevel: 4, 
    healingDays: '5–7 днів',
    tipUk: 'Вишукане місце для Fine-Line та мінімалістичних написів',
    tipEn: 'Sophisticated area for Fine-Line and typography'
  },
  { 
    id: 'hand', 
    uk: 'Кисть / Пальці', 
    en: 'Hand / Wrist', 
    timeUk: '1.5–2 год', 
    timeEn: '1.5–2 hrs', 
    painLevel: 4, 
    healingDays: '5–7 днів',
    tipUk: 'Вимагає дбайливого догляду через часте миття рук',
    tipEn: 'Requires careful aftercare due to frequent handwashing'
  }
];

const SIZE_TIERS = [
  { 
    id: 'micro', 
    labelUk: 'Fine-Line Мініатюра (до 8 см)', 
    labelEn: 'Fine-Line Micro (< 8 cm)', 
    priceUk: '1 800 – 2 500 ₴', 
    priceEn: '1,800 – 2,500 ₴',
    durationUk: '1 — 1.5 години',
    durationEn: '1 — 1.5 hours',
    descUk: 'Тонкі голки 1RL, акуратні написи, символи, мікро-флора'
  },
  { 
    id: 'medium', 
    labelUk: 'Середній формат (10–20 см)', 
    labelEn: 'Medium Piece (10–20 cm)', 
    priceUk: '3 500 – 6 500 ₴', 
    priceEn: '3,500 – 6,500 ₴',
    durationUk: '2.5 — 4 години',
    durationEn: '2.5 — 4 hours',
    descUk: 'Деталізовані гравюри, портрети, орнаменти, геометрія'
  },
  { 
    id: 'large', 
    labelUk: 'Масштабний проєкт / Рукав', 
    labelEn: 'Large Scale / Full Sleeve', 
    priceUk: 'від 8 500 ₴ / сеанс', 
    priceEn: 'from 8,500 ₴ / session',
    durationUk: '5 — 7 годин на сеанс',
    durationEn: '5 — 7 hours per session',
    descUk: 'Повне заповнення руки, спини або ноги в декілька сесій'
  }
];

const TIME_SLOTS = [
  { time: '11:00', labelUk: 'Ранковий спокій', labelEn: 'Morning Focus', tagUk: 'Свіжий фокус' },
  { time: '14:00', labelUk: 'Денне світло', labelEn: 'Natural Light', tagUk: 'Топ вибір' },
  { time: '16:30', labelUk: 'Золота година', labelEn: 'Golden Hour', tagUk: 'М’яке світло' },
  { time: '18:30', labelUk: 'Вечірній затишок', labelEn: 'Evening Vibe', tagUk: 'Атмосферно' }
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  prefill
}) => {
  // Step navigation (1: Format & Master, 2: Placement & Scale, 3: Date & Contact)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [intent, setIntent] = useState<BookingIntent>('custom');
  const [selectedArtistId, setSelectedArtistId] = useState<string>('any');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('forearm');
  const [customPlacement, setCustomPlacement] = useState<string>('');
  const [sizeTierId, setSizeTierId] = useState<string>('medium');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('14:00');
  
  // Comfort and specifics
  const [isFirstTattoo, setIsFirstTattoo] = useState(false);
  const [needsAnesthesia, setNeedsAnesthesia] = useState(false);
  const [veganInks, setVeganInks] = useState(false);
  const [sensitiveSkin, setSensitiveSkin] = useState(false);

  // Contact info
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [contactPreference, setContactPreference] = useState<'telegram' | 'phone' | 'whatsapp'>('telegram');
  const [ideaNotes, setIdeaNotes] = useState('');
  const [referenceFile, setReferenceFile] = useState<string | null>(null);
  const [referenceFileName, setReferenceFileName] = useState<string>('');

  // Submission state
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Dynamic next 7 days for quick date selector
  const [quickDates, setQuickDates] = useState<{ iso: string; displayUk: string; displayEn: string; isToday?: boolean }[]>([]);

  useEffect(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 6; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      
      const dayNamesUk = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const monthNamesUk = ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'];
      const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const dayNameUk = i === 1 ? 'Завтра' : dayNamesUk[d.getDay()];
      const dayNameEn = i === 1 ? 'Tomorrow' : dayNamesEn[d.getDay()];
      
      dates.push({
        iso,
        displayUk: `${dayNameUk}, ${d.getDate()} ${monthNamesUk[d.getMonth()]}`,
        displayEn: `${dayNameEn}, ${monthNamesEn[d.getMonth()]} ${d.getDate()}`
      });
    }
    setQuickDates(dates);
    if (dates.length > 0) {
      setDate(dates[0].iso);
    }
  }, []);

  useEffect(() => {
    if (prefill) {
      if (prefill.artistName) {
        const found = RESIDENT_ARTISTS.find(a => a.name.toLowerCase().includes(prefill.artistName!.toLowerCase()));
        if (found) setSelectedArtistId(found.id);
      }
      if (prefill.placement) {
        const foundZone = BODY_ZONES.find(z => z.uk.toLowerCase() === prefill.placement!.toLowerCase());
        if (foundZone) setSelectedZoneId(foundZone.id);
        else setCustomPlacement(prefill.placement);
      }
      if (prefill.flashTitle) {
        setIntent('flash');
        setIdeaNotes(`[Обрано Flash 1-of-1: ${prefill.flashTitle}]`);
      }
      if (prefill.conceptDescription) {
        setIdeaNotes(`[Концепт: ${prefill.conceptTitle || ''}] ${prefill.conceptDescription}`);
      }
      if (prefill.flashImageUrl || prefill.sketchUrl) {
        setReferenceFile(prefill.flashImageUrl || prefill.sketchUrl || null);
        setReferenceFileName('flash_sketch_reference.jpg');
      }
    }
  }, [prefill, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSubmittedId(null);
      setCurrentStep(1);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentZone = BODY_ZONES.find(z => z.id === selectedZoneId) || BODY_ZONES[0];
  const currentArtist = RESIDENT_ARTISTS.find(a => a.id === selectedArtistId);
  const currentSize = SIZE_TIERS.find(s => s.id === sizeTierId) || SIZE_TIERS[1];
  const currentIntent = INTENT_OPTIONS.find(i => i.id === intent) || INTENT_OPTIONS[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReferenceFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReferenceFile(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeReference = () => {
    setReferenceFile(null);
    setReferenceFileName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) return;

    setLoading(true);

    const chosenPlacement = customPlacement.trim() || currentZone.uk;
    const artistName = currentArtist ? currentArtist.name : 'Будь-який відповідний майстер студії';
    const finalBookingId = `NN-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          phone,
          telegram,
          contactPreference,
          intent,
          artist: artistName,
          placement: chosenPlacement,
          sizeTier: currentSize.labelUk,
          date,
          time,
          isFirstTattoo,
          needsAnesthesia,
          veganInks,
          sensitiveSkin,
          notes: ideaNotes,
          referenceAttached: !!referenceFile
        })
      });
    } catch (err) {
      console.warn('Submitted in offline/fallback mode:', err);
    } finally {
      setSubmittedId(finalBookingId);
      setLoading(false);
    }
  };

  const copyBookingCode = () => {
    if (submittedId) {
      navigator.clipboard.writeText(submittedId);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0b0b0e] border border-white/20 text-[#f5f5f3] max-w-5xl w-full shadow-2xl relative max-h-[94dvh] flex flex-col overflow-hidden"
      >
        {/* Top Atelier Status Bar */}
        <div className="bg-[#121218] border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-zinc-300 font-bold">
                NOIR & NEEDLE • {lang === 'uk' ? 'АТЕЛЬЄ ТАТУЮВАННЯ' : 'TATTOO ATELIER'}
              </span>
            </div>
            <span className="hidden md:inline-block text-zinc-600 font-mono text-xs">|</span>
            <span className="hidden md:flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'uk' ? 'Клас стерилізації B • Автоклав Euronda' : 'Class B Cleanroom'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 bg-white/5 hover:bg-red-700 text-zinc-400 hover:text-white border border-white/15 transition-all cursor-pointer flex items-center gap-1.5"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-wider">{lang === 'uk' ? 'Закрити' : 'Close'}</span>
            </button>
          </div>
        </div>

        {/* Modal Main Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {submittedId ? (
            /* ============================================================ */
            /* SUCCESS CONFIRMATION VOUCHER (ATELIER BOARDING PASS) */
            /* ============================================================ */
            <div className="max-w-2xl mx-auto py-4 space-y-6 text-center">
              
              <div className="w-16 h-16 bg-red-950 border border-red-500 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(220,38,38,0.4)]">
                <CheckCircle2 className="w-8 h-8 text-red-400" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-red-500 block">
                  {lang === 'uk' ? 'СЕСІЮ ЗАРЕЄСТРОВАНО В СИСТЕМІ' : 'SESSION REGISTERED IN ATELIER'}
                </span>
                <h3 className="font-serif italic text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {lang === 'uk' ? `Очікуємо вас, ${clientName}` : `Your Atelier Pass is Ready, ${clientName}`}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto font-mono leading-relaxed">
                  {lang === 'uk'
                    ? 'Адміністратор зв’яжеться з вами протягом 15 хвилин для фіналізації ескізу та закріплення стерильного боксу.'
                    : 'Atelier concierge will contact you within 15 minutes to confirm sketch details and reserve your cleanroom suite.'}
                </p>
              </div>

              {/* Digital Pass Voucher Card */}
              <div className="bg-[#13131a] border-2 border-white/20 p-5 sm:p-6 text-left relative shadow-2xl overflow-hidden font-mono text-xs">
                {/* Visual side perforations */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0b0b0e] border-r-2 border-white/20" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0b0b0e] border-l-2 border-white/20" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-4 gap-3">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">{lang === 'uk' ? 'ЕЛЕКТРОННИЙ ВАУЧЕР СТУДІЇ' : 'ATELIER SESSION PASS'}</span>
                    <span className="text-lg sm:text-xl font-bold text-red-400 font-mono tracking-wider">#{submittedId}</span>
                  </div>
                  <button
                    onClick={copyBookingCode}
                    className="self-start sm:self-auto px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-zinc-300 flex items-center gap-1.5 text-[11px] transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? (lang === 'uk' ? 'Скопійовано' : 'Copied') : (lang === 'uk' ? 'Копіювати код' : 'Copy ID')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                  <div className="space-y-1">
                    <span className="text-zinc-500 block">{lang === 'uk' ? 'Формат & Майстер:' : 'Format & Master:'}</span>
                    <span className="text-white font-bold block">{currentIntent.titleUk}</span>
                    <span className="text-red-400 text-[11px] block">{currentArtist ? currentArtist.name : 'Підбір студії за стилем'}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-zinc-500 block">{lang === 'uk' ? 'Дата & Час сеансу:' : 'Slot & Time:'}</span>
                    <span className="text-white font-bold block">{date} о {time}</span>
                    <span className="text-zinc-400 text-[11px] block">{lang === 'uk' ? 'Зона: ' : 'Zone: '}{customPlacement || currentZone.uk}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-dashed border-white/15 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-zinc-400 gap-2">
                  <span className="flex items-center gap-1 text-zinc-300">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Київ, вул. Велика Васильківська, 42 (м. Площа Українських Героїв)</span>
                  </span>
                  <span className="text-emerald-400 font-bold shrink-0">{lang === 'uk' ? 'Бокс готовий' : 'Suite Ready'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://t.me/noir_needle_kyiv?text=${encodeURIComponent(`Вітаю! Мій електронний запис #${submittedId} на ім'я ${clientName}. Дата: ${date} о ${time}. Хочу уточнити деталі ескізу.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-red-700 hover:bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-red-500/50 shadow-xl cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'uk' ? 'Відкрити діалог у Telegram' : 'Chat via Telegram Concierge'}</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-zinc-200 font-mono text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer border border-white/15"
                >
                  {lang === 'uk' ? 'Повернутися до студії' : 'Back to Studio'}
                </button>
              </div>

              {/* Pre-Session Rules Checklist */}
              <div className="bg-[#111116] border border-white/10 p-4 text-left font-mono text-[11px] text-zinc-400 space-y-2">
                <span className="text-zinc-200 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                  <span>{lang === 'uk' ? 'Пам’ятка підготовки перед сеансом:' : 'Pre-Session Preparation:'}</span>
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-400">
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{lang === 'uk' ? 'Не вживати алкоголь за 24 год' : 'No alcohol for 24 hours'}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{lang === 'uk' ? 'Щільно поснідати перед візитом' : 'Have a solid meal before visit'}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{lang === 'uk' ? 'Одягнути зручний темний одяг' : 'Wear loose dark clothing'}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{lang === 'uk' ? 'У студії є спешелті-кава та чай' : 'Specialty coffee & tea provided'}</span>
                  </li>
                </ul>
              </div>

            </div>
          ) : (
            /* ============================================================ */
            /* MULTI-PANEL ATELIER BOOKING TERMINAL */
            /* ============================================================ */
            <div>
              {/* Step Navigation Bar */}
              <div className="grid grid-cols-3 gap-2 mb-6 border-b border-white/10 pb-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`p-2.5 text-left border transition-all cursor-pointer font-mono ${
                    currentStep === 1 
                      ? 'border-red-500 bg-red-950/30 text-white shadow-md' 
                      : 'border-white/10 bg-[#121216] text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-red-400 font-bold">01. {lang === 'uk' ? 'ЕТАП' : 'STEP'}</div>
                  <div className="text-xs font-bold truncate">{lang === 'uk' ? 'Формат & Майстер' : 'Format & Master'}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className={`p-2.5 text-left border transition-all cursor-pointer font-mono ${
                    currentStep === 2 
                      ? 'border-red-500 bg-red-950/30 text-white shadow-md' 
                      : 'border-white/10 bg-[#121216] text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-red-400 font-bold">02. {lang === 'uk' ? 'ЕТАП' : 'STEP'}</div>
                  <div className="text-xs font-bold truncate">{lang === 'uk' ? 'Локація & Розмір' : 'Placement & Scale'}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className={`p-2.5 text-left border transition-all cursor-pointer font-mono ${
                    currentStep === 3 
                      ? 'border-red-500 bg-red-950/30 text-white shadow-md' 
                      : 'border-white/10 bg-[#121216] text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-red-400 font-bold">03. {lang === 'uk' ? 'ЕТАП' : 'STEP'}</div>
                  <div className="text-xs font-bold truncate">{lang === 'uk' ? 'Дата & Контакти' : 'Slot & Contacts'}</div>
                </button>
              </div>

              {/* Form and Live Slip Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Panel: Active Step Form (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* STEP 1: Format & Master */}
                  {currentStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {/* 1.1 Intent selection */}
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold block mb-2.5 flex items-center justify-between">
                          <span>{lang === 'uk' ? '1. Оберіть тип сеансу:' : '1. Select Session Type:'}</span>
                          <span className="text-[10px] text-zinc-500 font-normal">{lang === 'uk' ? 'Клікніть для вибору' : 'Click to select'}</span>
                        </label>

                        <div className="space-y-2">
                          {INTENT_OPTIONS.map((opt) => {
                            const isSelected = intent === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setIntent(opt.id)}
                                className={`w-full p-3.5 text-left border transition-all cursor-pointer relative ${
                                  isSelected
                                    ? 'bg-[#181824] border-red-500 shadow-md ring-1 ring-red-500/40'
                                    : 'bg-[#111116] border-white/10 hover:border-white/25 hover:bg-[#14141c]'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-serif italic font-bold text-white text-sm sm:text-base">
                                    {lang === 'uk' ? opt.titleUk : opt.titleEn}
                                  </span>
                                  <span className={`text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider font-bold ${
                                    isSelected ? 'bg-red-700 text-white' : 'bg-white/10 text-zinc-400'
                                  }`}>
                                    {lang === 'uk' ? opt.badgeUk : opt.badgeEn}
                                  </span>
                                </div>
                                <p className="text-[11px] text-zinc-400 leading-snug">
                                  {lang === 'uk' ? opt.descUk : opt.descEn}
                                </p>
                                <div className="mt-1.5 text-[10px] font-mono text-red-400/90 font-semibold">
                                  {lang === 'uk' ? opt.depositUk : opt.depositEn}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 1.2 Resident artist selection */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                            {lang === 'uk' ? '2. Оберіть резидента студії:' : '2. Select Resident Master:'}
                          </label>
                          <span className="text-[11px] font-mono text-red-400 font-semibold">
                            {currentArtist ? currentArtist.name : (lang === 'uk' ? 'Підбір студії' : 'Studio Pick')}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {/* Any artist card */}
                          <button
                            type="button"
                            onClick={() => setSelectedArtistId('any')}
                            className={`p-3 text-left border transition-all cursor-pointer flex items-center gap-3 font-mono ${
                              selectedArtistId === 'any'
                                ? 'border-red-500 bg-red-950/40 text-white shadow-md'
                                : 'border-white/10 bg-[#111116] text-zinc-400 hover:border-white/30 hover:text-white'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-full bg-red-900 border border-red-500 flex items-center justify-center shrink-0">
                              <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="truncate">
                              <p className="text-xs font-bold text-white truncate">{lang === 'uk' ? 'Підбір за стилем студії' : 'Studio Pick by Style'}</p>
                              <p className="text-[10px] text-zinc-400 truncate">{lang === 'uk' ? 'Адміністратор підбере ідеального майстра' : 'Concierge will match master'}</p>
                            </div>
                          </button>

                          {/* Specific resident masters */}
                          {RESIDENT_ARTISTS.map((art) => (
                            <button
                              key={art.id}
                              type="button"
                              onClick={() => setSelectedArtistId(art.id)}
                              className={`p-2.5 text-left border transition-all cursor-pointer flex items-center gap-2.5 font-mono ${
                                selectedArtistId === art.id
                                  ? 'border-red-500 bg-red-950/40 text-white shadow-md'
                                  : 'border-white/10 bg-[#111116] text-zinc-400 hover:border-white/30 hover:text-white'
                              }`}
                            >
                              <img
                                src={art.avatar}
                                alt={art.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0"
                              />
                              <div className="truncate">
                                <div className="flex items-center justify-between">
                                  <p className="text-xs font-bold text-white truncate">{art.name.split(' ')[0]}</p>
                                  <span className="text-[9px] text-red-400 font-mono">★ {art.rating}</span>
                                </div>
                                <p className="text-[10px] text-zinc-400 font-serif italic truncate">{art.role.split('•')[0]}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border border-red-500/50 shadow-lg cursor-pointer"
                        >
                          <span>{lang === 'uk' ? 'Далі: Локація & Розмір' : 'Next: Placement & Scale'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Placement & Scale & Sketch */}
                  {currentStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {/* Body Zone Selector with Pain Levels */}
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold block mb-2 flex items-center justify-between">
                          <span>{lang === 'uk' ? '1. Зона нанесення (з індексом чутливості):' : '1. Placement Zone & Pain Index:'}</span>
                          <span className="text-[10px] text-red-400 font-mono">{currentZone.timeUk}</span>
                        </label>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2.5">
                          {BODY_ZONES.map((bz) => {
                            const isSelected = selectedZoneId === bz.id && !customPlacement;
                            return (
                              <button
                                key={bz.id}
                                type="button"
                                onClick={() => {
                                  setSelectedZoneId(bz.id);
                                  setCustomPlacement('');
                                }}
                                className={`p-2.5 text-left text-xs font-mono border transition-all cursor-pointer flex flex-col justify-between ${
                                  isSelected
                                    ? 'bg-white text-black font-bold border-white shadow-md'
                                    : 'bg-[#111116] text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                                }`}
                              >
                                <span className="font-bold truncate text-xs">{lang === 'uk' ? bz.uk : bz.en}</span>
                                <div className="flex items-center justify-between mt-1.5 text-[9px] opacity-75">
                                  <span>{bz.timeUk}</span>
                                  <span>⚡ {bz.painLevel}/5</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={customPlacement}
                            onChange={(e) => setCustomPlacement(e.target.value)}
                            placeholder={lang === 'uk' ? 'Або вкажіть свою унікальну зону (під грудьми, кисть, тощо)...' : 'Or specify custom placement...'}
                            className="flex-1 bg-[#111116] border border-white/15 px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500 font-mono"
                          />
                        </div>

                        {/* Zone tip */}
                        <div className="mt-2 text-[11px] font-mono text-zinc-400 bg-white/5 p-2 border border-white/10 flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{lang === 'uk' ? currentZone.tipUk : currentZone.tipEn}</span>
                        </div>
                      </div>

                      {/* Scale & Budget tier */}
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold block mb-2">
                          {lang === 'uk' ? '2. Масштаб & Орієнтовний бюджет:' : '2. Scale & Estimated Rate:'}
                        </label>

                        <div className="space-y-2">
                          {SIZE_TIERS.map((st) => {
                            const isSelected = sizeTierId === st.id;
                            return (
                              <button
                                key={st.id}
                                type="button"
                                onClick={() => setSizeTierId(st.id)}
                                className={`w-full p-3 text-left border transition-all cursor-pointer font-mono text-xs ${
                                  isSelected
                                    ? 'border-red-500 bg-red-950/40 text-white shadow-md'
                                    : 'border-white/10 bg-[#111116] text-zinc-400 hover:border-white/30 hover:text-white'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-white text-xs sm:text-sm">{lang === 'uk' ? st.labelUk : st.labelEn}</span>
                                  <span className="text-red-400 font-bold">{lang === 'uk' ? st.priceUk : st.priceEn}</span>
                                </div>
                                <p className="text-[11px] text-zinc-400">{st.descUk}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Reference Sketch / Photo upload */}
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold block mb-1.5">
                          {lang === 'uk' ? '3. Референс або фото ідеї (опціонально):' : '3. Reference Sketch or Photo (Optional):'}
                        </label>

                        {referenceFile ? (
                          <div className="p-3 bg-[#16161f] border border-red-500/50 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 truncate">
                              <img
                                src={referenceFile}
                                alt="Reference"
                                className="w-12 h-12 object-cover border border-white/20 shrink-0"
                              />
                              <div className="truncate">
                                <p className="text-xs font-mono font-bold text-white truncate">{referenceFileName || 'Uploaded Sketch'}</p>
                                <p className="text-[10px] font-mono text-emerald-400">{lang === 'uk' ? '✓ Прикріплено до анкети' : '✓ Attached to inquiry'}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={removeReference}
                              className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="border border-dashed border-white/20 hover:border-red-500 p-3.5 bg-[#111116] text-center cursor-pointer transition-colors text-xs text-zinc-400 flex items-center justify-center gap-2 font-mono group">
                            <Upload className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                            <span>{lang === 'uk' ? 'Натисніть, щоб завантажити фото чи скріншот' : 'Upload photo or screenshot'}</span>
                            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                          </label>
                        )}
                      </div>

                      <div className="pt-2 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="px-4 py-2.5 bg-white/5 hover:bg-white/15 text-zinc-300 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/10"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>{lang === 'uk' ? 'Назад' : 'Back'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border border-red-500/50 shadow-lg cursor-pointer"
                        >
                          <span>{lang === 'uk' ? 'Далі: Дата & Контакти' : 'Next: Slot & Contacts'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Slot, Client info & Submit */}
                  {currentStep === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {/* Date selection with quick pills */}
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold block mb-2 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-red-500" />
                          <span>{lang === 'uk' ? '1. Бажана дата візиту:' : '1. Desired Date of Visit:'}</span>
                        </label>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
                          {quickDates.map((qd) => (
                            <button
                              key={qd.iso}
                              type="button"
                              onClick={() => setDate(qd.iso)}
                              className={`p-2 text-xs font-mono text-center border transition-all cursor-pointer ${
                                date === qd.iso
                                  ? 'bg-white text-black font-bold border-white shadow-md'
                                  : 'bg-[#111116] text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                              }`}
                            >
                              {lang === 'uk' ? qd.displayUk : qd.displayEn}
                            </button>
                          ))}
                        </div>

                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-[#111116] border border-white/15 p-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                        />
                      </div>

                      {/* Time slot pills */}
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold block mb-2 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-red-500" />
                          <span>{lang === 'uk' ? '2. Оберіть слот часу:' : '2. Select Time Slot:'}</span>
                        </label>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {TIME_SLOTS.map((slot) => (
                            <button
                              key={slot.time}
                              type="button"
                              onClick={() => setTime(slot.time)}
                              className={`p-2.5 text-left border transition-all cursor-pointer font-mono ${
                                time === slot.time
                                  ? 'bg-red-950 border-red-500 text-white shadow-md ring-1 ring-red-500/40'
                                  : 'bg-[#111116] text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                              }`}
                            >
                              <div className="text-sm font-bold text-white">{slot.time}</div>
                              <div className="text-[10px] text-zinc-400 truncate">{lang === 'uk' ? slot.labelUk : slot.labelEn}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Client contacts */}
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold block mb-2">
                          {lang === 'uk' ? '3. Ваші контактні дані для зв’язку:' : '3. Client Contact Details:'}
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2.5">
                          <div>
                            <input
                              type="text"
                              required
                              placeholder={lang === 'uk' ? "Ваше ім'я *" : 'Your Name *'}
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              className="w-full bg-[#111116] border border-white/15 p-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500 font-mono"
                            />
                          </div>

                          <div>
                            <input
                              type="tel"
                              required
                              placeholder="+380 (__) ___-__-__ *"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-[#111116] border border-white/15 p-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500 font-mono"
                            />
                          </div>

                          <div>
                            <input
                              type="text"
                              placeholder="@telegram_нікнейм"
                              value={telegram}
                              onChange={(e) => setTelegram(e.target.value)}
                              className="w-full bg-[#111116] border border-white/15 p-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500 font-mono"
                            />
                          </div>
                        </div>

                        {/* Preferred contact channel */}
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                          <span className="text-[10px] text-zinc-500 uppercase">{lang === 'uk' ? 'Канал зв’язку:' : 'Channel:'}</span>
                          {(['telegram', 'phone', 'whatsapp'] as const).map((ch) => (
                            <button
                              key={ch}
                              type="button"
                              onClick={() => setContactPreference(ch)}
                              className={`px-2 py-1 uppercase text-[10px] font-bold border transition-colors cursor-pointer ${
                                contactPreference === ch
                                  ? 'bg-red-900 border-red-500 text-white'
                                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                              }`}
                            >
                              {ch}
                            </button>
                          ))}
                        </div>

                        <textarea
                          rows={2}
                          value={ideaNotes}
                          onChange={(e) => setIdeaNotes(e.target.value)}
                          placeholder={lang === 'uk' ? 'Коментар або опис ідеї (сенс, деталі, побажання)...' : 'Additional details or idea notes...'}
                          className="w-full bg-[#111116] border border-white/15 p-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500 font-mono"
                        />
                      </div>

                      {/* Comfort and Health Specifics Toggles */}
                      <div className="bg-[#111116] border border-white/10 p-3 font-mono text-[11px] space-y-2">
                        <span className="text-zinc-300 font-bold uppercase block">{lang === 'uk' ? 'Індивідуальні побажання комфорту:' : 'Comfort & Session Options:'}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-400">
                          <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                            <input
                              type="checkbox"
                              checked={isFirstTattoo}
                              onChange={(e) => setIsFirstTattoo(e.target.checked)}
                              className="accent-red-600"
                            />
                            <span>{lang === 'uk' ? 'Це моє перше татуювання' : 'This is my first tattoo'}</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                            <input
                              type="checkbox"
                              checked={needsAnesthesia}
                              onChange={(e) => setNeedsAnesthesia(e.target.checked)}
                              className="accent-red-600"
                            />
                            <span>{lang === 'uk' ? 'Потрібна анестезія (гель J-Pro)' : 'Need skin anesthesia'}</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                            <input
                              type="checkbox"
                              checked={veganInks}
                              onChange={(e) => setVeganInks(e.target.checked)}
                              className="accent-red-600"
                            />
                            <span>{lang === 'uk' ? 'Веганські чорнила (Dynamic)' : 'Vegan pigments'}</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                            <input
                              type="checkbox"
                              checked={sensitiveSkin}
                              onChange={(e) => setSensitiveSkin(e.target.checked)}
                              className="accent-red-600"
                            />
                            <span>{lang === 'uk' ? 'Чутлива / суха шкіра' : 'Sensitive skin'}</span>
                          </label>
                        </div>
                      </div>

                      {/* Submit and Back navigation */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="w-full sm:w-auto px-4 py-3 bg-white/5 hover:bg-white/15 text-zinc-300 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-white/10"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>{lang === 'uk' ? 'Назад' : 'Back'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={loading || !clientName.trim() || !phone.trim()}
                          className="w-full sm:w-auto flex-1 py-3.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 border border-red-500/50"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>{lang === 'uk' ? 'Реєстрація сеансу...' : 'Registering...'}</span>
                            </>
                          ) : (
                            <>
                              <CalendarCheck className="w-4 h-4" />
                              <span>{lang === 'uk' ? 'Підтвердити запис в ательє' : 'Confirm Atelier Appointment'}</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* Right Panel: Live Atelier Session Slip (5 Cols) */}
                <div className="lg:col-span-5 bg-[#121219] border-2 border-white/15 p-5 font-mono text-xs text-zinc-300 relative shadow-2xl space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">{lang === 'uk' ? 'КАРТКА СЕАНСУ' : 'SESSION SLIP'}</span>
                      <span className="font-bold text-white text-sm">NOIR & NEEDLE ATELIER</span>
                    </div>
                    <span className="text-[10px] bg-red-950 border border-red-500 text-red-400 px-2 py-0.5 font-bold uppercase">
                      {currentIntent.badgeUk}
                    </span>
                  </div>

                  {/* Summary Rows */}
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-zinc-500">{lang === 'uk' ? 'Формат:' : 'Format:'}</span>
                      <span className="text-white font-bold text-right truncate max-w-[180px]">{currentIntent.titleUk}</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-zinc-500">{lang === 'uk' ? 'Резидент:' : 'Master:'}</span>
                      <div className="text-right">
                        <span className="text-white font-bold block">{currentArtist ? currentArtist.name : 'Підбір студії'}</span>
                        <span className="text-[10px] text-red-400">{currentArtist ? currentArtist.role.split('•')[0] : 'За вашим стилем'}</span>
                      </div>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-zinc-500">{lang === 'uk' ? 'Локація на тілі:' : 'Placement:'}</span>
                      <div className="text-right">
                        <span className="text-white font-bold">{customPlacement || currentZone.uk}</span>
                        <span className="text-[10px] text-zinc-400 block">⚡ Чутливість {currentZone.painLevel}/5</span>
                      </div>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-zinc-500">{lang === 'uk' ? 'Масштаб & Час:' : 'Scale & Hours:'}</span>
                      <div className="text-right">
                        <span className="text-white font-bold">{currentSize.labelUk.split('(')[0]}</span>
                        <span className="text-[10px] text-zinc-400 block">{currentSize.durationUk}</span>
                      </div>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-zinc-500">{lang === 'uk' ? 'Орієнтовний рейт:' : 'Rate Estimate:'}</span>
                      <span className="text-red-400 font-bold text-sm">{currentSize.priceUk}</span>
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="text-zinc-500">{lang === 'uk' ? 'Слот візиту:' : 'Slot:'}</span>
                      <span className="text-white font-bold">{date} о {time}</span>
                    </div>
                  </div>

                  {/* Safety & Protocol Badge */}
                  <div className="bg-[#0b0b0e] border border-white/10 p-3 space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{lang === 'uk' ? 'Медичний стандарт ISO-11140' : 'ISO-11140 Medical Standard'}</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 leading-snug">
                      {lang === 'uk' 
                        ? '100% одноразові картриджі Kwadron, дезінфекція Bacillol AF, загоювальна плівка Suprasorb F.' 
                        : 'Kwadron sterile safety-membrane cartridges, Suprasorb F aftercare film included.'}
                    </p>
                  </div>

                  {/* Studio Address */}
                  <div className="pt-2 text-[10px] text-zinc-500 border-t border-white/10 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Київ, вул. Велика Васильківська, 42 • Студія NOIR & NEEDLE</span>
                  </div>

                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
