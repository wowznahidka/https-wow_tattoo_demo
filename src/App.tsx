import React, { useState, useEffect } from 'react';
import { Language, TattooStyle, Artist, ServiceItem, FlashDesign, GalleryItem, PageTab } from './types';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { StudioAtmosphericBackground } from './components/StudioAtmosphericBackground';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HeroSection } from './components/HeroSection';
import { StudioProcessSection } from './components/StudioProcessSection';
import { TattooCalculator } from './components/TattooCalculator';
import { GallerySection } from './components/GallerySection';
import { FlashShopSection } from './components/FlashShopSection';
import { MastersSection } from './components/MastersSection';
import { ServicesSection } from './components/ServicesSection';
import { StudioStandardsSection } from './components/StudioStandardsSection';
import { AftercareSection } from './components/AftercareSection';
import { ReviewsSection } from './components/ReviewsSection';
import { StudioLocationFaq } from './components/StudioLocationFaq';
import { Footer } from './components/Footer';
import { BookingModal, BookingPrefillData } from './components/BookingModal';
import { TattooCinematicIntro } from './components/TattooCinematicIntro';
import { Sparkles, Film, ArrowRight, Layers, ArrowUp } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<Language>('uk');
  const [currentTab, setCurrentTab] = useState<PageTab>('all');
  const [showIntro, setShowIntro] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefillData | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBookingWithData = (data?: BookingPrefillData) => {
    setBookingPrefill(data || null);
    setIsBookingOpen(true);
  };

  const handleEnterStudio = (targetTab: PageTab = 'all') => {
    setShowIntro(false);
    setCurrentTab(targetTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: PageTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers for quick bookings from interactive modules
  const handleBookFromEstimate = (estimateData: {
    sizeCm: number;
    style: TattooStyle;
    placement: string;
    complexity: string;
    estimatedPriceUah: number;
    estimatedHours: number;
  }) => {
    openBookingWithData({
      sizeCm: estimateData.sizeCm,
      placement: estimateData.placement,
      estimatedPriceUah: estimateData.estimatedPriceUah,
      serviceTitle: `Художнє тату: ${estimateData.style.toUpperCase()}`,
      conceptDescription: `Розрахунок: ${estimateData.sizeCm} см, складність: ${estimateData.complexity}, орієнтовно ~${estimateData.estimatedHours} год.`
    });
  };

  const handleReserveFlash = (flash: FlashDesign) => {
    openBookingWithData({
      artistName: flash.artistName,
      flashId: flash.id,
      flashTitle: lang === 'uk' ? flash.title.uk : flash.title.en,
      flashImageUrl: flash.imageUrl,
      serviceTitle: 'Бронювання авторського Flash-ескізу (1 of 1)',
      estimatedPriceUah: flash.priceUah
    });
  };

  const handleBookSimilarGallery = (item: GalleryItem) => {
    openBookingWithData({
      artistName: item.artistName,
      serviceTitle: `Схоже на роботу: "${item.title.uk}"`,
      placement: item.placement,
      conceptDescription: `Орієнтир: стиль ${item.style}, робота майстра ${item.artistName}`
    });
  };

  const handleBookArtist = (artist: Artist) => {
    openBookingWithData({
      artistName: artist.name,
      serviceTitle: `Сеанс у майстра: ${artist.name}`
    });
  };

  const handleSelectService = (service: ServiceItem) => {
    openBookingWithData({
      serviceTitle: lang === 'uk' ? service.title.uk : service.title.en,
      estimatedPriceUah: service.priceFromUah
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f2] font-sans selection:bg-red-700 selection:text-white relative overflow-x-hidden pb-16 sm:pb-0">
      {/* Top Fixed Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Atmospheric Shimmering Scroll-Reactive Studio Background */}
      <StudioAtmosphericBackground />

      {/* 1. Cinematic Fullscreen Studio Intro with AnimatePresence */}
      <AnimatePresence>
        {showIntro && (
          <TattooCinematicIntro
            lang={lang}
            onEnterStudio={handleEnterStudio}
            onQuickBook={() => openBookingWithData()}
          />
        )}
      </AnimatePresence>

      {/* Top Sticky Navigation with Active Tab Support & Intro Trigger */}
      <Navbar
        lang={lang}
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        onLanguageChange={setLang}
        onOpenBooking={() => openBookingWithData()}
        onOpenIntro={() => setShowIntro(true)}
      />

      {/* Quick View Mode Banner (when on dedicated sub-pages) */}
      {currentTab !== 'all' && (
        <div className="bg-black text-white px-4 py-2.5 text-xs font-mono border-b border-white/10 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <span className="flex items-center gap-2 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              {lang === 'uk' ? 'Режим окремої сторінки:' : 'Dedicated Page Mode:'}{' '}
              <strong className="text-white uppercase font-bold">
                {currentTab === 'gallery' && (lang === 'uk' ? 'Галерея 24+ робіт' : 'Portfolio 24+')}
                {currentTab === 'flash' && (lang === 'uk' ? 'Flash-ескізи 1-of-1' : 'Flash Sets')}
                {currentTab === 'artists' && (lang === 'uk' ? 'Майстри-резиденти' : 'Resident Masters')}
                {currentTab === 'services' && (lang === 'uk' ? 'Послуги & Калькулятор' : 'Pricing & Calculator')}
                {currentTab === 'standards' && (lang === 'uk' ? 'Стерильність & Догляд' : 'Safety & Aftercare')}
                {currentTab === 'reviews' && (lang === 'uk' ? 'Відгуки клієнтів' : 'Verified Reviews')}
              </strong>
            </span>
            <button
              onClick={() => handleTabChange('all')}
              className="text-red-400 hover:text-white font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer text-[11px]"
            >
              <span>{lang === 'uk' ? 'Показати всі розділи' : 'Show All Sections'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area based on Selected Tab */}
      <main className="transition-all duration-300">
        
        {/* VIEW 1: ALL SECTIONS (Continuous Full Atelier Experience) */}
        {currentTab === 'all' && (
          <>
            {/* 1. Hero Section with Live Stats & Diverse CTAs */}
            <HeroSection
              lang={lang}
              onOpenBooking={() => openBookingWithData()}
              onOpenIntro={() => setShowIntro(true)}
            />

            {/* 2. Professional Studio Process & Craftsmanship */}
            <div id="process">
              <StudioProcessSection
                lang={lang}
                onOpenBooking={() => openBookingWithData()}
              />
            </div>

            {/* 3. Portfolio Gallery with Filters & Modal Lightbox */}
            <div id="gallery">
              <GallerySection
                lang={lang}
                onBookSimilar={handleBookSimilarGallery}
              />
            </div>

            {/* 4. Exclusive Flash 1-of-1 Catalog */}
            <div id="flash">
              <FlashShopSection
                lang={lang}
                onReserveFlash={handleReserveFlash}
              />
            </div>

            {/* 5. Resident Masters Team & Bios */}
            <div id="artists">
              <MastersSection
                lang={lang}
                onBookArtist={handleBookArtist}
              />
            </div>

            {/* 6. Interactive Tattoo Cost & Time Calculator */}
            <div id="calculator">
              <TattooCalculator
                lang={lang}
                onBookWithEstimate={handleBookFromEstimate}
              />
            </div>

            {/* 7. Comprehensive Services & Pricing Table */}
            <div id="services">
              <ServicesSection
                lang={lang}
                onSelectService={handleSelectService}
              />
            </div>

            {/* 8. Clinical Hygiene & Sterilization Guarantees */}
            <div id="standards">
              <StudioStandardsSection
                lang={lang}
              />
            </div>

            {/* 9. Aftercare Protocol & Healing Timeline */}
            <div id="aftercare">
              <AftercareSection
                lang={lang}
              />
            </div>

            {/* 10. Verified Client Reviews & Ratings */}
            <div id="reviews">
              <ReviewsSection
                lang={lang}
              />
            </div>

            {/* 11. Studio Location, Map & Accordion FAQ */}
            <div id="faq">
              <StudioLocationFaq
                lang={lang}
                onOpenBooking={() => openBookingWithData()}
              />
            </div>
          </>
        )}

        {/* VIEW 2: DEDICATED GALLERY PAGE */}
        {currentTab === 'gallery' && (
          <div className="py-8">
            <GallerySection
              lang={lang}
              onBookSimilar={handleBookSimilarGallery}
            />
            {/* Embedded Quick Calculator on Gallery Page */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 my-12 border-t border-black/10 pt-12">
              <TattooCalculator
                lang={lang}
                onBookWithEstimate={handleBookFromEstimate}
              />
            </div>
          </div>
        )}

        {/* VIEW 3: DEDICATED FLASH 1-OF-1 PAGE */}
        {currentTab === 'flash' && (
          <div className="py-8">
            <FlashShopSection
              lang={lang}
              onReserveFlash={handleReserveFlash}
            />
            {/* Studio Process on Flash Page */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 my-12 border-t border-black/10 pt-12">
              <StudioProcessSection
                lang={lang}
                onOpenBooking={() => openBookingWithData()}
              />
            </div>
          </div>
        )}

        {/* VIEW 4: DEDICATED ARTISTS & MASTERS PAGE */}
        {currentTab === 'artists' && (
          <div className="py-8">
            <MastersSection
              lang={lang}
              onBookArtist={handleBookArtist}
            />
            {/* Gallery highlights */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 my-12 border-t border-black/10 pt-12">
              <ReviewsSection
                lang={lang}
              />
            </div>
          </div>
        )}

        {/* VIEW 5: DEDICATED SERVICES & CALCULATOR PAGE */}
        {currentTab === 'services' && (
          <div className="py-8">
            <TattooCalculator
              lang={lang}
              onBookWithEstimate={handleBookFromEstimate}
            />
            <div className="my-12">
              <ServicesSection
                lang={lang}
                onSelectService={handleSelectService}
              />
            </div>
          </div>
        )}

        {/* VIEW 6: DEDICATED STANDARDS, STERILITY & AFTERCARE PAGE */}
        {currentTab === 'standards' && (
          <div className="py-8">
            <StudioStandardsSection
              lang={lang}
            />
            <div className="my-12">
              <AftercareSection
                lang={lang}
              />
            </div>
            <div className="my-12">
              <StudioLocationFaq
                lang={lang}
                onOpenBooking={() => openBookingWithData()}
              />
            </div>
          </div>
        )}

        {/* VIEW 7: DEDICATED REVIEWS PAGE */}
        {currentTab === 'reviews' && (
          <div className="py-8">
            <ReviewsSection
              lang={lang}
            />
            <div className="my-12">
              <StudioLocationFaq
                lang={lang}
                onOpenBooking={() => openBookingWithData()}
              />
            </div>
          </div>
        )}

      </main>

      {/* Floating Replay Intro & Quick Actions Trigger */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-30 flex flex-col gap-2">
        {/* Re-play Cinematic Intro */}
        <button
          onClick={() => setShowIntro(true)}
          className="p-3 bg-[#0d0d0d] hover:bg-red-700 text-white border border-white/20 shadow-2xl transition-all cursor-pointer group flex items-center gap-2"
          title={lang === 'uk' ? 'Переглянути студійне інтро' : 'Replay Studio Intro'}
          aria-label="Replay intro"
        >
          <Film className="w-4 h-4 text-red-400 group-hover:text-white" />
          <span className="hidden md:inline text-[10px] font-mono uppercase font-bold tracking-wider">
            {lang === 'uk' ? 'Інтро' : 'Intro'}
          </span>
        </button>

        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="p-3 bg-white hover:bg-black text-zinc-900 hover:text-white border border-black/20 shadow-xl transition-all cursor-pointer"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenBooking={() => openBookingWithData()}
      />

      {/* Mobile Bottom Navigation Bar (Fixed on phones & small screens) */}
      <MobileBottomNav
        lang={lang}
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        onOpenBooking={() => openBookingWithData()}
      />

      {/* Booking Qualification Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        prefill={bookingPrefill || undefined}
      />
    </div>
  );
}
